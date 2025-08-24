import TextSubdivision from "@/components/TextSubdivision/TextSubdivision"
import SuspenseImage from "@/components/SuspenseImage/SuspenseImage"
import Card from "@/components/Card/Card"
import OpportunityJSON from "@/public/Assets/Opportunities/Opportunities.json"
import Opportunity from "@/components/Opportunity/Opportunity"

export default function Home(){
    return <main>
        <section className="flex flex-col items-center text-white font-bold  h-300 md:h-145">
            <div className="absolute">
                <SuspenseImage priority={true} src="/Assets/homeBanner.webp" alt="Banner" width={800} height={450} className="w-screen h-300 md:h-145 object-cover blur-[6px] -z-10"/>
            </div>
            <SuspenseImage priority={true} src="/Assets/KeyClubLogo.webp" alt="Key Club Logo" width={250} height={250} className="w-180 h-180 md:w-80 md:h-80 mt-15 mb-3"/>
            <h1 className="font-bold text-8xl md:text-5xl">James E. Taylor Key Club</h1>
            <h2 className="font-light text-[3.5rem] md:text-[1.75rem] mt-3">Helping our community since 2011</h2>
        </section>
        <TextSubdivision className="mt-15">
            <h2>What is Key Club?</h2>
            <p>Our club is a volunteering organization that is focused on leadership, development, and citizenship. It provides opportunities for students to get involved within the school and community.</p>
            <SuspenseImage src="/Assets/homeMain.webp" alt="What is Key Club? Picture" className=""/>
            {/* <SuspenseImage src="/Assets/homeMain.webp" alt="What is Key Club? Picture" className=""/> */}
        </TextSubdivision>
        <div className="bg-keyblue-800 flex justify-center items-center gap-8 flex-col md:flex-row">
            <Card name="Jaiden Khosla" quote="Key Club is a great opportunity to help out my community and to meet new people." profileImage="/Assets/nicholas_lovely.png"/>
            <Card name="Jaiden Khosla" quote="Key Club is a great opportunity to help out my community and to meet new people." profileImage="/Assets/nicholas_lovely.png"/>
            <Card name="Jaiden Khosla" quote="Key Club is a great opportunity to help out my community and to meet new people." profileImage="/Assets/nicholas_lovely.png"/>
        </div>
        <div className="text-center flex flex-col gap-y-2">
            <h1 className="text-5xl font-extrabold mt-12">Big Opportunities</h1>
            <p className="text-2xl font-light">Hover over the images for details!</p>
        </div>
        <div className="flex justify-center mt-10">
            <div className="flex gap-4 w-[85vw] h-[45vw]">
                {OpportunityJSON.filter((_, idx)=>idx <= OpportunityJSON.length/3).map(opportunity=><Opportunity key={opportunity.description} image={opportunity.image} description={opportunity.description}/>)}

            </div>
        </div>
    </main>
}