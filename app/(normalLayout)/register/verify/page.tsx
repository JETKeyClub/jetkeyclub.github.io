"use client"

import { getEmailByCookies, resendVerificationEmail } from "@/actions/auth/actions";
import { useActionState, useEffect } from "react"
import { useState } from "react"

export default function Verify(){

    const [ useEmail, setEmail ] = useState<string|undefined>();

    useEffect(()=>{
        getEmailByCookies().then(em=>setEmail(em));
    },[])

    function onSubmit(prev: any, curr: FormData){
        if(useEmail)
            return resendVerificationEmail(useEmail);
        else
            return {}
    }

    const [ state, action, isPending ] = useActionState(onSubmit, {})

    return (

        <form action={action} className="flex flex-col items-center py-50 gap-y-6">
            <h1 className="text-3xl ">{`You've been sent a verification email to ${useEmail}.`}</h1>
            <div className="flex">
                <button disabled={isPending} className="p-3 bg-slate-700 text-white font-semibold rounded-sm transition-all hover:text-gray-300 cursor-pointer disabled:bg-slate-300 disabled:hover:text-white text-xl" type="submit">{"Didn't get an email? Click here to resend email."}</button>
            </div>
        </form>
    )
}