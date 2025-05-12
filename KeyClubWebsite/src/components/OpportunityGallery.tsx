import React, { ReactNode, Children } from "react";
import "../stylesheets/OpportunityGallery.css";


interface Props {
    children: ReactNode
}

export default function OpportunityGallery(props: Props){
    return <ul className="opportunityGallery">
        
        {Children.map(props.children, (child, idx)=>{
            return <li key={idx}>{child}</li>
        })}



    </ul>

}