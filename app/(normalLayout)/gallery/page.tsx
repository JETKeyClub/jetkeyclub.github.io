import OpportunityJSON from "@/public/Assets/Opportunities/Opportunities.json";
import Opportunity from "@/components/Opportunity/Opportunity";

export default function Gallery(){
    return (
    <div className="flex justify-center">
        <div className="flex flex-col flex-wrap h-[100vw] w-[85vw] mt-20 md:mt-5 gap-5 ">
            {OpportunityJSON.map((opportunity, idx) => <Opportunity description={opportunity.description} image={opportunity.image} key={idx}/>)}
        </div>
    </div>
    );
}