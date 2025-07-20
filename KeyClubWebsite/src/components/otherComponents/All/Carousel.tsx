import React, { useState } from "react";
import "../../../stylesheets/Carousel.css"

interface Props {
    children?: React.ReactNode;
}

export default function Carousel({children}: Props) {

    //converts all the elements within the Carousel component into a usable array.
    const range = React.Children.toArray(children);



    const [useStartPoint, setStartPoint] = useState(0);
    const maxPerSlide = 3; //how many items are shown at a time



    const rotateRight = () => {
        setStartPoint(point => (point-1+range.length)%range.length);
    }

    const rotateLeft = () => {
        setStartPoint(point => (point+1)%range.length);
    }

    //slices the array into the visible officers
    const circSlice = (startPoint: number): React.ReactNode[] => {

        const copy: React.ReactNode[] = [];
        
        for(let i = startPoint; i < startPoint+maxPerSlide; i++)
            copy.push(range[i%range.length]);

        return copy;
    }


    return <div className="Carousel">
        
        <button onClick={()=>{rotateLeft()}}>←</button>
        <div className="content">
            {circSlice(useStartPoint).map((item, idx)=>{
                return <div key={idx}>{item}</div>
            })}
        </div>
        <button onClick={()=>{rotateRight()}}>→</button>
        
    </div>
}