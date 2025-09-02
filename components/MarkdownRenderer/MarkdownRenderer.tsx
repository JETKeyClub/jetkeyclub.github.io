import React from "react"
import Markdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";

export default function MarkdownRenderer({ children }: { children: React.ReactNode}){
    return (
    <div className="text-left items-center md:items-start flex flex-col gap-y-5 p-10">
        <Markdown components={{
            p(props: any){ return <p {...props} className="text-3xl">{props.children}</p>},
            li(props: any){ return <li {...props} className="text-3xl ml-10 list-disc pb-3">{props.children}</li>},
            pre(props: any){ return <pre {...props} className="text-xl font-semibold p-4 bg-gray-800 text-white w-[80vw]">{props.children}</pre>},
            a(props: any){ return <Link {...props} target="_blank" className="text-blue-500 hover:text-blue-700 visited:text-violet-500 visited:hover:text-violet-700 font-semibold transition-all">{props.children}</Link> },
            img(props:any){return <Image {...props} unoptimized alt={props.alt} src={props.src} width={1600} height={900} className="w-full"/>},
            h4(props: any){return <h4  className="font-bold text-5xl">{props.children}</h4>},
            h3(props: any){ return <h3 className="font-bold text-6xl">{props.children}</h3>},
            h2(props:any){ return <h2 className="font-bold text-7xl">{props.children}</h2>},
            h1(props:any){ return <h1 className="font-bold text-8xl">{props.children}</h1>}

        }}>
            {children?.toString()}
        </Markdown>
    </div>);
}