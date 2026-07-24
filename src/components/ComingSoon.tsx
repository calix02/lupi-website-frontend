import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bell, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; 

export default function ComingSoon() {
  // State for the countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date 30 days from now
    const targetDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  // Helper for rendering timer blocks with animated numbers
  const TimerBlock = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-200/70 w-24 sm:w-32">
      <div className="relative h-12 sm:h-16 w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute text-4xl sm:text-5xl font-extrabold bg-linear-to-br from-emerald-600 to-teal-500 bg-clip-text text-transparent"
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50 px-6 py-24">
         <Link to="/" className="absolute top-17 left-8 flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      {/* 1. Animated Background Patterns */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0edb91 0.75px, transparent 0.75px)`,
          backgroundSize: "24px 24px",
        }}
      />
      
      {/* Floating Ambient Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-120 h-120 bg-teal-200/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* 2. Main Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        className="relative z-10 mx-auto max-w-4xl w-full flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold tracking-wide mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Something Exciting is Brewing</span>
        </motion.div>

        {/* Headlines */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6"
        >
          We're Launching <br className="hidden sm:block" />
          <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Very Soon
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg text-slate-600 font-medium mb-12"
        >
          Our brand new digital portal is currently under construction. We are working hard to bring you a modern, seamless experience.
        </motion.p>

        {/* 3. Countdown Timer */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16"
        >
          <TimerBlock label="Days" value={timeLeft.days} />
          <TimerBlock label="Hours" value={timeLeft.hours} />
          <TimerBlock label="Minutes" value={timeLeft.minutes} />
          <TimerBlock label="Seconds" value={timeLeft.seconds} />
        </motion.div>

        {/* 4. Notify Me Form */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 justify-center mb-2">
            <Bell className="w-4 h-4 text-emerald-500" />
            <span>Get notified when we go live!</span>
          </div>
          
          <form className="relative flex items-center w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute left-4 text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full py-4 pl-12 pr-36 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-700"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 group flex items-center gap-2 px-6 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-emerald-600 transition-colors"
            >
              <span>Notify Me</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
         
        </motion.div>
      </motion.div>
    </section>
  );
}