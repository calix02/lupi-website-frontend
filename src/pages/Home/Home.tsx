import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import HeroImage from "@/assets/logos/LGU.jpg";

export default function Home() {
  // Animation variants for smooth staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Slow Zoom Animation & Gradient Overlay */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        {/* Dark gradient overlay for visual clarity */}
        <div className="absolute inset-0 bg-lineart-to-t from-slate-950/90 via-slate-900/60 to-slate-900/40 backdrop-blur-[2px]" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md hover:border-white/40 transition-colors"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Welcome to the Official Lupi Website</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-tight"
          >
            Empowering Our Community through{" "}
            <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Innovation & Service
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl font-normal leading-relaxed"
          >
            Discover municipal updates, public services, tourism spots, and upcoming events—all in one modern digital hub.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center sm:w-auto"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#announcements"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:border-white/50 transition-all"
            >
              Latest News
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#announcements"
          className="flex flex-col items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-emerald-400" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}