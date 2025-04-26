import "../stylesheets/Home.css"

import keyClubLogo from "../assets/KeyClubLogo.png";
import homemain from "../assets/homeMain.jpg";
import Card from "./Card";
import cat from "../assets/cat.jpg";


export default function Home() {
    return <div className="Page">
        <div className="Banner">
            <img src={keyClubLogo}/>
            <h1 className="white">James E. Taylor Key Club</h1>
            <h3 className="white">Helping our community since 2011</h3>
        </div>
        <main className="main">
            <div className="whatIs">
            <div className="textContent">
                <h2>What is Key Club?</h2>
                <p>Our club is a volunteering organization that is focused on leadership, development, and citizenship. It provides opportunities for students to get involved within the school and community.</p>
            </div>
            <img src={homemain} alt="An image of us attending our dog program."/>
            </div>
            <div className="blueAlteration">
                <Card profileImg={cat} quote="Key club is so awesome yo so awesome this is super long textt used ffor testing purposes please work I beg" name="John Doe"/>
            </div>
        </main>
    </div>
}