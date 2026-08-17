import { ArrowRight, CalendarIcon, FileText, Pin } from "lucide-react";
import { type Variants, motion } from "framer-motion";

type AnnouncementCardProps = {
  variants: Variants;
  setSelectedDate: () => void;
  image: string;
  title: string;
  urgent: boolean;
  tag: string;
  isPinned: boolean;
  dateDisplay: string;
  desc: string;
  pinnedNote: string;
};

export default function AnnouncementCard({
  variants,
  setSelectedDate,
  image,
  title,
  urgent,
  tag,
  isPinned,
  dateDisplay,
  desc,
  pinnedNote,
}: AnnouncementCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -6 }}
      onClick={setSelectedDate}
      className="group relative flex flex-col justify-between aspect-square rounded-3xl bg-white shadow-lg shadow-slate-200/50 border border-slate-200/80 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Image Header with Overlay Badges */}
      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100 shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs backdrop-blur-md ${
              urgent
                ? "bg-rose-500/90 text-white border-rose-400"
                : "bg-emerald-600/90 text-white border-emerald-400"
            }`}
          >
            {tag}
          </span>

          {isPinned && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/90 text-white shadow-xs backdrop-blur-md">
              <Pin className="w-3 h-3 fill-white" />
              Pinned
            </span>
          )}
        </div>
        {/* Date Badge on Image */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] font-semibold text-white/90">
          <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>{dateDisplay}</span>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-2">
        <div className="space-y-1.5">
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
            {title}
          </h4>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {desc}
          </p>

          {/* Pinned Note Callout Box */}
          {pinnedNote && (
            <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-1.5 text-[10px] sm:text-[11px] text-amber-900">
              <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="line-clamp-1 font-medium">{pinnedNote}</p>
            </div>
          )}
        </div>

        {/* Card Footer Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}
