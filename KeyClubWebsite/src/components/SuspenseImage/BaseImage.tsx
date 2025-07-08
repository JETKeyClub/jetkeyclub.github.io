import { useEffect } from "react";
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
const imageCache: { [key : string]: resource<HTMLImageElement>} = {};

function generateImage(image: string): Promise<HTMLImageElement>{
    return new Promise<HTMLImageElement>((resolve, reject)=>{
        const img: HTMLImageElement = new Image();
        img.src = image;
        img.onload = () => img.decode().then(()=> resolve(img)).catch(reject)
    });
}

function getImageFromCache(image: string): HTMLImageElement{

    if(!imageCache[image]){
        imageCache[image] = CreateResource(generateImage(image));
    }
    return imageCache[image].read();
}

//Base Image
export default function BaseImage({ src, className, id, alt} : Props){

    useEffect(()=>{
        getImageFromCache(src);
    }, [src])

    return <img src={getImageFromCache(src).src} className={className} id={id} alt={alt} loading="lazy" decoding="async"/>;
  
}

export type imgProps = Props;
export {getImageFromCache}