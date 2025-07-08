//Props for the Card Component
interface Props {
    profileImg: string,
    name: string,
    quote: string
}


import "../../../stylesheets/Card.css";
import SuspenseImage from "../../SuspenseImage/SuspenseImage";



export default function Card( { profileImg, name, quote }: Props ){

    return (<div className="Card">
        <SuspenseImage src={profileImg} alt={`An image of ${name}.`}/>
        <blockquote className="box">
            <p>"{quote}"</p>
            <h4>- {name}</h4>
        </blockquote>
    </div>);
}