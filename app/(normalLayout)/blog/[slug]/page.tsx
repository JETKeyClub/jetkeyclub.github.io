"use client"

import { redirect, usePathname } from "next/navigation";
import BlogPost from "@/components/BlogPost/BlogPost";
import { BlogPostProps } from "@/types";
import { getBlogPostById } from "@/actions/blog/Blog";
import { useEffect, useState } from "react";;
import { Suspense } from "react";
export default function Page(){
    const pathname = usePathname().replace("/blog/", "");
    const [ usePost, setPost ] = useState<BlogPostProps|undefined>();

    useEffect(()=>{
        try{
            getBlogPostById(Number.parseInt(pathname), true).then((res)=>{
                console.log(res);
                if(res !== null) setPost(res);
                else redirect("/not-found")
        });
    }
        catch{
            redirect("/not-found")
        }
    }, [pathname])


    return (
    <>
        <Suspense>
            <div className="mt-10 flex justify-center">
            {usePost && <BlogPost {...usePost}/>}
            </div>
        </Suspense>
    </>
    );
}