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
  ArrowLeft,
  Share2,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

// Announcement Data Structure Definition
export interface AnnouncementItem {
  id: string;
  title: string;
  summary: string;
  fullContent?: string;
  category: string;
  date: string;
  readTime: string;
  isPinned: boolean;
  image: string;
}

// Sample Announcement Data
const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "1",
    title: "Annual Municipal Town Hall & Citizen Engagement Forum 2026",
    summary:
      "Join local leaders and fellow residents to discuss upcoming infrastructure projects, digital public services, and community budgets for the coming year.",
    fullContent:
      "The Municipal Government invites all residents, business owners, and civic organizers to participate in our annual Town Hall Forum. This open dialogue session will cover major municipal initiatives including road expansions, public healthcare enhancements, and transparency reporting on local budget allocations. Attending citizens will have direct opportunities to ask questions and submit civic proposals to municipal department heads.",
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
    fullContent:
      "The Social Welfare and Development Office announces the official schedule for financial assistance disbursement. All pre-verified beneficiaries must present two (2) valid government-issued IDs along with their original stub. Distribution will follow strict batch scheduling to ensure safety and efficiency. Beneficiaries requiring special assistance or proxy claims must register through their respective Barangay Secretariat prior to the distribution day.",
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
    fullContent:
      "Starting this month, municipal business permit renewals and new applications can be fully processed through the LGU Portal. This end-to-end digital system eliminates long queues at the Treasury and Permit offices. Key benefits include integrated e-payment gateways, automated compliance checklists, real-time SMS status alerts, and digital permit generation with verifiable QR codes.",
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
    fullContent:
      "The Municipal Health Office, in collaboration with volunteer medical professionals, is organizing a day-long health outreach program in Barangay Napolidan. Services available include general health consultations, pediatric checkups, dental extractions, diagnostic screenings, and free distribution of prescribed maintenance medicines. Registration opens at 7:30 AM at the Barangay Multi-Purpose Hall.",
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
    fullContent:
      "The Department of Public Works and Highways (DPWH) together with the Municipal Engineering Office will conduct a public hearing regarding scheduled road upgrades and farm-to-market bridge developments. The session aims to present project timelines, traffic rerouting schemes, and environmental impact assessments. Local commuters, transport operators, and landowners are strongly encouraged to attend.",
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
    fullContent:
      "The Municipal Information and Communications Technology (ICT) Office is opening applications for the Annual Youth Tech Workshop. The 2-week course covers web design fundamentals (HTML, CSS, JavaScript), introductory Python programming, and UI/UX design concepts. Slots are limited to 40 participants per session and hardware/computers will be provided on-site at the Municipal Tech Hub.",
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
  
  // State for Full Detail Card Modal
  const [activeAnnouncement, setActiveAnnouncement] = useState<AnnouncementItem | null>(null);

  // State for Lightbox Poster Image Only
  const [selectedPoster, setSelectedPoster] = useState<{
    title: string;
    image: string;
  } | null>(null);

  // State for Share Feedback
  const [copied, setCopied] = useState(false);

  // Filtering Logic
  const filteredAnnouncements = ANNOUNCEMENTS.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
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
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors rounded-xl hover:bg-slate-100"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

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
                  onClick={() => setActiveAnnouncement(item)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Banner Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

                      {/* Badges */}
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

                      {/* Poster Preview Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPoster({
                            title: item.title,
                            image: item.image,
                          });
                        }}
                        className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-emerald-600"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>View Poster</span>
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 sm:px-6 pb-6 pt-0">
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

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveAnnouncement(item);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors"
                      >
                        Read Details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
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
                Try adjusting your search terms or filter selection to find what you're looking for.
              </p>
              <button
                type="button"
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

      {/* ================= 3. FULL ANNOUNCEMENT DETAILS POPUP MODAL ================= */}
      <AnimatePresence>
        {activeAnnouncement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveAnnouncement(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveAnnouncement(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 text-white backdrop-blur-md hover:bg-slate-900/90 transition-colors"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero Banner Image */}
              <div className="relative w-full h-56 sm:h-72 bg-slate-100 shrink-0">
                <img
                  src={activeAnnouncement.image}
                  alt={activeAnnouncement.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Floating Meta Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      <Tag className="h-3 w-3" />
                      {activeAnnouncement.category}
                    </span>
                    {activeAnnouncement.isPinned && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        <Pin className="h-3 w-3 fill-white" />
                        Pinned
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                    {activeAnnouncement.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-100 pb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      Published on {activeAnnouncement.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-emerald-600" />
                      {activeAnnouncement.readTime}
                    </span>
                  </div>
                </div>

                {/* Summary Callout Box */}
                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-100 text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed">
                  {activeAnnouncement.summary}
                </div>

                {/* Full Article Content */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    {activeAnnouncement.fullContent ||
                      "For further inquiries, visit the Local Government Unit main administration office or coordinate with your local barangay official."}
                  </p>
                  <p>
                    Please stay tuned to our official portal and verified municipal channels for real-time schedule updates and related public notifications.
                  </p>
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-4 w-4" />
                        <span>Share Announcement</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveAnnouncement(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm font-semibold text-white transition-colors shadow-md shadow-emerald-600/20"
                  >
                    Close & Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </section>
  );
}