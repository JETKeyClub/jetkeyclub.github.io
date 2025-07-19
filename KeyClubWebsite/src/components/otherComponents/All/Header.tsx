import { JSX, ReactNode, useEffect, useState } from "react"

import "../../../stylesheets/Header.css"

import { routes } from "./Routes"

//gets all the different pages from the file, routes.ts
function getRoutes(changePage: Function, toggleBurger: Function) {
    return Object.entries(routes).map(([name, routing]) => {
        return <h2 className="headerOption white" key={name} onClick={()=>{changePage(routing); toggleBurger(false);}}>{name}</h2>
    })
}

//change page is the set function of the page state of App.tsx
interface Props {
    changePage: Function
}


export default function Header({changePage}: Props) {

    const [ burgerMenuToggle, setBurgerToggle ] = useState(false);

    //used for mobile when the click the burger menu
    function toggleScrolling(toggle: boolean) {
        const html = document.querySelector("html");
        if(html)
            html.style.overflowY =  toggle ? "auto" : "hidden";
    }

    //adjusts scrolling when burgerMenuToggle is changed
    useEffect(()=>{
        toggleScrolling(!burgerMenuToggle)
    }, [burgerMenuToggle])

    return (<header className="headerContainer"><nav className="header bannerBlue-bg">
            {getRoutes(changePage, setBurgerToggle)}
            {<h2 className="burgerMenuOption white" onClick={ () => {setBurgerToggle(prev => !prev);}}>☰</h2>}
        </nav>
        <div className="burgerMenu" style={{opacity : burgerMenuToggle ? 1 : 0, visibility : burgerMenuToggle ? "visible" : "hidden", pointerEvents: burgerMenuToggle ? "unset" : "none"}}>
            <br></br>
            <br></br>
            <br></br>
            {getRoutes(changePage, setBurgerToggle)}
        </div>
        </header>);


}
