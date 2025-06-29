import React, { JSX, useState } from "react";
import "../stylesheets/Carousel.css"

interface Props {
    children?: React.ReactNode;
}

export default function Carousel({children}: Props) {

    const range = React.Children.toArray(children);



    const [useStartPoint, setStartPoint] = useState(0);
    const maxPerSlide = 3;



    const rotateRight = () => {
        setStartPoint(point => (point-1+range.length)%range.length);
    }

    const rotateLeft = () => {
        setStartPoint(point => (point+1)%range.length);
    }

    const circSlice = (startPoint: number): React.ReactNode[] => {

        const copy: React.ReactNode[] = [];
        
        for(let i = startPoint; i < startPoint+maxPerSlide; i++)
            copy.push(range[i%range.length]);
        console.log(copy)
        return copy;
    }


    return <div className="Carousel">
        <div className="content">
            {circSlice(useStartPoint).map((item, idx)=>{
                return <div key={idx}>{item}</div>
            })}
        </div>
        <div className="buttons">
            <button onClick={()=>{rotateLeft()}}>→</button>
            <button onClick={()=>{rotateRight()}}>→</button>
        </div>
    </div>
}