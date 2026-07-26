import { motion } from "framer-motion";
import LupiLogo from "@/assets/logos/lupi_logo.png";
import HeroImage from "@/assets/logos/LGU-NEW.png";

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  return (
    <motion.div
      // Main container smooth exit fade
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-slate-950 font-sans pointer-events-none"
    >
      {/* ================= 1. KEN BURNS HERO BACKGROUND ================= */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1.3],
          opacity: [0.8, 0.9, 0], // Fades out as the zoom hits peak
        }}
        transition={{
          duration: 2.8,
          times: [0, 0.7, 1],
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroImage})` }}
      />

      {/* Dark Ambient Overlay */}
      <motion.div
        animate={{ opacity: [0.8, 0.8, 0] }}
        transition={{ duration: 2.8, times: [0, 0.75, 1], ease: "easeInOut" }}
        className="absolute inset-0 z-10 bg-radial from-slate-950/40 via-slate-950/85 to-slate-950/98 backdrop-blur-[2px]"
      />

      {/* ================= 2. STARLIKE AMBIENT GLOW ================= */}
      {/* Rotating Starburst Light Beams */}
      <motion.div
        animate={{
          rotate: 180,
          scale: [0.8, 1.2, 2.5],
          opacity: [0.2, 0.5, 0],
        }}
        transition={{
          duration: 2.8,
          times: [0, 0.6, 1],
          ease: "easeInOut",
        }}
        className="absolute z-20 h-125 w-125 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(16, 185, 129, 0.4) 30deg, transparent 60deg, rgba(45, 212, 191, 0.4) 120deg, transparent 180deg, rgba(16, 185, 129, 0.4) 210deg, transparent 270deg)",
          borderRadius: "50%",
          filter: "blur(24px)",
        }}
      />

      {/* Core Energy Orb */}
      <motion.div
        animate={{
          scale: [0.8, 1.25, 3],
          opacity: [0.3, 0.8, 0],
        }}
        transition={{
          duration: 2.8,
          times: [0, 0.65, 1],
          ease: "easeInOut",
        }}
        className="absolute z-20 h-64 w-64 rounded-full bg-emerald-500/40 blur-3xl pointer-events-none"
      />

      {/* ================= 3. SEAMLESS ZOOMING LOGO ================= */}
      <div className="relative z-30 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            // Smooth forward-only acceleration curve (No shrink back, no pause)
            scale: [0.3, 1, 1.12, 28],
            opacity: [0, 1, 1, 0],
            filter: [
              "drop-shadow(0 0 0px rgba(16,185,129,0))",
              "drop-shadow(0 0 25px rgba(16,185,129,0.8))",
              "drop-shadow(0 0 40px rgba(45,212,191,0.9))",
              "drop-shadow(0 0 80px rgba(255,255,255,1))",
            ],
          }}
          transition={{
            duration: 2.7,
            // 0 -> 0.25: Gentle enter
            // 0.25 -> 0.65: Star pulse hold
            // 0.65 -> 1.0: Hyper-speed zoom through screen without slowing down
            times: [0, 0.25, 0.65, 1],
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onAnimationComplete={onFinish}
          className="relative flex items-center justify-center will-change-transform"
        >
          {/* Logo Image */}
          <img
            src={LupiLogo}
            alt="Lupi Official Logo"
            className="h-32 w-auto sm:h-40 object-contain select-none"
          />

          {/* Continuous Light Sheen Sweep */}
          <motion.div
            animate={{ x: ["-150%", "150%"] }}
            transition={{
              duration: 1.4,
              repeat: 1,
              repeatDelay: 0.2,
              ease: "easeInOut",
            }}
            className="absolute inset-0 pointer-events-none bg-linear-to-r from-transparent via-white/50 to-transparent -skew-x-12 mix-blend-overlay"
          />
        </motion.div>

        {/* Subtitle / Branding Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [10, 0, 0, -15],
            scale: [0.95, 1, 1, 1.1],
          }}
          transition={{
            duration: 2.4,
            times: [0, 0.25, 0.65, 1],
            ease: "easeInOut",
          }}
          className="mt-6 text-center pointer-events-none"
        >
          <h2 className="text-sm sm:text-base font-extrabold tracking-widest text-emerald-400 uppercase drop-shadow-md">
            Municipality of Lupi
          </h2>
          <p className="text-[10px] sm:text-xs font-medium tracking-wider text-slate-300/80">
            Official Citizen & Public Service Portal
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}