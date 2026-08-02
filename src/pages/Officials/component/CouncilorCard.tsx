import { motion } from "framer-motion";
type CardProps = {
    councilor: {
        image: string;
        name: string;        
        title: string;
    };
    variants?: any;
  };
export default function CouncilorCard({councilor, variants}: CardProps) {
    return(
        <motion.div
          variants={variants}
                className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="overflow-hidden rounded-xl w-full h-64 mb-4 bg-slate-100">
                  <img
                    src={councilor.image}
                    alt={councilor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {councilor.name}
                </h4>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  {councilor.title}
                </p>
              </motion.div>
    );
}