import "../../../stylesheets/OfficerCard.css"
import "../../../stylesheets/Card.css"

import SuspenseImage from "../../SuspenseImage/SuspenseImage"

interface Props {
    name: string,
    role: string,
    icon: string,
    bio: string
}

export default function OfficerCard({ name, icon, role, bio }: Props){
    return <div className="OfficerCard">
        <SuspenseImage src={icon} alt={`An image of ${name}`}/>
        <div>
            <h4>{name}</h4>
            <h3>{role}</h3>
            <p>{bio}</p>
        </div>
    </div>
}