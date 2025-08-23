import SuspenseImage from "@/components/SuspenseImage/SuspenseImage"

interface CardProps {
    profileImage: string,
    name: string,
    quote: string
}

export default function Card({ profileImage, name, quote}: CardProps){
    return <div className="flex flex-col items-center w-fit h-200">
        <SuspenseImage 
        src={profileImage} alt={`An image of ${name}.`} 
        className="w-50 h-max border-[0.5rem] border-solid border-borderblue-500 rounded-full relative top-25"
        />
        
        <blockquote className="p-5 pt-30 w-132 md:w-102 pb-25 rounded-t-[20%] flex flex-col gap-y-4 text-white text-center bg-keyblue-600">
            <p className="italic text-[250%] lg:text-[150%] font-light">"{quote}"</p>
            <h4 className="font-bold text-[210%]">-{name}</h4>
        </blockquote>
    </div>
}