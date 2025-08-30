import { BsNewspaper } from "react-icons/bs"; // Newsletter
import { FaBullhorn } from "react-icons/fa"; // Announcement
import { HiQuestionMarkCircle } from "react-icons/hi"; //Info
import { FaProjectDiagram } from "react-icons/fa"; //Project
import { MdOutlineTipsAndUpdates } from "react-icons/md"; //Update
import { IconType } from "react-icons";


const tagMap = new Map<BlogTags, [IconType, string]>([
    ["Newsletter", [BsNewspaper, "bg-blue-500"]],
    ["Announcement", [FaBullhorn, "bg-orange-500"]],
    ["Info", [HiQuestionMarkCircle, "bg-yellow-500"]],
    ["Project", [FaProjectDiagram, "bg-red-500"]],
    ["Update", [MdOutlineTipsAndUpdates, "bg-green-500"]]
]);

export default function Tag({ tag }: { tag: BlogTags}){

    const [ Icon, bgColor ] = tagMap.get(tag)||[HiQuestionMarkCircle||"bg-skyblue-500"];

    return (
        <div className={`flex justify-center items-center gap-x-2 text-white text-3xl font-semibold p-5 rounded-2xl ${bgColor}`}>
        <Icon/>
        {tag}
    </div>
    );
}