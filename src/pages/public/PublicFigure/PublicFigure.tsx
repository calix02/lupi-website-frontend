import { motion } from "framer-motion";
import { Users, Award, ChevronRight, Sparkles } from "lucide-react";
import EyeTicker from "@/components/Gallery/EyeTicker";

export default function PublicFigure() {
  return (
    <section className="relative w-full min-h-screen bg-slate-50 text-white flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-12">
      {/* 1. Underlying Ticker Layout (Unchanged & Preserved) */}
      <div className="absolute inset-0 w-full h-full  pointer-events-auto">
        <EyeTicker />
      </div>

      {/* 3. Text & Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 pointer-events-none">
        {/* LGU Heritage Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md shadow-lg pointer-events-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Leadership & Community</span>
        </motion.div>

        {/* Main Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-700 leading-tight drop-shadow-2xl"
        >
          The Heart & Faces of{" "}
          <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent underline decoration-amber-400/80 decoration-4 underline-offset-8">
            Lupi
          </span>
        </motion.h2>

        {/* Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-lg text-slate-900 leading-relaxed font-normal max-w-2xl mx-auto drop-shadow-md"
        >
          Behind every policy, milestone, and community achievement are the
          dedicated public servants and resilient citizens working hand-in-hand
          for a progressive Municipality of Lupi.
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 pointer-events-auto"
        >
          <a
            href="/officials"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Award className="w-4 h-4 text-slate-950" />
            <span>Meet Our Elected Officials</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href="/employees"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700/80 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>LGU Departments & Personnel</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
