import { getPostsByName } from "@/actions/dashboard/DashboardActions"
import { getNameByEmail } from "@/actions/auth/actions"
import Editor from "@/components/Editor/Editor"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Page(){
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    const fullName = await getNameByEmail(data.user.email!);
    const posts = (await Promise.all(await getPostsByName(fullName))).map(post=>post.id!);

    return (
        <div>
            <Editor postIds={posts}/>
        </div>
    )
}