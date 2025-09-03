"use client"

import { useEffect, useState } from "react"
import { fetchBlogPosts, getCoverImage } from "@/actions/blog/Blog"
import BlogPostOverview from "@/components/BlostPostOverview/BlogPostOverview";

export default function BlogGallery(){
    
    const [ useBlogPosts, setBlogPosts ] = useState<any[]>();

    useEffect(()=>{
        fetchBlogPosts().then(
            async (val)=>{
                setBlogPosts(val.map(async post=> {
                    const fixedPost = await post;

                    console.log(fixedPost);

                    return <BlogPostOverview props={fixedPost} coverImage={await getCoverImage(fixedPost.uuid!)}/>
                }));
            }
        )
    }, [])
    
    return <div className="p-10">
        {useBlogPosts}
    </div>
}