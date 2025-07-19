import "../../stylesheets/Home.css"
//Assets
import keyClubLogo from "../../assets/KeyClubLogo.webp";
import homemain from "../../assets/homeMain.webp";
//Review Images (Placeholders for now)
import JaidenKhosla from "../../assets/Officers/OfficerPictures/JaidenKhosla.webp"
import SophiaTang from "../..//assets/Officers/OfficerPictures/SophiaTang.webp"
import NicholasLovely from "../../assets/nicholas_lovely.png"

//Big Opportunities
import WalkToEndAlzheimers from "../../assets/Opportunities/OpportunityPictures/WalkToEndAlzheimers.webp"
import MuttsAndMeows from "../../assets/Opportunities/OpportunityPictures/MuttsAndMeows.webp"
import BakeSale from "../../assets/Opportunities/OpportunityPictures/BakeSale.webp"

//Components
import Card from "../otherComponents/All/Card";
import Opportunity from "../otherComponents/All/Opportunity";
import SuspenseImage from "../SuspenseImage/SuspenseImage";
import OpportunityGallery from "../otherComponents/All/OpportunityGallery";
import { Suspense } from "react";

export default function Home() {
    return <div className="Page Home">
        <div className="Banner">
            <img src={keyClubLogo} alt="Key Club Logo" fetchPriority="high"/>
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
                <Card profileImg={JaidenKhosla} quote="Key Club is a great opportunity to help out my community and to meet new people." name="Jaiden Khosla"/>
                <Card profileImg={SophiaTang} quote="This club has allowed me to contribute to my community as well as connecting with new people." name="Sophia Tang"/>
                <Card profileImg={NicholasLovely} quote="I really enjoy participating in this club. There's so many great things we've done and so many more to come." name="Nicholas Lovely"/>
            </section>
            <section className="whiteAlteration">
                <div className="titleContent">
                    <h2>Big Opportunities</h2>
                    <p>Hover over the images for details!</p>
                </div>
                <OpportunityGallery>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Opportunity image={WalkToEndAlzheimers} details="Walk to End Alzheimers is one of our bigger opportunities where we run to raise money for Alzheimers reasearch."/>
                        <Opportunity image={MuttsAndMeows} details="Mutts and Meows is an organization that helps care for stray cats and dogs while trying to find them homes."/>
                        <Opportunity image={BakeSale} details="We hold several bake sales throughout the year to raise money for LEDCON. They mainly consist of home baked goods."/>
                    </Suspense>
                </OpportunityGallery>
                
            </section>
        
        </main>
    </div>
}