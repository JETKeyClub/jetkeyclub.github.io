"use client"

import { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";

interface MarkdownBlogPostProps{
    src: string;
}

export default function MarkdownBlogPost({ src }: MarkdownBlogPostProps){
    const [ useText, setText ] = useState<string>("");
    
    useEffect(()=>{
        fetch(src)
        .then(res=>{
            return res.text()
        })
        .then(text=>setText(text));
    },[])

    return <div>
        <MarkdownRenderer>
            {useText}
        </MarkdownRenderer>
    </div>
}

