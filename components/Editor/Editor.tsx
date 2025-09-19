/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { redirect, useSearchParams } from "next/navigation";
import { getBlogPostById, getImageCache } from "@/actions/blog/Blog";
import { useState, useEffect } from "react";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";
import { BlogPostProps, imageCache } from "@/types";
import Filesystem from "./Filesystem/Filesystem";
import { updateMarkdownFix } from "./Filesystem/FileFix";
import SaveBtn from "./SaveBtn";
import HeaderInformation from "./HeaderInformation";
import PDFDisplayer from "../PDFDisplayer/PDFDisplayer";
import FileUpload from "./FileUpload";


interface EditorProps {
    postIds: any[]
}

export default function Editor({postIds}: EditorProps){
    const file = useSearchParams().get("fileID");

    console.log(postIds);
    console.log(file)

    if(file && postIds.indexOf(file)==-1) redirect("/dashboard");
    

    const [ useContents, setContents ] = useState<string>("");
    const [ useImageCache, setImageCache ] = useState<imageCache>({});
    const [ usePost, setPost ] = useState<BlogPostProps>();

    useEffect(()=>{
        if(file)
            getBlogPostById(Number.parseInt(file), false)
            .then(post=>{
                if(post?.args.content)
                fetch(post?.args.content)
                .then(res=>res.text())
                .then(text=>setContents(text));
                
                setPost(post!);

                if(post?.args.imageCache)
                    setImageCache(post?.args.imageCache);
            });
    }, [postIds, file])

    const refreshCache = () => {
        if(usePost?.uuid)
        getImageCache({ uuid: usePost?.uuid})
        .then(cache=>setImageCache(cache));
    }

    return (
        <div className="pl-4">
            {usePost && <HeaderInformation id={usePost.id!} post={usePost} setPost={setPost} usePost={usePost}/>}
            {
              usePost?.uuid &&  <Filesystem imageCache={useImageCache} refreshCache={refreshCache} uuid={usePost?.uuid}/>
            }

            <div className="flex gap-x-[1px] bg-gray-400 border-t-[1px] border-t-gray-400">
                <section className="w-[75%] bg-white">
                    <div className="flex gap-x-6 items-center">
                        <h2 className="text-6xl font-bold pl-3">Editor</h2>
                        <SaveBtn 
                        text="Save"
                        promise={async ()=>{
                            console.log(useContents);

                            if(usePost) await updateMarkdownFix(usePost, useContents)
                        }}/>
                    </div>
                    <div className="border-b-[1px] py-1 border-gray-400"/> 
                    {usePost?.type === "markdown" && (<textarea className="pl-3 pt-3 w-full h-screen focus:border-0" value={useContents} onChange={(e)=>setContents(e.target.value )}/>)}
                    {usePost?.type === "pdf" && usePost.args.path && <FileUpload initialSrc={usePost?.args.path} setPost={setPost}/>}
                </section>
                <section className="w-[75%] bg-white">
                    
                    <h2 className="text-6xl font-bold pl-3">Preview</h2>
                    <div className="border-b-[1px] py-1 border-gray-400"/> 
                    
                    <div className="w-full h-screen overflow-y-scroll">

                        {
                            usePost && (
                                usePost.type === "markdown" ? (
                                    <MarkdownRenderer imageCache={useImageCache}>
                                        {useContents}
                                    </MarkdownRenderer>
                                ) : usePost.type === "pdf" && usePost.args.content !== "" ? (
                                    <PDFDisplayer uuid={usePost.uuid!} src={usePost.args.content}/>
                                ): <></>
                            )
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}