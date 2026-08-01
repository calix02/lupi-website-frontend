import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Landmark, Users, MapPin } from "lucide-react";
import HeroImage from "@/assets/logos/LGU-NEW.png";
import { Link } from "react-router-dom";
export default function Home() {
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.96 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] as const 
      },
    },
  };

  const stats = [
    { icon: Users, label: "Community Members", value: "35,000+", link: "/coming-soon" },
    { icon: Landmark, label: "Public Services Guide", value: "24/7 Digital", link: "/coming-soon" },
    { icon: MapPin, label: "Tourist Spots", value: "12+ Places", link: "/coming-soon" },
  ];

 
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-24 pb-16"
    >
     
 
     
      {/* 1. Infinite Ken Burns Zooming Background */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroImage})` }}
      />

      {/* Dark Gradient Overlay for High Text Readability */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-slate-950/60 via-slate-950/65 to-slate-950/60 backdrop-blur-[1px]" />

      {/* Subtle Glowing Ambient Lights */}
      <div className="glowing-bg absolute top-1/3 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full  blur-3xl pointer-events-none" />

      {/* 2. Main Hero Content with Scroll Entrance & Exit */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white my-auto">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }} // Entrance/Exit triggers when 30% of the section is in view
          className="flex flex-col items-center"
        >
          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="color1-text color1-border glass1-bg mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-md hover:border-emerald-500/50 transition-colors shadow-inner"
          >
            <Sparkles className="color2-text h-4 w-4 animate-pulse" />
            <span>Welcome to the Official Lupi Portal</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl leading-[1.15]"
          >
            Empowering Our Community through{" "}
            <span className="gradient1-text">
              Innovation & Service
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl font-normal leading-relaxed"
          >
            Discover municipal updates, public services, tourism spots, and upcoming events—all in one unified digital hub.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center sm:w-auto"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center justify-center gap-2 rounded-full gradient1-bg px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#announcements"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40 transition-all"
            >
              Latest News
            </motion.a>
          </motion.div>

          {/* 3. Floating Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Link
                to={stat.link}
                  key={idx}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md text-left transition-colors hover:border-emerald-500/30 hover:bg-white/10"
                >
                  <div className="color2-text glass1-bg rounded-xl  p-2.5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.3 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 pt-8"
      >
        <a
          href="#announcements"
          className="flex flex-col items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 color2-text" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}