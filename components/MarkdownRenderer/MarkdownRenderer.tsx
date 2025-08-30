"use client"

import React from "react"

export default function MarkdownRenderer({ children }: { children: React.ReactNode}){
    return (
    <div>
        {children}
    </div>);
}