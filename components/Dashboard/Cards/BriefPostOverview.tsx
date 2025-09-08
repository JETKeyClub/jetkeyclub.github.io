"use client"

import { BlogPostProps } from "@/components/BlogPost/BlogPost";

interface BriefPostOverviewProps {
  posts: BlogPostProps[]
}

export default function BriefPostOverview({ posts }: BriefPostOverviewProps){

  return (
  <div className="w-175 rounded-2xl border-[1px] border-gray-300 shadow-xl p-5 group hover:bg-red-500">
    <h2 className="text-4xl">Your Posts</h2>
    {posts.map(post=><p className="text-3xl group-hover:underline transition-all">{post.title}</p>)}
  </div>);
}