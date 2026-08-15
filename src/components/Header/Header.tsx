import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  BriefcaseBusiness,
  Briefcase,
} from "lucide-react";
import LupiLOgo from "@/assets/logos/lupi_logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const navItems = [
    "Home",
    "Announcements",
    "Government",
    "Projects",
    "Transparency",
    "About",
    "Contact",
  ];

  const navDropdownData: Record<
    string,
    { label: string; link: string; desc: string }[]
  > = {
    Government: [
      {
        label: "Elected Officials",
        link: "officials",
        desc: "Profiles of the municipality's elected leaders.",
      },
      {
        label: "Sangguniang Bayan",
        link: "sangguniangbayan",
        desc: "Municipal Council members, ordinances, and resolutions.",
      },
      {
        label: "Citizen's Charter",
        link: "services",
        desc: "Service standards, requirements, fees, and processing times.",
      },
      {
        label: "LGU Employees",
        link: "employees",
        desc: "View the list of municipal personnel, departments, and designated roles.",
      },
    ],
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(
    null,
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Auto-close mobile drawer on screen resize to desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleScreenChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };
    mediaQuery.addEventListener("change", handleScreenChange);
    return () => mediaQuery.removeEventListener("change", handleScreenChange);
  }, []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Background blur styling threshold
    setIsScrolled(latest > 20);

    // Dynamic scroll behavior
    if (latest < 50) {
      setIsHidden(false);
    } else if (latest > previous && latest > 120) {
      setIsHidden(true);
      setHoveredDropdown(null);
    } else if (latest < previous) {
      setIsHidden(false);
    }
  });

  const getPath = (item: string) =>
    item === "Home" ? "/" : `/${item.toLowerCase()}`;

  return (
    <motion.header
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{
        y: isHidden ? -120 : 0,
        x: "-50%",
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-4 left-1/2 z-50 w-[92%] max-w-7xl rounded-2xl lg:rounded-full transition-all duration-300 px-4 sm:px-6 py-3 border ${
        isScrolled
          ? "bg-slate-950/85 border-white/10 backdrop-blur-xl shadow-2xl shadow-slate-950/50"
          : "bg-slate-950/40 border-white/10 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <img
            src={LupiLOgo}
            alt="Municipality of Lupi Logo"
            className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm sm:text-base lg:text-lg font-extrabold tracking-wide bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Municipality of Lupi
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-slate-300 tracking-wider">
              Camarines Sur
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const hasDropdown = Boolean(navDropdownData[item]?.length);
              const isHovered = hoveredDropdown === item;
              const targetPath = getPath(item);
              const isActive = location.pathname === targetPath;

              return (
                <li
                  key={item}
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown(item)}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <Link
                    to={targetPath}
                    className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : "text-slate-200 hover:text-emerald-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{item}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isHovered
                            ? "rotate-180 text-emerald-400"
                            : "text-slate-300"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {hasDropdown && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 z-50"
                      >
                        <div className="rounded-2xl bg-slate-900/95 border border-emerald-500/20 p-2 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10">
                          <div className="flex flex-col gap-1">
                            {navDropdownData[item].map((subItem, idx) => (
                              <Link
                                key={idx}
                                to={`/${subItem.link}`}
                                onClick={() => setHoveredDropdown(null)}
                                className="group/sub flex flex-col gap-0.5 rounded-xl p-2.5 hover:bg-emerald-500/10 transition-all duration-200"
                              >
                                <span className="text-xs font-bold text-slate-100 group-hover/sub:text-emerald-400 transition-colors flex items-center justify-between">
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
            to="/jobs"
            className="group flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all active:scale-95"
          >
            <span>Job Vacancies</span>
            <BriefcaseBusiness className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block lg:hidden rounded-xl p-2 text-slate-200 hover:bg-white/10 hover:text-emerald-400 transition-colors cursor-pointer"
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col gap-1 pt-4 pb-2 border-t border-white/10 mt-3 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => {
                const hasDropdown = Boolean(navDropdownData[item]?.length);
                const isExpanded = mobileExpandedItem === item;
                const targetPath = getPath(item);

                return (
                  <div key={item} className="flex flex-col">
                    <div className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all text-slate-200 hover:bg-white/10 hover:text-emerald-400">
                      <Link
                        to={targetPath}
                        onClick={() => {
                          if (!hasDropdown) setMobileMenuOpen(false);
                        }}
                        className="flex-1"
                      >
                        {item}
                      </Link>

                      {hasDropdown && (
                        <button
                          onClick={() =>
                            setMobileExpandedItem(isExpanded ? null : item)
                          }
                          className="p-1 rounded-md text-slate-300 hover:text-emerald-400"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-emerald-400" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion Items */}
                    <AnimatePresence>
                      {hasDropdown && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 pr-2 py-1 flex flex-col gap-1 bg-white/5 rounded-xl my-1"
                        >
                          {navDropdownData[item].map((subItem, idx) => (
                            <Link
                              key={idx}
                              to={`/${subItem.link}`}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileExpandedItem(null);
                              }}
                              className="flex flex-col gap-0.5 rounded-lg p-2 text-slate-200 hover:bg-white/10 hover:text-emerald-300 transition-colors"
                            >
                              <span className="text-xs font-bold">
                                {subItem.label}
                              </span>
                              <span className="text-[10px] text-slate-300">
                                {subItem.desc}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                to="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-emerald-500/20"
              >
                <span>Job Vacancies</span>
                <Briefcase className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
