"use client"

import { ComponentProps, useEffect, useState } from "react";
import { getMDFileFromPost } from "@/actions/blog/Blog";
import { clientUUID } from "@/types";

interface PDFDisplayerProps extends ComponentProps<"iframe"> {
    src: string;
    uuid: clientUUID;
}

export default function PDFDisplayer({src, uuid, className, ...props}: PDFDisplayerProps){

    const [ useSrc, setSrc ] = useState<string>();

    useEffect(()=>{
        getMDFileFromPost(uuid, src).then(e => {
            setSrc(e);
        });
    }, [src, uuid]);

    return (<div className="w-auto flex justify-center p-3">
    
        {useSrc && <iframe {...props} src={`${src}#view=Fit&navpanes=0&toolbar=1`} className={`w-[85vw] overflow-x-visible h-screen ${className}`}/>}
    
    </div>
    )
}