"use client"

import { BlogPostProps, BlogPostType, BlogTags } from "@/types";
import Tag, { tagMap } from "../BlogPost/Tag";
import { useState, Dispatch, SetStateAction } from "react";
import SaveBtn from "./SaveBtn";
import { updateInformation } from "./Filesystem/FileFix";

interface HeaderInformationProps {
    id: number;
    post: BlogPostProps,
    setPost:  Dispatch<SetStateAction<BlogPostProps | undefined>>;
    usePost: BlogPostProps | undefined;
}


export default function HeaderInformation({ post, setPost, usePost }: HeaderInformationProps){

    const [ useTitle, setTitle ] = useState<string>(post.title || "");
    const [ useDescription, setDescription ] = useState<string>(post.description || "");
    const [ useAuthors, setAuthors] = useState<string[]>(post.authors || []);
    const [ useTags, setTags ] = useState<BlogTags[]>(post.tags || []);

    const [useVisible, setVisible] = useState<boolean>(post.visible||false);

    const onSave = async () => {


        const info = {
            title: useTitle,
            description: useDescription,
            tags: useTags,
            authors: useAuthors,
            date: post.date,
            visible: useVisible,
            type: usePost?.type
        };

        await updateInformation(post.id!, info);
    }

    const setType = (type: BlogPostType) => {
        setPost(e=>{
            return {
                ...e!,
                type: type
            }
        })
    }

    return (
        <section className="w-[75%]">
            <div className="flex items-center gap-x-3">
                <label htmlFor="title" className="text-3xl font-semibold">Title: </label>
                <input type="text" required className="grow-[1] text-3xl p-5 px-2 h-8 border-[1px] border-gray-400" name="title" value={useTitle} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            
            <div className="flex items-center gap-x-3">
                <label htmlFor="description" className="text-3xl font-semibold">Description: </label>
                <input type="text" required className="grow-[1] text-xl p-5 px-2 h-8 border-[1px] border-gray-400" name="description"
                value={useDescription} onChange={(e)=>setDescription(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-x-3">
                <label htmlFor="authors" className="text-3xl font-semibold">{`Authors: (seperated by line)`}</label>
                <textarea required className="grow-[1] text-xl p-5 px-2 h-32 border-[1px] border-gray-400" name="authors"
                value={useAuthors.reduce((a,b)=>a+"\n"+b)} onChange={(e)=>setAuthors(e.target.value.split("\n"))}
                />
            </div>

            <div className="p-5 border-[1px] border-gray-300 shadow-2xl rounded-2xl">
                <p className="text-3xl font-semibold pb-3">Tags:</p>
                <fieldset className="pl-5 flex flex-col gap-y-3">
                    {
                        Array.from(tagMap.keys()).map((key, idx)=>(
                            <div className="flex gap-x-4" key={`${key}-${idx}-headerInfo`}>
                                <input type="checkbox" value={key} name={key} 
                                defaultChecked={post.tags.indexOf(key)!==-1}
                                onChange={(val)=>setTags(tags=>{
                                    return [...(new Set([
                                        ...tags,
                                        val.target.value as BlogTags
                                    ]))]
                                })}
                                />
                                <Tag tag={key}/>
                            </div>
                        ))
                    }
                </fieldset>
                <div className="flex items-center gap-x-3">
                    <label htmlFor="visible" className="text-3xl font-bold">Visible</label>
                    <input type="checkbox" name="visible" checked={useVisible} onChange={e=>setVisible(e.target.checked)}/>
                </div>
            </div>

            <div className="flex my-3">
                <button className={`p-3 text-3xl ${usePost?.type==="markdown" ? "bg-gray-500 hover:bg-gray-400" : "bg-gray-300 hover:bg-gray-200"}
                 transition-all border-[1px] border-gray-700`}
                onClick={()=>setType("markdown")}
                >Markdown</button>
                <button className={`p-3 text-3xl ${usePost?.type==="pdf" ? "bg-gray-500 hover:bg-gray-400" : "bg-gray-300 hover:bg-gray-200"}
                transition-all border-[1px] border-gray-700`}
                onClick={()=>setType("pdf")}
                >PDF</button>
            </div>

            <SaveBtn text="Save Changes" promise={async ()=> { await onSave() }}/>
        </section>
    )
}