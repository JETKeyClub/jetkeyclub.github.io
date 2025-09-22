import { createClient } from "@/utils/supabase/server";
import { getRoleByEmail } from "@/actions/auth/actions";
import { redirect } from "next/navigation";
import { getAllUsers } from "@/actions/dashboard/DashboardActions";
import UserCard from "@/components/Card/UserCard";
import UserForm from "@/components/UserForm/UserForm";

export default async function Page(){
    const client = await createClient();

     const { data, error } = await client.auth.getUser();

   if (error || !data?.user) {
     redirect('/login')
    }

    const role = data.user.email ? await getRoleByEmail(data.user?.email) : "deafult";

    if(role !== "admin") redirect("/dashboard");

    const users = await getAllUsers();

    return (
        <div className="flex flex-col gap-y-4">
            <UserForm/>
            {users.filter(user=>user.email!==data.user.email).map((user,idx)=><UserCard {...user} key={`${user.email}-${idx}`}/>)}
        </div>
    )
}