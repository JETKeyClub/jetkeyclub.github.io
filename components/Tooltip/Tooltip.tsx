import { IconType } from "react-icons";

import Link, { LinkProps } from "next/link";

interface TooltipProps extends LinkProps {
    icon: IconType;
    text: string;
}

export default function Tooltip({icon: Icon ,text, ...props}: TooltipProps){
    return (
        <Link className="group/tooltip flex flex-col items-center relative" {...props}>
            <Icon className="font-bold text-3xl group-hover/tooltip:scale-110 transition-all cursor-pointer group-hover/tooltip:text-gray-400"/>
            <TooltipCard text={text}/>
        </Link>
    )
}

export function TooltipCard({ text }: { text: string}){
    return (
        <div className="absolute top-9 w-max border-[1px] py-1 px-3 rounded-md 
            shadow-md opacity-0 transition-all group-hover/tooltip:opacity-100 
            pointer-events-none bg-gray-50 z-1000">
                {text}
        </div>
    )
}