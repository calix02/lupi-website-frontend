import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // npm install lucide-react framer-motion
import LupiLOgo from "@/assets/logos/lupi_logo.png";

export default function Header() {
  const navItems = [
    "Home",
    "Announcements",
    "News",
    "Events",
    "Services",
    "Tourism",
    "Contact",
    "About",
  ];
  
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleScreenChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Screen is now desktop (lg and above)
        setMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <header className={`sticky top-4 z-50 mx-auto w-[95%] max-w-7xl lg:rounded-full rounded-md border border-white/30 bg-white/40 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/40`}>
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={LupiLOgo} alt="Lupi Logo" className="h-10 w-auto object-contain" />
          <span className="text-lg font-bold gradient-text">
            Lupi
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item;
              return (
                <li key={item} className="relative">
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setActiveTab(item)}
                    className={`relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-white font-semibold" : "text-slate-700 hover:text-slate-900 dark:text-slate-200"
                    }`}
                  >
                    {item}
                  </a>

                  {/* Animated Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 z-0 rounded-full gradient-bg shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center">
          <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-900">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block lg:hidden rounded-full p-2 text-slate-700 hover:bg-black/5 dark:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col gap-2 pt-4 pb-2 border-t border-slate-200/50 mt-3 dark:border-slate-800">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => {
                    setActiveTab(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === item
                      ? "bg-emerald-500/10 text-emerald-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {item}
                </a>
              ))}
              <button className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-slate-900">
                Get Started
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}