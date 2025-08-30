"use client"

import { ComponentProps } from "react";
import Image from "next/image";
import { Viewer, Worker } from "@react-pdf-viewer/core";


interface PDFDisplayerProps extends ComponentProps<"iframe"> {
    src: string;
}

export default function PDFDisplayer({src, ...props}: PDFDisplayerProps){

    return (
        <iframe src={`${src}#view=Fit&navpanes=0&toolbar=0`} className="w-[50vw] h-screen"/>
    )
}