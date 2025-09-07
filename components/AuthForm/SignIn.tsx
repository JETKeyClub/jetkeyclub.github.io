"use client"

import { login, userLoginOutput } from "@/actions/auth/actions";
import { useActionState, useState } from "react"

import { Dispatch, SetStateAction } from "react";
import PasswordInput from "./PasswordInput";

type SignInProps = {
    dispatch:  Dispatch<SetStateAction<"login" | "register">>
}

export default function SignIn({ dispatch }: SignInProps){

    const [ state, action, isPending ] = useActionState(login, {});

    return (
        <form 
        action={action}
        className="
        w-[70vw] md:w-150 pb-20 rounded-2xl p-12
      bg-gray-100 shadow-2xl">
            <section className="border-b-[1px]">
                <h1 className="text-7xl md:text-5xl font-extrabold mb-3">Sign In</h1>
                <p className="text-4xl md:text-xl italic font-light mb-3">Please enter your credentials to continue...</p>
            </section>
            <section className="mt-15 md:mt-7 flex flex-col gap-y-5 items-center">
                
                <input type="email" placeholder="Email" name="email" required 
                className="text-5xl md:text-xl w-[80%] p-3 rounded-lg
                 bg-slate-300 border-[1px] border-slate-500 transition-all 
                 md:focus:text-[1.28rem] focus:text-[3.1rem]" disabled={isPending}/> 

                <PasswordInput placeholder="Password" disabled={isPending} required/>

                <button  
                className="bg-slate-700 transition-all hover:bg-slate-600 hover:scale-105 cursor-pointer  
                text-white text-[2.4rem] md:text-3xl p-3 rounded-lg w-[50%] mt-7"
                disabled={isPending}
                >Continue</button>
                {state.messages?.map((msg, idx)=><p key={`${msg}-${idx}`} className="font-light text-3xl text-red-600">{msg}</p>)}
                <div className="flex gap-x-2 group cursor-pointer select-none" onClick={()=>dispatch("register")}>
                    <p className="font-light text-4xl md:text-lg">Don't have an account?</p>
                    <p className="text-blue-700 group-hover:underline text-4xl md:text-lg">Register</p>
                </div>
            
            </section>
        </form>
    )
}