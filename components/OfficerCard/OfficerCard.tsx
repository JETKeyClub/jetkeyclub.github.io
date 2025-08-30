import SuspenseImage from "@/components/SuspenseImage/SuspenseImage"

interface OfficerCardProps {
    name: string,
    role: string,
    icon: string,
    bio: string
}

export default function OfficerCard({ name, icon, role, bio}: OfficerCardProps){
    return <div className="flex flex-col justify-center items-center pb-10">
        <div className="md:border-[0.75rem] relative 
        top-20 z-2 border-keyblue-800 size-70 md:size-40 overflow-hidden
        rounded-full flex justify-center items-center bg-gray-500">
            <SuspenseImage src={icon} alt={`An image of ${name}`} 
            className="size-70 md:size-40
            object-cover rounded-full
            "/>
        </div>
        <div className="text-center border-solid border-[1rem] 
                        md:border-[0.75rem] border-keyblue-800 rounded-[3rem] w-160 
                        md:w-100 p-12 md:p-4 md:pb-0 pt-20 md:pt-20 m-auto h-250 md:h-128 flex 
                        flex-col gap-y-2"
                        >
            <h4 className="text-6xl md:text-3xl">{name}</h4>
            <h3 className="text-5xl md:text-2xl">{role}</h3>
            <p className="text-4xl md:text-lg break-words">{bio}</p>
        </div>
    </div>
}