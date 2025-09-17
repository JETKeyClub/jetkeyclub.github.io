
export type BlogPostType = "pdf" | "markdown";

export enum BlogPostTypeEnum {
    Markdown = "markdown",
    Pdf = "pdf"
}

export type BlogTags = "Newsletter" | "Announcement" | "Info" | "Project" | "Update";

import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface BlogPostProps{
    title: string;
    description: string;
    authors: string[];
    date: Timestamp;
    tags: BlogTags[];
    type: BlogPostType;
    // coverImage?: string;
    id?: number;
    uuid?: clientUUID;  
    args: {
        content: string;
        path?: string;
        imageCache?: imageCache;
    };
    file?: File;
    uploadedBy?: string;
    visible?: boolean;
}

export interface PostTemplate {
    title: string;
    type: BlogPostType
    uploadedBy: string;
}


export type FileImage = {
    type: "local" | "server",
    src: string,
    link: string;
    bucket?: string,
    uuid: clientUUID,
    file?: Promise<Blob>
}

export type clientUUID =  `${string}-${string}-${string}-${string}-${string}`; //had to put this cuz clients can't have crypto library

export type imageCache = {[key: string]: string};
