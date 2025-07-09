import Opportunity from "../otherComponents/All/Opportunity";
import OpportunityGallery from "../otherComponents/All/OpportunityGallery";
import OpportunityJSON from "../../assets/Opportunities/Opportunities.json";

export default function Gallery(){
    console.log(OpportunityJSON)
    return (
    <div className="whiteAlteration">
        <br/>
        <br/>
        <OpportunityGallery>
            {OpportunityJSON.map((opportunity, idx)=>{
                return <Opportunity image={opportunity["image"] || "../../assets/homeMain.webp"} details={opportunity["description"] || "Fun times"}/>
            })}
        </OpportunityGallery>
    </div>);
}