import { motion } from "framer-motion";
import {  Mail, Phone, ShieldCheck } from "lucide-react";
type CardProps = {
    image: string;
    name: string;
    position: string;
    quote: string;
    email: string;
    phone: string;
    variants?: any;
  };
export default function Card({image, name, position, quote, email, phone, variants}: CardProps) {
    return(
         <motion.div
          variants={variants}
          className="relative w-full max-w-5xl mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-slate-200/60"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          <div className="absolute top-4 right-4 h-12 w-12 border-t-2 border-r-2 border-emerald-500/20 pointer-events-none" />
          <div className="absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-emerald-500/20 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Mayor Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative h-80 sm:h-96 w-full max-w-sm rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-xl group">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
                
              </div>
            </div>

            {/* Mayor Details */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Office of the Municipal Mayor</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {name}
              </h3>

              <p className="text-lg font-bold text-emerald-700 uppercase tracking-wider">
                {position}
              </p>

              <blockquote className="mt-2 text-sm sm:text-base text-slate-600 italic border-l-4 border-emerald-500 pl-4 py-1">
                "{quote}"
              </blockquote>

              <div className="pt-4 flex flex-wrap gap-3 w-full border-t border-slate-100 mt-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-emerald-50 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-800 transition-colors border border-slate-200"
                >
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span>{email}</span>
                </a>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200">
                  <Phone className="h-4 w-4 text-emerald-600" />
                  <span>{phone}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
    );
}