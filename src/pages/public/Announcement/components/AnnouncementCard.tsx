import { useState } from "react";
import {
  ArrowRight,
  CalendarIcon,
  FileText,
  Pin,
  Maximize2,
  X,
} from "lucide-react";
import { type Variants, motion, AnimatePresence } from "framer-motion";

type AnnouncementCardProps = {
  variants?: Variants;
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
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering setSelectedDate on the parent card
    setIsImageOpen(true);
  };

  return (
    <>
      {/* Main Announcement Card */}
      <motion.div
        variants={variants}
        whileHover={{ y: -6 }}
        onClick={setSelectedDate}
        className="group relative flex flex-col justify-between min-h-95 sm:h-full rounded-3xl bg-white shadow-lg shadow-slate-200/50 border border-slate-200/80 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Image Header with Overlay Badges */}
        <div
          onClick={handleImageClick}
          className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 shrink-0 group/img"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

          {/* Hover Zoom Indicator */}
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
              <Maximize2 className="w-5 h-5" />
            </span>
          </div>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
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
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] font-semibold text-white/90 pointer-events-none">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>{dateDisplay}</span>
          </div>
        </div>

        {/* Card Content Section */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-2">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
              {title}
            </h4>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {desc}
            </p>

            {/* Pinned Note Callout Box */}
            {pinnedNote && (
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-1.5 text-[10px] sm:text-[11px] text-amber-900">
                <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <p className="line-clamp-2 font-medium">{pinnedNote}</p>
              </div>
            )}
          </div>

          {/* Card Footer Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Image Modal / Lightbox */}
      <AnimatePresence>
        {isImageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center rounded-2xl overflow-hidden bg-transparent cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsImageOpen(false)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Full Image */}
              <img
                src={image}
                alt={title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Image Title Caption */}
              <p className="mt-3 text-xs sm:text-sm font-medium text-slate-200 text-center px-4 line-clamp-1">
                {title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
