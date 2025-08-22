"use client"

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

const LOADING_ANIMATION = "animate-pulse"
interface SuspenseImageProps extends Omit<ImageProps, "src">{
    promise?: Promise<string>;
    src?: string;
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

    return <div className={`${isLoading ? `${props.className} ${LOADING_ANIMATION} bg-gray-400 relative flex justify-center items-center before-content-['']` : ""}`}>
        {useLoadedImage != "" && <Image {...props} src={useLoadedImage} className={`${props.className} select-none relative ${isLoading ? "opacity-0" : ""}`} draggable={false} onLoad={()=>setIsLoading(false)}/>}
    </div>
}