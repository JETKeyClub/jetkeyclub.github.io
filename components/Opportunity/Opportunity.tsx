"use client"

import SuspenseImage from "@/components/SuspenseImage/SuspenseImage";
import getBaseDimensions from "@/components/Opportunity/getDetails";
import { useEffect, useState } from "react";
import clsx from "clsx";

const WANTED_HEIGHT = 25;

interface OpportunityProps {
    image: string,
    description: string,
    link?: string
}


function minimize(dimensions: number[]): [number[], number[]]{
    const REM = Number.parseFloat(window.getComputedStyle(document.querySelector("html")!).fontSize);

    const inRemScale = dimensions.map(e => e/REM);
    const scaleFactor = WANTED_HEIGHT/inRemScale[1];
    
    const scaledRem = inRemScale.map(e => e*scaleFactor);
    const scaledPixel =  scaledRem.map(e=>Math.ceil(e*REM));

    return [scaledRem, scaledPixel];
}

export default function Opportunity({ image, description, link }: OpportunityProps){
    useEffect(()=>{
        (async () => {
            setDetails(minimize(await getBaseDimensions(image)));
        })();
    }, [image]);

    const [ useDetails, setDetails ] = useState<[number[], number[]] | undefined>();

    return <div className={`group w-[33.3%] relative`}
            >
                <SuspenseImage 
                    src={image} 
                    width={(useDetails ? useDetails[1][0] * 2 : 1600)}
                    height={(useDetails ? useDetails[1][1] * 2 : 450)}
                    alt={description}
                    // style={useDetails ? {width: `${useDetails[0][0]*0.5}rem`, height: `${useDetails[0][1]*0.5}rem`}: {}}
                    className={`transition-[filter] duration-[250ms] w-full block object-cover
                         ${link && "cursor-pointer"} hover:blur-[4px] hover:brightness-75`}
                    onClick={()=>link && link != "" && window.open(link, "__blank")}
                />
                <p className="absolute text-2xl pointer-events-none md:text-lg top-0 p-[5%] text-white font-normal
                                transition-opacity duration-[230ms] opacity-0 group-hover:opacity-100
                                whitespace-normal wrap-break-word flex-wrap
                                ">{description}</p>
            </div>
}