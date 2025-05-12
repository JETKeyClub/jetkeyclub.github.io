import {CreateResource, resource } from "../Resource";

interface Props {
    src: string
    className?:string | ""
    id?:string | ""
    alt?:string| ""
    width?:string| ""
    height?:string| ""

}

const imageCache: { [key : string]: resource<HTMLImageElement>} = {};

function generateImage(image: string): Promise<HTMLImageElement>{
    return new Promise<HTMLImageElement>(resolve=>{
        const img: HTMLImageElement = new Image();
        img.src = image;
        img.onload = () => resolve(img);
    });
}

function getImageFromCache(image: string): HTMLImageElement{

    if(!imageCache[image]){
        imageCache[image] = CreateResource(generateImage(image));
    }
    return imageCache[image].read();
}

export default function BaseImage({ src, className, id, alt} : Props){
    return <img src={getImageFromCache(src).src} className={className} id={id} alt={alt} loading="lazy"/>;
  
}

export type imgProps = Props;
export {getImageFromCache}