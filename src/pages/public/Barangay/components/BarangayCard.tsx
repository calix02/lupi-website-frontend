import { Award, CheckCircle2, ChevronRight, MapPin } from "lucide-react";
import { type Variants, motion } from "framer-motion";

type BarangayCardProps = {
  cover: string;
  name: string;
  status: string;
  address: string;
  population: number;
  officials: number;
  captain: string;
  variants: Variants;
  setSelectedBarangay: () => void;
};
export default function BarangayCard({
  cover,
  name,
  status,
  address,
  population,
  officials,
  captain,
  variants,
  setSelectedBarangay,
}: BarangayCardProps) {
  return (
    <motion.div
      variants={variants}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
    >
      {/* Card Cover & Badge */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={cover}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {status}
          </span>
          <span className="text-[11px] font-bold text-white/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
            📍 Lupi, CamSur
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold tracking-tight">Barangay {name}</h3>
          <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{address}</span>
          </p>
        </div>
      </div>

      {/* Card Body Info */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Population
              </span>
              <span className="font-extrabold text-slate-800 text-sm">
                {population.toLocaleString()} Residents
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Officials
              </span>
              <span className="font-extrabold text-slate-800 text-sm">
                {officials} Members
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Barangay Captain
            </span>
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              {captain}
            </p>
          </div>
        </div>

        {/* View Action */}
        <button
          onClick={setSelectedBarangay}
          className="w-full py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs group-hover:shadow-md"
        >
          <span>View Barangay Profile</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
