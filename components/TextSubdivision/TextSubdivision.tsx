"use client"

import React, { ReactElement, ReactNode } from "react";

import { ComponentProps, Children } from "react";
import SuspenseImage, { SuspenseImageProps } from "../SuspenseImage/SuspenseImage";

type potentialSuspenseImage = ReactElement<SuspenseImageProps>

function isSuspenseImage(child: any): child is potentialSuspenseImage {
    return React.isValidElement(child) && typeof child.props === "object" && child.props !== null && "src" in child.props;
}

interface TextSubdivisionProps extends ComponentProps<"div"> {
    children?: React.ReactNode;
    className?: string;
}


export default function TextSubdivision({ children, className, ...props }: TextSubdivisionProps){

    const suspenseImages = Children.toArray(children).filter(child=>isSuspenseImage(child))
    const nonSuspenseImages = Children.toArray(children).filter(child=>!isSuspenseImage(child))
    // console.log(nonSuspenseImages)
    console.log(suspenseImages);

    return <div className={`w-full flex flex-col md:flex-row-reverse gap-8 p-8 items-center justify-between  ${suspenseImages.length >= 2 ? "md:items-start md:justify-center" : ""} ${className}`} {...props}>
        <div className="flex flex-col gap-y-5">
        {suspenseImages}
        </div>
        <div className="pl-8 flex-[1_1_50rem] flex flex-col gap-y-5 max-w-[65rem] md:max-w-[45rem] text-center md:text-start">
        {nonSuspenseImages}
        </div>
    </div>
}


        // <div className="p-8 flex flex-col gap-3 flex-[1_1_50rem] max-w-[67rem] text-center md:text-start hidden"></div>