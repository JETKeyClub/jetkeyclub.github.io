"use client"

import { CgHome } from "react-icons/cg";
import { GiPostStamp } from "react-icons/gi";

import NavbarButton from "./NavbarButton";
import { CiSettings } from "react-icons/ci";

export default function NavBar(){
    return (
        <div 
        className="w-85 h-screen border-[1px] border-gray-400">
            <NavbarButton name="Home" link="/dashboard" icon={CgHome}/>
            <NavbarButton name="Posts" link="/dashboard/posts" icon={GiPostStamp}/>
            <NavbarButton name="Settings" link="/dashboard/settings" icon={CiSettings}/>
        
        </div>
    );
}