import OfficerCard from "../otherComponents/Officer/OfficerCard";
import OfficerCarousel from "../otherComponents/All/Carousel";

import Carousel from "../otherComponents/All/Carousel";
import officerJSON from "../../assets/Officers/OfficerBios.json"

import "../../stylesheets/Officers.css"

export default function Officers(){
    return <div className="Page Officers">
        <div className="whiteAlteration">
            <Carousel>
                {officerJSON.map(({ name, role, bio, image}, idx) => {
                    return <OfficerCard name={name} role={role} bio={bio} icon={image}/>
                })}
            </Carousel>
        </div>
    </div>
}