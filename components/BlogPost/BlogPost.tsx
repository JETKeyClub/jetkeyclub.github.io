import PDFDisplayer from "@/components/PDFDisplayer/PDFDisplayer";
import Tag from "./Tag";

export interface BlogPostProps{
    title: string;
    coverImage: string;
    description: string;
    authors: string[];
    date: Date;
    tags: BlogTags[];

    type: BlogPostType;
    args: PDFProps | MarkdownProps
}

export default function BlogPost({ title, coverImage, description, authors, date, tags, type, args}: BlogPostProps){
    return (
        <main className="flex flex-col items-center">
            <section className="pb-10 flex flex-col items-center">
                <h1 className="text-8xl font-bold">{title}</h1>
                <p className="text-5xl italic font-light pb-5 border-b-[1px] border-solid border-gray-300">{description}</p>
                <div className="pt-5 flex gap-x-2 justify-center items-center font-light text-3xl">
                    <p>By</p>
                    {authors.map((author,idx)=><p key={`${author}-${idx}`}>{author}{authors.length > 2 && idx < authors.length-2 ? ",": ""}{ idx == authors.length-2 ? " and": " "}</p>)}
                </div>
                <p className="text-4xl font-semibold mt-4">{`${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`}</p>
                <div className="flex gap-x-2 mt-4">
                    {tags.map((tag, idx)=><Tag key={`${tag}-${idx}`} tag={tag}/>)}
                </div>
            </section>


            {type === "pdf" && (
                <PDFDisplayer src={args.content}/>
            )}
            {type === "markdown" && (
                <p>Markdown is not implemented yet.</p>
            )}
        </main>
    )    
}
