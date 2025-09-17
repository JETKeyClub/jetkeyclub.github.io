"use client"

import { ComponentProps, useEffect, useRef, useState } from "react";
import { getMDFileFromPost } from "@/actions/blog/Blog";
import { clientUUID } from "@/types";

interface PDFDisplayerProps extends ComponentProps<"iframe"> {
    src: string;
    uuid: clientUUID;
}

export default function PDFDisplayer({src, uuid, className, ...props}: PDFDisplayerProps){

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [ useSrc, setSrc ] = useState<string>();

    const [ useDimensions, setDimensions ] = useState<number[]>([11,11]);

    useEffect(()=>{
        getMDFileFromPost(uuid, src).then(e => {
            setSrc(e);
        });
    }, [src]);

    return (<div className="w-auto flex justify-center p-3">
    
        {useSrc && <iframe {...props} src={`${src}#view=Fit&navpanes=0&toolbar=1`} className={`w-[85vw] overflow-x-visible h-screen ${className}`}/>}
    
    </div>
    )
}