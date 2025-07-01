import SuspenseImage from "./SuspenseImage/SuspenseImage"

import "../stylesheets/App.css"
import "../stylesheets/AboutUs.css"
import AboutUsImage from "../assets/aboutUsImage.webp";

const objectives: string[] = [
    "To develop initiative and leadership.",
    "To provide experience in living and working together.",
    "To serve the school and community.",
    "To cooperate with school administration.",
    "To prepare for useful citizenship.",
    "To promote the adoption and application of higher standards in scholarship, sportsmanship, and social contacts.",
    "To develop, by precept and example, a more intelligent, aggressive, and serviceable citizenship.",
    "To provide means to form enduring friendships, render unselfish service, and build a better community."
]

export default function AboutUs()
{
    return <div className="Page About">
        <div className="whiteAlteration">
            <div className="textSubdivision">
                <div className="textContent">
                   <h2>About Us</h2>
                   <p>Key Club is a student-led organization for high school students which operates under school regulations and welcomes members from the student body. We are unlike any other organization at THS. Key Club is open to all grade levels and there are no GPA requirements. This club functions not only on a local level but on a state and international level as well.</p>
                </div>
                   <SuspenseImage src={AboutUsImage} alt="Some random key club picture"/>
            </div>
        </div>
        <div className="blueAlteration">
            <div className="textSubdivision pledge">
                <div className="textContent">
                <h2>Pledge</h2>
                <p>I pledge, on my honor,</p>
                <p>To uphold the Objects of Key Club International</p>
                <p>To build my home, school, and community</p>
                <p>to serve my nation and God</p>
                <p>and combat all forces which tend to undermine these institutions.</p>
                </div>
            </div>
        </div>
        <div className="whiteAlteration">
            <div className="textSubdivision">
                <div className="textContent objectives">
                    <h2>Objectives</h2>
                    <ul>
                        {objectives.map((el, idx)=>{return <li key={`Objective#${idx}`}>{el}</li>})}
                    </ul>
                </div>
            </div>
        </div>
    </div>
}