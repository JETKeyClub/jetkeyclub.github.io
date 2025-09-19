import { BlogPostProps, clientUUID } from "@/types";
import {getBlogPostById } from "@/actions/blog/Blog";
import { database, supabase } from "@/actions/database/Database";

interface BlogIdParser {
    id: number;
}
export type BlogType = Promise<BlogPostProps>[];
// const cache: Map<string, BlogType> = new Map<string, BlogType>();

export async function getPostsByName(name: string){
    try{
        const res = (await database<BlogIdParser[]>`SELECT * FROM blog WHERE ${name}=ANY(authors) OR uploaded_by=${name}`).map(async post => await getBlogPostById(post.id, false)) as Promise<BlogPostProps>[];

        return res;
    }
    catch{
        return [];
    }
    
}

// export async function hasAccessToPost(name: string, id: number){
//     return (await database`SELECT COUNT(*) FROM blog WHERE ${name}=ANY(authors) OR uploaded_by=${name} AND id=${id}`).length > 0;
// }

export async function deletePost(id: number, uuid: clientUUID){
    try{
        await supabase.storage.from("blog")
        .remove([uuid])
    
        await database`DELETE FROM blog WHERE id=${id}`
        return "Successfully deleted!"
    }
    catch{
        return "An occured happened";
    }
}

export async function deleteImage(src: string): Promise<string>{
    const { error} = await supabase.storage
    .from("blog")
    .remove([src]);

    if(error) throw error;

    return "File Deleted Sucessfully!";
}

export async function renameImage( src: string, to: string){
    const { error } = await supabase.storage.from("blog")
    .move(src, to);
    
    if(error) throw error;
    return `File renamed to ${to}`;
}

export async function uploadImage(uuid: clientUUID, file: File){
    const { error } = await supabase.storage.from("blog").upload(
        `${uuid}/${file.name}`, file
    )

    if(error) throw error;
    return "File uploaded successfully!"
}

export async function updateMarkdownFile(post: Pick<BlogPostProps, "args"|"uuid"|"id"|"type"|"file">, content: string){
   
    if(!post.args || !post.uuid || !post.id) return "Values are missing!";
   
    const file = new File([content], post.args.path!, {type: post.type === "markdown" ? "text/plain" : "application/pdf"});
    
    await supabase.storage.from("blog")
    .update(`${post.uuid}/${post.args.path}`, file)

    const args = post.args;

    if(args.content.startsWith("http")) args.content = args.content.substring(args.content.lastIndexOf("/")+1);
    if(args.content.startsWith("blob:http")){
        post.args.content = post.args.path || "src.pdf";

        await supabase.storage.from("blog")
        .upload(`${post.uuid}/${post.args.content}`, post.file!);
    }

    await database`UPDATE blog SET args=${database.json(args)}, type=${post.type} WHERE id=${post.id}`

    return "File updated successfully!";

}

export async function updateInformation(id:number, post: Pick<BlogPostProps, "title"|"authors"|"date"|"tags"|"description">){
    await database`UPDATE blog SET 
    title=${post.title},
    authors=${post.authors},
    date=${post.date},
    tags=${post.tags}, 
    description=${post.description}
    WHERE id=${id}`
}