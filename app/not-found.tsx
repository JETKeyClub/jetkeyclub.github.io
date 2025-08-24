import Link from "next/link"
import SuspenseImage from "@/components/SuspenseImage/SuspenseImage";

export default function NotFound(){
    return (
        <div className="flex flex-col items-center justify-center my-100 md:mt-60 lg:mt-20">
            <SuspenseImage priority={true} src="/Assets/KeyClubLogo.webp" alt="Key Club Logo" width={250} height={250} className="w-180 h-180 md:w-80 md:h-80 mt-15 mb-3"/>
            <div className="flex flex-col items-center">
                <h2 className="text-8xl md:text-6xl font-bold">404: Not Found</h2>
                <p className="text-6xl md:text-4xl font-light">We dont know where you are trying to go...</p>
                <Link href="/" className="text-7xl md:text-4xl text-blue-500 transition-all hover:scale-105 hover:text-blue-700">Go to Home</Link>
            </div>
        </div>
    )
}