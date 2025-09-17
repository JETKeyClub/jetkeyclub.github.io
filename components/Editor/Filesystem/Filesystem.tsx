"use client"

import { clientUUID, imageCache } from "@/types";
import { useRef, useState } from "react";
import { uploadImageFix } from "./FileFix";
import FileCard from "./FileCard";
import ImagePreview from "./ImagePreview";
import SaveBtn from "../SaveBtn";

interface FilesystemProps {
    imageCache: imageCache;
    refreshCache: ()=> void;
    uuid: clientUUID;
    
}


export default function Filesystem({ imageCache, refreshCache, ...post }: FilesystemProps){

    const [useImage, setImage] = useState<{link: string, src: string}|undefined>();
    const fileUploadRef = useRef<HTMLInputElement>(null);
    
    return (
        <div className="flex my-3 border-[1px] border-gray-400 p-3 rounded-lg">
            <div className="overflow-y-scroll overflow-x-hidden w-115">
            <p className="text-lg pb-3">{`You need a cover image. To add one, upload an image and name it "coverImage"`}</p>
                <SaveBtn
                promise={async ()=>{
                    fileUploadRef.current?.click();
                }} text="Upload File"/>
                <input type="file" className="hidden" ref={fileUploadRef} multiple onChange={(e)=>{
                    const files = [...e.target.files!].map(file=> uploadImageFix(post.uuid, file));
                    Promise.all(files).then(()=>refreshCache());
                }}/>

                <div className="mt-3">
                {
                Object.entries(imageCache)
                .map(([path, link], idx)=><FileCard activeImage={useImage?.src || ""} setImage={setImage} type="server" src={path} link={link} uuid={post.uuid} key={`file-${idx}-${path}-${link}`} refreshCache={refreshCache}/>)
                }
                </div>
            </div>

            {useImage && <ImagePreview {...useImage}/>}
        </div>
    );
}