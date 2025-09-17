"use client"

import { BlogPostProps } from "@/types";
import { useState, useRef, Dispatch, SetStateAction } from "react"
import SaveBtn from "./SaveBtn";

interface FileUploadProps {
    initialSrc: string;
    setPost:  Dispatch<SetStateAction<BlogPostProps | undefined>>;
}

export default function FileUpload(props: FileUploadProps){
    const inputRef = useRef<HTMLInputElement>(null);
    const [ usefileTitle, setFileTitle ] = useState<string>(props.initialSrc);

    return (
        <div className="flex gap-x-3">
            <div>
                <input type="file" className="hidden" ref={inputRef} onChange={e=>{
                    const file = e.target.files![0];

                    if(file){
                        setFileTitle(file.name);
    
                        props.setPost(e=>{
                            return {
                                ...e!,
                                args: {
                                    ...e?.args,
                                    content: URL.createObjectURL(file),
                                    path: file.name
                                },
                                file: file
                            }
                        })
                    }
                }}/>
                <SaveBtn text="Upload" promise={async ()=>{
                    inputRef.current?.click();
                }}/>
            </div>
            <p className="text-3xl font-semibold">{usefileTitle}</p>
        </div>
    )
}