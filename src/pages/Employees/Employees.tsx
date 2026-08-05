import BackHomeButton from "@/components/Buttons/BackHome";
import { Bell } from "lucide-react";
import OfficeCard from "./component/OfficeCard";

export default function Employees(){
    
    return(
        <section className="min-h-screen w-screen relative py-20 px-20 flex flex-col items-center bg-slate-50">
            <BackHomeButton/>
           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide mb-3">
            <Bell className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
            <span>Serving with Excellence</span>
          </div>
            <h1 className="font-extrabold text-6xl tracking-tight">Meet <span className=" bg-linear-to-r  from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Our Team</span> </h1>
            <p className=" text-slate-500 tracking-wide  mt-5">Dedicated public servants committed to delivering quality services to the people of Lupi.</p>
            <div className="grid grid-cols-4 w-full gap-5 mt-10">
             <OfficeCard/>

            </div>

        </section>

    );
}