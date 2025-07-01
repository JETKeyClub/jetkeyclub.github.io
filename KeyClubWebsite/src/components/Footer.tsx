import "../stylesheets/Footer.css";
import SuspenseImage from "./SuspenseImage/SuspenseImage";
import insta from "../assets/Instagram_icon.webp"

const currentSocials: Map<string, string[]> = new Map<string, string[]>();
currentSocials.set("Instagram", ["https://www.instagram.com/ths_key_club/", insta]);
const redidrect = (link: string) : void => {
    window.open(link, "_blank");
}
interface Props {
    //SOCIAL NAME : LINK, IMG LINK
    socials?: Map<string, string[]>
}

export default function Footer({socials}: Props){
    if(socials==null) socials = currentSocials;
    return <footer className="bannerBlue-bg">
        {Array.from(socials.keys()).map((key, _)=>{
            const [ link, imgLink ]: string[] = socials.get(key)!;
            return <SuspenseImage src={imgLink} alt={`Link to our ${key}`} onClick={()=>redidrect(link)}/>;
        })}
    </footer>
}

export { currentSocials };