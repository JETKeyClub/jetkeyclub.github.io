import { useEffect, useState } from "react";
import "../stylesheets/Opportunity.css"


interface Props {
    image: string,
    details: string,
}

async function getDetails(image: string): Promise<number[]>{
    const img = new Image();
    img.src = image;
    return [img.width, img.height];
}

function minimize(dimensions: number[]): number[]{
    const fontSize: string = window.getComputedStyle(document.querySelector("html")!).fontSize;
    const remSize: number = Number.parseFloat(fontSize.substring(0, fontSize.length-2));
    const randomDialation: number = Math.random()*1.5 + 1;
    console.log(dimensions)
    return dimensions.map((e) => e/remSize/randomDialation);
}

export default function Opportunity({ image, details } : Props){

    const [ useDetails, setDetails ] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            const details = await getDetails(image);
            setDetails(details);
        })();
    },[]);


    const dimensions: number[] = minimize(useDetails);
    return <div className="Opportunity" style={{width: `${dimensions[0]}rem`, height: `${dimensions[1]}rem`}}>
            <img src={image}/>
            <p>{details}</p>
        </div>
}