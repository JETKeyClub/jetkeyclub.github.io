import { useEffect, useState } from "react";
import {CreateResource, resource } from "./Resource";

//Props for Base Image
interface Props {
    src: string //the pathway to the desired image
    className?:string | "" //gives a desired html class to base image
    id?:string | ""          //gives a desired html id to base image
    alt?:string| ""         //gives a desired alt to base image
    width?:string| ""       //gives a desired width to base image
    height?:string| ""      //gives a desired height to base image
    onClick?:()=>void | null    //gives a desired onClick Event to base image
}


//This is for optimal image loading. Please don't mess with this.
const imageCache: { [key : string]: HTMLImageElement} = {};

// function generateImage(image: string): Promise<HTMLImageElement>{
//     return new Promise<HTMLImageElement>((resolve, reject)=>{
//         const img: HTMLImageElement = new Image();
//         img.src = image;
//         img.onload = () => img.decode().then(()=> resolve(img)).catch(reject)
//     });
// }

function getImageFromCache(image: string): Promise<HTMLImageElement>{

    const img = new Image();
    img.src = image;
    return new Promise((resolve, reject)=>{        
        img.decode().then(()=>{
            imageCache[image] = img;
            resolve(img)
        }).catch(reject);
    })

}

//Base Image
export default function BaseImage({ src, className, id, alt} : Props){

    const [loadedSrc, setLoadedSrc] = useState<string|null>(null);

    useEffect(()=>{
        if(imageCache[src]){
            setLoadedSrc(imageCache[src].src);
            return;
        }

        getImageFromCache(src).then((img)=>{
            setLoadedSrc(img.src);
        }).catch(()=>{
            console.error(`Failed to load image for ${src}`);
            setLoadedSrc(src);
        })

    }, [src])

    return <img src={loadedSrc||src} className={className} id={id} alt={alt} loading="eager" decoding="async"/>;
  
}

export type imgProps = Props;
export {getImageFromCache}