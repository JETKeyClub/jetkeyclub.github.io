import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { validateUser } from "./actions/auth/users";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: 
  [
    Credentials({
        credentials: {
            email: {},
            password: {}
        },

        authorize: async (credentials) => {
            let user = null;
            
            user = await validateUser(credentials.email as string, credentials.password as string);

            if(!user) throw new Error("Invalid credentials.");

            const parsedUser: User = {
                id: user.id.toString(),
                name: user.name,
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