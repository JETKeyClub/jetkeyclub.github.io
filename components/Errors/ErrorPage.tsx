import SuspenseImage from "@/components/SuspenseImage/SuspenseImage";
import Link from "next/link";

interface ErrorPageProps {
    title: string,
    description: string,
}

export default function ErrorPage({title, description}: ErrorPageProps){
    return (
        <div className="flex flex-col items-center justify-center mt-30 md:mt-60 lg:mt-20 mb-30">
            <SuspenseImage priority={true} src="/Assets/KeyClubLogo.webp" alt="Key Club Logo" width={250} height={250} className="w-180 h-180 md:w-80 md:h-80 mt-15 mb-3"/>
            <div className="flex flex-col items-center gap-y-10">
                <h2 className="text-8xl md:text-6xl font-bold">{title}</h2>
                <p className="text-6xl italic md:text-4xl font-light text-center">{description}</p>
                <Link href="/" className="text-7xl md:text-4xl text-blue-500 transition-all hover:scale-105 hover:text-blue-700">Go to Home</Link>
            </div>
        </div>
    );
}