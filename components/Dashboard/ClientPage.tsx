"use client"

import { useState, useEffect } from "react";
import { getPostsByName } from "@/actions/dashboard/DashboardActions";
import BriefPostOverview from "@/components/Dashboard/Cards/BriefPostOverview";
import { BlogPostProps } from "@/components/BlogPost/BlogPost";

interface ClientPageProps {
    email: string;
    name: string;
    role: string;
}

export default function ClientPage({ email, name, role }: ClientPageProps){
  const [ useBlogOverviews, setBlogOverviews ] = useState<BlogPostProps[]>();
  
  useEffect(()=>{
    (async ()=>{

        const blogPosts = (await getPostsByName(name)) as Promise<BlogPostProps>[];


        Promise.all(blogPosts).then(posts=>setBlogOverviews(posts));

    })();
    
  }, []);

  return (

    <div className="p-10">
        <h1 className="text-5xl font-bold">{name}</h1>
        <p className="text-4xl italic">Role: {role.substring(0,1).toUpperCase()+role.substring(1)}</p>
        {useBlogOverviews && <BriefPostOverview posts={useBlogOverviews} />}
    </div>

  )
}