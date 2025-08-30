"use client"

import { useEffect, useState } from "react";

import HeaderBtn from "@/components/Header/HeaderBtn";

export default function Header(){

    const [ burgerMenuToggle, setBurgerMenuToggle ] = useState<boolean>(false);

    const toggleScrolling = (tg: boolean) => {
        const html = document.querySelector("html");
        if(html)
            html.style.overflow = tg ? "auto" : "hidden";
    }

    useEffect(()=>{
        toggleScrolling(!burgerMenuToggle);
    }, [burgerMenuToggle])

    return <header className="z-50 md:static flex justify-center items-center h-35 md:h-15 overflow-y-hidden p-1 pr-5 md:pr-1 bg-keyblue-800 shadow-sm shadow-keyblue-900 overflow-hidden">
        <h2 className="relative md:hidden ml-[95%] text-[550%] font-bold text-white cursor-pointer transition-all z-100 hover:text-gray-200 hover:scale-105 select-none" onClick={()=>setBurgerMenuToggle(e=>!e)}>☰</h2>
        <div className={`pb-600 md:pb-0 justify-center items-center gap-12 md:gap-8 absolute bottom-0 right-0 top-12 md:z-10 md:static md:flex md:opacity-100 md:visible ${burgerMenuToggle ? "flex opacity-100 visible": "flex opacity-0 invisible"} flex-col md:flex-row bg-keyblue-700/90 md:bg-transparent overflow-hidden h-[200vh] md:h-fit w-screen md:w-full transition-all duration-300 z-[-1]`}>
            <HeaderBtn name="Home" dispatch={setBurgerMenuToggle} trueLink="/"/>
            <HeaderBtn name="About Us" dispatch={setBurgerMenuToggle}/>
            <HeaderBtn name="Officers" dispatch={setBurgerMenuToggle}/>
            <HeaderBtn name="Gallery" dispatch={setBurgerMenuToggle}/>
        </div>
    </header>
}