import Image from "next/image"
import SuspenseImage from "@/components/UI/SuspenseImage"

export default function Home(){
    return <>
        <section className="flex flex-col items-center text-white font-bold">
            <div className="absolute">
                <SuspenseImage src="/Assets/homeBanner.webp" alt="Banner" width={800} height={450} className="w-screen h-145 object-cover blur-[10px] -z-10"/>
            </div>
            <SuspenseImage src="/Assets/KeyClubLogo.webp" alt="Key Club Logo" width={250} height={250} className="w-80 h-80 mt-15 mb-3"/>
            <h1 className="font-extrabold text-5xl">James E. Taylor Key Club</h1>
            <h2 className="font-extrabold text-[1.75rem] mt-3">Helping our community since 2011</h2>
        </section>
    </>
}