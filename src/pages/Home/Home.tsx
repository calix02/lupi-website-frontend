import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Landmark, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Pattern from "@/assets/pattern/pattern2.svg";
import HeroVideo from "@/assets/LGU-Video.mp4"; 
import useInOutAnimation from "@/hooks/useInOutAnimation";

export default function Home() {
  const animate = useInOutAnimation();

  const stats = [
    { icon: Users, label: "Community Members", value: "35,000+", link: "/coming-soon" },
    { icon: Landmark, label: "Public Services Guide", value: "24/7 Digital", link: "/coming-soon" },
    { icon: MapPin, label: "Tourist Spots", value: "12+ Places", link: "/coming-soon" },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden pt-24 pb-12 sm:pb-16 lg:pt-32"
    >
      {/* Bottom Decorative Pattern Divider */}
      <div className="absolute bottom-0 inset-x-0 z-10 pointer-events-none">
        <img src={Pattern} alt="" className="w-full object-cover -scale-y-100 opacity-90" />
      </div>
      {/* 1. Video Background Element */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center scale-105"
        >
          {/* Replace src with your local video import or video URL */}
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Multi-Layered Dark Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-slate-950/40 to-slate-950/20" />
      </div>

      {/* Subtle Glowing Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* 2. Main Hero Content */}
      <div className="relative z-10 mx-auto my-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          variants={animate.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
          className="flex flex-col items-center"
        >
          {/* Animated Badge */}
          <motion.div
            variants={animate.itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-4 py-1.5 text-xs sm:text-sm font-medium text-emerald-300 backdrop-blur-md transition-colors hover:border-emerald-500/60 shadow-lg shadow-emerald-950/50"
          >
            <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Welcome to the Official Lupi Portal</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={animate.itemVariants}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-white"
          >
            Progresibong Lupi{" "}
            <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Innovation & Service
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={animate.itemVariants}
            className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-lg md:text-xl font-normal text-slate-300 leading-relaxed"
          >
            Discover municipal updates, public services, tourism spots, and upcoming events—all in one unified digital hub.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
           
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <motion.a
            variants={animate.itemVariants}
              href="#services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              variants={animate.itemVariants}
              href="#announcements"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40 transition-all"
            >
              Latest News
            </motion.a>
          </motion.div>

          {/* 3. Floating Stats Cards */}
          <motion.div
            variants={animate.itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.25 }}
            className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Link
                  to={stat.link}
                  key={idx}
                  className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-slate-100 leading-none">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.3 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 pt-6"
      >
        <a
          href="#announcements"
          className="flex flex-col items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-emerald-400" />
          </motion.div>
        </a>
      </motion.div>

      
    </section>
  );
}