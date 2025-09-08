import { BlogPostProps } from "@/components/BlogPost/BlogPost";
import { getBlogPostById } from "../blog/Blog";
import { database } from "@/actions/database/Database";

interface BlogIdParser {
    id: number;
}
type BlogType = Promise<BlogPostProps>[];
const cache: Map<string, BlogType> = new Map<string, BlogType>();

export async function getPostsByName(name: string){
    if(cache.has(name)) return cache.get(name);

    const res = (await database<BlogIdParser[]>`SELECT id FROM blog WHERE ${name}=ANY(authors)`).map(async post => await getBlogPostById(post.id)) as Promise<BlogPostProps>[];
    cache.set(name, res);
    return res;
    
}
