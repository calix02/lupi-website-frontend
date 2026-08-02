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
  Tag 
} from "lucide-react";
import { Link } from "react-router-dom";
import useInOutAnimation from "@/hooks/useInOutAnimation";

// Import thumbnail assets
import AssistanceImg from "@/assets/logos/LGU-NEW.png";
import HealthMissionImg from "@/assets/logos/LGU-NEW.png";
import RoadProjImg from "@/assets/logos/LGU-NEW.png";

export default function Announcement() {
  const animate = useInOutAnimation();

  // Selected date for event modal popup
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Calendar State (Defaulting to July 2026 based on sample data)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // July 2026

  // Announcements and Events Dataset
  const announcements = [
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
      image: AssistanceImg,
    },
    {
      id: 2,
      tag: "Community",
      title: "Free Healthcare & Dental Mission in Barangay Napolidan",
      dateKey: "2026-08-02",
      dateDisplay: "August 02, 2026",
      time: "9:00 AM - 3:00 PM",
      location: "Barangay Napolidan Multi-Purpose Hall",
      desc: "In partnership with the Rural Health Unit, medical checkups, dental checkups, and basic prescription medicines will be provided free of charge.",
      urgent: false,
      image: HealthMissionImg,
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
      image: RoadProjImg,
    },
  ];

  // Calendar Helper Logic
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Format YYYY-MM-DD string for comparison
  const getFormattedDateKey = (dayNumber: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(dayNumber).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Find events for selected modal popup
  const activeEvents = announcements.filter((item) => item.dateKey === selectedDate);

  return (
    <section
      id="announcements"
      className="relative w-full min-h-screen py-20 sm:py-24 px-4 sm:px-8 bg-slate-50 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background Decor */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-10"
      >
        {/* Section Header */}
        <motion.div variants={animate.itemVariants} className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide mb-3">
            <Bell className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
            <span>Public Updates & Events</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Latest Announcements &{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Municipal Calendar
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Stay informed with upcoming LGU events, advisories, and community programs.
          </p>
        </motion.div>

        {/* Two-Column Grid: Calendar + Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= 1. INTERACTIVE CALENDAR ================= */}
          <motion.div
            variants={animate.itemVariants}
            className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/50 flex flex-col"
          >
            {/* Calendar Header Controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* Empty leading slots for offset */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="h-10 sm:h-11 rounded-xl" />
              ))}

              {/* Day numbers */}
              {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                const dayNum = dayIndex + 1;
                const formattedDate = getFormattedDateKey(dayNum);
                const hasEvent = announcements.some((a) => a.dateKey === formattedDate);

                return (
                  <button
                    key={dayNum}
                    onClick={() => hasEvent && setSelectedDate(formattedDate)}
                    disabled={!hasEvent}
                    className={`relative h-10 sm:h-11 rounded-xl flex items-center justify-center text-xs sm:text-sm font-semibold transition-all ${
                      hasEvent
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/25 hover:bg-emerald-700 hover:scale-105 cursor-pointer"
                        : "text-slate-700 hover:bg-slate-100 cursor-default"
                    }`}
                  >
                    {dayNum}
                    {hasEvent && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                <span>Scheduled Event (Click to view)</span>
              </div>
              <span>{announcements.length} Events</span>
            </div>
          </motion.div>

          {/* ================= 2. BULLETIN ANNOUNCEMENTS LIST ================= */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <motion.div variants={animate.itemVariants} className="flex justify-between items-center pb-2">
              <h3 className="text-xl font-bold text-slate-900">Official Bulletins</h3>
              <Link
                to="/all-announcements"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <span>View All Bulletins</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {announcements.map((item) => (
              <motion.div
                key={item.id}
                variants={animate.itemVariants}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedDate(item.dateKey)}
                className="group relative flex flex-col sm:flex-row items-stretch gap-4 rounded-2xl bg-white p-4 sm:p-5 shadow-md shadow-slate-200/50 border border-slate-200/80 hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer overflow-hidden"
              >
                {/* Thumbnail Image */}
                <div className="relative w-full sm:w-36 h-36 sm:h-auto shrink-0 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Card Content */}
                <div className="flex flex-col justify-between flex-1 space-y-2">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          item.urgent
                            ? "bg-rose-100 text-rose-700 border border-rose-200"
                            : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {item.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {item.dateDisplay}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 pt-1">
                    <span>View Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
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
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDate(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {activeEvents.length > 0 ? (
                activeEvents.map((event) => (
                  <div key={event.id} className="space-y-5">
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm ${
                          event.urgent
                            ? "bg-rose-500 text-white"
                            : "bg-emerald-600 text-white"
                        }`}
                      >
                        {event.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                        {event.title}
                      </h3>
                    </div>

                    <div className="space-y-2.5 py-3 border-y border-slate-100 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold">{event.dateDisplay}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>

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
                ))
              ) : (
                <div className="text-center py-8 space-y-3">
                  <Tag className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-800">No Scheduled Events</h4>
                  <p className="text-sm text-slate-500">
                    There are no public announcements or events scheduled for this date.
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