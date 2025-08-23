"use client"

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
interface HeaderBtnProps {
    name: string;
    dispatch: Dispatch<SetStateAction<boolean>>;
}

export default function HeaderBtn({ name, dispatch }: HeaderBtnProps){
    return <Link href={`/${name.toLowerCase()}`} onClick={()=>dispatch(false)} 
    className="
    text-white text-8xl md:text-3xl
    font-bold text-shadow-sm text-shadow-gray900
    transition-all hover:scale-110 hover:text-gray-200 
    "
    >{name}</Link>
}