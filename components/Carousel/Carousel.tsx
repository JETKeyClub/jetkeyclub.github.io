"use client"

import { ReactNode, Children, useState, useEffect, ComponentProps } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface CarouselProps extends ComponentProps<"div"> {
    children: ReactNode;
}

const maxPerSlide = 3;

export default function Carousel({ children, ...props }: CarouselProps){
    const [ useStartpoint, setStartpoint ] = useState<number>(0);
    const [ useChildrenArray, setChildrenArray ] = useState<ReactNode[]>(Children.toArray(children));

    const range = Children.count(children);

    useEffect(()=>{
        
        const newArr = []
        const childArray = Children.toArray(children);

        for(let i = useStartpoint; i < useStartpoint+maxPerSlide; i++)
            newArr.push(childArray[i%range]);

        setChildrenArray(newArr);

    }, [useStartpoint])

    // const [ useEndpoint, setEndpoint ] = useState<number>(Children.count(children));

  const rotateLeft = () => setStartpoint(point => (point+1)%range);
  const rotateRight = () => setStartpoint(point => (point-1+range)%range);

  return (
  <div {...props} className={`flex justify-center items-center gap-x-6 ${props.className}`}>
    <button onClick={rotateRight} className="bg-keyblue-500 h-fit rounded-full p-5 
    text-white transition-all hover:bg-keyblue-600 
    flex justify-center items-center group cursor-pointer">
        <BiLeftArrow className="font-bold transition-transform group-hover:scale-120"/>
    </button>
    <div className="flex gap-x-3">
        {useChildrenArray}
    </div>
    <button onClick={rotateLeft} 
    className="bg-keyblue-500 h-fit rounded-full p-5 
    text-white transition-all hover:bg-keyblue-600 
    flex justify-center items-center group cursor-pointer">
        <BiRightArrow className="font-bold transition-transform group-hover:scale-120"/>
    </button>
  </div>
  );
}