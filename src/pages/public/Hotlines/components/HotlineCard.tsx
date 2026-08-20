import { type Variants, motion } from "framer-motion";
import { Check, Clock, Copy, PhoneCall, type LucideIcon } from "lucide-react";
type HotlineCardProps = {
  variants: Variants;
  badge: string;
  name: string;
  agency: string;
  desc: string;
  number: string;
  handleCopy: () => void;
  copiedNumber: string | null;
  altNumber: string | null;
  IconComponent: LucideIcon;
};
export default function HotlineCard({
  variants,
  badge,
  name,
  agency,
  desc,
  number,
  handleCopy,
  copiedNumber,
  altNumber,
  IconComponent,
}: HotlineCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col justify-between bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            <Clock className="w-3 h-3 text-emerald-600" />
            {badge}
          </span>
        </div>

        {/* Title & Agency */}
        <div>
          <h3 className="text-xl font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
            {name}
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            {agency}
          </p>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Actions Area */}
      <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
        {/* Primary Hotline Number */}
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Primary Mobile
            </span>
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              {number}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              title="Copy Number"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
            >
              {copiedNumber === number ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${number.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>
        </div>

        {/* Secondary Landline (If Available) */}
        {altNumber && (
          <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-500">
            <span>Landline / Alt:</span>
            <a
              href={`tel:${altNumber.replace(/[^0-9+]/g, "")}`}
              className="font-semibold text-slate-700 hover:text-emerald-600 underline transition-colors"
            >
              {altNumber}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
