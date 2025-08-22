interface TextSubdivisionProps {
    children: React.ReactNode;
    className?: string;
}

export default function TextSubdivision({ children, className }: TextSubdivisionProps){
    return <div className={`w-full flex justify-center items-center gap-8 p-8 ${className}`}>
        {children}
    </div>
}