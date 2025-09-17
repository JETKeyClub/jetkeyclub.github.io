import PDFDisplayer from "@/components/PDFDisplayer/PDFDisplayer";
import Tag from "./Tag";
import MarkdownBlogPost from "@/components/BlogPost/MarkdownBlogPost";

import { BlogPostProps } from "@/types";

export default function BlogPost(post: BlogPostProps){

    const parsedDate = new Date(post.date);
    
    return (
        <main className="flex flex-col items-center">
            <section className="pb-10 flex flex-col items-center text-center">
                <h1 className="text-8xl font-bold mb-5">{post.title}</h1>
                <p className="text-4xl w-[75%] italic font-light pb-5 border-b-[1px] border-solid border-gray-300">{post.description}</p>
                <div className="pt-5 flex gap-x-2 justify-center items-center font-light">
                    <p className="text-4xl">By</p>
                    {post.authors.map((author,idx)=><p className="text-4xl" key={`${author}-${idx}`}>{author}{post.authors.length > 2 && idx < post.authors.length-1 ? ",": ""}{ idx == post.authors.length-2 ? " and": " "}</p>)}
                </div>
                <p className="text-4xl font-semibold mt-4">{`${parsedDate.getMonth()}/${parsedDate.getDay()}/${parsedDate.getFullYear()}`}</p>
                <div className="flex gap-x-2 mt-4">
                    {post.tags.map((tag, idx)=><Tag key={`${tag}-${idx}`} tag={tag}/>)}
                </div>
                {/* {useMDFile} */}
            </section>

            
            {post.type === "pdf" && (
                <PDFDisplayer src={post.args.content} uuid={post.uuid!}/>
            )}
            {post.type === "markdown" && (
                <div>
                    <MarkdownBlogPost src={post.args.content} imageCache={post.args.imageCache}/>
                </div>
            )}
        </main>
    )    
}
