import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Tag,
  ArrowRight,
  Filter,
  Megaphone,
  Pin,
  ChevronLeft,
  ChevronRight,
  Clock,
  Maximize2,
  X,
} from "lucide-react";

// Sample Announcement Data with High-Quality Poster Images
const ANNOUNCEMENTS = [
  {
    id: "1",
    title: "Annual Municipal Town Hall & Citizen Engagement Forum 2026",
    summary:
      "Join local leaders and fellow residents to discuss upcoming infrastructure projects, digital public services, and community budgets for the coming year.",
    category: "Events",
    date: "Aug 15, 2026",
    readTime: "3 min read",
    isPinned: true,
    image:
      "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "2",
    title: "Schedule of Municipal Financial Assistance Distribution",
    summary:
      "All qualified beneficiaries are advised to report to the Lupi Covered Court starting at 8:00 AM.",
    category: "Advisory",
    date: "July 28, 2026",
    readTime: "2 min read",
    isPinned: true,
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "3",
    title: "Launch of the New Digital Business Permit Application Workflow",
    summary:
      "Business owners can now apply, submit requirements, and pay fees entirely online with automated status tracking and instant SMS updates.",
    category: "Services",
    date: "Aug 02, 2026",
    readTime: "4 min read",
    isPinned: false,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "4",
    title: "Free Healthcare & Dental Mission in Barangay Napolidan",
    summary:
      "In partnership with the Rural Health Unit, medical checkups and basic medicine will be provided free for all registered residents.",
    category: "Events",
    date: "August 02, 2026",
    readTime: "3 min read",
    isPinned: false,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "5",
    title: "Public Hearing for New Infrastructure & Road Projects",
    summary:
      "Join us at the Session Hall as we present the upcoming farm-to-market road developments and temporarily closed main routes.",
    category: "Development",
    date: "August 10, 2026",
    readTime: "2 min read",
    isPinned: false,
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "6",
    title: "Youth Tech & Coding Bootcamp Summer Registration Now Open",
    summary:
      "High school and college students are invited to join our intensive 2-week digital literacy and web development workshop series.",
    category: "General",
    date: "Jul 12, 2026",
    readTime: "5 min read",
    isPinned: false,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
  },
];

const CATEGORIES = ["All", "Events", "Advisory", "Services", "Development", "General"];

export default function AllAnnouncement() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPoster, setSelectedPoster] = useState<{
    title: string;
    image: string;
  } | null>(null);

  // Filtering Logic
  const filteredAnnouncements = ANNOUNCEMENTS.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

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

      {/* Ambient Glows */}
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
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
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
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900"
          >
            All Municipal{" "}
            <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Announcements
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg"
          >
            Stay informed with official updates, community programs, public health advisories, and civic events from LGU Lupi.
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

          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-200/60 pt-4">
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

        {/* Announcements Grid */}
        <AnimatePresence mode="wait">
          {filteredAnnouncements.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredAnnouncements.map((item) => (
                <motion.article
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-2xl hover:border-emerald-300 transition-all duration-300"
                >
                  <div>
                    {/* Announcement Image Banner */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

                      {/* Floating Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-emerald-800 shadow-xs border border-white/40">
                          <Tag className="h-3 w-3 text-emerald-600" />
                          {item.category}
                        </span>

                        {item.isPinned && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/90 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white shadow-xs">
                            <Pin className="h-3 w-3 fill-white" />
                            Pinned
                          </span>
                        )}
                      </div>

                      {/* Quick Poster Preview Button */}
                      <button
                        onClick={() =>
                          setSelectedPoster({
                            title: item.title,
                            image: item.image,
                          })
                        }
                        className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-emerald-600"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>View Poster</span>
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {item.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {item.readTime}
                        </span>
                      </div>

                      <a
                        href={`#announcement-${item.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors"
                      >
                        Read Details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-slate-50/50"
            >
              <Megaphone className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">
                No announcements found
              </h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm">
                Try adjusting your search terms or filter selection to find what
                you're looking for.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={true}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox Poster Modal */}
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
                <h4 className="text-base font-semibold text-white">
                  {selectedPoster.title}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}