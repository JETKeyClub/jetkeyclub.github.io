"use client"

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

const LOADING_ANIMATION = "animate-pulse"
export interface SuspenseImageProps extends Omit<ImageProps, "src">{
    promise?: Promise<string>;
    src?: string;
    width?: number;
    height?: number;
}

export default function SuspenseImage(props: SuspenseImageProps){

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [useLoadedImage, setLoadedImage] = useState<string>("");

    useEffect(()=>{
        if(!props.src && !props.promise)
            throw new Error("SuspenseImage must have either a src or promise.");
        else if(props.promise)
            props.promise.then(res=>setLoadedImage(res));
        else if(props.src)
            setLoadedImage(props.src);
    }, [props.src, props.promise])

    return <div className={`SuspenseImage ${isLoading ? `${props.className} ${LOADING_ANIMATION} bg-gray-400 relative flex justify-center items-center before-content-['']` : ""}`}>
        {useLoadedImage != "" && <Image {...props} width={props.width || 800} height={props.height || 450} src={useLoadedImage} className={`${props.className} select-none relative ${isLoading ? "opacity-0" : ""} ${!(props.className?.includes(" w-") || props.className?.includes(" h-")) ? "w-[60rem] lg:w-[40rem]" : ""} select-none`} draggable={false} onLoad={()=>setIsLoading(false)}/>}
    </div>
}