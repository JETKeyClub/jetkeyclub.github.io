import PDFDisplayer from "@/components/PDFDisplayer/PDFDisplayer";
import BlogPost, {BlogPostProps} from "@/components/BlogPost/BlogPost";

// interface BlogPostProps{
//     title: string;
//     coverImage: string;
//     description: string;
//     authors: string[];
//     date: Date;
//     tags: BlogTags[];

//     type: BlogPostType;
//     args: PDFProps | MarkdownProps
// }

const args: BlogPostProps = {
    title: "June Newsletter",
    coverImage:"",
    description: "Our newsletter for this June!",
    authors: ["Ariella Ko", "Rethika"],
    date: new Date(),
    tags: ["Announcement", "Info", "Project", "Newsletter", "Update"],
    type: "pdf",
    args: {
        content:"/JuneNewsletter.pdf"
    }
}

export default function PdfPain(){
    return (
        <div className="flex justify-center">
            <BlogPost {...args}/>
        </div>
    )
}