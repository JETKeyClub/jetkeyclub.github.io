
type BlogPostType = "pdf" | "markdown";

type PDFProps = {
    content: string;
    className?: string;
}

type MarkdownProps = {
    content: string;
    className?: string;
}

type BlogTags = "Newsletter" | "Announcement" | "Info" | "Project" | "Update";