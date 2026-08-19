import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  ShieldAlert,
  HeartPulse,
  Flame,
  Siren,
  Building2,
  Copy,
  Check,
  Search,
  Clock,
} from "lucide-react";

export default function Hotlines() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  // Copy to Clipboard Handler
  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  // LGU Hotline Data
  const hotlines = [
    {
      id: "mdrrmo-1",
      name: "MDRRMO Rescue Hotline",
      agency: "Municipal Disaster Risk Reduction & Management Office",
      number: "0912-345-6789",
      altNumber: "(054) 881-1234",
      category: "Disaster & Emergency",
      icon: ShieldAlert,
      theme: "emerald",
      badge: "24/7 Available",
      description:
        "For immediate flood response, typhoon advisories, vehicular accidents, and evacuation assistance.",
    },
    {
      id: "rhu-1",
      name: "Rural Health Unit (RHU)",
      agency: "Lupi Municipal Health Office",
      number: "0998-765-4321",
      altNumber: "(054) 881-5678",
      category: "Health & Medical",
      icon: HeartPulse,
      theme: "teal",
      badge: "Medical Response",
      description:
        "For medical emergencies, ambulance requests, maternal care, and public health inquiries.",
    },
    {
      id: "police-1",
      name: "Lupi Municipal Police Station",
      agency: "Philippine National Police (PNP)",
      number: "0920-111-2222",
      altNumber: "117",
      category: "Police & Security",
      icon: Siren,
      theme: "slate",
      badge: "Law Enforcement",
      description:
        "For crime reporting, police assistance, security concerns, and immediate law enforcement response.",
    },
    {
      id: "bfp-1",
      name: "Bureau of Fire Protection (BFP)",
      agency: "Lupi Fire Station",
      number: "0915-999-8888",
      altNumber: "(054) 881-9900",
      category: "Fire & Safety",
      icon: Flame,
      theme: "amber",
      badge: "Fire Emergency",
      description:
        "For fire incidents, hazardous material emergencies, and structural safety inspections.",
    },
    {
      id: "lgu-main",
      name: "Office of the Municipal Mayor",
      agency: "LGU Lupi Executive Office",
      number: "(054) 881-2000",
      altNumber: "0917-000-1111",
      category: "LGU Services",
      icon: Building2,
      theme: "emerald",
      badge: "Mon-Fri (8AM-5PM)",
      description:
        "For general municipal inquiries, administrative support, mayor's desk, and public assistance.",
    },
    {
      id: "mswdo-1",
      name: "MSWDO Public Assistance",
      agency: "Municipal Social Welfare & Development Office",
      number: "0939-444-5555",
      altNumber: null,
      category: "LGU Services",
      icon: Building2,
      theme: "teal",
      badge: "Social Welfare",
      description:
        "For emergency financial aid, senior citizen services, child welfare, and crisis intervention.",
    },
  ];

  // Category Filter List
  const categories = [
    { key: "all", label: "All Hotlines" },
    { key: "Disaster & Emergency", label: "MDRRMO & Rescue" },
    { key: "Health & Medical", label: "RHU & Ambulance" },
    { key: "Police & Security", label: "Police Station" },
    { key: "Fire & Safety", label: "BFP Fire Station" },
    { key: "LGU Services", label: "Municipal Hall" },
  ];

  // Filter Logic
  const filteredHotlines = hotlines.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.number.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="hotlines"
      className="relative min-h-screen w-full bg-slate-50 py-20 lg:py-28 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden text-slate-900"
    >
      {/* Subtle Vertical Guidelines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between max-w-7xl mx-auto px-6 opacity-30 z-0">
        <div className="w-px h-full bg-linear-to-b from-slate-200 via-slate-300 to-transparent" />
        <div className="w-px h-full bg-linear-to-b from-slate-200 via-slate-300 to-transparent" />
        <div className="w-px h-full bg-linear-to-b from-slate-200 via-slate-300 to-transparent" />
        <div className="w-px h-full bg-linear-to-b from-slate-200 via-slate-300 to-transparent" />
      </div>

      {/* Background Soft Orbs */}
      <div className="absolute top-10 left-1/3 w-125 h-125 bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-112.5 h-112.5 bg-teal-200/40 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* ================= 1. HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 mt-5 lg:mt-0 ">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs backdrop-blur-md">
            <PhoneCall className="h-4 w-4 text-emerald-600 animate-pulse" />
            <span>Emergency Directory</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
            LGU Lupi Emergency & <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Help Desk Directory
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Quick access to official response teams, health officers, law
            enforcement, and municipal public service hotlines.
          </p>
        </div>

        {/* ================= 2. CONTROLS: SEARCH & CATEGORY FILTERS ================= */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by agency, department, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 shadow-sm text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? "bg-slate-950 text-white shadow-md shadow-slate-950/10"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= 3. HOTLINES GRID ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredHotlines.map((hotline) => {
              const IconComponent = hotline.icon;
              return (
                <motion.div
                  key={hotline.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col justify-between bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Top Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        {hotline.badge}
                      </span>
                    </div>

                    {/* Title & Agency */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                        {hotline.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        {hotline.agency}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {hotline.description}
                    </p>
                  </div>

                  {/* Actions Area */}
                  <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                    {/* Primary Hotline Number */}
                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Primary Mobile
                        </span>
                        <span className="text-base font-extrabold text-slate-900 tracking-tight">
                          {hotline.number}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopy(hotline.number)}
                          title="Copy Number"
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                        >
                          {copiedNumber === hotline.number ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        {/* Direct Call Button */}
                        <a
                          href={`tel:${hotline.number.replace(/[^0-9+]/g, "")}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>

                    {/* Secondary Landline (If Available) */}
                    {hotline.altNumber && (
                      <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-500">
                        <span>Landline / Alt:</span>
                        <a
                          href={`tel:${hotline.altNumber.replace(/[^0-9+]/g, "")}`}
                          className="font-semibold text-slate-700 hover:text-emerald-600 underline transition-colors"
                        >
                          {hotline.altNumber}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredHotlines.length === 0 && (
          <div className="text-center py-12 space-y-3 bg-white rounded-3xl border border-slate-200">
            <ShieldAlert className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">
              No Hotlines Found
            </h3>
            <p className="text-slate-500 text-sm">
              Try clearing your search term or selecting a different category.
            </p>
          </div>
        )}

        {/* ================= 4. EMERGENCY BANNER ================= */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              National Emergency
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              In need of nationwide emergency response?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Dial <strong>911</strong> directly for nationwide emergency
              services, or <strong>117</strong> for PNP central dispatcher.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <a
              href="tel:911"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Dial 911 Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
