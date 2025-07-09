import { getImageFromCache } from "../../SuspenseImage/BaseImage";
import "../../../stylesheets/Opportunity.css";
import SuspenseImage from "../../SuspenseImage/SuspenseImage";
import { useEffect, useState } from "react";

interface Props {
    image: string
    details: string //the description of the opportunity
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
    const [getDetails, setDetails] = useState<[number[], HTMLImageElement]|null>(null);

    useEffect(()=>{
        (async () => {
            getImageFromCache(image).then((loadedImg)=>{
                setDetails(minimize(loadedImg))
            });
        })();
    }, [image])

    return <>{ getDetails != null && <div className={`Opportunity ${getDetails[0][0] > getDetails[0][1] ? "wide" : "tall"}`} style={{width : `${getDetails[0][0]}rem`, height : `${getDetails![0][1]}rem`}}>
        <SuspenseImage src={getDetails[1].src} alt={`Opportunity: ${details}`}/>
        <p>{details}</p>
    </div>}</>;   
}