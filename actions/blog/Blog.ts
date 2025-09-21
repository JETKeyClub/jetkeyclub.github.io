 
"use server"

import { database, supabase } from "@/actions/database/Database";
import { BlogPostProps, imageCache, PostTemplate } from "@/types";
import { randomUUID, UUID } from "crypto";
import { whiteSpacePattern } from "@/actions/dashboard/DashboardActions";

const blogBucket = supabase.storage.from("blog");

// const MarkdownPost = zod.object({
//     title: zod.string().nonempty("Can't be an empty title."),
//     coverImage: zod.file().nonoptional("You need a cover image."),
//     description: zod.string().nonempty("Can't be an empty description."),
//     authors: zod.array(zod.string().nonempty("Can't have an empty author")),
//     tags: zod.array(zod.enum(["Newsletter", "Announcement", "Info", "Project", "Update"])),
//     imageFiles: zod.array(zod.file()),
//     content: zod.file(),
//     uploadedBy: zod.string().nonempty(),
// })

// const PDFPost = zod.object({
//     title: zod.string().nonempty("Can't be an empty title."),
//     coverImage: zod.file().nonoptional("You need a cover image."),
//     description: zod.string().nonempty("Can't be an empty description."),
//     authors: zod.array(zod.string().nonempty("Can't have an empty author")),
//     tags: zod.array(zod.enum(["Newsletter", "Announcement", "Info", "Project", "Update"])),
//     pdfFile: zod.file("Must be a file."),
//     uploadedBy: zod.string().nonempty(),
// })

export async function fetchBlogPosts(){
    const blogPosts = await database`SELECT id FROM blog`;
    return blogPosts.map((id)=> getBlogPostById(id.id, true));
}

export async function createTemplate(post: PostTemplate){
    const uuid = randomUUID();


    const formattedPost: BlogPostProps ={
        ...post,
        description: "",
        authors: [post.uploadedBy],
        date: Date.now(),
        tags: [],
        args: {
            content: "src.md",
        }
    }

    await supabase.storage.from("blog").copy("src.md", `${uuid}/src.md`);

    return (await database`INSERT INTO blog (title, uuid, uploaded_by, visible, date, authors, tags, args) VALUES (${post.title}, ${uuid}, ${post.uploadedBy}, ${false}, ${formattedPost.date}, ${formattedPost.authors}, ${formattedPost.tags}, ${database.json(formattedPost.args)}) RETURNING id`)[0]
}

export async function createMarkdownPost(post: BlogPostProps){
    const uniqueIdentifier = randomUUID()

    await database`INSERT INTO blog (title, authors, tags, uuid) VALUES (${post.title}, ${post.authors}, ${post.tags}, ${uniqueIdentifier})`

    return {
        "message" : "Upload successful!"
    };
}

export async function getCoverImage(uuid: UUID): Promise<string> {
    return  blogBucket.getPublicUrl(`${uuid}/coverImage`).data.publicUrl;
}

export async function getImageCache(post: Pick<BlogPostProps, "uuid">): Promise<imageCache>{
    const fileNames = (await blogBucket.list(`${post.uuid}`)).data?.filter(file=>!file.name.endsWith(".md")).map(file=>file.name);
    
    const publicUrlCache: imageCache = {}
    
    if(fileNames){
        for(const fileName of fileNames){
            publicUrlCache[fileName] = supabase.storage.from("blog").getPublicUrl(`${post.uuid}/${fileName}`).data.publicUrl; 
        }
    }

    return publicUrlCache;
}

export async function getMDFileFromPost(uuid: UUID, content: string){
    return blogBucket.getPublicUrl(`${uuid}/${content.replaceAll(whiteSpacePattern, "_")}`).data.publicUrl;
}

export async function renderMarkdownPost(post: BlogPostProps): Promise<BlogPostProps>{
            
    post.args.imageCache = await getImageCache(post) || {};
    post.args.path = post.args.content;
    post.args.content = await getMDFileFromPost(post.uuid!, post.args.content);
    
    return post;
}

export async function renderPDFPost(post: BlogPostProps): Promise<BlogPostProps> {
    post.type = "pdf";
    post.args.path = post.args.content;
    post.args.content = supabase.storage.from("blog").getPublicUrl(`${post.uuid}/${post.args.content.replaceAll(whiteSpacePattern, "_")}`).data.publicUrl;

    return post;
}

const cache: Map<number,BlogPostProps> = new Map<number, BlogPostProps>();

export async function deleteKeyFromCache(id: number){
    cache.delete(id);
}

export async function getBlogPostById(id: number, isPublic: boolean): Promise<BlogPostProps|null> {

    const post = (await database<BlogPostProps[]>`SELECT * FROM blog WHERE id=${id}`)[0];

    if(isPublic && !post.visible) return null;

    const parsedPost = await renderMarkdownPost(post);
    cache.set(id, parsedPost);

    return parsedPost;
}



// export async function getImageFileFromUUID(uuid: string, path: string): Promise<Blob>{
//     const data = (await supabase.storage.from(uuid).download(path)).data;
//     if(!data) return new Blob(["Image not found..."]);
//     return data;
// }

