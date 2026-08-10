import HeroImage from "@/assets/logos/LGU-NEW-crop.png";
import Pattern from "@/assets/pattern/intersecting-waves-split-white.svg";
import {
  ArrowRight,
  Building2,
  Landmark,
  MapPin,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import useInOutAnimation from "@/hooks/useInOutAnimation";
import { useEffect, useRef, useState } from "react";

function StatValue({ value }: { value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value.replace(/\d/g, "0"));

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr.replace(/,/g, ""), 10);
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <p
      ref={ref}
      className="text-lg font-bold text-slate-800 leading-none tabular-nums"
    >
      {display}
    </p>
  );
}

export default function Home2() {
  const animate = useInOutAnimation();
  const stats = [
    {
      icon: Users,
      label: "Community Members",
      value: "35,000+",
      link: "/coming-soon",
    },
    {
      icon: Landmark,
      label: "Public Services Guide",
      value: "24/7 Digital",
      link: "/coming-soon",
    },
    {
      icon: MapPin,
      label: "Tourist Spots",
      value: "12+ Places",
      link: "/coming-soon",
    },
  ];

  const heritage = [
    { icon: Waves, label: "Est. 1726" },
    { icon: Building2, label: "38 Barangays" },
    { icon: Waves, label: "Coastal Municipality, Camarines Sur" },
  ];

  // Motion variants for smooth staggered load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="w-full min-h-screen relative bg-slate-50 flex flex-col justify-between items-center overflow-hidden py-12 md:py-16">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Floating Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content Area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-20 flex justify-center items-center flex-col text-center px-4 max-w-5xl mx-auto my-auto"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/5 border border-slate-900/10 rounded-full backdrop-blur-md mb-6 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700">
              Official Website — Municipality of Lupi
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-800 mb-2"
        >
          Progresibong Lupi
        </motion.h1>

        {/* Sub-heading with Gradient */}
        <motion.h2
          variants={itemVariants}
          className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 text-3xl sm:text-5xl md:text-6xl playfair bg-clip-text text-transparent font-medium mb-6"
        >
          Innovation & Services
        </motion.h2>

        {/* Description Paragraph */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-center text-slate-600 text-base sm:text-lg leading-relaxed mb-6"
        >
          Discover municipal updates, public services, tourism spots, and
          upcoming events — all in one unified digital hub for the people of
          Lupi.
        </motion.p>

        {/* Heritage Strip */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-widest text-emerald-800/80 bg-emerald-500/10 border border-emerald-500/20 px-5 py-2.5 rounded-full backdrop-blur-md"
        >
          {heritage.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-emerald-600" />
                <span>{item.label}</span>
                {idx < heritage.length - 1 && (
                  <span className="ml-2 hidden sm:inline-block h-1 w-1 rounded-full bg-emerald-600/40" />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            to="/services"
            className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#announcements"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-xs backdrop-blur-md hover:bg-slate-100 hover:border-slate-400 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Latest News
          </a>
        </motion.div>

        {/* Floating Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={stat.link}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-md backdrop-blur-xl transition-all hover:border-emerald-500/50 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <StatValue value={stat.value} />
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Hero Image Section Footer */}
      <div
        className="h-[45vh] sm:h-[42vh] absolute bottom-0 w-full bg-cover bg-top  pointer-events-none z-10"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        {/* Top Vignette Gradient for smooth transition */}
        <div className="absolute inset-0 bg-linear-to-t from-transparent via-slate-50/40 to-slate-50" />

        {/* Split Pattern Layer */}
        <div className="absolute -top-10 inset-x-0">
          <img src={Pattern} alt="" className="w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
