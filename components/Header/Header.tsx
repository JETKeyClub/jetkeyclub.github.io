"use client"

import { useState } from "react";

import HeaderBtn from "@/components/Header/HeaderBtn";

export default function Header(){

    const [ burgerMenuToggle, setBurgerMenuToggle ] = useState<boolean>(false);

    return <div className="overflow-y-hidden p-1 flex justify-center items-center gap-5 h-16 bg-keyblue-800 shadow-sm shadow-keyblue-900">
            <HeaderBtn name="Home"/>
            <HeaderBtn name="About Us"/>
            <HeaderBtn name="Officers"/>
            <HeaderBtn name="Galllery"/>
    </div>
}