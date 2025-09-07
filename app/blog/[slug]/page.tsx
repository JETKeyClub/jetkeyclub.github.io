"use client"

import BlogGallery from "@/components/BlostPostOverview/BlogGallery";
import { redirect, usePathname } from "next/navigation";
import BlogPost, { BlogPostProps } from "@/components/BlogPost/BlogPost";
import { getBlogPostById } from "@/actions/blog/Blog";
import { useEffect, useState } from "react";;

export default function Page(){
    const pathname = usePathname().replace("/blog/", "");
    const [ usePost, setPost ] = useState<BlogPostProps|undefined>();

    useEffect(()=>{
        try{
            getBlogPostById(Number.parseInt(pathname)).then((res)=>{
                if(res !== null) setPost(res);
                else redirect("/not-found")
        });
    }
        catch{
            redirect("/not-found")
        }
    }, [])


    return <div className="mt-10">
    {usePost && <BlogPost {...usePost}/>}
    </div>
}