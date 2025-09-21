import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { database, supabase } from "@/actions/database/Database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: 
  [
    Credentials({
        credentials: {
            email: {},
            password: {}
        },

        authorize: async (credentials) => {

            
            const {data,error} = await supabase.auth.signInWithPassword({
              email: credentials.email as string,
              password: credentials.password as string
            })

            const user = data.user;

            if(!user) throw new Error("Invalid credentials.");
            if(error) throw new Error("Something went wrong!")

            const name = await database`SELECT name FROM emailtoname WHERE email=${credentials.email as string}`;

            const parsedUser: User = {
                id: user.id.toString(),
                name: name[0].name || "Unknown",
                email: user.email,
            }


            return parsedUser;
        }

    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!
  }),
  secret: process.env.NEXTAUTH_SECRET
})