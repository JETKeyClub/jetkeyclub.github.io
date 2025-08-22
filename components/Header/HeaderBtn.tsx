import Link from "next/link";

interface HeaderBtnProps {
    name: string;
}

export default function HeaderBtn({ name }: HeaderBtnProps){
    return <Link href={`/${name}`} className="text-white text-5xl md:text-3xl transition-all hover:scale-110 hover:text-gray-200 font-bold text-shadow-sm text-shadow-gray900">{name}</Link>
}