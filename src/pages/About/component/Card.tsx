import { motion } from "framer-motion";
import { Target } from "lucide-react";

type CardProps = {
    variants: any;
    name: string;
    title: string;
    description: string;
    quote: string;

  // Add any props you want to pass to the Card component here
};

export default function Card({ variants, name, title, description, quote }: CardProps){
    return(
        <motion.div
            variants={variants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="relative rounded-3xl border border-slate-200 bg-white/80 p-8 sm:p-10 backdrop-blur-xl shadow-xl shadow-slate-200/50 flex flex-col justify-between overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 to-teal-500" />
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-100/50 blur-2xl group-hover:bg-emerald-200/50 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-14 w-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm group-hover:scale-110 transition-transform">
                  <Target className="h-7 w-7" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  {name}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{quote}</span>
            </div>
          </motion.div>
    );

}