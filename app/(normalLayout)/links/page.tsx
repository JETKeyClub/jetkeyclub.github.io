import Opportunity from "@/components/Opportunity/Opportunity"

export default function Page(){
    return (
        <div className="p-3">
            <h1 className="font-bold text-6xl">Links</h1>
            <div className="mt-3">
                <Opportunity image="/Assets/Links/hourSubmission.png" description="Hour Submission Link" link="https://forms.gle/qgrULaVPF2eL7s7m6"/>
            </div>
        </div>
    )
}