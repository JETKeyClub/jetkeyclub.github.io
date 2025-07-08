import { getImageFromCache } from "../../SuspenseImage/BaseImage";
import "../../../stylesheets/Opportunity.css";
import SuspenseImage from "../../SuspenseImage/SuspenseImage";

interface Props {
    image: string
    details: string //the description of the opportunity
}

function getDetails(image: string): HTMLImageElement {
    return getImageFromCache(image)
}

const wanted_height = 30; //the desired height of all opportunities (IN REM)

//scales the image dimensions from (w,h) to (w', wanted_height). It's just scalar division.
function minimize(image: HTMLImageElement): [number[], HTMLImageElement] {
    //Dimensions in REM scale.
    const dimensions: number[] = [image.width, image.height].map(e => e/Number.parseFloat(window.getComputedStyle(document.querySelector("html")!).fontSize));
    
    const scaleFactor = dimensions[1]/wanted_height;

    return [dimensions.map(e => e/scaleFactor), image];
}


export default function Opportunity({ image, details }: Props){
    const [ dimensions, loadedImage ] = minimize(getDetails(image));
    return (<div className={`Opportunity ${dimensions[0] > dimensions[1] ? "wide" : "tall"}`} style={{width : `${dimensions[0]}rem`, height : `${dimensions[1]}rem`}}>
        <SuspenseImage src={loadedImage.src} alt={`Opportunity: ${details}`}/>
        <p>{details}</p>
    </div>);   
}