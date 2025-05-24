import SuspenseImage from "./SuspenseImage/SuspenseImage"

import "../stylesheets/App.css"
import AboutUsImage from "../assets/aboutUsImage.jpg";

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
    </div>
}