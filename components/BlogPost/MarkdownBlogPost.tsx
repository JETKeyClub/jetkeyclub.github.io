"use client"

import { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";
import { imageCache } from "@/types";

interface MarkdownBlogPostProps{
    src: string;
    imageCache?: imageCache
}

export default function MarkdownBlogPost({ src, imageCache }: MarkdownBlogPostProps){
    const [ useText, setText ] = useState<string>("");
    
    useEffect(()=>{
        fetch(src)
        .then(res=>{
            return res.text()
        })
        .then(text=>setText(text));
    },[src])

    return <div>
        <MarkdownRenderer imageCache={imageCache}>
            {useText}
        </MarkdownRenderer>
    </div>
}

