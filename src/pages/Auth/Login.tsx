import BackHomeButton from "@/components/Buttons/BackHome"

export default function Login(){
    return(
        <div className="w-full h-screen bg-amber-50 flex justify-center items-center relative">
            <BackHomeButton/>
            <div className="w-60 h-90 z-40 border border-black rounded-2xl">
                <h1 className="text-center font-bold text-3xl tracking-tight"> Log In</h1>
            </div>
        </div>
    )
}