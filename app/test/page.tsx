import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";
import MdComp from "@/app/test/comp.mdx";

export default function Page(){
    return <MarkdownRenderer>
        <MdComp/>
    </MarkdownRenderer>
}