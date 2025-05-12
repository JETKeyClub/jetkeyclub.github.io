import { getImageFromCache } from "./SuspenseImage/BaseImage";
import "../stylesheets/Opportunity.css";
import { useMemo } from "react";
import SuspenseImage from "./SuspenseImage/SuspenseImage";

interface Props {
    image: string
    details: string
}

function getDetails(image: string): HTMLImageElement {
    return getImageFromCache(image)
}

function minimize(image: HTMLImageElement): [number[], HTMLImageElement] {
    //Dimensions in REM scale.
    const dimensions: number[] = [image.width, image.height].map(e => e/Number.parseFloat(window.getComputedStyle(document.querySelector("html")!).fontSize));
    while(dimensions[0]*dimensions[1] > 2500){
        const reductionFactor = Math.max(0.5,Math.random());
        dimensions[0]*=reductionFactor;
        dimensions[1]*=reductionFactor;
    }
    return [dimensions, image];
}


export default function Opportunity({ image, details }: Props){
    const [ dimensions, loadedImage ] = minimize(getDetails(image));
    return (<div className={`Opportunity ${dimensions[0] > dimensions[1] ? "wide" : "tall"}`} style={{width : `${dimensions[0]}em`, height : `${dimensions[1]}em`}}>
        <SuspenseImage src={loadedImage.src}/>
        <p>{details}</p>
    </div>);   
}