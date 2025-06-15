import { JSX, ReactNode, useState } from "react"

import "../stylesheets/Header.css"
import Home from "./Home"
import AboutUs from "./AboutUs";

interface route {
    name: string,
    actualRouting: JSX.Element
}

const routes : {[name: string]: JSX.Element} = {
    "Home" : <Home/>,
    "About Us" : <AboutUs/>
}


function getRoutes(changePage: Function) {
    return Object.entries(routes).map(([name, routing]) => {
        return <h2 className="headerOption white" key={name} onClick={()=>{changePage(routing)}}>{name}</h2>
    })
}

interface Props {
    changePage: Function
}


export default function Header({changePage}: Props) {

    const [ burgerMenuToggle, setBurgerToggle ] = useState(false);

    function toggleScrolling() {
        const html = document.querySelector("html");
        if(html)
            html.style.overflowY =  burgerMenuToggle ? "auto" : "hidden";
    }


    return (<header className="headerContainer"><nav className="header bannerBlue-bg">
            {getRoutes(changePage)}
            {<h2 className="burgerMenuOption white" onClick={ () => {setBurgerToggle(prev => !prev); toggleScrolling()}}>☰</h2>}
        </nav>
        <div className="burgerMenu" style={{opacity : burgerMenuToggle ? 1 : 0, visibility : burgerMenuToggle ? "visible" : "hidden"}}>
            <br></br>
            <br></br>
            <br></br>
            {getRoutes(changePage)}
        </div>
        </header>);


}

export {routes}