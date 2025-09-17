"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentProps, useState } from "react";

interface SaveBtnProps extends ComponentProps<"button"> {
    text: string;
    promise: ()=>Promise<any>
}

export default function SaveBtn( {text, promise, className, ...props}: SaveBtnProps){

    const [isPending, setPending] = useState<boolean>(false);

    return (
            <button className={`p-2 rounded-sm w-32 text-xl 
    text-black font-semibold cursor-pointer 
    transition-colors bg-green-200 hover:bg-green-300 disabled:bg-green-100 disabled:hover:bg-green-100 ${className}
    `} disabled={isPending} {...props}
    onClick={
        ()=>{
            setPending(true);
            promise().then(()=>setPending(false))
        }
    }
    >{text}</button>
    )
}