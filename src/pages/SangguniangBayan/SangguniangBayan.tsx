import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  X,
  Calendar,
  Building2,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";

// Types
export interface Official {
  id: number;
  name: string;
  position: string;
  committee: string;
  image: string;
}

export interface DocumentItem {
  id: string;
  number: string;
  title: string;
  category: string;
  dateEnacted: string;
  year: number;
  author: string;
  summary: string;
  pdfUrl: string;
  type: "ordinance" | "resolution";
}

export default function SangguniangBayan() {
  const animate = useInOutAnimation();

  // Active Tab, Filters, & Pagination State
  const [activeTab, setActiveTab] = useState<"ordinance" | "resolution">(
    "ordinance",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedPdf, setSelectedPdf] = useState<DocumentItem | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust cards per page as needed

  // Sangguniang Bayan Members Data
  const officials: Official[] = [
    {
      id: 1,
      name: "Hon. Maria Clara Santos",
      position: "Municipal Vice Mayor & Presiding Officer",
      committee: "Chairperson, Committee on Rules & Legal Matters",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Hon. Juan Dela Cruz Jr.",
      position: "SB Member (1st Councilor)",
      committee: "Chairperson, Committee on Appropriations & Finance",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Hon. Roberto Reyes",
      position: "SB Member (2nd Councilor)",
      committee: "Chairperson, Committee on Infrastructure & Public Works",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      name: "Hon. Elena Agoncillo",
      position: "SB Member (3rd Councilor)",
      committee: "Chairperson, Committee on Health & Social Welfare",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 5,
      name: "Hon. Gabriel Mendoza",
      position: "SB Member (4th Councilor)",
      committee: "Chairperson, Committee on Agriculture & Environment",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    },
  ];

  // Legislative Documents Dataset
  const legislativeDocs: DocumentItem[] = [
    {
      id: "ord-2026-001",
      number: "Ordinance No. 2026-001",
      title:
        "Comprehensive Ecological Waste Management & Plastic Regulation Act",
      category: "Environment",
      dateEnacted: "January 15, 2026",
      year: 2026,
      author: "Hon. Gabriel Mendoza",
      summary:
        "An ordinance regulating single-use plastics and establishing material recovery facilities across all barangays in Lupi.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "ordinance",
    },
    {
      id: "ord-2025-014",
      number: "Ordinance No. 2025-014",
      title: "Municipal Investment & Business Incentive Code of 2025",
      category: "Economic Development",
      dateEnacted: "November 10, 2025",
      year: 2025,
      author: "Hon. Juan Dela Cruz Jr.",
      summary:
        "Providing tax incentives and streamlined licensing processes for new enterprises establishing operations within the municipality.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "ordinance",
    },
    {
      id: "ord-2025-008",
      number: "Ordinance No. 2025-008",
      title: "Youth Development Code & Barangay SK Capacity Enhancement",
      category: "Youth & Sports",
      dateEnacted: "July 22, 2025",
      year: 2025,
      author: "Hon. Elena Agoncillo",
      summary:
        "Institutionalizing annual leadership summits, scholarship grants, and sports development funds for youth organizations.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "ordinance",
    },
    {
      id: "ord-2024-003",
      number: "Ordinance No. 2024-003",
      title: "Traffic Management and Pedestrian Safety Code",
      category: "Infrastructure",
      dateEnacted: "March 11, 2024",
      year: 2024,
      author: "Hon. Roberto Reyes",
      summary:
        "Establishing standard speed zones, helmet compliance measures, and dedicated pedestrian pathways along major municipal arterial roads.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "ordinance",
    },
    {
      id: "res-2026-005",
      number: "Resolution No. 2026-005",
      title:
        "Authorizing the LGU to Enter into MOA for Rural Health Telemedicine Infrastructure",
      category: "Health & Technology",
      dateEnacted: "February 02, 2026",
      year: 2026,
      author: "Hon. Elena Agoncillo",
      summary:
        "Authorizing the Municipal Mayor to sign agreement for the rollout of digital health consultations in remote barangays.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "resolution",
    },
    {
      id: "res-2025-032",
      number: "Resolution No. 2025-032",
      title:
        "Adopting the 2026-2028 Municipal Disaster Risk Reduction and Management Plan",
      category: "Public Safety",
      dateEnacted: "December 05, 2025",
      year: 2025,
      author: "Hon. Roberto Reyes",
      summary:
        "Formal adoption of the comprehensive 3-year DRRM strategy, allocation of emergency reserves, and evacuation route upgrades.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "resolution",
    },
    {
      id: "res-2024-019",
      number: "Resolution No. 2024-019",
      title:
        "Commending Top Taxpayers and Outstanding Agriculture Cooperatives of 2024",
      category: "Commendation",
      dateEnacted: "October 18, 2024",
      year: 2024,
      author: "Hon. Maria Clara Santos",
      summary:
        "Expressing highest appreciation to local stakeholders and farmers cooperatives for exemplary economic performance.",
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      type: "resolution",
    },
  ];

  // Available Years for Filter
  const availableYears = ["All", "2026", "2025", "2024"];

  // Search & Filter Logic
  const filteredDocs = useMemo(() => {
    return legislativeDocs.filter((doc) => {
      const matchesType = doc.type === activeTab;
      const matchesYear =
        selectedYear === "All" || doc.year.toString() === selectedYear;
      const matchesSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesYear && matchesSearch;
    });
  }, [activeTab, selectedYear, searchTerm]);

  // Reset to page 1 whenever tab or filter inputs change
  const handleTabChange = (type: "ordinance" | "resolution") => {
    setActiveTab(type);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleYearChange = (val: string) => {
    setSelectedYear(val);
    setCurrentPage(1);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage) || 1;
  const paginatedDocs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDocs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDocs, currentPage, itemsPerPage]);

  return (
    <section
      id="sanggunian"
      className="relative w-full min-h-screen py-20 sm:py-28 px-4 sm:px-8 bg-slate-50 text-slate-800 overflow-hidden flex flex-col items-center"
    >
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-0 right-1/4 w-160 h-120 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-140 h-140 bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-16"
      >
        {/* ================= 1. HEADER & EXECUTIVE MESSAGE ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-xs">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Legislative Branch of Lupi</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Sangguniang Bayan &{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Legislative Portal
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Crafting transparent, inclusive, and progressive legislation to
            steer the Municipality of Lupi toward sustainable growth and
            community empowerment.
          </p>
        </motion.div>

        {/* Vice Mayor Message Banner */}
        <motion.div
          variants={animate.itemVariants}
          className="rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-8"
        >
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative shrink-0">
            <img
              src={officials[0].image}
              alt={officials[0].name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-emerald-400/40 shadow-xl"
            />
            <span className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-emerald-500 text-slate-950 shadow-md">
              <Award className="w-5 h-5" />
            </span>
          </div>

          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Message from the Presiding Officer</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              {officials[0].name}
            </h3>
            <p className="text-xs text-emerald-300 font-semibold">
              {officials[0].position}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl italic">
              &ldquo;Welcome to our public legislative repository. Here, every
              citizen has direct access to the ordinances and resolutions
              enacted by your Sangguniang Bayan. Transparency in governance
              begins with open access to local laws that safeguard your rights
              and future.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* ================= 2. SANGGUNIANG MEMBERS GALLERY ================= */}
        <motion.div variants={animate.itemVariants} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Municipal Legislators
              </h3>
              <p className="text-xs text-slate-500">
                Members of the Sangguniang Bayan for the current term
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              11th Sangguniang Council
            </span>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {officials.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-200/50 p-4 flex flex-col items-center text-center group hover:border-emerald-300 transition-all"
              >
                <div className="relative mb-3 w-full aspect-square rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors leading-tight">
                  {member.name}
                </h4>
                <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                  {member.position}
                </p>
                <p className="text-[10px] text-slate-500 mt-2 line-clamp-2">
                  {member.committee}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= 3. LEGISLATIVE PORTAL & FILTER BAR ================= */}
        <motion.div variants={animate.itemVariants} className="space-y-8 pt-4">
          {/* Controls Bar: Tabs + Search + Year Filter */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/40">
            {/* Tab Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80">
              <button
                onClick={() => handleTabChange("ordinance")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "ordinance"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Municipal Ordinances</span>
              </button>

              <button
                onClick={() => handleTabChange("resolution")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "resolution"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>SB Resolutions</span>
              </button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}s...`}
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              {/* Year Dropdown */}
              <div className="relative w-full sm:w-36">
                <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <select
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer transition-all"
                >
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr === "All" ? "All Years" : `Year ${yr}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedDocs.length > 0 ? (
                paginatedDocs.map((doc) => (
                  <motion.div
                    key={doc.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-200/40 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xl transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Badge Row */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200/80">
                          {doc.number}
                        </span>
                        <span className="inline-flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                          <Calendar className="w-3 h-3" />
                          {doc.dateEnacted}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-600 transition-colors leading-snug">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                          {doc.summary}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Info & PDF Trigger */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          Main Author
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          {doc.author}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedPdf(doc)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-emerald-600 text-xs font-bold shadow-md transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View PDF</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
                  <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-semibold">
                    No legislative documents match your criteria.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* ================= PAGINATION CONTROLS ================= */}
          {filteredDocs.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-bold text-slate-800">
                  {Math.min(currentPage * itemsPerPage, filteredDocs.length)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-800">
                  {filteredDocs.length}
                </span>{" "}
                documents
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* ================= 4. PDF VIEWER MODAL ================= */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col border border-slate-200"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base">
                      {selectedPdf.number}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {selectedPdf.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedPdf.pdfUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Download Document"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedPdf(null)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="flex-1 w-full h-full bg-slate-100">
                <iframe
                  src={`${selectedPdf.pdfUrl}#toolbar=0`}
                  title={selectedPdf.title}
                  className="w-full h-full border-none"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
