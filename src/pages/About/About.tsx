import useInOutAnimation from "@/hooks/useInOutAnimation";
import Pattern from "@/assets/pattern/pattern1.svg";
import { motion } from "framer-motion";
import { 
  Compass, 
} from "lucide-react";
import Card from "./component/Card";
import HeroCard from "./component/HeroCard";

export default function About() {
 const animate = useInOutAnimation();
 
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-950 text-slate-800 py-24 lg:pt-35  px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden font-sans"
    >
      {/* ================= 1. LIGHT BACKGROUND & PATTERN DESIGN ================= */}
      {/* Subtle Grid Pattern */}
 <div className="absolute top-0 w-screen ">
            <img src={Pattern} alt="Pattern" className="w-full  object-cover " />
        </div>
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


      <motion.div variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.25 }} className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center">
        {/* ================= 2. SECTION HEADER ================= */}
        <div
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md mb-3">
            <Compass className="h-4 w-4 text-emerald-600 animate-spin-slow" />
            <span>Discover Our Identity</span>
          </div>

          <motion.h2 variants={animate.itemVariants} className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-100">
            About the{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Municipality of Lupi
            </span>
          </motion.h2>

          <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-200 font-medium">
            Rooted in rich heritage, driven by unified vision, and committed to sustainable progress for every Lupiniang.
          </p>
        </div>

        {/* ================= 3. HISTORY SECTION (HERO CARD) ================= */}
       <HeroCard variants={animate.itemVariants} title="A Journey Through Time" totalBarangay="38" district="1st" rate="100%"/>

        {/* ================= 4. MISSION & VISION CARDS ================= */}
        <motion.div
          variants={animate.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          {/* Mission Card */}
            <Card name="Our Mission" title="Serving with Purpose" description="To uplift the quality of life of all Lupiniangs through transparent and inclusive governance, sustainable agricultural development, robust infrastructure, accessible healthcare, quality education, and resilient environmental stewardship." quote="Dedicated to Citizen Welfare & Progress" variants={animate.itemVariants} />

          {/* Vision Card */}
            <Card name="Our Vision" title="A Thriving Lupi" description="To become a model municipality in Camarines Sur, recognized for its sustainable development, empowered communities, and harmonious balance between progress and preservation of its rich cultural and natural heritage." quote="Inspiring Growth & Sustainability" variants={animate.itemVariants} />
        </motion.div>
      </motion.div>
    </section>
  );
}