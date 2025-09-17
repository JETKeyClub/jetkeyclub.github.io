/* eslint-disable @typescript-eslint/no-explicit-any */


import React from "react"
import Markdown from "react-markdown";
import Link from "next/link";
import { imageCache } from "@/types";
import SuspenseImage from "../SuspenseImage/SuspenseImage";

export default function MarkdownRenderer({ children, imageCache }: { children: React.ReactNode, imageCache?: imageCache}){
        
    return (
    <div className="text-left items-center md:items-start flex flex-col gap-y-5 p-10 w-[90%]">
        <Markdown components={{
            p(props: any){ return <div {...props} className="text-[200%] text-center md:text-left">{props.children}</div>},
            li(props: any){ return <li {...props} className="text-[200%] ml-10 list-disc pb-3">{props.children}</li>},
            pre(props: any){ return <pre {...props} className="text-[150%] font-semibold p-4 bg-gray-800 text-white w-full text-wrap wrap-anywhere">{props.children}</pre>},
            a(props: any){ return <Link {...props} target="_blank" className="text-blue-500 hover:text-blue-700 visited:text-violet-500 visited:hover:text-violet-700 font-semibold transition-all text-center md:text-left">{props.children}</Link> },
            img(props:any){
                const src = !(props.src as string).startsWith("https://") ? (imageCache && imageCache[props.src] || "/Assets/FileNotFound.png") : props.src as string;
                return <SuspenseImage {...props} unoptimized alt={props.alt} src={src} width={1600} height={900} className="w-full"/>
            },
            h4(props: any){return <h4  className="font-bold text-[250%] text-center md:text-left">{props.children}</h4>},
            h3(props: any){ return <h3 className="font-bold text-[400%] text-center md:text-left">{props.children}</h3>},
            h2(props:any){ return <h2 className="font-bold text-[550%] text-center md:text-left">{props.children}</h2>},
            h1(props:any){ return <h1 className="font-bold text-[700%] text-center md:text-left">{props.children}</h1>}

        }}>
            {children?.toString()}
        </Markdown>
    </div>);
}