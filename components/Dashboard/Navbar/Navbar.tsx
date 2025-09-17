"use client"

import { CgHome } from "react-icons/cg";

import NavbarButton from "./NavbarButton";
import { CiSettings } from "react-icons/ci";

export default function NavBar(){
    return (
        <div 
        className="w-85 h-screen border-[1px] border-b-0 border-gray-400 flex flex-col justify-between sticky top-0">
            <div>
                <NavbarButton name="Home" link="/dashboard" icon={CgHome}/>
                <NavbarButton name="Settings" link="/dashboard/settings" icon={CiSettings}/>
            </div>
        </div>
    );
}