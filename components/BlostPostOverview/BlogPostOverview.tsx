'use client'

import { BlogPostProps } from "@/components/BlogPost/BlogPost";
import SuspenseImage from "@/components/SuspenseImage/SuspenseImage";
import Tag from "@/components/BlogPost/Tag";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { useEffect, useState } from "react";

interface BlogPostOverviewProps {
    props: BlogPostProps
}

export default function BlogPostOverview({ props }: BlogPostOverviewProps){


    return (
        <div>
            { props?.coverImg  && <>x<SuspenseImage unoptimized src={props.coverImg} alt={`Cover image of the ${props.title}.`}/>
            <div>
                <p>{props.title}</p>
                <div className="flex">
                    {props.tags.map((tag, idx)=><Tag tag={tag} key={`${tag}-${idx}`}/>)}
                </div>
                <p>{props.description}</p>
            </div></>}
        </div>
    );
}