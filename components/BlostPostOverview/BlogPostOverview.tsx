"use client"

import { BlogPostProps } from "@/components/BlogPost/BlogPost";
import SuspenseImage from "@/components/SuspenseImage/SuspenseImage";
import Tag from "@/components/BlogPost/Tag";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { useEffect, useState } from "react";

interface BlogPostOverviewProps {
    props: BlogPostProps;
    coverImage: string;
}

export default function BlogPostOverview({ props, coverImage }: BlogPostOverviewProps){
    // console.log(props);
    return (
        <div className="flex border p-5 shadow-xl rounded-2xl group">
            <SuspenseImage unoptimized src={coverImage} alt={`Cover Image for ${props.title}.`} className="h-[56.25rem] w-100"/>
            <div className="flex flex-col gap-y-3 w-[40%]">
                <p className="font-semibold text-5xl">{props.title}</p>
                
                <p className="text-xl italic">
                    Written by {props.authors.join(", ")}
                </p>
                <div className="flex gap-x-1">
                    {props.tags.map((tag, idx)=><Tag tag={tag} key={`${tag}-${idx}`}/>)}
                </div>

                <p>{props.description}</p>
            </div>
        </div>
    );
}