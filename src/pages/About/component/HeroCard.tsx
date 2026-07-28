import { 
  History,  
  Sparkles, 
  Landmark, 
  TreePine, 
  Users 
} from "lucide-react";
import {motion} from "framer-motion";

type HeroCardProps = {
    variants : any;
    title : string;
    totalBarangay : string;
    district: string;
    rate: string;




}
export default function HeroCard({variants, title, totalBarangay, district, rate} : HeroCardProps){
    return(
        <motion.div
         variants={variants}
          className="relative w-full mb-16 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl shadow-slate-200/60"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          
          <div  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
                <History className="h-4 w-4 text-emerald-600" />
                <span>Our Roots & Heritage</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
               {title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Nestled in the heart of Camarines Sur, the Municipality of Lupi carries a history shaped by resilience, community spirit, and rich natural resources. Derived from native roots reflecting its lush landscapes and flowing waters, Lupi has grown from a quiet settlement into a vibrant agricultural and eco-cultural hub.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Over decades of growth, the town has embraced modernization while steadfastly preserving its culture, environmental heritage, and the warm hospitality of its people.
              </p>

              {/* Key Quick Facts Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 mt-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-emerald-600">{totalBarangay}</span>
                  <span className="text-xs font-medium text-slate-500">Barangays</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-teal-600">{district}</span>
                  <span className="text-xs font-medium text-slate-500">District CamSur</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-cyan-600">{rate}</span>
                  <span className="text-xs font-medium text-slate-500">Dedicated Service</span>
                </div>
              </div>
            </div>

            {/* Right Visual Graphic */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-emerald-500/20 bg-linear-to-br from-emerald-900 to-slate-900 p-6 flex flex-col justify-between text-white shadow-xl group">
                {/* Visual Overlay Design */}
                <div className="absolute inset-0 `bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 text-emerald-400/20 group-hover:text-emerald-400/30 transition-colors">
                  <Landmark className="h-32 w-32 -mr-6 -mt-6" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Historic Highlight</span>
                  <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="flex gap-2">
                    <TreePine className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200">
                      Rich in agricultural lands, pristine rivers, and sprawling forests driving local trade and tourism.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Users className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200">
                      Empowered by an active, resilient citizenry dedicated to progress and community building.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-300 font-mono">
                  <span>MUNICIPALITY OF LUPI</span>
                  <span>CAMARINES SUR</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

    );
}