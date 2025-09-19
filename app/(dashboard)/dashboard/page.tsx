import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getNameByEmail } from '@/actions/auth/actions'
import { getPostsByName } from '@/actions/dashboard/DashboardActions'
import BriefPostOverview from '@/components/Dashboard/Cards/BriefPostOverview'
import PostCreationCard from '@/components/Editor/PostCreationCard'

export default async function Dashboard() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const fullName = await getNameByEmail(data.user.email!);
  // const role = await getRoleByEmail(data.user.email!);
  const posts = await Promise.all(await getPostsByName(fullName));
  
  return (<>
    <PostCreationCard fullName={fullName}/>
    <BriefPostOverview posts={posts}/>
  </>
  )
 
}