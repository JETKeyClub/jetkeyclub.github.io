"use client"

import { useState } from "react";

import HeaderBtn from "@/components/Header/HeaderBtn";

export default function Header(){

    const [ burgerMenuToggle, setBurgerMenuToggle ] = useState<boolean>(false);

    return <header className="z-100 flex justify-center items-center h-20 md:h-15 overflow-y-hidden p-1 pr-5 md:pr-1 bg-keyblue-800 shadow-sm shadow-keyblue-900 overflow-hidden">
        <h2 className="md:hidden ml-[95%] text-5xl font-bold text-white cursor-pointer transition-all z-10 hover:text-gray-200 hover:scale-105 select-none" onClick={()=>setBurgerMenuToggle(e=>!e)}>☰</h2>
        <div className={`pb-200 md:pb-0 justify-center items-center gap-12 md:gap-8 fixed bottom-0 top-20 right-0 md:z-10 md:static md:flex md:opacity-100 md:visible ${burgerMenuToggle ? "flex opacity-100 visible": "flex opacity-0 invisible"} flex-col md:flex-row bg-keyblue-700/90 md:bg-transparent overflow-hidden h-screen md:h-fit w-screen md:w-full transition-all duration-300`}>
            <HeaderBtn name="Home"/>
            <HeaderBtn name="About Us"/>
            <HeaderBtn name="Officers"/>
            <HeaderBtn name="Galllery"/>
        </div>
    </header>
}