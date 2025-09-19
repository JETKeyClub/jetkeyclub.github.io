"use client"

import clsx from "clsx";

import { FileImage } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

import { renameImageFix, deleteImageFix } from "./FileFix";

import { FaTrash } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
interface FileCardProps extends FileImage {
    refreshCache: ()=>void;
    setImage: Dispatch<SetStateAction<{link: string, src: string}|undefined>>;
    activeImage: string;
}


export default function FileCard(props: FileCardProps){

    const [ useName, setName ] = useState<string>(props.src);
    const [ useInRename, setInRename ] = useState<boolean>(false);

    return (
        <div className={
            clsx("flex items-center cursor-pointer w-full justify-between p-2 transition-colors active:bg-gray-400 bg-gray-100",{
                " hover:bg-gray-300": props.src != props.activeImage,
                "bg-gray-400/50": props.src == props.activeImage

            })
        }
            onClick={()=>props.setImage({link: props.link, src: props.src})}
        >
            {!useInRename && <p className="text-[115%] select-none">{useName}</p>||
            <input onChange={e=>setName(e.target.value)} className="text-[115%]" autoFocus value={useName} onKeyDown={e=>{
                if(e.code === "Enter") {
                    setInRename(false); 
                    renameImageFix(`${props.uuid}/${props.src}`, `${props.uuid}/${useName}`).then(()=>props.refreshCache());
                }
            }}/>
            }

            <div className="flex gap-x-2 items-center">

                <HiPencilSquare className="transition-colors hover:text-white cursor-pointer size-6" onClick={()=>{
                    setInRename(true);
                }}/>

                <FaTrash className="transition-colors hover:text-red-400 cursor-pointer size-5" onClick={()=>{
                    if(props.type==='server')
                        deleteImageFix(`${props.uuid}/${useName}`)
                        .then(()=>props.refreshCache())
                }}/>
            
            </div>
        </div>
    )
}