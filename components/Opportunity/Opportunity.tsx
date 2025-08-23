"use client"

import SuspenseImage from "@/components/SuspenseImage/SuspenseImage";
import NextImage from "next/image";
import Link from "next/link";
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

    return <div className="relative group" style={useDetails ? {width: `${useDetails[0][0]*1.5}rem`, height: `${useDetails[0][1]*1.5}rem`} : {}}>
                <SuspenseImage 
                    src={image} 
                    width={(useDetails ? useDetails[1][0] * 2 : 1600)}
                    height={(useDetails ? useDetails[1][1] * 2 : 450)}
                    alt={description}
                    style={useDetails ? {width: `${useDetails[0][0]*1.5}rem`, height: `${useDetails[0][1]*1.5}rem`}: {}}
                    className={clsx("transition-[filter] duration-[250ms] align-middle p-0 hover:blur-[3px] w-full h-fit col-[1/auto]", {
                        "row-[2]": useDetails && useDetails[1][0] > useDetails[0][1]
                    })}
                />
                <p className="absolute text-lg top-0 p-[5%] text-white font-normal
                                transition-opacity duration-[230ms] opacity-0 group-hover:opacity-100
                                whitespace-normal wrap-break-word
                                ">{description}</p>
            </div>
}