"use client"

import SaveBtn from "@/components/Editor/SaveBtn";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function Settings(){

    
    const onClick = async () => {
        createClient().auth.signOut()
        redirect("/")
    }


    return (
        <div>
            <h1 className="text-6xl font-bold">Settings</h1>
            <SaveBtn text="Logout" promise={onClick}/>
        </div>
    )
}