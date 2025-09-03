import PDFDisplayer from "@/components/PDFDisplayer/PDFDisplayer";
import Tag from "./Tag";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import MarkdownBlogPost from "@/components/BlogPost/MarkdownBlogPost";
import { BlogTags, BlogPostType } from "@/types";

import { UUID } from "crypto";

export interface BlogPostProps{
    title: string;
    description: string;
    authors: string[];
    date: Timestamp;
    tags: BlogTags[];
    type: BlogPostType;
    // coverImage?: string;
    id?: number;
    uuid?: UUID;  
    args: {
        content: string;
        // imageCache?: {[key: string]: string}
    }
}

export default function BlogPost({ title, description, authors, date, tags, type, args}: BlogPostProps){

    const parsedDate = new Date(date);
    
    return (
        <main className="flex flex-col items-center">
            <section className="pb-10 flex flex-col items-center">
                <h1 className="text-8xl font-bold">{title}</h1>
                <p className="text-5xl italic font-light pb-5 border-b-[1px] border-solid border-gray-300">{description}</p>
                <div className="pt-5 flex gap-x-2 justify-center items-center font-light text-3xl">
                    <p>By</p>
                    {authors.map((author,idx)=><p key={`${author}-${idx}`}>{author}{authors.length > 2 && idx < authors.length-2 ? ",": ""}{ idx == authors.length-2 ? " and": " "}</p>)}
                </div>
                <p className="text-4xl font-semibold mt-4">{`${parsedDate.getMonth()}/${parsedDate.getDay()}/${parsedDate.getFullYear()}`}</p>
                <div className="flex gap-x-2 mt-4">
                    {tags.map((tag, idx)=><Tag key={`${tag}-${idx}`} tag={tag}/>)}
                </div>
            </section>


            {type === "pdf" && (
                <PDFDisplayer src={args.content}/>
            )}
            {type === "markdown" && (
                <div>
                    <MarkdownBlogPost src={args.content}/>
                </div>
            )}
        </main>
    )    
}
