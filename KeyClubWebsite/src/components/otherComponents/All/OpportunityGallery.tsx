import { ReactNode, Children } from "react";
import "../../../stylesheets/OpportunityGallery.css";


interface Props {
    children: ReactNode
}

export default function OpportunityGallery(props: Props){
    return <div className="opportunityGallery">
        
        {Children.map(props.children, (child, _)=>{
            return child;
        })}



    </div>

}