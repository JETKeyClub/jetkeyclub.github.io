"use client"

import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { ComponentProps, useState } from "react";



type PasswordInputProps = Omit<ComponentProps<"input">, "type">;

export default function PasswordInput(props: PasswordInputProps){

    const [useEyeOpen, setEyeOpen] = useState<boolean>(false);

    return (
        <div className="w-[80%] relative">
            <input type={useEyeOpen ? "text" : "password"}
            className="text-5xl md:text-xl p-3 rounded-lg
          bg-slate-300 border-[1px] w-full border-slate-500 transition-all 
            md:focus:text-[1.28rem] focus:text-[3.1rem]" required {...props}/> 
            <div className="inset-y-0 absolute top-[40%] cursor-pointer right-1 text-6xl text-center md:text-xl transition-all hover:scale-115 w-10" onClick={()=>setEyeOpen(val=>!val)}>{ useEyeOpen ? <RxEyeOpen/> : <RxEyeClosed/>}</div>
        </div>
    );

}