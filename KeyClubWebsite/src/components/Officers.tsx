import OfficerCard from "./OfficerCard";
import OfficerCarousel from "./Carousel";

import Carousel from "./Carousel";
import officerJSON from "../assets/Officers/OfficerBios.json"

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