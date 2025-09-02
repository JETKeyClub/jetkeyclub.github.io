"use client"

import { fetchBlogPosts, renderMarkdownPost } from "@/actions/blog/Blog";
import { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";
import MdComp from "@/app/test/comp.mdx";
import BlogPost from "@/components/BlogPost/BlogPost";

export default function Page(){

    const [ useBlogPosts, setBlogPosts ] = useState<any[]>();

    useEffect(()=>{
        fetchBlogPosts().then(
            async (val)=>{
                setBlogPosts(val.map(async post=> {
                    const postInfo = await renderMarkdownPost(await post);
                    return <BlogPost {...postInfo}/>
                }));
            }
        )
    }, [])

    return <div>
        {useBlogPosts}
    </div>
}