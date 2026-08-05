import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  MapPin,
  Navigation,
  Compass,
  Clock,
  Car,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";
import Pattern from "@/assets/pattern/pattern4.svg";
import Pattern2 from "@/assets/pattern/pattern1.svg";

import RoundCarousel from "@/components/Gallery/RoundCarousel";

// Tourist Spot Data Model for Municipality of Lupi
export interface TouristSpot {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  distance: string;
  travelTime: string;
  coordinates: { lat: number; lng: number };
  image: string;
  routeInstructions: string[];
}

const TOURIST_SPOTS: TouristSpot[] = [
  {
    id: "1",
    name: "Caves & Waterfalls of Lupi",
    category: "Eco Adventure",
    tagline: "Crystal clear cascades nestled in lush rainforests",
    description:
      "Experience pristine natural pools, refreshing waterfall plunges, and scenic jungle trekking paths perfect for weekend eco-adventures.",
    distance: "12.4 km from Town Center",
    travelTime: "25 min drive",
    coordinates: { lat: 13.7842, lng: 122.9123 },
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=1000",
    routeInstructions: [
      "Start from Lupi Municipal Hall on Maharlika Highway.",
      "Head North toward Barangay San Pedro for 8.5 km.",
      "Turn right at the Eco-Tourism Arc onto the Forest River Road.",
      "Follow the guided concrete path to the Registration Center.",
    ],
  },
  {
    id: "2",
    name: "Lupi Central Eco-Park & Ridge",
    category: "Sightseeing",
    tagline: "Panoramic mountain vistas and sunset views",
    description:
      "A serene hilltop sanctuary featuring walking trails, picnic huts, and sweeping vistas overlooking the vast greenery of Camarines Sur.",
    distance: "6.8 km from Town Center",
    travelTime: "15 min drive",
    coordinates: { lat: 13.7921, lng: 122.8984 },
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000",
    routeInstructions: [
      "Take the Southbound Provincial Road from Poblacion.",
      "Turn left at Barangay Colacling Intersection.",
      "Ascend the paved Ridge Access Road for 2.2 km to the summit parking lot.",
    ],
  },
  {
    id: "3",
    name: "Bicol River View Promenade",
    category: "Leisure & Heritage",
    tagline: "Tranquil riverfront dining and bamboo raft cruises",
    description:
      "Immerse yourself in local culture with traditional river cruising, local seafood dining, and evening riverside illumination walks.",
    distance: "3.2 km from Town Center",
    travelTime: "8 min drive",
    coordinates: { lat: 13.7715, lng: 122.9251 },
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
    routeInstructions: [
      "Head East towards the Municipal Plaza.",
      "Take Riverbank Avenue directly following the Bicol River tributary.",
      "Destination will be on the right past the old Heritage Bridge.",
    ],
  },
];

