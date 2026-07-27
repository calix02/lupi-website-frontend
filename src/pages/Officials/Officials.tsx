import { motion } from "framer-motion";
import { Building2,  Sparkles, } from "lucide-react";
import Mayor from "@/assets/Mayor.jpg";
import CircularGallery from "./component/CircularGallery";
import Card from "./component/Card";
import useInOutAnimation from "@/hooks/useInOutAnimation";

export default function Officials() {
    const animate = useInOutAnimation();
  // Councilors with full name + official title
  const councilorItems = [
    {
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Juan Dela Cruz",
    },
    {
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Elena G. Torres",
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Ricardo P. Dalisay ",
    },
    {
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Sofia M. Aquino",
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Mark Anthony Ramos",
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Angela K. Mendoza",
    },
  ];

  return (
    <section
      id="officials"
      className="relative min-h-screen w-full bg-slate-50 text-slate-800 py-24 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden font-sans"
    >
      {/* ================= 1. LIGHT BACKGROUND & PATTERN DESIGN ================= */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-96 w-175 rounded-full bg-emerald-200/40 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-teal-200/30 blur-[100px] pointer-events-none z-0" />

      {/* Decorative Frame Lines */}
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
          <motion.div variants={animate.itemVariants}
           
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md mb-3"
          >
            <Building2 className="h-4 w-4 text-emerald-600" />
            <span>Municipal Administration</span>
          </motion.div>

          <motion.h2 variants={animate.itemVariants} className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900">
            Meet Our{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Local Leadership
            </span>
          </motion.h2>

          <motion.p variants={animate.itemVariants} className="mt-3 max-w-xl text-base text-slate-600 font-medium">
            Dedicated leaders serving with integrity, commitment, and vision.
          </motion.p>
        </motion.div>

        {/* ================= 3. MAYOR HIGHLIGHT HERO CARD ================= */}
        <Card variants={animate.itemVariants} image={Mayor} name="Hon. Christopher Jacinto" position="Municipal Mayor" quote="Committed to transparent governance, rapid progress, and dedicated public service for all residents." email="mayor@lupi.gov.ph" phone="+63 (054) 123-4567" />
       

        {/* ================= 4. VICE MAYOR HIGHLIGHT CARD ================= */}
        <Card variants={animate.itemVariants} image={"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"} name="Hon. Juan Dela Cruz" position="Municipal Vice Mayor" quote="Committed to transparent governance, rapid progress, and dedicated public service for all residents." email="vicemayor@lupi.gov.ph" phone="+63 (054) 123-4568" />
       

        {/* ================= 5. COUNCILORS SECTION & CIRCULAR GALLERY ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center"
        >
          <motion.div variants={animate.itemVariants} className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-emerald-600 animate-pulse" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center">
              Sangguniang Bayan Councilors
            </h3>
          </motion.div>
          <motion.p variants={animate.itemVariants} className="text-xs sm:text-sm font-medium text-slate-500 mb-8 text-center">
            Drag or scroll horizontally to browse council members
          </motion.p>

          {/* Gallery Wrapper - Exact original placement */}
          <motion.div variants={animate.itemVariants} className="w-full h-125 relative rounded-3xl border border-slate-200 bg-white/60 backdrop-blur-md shadow-xl overflow-hidden p-2">
            <CircularGallery
              items={councilorItems}
              bend={1.5}
              textColor="#0f172a"
              borderRadius={0.06}
              scrollEase={0.05}
              scrollSpeed={2}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}