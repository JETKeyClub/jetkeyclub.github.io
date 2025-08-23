import SuspenseImage from "@/components/SuspenseImage/SuspenseImage"
import TextSubdivision from "@/components/TextSubdivision/TextSubdivision"

//All of the objectives of Key Club
const objectives: string[] = [
    "To develop initiative and leadership.",
    "To provide experience in living and working together.",
    "To serve the school and community.",
    "To cooperate with school administration.",
    "To prepare for useful citizenship.",
    "To promote the adoption and application of higher standards in scholarship, sportsmanship, and social contacts.",
    "To develop, by precept and example, a more intelligent, aggressive, and serviceable citizenship.",
    "To provide means to form enduring friendships, render unselfish service, and build a better community."
]


export default function AboutUs(){
    return <div>
        <TextSubdivision>
            <h2>About Us</h2>
            <p>
                Key Club is a student-led organization for high school students which operates under school regulations
                and welcomes members from the student body. We are unlike any other organization at THS. Key Club is open to all
                grade levels and there are no GPA requirements. This club functions not only on a local level but on a state and
                international level as well.
            </p>
            <SuspenseImage src="/Assets/aboutUsImage.webp" alt="Us at one of our volunteering opportunities."/>
        </TextSubdivision>
        <div className="bg-keyblue-800">
            <TextSubdivision className="text-white pl-32 justify-end">
                <h2>Pledge</h2>
                <div className="italic">
                    <p>I pledge, on my honor,</p>
                    <p>To uphold the Objects of Key Club International</p>
                    <p>To build my home, school, and community</p>
                    <p>To serve my nation and God</p>
                    <p>And combat all forces which tend to undermine these institutions.</p>
                </div>
            </TextSubdivision>
        </div>
        <div>
            <TextSubdivision className="pl-32 justify-end">
                <h2>Objectives</h2>
                <ul className="pl-8 text-left text-3xl">
                    {objectives.map((objective, idx)=><li key={`Objective#${idx}`} className="list-disc">{objective}</li>)}
                </ul>
            </TextSubdivision>
        </div>
    </div>
}