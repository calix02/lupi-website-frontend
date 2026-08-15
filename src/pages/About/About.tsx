import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Calendar,
  ChevronRight,
  HeartHandshake,
  Sun,
  Globe,
  ArrowRight,
  CheckCircle2,
  Target,
  Eye,
} from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  // Image Gallery for Hero Arch Grid (Matching the reference layout)
  const heroGallery = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      alt: "Lupi Local Leader",
      pos: "top-[10%] left-[2%] lg:left-[4%] w-24 h-32 sm:w-32 sm:h-40 md:w-36 md:h-48 -rotate-6",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      alt: "Lupi Nature",
      pos: "top-[4%] left-[18%] lg:left-[20%] w-28 h-36 sm:w-36 sm:h-44 md:w-40 md:h-52 rotate-2",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80",
      alt: "Cultural Festival",
      pos: "top-[2%] left-[40%] md:left-[42%] -translate-x-1/2 w-32 h-40 sm:w-40 sm:h-48 md:w-44 md:h-56 -rotate-2",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
      alt: "Town Celebration",
      pos: "top-[4%] right-[18%] lg:right-[20%] w-28 h-36 sm:w-36 sm:h-44 md:w-40 md:h-52 rotate-3",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
      alt: "Community Gathering",
      pos: "top-[12%] right-[2%] lg:right-[4%] w-24 h-32 sm:w-32 sm:h-40 md:w-36 md:h-48 rotate-6",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
      alt: "Agricultural Yield",
      pos: "bottom-[8%] left-[8%] lg:left-[12%] w-24 h-32 sm:w-32 sm:h-40 md:w-36 md:h-44 rotate-3",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80",
      alt: "Rainforest Canopy",
      pos: "bottom-[6%] right-[8%] lg:right-[12%] w-24 h-32 sm:w-32 sm:h-40 md:w-36 md:h-44 -rotate-3",
    },
  ];

  // Festival Data with Visuals
  const festivals = [
    {
      id: "san-pedro",
      title: "San Pedro Bautista Patronal Fiesta",
      date: "October 17",
      category: "Religious & Cultural",
      tag: "Grand Feast Day",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
      description:
        "Commemorating the founding of Lupi in 1726 under Saint Peter Baptist with street dancing, colorful river processions, and grand parish traditions.",
      highlights: [
        "Parish Procession",
        "Street Dancing",
        "Civic Parade",
        "Cultural Night",
      ],
    },
    {
      id: "pagdarao",
      title: "Pagdarao Pineapple & Agri-Harvest Festival",
      date: "May / Annual Harvest",
      category: "Agricultural",
      tag: "Harvest Thanksgiving",
      image:
        "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1000&q=80",
      description:
        "Honoring Lupi's fertile lands, rich copra yields, and sweet pineapple harvests through agricultural trade fairs and folk dance performances.",
      highlights: [
        "Pineapple Agri-Fair",
        "Copra Trade Expo",
        "Float Competition",
        "Folk Dances",
      ],
    },
    {
      id: "bicol-park",
      title: "Bicol National Park Eco-Heritage Days",
      date: "Summer Eco-Month",
      category: "Eco-Tourism",
      tag: "Nature & Adventure",
      image:
        "https://images.unsplash.com/photo-1511497584788-876761c11930?auto=format&fit=crop&w=1000&q=80",
      description:
        "Celebrating Lupi's role as the guardian gateway to Bicol National Park with canopy walks, tree planting drives, and river regattas.",
      highlights: [
        "Canopy Trail Walks",
        "River Regatta",
        "Eco-Art Contest",
        "Biodiversity Forum",
      ],
    },
    {
      id: "flores",
      title: "Flores de Mayo & Santacruzan",
      date: "Whole Month of May",
      category: "Tradition",
      tag: "Heritage Procession",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      description:
        "A cherished Bicolano devotion observed across all 38 barangays with floral offerings, evening serenades, and traditional pageantry.",
      highlights: [
        "Arch Pageantry",
        "Floral Offering",
        "Night Devotionals",
        "Barangay Serenades",
      ],
    },
  ];

  // Timeline Milestones
  const timelineEvents = [
    {
      year: "1701",
      title: "Franciscan Mission Founded",
      description:
        "Spanish Franciscan missionary Fr. Juan de la Hoz established early Christian settlements along the upper Bicol basin.",
    },
    {
      year: "1726",
      title: "Official Charter as Pueblo",
      description:
        "Decreed an independent municipality under Saint Peter Baptist, establishing Lupi's historic civic foundation.",
    },
    {
      year: "1934",
      title: "Bicol National Park Sanctuary",
      description:
        "Establishment of the protected national park, positioning Lupi as a steward of prime rainforest watersheds.",
    },
    {
      year: "Present",
      title: "Thriving Agri-Eco Hub",
      description:
        "Continuously progressing across 38 barangays as a vibrant agricultural center and eco-tourism haven.",
    },
  ];

  // FAQs
  const faqs = [
    {
      q: "Where is Lupi, Camarines Sur located?",
      a: "Lupi is situated in the 1st District of Camarines Sur, approximately 63 kilometers from the provincial capital town of Pili and 333 kilometers south of Manila.",
    },
    {
      q: "What is Lupi known for?",
      a: "Lupi is known for its protected rainforests in the Bicol National Park, agricultural yields in copra and sweet pineapple, and rich Franciscan heritage.",
    },
    {
      q: "How many barangays comprise the municipality?",
      a: "Lupi is politically subdivided into 38 barangays, centered around Poblacion as its seat of local government.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden selection:bg-emerald-200 selection:text-emerald-900">
      {/* Background Vertical Guidelines (Direct reference to attached design) */}
      <div className="absolute inset-0 pointer-events-none flex justify-between max-w-7xl mx-auto px-6 opacity-40 z-0">
        <div className="w-px h-full bg-linear-to-b from-slate-200 via-slate-300 to-transparent" />
        <div className="w-px h-full bg-linear-to-b from-slate-200 via-slate-300 to-transparent" />
        <div className="w-px h-full bg-linear-to-b from-slate-200 via-slate-300 to-transparent" />
        <div className="w-px h-full bg-linear-to-b from-slate-200 via-slate-300 to-transparent" />
        <div className="w-px h-full bg-linear-to-b from-slate-200 via-slate-300 to-transparent" />
      </div>

      {/* Glowing Soft Background Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-175 bg-linear-to-tr from-emerald-200/40 via-teal-100/50 to-cyan-100/30 rounded-full blur-[140px] pointer-events-none z-0" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-36">
        {/* ================= 1. FRONT PAGE HERO (EXACT REFERENCE DESIGN MATCH) ================= */}
        <section className="relative min-h-170 sm:min-h-187.5 lg:min-h-205 flex flex-col items-center justify-center pt-16 sm:pt-24 pb-12">
          {/* Floating Image Arch (Visible on md+ screens) */}
          <div className="absolute inset-0 hidden md:block pointer-events-none z-10">
            {heroGallery.map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: img.id * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`absolute ${img.pos} pointer-events-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200 transition-shadow hover:shadow-emerald-900/15`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Center Typography & CTA Block */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-20 flex flex-col items-center text-center max-w-3xl px-4 mt-20 sm:mt-28 md:mt-36"
          >
            {/* Top Pill Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md">
                <Compass className="h-4 w-4 text-emerald-600 animate-spin-slow" />
                <span>Municipality of Lupi</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.15]"
            >
              Beloved community{" "}
              <span className="block text-slate-400 font-bold">
                from rich history & heritage
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-slate-600 text-base sm:text-xl max-w-2xl font-normal leading-relaxed"
            >
              Learn why residents, travelers, and partners trust our vision to
              preserve nature while building sustainable growth for all
              Lupiniangs.
            </motion.p>

            {/* Dark CTA Button (Exact styling match to reference image button) */}
            <motion.div variants={fadeInUp} className="mt-8">
              <a
                href="#history"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 text-white font-medium text-sm shadow-xl hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>Read Town History</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Mobile Gallery Grid Fallback */}
          <div className="grid grid-cols-2 gap-3 mt-10 md:hidden w-full px-2 z-20">
            {heroGallery.slice(0, 4).map((img) => (
              <div
                key={img.id}
                className="h-32 rounded-xl overflow-hidden shadow-md border-2 border-white"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ================= 2. QUICK METRICS OVERVIEW (CARD-LESS LINE FLOW) ================= */}
        <section className="border-y border-slate-200 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                1726
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-500 mt-1">
                Year Founded
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                38
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-500 mt-1">
                Barangays
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-600">
                33k+
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-500 mt-1">
                Population
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                63 km
              </div>
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-500 mt-1">
                From Capital Pili
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. MISSION & VISION (CARD-LESS MODERN TYPOGRAPHY) ================= */}
        <section className="relative space-y-12">
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              Governance & Purpose
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Mission Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="pl-6 border-l-2 border-emerald-600 space-y-4"
            >
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm tracking-wide uppercase">
                <Target className="w-5 h-5" />
                <span>Our Mission</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Uplifting Livelihoods & Protecting Heritage
              </h3>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                To serve all 38 barangays through transparent governance,
                sustainable agricultural programs, robust infrastructure, and
                protection of the Bicol National Park watershed.
              </p>
              <ul className="space-y-2 pt-2 text-slate-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Empowering local farmers and coconut agricultural trade
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Preserving eco-tourism sanctuaries and river systems
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Vision Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="pl-6 border-l-2 border-teal-600 space-y-4"
            >
              <div className="flex items-center gap-2 text-teal-700 font-semibold text-sm tracking-wide uppercase">
                <Eye className="w-5 h-5" />
                <span>Our Vision</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                A Thriving Agri-Eco Model Municipality
              </h3>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                To become a premiere model municipality in Camarines Sur
                recognized for empowered communities, ecological preservation,
                and sustainable economic growth.
              </p>
              <ul className="space-y-2 pt-2 text-slate-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>
                    Harmonious blend of modern infrastructure and nature
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>
                    Safe, resilient, and culturally vibrant communities
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ================= 4. HISTORY TIMELINE (CARD-LESS MODERN PATH) ================= */}
        <section id="history" className="scroll-mt-24 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-emerald-700 text-xs font-bold tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Three Centuries of Heritage
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              The Historical Story of Lupi
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Trace the evolution from an 18th-century Franciscan mission to a
              modern agri-eco gateway.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto pt-6">
            {/* Center Timeline Guideline */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-emerald-500 via-teal-400 to-cyan-500 transform sm:-translate-x-1/2" />

            <div className="space-y-12">
              {timelineEvents.map((event, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Node Point */}
                    <div className="absolute left-4 sm:left-1/2 top-1.5 w-5 h-5 rounded-full bg-white border-4 border-emerald-600 shadow-md transform -translate-x-1/2 z-10" />

                    {/* Timeline Content Block */}
                    <div
                      className={`ml-12 sm:ml-0 sm:w-1/2 ${
                        isEven
                          ? "sm:pr-12 text-left sm:text-right"
                          : "sm:pl-12 text-left"
                      } space-y-2`}
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold tracking-wider">
                        {event.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 5. FESTIVALS & CULTURE (CARD-LESS MODERN GRID WITH IMAGES) ================= */}
        <section id="festivals" className="scroll-mt-24 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-teal-700 text-xs font-bold tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Cultural Celebrations
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                Festivals & Traditions
              </h2>
              <p className="text-slate-600 text-base">
                Discover local thanksgiving celebrations, street dancing, and
                religious pageantry.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                "all",
                "Religious & Cultural",
                "Agricultural",
                "Eco-Tourism",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    activeTab === cat
                      ? "bg-slate-950 text-white shadow-md"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat === "all" ? "All Traditions" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Festival Items Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {festivals
              .filter((f) => activeTab === "all" || f.category === activeTab)
              .map((festival, idx) => (
                <motion.div
                  key={festival.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group space-y-5"
                >
                  {/* Festival Image */}
                  <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={festival.image}
                      alt={festival.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-bold shadow-sm">
                        {festival.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-semibold text-white bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{festival.date}</span>
                    </div>
                  </div>

                  {/* Text Details (Seamless) */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                      {festival.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {festival.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {festival.highlights.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                        >
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        {/* ================= 6. TOWN LIFE & GEOGRAPHY ================= */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-teal-700 text-xs font-bold tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Community Pillars
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              Life in Lupi
            </h2>
            <p className="text-slate-600 text-base">
              Key characteristics defining our municipality’s geography,
              commerce, and culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="space-y-3 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                Strategic Bicol Gateway
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connects Maharlika Highway between Sipocot and Ragay, providing
                vital access routes across Camarines Sur.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                Agricultural Abundance
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Extensive coconut groves, copra processing, sweet pineapples,
                and mountain river irrigation.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-700">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                Warm Hospitality
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A tight-knit community anchored by faith, rich Bicolano cuisine,
                and active Bayanihan spirit.
              </p>
            </div>
          </div>
        </section>

        {/* ================= 7. ACCORDION FAQ ================= */}
        <section className="max-w-3xl mx-auto space-y-8 pt-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-950">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Quick information for visitors and residents
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-200 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left py-2 text-lg font-semibold text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-500 transform transition-transform duration-300 ${
                      openFaq === idx ? "rotate-90 text-emerald-700" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2 pb-2">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
