import { Suspense } from "react";
import BaseImage from "./BaseImage";
import { imgProps } from "./BaseImage";

import "../../stylesheets/SuspenseImage.css"

export default function SuspenseImage(props: imgProps){
    return (<div onClick={props.onClick} style={props.width!= null || props.width != "" ? { width: props.width, height: props.height, pointerEvents: props.onClick===null ? "none" : "all", cursor: props.onClick===null ? "default" : "pointer"} : {}} className={`suspenseImage ${props.className}`} id={props.id}><Suspense fallback={<div className= "loading"/>}><BaseImage src={props.src} alt={props.alt}/></Suspense></div>)
}