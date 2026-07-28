import useInOutAnimation from "@/hooks/useInOutAnimation";
import { motion } from "framer-motion";
import { 
  History, 
  Target, 
  Eye, 
  Compass, 
  Sparkles, 
  Landmark, 
  TreePine, 
  Users 
} from "lucide-react";

export default function About() {
 const animate = useInOutAnimation();
 
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-slate-50 text-slate-800 py-24 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden font-sans"
    >
      {/* ================= 1. LIGHT BACKGROUND & PATTERN DESIGN ================= */}
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      {/* Animated Glowing Light Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 h-96 w-96 rounded-full bg-emerald-200/50 blur-[130px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 right-1/4 h-100 w-100 rounded-full bg-teal-200/40 blur-[140px] pointer-events-none z-0"
      />

      {/* Decorative Frame Lines & Corners */}
      <div className="absolute inset-4 sm:inset-8 border border-slate-200 pointer-events-none z-0 rounded-3xl" />
      <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-emerald-600 z-10" />
      <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-emerald-600 z-10" />
      <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-emerald-600 z-10" />
      <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-emerald-600 z-10" />

      <motion.div variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.25 }} className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center">
        {/* ================= 2. SECTION HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md mb-3">
            <Compass className="h-4 w-4 text-emerald-600 animate-spin-slow" />
            <span>Discover Our Identity</span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900">
            About the{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Municipality of Lupi
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-600 font-medium">
            Rooted in rich heritage, driven by unified vision, and committed to sustainable progress for every Lupiniang.
          </p>
        </motion.div>

        {/* ================= 3. HISTORY SECTION (HERO CARD) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative w-full mb-16 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl shadow-slate-200/60"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
                <History className="h-4 w-4 text-emerald-600" />
                <span>Our Roots & Heritage</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                A Journey Through Time
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Nestled in the heart of Camarines Sur, the Municipality of Lupi carries a history shaped by resilience, community spirit, and rich natural resources. Derived from native roots reflecting its lush landscapes and flowing waters, Lupi has grown from a quiet settlement into a vibrant agricultural and eco-cultural hub.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Over decades of growth, the town has embraced modernization while steadfastly preserving its culture, environmental heritage, and the warm hospitality of its people.
              </p>

              {/* Key Quick Facts Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 mt-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-emerald-600">38</span>
                  <span className="text-xs font-medium text-slate-500">Barangays</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-teal-600">1st</span>
                  <span className="text-xs font-medium text-slate-500">District CamSur</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-cyan-600">100%</span>
                  <span className="text-xs font-medium text-slate-500">Dedicated Service</span>
                </div>
              </div>
            </div>

            {/* Right Visual Graphic */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-emerald-500/20 bg-linear-to-br from-emerald-900 to-slate-900 p-6 flex flex-col justify-between text-white shadow-xl group">
                {/* Visual Overlay Design */}
                <div className="absolute inset-0 `bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 text-emerald-400/20 group-hover:text-emerald-400/30 transition-colors">
                  <Landmark className="h-32 w-32 -mr-6 -mt-6" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Historic Highlight</span>
                  <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="flex gap-2">
                    <TreePine className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200">
                      Rich in agricultural lands, pristine rivers, and sprawling forests driving local trade and tourism.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Users className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200">
                      Empowered by an active, resilient citizenry dedicated to progress and community building.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-300 font-mono">
                  <span>MUNICIPALITY OF LUPI</span>
                  <span>CAMARINES SUR</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= 4. MISSION & VISION CARDS ================= */}
        <motion.div
          variants={animate.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          {/* Mission Card */}
          <motion.div
            variants={animate.itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="relative rounded-3xl border border-slate-200 bg-white/80 p-8 sm:p-10 backdrop-blur-xl shadow-xl shadow-slate-200/50 flex flex-col justify-between overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 to-teal-500" />
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-100/50 blur-2xl group-hover:bg-emerald-200/50 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-14 w-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm group-hover:scale-110 transition-transform">
                  <Target className="h-7 w-7" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Our Mission
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                Serving with Purpose
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                To uplift the quality of life of all Lupiniangs through transparent and inclusive governance, sustainable agricultural development, robust infrastructure, accessible healthcare, quality education, and resilient environmental stewardship.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Dedicated to Citizen Welfare & Progress</span>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={animate.itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="relative rounded-3xl border border-slate-200 bg-white/80 p-8 sm:p-10 backdrop-blur-xl shadow-xl shadow-slate-200/50 flex flex-col justify-between overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-teal-500 to-cyan-500" />
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-100/50 blur-2xl group-hover:bg-cyan-200/50 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-14 w-14 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 shadow-sm group-hover:scale-110 transition-transform">
                  <Eye className="h-7 w-7" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                  Our Vision
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                Inspiring Tomorrow
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Lupi envisioning itself as a progressive, self-sustaining, and disaster-resilient municipality, powered by an empowered citizenry, vibrant eco-tourism, robust economy, and leadership that models integrity and innovation.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-teal-700">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
              <span>Building a Sustainable Future Together</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}