import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase,
  DollarSign,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Layers,
  ArrowUpRight
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";
import BackHomeButton from "@/components/Buttons/BackHome";
import Footer from "@/components/Footer/Footer";

export interface ProjectItem {
  id: number;
  name: string;
  category: string;
  description: string;
  contractor: string;
  cost: number;
  status: "Completed" | "On-going" | "Planning";
  completionDate: string;
}

export default function Transparency() {
  const animate = useInOutAnimation();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Municipal Project Dataset
  const projectsData: ProjectItem[] = [
    {
      id: 1,
      name: "Farm-to-Market Road Concrete Paving Phase II",
      category: "Infrastructure",
      description: "2.5 km concrete road expansion connecting rural agricultural barangays to the main economic hub.",
      contractor: "Aang Construction & Supply Inc.",
      cost: 14500000,
      status: "Completed",
      completionDate: "May 14, 2026",
    },
    {
      id: 2,
      name: "Municipal Disaster Risk Reduction & Rescue Center",
      category: "Public Safety",
      description: "State-of-the-art 2-story command center equipped with emergency response logistics and staging area.",
      contractor: "Vanguard Builders Corp.",
      cost: 28000000,
      status: "On-going",
      completionDate: "Target: Nov 2026",
    },
    {
      id: 3,
      name: "Barangay Health Station & Dental Clinic Modernization",
      category: "Healthcare",
      description: "Upgrade of medical diagnostics equipment and expansion of patient treatment capacity.",
      contractor: "Apex Medical Infrastructure",
      cost: 6200000,
      status: "Completed",
      completionDate: "March 20, 2026",
    },
    {
      id: 4,
      name: "Central Drainage System & Flood Mitigation Network",
      category: "Infrastructure",
      description: "Reinforced concrete box culverts installation along main arterial roads to prevent localized flooding.",
      contractor: "HydroTech Engineering Services",
      cost: 18900000,
      status: "On-going",
      completionDate: "Target: Dec 2026",
    },
    {
      id: 5,
      name: "Municipal Solar-Powered Street Lighting Project",
      category: "Energy",
      description: "Installation of 350 eco-friendly smart solar LED lighting poles along national highway corridors.",
      contractor: "EcoBright Solutions Philippines",
      cost: 9800000,
      status: "Completed",
      completionDate: "January 10, 2026",
    },
    {
      id: 6,
      name: "Public Market Commercial Complex Renovation",
      category: "Commerce",
      description: "Comprehensive overhaul of wet market sections, sanitation systems, and modern stall layouts.",
      contractor: "Tri-Core Structural Developers",
      cost: 32500000,
      status: "Planning",
      completionDate: "Target: Q2 2027",
    },
  ];

  // Aggregated Analytics
  const analytics = useMemo(() => {
    const total = projectsData.length;
    const completed = projectsData.filter((p) => p.status === "Completed").length;
    const ongoing = projectsData.filter((p) => p.status === "On-going").length;
    const planning = projectsData.filter((p) => p.status === "Planning").length;
    const totalInvestment = projectsData.reduce((sum, p) => sum + p.cost, 0);

    return { total, completed, ongoing, planning, totalInvestment };
  }, [projectsData]);

  // 3D Bar Colors & Heights
  const chartData = [
    {
      label: "Completed",
      value: analytics.completed,
      percentage: Math.round((analytics.completed / analytics.total) * 100),
      frontColor: "bg-emerald-500",
      topColor: "bg-emerald-300",
      sideColor: "bg-emerald-600",
      glowColor: "shadow-emerald-500/20",
    },
    {
      label: "On-going",
      value: analytics.ongoing,
      percentage: Math.round((analytics.ongoing / analytics.total) * 100),
      frontColor: "bg-amber-500",
      topColor: "bg-amber-300",
      sideColor: "bg-amber-600",
      glowColor: "shadow-amber-500/20",
    },
    {
      label: "Planning",
      value: analytics.planning,
      percentage: Math.round((analytics.planning / analytics.total) * 100),
      frontColor: "bg-sky-500",
      topColor: "bg-sky-300",
      sideColor: "bg-sky-600",
      glowColor: "shadow-sky-500/20",
    },
  ];

  // Filter & Search Logic
  const filteredProjects = useMemo(() => {
    return projectsData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, projectsData]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
    <section
      id="transparency"
      className="relative w-full min-h-screen py-20 sm:py-24 px-4 sm:px-8 bg-slate-50 text-slate-800 overflow-hidden flex flex-col justify-center items-center"
    >
        <BackHomeButton/>
      {/* Soft Light Background Lighting Accent */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-200 h-120 bg-linear-to-tr from-emerald-200/40 via-teal-100/30 to-sky-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-14"
      >
        {/* Header Section */}
        <motion.div variants={animate.itemVariants} className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Public Governance & Financial Accountability</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Municipal Budget &{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Project Transparency
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Real-time public reporting on capital expenditures, contractor allocations, and ongoing infrastructure projects for the municipality.
          </p>
        </motion.div>

        {/* ================= 1. FINANCIAL SUMMARY & 3D ANALYTICS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side Stat Cards (5 Cols) */}
          <motion.div variants={animate.itemVariants} className="lg:col-span-5 flex flex-col gap-4">
            {/* Main Total Investment Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
              
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Capital Investment</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                    {formatCurrency(analytics.totalInvestment)}
                  </h3>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <TrendingUp className="w-4 h-4" /> 100% Budget Utilization
                </span>
                <span className="font-medium text-slate-400">Fiscal Year 2026</span>
              </div>
            </div>

            {/* Grid Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">Total Projects</span>
                  <Briefcase className="w-4 h-4 text-sky-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{analytics.total}</p>
                <p className="text-[11px] text-slate-400 mt-1">Monitored developments</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">Completed</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600">{analytics.completed}</p>
                <p className="text-[11px] text-slate-400 mt-1">Fully turned over</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">On-going</span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-amber-600">{analytics.ongoing}</p>
                <p className="text-[11px] text-slate-400 mt-1">Active construction</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">Planning</span>
                  <Building2 className="w-4 h-4 text-cyan-600" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-cyan-600">{analytics.planning}</p>
                <p className="text-[11px] text-slate-400 mt-1">Bidding stage</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side Animated 3D Isometric Bar Graph (7 Cols) */}
          <motion.div
            variants={animate.itemVariants}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Project Status Analytics</h3>
                <p className="text-xs text-slate-500">Animated 3D visual breakdown of municipal projects</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold">
                3D Analytics
              </span>
            </div>

            {/* Isometric 3D Bar Graph Canvas */}
            <div className="w-full h-64 sm:h-72 flex items-end justify-around gap-6 pt-12 pb-2 border-b border-slate-100 relative">
              {chartData.map((bar, index) => {
                const heightPercent = Math.max((bar.value / analytics.total) * 100, 18);

                return (
                  <div key={bar.label} className="relative flex-1 flex flex-col items-center h-full justify-end group">
                    {/* Floating Value Pill */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="mb-4 px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-extrabold shadow-md text-center z-30"
                    >
                      <span>{bar.value} Units</span>
                      <span className="block text-[10px] text-slate-300 font-normal">{bar.percentage}%</span>
                    </motion.div>

                    {/* 3D Bar Assembly */}
                    <div className="relative w-14 sm:w-20 flex flex-col justify-end transition-transform duration-300 group-hover:scale-105">
                      <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: `${heightPercent}%` }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                        className="relative w-full"
                      >
                        {/* 3D Top Face */}
                        <div
                          className={`absolute -top-3 left-0 w-full h-4 ${bar.topColor} rounded-t-sm transform -skew-x-12 origin-bottom-left shadow-xs z-20`}
                        />

                        {/* 3D Side Face (Depth) */}
                        <div
                          className={`absolute top-0 -right-3 w-3 h-full ${bar.sideColor} transform skew-y-12 origin-top-left z-10 opacity-95`}
                        />

                        {/* 3D Front Face */}
                        <div
                          className={`w-full h-full ${bar.frontColor} rounded-b-sm shadow-xl ${bar.glowColor} relative z-10 overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-linear-to-r from-white/30 via-transparent to-black/10" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Label */}
                    <span className="mt-4 text-xs font-extrabold text-slate-700 tracking-wide">
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Graph Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500 font-semibold pt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 shadow-xs" />
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-amber-500 shadow-xs" />
                <span>On-going</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-sky-500 shadow-xs" />
                <span>Planning</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= 2. TRANSPARENCY PROJECT DATA TABLE ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 flex flex-col gap-6"
        >
          {/* Table Header Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Open Data Portal</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Municipal Projects Directory
              </h3>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search project or contractor..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              <div className="relative w-full sm:w-40">
                <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer transition-all"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="On-going">On-going</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Element */}
          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-50/50">
            <table className="w-full text-left border-collapse min-w-200">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-5">Project Details</th>
                  <th className="py-4 px-5">Contractor</th>
                  <th className="py-4 px-5">Cost / Budget</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Completion Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-xs sm:text-sm bg-white">
                <AnimatePresence mode="wait">
                  {paginatedProjects.length > 0 ? (
                    paginatedProjects.map((project) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-slate-50 transition-colors group"
                      >
                        {/* Project Name & Description */}
                        <td className="py-4 px-5 max-w-xs">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                              {project.category}
                            </span>
                            <h4 className="font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                              {project.name}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </td>

                        {/* Contractor */}
                        <td className="py-4 px-5 font-semibold text-slate-700 whitespace-nowrap">
                          {project.contractor}
                        </td>

                        {/* Cost */}
                        <td className="py-4 px-5 font-extrabold text-slate-900 whitespace-nowrap">
                          {formatCurrency(project.cost)}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${
                              project.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : project.status === "On-going"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-sky-50 text-sky-700 border-sky-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                project.status === "Completed"
                                  ? "bg-emerald-500"
                                  : project.status === "On-going"
                                  ? "bg-amber-500 animate-pulse"
                                  : "bg-sky-500"
                              }`}
                            />
                            {project.status}
                          </span>
                        </td>

                        {/* Completion Date */}
                        <td className="py-4 px-5 text-slate-600 font-medium whitespace-nowrap">
                          {project.completionDate}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        <p className="text-sm font-semibold">No municipal projects match your search.</p>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
              <span>
                Showing page <strong className="text-slate-800">{currentPage}</strong> of{" "}
                <strong className="text-slate-800">{totalPages}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
    <Footer/>
    </>
    
  );
}