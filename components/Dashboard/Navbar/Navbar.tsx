import NavbarButton from "./NavbarButton";
import { createClient } from "@/utils/supabase/server";
import { getRoleByEmail } from "@/actions/auth/actions";
import { redirect } from "next/navigation";

export default async function NavBar(){

    const client = await createClient();

     const { data, error } = await client.auth.getUser();

   if (error || !data?.user) {
     redirect('/login')
    }

    const role = await getRoleByEmail(data.user?.email!);

    return (
        <div 
        className="w-85 h-screen border-[1px] border-b-0 border-gray-400 flex flex-col justify-between sticky top-0">
            <div>
                <NavbarButton name="Home" link="/dashboard"/>
                <NavbarButton name="Settings" link="/dashboard/settings"/>
                {role === "admin" && <NavbarButton name="Add Users" link="/dashboard/addUsers"/>}
            </div>
        </div>
    );
}