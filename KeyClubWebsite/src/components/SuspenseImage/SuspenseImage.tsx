import { Suspense } from "react";
import BaseImage from "./BaseImage";
import { imgProps } from "./BaseImage";

import "../../stylesheets/SuspenseImage.css"

export default function SuspenseImage(props: imgProps){
    return (<div style={props.width!= null || props.width != "" ? { width: props.width, height: props.height} : {}} className={`suspenseImage ${props.className}`} id={props.id}><Suspense fallback={<div className= "loading"/>}><BaseImage src={props.src} alt={props.alt}/></Suspense></div>)
}