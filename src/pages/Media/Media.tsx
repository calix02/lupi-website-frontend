import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Video,
  Play,
  Heart,
  Share2,
  Maximize2,
  X,
  Filter,
  Sparkles,
  Calendar,
  MessageCircle,
  ThumbsUp,
  Search,
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";

export interface MediaItem {
  id: number;
  title: string;
  category: "Photos" | "Videos" | "Events" | "Projects";
  type: "image" | "video";
  thumbnail: string;
  videoUrl?: string; // Standard mp4 or embed
  date: string;
  location: string;
  description: string;
  likes: number;
  commentsCount: number;
  featured?: boolean;
}

export default function Media() {
  const animate = useInOutAnimation();

  // Active Category Filter
  const [activeTab, setActiveTab] = useState<"All" | "Photos" | "Videos" | "Events" | "Projects">("All");
  
  // Selected Media item for full-screen Modal Preview
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Like interaction state (tracks item IDs liked in session)
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Sample LGU Media Feed Data
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      title: "Annual Civic Parade & Cultural Showcase 2026",
      category: "Events",
      type: "image",
      thumbnail: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      date: "August 05, 2026",
      location: "Municipal Plaza",
      description: "Highlights from our vibrant annual civic parade celebrating local heritage, culture, and community spirit across all barangays.",
      likes: 342,
      commentsCount: 28,
      featured: true,
    },
    {
      id: 2,
      title: "State of the Municipality Address & Accomplishment Highlights",
      category: "Videos",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      date: "August 01, 2026",
      location: "Session Hall",
      description: "Watch the full recording of the Mayor's Address detailing key achievements in healthcare, infrastructure, and agriculture.",
      likes: 512,
      commentsCount: 64,
      featured: true,
    },
    {
      id: 3,
      title: "Completion of Coastal Road Bypass Project - Phase 1",
      category: "Projects",
      type: "image",
      thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
      date: "July 29, 2026",
      location: "Barangay Poblacion",
      description: "Phase 1 of the new bypass highway is officially open, reducing downtown travel time by up to 25 minutes.",
      likes: 215,
      commentsCount: 19,
    },
    {
      id: 4,
      title: "Medical & Dental Mission Outreach Highlights",
      category: "Photos",
      type: "image",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      date: "July 24, 2026",
      location: "Napolidan Gymnasium",
      description: "Over 800 residents received free medical checkups, dental extractions, and essential medicine during our weekend health drive.",
      likes: 428,
      commentsCount: 45,
    },
    {
      id: 5,
      title: "Disaster Preparedness & Rescue Operations Simulation",
      category: "Videos",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      date: "July 18, 2026",
      location: "MDRRMO Training Center",
      description: "MDRRMO personnel conducted a joint water rescue and flood evacuation exercise with local emergency responders.",
      likes: 189,
      commentsCount: 12,
    },
    {
      id: 6,
      title: "Distribution of Agricultural Inputs & Seedlings to Farmers",
      category: "Projects",
      type: "image",
      thumbnail: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&w=1200&q=80",
      date: "July 12, 2026",
      location: "Municipal Agriculture Office",
      description: "Supporting our local farmers with high-yield seeds, fertilizers, and modern equipment grants for the wet season.",
      likes: 310,
      commentsCount: 22,
    },
  ];

  // Toggle Like Status
  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter Logic
  const filteredItems = mediaItems.filter((item) => {
    const matchesTab =
      activeTab === "All" ? true : item.category === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section
      id="media-gallery"
      className="relative w-full min-h-screen py-20 sm:py-24 px-4 sm:px-8 bg-slate-900 text-slate-100 overflow-hidden flex flex-col items-center"
    >
      {/* Background Glows & Accent Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[10%] w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-10"
      >
        {/* Section Header */}
        <motion.div variants={animate.itemVariants} className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Community Media & Activity Feed</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Municipal Activities &{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Media Hub
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Explore live photo highlights, video coverage, and milestone projects from around our municipality.
          </p>
        </motion.div>

        {/* Filter Navigation & Search Bar */}
        <motion.div
          variants={animate.itemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-800/60 backdrop-blur-xl border border-slate-700/60 p-3 sm:p-4 rounded-3xl shadow-2xl"
        >
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {(["All", "Photos", "Videos", "Events", "Projects"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMediaTab"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab === "Videos" && <Video className="w-3.5 h-3.5" />}
                    {tab === "Photos" && <ImageIcon className="w-3.5 h-3.5" />}
                    {tab}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search activities or places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-emerald-500 text-slate-200 text-xs sm:text-sm rounded-2xl pl-10 pr-4 py-2.5 outline-none transition-colors placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Media Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${searchQuery}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => {
              const isLiked = likedItems[item.id];
              const displayLikes = isLiked ? item.likes + 1 : item.likes;

              return (
                <motion.div
                  key={item.id}
                  layout
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedMedia(item)}
                  className="group relative flex flex-col justify-between bg-slate-800/40 backdrop-blur-md border border-slate-700/50 hover:border-emerald-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Media Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-emerald-400 border border-slate-700/80 backdrop-blur-md">
                        {item.type === "video" ? (
                          <Video className="w-3 h-3 text-rose-400" />
                        ) : (
                          <ImageIcon className="w-3 h-3 text-emerald-400" />
                        )}
                        {item.category}
                      </span>
                    </div>

                    {/* Video Play Button Overlay */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Expand Button */}
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md hover:text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Date / Location Info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        {item.date}
                      </span>
                      <span className="truncate max-w-[140px]">{item.location}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Social Interaction Bar (Facebook-like) */}
                    <div className="pt-3 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => toggleLike(item.id, e)}
                          className={`flex items-center gap-1.5 font-semibold transition-colors ${
                            isLiked
                              ? "text-rose-400"
                              : "hover:text-rose-400 text-slate-400"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isLiked ? "fill-rose-400 text-rose-400" : ""
                            }`}
                          />
                          <span>{displayLikes}</span>
                        </button>

                        <div className="flex items-center gap-1.5 hover:text-slate-200">
                          <MessageCircle className="w-4 h-4" />
                          <span>{item.commentsCount}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigator.share) {
                            navigator.share({
                              title: item.title,
                              text: item.description,
                              url: window.location.href,
                            });
                          }
                        }}
                        className="hover:text-emerald-400 transition-colors p-1"
                        title="Share Activity"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 px-4 bg-slate-800/20 rounded-3xl border border-slate-800">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-300">No media found</h4>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or selecting a different category tab.
            </p>
          </div>
        )}
      </motion.div>

      {/* ================= FULL-SCREEN MEDIA MODAL ================= */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/80 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Player / Image Area */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[280px] lg:min-h-[480px]">
                {selectedMedia.type === "video" ? (
                  <video
                    src={selectedMedia.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full max-h-[60vh] lg:max-h-[80vh] object-contain"
                  />
                ) : (
                  <img
                    src={selectedMedia.thumbnail}
                    alt={selectedMedia.title}
                    className="w-full h-full max-h-[60vh] lg:max-h-[80vh] object-contain"
                  />
                )}
              </div>

              {/* Sidebar Info & Interactive Post Comments Feed */}
              <div className="w-full lg:w-96 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 overflow-y-auto bg-slate-900/90">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                      {selectedMedia.category}
                    </span>
                    <span className="text-xs text-slate-400">{selectedMedia.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug">
                    {selectedMedia.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMedia.description}
                  </p>

                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
                    <p>
                      <strong className="text-slate-200">Location:</strong> {selectedMedia.location}
                    </p>
                  </div>
                </div>

                {/* Simulated Social Action Footer */}
                <div className="pt-6 border-t border-slate-800 mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => toggleLike(selectedMedia.id, e)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        likedItems[selectedMedia.id]
                          ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>
                        {likedItems[selectedMedia.id]
                          ? selectedMedia.likes + 1
                          : selectedMedia.likes}{" "}
                        Likes
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: selectedMedia.title,
                            text: selectedMedia.description,
                            url: window.location.href,
                          });
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}