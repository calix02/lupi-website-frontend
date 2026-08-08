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
  ChevronLeft,
  ChevronRight,
  MapPin,
  Send,
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";

export interface MediaItem {
  id: number;
  title: string;
  category: "Photos" | "Videos" | "Events" | "Projects";
  type: "image" | "video";
  images: string[]; // Supports single or multiple uploaded photos
  videoUrl?: string;
  date: string;
  location: string;
  description: string;
  likes: number;
  commentsCount: number;
  comments?: { id: number; author: string; text: string; time: string }[];
}

export default function Media() {
  const animate = useInOutAnimation();

  // Active Category Filter
  const [activeTab, setActiveTab] = useState<"All" | "Photos" | "Videos" | "Events" | "Projects">("All");

  // Selected Media item for full-screen Modal Preview
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Active Image Index inside Modal Preview (for multi-image posts)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Track active image index on cards (keyed by item ID)
  const [cardImageIndices, setCardImageIndices] = useState<Record<number, number>>({});

  // Like interaction state (tracks item IDs liked in session)
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // New Comment Input
  const [newCommentText, setNewCommentText] = useState("");

  // Sample LGU Media Feed Data (supports multiple uploaded images)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      title: "Annual Civic Parade & Cultural Showcase 2026",
      category: "Events",
      type: "image",
      images: [
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
      ],
      date: "August 05, 2026",
      location: "Municipal Plaza",
      description: "Highlights from our vibrant annual civic parade celebrating local heritage, culture, and community spirit across all barangays.",
      likes: 342,
      commentsCount: 3,
      comments: [
        { id: 1, author: "Maria Santos", text: "Proud to be part of this municipality! Great performance!", time: "2h ago" },
        { id: 2, author: "Juan dela Cruz", text: "The street dance competition was amazing this year.", time: "4h ago" },
      ],
    },
    {
      id: 2,
      title: "State of the Municipality Address & Accomplishment Highlights",
      category: "Videos",
      type: "video",
      images: [
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      ],
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      date: "August 01, 2026",
      location: "Session Hall",
      description: "Watch the full recording of the Mayor's Address detailing key achievements in healthcare, infrastructure, and agriculture.",
      likes: 512,
      commentsCount: 12,
      comments: [
        { id: 1, author: "Arnel Reyes", text: "Kudos to the entire local administration for these milestones!", time: "1d ago" },
      ],
    },
    {
      id: 3,
      title: "Completion of Coastal Road Bypass Project - Phase 1",
      category: "Projects",
      type: "image",
      images: [
        "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      ],
      date: "July 29, 2026",
      location: "Barangay Poblacion",
      description: "Phase 1 of the new bypass highway is officially open, reducing downtown travel time by up to 25 minutes.",
      likes: 215,
      commentsCount: 2,
      comments: [
        { id: 1, author: "Elena Gomez", text: "This will help ease daily heavy traffic so much!", time: "3d ago" },
      ],
    },
    {
      id: 4,
      title: "Medical & Dental Mission Outreach Highlights",
      category: "Photos",
      type: "image",
      images: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      ],
      date: "July 24, 2026",
      location: "Napolidan Gymnasium",
      description: "Over 800 residents received free medical checkups, dental extractions, and essential medicine during our weekend health drive.",
      likes: 428,
      commentsCount: 5,
      comments: [
        { id: 1, author: "Luzviminda Cruz", text: "Thank you RHU doctors and volunteers for serving our barangay!", time: "5d ago" },
      ],
    },
    {
      id: 5,
      title: "Disaster Preparedness & Rescue Operations Simulation",
      category: "Videos",
      type: "video",
      images: [
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
      ],
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      date: "July 18, 2026",
      location: "MDRRMO Training Center",
      description: "MDRRMO personnel conducted a joint water rescue and flood evacuation exercise with local emergency responders.",
      likes: 189,
      commentsCount: 1,
    },
    {
      id: 6,
      title: "Distribution of Agricultural Inputs & Seedlings to Farmers",
      category: "Projects",
      type: "image",
      images: [
        "https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
      ],
      date: "July 12, 2026",
      location: "Municipal Agriculture Office",
      description: "Supporting our local farmers with high-yield seeds, fertilizers, and modern equipment grants for the wet season.",
      likes: 310,
      commentsCount: 4,
    },
  ]);

  // Toggle Like Status
  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Card Image Switcher
  const handleNextCardImage = (itemId: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrevCardImage = (itemId: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  // Add Comment to selected post
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !selectedMedia) return;

    const newComment = {
      id: Date.now(),
      author: "Resident User",
      text: newCommentText.trim(),
      time: "Just now",
    };

    setMediaItems((prev) =>
      prev.map((item) =>
        item.id === selectedMedia.id
          ? {
              ...item,
              commentsCount: item.commentsCount + 1,
              comments: [...(item.comments || []), newComment],
            }
          : item
      )
    );

    setSelectedMedia((prev) =>
      prev
        ? {
            ...prev,
            commentsCount: prev.commentsCount + 1,
            comments: [...(prev.comments || []), newComment],
          }
        : null
    );

    setNewCommentText("");
  };

  // Filter Logic
  const filteredItems = mediaItems.filter((item) => {
    const matchesTab = activeTab === "All" ? true : item.category === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section
      id="media-gallery"
      className="relative w-full min-h-screen py-20 sm:py-24 px-4 sm:px-8 bg-slate-50 text-slate-900 overflow-hidden flex flex-col items-center"
    >
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px)",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Activity Feed & Media Hub</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Municipal Happenings &{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Photo Gallery
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Stay engaged with official photos, video reports, and community initiatives across all municipal barangays.
          </p>
        </motion.div>

        {/* Filter Bar & Search Box */}
        <motion.div
          variants={animate.itemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 rounded-3xl shadow-xl shadow-slate-200/50"
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
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMediaTabLight"
                      className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-md shadow-emerald-600/20"
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

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search activity or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-800 text-xs sm:text-sm rounded-2xl pl-10 pr-8 py-2.5 outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Media Feed Cards Grid */}
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

              const activeCardImgIdx = cardImageIndices[item.id] || 0;
              const hasMultipleImages = item.images.length > 1;

              return (
                <motion.div
                  key={item.id}
                  layout
                  whileHover={{ y: -6 }}
                  onClick={() => {
                    setSelectedMedia(item);
                    setActiveImageIndex(activeCardImgIdx);
                  }}
                  className="group relative flex flex-col justify-between bg-white border border-slate-200/80 hover:border-emerald-300 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer"
                >
                  {/* Card Image Display */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.images[activeCardImgIdx]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-slate-800 border border-slate-200 backdrop-blur-md shadow-xs">
                        {item.type === "video" ? (
                          <Video className="w-3 h-3 text-rose-500" />
                        ) : (
                          <ImageIcon className="w-3 h-3 text-emerald-600" />
                        )}
                        {item.category}
                      </span>

                      {/* Multi-Photo Indicator Badge */}
                      {hasMultipleImages && (
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md shadow-xs">
                          {activeCardImgIdx + 1} / {item.images.length} photos
                        </span>
                      )}
                    </div>

                    {/* Next/Prev Buttons for Multi-Image Posts */}
                    {hasMultipleImages && (
                      <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <button
                          onClick={(e) => handlePrevCardImage(item.id, item.images.length, e)}
                          className="pointer-events-auto p-1.5 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-md hover:scale-110 transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleNextCardImage(item.id, item.images.length, e)}
                          className="pointer-events-auto p-1.5 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-md hover:scale-110 transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Video Overlay Play Button */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Zoom / Expand Icon */}
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>

                    {/* Image Date & Location Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1 truncate max-w-32.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Section */}
                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Multi-Image Thumbnail Dots/Strip (If 3+ photos) */}
                    {hasMultipleImages && (
                      <div className="flex items-center gap-1.5 pt-1">
                        {item.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardImageIndices((prev) => ({ ...prev, [item.id]: idx }));
                            }}
                            className={`h-8 flex-1 rounded-lg overflow-hidden border transition-all ${
                              idx === activeCardImgIdx
                                ? "border-emerald-600 ring-2 ring-emerald-500/20"
                                : "border-slate-200 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={img} alt="thumb" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Social Interaction Bar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => toggleLike(item.id, e)}
                          className={`flex items-center gap-1.5 transition-colors ${
                            isLiked
                              ? "text-rose-500 font-bold"
                              : "hover:text-rose-500 text-slate-600"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isLiked ? "fill-rose-500 text-rose-500" : ""
                            }`}
                          />
                          <span>{displayLikes}</span>
                        </button>

                        <div className="flex items-center gap-1.5 hover:text-slate-800">
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
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-emerald-600 transition-colors"
                        title="Share Post"
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
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-700">No activities found</h4>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or selecting a different category tab.
            </p>
          </div>
        )}
      </motion.div>

      {/* ================= LIGHT-THEMED FULL-SCREEN EXPANDED MODAL ================= */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl bg-white border border-slate-100 shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-md backdrop-blur-sm transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Media Viewer Area */}
              <div className="relative flex-1 bg-slate-950 flex flex-col items-center justify-center min-h-75 lg:min-h-125">
                {selectedMedia.type === "video" ? (
                  <video
                    src={selectedMedia.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full max-h-[60vh] lg:max-h-[80vh] object-contain"
                  />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedMedia.images[activeImageIndex]}
                      alt={selectedMedia.title}
                      className="w-full h-full max-h-[60vh] lg:max-h-[80vh] object-contain"
                    />

                    {/* Next / Prev Image Controls inside Modal */}
                    {selectedMedia.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setActiveImageIndex(
                              (prev) =>
                                (prev - 1 + selectedMedia.images.length) %
                                selectedMedia.images.length
                            )
                          }
                          className="absolute left-4 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white shadow-lg backdrop-blur-md transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setActiveImageIndex(
                              (prev) => (prev + 1) % selectedMedia.images.length
                            )
                          }
                          className="absolute right-4 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white shadow-lg backdrop-blur-md transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Multiple Image Gallery Strip inside Modal */}
                {selectedMedia.images.length > 1 && selectedMedia.type === "image" && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 z-20 max-w-[90%] overflow-x-auto">
                    {selectedMedia.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          idx === activeImageIndex
                            ? "border-emerald-400 scale-105 ring-2 ring-emerald-500/30"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar Info & Comments Section */}
              <div className="w-full lg:w-96 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 overflow-y-auto bg-slate-50/50">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {selectedMedia.category}
                    </span>
                    <span className="text-xs text-slate-500">{selectedMedia.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {selectedMedia.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedMedia.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold pt-1">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{selectedMedia.location}</span>
                  </div>

                  {/* Comment Feed Stream */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Comments ({selectedMedia.commentsCount})
                    </h4>

                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {selectedMedia.comments && selectedMedia.comments.length > 0 ? (
                        selectedMedia.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">
                                {comment.author}
                              </span>
                              <span className="text-[10px] text-slate-400">{comment.time}</span>
                            </div>
                            <p className="text-xs text-slate-600">{comment.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">No comments yet. Be the first!</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Controls & Add Comment Form */}
                <div className="pt-4 border-t border-slate-200 mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => toggleLike(selectedMedia.id, e)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        likedItems[selectedMedia.id]
                          ? "bg-rose-500/10 border-rose-200 text-rose-600"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
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
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Add Comment Input */}
                  <form onSubmit={handleAddComment} className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-2xl pl-3.5 pr-10 py-2.5 outline-none focus:border-emerald-500 shadow-2xs"
                    />
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className="absolute right-2 p-1.5 rounded-xl bg-emerald-600 text-white disabled:opacity-40 hover:bg-emerald-700 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}