import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ArrowRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Clock,
  Tag,
  Pin,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import useInOutAnimation from "@/hooks/useInOutAnimation";

// Import thumbnail assets
import AssistanceImg from "@/assets/logos/LGU-NEW.png";
import RoadProjImg from "@/assets/logos/LGU-NEW.png";
import BAdminton from "@/assets/events/badmintom.jpg";
import AnnouncementCard from "./components/AnnouncementCard";

export interface AnnouncementItem {
  id: number;
  tag: string;
  title: string;
  dateKey: string;
  dateDisplay: string;
  time: string;
  location: string;
  desc: string;
  urgent: boolean;
  isPinned: boolean;
  pinnedNote: string;
  image: string;
}

export default function Announcement() {
  const animate = useInOutAnimation();

  // Selected date for event modal popup
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Calendar State (Defaults automatically to the current active month and year)
  const [currentDate, setCurrentDate] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  // Announcements and Events Dataset
  const announcements: AnnouncementItem[] = [
    {
      id: 1,
      tag: "Urgent Advisory",
      title: "Schedule of Municipal Financial Assistance Distribution",
      dateKey: "2026-07-28", // YYYY-MM-DD
      dateDisplay: "July 28, 2026",
      time: "8:00 AM - 4:00 PM",
      location: "Lupi Covered Court",
      desc: "All qualified beneficiaries are advised to report to the Lupi Covered Court starting at 8:00 AM. Please bring valid IDs and registration stubs.",
      urgent: true,
      isPinned: true,
      pinnedNote:
        "Bring 2 valid IDs and original registration stub. Distribution starts strictly at 8:00 AM.",
      image: AssistanceImg,
    },
    {
      id: 2,
      tag: "Events",
      title: "𝟭𝘀𝘁 𝗠𝗔𝗬𝗢𝗥 𝗧𝗢𝗣𝗜 𝗕𝗔𝗗𝗠𝗜𝗡𝗧𝗢𝗡 𝗧𝗢𝗨𝗥𝗡𝗔𝗠𝗘𝗡𝗧",
      dateKey: "2026-09-17",
      dateDisplay: "September 17-18, 2026",
      time: "9:00 AM - 3:00 PM",
      location:
        "Multi-Purpose Covered Court, LGU Compound, Poblacion, Lupi, Camarines Sur",
      desc: `✅Free registration 
              ✅Team Tie (every team must consist 4 players) 
              ✅Double elimination
              ✅Slot draw before matches
              👕𝗗𝗥𝗘𝗦𝗦 𝗖𝗢𝗗𝗘
              𝘗𝘳𝘰𝘱𝘦𝘳 𝘴𝘱𝘰𝘳𝘵𝘴 𝘢𝘵𝘵𝘪𝘳𝘦 𝘰𝘯𝘭𝘺 (no sando or slippers)
              🏸𝙇𝙞𝙢𝙞𝙩𝙚𝙙 𝙨𝙡𝙤𝙩𝙨 𝙤𝙣𝙡𝙮— 𝙧𝙚𝙜𝙞𝙨𝙩𝙚𝙧 𝙚𝙖𝙧𝙡𝙮!
              📞𝗖𝗼𝗻𝘁𝗮𝗰𝘁:
              Justine Kieth Llaneta
              𝟶𝟿12-690-7913`,
      urgent: false,
      isPinned: true,
      pinnedNote: `🏸 𝙊𝙉𝙇𝙔 20 𝙎𝙇𝙊𝙏𝙎 𝘼𝙑𝘼𝙄𝙇𝘼𝘽𝙇𝙀
                  - 10 𝙎𝙡𝙤𝙩𝙨 𝘳𝘦𝘴𝘦𝘳𝘷𝘦𝘥 𝘧𝘰𝘳 𝘵𝘩𝘦 𝘱𝘢𝘳𝘵𝘪𝘤𝘪𝘱𝘢𝘵𝘪𝘯𝘨 𝘴𝘤𝘩𝘰𝘰𝘭𝘴
                  - 10 𝙎𝙡𝙤𝙩𝙨 𝘰𝘱𝘦𝘯 𝘧𝘰𝘳 𝘰𝘵𝘩𝘦𝘳 𝘦𝘭𝘪𝘨𝘪𝘣𝘭𝘦 𝘓𝘶𝘱𝘪 𝘱𝘭𝘢𝘺𝘦𝘳𝘴/𝘵𝘦𝘢𝘮𝘴`,
      image: BAdminton,
    },

    {
      id: 3,
      tag: "Development",
      title: "Public Hearing for New Infrastructure & Road Projects",
      dateKey: "2026-08-10",
      dateDisplay: "August 10, 2026",
      time: "1:30 PM - 5:00 PM",
      location: "Municipal Session Hall",
      desc: "Join us at the Session Hall as we present the upcoming farm-to-market road developments and municipal infrastructure projects.",
      urgent: false,
      isPinned: false,
      pinnedNote:
        "Open to all residents, business owners, and local transport operators.",
      image: RoadProjImg,
    },
  ];

  // Calendar Helper Logic
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Format YYYY-MM-DD string for comparison
  const getFormattedDateKey = (dayNumber: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(dayNumber).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Find events for selected modal popup
  const activeEvents = announcements.filter(
    (item) => item.dateKey === selectedDate,
  );

  // --- Presentational-only helpers (do not affect state or behavior) ---
  const today = new Date();
  const isCurrentMonthShown =
    today.getFullYear() === currentDate.getFullYear() &&
    today.getMonth() === currentDate.getMonth();
  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  return (
    <section
      id="announcements"
      className="relative w-full min-h-screen py-20 sm:py-24 px-4 sm:px-8 bg-slate-50 overflow-hidden flex flex-col justify-center items-center"
    >
      <style>{`
        @keyframes cell-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cell-in { animation: cell-in 0.4s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .cell-in { animation: none !important; }
        }
      `}</style>

      {/* Background Decor */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[8%] w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35] mask-[radial-gradient(ellipse_at_center,black_0%,transparent_70%)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main Container */}
      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12"
      >
        {/* Section Header */}
        <motion.div
          variants={animate.itemVariants}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex mt-5 items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide mb-3">
            <Bell className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Public Updates & Events</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Latest Announcements &{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Municipal Calendar
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Stay informed with upcoming LGU events, advisories, and community
            programs.
          </p>
        </motion.div>

        {/* ================= 1. MODERN FULL-WIDTH CALENDAR ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="w-full bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 flex flex-col gap-6"
        >
          {/* Calendar Header Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shadow-emerald-500/20">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={monthKey}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
                  >
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </motion.h3>
                </AnimatePresence>
                <p className="text-xs text-slate-500 font-medium">
                  Interactive Event Schedule & Important Dates
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={prevMonth}
                className="p-2.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-all shadow-xs active:scale-95"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-all shadow-xs active:scale-95"
                aria-label="Next Month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Weekday Header + Days Grid (animated together per month) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={monthKey}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col gap-2 sm:gap-3"
            >
              {/* Weekday Header Grid */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="py-2 rounded-xl bg-slate-50 text-xs font-bold text-slate-500 tracking-wider uppercase"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {/* Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-2 sm:gap-3">
                {/* Empty leading slots */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="h-14 sm:h-16 rounded-2xl bg-slate-50/40"
                  />
                ))}

                {/* Day Cells */}
                {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                  const dayNum = dayIndex + 1;
                  const formattedDate = getFormattedDateKey(dayNum);
                  const hasEvent = announcements.some(
                    (a) => a.dateKey === formattedDate,
                  );
                  const matchedEvent = announcements.find(
                    (a) => a.dateKey === formattedDate,
                  );
                  const isToday =
                    isCurrentMonthShown && dayNum === today.getDate();

                  return (
                    <button
                      key={dayNum}
                      onClick={() => hasEvent && setSelectedDate(formattedDate)}
                      disabled={!hasEvent}
                      style={{
                        animationDelay: `${Math.min(dayIndex * 10, 200)}ms`,
                      }}
                      className={`cell-in relative h-14 sm:h-16 rounded-2xl flex flex-col items-center justify-between p-2 text-xs sm:text-sm font-bold transition-all duration-300 ${
                        hasEvent
                          ? `bg-linear-to-br ${
                              matchedEvent?.urgent
                                ? "from-rose-500 to-rose-600 shadow-rose-600/20"
                                : "from-emerald-600 to-teal-600 shadow-emerald-600/20"
                            } text-white shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer`
                          : "bg-slate-50/80 text-slate-700 hover:bg-slate-100/80 cursor-default"
                      } ${
                        isToday
                          ? hasEvent
                            ? "ring-2 ring-white ring-offset-2 ring-offset-emerald-600"
                            : "ring-2 ring-emerald-400/70 text-emerald-700 bg-emerald-50"
                          : ""
                      }`}
                    >
                      <span className="self-start text-xs font-semibold opacity-90">
                        {dayNum}
                      </span>

                      {hasEvent && matchedEvent && (
                        <div className="w-full flex items-center justify-between gap-1 mt-auto">
                          <span className="hidden sm:inline-block truncate text-[10px] font-medium bg-white/20 backdrop-blur-xs px-1.5 py-0.5 rounded-md">
                            {matchedEvent.tag}
                          </span>
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                        </div>
                      )}

                      {isToday && !hasEvent && (
                        <span className="text-[9px] font-bold uppercase tracking-wide text-emerald-600">
                          Today
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Calendar Footer Legend */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                <span>Community / Development</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span>Urgent Advisory</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Pin className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Pinned Notice</span>
              </div>
            </div>
            <span className="font-semibold text-slate-700">
              {announcements.length} Total Events
            </span>
          </div>
        </motion.div>

        {/* ================= 2. BULLETIN ANNOUNCEMENTS - SQUARE CARDS WITH IMAGES ================= */}
        <div className="flex flex-col gap-6">
          <motion.div
            variants={animate.itemVariants}
            className="flex justify-between items-center"
          >
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Official Bulletins
              </h3>
              <p className="text-xs text-slate-500">
                Pinned notices and municipal advisories
              </p>
            </div>

            <Link
              to="/all"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 hover:bg-emerald-100/80 px-4 py-2 rounded-xl"
            >
              <span>View All Bulletins</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Square Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((item) => (
              <>
                <AnnouncementCard
                  key={item.id}
                  variants={animate.itemVariants}
                  setSelectedDate={() => setSelectedDate(item.dateKey)}
                  image={item.image}
                  title={item.title}
                  urgent={item.urgent}
                  tag={item.tag}
                  isPinned={item.isPinned}
                  dateDisplay={item.dateDisplay}
                  desc={item.desc}
                  pinnedNote={item.pinnedNote}
                />
              </>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ================= 3. POPUP MODAL FOR EVENT DETAILS ================= */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDate(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDate(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-white/80 bg-white/60 backdrop-blur-sm transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {activeEvents.length > 0 ? (
                activeEvents.map((event) => (
                  <div key={event.id} className="flex flex-col md:flex-row">
                    {/* Image column */}
                    <div className="relative w-full md:w-2/5 h-52 md:h-auto shrink-0 bg-slate-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-slate-950/50 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-xs ${
                            event.urgent
                              ? "bg-rose-500 text-white"
                              : "bg-emerald-600 text-white"
                          }`}
                        >
                          {event.tag}
                        </span>
                        {event.isPinned && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-xs">
                            <Pin className="w-3 h-3 fill-white" />
                            Pinned
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Details column */}
                    <div className="flex-1 p-6 sm:p-8 space-y-5">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug pr-8">
                        {event.title}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 rounded-xl px-3 py-2">
                          <CalendarIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-semibold">
                            {event.dateDisplay}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 rounded-xl px-3 py-2">
                          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 rounded-xl px-3 py-2">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Detailed Pinned Note inside Modal */}
                      {event.pinnedNote && (
                        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                          <Pin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 fill-amber-600" />
                          <div>
                            <p className="font-bold mb-0.5">Pinned Note:</p>
                            <p>{event.pinnedNote}</p>
                          </div>
                        </div>
                      )}

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {event.desc}
                      </p>

                      <div className="pt-2">
                        <button
                          onClick={() => setSelectedDate(null)}
                          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-lg shadow-emerald-600/25"
                        >
                          Close & Continue
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 px-6 space-y-3">
                  <Tag className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-800">
                    No Scheduled Events
                  </h4>
                  <p className="text-sm text-slate-500">
                    There are no public announcements or events scheduled for
                    this date.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
