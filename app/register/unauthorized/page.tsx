import Link from "next/link";
import SuspenseImage from "@/components/SuspenseImage/SuspenseImage";
import ErrorPage from "@/components/Errors/ErrorPage";

export default function RegisterPage(){
    return (

        <ErrorPage title="Unauthorized" description="Reminder that only THS students who are approved can make accounts. If you think this is a mistake, please message us."/>
    
);
}