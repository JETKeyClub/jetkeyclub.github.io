"use client"

import { role } from "@/types";
import { deleteUser, updateRole } from "@/components/Editor/Filesystem/FileFix";

import { useState } from "react";
import Tooltip from "@/components/Tooltip/Tooltip";
import { BiTrash } from "react-icons/bi";

interface UserCardProps {
    email: string,
    role: role;
}

export default function UserCard(props: UserCardProps){

    const [ useRole, setRole ] = useState<role>(props.role);

    return (
        <div className="flex border-[1px] border-gray-200 p-3 gap-x-4">
            <p>{props.email}</p>
            <select value={useRole} onChange={(e)=>{
                setRole(e.target.value as role)
                updateRole(props.email, e.target.value as role);
            }}>
                <option value={"default"}>Default</option>
                <option value={"admin"}>Admin</option>
            </select>
            <Tooltip icon={BiTrash} text="Delete User" href="/dashboard/addUsers" onClick={()=>deleteUser(props.email)}/>
        </div>
    )
}