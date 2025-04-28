
interface Props {
    profileImg: string,
    name: string,
    quote: string
}


import "../stylesheets/Card.css";



export default function Card( { profileImg, name, quote }: Props ){
    console.log(profileImg);

    return (<div className="Card">
        <img src={profileImg} alt={`An image of ${name}.`} loading="lazy"/>
        <div className="box">
            <p>"{quote}"</p>
            <h4>- {name}</h4>
        </div>
    </div>);
}