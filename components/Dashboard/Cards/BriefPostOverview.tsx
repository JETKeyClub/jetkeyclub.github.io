"use client"

import { RiArticleFill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import Tooltip from "@/components/Tooltip/Tooltip";

import { BlogPostProps } from "@/types";
import { deletePost } from "@/components/Editor/Filesystem/FileFix";

interface BriefPostOverviewProps {
  posts: BlogPostProps[]
}

export default function BriefPostOverview({ posts }: BriefPostOverviewProps){

  console.log(posts);

  return (
  <div className="w-175 rounded-2xl border-[1px] border-gray-300 shadow-xl p-5">
    <h2 className="text-4xl">Your Posts</h2>
    <div className="border-b-[1px] border-gray-300 my-3"></div>
    {posts.map((post, idx)=>(
      <div className="flex gap-x-2 justify-between group px-5" key={`${post.title}-blogOverview-${idx}`}>
        <div className="flex gap-x-2">
          <RiArticleFill className="text-3xl"/>
          <p className="text-3xl transition-all" key={`${post.title}-${idx}`}>{post.title}</p>
        </div>
        <div className="flex gap-x-6">
          <Tooltip icon={FaEye} text="Show Post" href={`/blog/${post.id}`}/>
          <Tooltip icon={FaPencilAlt} text="Edit Post" href={`/dashboard/editor?fileID=${post.id}`}/>
          <Tooltip icon={FaTrashCan} text="Delete Post" href={`/dashboard`} onClick={()=> post && deletePost(post.id!, post.uuid!)}/>
        </div>
      </div>
    ))}
  </div>);
}