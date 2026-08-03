import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import LupiLOgo from "@/assets/logos/lupi_logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  const navItems = [
    "Home",
    "Government",
    "Transparency",
    "About",
    "Contact",
  ];

  // Dropdown items configuration for each navigation link
  const navDropdownData: Record<string, { label: string; link: string; desc: string }[]> = {
   
    Government: [
      { label: "Elected Officials", link: "officials", desc: "Important notices and suspensions" },
      { label: "Sanguniang Bayan", link: "#announcements", desc: "Active government contracts & transparency" },
      { label: "Citizen Charter", link: "#announcements", desc: "Active government contracts & transparency" },

    ],
  
  };

  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);

  // Auto-close mobile drawer on screen resize to desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleScreenChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };

    mediaQuery.addEventListener("change", handleScreenChange);
    return () => mediaQuery.removeEventListener("change", handleScreenChange);
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

  // Track visibility state
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  // Framer Motion's optimized way to listen to scroll changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // 1. Show if we are near the top
    if (latest < 50) {
      setIsHidden(false);
    }
    // 2. Hide if scrolling DOWN
    else if (latest > previous && latest > 150) {
      setIsHidden(true);
      setHoveredDropdown(null);
    }
    // 3. Show if scrolling UP
    else if (latest < previous) {
      setIsHidden(false);
    }
  });

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-7xl lg:rounded-full rounded-2xl transition-all duration-500 border border-white/15 bg-white-950/50 backdrop-blur-md py-3.5 px-6 shadow-xl shadow-slate-950/20 ${
        isHidden ? "hidden" : "block"
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

        {/* Desktop Navigation with Dropdowns */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeTab === item;
              const hasDropdown = navDropdownData[item] && navDropdownData[item].length > 0;
              const isHovered = hoveredDropdown === item;

              return (
                <li
                  key={item}
                  className="relative group"
                  onMouseEnter={() => setHoveredDropdown(item)}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <Link
                  to={item.toLowerCase()}
                    className={`relative z-10 flex items-center gap-1 px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-slate-950"
                        : "text-slate-300 hover:text-emerald-400"
                    }`}>
                 
                    <span>{item}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isHovered ? "rotate-180 text-emerald-400" : ""
                        } ${isActive ? "text-slate-950" : "text-slate-400"}`}
                      />
                    )}
                  </Link>

                  {/* Active Sliding Background Pill for Main Nav */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 z-0 rounded-full bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}

                  {/* Dropdown Menu Panel */}
                  <AnimatePresence>
                    {hasDropdown && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 z-30"
                      >
                        <div className="rounded-2xl bg-slate-900/95 border border-emerald-500/20 p-2 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10">
                          <div className="flex flex-col gap-1">
                            {navDropdownData[item].map((subItem, idx) => (
                              <Link
                                key={idx}
                                to={subItem.link}
                                onClick={() => setHoveredDropdown(null)}
                                className="group/sub flex flex-col gap-0.5 rounded-xl p-3 hover:bg-emerald-500/10 transition-all duration-200"
                              >
                                <span className="text-xs font-bold text-slate-200 group-hover/sub:text-emerald-400 transition-colors flex items-center justify-between">
                                  {subItem.label}
                                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-emerald-400" />
                                </span>
                                <span className="text-[11px] text-slate-400 leading-snug">
                                  {subItem.desc}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center">
          <Link
            to="transparency"
            className="group flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all"
          >
            <span>Transparency</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
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

      {/* Mobile Menu Drawer with Accordions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col gap-1.5 pt-4 pb-2 border-t border-white/10 mt-3 max-h-[70vh] overflow-y-auto pr-1">
              {navItems.map((item) => {
                const hasDropdown = navDropdownData[item] && navDropdownData[item].length > 0;
                const isExpanded = mobileExpandedItem === item;

                return (
                  <div key={item} className="flex flex-col">
                    <div
                      onClick={() => {
                        if (hasDropdown) {
                          setMobileExpandedItem(isExpanded ? null : item);
                        } else {
                          setActiveTab(item);
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                        activeTab === item
                          ? "bg-linear-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30"
                          : "text-slate-200 hover:bg-white/5 hover:text-emerald-400"
                      }`}
                    >
                      <a href={`#${item.toLowerCase()}`} className="flex-1">
                        {item}
                      </a>
                      {hasDropdown && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-emerald-400" : "text-slate-400"
                          }`}
                        />
                      )}
                    </div>

                    {/* Mobile Accordion Sub-items */}
                    <AnimatePresence>
                      {hasDropdown && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 pr-2 py-1 flex flex-col gap-1"
                        >
                          {navDropdownData[item].map((subItem, idx) => (
                            <Link
                              key={idx}
                              to={subItem.link}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileExpandedItem(null);
                              }}
                              className="flex flex-col gap-0.5 rounded-lg p-2.5 hover:bg-white/5 text-slate-300 hover:text-emerald-400 transition-colors"
                            >
                              <span className="text-xs font-bold">{subItem.label}</span>
                              <span className="text-[10px] text-slate-500">{subItem.desc}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                to="transparency"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-emerald-500/20"
              >
                <span>Transparency</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}