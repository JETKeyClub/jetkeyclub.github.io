"use client"

import { useState } from "react";
import { addUser } from "@/components/Editor/Filesystem/FileFix";
import SaveBtn from "@/components/Editor/SaveBtn";
import { redirect } from "next/navigation";

export default function UserForm(){

    const [ useEmail, setEmail ] = useState("");

    return (
        <div className="flex w-full">
            <input type="text" className="p-3 rounded-xl border-[1px] border-gray-300 text-2xl"
             value={useEmail} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
            <SaveBtn text="Add User" promise={async () => {
                await addUser(useEmail, "default");
                redirect("/dashboard/addUsers");
            }}/>
        </div>
    )
}