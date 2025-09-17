"use client"

import SignIn from '@/components/AuthForm/SignIn';
import SignUp from "@/components/AuthForm/SignUp"
import { useState } from 'react';

export default function LoginPage() {
  
  const [ useCard, setCard] = useState<"login"|"register">("login");
  
  return (<div className='p-10 flex justify-center bg-slate-400'>
    {(useCard === "login" && <SignIn dispatch={setCard}/>)||(useCard === "register" && <SignUp dispatch={setCard}/>)}
  </div>
  )
}