"use client"

import clsx from "clsx";
import { IconType } from "react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarButtonProps {
    name: string,
    link: string,
    icon: IconType
}

export default function NavbarButton({ name, link, icon: Icon }: NavbarButtonProps){
    
    const isSelected = usePathname() === link;
    
    return ( 
    <Link href={link} 
    className={clsx(`flex gap-x-4 items-center p-3 w-full
    transition-all border-b-[1px] border-gray-400    
    `, {
        "hover:bg-gray-400/30": !isSelected,
        "bg-gray-700/30": isSelected
    })}>
        {<Icon className="text-4xl"/>}
        <p className="text-4xl">{name}</p>
    </Link>);
}