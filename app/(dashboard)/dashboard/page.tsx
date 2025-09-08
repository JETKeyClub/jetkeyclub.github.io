import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import ClientPage from '@/components/Dashboard/ClientPage'
import { getNameByEmail, getRoleByEmail } from '@/actions/auth/actions'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  const fullName = await getNameByEmail(data.user.email!);
  const role = await getRoleByEmail(data.user.email!);
  
  return (<>
  
    {data.user.email && <ClientPage email={data.user.email!} name={fullName} role={role}/>}
  
  </>
  )
 
}