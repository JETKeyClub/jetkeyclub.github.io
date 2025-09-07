interface ErrorProps {
    state?: string[];
}


export default function Error({ state }: ErrorProps){
    return (
        <>
         {state && state.map((err, idx)=><p key={`${err}-${idx}`} className="text-xl text-red-600">{err}</p>) }    
        </>
    )
}