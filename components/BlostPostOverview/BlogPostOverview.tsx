"use client"

import { BlogPostProps } from "@/components/BlogPost/BlogPost";
import SuspenseImage from "@/components/SuspenseImage/SuspenseImage";
import Tag from "@/components/BlogPost/Tag";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCoverImage } from "@/actions/blog/Blog";

interface BlogPostOverviewProps {
    props: Promise<BlogPostProps>;
}

export default function BlogPostOverview( components: BlogPostOverviewProps){

    const [ props, setProps ] = useState<BlogPostProps|undefined>();
    const [ coverImage, setCoverImage ] = useState<string|undefined>();

    useEffect(()=>{
        components.props.then(result=>{
            setProps(result);
            getCoverImage(result.uuid!).then(img=>{
                setCoverImage(img);
            })
        })

    }, [])

    return (
        <Link href={props ? `/blog/${props.id}` : ""}>
            <div className="flex border p-5 shadow-xl rounded-2xl group items-center gap-x-4">
                {
                    props && coverImage && (
                    <>
                        <SuspenseImage unoptimized src={coverImage} alt={`Cover Image for ${props.title}.`} className="h-80 w-120 transition-all group-hover:brightness-75 group-hover:grayscale"/>
                        <div className="flex flex-col gap-y-3 w-[40%]">
                            <p className="font-semibold text-5xl transition-transform group-hover:-translate-y-3 group-hover:underline">{props.title}</p>
                            
                            <p className="text-2xl italic">
                                Written by {props.authors.join(", ")}
                            </p>
                            <div className="flex gap-x-1">
                                {props.tags.map((tag, idx)=><Tag tag={tag} key={`${tag}-${idx}`}/>)}
                            </div>

                            <p className="text-2xl">{props.description}</p>
                        </div>
                    </>
                ) || (
                    <p className="h-80"></p>
                )
                }
            </div>
        </Link>
    );
}