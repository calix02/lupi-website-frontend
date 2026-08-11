import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Landmark,
  Users,
  MapPin,
  Waves,
  Building2,
  History,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Pattern from "@/assets/pattern/pattern7.svg";
import HeroVideo from "@/assets/LGU-Video.mp4";
import useInOutAnimation from "@/hooks/useInOutAnimation";

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
      className="text-lg font-bold text-slate-100 leading-none tabular-nums"
    >
      {display}
    </p>
  );
}

export default function Home() {
  const animate = useInOutAnimation();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

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
    { icon: History, label: "Est. 1726" },
    { icon: Building2, label: "38 Barangays" },
    { icon: Waves, label: "Coastal Municipality, Camarines Sur" },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-svh w-full flex-col items-center justify-between overflow-hidden pt-24 pb-10 sm:pb-16 lg:pt-32"
    >
      <style>{`
        @keyframes officepulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes heritage-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .heritage-item { animation: heritage-in 0.6s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .hero-glow, .heritage-item { animation: none !important; }
        }
      `}</style>

      {/* Bottom Decorative Pattern Divider */}
      <div className="absolute bottom-0 inset-x-0 z-10 pointer-events-none">
        <img
          src={Pattern}
          alt=""
          className="w-full object-cover -scale-y-100"
        />
      </div>

      {/* Video Background with scroll parallax */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
        >
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/55 to-slate-950/35" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
      </motion.div>

      {/* Ambient glow */}
      <div className="hero-glow pointer-events-none absolute top-1/2 left-1/2 z-0 h-72 w-72 sm:h-120 sm:w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px] sm:blur-[120px] motion-safe:animate-[officepulse_6s_ease-in-out_infinite]" />

      {/* Main Hero Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto my-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white"
      >
        <motion.div
          variants={animate.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={animate.itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-4 py-1.5 text-xs sm:text-sm font-medium text-emerald-300 backdrop-blur-md transition-colors hover:border-emerald-500/60 shadow-lg shadow-emerald-950/50"
          >
            <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Official Website · Municipality of Lupi</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={animate.itemVariants}
            className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-white"
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
            Discover municipal updates, public services, tourism spots, and
            upcoming events — all in one unified digital hub for the people of
            Lupi.
          </motion.p>

          {/* Heritage strip — signature element */}
          <motion.div
            variants={animate.itemVariants}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-emerald-200/70"
          >
            {heritage.map((item, idx) => {
              const Icon = item.icon;
              return (
                <span
                  key={idx}
                  className="heritage-item flex items-center gap-1.5"
                  style={{ animationDelay: `${idx * 0.15 + 0.3}s` }}
                >
                  <Icon className="h-3.5 w-3.5 text-emerald-400" />
                  {item.label}
                  {idx < heritage.length - 1 && (
                    <span className="ml-4 hidden h-1 w-1 rounded-full bg-emerald-500/40 sm:inline-block" />
                  )}
                </span>
              );
            })}
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            variants={animate.itemVariants}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="services"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

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

          {/* Floating Stats Cards */}
          <motion.div
            variants={animate.itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.25 }}
            className="mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
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
                    <StatValue value={stat.value} />
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
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
