import BackHomeButton from "@/components/Buttons/BackHome";
import { Bell } from "lucide-react";
import OfficeCard from "./component/OfficeCard";
import { BsBank } from "react-icons/bs";
import { FaRegHospital } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";

export default function Employees(){

   const offices = [
    {
        title: "Mayor's Office",
        value: 20,
        icon: <BsBank/>
    },
     {
        title: "RHU",
        value: 26,
        icon: <FaRegHospital/>
    },
     {
        title: "Treasury Office",
        value: 16,
        icon: <FaMoneyBills/>
    },
    {
        title: "Accounting Office",
        value: 16,
        icon: <FaMoneyBills/>
    },
    {
        title: "Assessor Office",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "Budget Office",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "DILG",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "Electrician",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "Engineering",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "General Services",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "HRMO",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "Kalahi",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "LCR",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "LWSS",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "MASO",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "MDR",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "MENRO",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "MNAO",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "MPDO",
        value: 20,
        icon: <BsBank/>
    },
    {
        title: "MSDWDO",
        value: 20,
        icon: <BsBank/>
    },
    
   ]

    return(
        <section className="min-h-screen w-screen relative py-20 lg:px-20 px-5 flex flex-col items-center bg-slate-50">
            <BackHomeButton/>
           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide mb-3">
            <Bell className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
            <span>Serving with Excellence</span>
          </div>
            <h1 className="font-extrabold lg:text-6xl text-4xl tracking-tight">Meet <span className=" bg-linear-to-r  from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Our Team</span> </h1>
            <p className=" text-slate-500 tracking-wide  mt-5">Dedicated public servants committed to delivering quality services to the people of Lupi.</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-5 mt-10">
                {offices.map((data, index) =>(
                    <OfficeCard key={index} title={data.title}  value={data.value} icon={data.icon}/>

                ))}
             

            </div>

        </section>

    );
}