export default function TourismSection() {
  const [spots, setSpots] = useState<TouristSpot[]>(TOURIST_SPOTS);
  const [selectedMapSpot, setSelectedMapSpot] = useState<TouristSpot | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Framer Motion Drag Offsets for Front Card
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-18, 18]);
  const opacity = useTransform(dragX, [-180, -100, 0, 100, 180], [0.4, 0.9, 1, 0.9, 0.4]);

  const animate = useInOutAnimation();

  // Handle Automatic Card Swap
  useEffect(() => {
    if (isPaused || selectedMapSpot) return;

    const interval = setInterval(() => {
      swapCard();
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, selectedMapSpot]);

  const swapCard = () => {
    setSpots((prev) => {
      const newArr = [...prev];
      const front = newArr.shift();
      if (front) newArr.push(front);
      return newArr;
    });
    dragX.set(0);
  };

  const activeSpot = spots[0];

  return (
    <motion.section
      id="tourism"
      className="relative min-h-screen w-full overflow-hidden bg-slate-950 py-30 text-slate-100 flex flex-col justify-center"
    >
        <div className="absolute top-0 z-10 w-screen ">
            <img src={Pattern} alt="Pattern" className="w-full  object-cover  " />
            <div className="w-full  bg-slate-50"></div>
        </div>
        <div className="absolute bottom-0 z-10 w-screen ">
            <img src={Pattern2} alt="Pattern" className="w-full  object-cover -scale-y-100  " />
            <div className="w-full  bg-slate-50"></div>
        </div>
      {/* ================= 1. CLEAR DYNAMIC BACKGROUND IMAGE ================= */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeSpot.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.8, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none filter blur-[1px]"
          style={{ backgroundImage: `url(${activeSpot.image})` }}
        />
      </AnimatePresence>

      {/* Subtle Overlay gradient just to ensure top & bottom sections blend well */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-slate-950/90 via-slate-950/40 to-slate-950/90 pointer-events-none" />

      {/* Dynamic Ambient Color Accents */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-10 left-10 h-96 w-96 rounded-full bg-emerald-500/20 blur-[100px] pointer-events-none z-0"
      />

      {/* ================= 2. MAIN CONTENT CONTAINER ================= */}
      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.25 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            variants={animate.itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-950/80 px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md mb-4 shadow-lg"
          >
            <Compass className="h-4 w-4 animate-spin text-emerald-400" />
            <span>Discover Lupi, Camarines Sur</span>
          </motion.div>

          <motion.h2
            variants={animate.itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-md"
          >
            Explore Our{" "}
            <span className="bg-linear-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Tourist Destinations
            </span>
          </motion.h2>

          <motion.p
            variants={animate.itemVariants}
            className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg drop-shadow-sm font-medium bg-slate-950/40 py-1 px-4 rounded-full backdrop-blur-sm border border-white/5"
          >
            Drag cards to browse destinations or click the button below to launch interactive route navigation.
          </motion.p>
        </div>

        {/* Section Grid: Card Stack + Destination Spotlight Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Interactive Spot Details (5 Columns) */}
          <motion.div variants={animate.itemVariants} className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpot.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/20 bg-slate-950/80 p-8 backdrop-blur-xl shadow-2xl"
              >
                <div className="inline-block rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-semibold text-emerald-300 mb-3">
                  {activeSpot.category}
                </div>

                <h3 className="text-3xl font-bold text-white tracking-tight">
                  {activeSpot.name}
                </h3>

                <p className="mt-2 text-sm font-medium text-emerald-400/90 italic">
                  "{activeSpot.tagline}"
                </p>

                <p className="mt-4 text-sm text-slate-200 leading-relaxed">
                  {activeSpot.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 border-t border-slate-800/80 pt-6">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span>{activeSpot.distance}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-teal-400" />
                    <span>{activeSpot.travelTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMapSpot(activeSpot)}
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-950/60 transition-all hover:scale-[1.02] hover:from-emerald-400 hover:to-teal-500 active:scale-95"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Explore Location & Route</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Modern Draggable Card Swap Stack (7 Columns) */}
          <motion.div
            variants={animate.itemVariants}
            className="lg:col-span-7 relative h-120 w-full flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative h-full w-full max-w-lg flex items-center justify-center">
              {spots.map((spot, index) => {
                const isFront = index === 0;

                // Stack positions offset formula
                const yOffset = index * -24;
                const scale = 1 - index * 0.06;
                const zIndex = spots.length - index;

                return (
                  <motion.div
                    key={spot.id}
                    style={isFront ? { x: dragX, rotate, opacity } : {}}
                    drag={isFront ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > 120) {
                        swapCard();
                      }
                    }}
                    animate={{
                      y: yOffset,
                      scale: scale,
                      zIndex: zIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                    }}
                    className={`absolute inset-0 h-105 w-full overflow-hidden rounded-3xl border border-white/20 bg-slate-900 shadow-2xl cursor-grab active:cursor-grabbing select-none transition-shadow ${
                      isFront ? "hover:shadow-emerald-900/60 hover:border-emerald-400/60" : ""
                    }`}
                  >
                    {/* Spot Image */}
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="h-full w-full object-cover pointer-events-none"
                    />

                    {/* Card Content Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end pointer-events-none">
                      <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                        {spot.category}
                      </span>
                      <h4 className="text-2xl font-black text-white mt-1 drop-shadow-sm">
                        {spot.name}
                      </h4>
                      <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                        {spot.tagline}
                      </p>

                      {isFront && (
                        <div className="mt-4 flex items-center justify-between text-xs text-emerald-400 font-semibold border-t border-slate-700/80 pt-3">
                          <span className="flex items-center gap-1">
                            <Sparkles className="h-3.5 w-3.5" /> Drag left/right to swap
                          </span>
                          <span className="flex items-center gap-1 text-slate-300">
                            {spots.length} Destinations <ChevronRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ================= 3. MAP & ROUTE DIRECTIONS MODAL ================= */}
      <AnimatePresence>
        {selectedMapSpot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMapSpot(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 grid grid-cols-1 lg:grid-cols-12"
            >
              <button
                onClick={() => setSelectedMapSpot(null)}
                className="absolute top-4 right-4 z-20 rounded-full bg-slate-950/80 p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="lg:col-span-7 relative min-h-87.5 lg:min-h-125 bg-slate-950 flex flex-col">
                <iframe
                  title={`Map showing route to ${selectedMapSpot.name}`}
                  width="100%"
                  height="100%"
                  className="min-h-87.5 lg:min-h-125 w-full border-0 filter invert-90 hue-rotate-180 contrast-110"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${selectedMapSpot.coordinates.lat},${selectedMapSpot.coordinates.lng}&z=14&output=embed`}
                />

                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3.5 py-2 text-xs font-semibold text-emerald-400 shadow-lg">
                  <Car className="h-4 w-4 text-emerald-400" />
                  <span>Origin: Lupi Municipal Hall</span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800">
                <div>
                  <div className="inline-block rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400 mb-2">
                    {selectedMapSpot.category}
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {selectedMapSpot.name}
                  </h3>

                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500">Distance</span>
                      <span className="font-semibold text-slate-200">{selectedMapSpot.distance}</span>
                    </div>
                    <div className="h-6 w-px bg-slate-800" />
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-500">Est. Time</span>
                      <span className="font-semibold text-slate-200">{selectedMapSpot.travelTime}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
                      <Navigation className="h-3.5 w-3.5" /> Directions from Town Center
                    </h4>

                    <ol className="space-y-3">
                      {selectedMapSpot.routeInstructions.map((step, idx) => (
                        <li key={idx} className="flex gap-3 text-xs text-slate-300">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMapSpot.coordinates.lat},${selectedMapSpot.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-3 text-xs font-bold text-white transition-colors border border-slate-700"
                  >
                    <span>Open in Google Maps App</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </motion.section>
  );
}