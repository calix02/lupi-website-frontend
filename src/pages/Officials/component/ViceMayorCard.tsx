import { motion } from "framer-motion";
type CardProps = {
    pattern?: any;
    viceMayor: {
        image: string;
        name: string;
        title: string;
        message: string;
    };
    variants?: any;
  };
export default function ViceMayorCard({viceMayor, variants, pattern}: CardProps) {
    return(
          <motion.div
          variants={variants}
          className="w-full max-w-2xl mx-auto mb-20 text-center"
        >
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center relative overflow-hidden">
                   <div className= "absolute bottom-0 inset-x-0">
                  <img src={pattern} alt="Pattern 2" className="w-full h-full object-cover -scale-y-100" />
                </div>
            <div className="relative mb-4">
              <img
                src={viceMayor.image}
                alt={viceMayor.name}
                className="lg:w-65 lg:h-65 w-60 h-60 rounded-2xl object-cover shadow-md border-4 border-emerald-50"
              />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-2">
              Presiding Officer
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              {viceMayor.name}
            </h3>
            <p className="text-sm font-semibold text-teal-700 mt-0.5 mb-4">
              {viceMayor.title}
            </p>

            <p className="text-sm text-slate-600 italic max-w-lg leading-relaxed">
              "{viceMayor.message}"
            </p>
          </div>
        </motion.div>
    );
}