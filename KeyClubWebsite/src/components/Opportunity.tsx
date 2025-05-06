import { Suspense, useEffect, useMemo, useState } from "react";
import "../stylesheets/Opportunity.css"
import CreateResource from "./Resource";

interface Props {
    image: string,
    details: string,
}

async function getDetails(image: string): Promise<[ HTMLImageElement, number[]]>{

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve([img,[img.width, img.height]]);
        img.onerror = () => reject(new Error("Image failed to load..."));

        return img;

        });

}

function minimize(dimensions: number[]): number[]{
    const fontSize: string = window.getComputedStyle(document.querySelector("html")!).fontSize;
    const remSize: number = Number.parseFloat(fontSize.substring(0, fontSize.length-2));
    
    const divisionFactor = 5;
    const largestImgSize = 20000;
    
    const newDimensions = dimensions.map(e => e);

    while(newDimensions[0]*newDimensions[1] > largestImgSize){
        newDimensions[0]/=divisionFactor;
        newDimensions[1]/=divisionFactor;
    }

 
    return newDimensions;
}

export default function Opportunity({ image, details } : Props){

    const imageLoading = useMemo(()=>CreateResource(getDetails(image)), [image]);
    const loadedImage  = imageLoading.read();
    const dimensions = minimize([loadedImage.width, loadedImage.height]);
    return (<div className={`Opportunity ${dimensions[0] > dimensions[1] ? "wide" : "vertical"}`} style={{width: `${dimensions[0]}rem`, height: `${dimensions[1]}rem`}}>
                <img src={loadedImage.src}/>
                <p>{details}</p>
            </div>);
}