import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  X,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Building,
  Sparkles,
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";

// Interfaces
export interface ReportItem {
  id: string;
  year: number;
  q1PdfUrl?: string;
  q2PdfUrl?: string;
  q3PdfUrl?: string;
  q4PdfUrl?: string;
}

export interface TransparencyPdfModal {
  title: string;
  year: number;
  quarter: string;
  pdfUrl: string;
}

export default function TransparencySection() {
  const animate = useInOutAnimation();

  // Active Tab & Filters State
  const [activeTab, setActiveTab] = useState<"trust" | "general">("trust");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedPdf, setSelectedPdf] = useState<TransparencyPdfModal | null>(
    null,
  );

  // Available Years
  const availableYears = ["All", "2026", "2025", "2024", "2023"];

  // 1. Trust Fund Utilization Dataset
  const trustFundReports: ReportItem[] = [
    {
      id: "tf-2026",
      year: 2026,
      q1PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q2PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "tf-2025",
      year: 2025,
      q1PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q2PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q3PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q4PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "tf-2024",
      year: 2024,
      q1PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q2PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q3PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q4PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "tf-2023",
      year: 2023,
      q1PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q2PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q3PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      q4PdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  // 2. Other Financial & Compliance Reports Dataset
  const generalReports = [
    {
      category: "20% National Tax Allotment (NTA) Utilization",
      idKey: "nta",
      reports: [
        {
          year: 2026,
          q1PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          q2PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
          year: 2025,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
        {
          year: 2024,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
      ],
    },
    {
      category: "Local Disaster Risk Reduction & Management Fund (LDRRMF)",
      idKey: "ldrrmf",
      reports: [
        {
          year: 2026,
          q1PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          q2PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
          year: 2025,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
        {
          year: 2024,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
      ],
    },
    {
      category: "Quarterly Statement of Cash Flow",
      idKey: "cashflow",
      reports: [
        {
          year: 2026,
          q1PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          q2PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
          year: 2025,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
        {
          year: 2024,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
      ],
    },
    {
      category:
        "Bid Results on Civil Works, Goods & Services, and Consulting Services",
      idKey: "bids",
      reports: [
        {
          year: 2026,
          q1PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          q2PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
          year: 2025,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
        {
          year: 2024,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
      ],
    },
    {
      category: "Special Education Fund (SEF) Utilization",
      idKey: "sef",
      reports: [
        {
          year: 2026,
          q1PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
          year: 2025,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
        {
          year: 2024,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
      ],
    },
    {
      category: "Unliquidated Cash Advances",
      idKey: "cash-advances",
      reports: [
        {
          year: 2026,
          q1PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
          year: 2025,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
        {
          year: 2024,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
      ],
    },
    {
      category: "Local Government Support Fund (LGSF)",
      idKey: "lgsf",
      reports: [
        {
          year: 2026,
          q1PdfUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
          year: 2025,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
        {
          year: 2024,
          q1PdfUrl: "#",
          q2PdfUrl: "#",
          q3PdfUrl: "#",
          q4PdfUrl: "#",
        },
      ],
    },
  ];

  // Filtering Logic for Trust Fund Table
  const filteredTrustFund = useMemo(() => {
    return trustFundReports.filter((item) => {
      const matchesYear =
        selectedYear === "All" || item.year.toString() === selectedYear;
      const matchesSearch = item.year.toString().includes(searchTerm);
      return matchesYear && matchesSearch;
    });
  }, [selectedYear, searchTerm]);

  // Filtering Logic for General Reports Section
  const filteredGeneralReports = useMemo(() => {
    return generalReports
      .map((cat) => {
        const filteredList = cat.reports.filter((rep) => {
          const matchesYear =
            selectedYear === "All" || rep.year.toString() === selectedYear;
          const matchesSearch =
            cat.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rep.year.toString().includes(searchTerm);
          return matchesYear && matchesSearch;
        });

        return { ...cat, reports: filteredList };
      })
      .filter((cat) => cat.reports.length > 0);
  }, [selectedYear, searchTerm]);

  // Reusable PDF Icon Button component for light mode
  const RenderPdfButton = ({
    pdfUrl,
    title,
    year,
    quarter,
  }: {
    pdfUrl?: string;
    title: string;
    year: number;
    quarter: string;
  }) => {
    if (!pdfUrl) {
      return (
        <span className="text-[11px] font-medium text-slate-400 italic">
          Pending
        </span>
      );
    }

    return (
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedPdf({ title, year, quarter, pdfUrl })}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-200/90 shadow-xs text-xs font-bold transition-all cursor-pointer group"
        title={`View ${quarter} PDF`}
      >
        <FileText className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white transition-colors" />
        <span>{quarter}</span>
        <Eye className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    );
  };

  return (
    <section
      id="transparency"
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
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-14"
      >
        {/* ================= 1. SECTION HEADER ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Full Disclosure Policy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Full Disclosure &{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Financial Reports
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            In compliance with the Department of the Interior and Local
            Government (DILG) Full Disclosure Policy, the Municipality of Lupi
            presents all quarterly public funds, procurements, and
            administrative accounts.
          </p>
        </motion.div>

        {/* Highlight KPI Cards */}
        <motion.div
          variants={animate.itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-100/80 text-emerald-700 border border-emerald-200">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                100% Compliance
              </p>
              <h3 className="text-base font-extrabold text-slate-900">
                DILG FDP Standards
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-teal-100/80 text-teal-700 border border-teal-200">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Updated Real-Time
              </p>
              <h3 className="text-base font-extrabold text-slate-900">
                Quarterly Disclosures
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-cyan-100/80 text-cyan-700 border border-cyan-200">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Open Data Portal
              </p>
              <h3 className="text-base font-extrabold text-slate-900">
                Public Audit Ready
              </h3>
            </div>
          </div>
        </motion.div>

        {/* ================= 2. CONTROLS BAR ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/40"
        >
          {/* Tab Selection */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80">
            <button
              onClick={() => setActiveTab("trust")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "trust"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Trust Fund Utilization</span>
            </button>

            <button
              onClick={() => setActiveTab("general")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "general"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Financial & Procurement Reports</span>
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search reports or year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            {/* Year Selector */}
            <div className="relative w-full sm:w-36">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
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
        </motion.div>

        {/* ================= 3. TAB CONTENT 1: TRUST FUND UTILIZATION ================= */}
        {activeTab === "trust" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xl shadow-slate-200/50"
          >
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Trust Fund Utilization Reports
                </h3>
                <p className="text-xs text-slate-500">
                  Quarterly disbursements and trust account statements
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Updated Calendar Year {new Date().getFullYear()}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 text-slate-600 font-extrabold uppercase border-b border-slate-200">
                    <th className="py-4 px-6">Calendar Year</th>
                    <th className="py-4 px-6 text-center">Quarter 1</th>
                    <th className="py-4 px-6 text-center">Quarter 2</th>
                    <th className="py-4 px-6 text-center">Quarter 3</th>
                    <th className="py-4 px-6 text-center">Quarter 4</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredTrustFund.length > 0 ? (
                    filteredTrustFund.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-4 px-6 font-extrabold text-emerald-700 text-sm">
                          {row.year}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <RenderPdfButton
                            pdfUrl={row.q1PdfUrl}
                            title="Trust Fund Utilization"
                            year={row.year}
                            quarter="Q1"
                          />
                        </td>
                        <td className="py-4 px-6 text-center">
                          <RenderPdfButton
                            pdfUrl={row.q2PdfUrl}
                            title="Trust Fund Utilization"
                            year={row.year}
                            quarter="Q2"
                          />
                        </td>
                        <td className="py-4 px-6 text-center">
                          <RenderPdfButton
                            pdfUrl={row.q3PdfUrl}
                            title="Trust Fund Utilization"
                            year={row.year}
                            quarter="Q3"
                          />
                        </td>
                        <td className="py-4 px-6 text-center">
                          <RenderPdfButton
                            pdfUrl={row.q4PdfUrl}
                            title="Trust Fund Utilization"
                            year={row.year}
                            quarter="Q4"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-slate-400"
                      >
                        No Trust Fund reports found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ================= 4. TAB CONTENT 2: OTHER FINANCIAL & COMPLIANCE REPORTS ================= */}
        {activeTab === "general" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {filteredGeneralReports.length > 0 ? (
              filteredGeneralReports.map((catGroup) => (
                <div
                  key={catGroup.idKey}
                  className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-md shadow-slate-200/40"
                >
                  <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      {catGroup.category}
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100/70 text-slate-600 font-extrabold uppercase border-b border-slate-200">
                          <th className="py-3.5 px-6">Year</th>
                          <th className="py-3.5 px-6 text-center">Quarter 1</th>
                          <th className="py-3.5 px-6 text-center">Quarter 2</th>
                          <th className="py-3.5 px-6 text-center">Quarter 3</th>
                          <th className="py-3.5 px-6 text-center">Quarter 4</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {catGroup.reports.map((rep) => (
                          <tr
                            key={rep.year}
                            className="hover:bg-slate-50/80 transition-colors"
                          >
                            <td className="py-3.5 px-6 font-extrabold text-teal-700">
                              {rep.year}
                            </td>
                            <td className="py-3.5 px-6 text-center">
                              <RenderPdfButton
                                pdfUrl={rep.q1PdfUrl}
                                title={catGroup.category}
                                year={rep.year}
                                quarter="Q1"
                              />
                            </td>
                            <td className="py-3.5 px-6 text-center">
                              <RenderPdfButton
                                pdfUrl={rep.q2PdfUrl}
                                title={catGroup.category}
                                year={rep.year}
                                quarter="Q2"
                              />
                            </td>
                            <td className="py-3.5 px-6 text-center">
                              <RenderPdfButton
                                pdfUrl={rep.q3PdfUrl}
                                title={catGroup.category}
                                year={rep.year}
                                quarter="Q3"
                              />
                            </td>
                            <td className="py-3.5 px-6 text-center">
                              <RenderPdfButton
                                pdfUrl={rep.q4PdfUrl}
                                title={catGroup.category}
                                year={rep.year}
                                quarter="Q4"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
                No financial reports match your selected search or filter.
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* ================= 5. PDF VIEWER MODAL ================= */}
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
              className="relative w-full max-w-5xl h-[85vh] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                      {selectedPdf.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedPdf.year} • {selectedPdf.quarter} Official Report
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
                    title="Download PDF"
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

              {/* Embedded Interactive Viewer */}
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
