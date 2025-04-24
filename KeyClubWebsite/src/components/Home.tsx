import "../stylesheets/Home.css"

import keyClubLogo from "../assets/KeyClubLogo.png";

export default function Home() {
    return <div className="Page">
        <div className="Banner">
            <img src={keyClubLogo}/>
            <h1 className="white">James E. Taylor Key Club</h1>
            <h3 className="white">Helping our community since 2011</h3>
        </div>
    </div>
}