import OfficerCard from "@/components/OfficerCard/OfficerCard";
import Carousel from "@/components/Carousel/Carousel";
import OfficerJSON from "@/public/Assets/Officers/OfficerBios.json";
import { routeModule } from "next/dist/build/templates/app-page";

export default function Officers(){
    const officers = OfficerJSON.map(({ name, role, bio, image}) => <OfficerCard name={name} role={role} bio={bio} icon={image} key={name}/>);
    return <>
        {/* <OfficerCard icon="/Officers/OfficerPictures/JaidenKhosla.webp" name="Jaiden Khosla" role="Webmaster" bio="Hi, my name is Jaiden. I'm a Sophomore and the Webmaster for Key Club. I enjoy programming, listening to music, and practicing guitar in my free time. I'm very excited for this year and all the things we as a club are going to do."/> */}
        <Carousel className="hidden md:flex">
            {officers}
        </Carousel>
        <div className="md:hidden">
            {officers}
        </div>
    </>
}