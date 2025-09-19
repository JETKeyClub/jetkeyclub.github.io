"use client"

import { BlogPostType } from "@/types";
import { useState } from "react";

import { MdCancel } from "react-icons/md";
import SaveBtn from "./SaveBtn";
import { createTemplate } from "@/actions/blog/Blog";
import { redirect } from "next/navigation";

interface PostCreationCardProps {
    fullName: string;
}

export default function PostCreationCard({ fullName }: PostCreationCardProps){
    const [ useTitle, setTitle ] = useState<string>("");
    const [ useType, setType ] = useState<BlogPostType>("markdown");

    const [ useVisible, setVisible ] = useState<boolean>(false);

    return (
        <>
            <SaveBtn text="Create" promise={async () => setVisible(true)} disabled={useVisible}/>
            {useVisible && <div className="w-full h-screen absolute top-0 left-0 bg-gray-700/70 flex justify-center items-center z-1000">
                <div className="p-6 mb-30 rounded-xl border-[1px] border-gray-400 bg-white shadow-2xl flex flex-col gap-y-4">
                    <div className="flex justify-between items-center gap-x-5 border-b-[1px] pb-3 border-gray-300">
                        <h1 className="text-5xl font-bold">Create Post</h1>
                        <MdCancel className="text-5xl text-red-700 cursor-pointer hover:text-red-400 transition-all hover:scale-105"
                        onClick={()=>{
                            setVisible(false);
                        }}
                        />
                    </div>
                    <input className="p-3 text-3xl rounded-lg w-full border-[1px] border-gray-400" placeholder="Title:"
                    value={useTitle || ""} onChange={(e=> setTitle(e.target.value))} required/>

                    <label htmlFor="type" className="text-3xl">{"Type: "}</label>
                    <select className="p-3 text-3xl rounded-lg w-full border-[1px] border-gray-400" name="type"
                    value={useType} onChange={(e=> setType(e.target.value as BlogPostType))}>
                        <option value="pdf">PDF</option>
                        <option value="markdown">Markdown</option>
                    </select>

                    <SaveBtn className="w-60 h-15" text="Create" promise={async ()=>{
                            const id = await createTemplate({
                                title: useTitle,
                                type: useType,
                                uploadedBy: fullName
                            })

                            redirect(`/dashboard/editor?fileID=${id}`);

                    }}/>


                </div>
            </div>}
        </>
    )
}