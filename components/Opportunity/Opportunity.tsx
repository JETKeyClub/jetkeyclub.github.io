import SuspenseImage from "@/components/UI/SuspenseImage";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const WANTED_HEIGHT = 30;

interface OpportunityProps {
    image: string,
    description: string,
    link?: string
}

const cache: Map<string, number[]> = new Map<string, number[]>();

async function getBaseDimensions(src: string): Promise<number[]>{
    
    if(cache.has(src)) return cache.get(src)!;
    
    const image = new Image();
    image.src = src;
    
    return new Promise((resolve, reject)=>{
        image.onload = () => {
            const dims = [image.width, image.height];
            cache.set(src, dims);
            resolve(dims);
        }
    })
}

"use client"
function minimize(dimensions: number[]): [number[], number[]]{
    const REM = Number.parseFloat(window.getComputedStyle(document.querySelector("html")!).fontSize);

    const inRemScale = dimensions.map(e => e/REM);
    const scaleFactor = WANTED_HEIGHT/inRemScale[1];
    
    const scaledRem = inRemScale.map(e => e*scaleFactor);
    const scaledPixel =  scaledRem.map(e=>e*REM);

    return [scaledRem, scaledPixel];
}
"use client"
export default function Opportunity({ image, description, link }: OpportunityProps){
    useEffect(()=>{
        (async () => {
            setDetails(minimize(await getBaseDimensions(image)));
        })();
    }, [image]);

    const [ useDetails, setDetails ] = useState<[number[], number[]] | undefined>();

    return <SuspenseImage 
            src={image} 
            width={(useDetails ? useDetails[1][0] : 600).toString()}
            height={(useDetails ? useDetails[1][1] : 450).toString()}
            alt={description}
            className={
                `w-[${useDetails ? useDetails[0][0] : 60}rem]
                h-[${useDetails ? useDetails[0][1] : 45}]
                `}
            />
}