import "../stylesheets/Home.css"
//Assets
import keyClubLogo from "../assets/KeyClubLogo.png";
import homemain from "../assets/homeMain.webp";
import cat from "../assets/cat.jpg";
import guitar from "../assets/guitar.png";

//Components
import Card from "./Card";
import Opportunity from "./Opportunity";
import SuspenseImage from "./SuspenseImage/SuspenseImage";
import OpportunityGallery from "./OpportunityGallery";
import { Suspense } from "react";

export default function Home() {
    return <div className="Page Home">
        <div className="Banner">
            <img src={keyClubLogo}/>
            <h1 className="white">James E. Taylor Key Club</h1>
            <h3 className="white">Helping our community since 2011</h3>
        </div>
        <main className="main">
            <div className="textSubdivision">
            <div className="textContent">
                <h2>What is Key Club?</h2>
                <p>Our club is a volunteering organization that is focused on leadership, development, and citizenship. It provides opportunities for students to get involved within the school and community.</p>
            </div>
            <SuspenseImage src={homemain} alt="An image of us attending our dog program."/>
            </div>
            <section className="blueAlteration cardHolder">
                <Card profileImg={cat} quote="Key club is so awesome yo so awesome this is super long textt used ffor testing purposes please work I beg" name="John Doe"/>
                <Card profileImg={cat} quote="Key club is so awesome yo so awesome this is super long textt used ffor testing purposes please work I beg" name="John Doe"/>
                <Card profileImg={cat} quote="Key club is so awesome yo so awesome this is super long textt used ffor testing purposes please work I beg" name="John Doe"/>
            </section>
            <section className="whiteAlteration">
                <div className="titleContent">
                    <h2>Opportunities</h2>
                    <p>Hover over the images for details!</p>
                </div>
                <OpportunityGallery>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Opportunity image={keyClubLogo} details="guitar"/>
                        <Opportunity image={homemain} details="hi"/>
                        <Opportunity image={cat} details="chicken jockey"/>
                    </Suspense>
                </OpportunityGallery>
                
            </section>
        
        </main>
    </div>
}