import { useState } from "react"

import "../stylesheets/Header.css"

const routes : string[] = ["Home", "About", "Officers", "Gallery", "Contact"]

function getRoutes() {
    return routes.map((el, idx) => {
        return <h2 className="headerOption white" key={idx}>{el}</h2>
    })
}

export default function Header() {

    const [ burgerMenuToggle, setBurgerToggle ] = useState(false);

    return (<div className="headerContainer"><div className="header bannerBlue-bg">
            {getRoutes()}
            {<h2 className="burgerMenuOption white" onClick={ () => {setBurgerToggle(prev => !prev)}}>☰</h2>}
        </div>
        <div className="burgerMenu" style={{opacity : burgerMenuToggle ? 1 : 0, visibility : burgerMenuToggle ? "visible" : "hidden"}}>
            <br></br>
            <br></br>
            <br></br>
            {getRoutes()}
        </div>
        </div>);


}