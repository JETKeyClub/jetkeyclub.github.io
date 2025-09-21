import SuspenseImage from "@/components/SuspenseImage/SuspenseImage";

interface ImagePreviewProps {
    src: string;
    link: string;
}

export default function ImagePreview({ src, link }: ImagePreviewProps){
    return (
        <div>
            <SuspenseImage unoptimized className="object-fill w-110 h-74" 
            src={link} alt={"This is a preview of a blog image.. (We have no idea what this is supposed to be.)"}/>
            <p className="font-bold text-[110%] w-100 text-wrap flex-wrap">{src}</p>
        </div>
    )
}