import clsx from "clsx";

import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { IconType } from "react-icons";

import { TooltipCard } from "../Tooltip/Tooltip";

export type types = "Phone"|"Email"|"Instagram";

interface ContactProps {
    type: types;
    value: string;
}

const iconMap: Map<string, IconType> = new Map<string, IconType>([
    ["Phone", FaPhoneAlt],
    ["Email", MdEmail],
    ["Instagram", BsInstagram]
])

export default function Contact({ type, value }: ContactProps){

    const Icon = iconMap.get(type)!;

    return (
        <div className="flex gap-x-3 group/tooltip justify-center justify-self-center relative">
            <Icon width={50} height={50} className={clsx("text-5xl text-white p-3 rounded-full",{
                "bg-green-400": type==="Phone",
                "bg-sky-500": type==="Email",
                "bg-pink-500": type==="Instagram"
            })}/>
            <TooltipCard text={value}/>
        </div>
    )
}