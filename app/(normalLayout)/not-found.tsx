import ErrorPage from "@/components/Errors/ErrorPage"
export default function NotFound(){
    return (
        <ErrorPage title="404: Not Found" description={`We don't know where you are trying to go....`}/>
    )
}