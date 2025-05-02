import { useEffect, useState } from "react";
import "../stylesheets/Opportunity.css"


interface Props {
    image: string,
    details: string,
}

async function getDetails(image: string): Promise<number[]>{
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve([img.width, img.height]);
        img.onerror = () => reject(new Error("Image failed to load..."));
    });
}

function minimize(dimensions: number[]): number[]{
    const fontSize: string = window.getComputedStyle(document.querySelector("html")!).fontSize;
    const remSize: number = Number.parseFloat(fontSize.substring(0, fontSize.length-2));
    
    const newDimensions = dimensions.map(e => e);

    while(newDimensions[0]*newDimensions[1] > 20000){
        newDimensions[0]/=5;
        newDimensions[1]/=5;
    }

 
    return newDimensions;
}

export default function Opportunity({ image, details } : Props){

    const [ useDetails, setDetails ] = useState<number[]>([5,10]);

    useEffect(() => {
        (async () => {
            const details = await getDetails(image);
            setDetails(details);
        })();
    },[]);

    const dimensions: number[] = minimize(useDetails);
    return <div className={`Opportunity ${dimensions[0] > dimensions[1] ? "wide" : "vertical"}`} style={{width: `${dimensions[0]}rem`, height: `${dimensions[1]}rem`}}>
            <img src={image}/>
            <p>{details}</p>
        </div>
}