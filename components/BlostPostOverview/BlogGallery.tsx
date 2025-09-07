"use client"

import { useEffect, useState } from "react"
import { fetchBlogPosts, getCoverImage } from "@/actions/blog/Blog"
import BlogPostOverview from "@/components/BlostPostOverview/BlogPostOverview";
import { BlogPostProps } from "../BlogPost/BlogPost";

export default function BlogGallery(){
    
    const [ useBlogPosts, setBlogPosts ] = useState<any[]>();

    useEffect(()=>{
        fetchBlogPosts().then(
            async (val)=>{
                setBlogPosts(val.map(async post=> {
                    if(post!=null)
                    return <BlogPostOverview props={post as Promise<BlogPostProps>}/>
                }));
            }
        )
    }, [])
    
    return <div className="p-10">
        {useBlogPosts}
    </div>
}