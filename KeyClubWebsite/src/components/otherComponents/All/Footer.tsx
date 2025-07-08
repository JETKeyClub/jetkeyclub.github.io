import "../../../stylesheets/Footer.css"
import SuspenseImage from "../../SuspenseImage/SuspenseImage";
import insta from "../../../assets/Instagram_icon.webp"

// const currentSocials: Map<string, string[]> = new Map<string, string[]>();
// currentSocials.set("Instagram", ["https://www.instagram.com/ths_key_club/", insta]);

//SOCIAL NAME : LINK, IMG LINK
const socials: { [name : string]: [string, string]} = {
    "Instagram" : ["https://www.instagram.com/ths_key_club/", insta]
}

//function that redirects the user to their desired website
const redidrect = (link: string) : void => {
    window.open(link, "_blank");
}
export default function Footer(){

    return <footer className="bannerBlue-bg">
        {Object.keys(socials).map((key, idx)=>{
            const [ link, imgLink ]: string[] = socials[key]!;
            return <SuspenseImage src={imgLink} alt={`Link to our ${key}`} key={`${key}-link`} onClick={()=>redidrect(link)}/>;
        })}
    </footer>
}