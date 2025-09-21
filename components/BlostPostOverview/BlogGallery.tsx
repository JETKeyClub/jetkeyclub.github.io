/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useEffect, useState } from "react"
import { fetchBlogPosts } from "@/actions/blog/Blog"
import BlogPostOverview from "@/components/BlostPostOverview/BlogPostOverview";
import { BlogPostProps } from "@/types";

export default function BlogGallery(){
    
    const [ useBlogPosts, setBlogPosts ] = useState<any[]>();

    useEffect(()=>{
        fetchBlogPosts().then(
            async (val)=>{
                setBlogPosts(val.filter(e=>e !== undefined && e !== null).map(async (post, idx)=> {
                    if(post!=null)
                    return <BlogPostOverview key={`overview-${idx}`} props={post as Promise<BlogPostProps>}/>
                }));
            }
        )
    }, [])
    
    return <div className="p-10">
        {useBlogPosts || <p className="text-3xl font-bold">Loading</p>}
    </div>
}