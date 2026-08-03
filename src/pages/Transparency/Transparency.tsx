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
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileSpreadsheet
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";
import BackHomeButton from "@/components/Buttons/BackHome";


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

  // Analytics Bar Data for Visual 3D Graph
  const chartData = [
    {
      label: "Completed",
      value: analytics.completed,
      percentage: Math.round((analytics.completed / analytics.total) * 100),
      color: "from-emerald-500 to-teal-600",
      frontColor: "bg-emerald-500",
      topColor: "bg-emerald-400",
      sideColor: "bg-emerald-700",
      glowColor: "shadow-emerald-500/30",
    },
    {
      label: "On-going",
      value: analytics.ongoing,
      percentage: Math.round((analytics.ongoing / analytics.total) * 100),
      color: "from-amber-500 to-orange-600",
      frontColor: "bg-amber-500",
      topColor: "bg-amber-400",
      sideColor: "bg-amber-700",
      glowColor: "shadow-amber-500/30",
    },
    {
      label: "Planning",
      value: analytics.planning,
      percentage: Math.round((analytics.planning / analytics.total) * 100),
      color: "from-sky-500 to-blue-600",
      frontColor: "bg-sky-500",
      topColor: "bg-sky-400",
      sideColor: "bg-sky-700",
      glowColor: "shadow-sky-500/30",
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

  // Pagination Logic
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
    <section
      id="transparency"
      className="relative w-full min-h-screen py-20 sm:py-24 px-4 sm:px-8 bg-slate-900 text-slate-100 overflow-hidden flex flex-col justify-center items-center"
    >
        <BackHomeButton />
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[35rem] h-[35rem] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12 sm:gap-16"
      >
        {/* Section Header */}
        <motion.div variants={animate.itemVariants} className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Public Governance & Financial Accountability</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Municipal Projects &{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Budget Analytics
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Real-time tracking of infrastructure development, budget allocation, contractor status, and total investment for open and transparent governance.
          </p>
        </motion.div>

        {/* ================= 1. ANALYTICS & 3D GRAPH SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Stat Cards Column (5 Cols) */}
          <motion.div variants={animate.itemVariants} className="lg:col-span-5 flex flex-col gap-4">
            {/* Total Budget Card */}
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Capital Investment</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                    {formatCurrency(analytics.totalInvestment)}
                  </h3>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" /> 100% Allocated
                </span>
                <span>Fiscal Year 2026</span>
              </div>
            </div>

            {/* Sub Metric Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-lg backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">Total Projects</span>
                  <Briefcase className="w-4 h-4 text-sky-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white">{analytics.total}</p>
                <p className="text-[11px] text-slate-500 mt-1">Across all categories</p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-lg backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">Completed</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">{analytics.completed}</p>
                <p className="text-[11px] text-slate-500 mt-1">Successfully turned over</p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-lg backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">On-going</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400">{analytics.ongoing}</p>
                <p className="text-[11px] text-slate-500 mt-1">Under construction</p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-lg backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-400">Planning</span>
                  <Building2 className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-cyan-400">{analytics.planning}</p>
                <p className="text-[11px] text-slate-500 mt-1">Bidding & preparation</p>
              </div>
            </div>
          </motion.div>

          {/* Animated 3D Bar Graph Card (7 Cols) */}
          <motion.div
            variants={animate.itemVariants}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">Project Status Analytics</h3>
                <p className="text-xs text-slate-400">Interactive 3D visual breakdown of development stages</p>
              </div>
              <span className="p-2 rounded-xl bg-slate-700/50 text-slate-400 border border-slate-600/50 text-xs font-mono">
                3D Graph
              </span>
            </div>

            {/* 3D Bar Visual Container */}
            <div className="w-full h-64 sm:h-72 flex items-end justify-around gap-4 sm:gap-8 pt-10 pb-4 px-2 border-b border-slate-700/60 perspective-1000">
              {chartData.map((bar, index) => {
                const heightPercent = Math.max((bar.value / analytics.total) * 100, 15);

                return (
                  <div key={bar.label} className="relative flex-1 flex flex-col items-center h-full justify-end group">
                    {/* Hover Value Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="mb-3 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white shadow-md text-center"
                    >
                      <span>{bar.value} Units</span>
                      <span className="block text-[10px] text-slate-400 font-normal">{bar.percentage}%</span>
                    </motion.div>

                    {/* 3D Column Assembly */}
                    <div className="relative w-12 sm:w-16 flex flex-col justify-end transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1">
                      {/* Animated Height Container */}
                      <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: `${heightPercent}%` }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                        className="relative w-full"
                      >
                        {/* Top Face of 3D Bar */}
                        <div
                          className={`absolute -top-3 left-0 w-full h-4 ${bar.topColor} rounded-t-sm transform -skew-x-12 origin-bottom-left shadow-xs z-20 opacity-90`}
                        />

                        {/* Side Face of 3D Bar (Depth) */}
                        <div
                          className={`absolute top-0 -right-3 w-3 h-full ${bar.sideColor} transform skew-y-12 origin-top-left z-10 opacity-80`}
                        />

                        {/* Front Face of 3D Bar */}
                        <div
                          className={`w-full h-full ${bar.frontColor} bg-gradient-to-t ${bar.color} rounded-b-sm shadow-xl ${bar.glowColor} relative z-10 overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/20" />
                        </div>
                      </motion.div>
                    </div>

                    {/* X-Axis Label */}
                    <span className="mt-4 text-xs font-bold text-slate-300 tracking-wide text-center">
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Graph Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 shadow-xs" />
                <span>Completed ({analytics.completed})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-amber-500 shadow-xs" />
                <span>On-going ({analytics.ongoing})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-sky-500 shadow-xs" />
                <span>Planning ({analytics.planning})</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= 2. TRANSPARENCY PROJECT TABLE ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl backdrop-blur-xl p-6 sm:p-8 flex flex-col gap-6"
        >
          {/* Table Control Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Open Data Portal</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Municipal Projects Directory
              </h3>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative w-full sm:w-40">
                <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer transition-all"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="On-going">On-going</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Responsive Wrapper */}
          <div className="w-full overflow-x-auto rounded-2xl border border-slate-700/60 bg-slate-900/50">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-700/80 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-5">Project Details</th>
                  <th className="py-4 px-5">Contractor</th>
                  <th className="py-4 px-5">Cost / Budget</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Completion Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                <AnimatePresence mode="wait">
                  {paginatedProjects.length > 0 ? (
                    paginatedProjects.map((project) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-slate-800/50 transition-colors group"
                      >
                        {/* Project Name & Description */}
                        <td className="py-4 px-5 max-w-xs">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                              {project.category}
                            </span>
                            <h4 className="font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                              {project.name}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </td>

                        {/* Contractor */}
                        <td className="py-4 px-5 font-medium text-slate-300 whitespace-nowrap">
                          {project.contractor}
                        </td>

                        {/* Cost */}
                        <td className="py-4 px-5 font-extrabold text-white whitespace-nowrap">
                          {formatCurrency(project.cost)}
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border ${
                              project.status === "Completed"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : project.status === "On-going"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : "bg-sky-500/10 text-sky-400 border-sky-500/30"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                project.status === "Completed"
                                  ? "bg-emerald-400"
                                  : project.status === "On-going"
                                  ? "bg-amber-400 animate-pulse"
                                  : "bg-sky-400"
                              }`}
                            />
                            {project.status}
                          </span>
                        </td>

                        {/* Completion Date */}
                        <td className="py-4 px-5 text-slate-400 font-medium whitespace-nowrap">
                          {project.completionDate}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500">
                        <p className="text-sm font-medium">No projects found matching your search criteria.</p>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Table Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <span>
                Showing page <strong className="text-white">{currentPage}</strong> of{" "}
                <strong className="text-white">{totalPages}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
  );
}