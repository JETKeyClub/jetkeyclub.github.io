import { fetchBlogPosts } from "@/actions/blog/Blog"
import BlogPostOverview from "@/components/BlostPostOverview/BlogPostOverview";


export default  async function Blog(){
    
    const posts = await fetchBlogPosts();

    return (
        <div>
            {posts.map(async (post, idx)=><BlogPostOverview props={await post} key={`post-${idx}`}/>)}
        </div>
    )
}