import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import LupiLOgo from "@/assets/logos/lupi_logo.png";

export default function Header() {
  const navItems = [
    "Home",
    "Announcements",
    "Tourism",
    "Weather",
    "Officials",
    "About",
    "Contact",
  ];

  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Auto-close mobile drawer on screen resize to desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleScreenChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };

    mediaQuery.addEventListener("change", handleScreenChange);
    return () => mediaQuery.removeEventListener("change", handleScreenChange);
  }, []);

  // Listen for scroll to elevate glass backdrop effect dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

// Listen for section intersection to update active tab
useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          const active = navItems.find(
            (item) => item.toLowerCase() === sectionId
          );

          if (active) {
            setActiveTab(active);
          }
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => {
    sections.forEach((section) => observer.unobserve(section));
  };
}, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-7xl lg:rounded-full rounded-2xl transition-all duration-500 "border-white/15 bg-white-950/50 backdrop-blur-md py-3.5 px-6
        ${
          mobileMenuOpen
            ? "border-emerald-500/20 bg-slate-950/50 shadow-2xl shadow-emerald-950/20 backdrop-blur-2xl py-2.5 px-6"
            : " bg-white-950/50 backdrop-blur-md py-3.5 px-6"
        } 
        ${
        scrolled
          ? "border-emerald-500/20 bg-white-950/50 shadow-2xl shadow-emerald-950/20 backdrop-blur-2xl py-2.5 px-6"
          : " bg-white-950/50 backdrop-blur-md py-3.5 px-6"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={LupiLOgo}
            alt="Lupi Logo"
            className="h-11 w-auto object-contain drop-shadow-md"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg font-extrabold tracking-wide bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Municipality of Lupi
            </span>
            <span className="text-xs font-medium text-slate-400 tracking-wider">
              Camarines Sur
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeTab === item;
              return (
                <li key={item} className="relative">
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`relative z-10 block px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-slate-950"
                        : "text-slate-500 hover:text-emerald-600 hover:font-semibold"
                    }`}
                  >
                    {item}
                  </a>

                  {/* Active Sliding Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 z-0 rounded-full bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center">
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all"
          >
            <span>Explore Services</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block lg:hidden rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-emerald-400 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col gap-1.5 pt-4 pb-2 border-t border-white/10 mt-3">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => {
                    setActiveTab(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    activeTab === item
                      ? "bg-linear-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-slate-200 hover:bg-white/5 hover:text-emerald-400"
                  }`}
                >
                  {item}
                </a>
              ))}
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-emerald-500/20"
              >
                <span>Explore Services</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}