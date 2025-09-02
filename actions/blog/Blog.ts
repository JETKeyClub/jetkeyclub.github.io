"use server"
import * as zod from "zod";

import { database, supabase } from "../database/Database";
import BlogPostComponent, { BlogPostProps } from "@/components/BlogPost/BlogPost";
import { randomUUID, UUID } from "crypto";

const count = await database`SELECT COUNT(*) AS POSTS FROM blog`;

export async function fetchBlogPosts(){
    return (new Array(count)).map((_, idx)=>getBlogPostById(idx+1));
}

const MarkdownPost = zod.object({
    title: zod.string().nonempty("Can't be an empty title."),
    coverImage: zod.file().nonoptional("You need a cover image."),
    description: zod.string().nonempty("Can't be an empty description."),
    authors: zod.array(zod.string().nonempty("Can't have an empty author")),
    tags: zod.array(zod.enum(["Newsletter", "Announcement", "Info", "Project", "Update"])),
    imageFiles: zod.array(zod.file()),
    content: zod.file()
})

const PDFPost = zod.object({
    title: zod.string().nonempty("Can't be an empty title."),
    coverImage: zod.file().nonoptional("You need a cover image."),
    description: zod.string().nonempty("Can't be an empty description."),
    authors: zod.array(zod.string().nonempty("Can't have an empty author")),
    tags: zod.array(zod.enum(["Newsletter", "Announcement", "Info", "Project", "Update"])),
    pdfFile: zod.file("Must be a file.")
})



export type BlogCreationSchema = {
    message?: string | null,
    errors?: {
        title?: string[],
        coverImage?: File[],
        description?: string[],
        authors?: string[],
        tags?: string[],
        file?: string[],
        imageFiles?: string[],
        pdfFile?: string[],
        content?: string[]
    }
}

export async function createMarkdownPost(formData: FormData){

    const parsedData = MarkdownPost.safeParse(
        {
            title: formData.get("title"),
            description: formData.get("description"),
            coverImage: formData.get("coverImage"),
            authors: formData.get("authors"),
            tags: formData.get("tags"),
            imageFiles: formData.get("imageFiles"),
            content: formData.get("content")
        }
    );

    if(!parsedData.success)
        return parsedData.error.flatten().fieldErrors;

    const actualData = parsedData.data;
    
    const uniqueIdentifier = randomUUID()

    const suc = await database`INSERT INTO blog (title, authors, tags, uuid) VALUES (${actualData.title}, ${actualData.authors}, ${actualData.tags}, ${uniqueIdentifier})`

    supabase.storage.from("blog").upload(`${uniqueIdentifier}/${actualData.coverImage.name}`, actualData.coverImage);
    for( const file of actualData.imageFiles )
        supabase.storage.from("blog").upload(`${uniqueIdentifier}/${file.name}`, file);
    
    return {
        "message" : "Upload successful!"
    };
}

export async function renderMarkdownPost(post: BlogPostProps): Promise<BlogPostProps>{

    const blogBucket = await supabase.storage.from("blog");

    const mdFile = await blogBucket.getPublicUrl(`${post.uuid}/${post.args.content}`).data.publicUrl;
    const coverImage = await blogBucket.getPublicUrl(`${post.uuid}/${post.coverImg}`).data.publicUrl;

    const fileNames = (await blogBucket.list(`${post.uuid}`)).data?.filter(file=>file.name != post.args.content && file.name != post.coverImg).map(file=>file.name);
    const publicUrlCache: {[key: string]: string} = {}
    if(fileNames){
        for(const fileName of fileNames){
            publicUrlCache[fileName] = await supabase.storage.from("blog").getPublicUrl(`${post.uuid}/${fileName}`).data.publicUrl; 
        }
    }
    
    return (
        {
            ...post,
            coverImg: coverImage,
            type: "markdown",
            args: {
                content: mdFile,
                imageCache: publicUrlCache
            }
        }
    )
}


const cache: Map<number,BlogPostProps> = new Map<number, BlogPostProps>();

export async function getBlogPostById(id: number): Promise<BlogPostProps> {
    if(cache.has(id)) return cache.get(id)!;
    
    const post = (await database<BlogPostProps[]>`SELECT * FROM blog WHERE id=${id}`)[0];

    if(post===null) throw new Error(`Post with an id of ${id} is null.`)

    if(post.type==="markdown"){
        const parsedPost = await renderMarkdownPost(post);
        cache.set(id, parsedPost);
    }
    else cache.set(id, post);

    return cache.get(id)!;
}
