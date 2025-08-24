import Link from "next/link";
import { IconType } from "react-icons";
import { BsInstagram } from "react-icons/bs";
import clsx from "clsx";

type FooterLink = {
    icon: IconType,
    link: string
    bg: string
}

//clsx just registers the class (just trust me bro put it before the tailwind color)
const footerLinks: { [key: string] : FooterLink } = {
    "instagram" : {
        icon: BsInstagram,
        link: "https://www.instagram.com/jethskeyclub/",
        bg: clsx("bg-pink-600")
    }
}

export default function Footer(){
    return (<div className=" py-5 bg-keyblue-800 shadow-keyblue-900 shadow-2xl flex justify-center items-center">
        {
            Object.values(footerLinks).map(footerLink => 
            <Link href={footerLink.link} target="_blank" className={`p-8 md:p-6 text-6xl md:text-3xl ${footerLink.bg}
            transition-all text-white rounded-full hover:brightness-85 hover:scale-105`} key={footerLink.link}>
                {<footerLink.icon/>}
            </Link>)
        }
    </div>);
}