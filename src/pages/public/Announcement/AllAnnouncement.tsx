import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Tag,
  Filter,
  Megaphone,
  Pin,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
  Share2,
  Check,
  MapPin,
  CalendarIcon,
} from "lucide-react";
import Badminton from "@/assets/events/badmintom.jpg";
import AnnouncementCard from "./components/AnnouncementCard";
import useInOutAnimation from "@/hooks/useInOutAnimation";

// Announcement Data Structure Definition
export interface AnnouncementItem {
  id: number;
  tag: string;
  dateKey: string;
  dateDisplay: string;
  title: string;
  category: string;
  isPinned: boolean;
  image: string;
  time: string;
  location: string;
  desc: string;
  urgent: boolean;
  pinnedNote: string;
}

// Sample Announcement Data
// Announcements and Events Dataset
const announcements: AnnouncementItem[] = [
  {
    id: 1,
    category: "Events",
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
    image: Badminton,
  },
  {
    id: 2,
    tag: "Events",
    category: "Events",
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
    image: Badminton,
  },

  {
    id: 3,
    tag: "Development",
    category: "Events",
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
    image: Badminton,
  },
];

const CATEGORIES = [
  "All",
  "Events",
  "Advisory",
  "Services",
  "Development",
  "General",
];

export default function AllAnnouncement() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Selected date for event modal popup
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const animate = useInOutAnimation();
  const activeEvents = announcements.filter(
    (item) => item.dateKey === selectedDate,
  );

  // State for Full Detail Card Modal
  const [activeAnnouncement, setActiveAnnouncement] =
    useState<AnnouncementItem | null>(null);

  // State for Lightbox Poster Image Only
  const [selectedPoster, setSelectedPoster] = useState<{
    title: string;
    image: string;
  } | null>(null);

  // State for Share Feedback
  const [copied, setCopied] = useState(false);

  // Filtering Logic
  const filteredAnnouncements = announcements.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section
      id="all-announcements"
      className="relative flex min-h-screen w-full flex-col bg-white text-slate-800 overflow-hidden pt-28 pb-20 items-center justify-center"
    >
      {/* ================= 1. BACKGROUND PATTERN & AMBIENT GLOW ================= */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 19V11h2v8h8v2h-8v8h-2v-8h-8v-2h8z' fill='%200edb91' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/25 rounded-full blur-3xl pointer-events-none"
      />

      {/* ================= 2. MAIN CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-800 shadow-xs"
          >
            <Megaphone className="h-4 w-4 text-emerald-600 animate-bounce" />
            <span>Public Updates & Advisories</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900"
          >
            All Municipal{" "}
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Announcements
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl text-sm sm:text-lg text-slate-600"
          >
            Stay informed with official updates, community programs, public
            health advisories, and civic events from LGU Lupi.
          </motion.p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-col gap-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-6 shadow-xs backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-xs outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="text-xs sm:text-sm font-medium text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {filteredAnnouncements.length}
              </span>{" "}
              {filteredAnnouncements.length === 1
                ? "announcement"
                : "announcements"}
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-200/60 pt-4 scrollbar-none">
            <Filter className="h-4 w-4 text-slate-400 shrink-0 mr-1" />
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium transition-all shrink-0 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/80"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
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

        {/* Pagination Controls */}
        {filteredAnnouncements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.15 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="px-4 text-xs font-semibold text-slate-600">
              Page {currentPage} of 1
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={true}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* ================= 4. LIGHTBOX POSTER IMAGE MODAL ================= */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPoster(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-slate-900/80 p-2 text-slate-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative max-h-[80vh] w-full bg-black flex items-center justify-center">
                <img
                  src={selectedPoster.image}
                  alt={selectedPoster.title}
                  className="max-h-[80vh] w-full object-contain"
                />
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <h4 className="text-sm sm:text-base font-semibold text-white">
                  {selectedPoster.title}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
