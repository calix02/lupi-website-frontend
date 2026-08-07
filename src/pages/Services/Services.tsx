import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  Clock,
  Download,
  X,
  CheckCircle2,
  AlertCircle,
  Coins,
  HeartPulse,
  Landmark,
  ShieldCheck,
  ChevronRight,
  FileText,
  ArrowLeft,
  Users,
  Briefcase,
  Sparkles,
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";

// Interfaces
export interface DownloadableForm {
  title: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

export interface ServiceStep {
  stepNo: number;
  title: string;
  description: string;
  officeOrWindow: string;
  duration: string;
}

export interface LGUService {
  id: string;
  title: string;
  description: string;
  targetClients: string;
  processingTime: string;
  fees: string;
  requirements: string[];
  steps: ServiceStep[];
  downloadableForms: DownloadableForm[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: any;
  services: LGUService[];
}

export default function LupiServicesSection() {
  const animate = useInOutAnimation();

  // State
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedService, setSelectedService] = useState<LGUService | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample Data tailored for LGU Lupi, Camarines Sur
  const departmentsData: Department[] = [
    {
      id: "dept-1",
      name: "Municipal Treasury & BPLO",
      code: "MTO",
      description:
        "Handles local tax administration, revenue collection, business permits, and licensing for Lupi citizens and enterprise owners.",
      icon: Coins,
      services: [
        {
          id: "s-101",
          title: "Application for New Business Permit",
          description: "Issuance of Mayor's Permit and municipal licenses for newly established businesses within Lupi.",
          targetClients: "Business Owners & Entrepreneurs",
          processingTime: "1 to 2 Working Days",
          fees: "Varies based on capital investment & Mayor's Permit Tax Code",
          requirements: [
            "DTI / SEC / CDA Registration Certificate",
            "Barangay Business Clearance",
            "Occupancy Permit or Lease Contract",
            "Community Tax Certificate (Cedula)",
          ],
          steps: [
            {
              stepNo: 1,
              title: "Requirement Evaluation",
              description: "Present verified documents at BPLO Counter for checking.",
              officeOrWindow: "BPLO Window 1",
              duration: "15 minutes",
            },
            {
              stepNo: 2,
              title: "Tax Assessment",
              description: "Computation of Tax Order of Payment (TOP) according to local revenue code.",
              officeOrWindow: "Treasury Counter 2",
              duration: "20 minutes",
            },
            {
              stepNo: 3,
              title: "Payment Collection",
              description: "Pay corresponding fees and receive Official Receipt.",
              officeOrWindow: "Treasury Cashier Window 4",
              duration: "10 minutes",
            },
            {
              stepNo: 4,
              title: "Permit Release",
              description: "Claim signed Mayor's Permit, business plate, and stickers.",
              officeOrWindow: "BPLO Releasing Desk",
              duration: "20 minutes",
            },
          ],
          downloadableForms: [
            {
              title: "Unified Business Permit Application Form",
              fileSize: "230 KB",
              fileType: "PDF",
              downloadUrl: "#",
            },
          ],
        },
        {
          id: "s-102",
          title: "Payment of Real Property Tax (RPT)",
          description: "Assessment and collection of basic tax on land, buildings, and machinery located in Lupi.",
          targetClients: "Property Owners & Taxpayers",
          processingTime: "20 Minutes",
          fees: "Based on Tax Declaration Assessment Value",
          requirements: [
            "Previous Year Official Receipt or Tax Declaration Copy",
            "Valid Government ID",
          ],
          steps: [
            {
              stepNo: 1,
              title: "Tax Computation",
              description: "Submit Tax Declaration copy for current statement of account.",
              officeOrWindow: "RPT Counter 1",
              duration: "10 minutes",
            },
            {
              stepNo: 2,
              title: "Payment & Receipt Issuance",
              description: "Pay tax amount due and receive official RPT receipt.",
              officeOrWindow: "Treasury Cashier",
              duration: "10 minutes",
            },
          ],
          downloadableForms: [
            {
              title: "Real Property Tax Assessment Request Slip",
              fileSize: "110 KB",
              fileType: "PDF",
              downloadUrl: "#",
            },
          ],
        },
      ],
    },
    {
      id: "dept-2",
      name: "Municipal Civil Registrar",
      code: "MCR",
      description: "Responsible for recording and preserving vital events such as births, marriages, and deaths occurring within Lupi.",
      icon: Landmark,
      services: [
        {
          id: "s-201",
          title: "Issuance of Birth Certificate (Certified True Copy)",
          description: "Request official annotated or certified true copies of registered birth certificates.",
          targetClients: "General Public",
          processingTime: "30 Minutes",
          fees: "₱150.00 per copy + ₱30.00 Documentary Stamp Tax",
          requirements: [
            "Valid Government-issued ID of owner",
            "Authorization Letter and ID if requested by representative",
            "Detailed birth particulars (Date, Place, Parent Names)",
          ],
          steps: [
            {
              stepNo: 1,
              title: "Filing Request",
              description: "Fill out request form and submit at Civil Registry window.",
              officeOrWindow: "MCR Window 1",
              duration: "10 minutes",
            },
            {
              stepNo: 2,
              title: "Verification & Payment",
              description: "Database lookup and fee payment at collector.",
              officeOrWindow: "Treasury Counter",
              duration: "10 minutes",
            },
            {
              stepNo: 3,
              title: "Document Release",
              description: "Receive certified copy with municipal seal.",
              officeOrWindow: "MCR Releasing Counter",
              duration: "10 minutes",
            },
          ],
          downloadableForms: [
            {
              title: "Civil Registry Request Form",
              fileSize: "145 KB",
              fileType: "PDF",
              downloadUrl: "#",
            },
          ],
        },
        {
          id: "s-202",
          title: "Application for Marriage License",
          description: "Processing requirements and license issuance for couples intending to marry in Lupi.",
          targetClients: "Contracting Parties",
          processingTime: "10 Days Posting + 1 Day Processing",
          fees: "₱300.00 Marriage License Fee",
          requirements: [
            "PSA Birth Certificate of both parties",
            "CENOMAR from PSA",
            "Barangay Clearance & Community Tax Certificate",
            "Pre-Marriage Counseling Certificate",
          ],
          steps: [
            {
              stepNo: 1,
              title: "Document Screening",
              description: "Submit all prerequisites for completeness review.",
              officeOrWindow: "MCR Desk 3",
              duration: "30 minutes",
            },
            {
              stepNo: 2,
              title: "Notice Posting",
              description: "10 consecutive days posting of marriage application notice.",
              officeOrWindow: "Municipal Bulletin Board",
              duration: "10 Days",
            },
            {
              stepNo: 3,
              title: "License Claiming",
              description: "Claim signed Marriage License after 10-day period.",
              officeOrWindow: "MCR Window 2",
              duration: "15 minutes",
            },
          ],
          downloadableForms: [
            {
              title: "Marriage License Application Form",
              fileSize: "310 KB",
              fileType: "PDF",
              downloadUrl: "#",
            },
          ],
        },
      ],
    },
    {
      id: "dept-3",
      name: "Municipal Engineering & Building Official",
      code: "ME",
      description: "Regulates infrastructure, structural integrity, and issues building, electrical, and zoning clearances in Lupi.",
      icon: Building2,
      services: [
        {
          id: "s-301",
          title: "Application for Building Permit",
          description: "Securing official construction authorization for residential, commercial, or public projects.",
          targetClients: "Property Owners & Contractors",
          processingTime: "3 to 5 Working Days",
          fees: "Based on structural floor area and classification",
          requirements: [
            "5 Sets of Architectural & Engineering Plans (Signed/Sealed)",
            "Certified True Copy of Transfer Certificate of Title (TCT)",
            "Zoning Clearance & Barangay Construction Clearance",
          ],
          steps: [
            {
              stepNo: 1,
              title: "Plans Submission",
              description: "Submit 5 blueprint sets and documents for technical evaluation.",
              officeOrWindow: "Engineering Office Window 1",
              duration: "1 Day",
            },
            {
              stepNo: 2,
              title: "Site Inspection",
              description: "Municipal Engineer conducts site inspection.",
              officeOrWindow: "Field Inspection Unit",
              duration: "2 Days",
            },
            {
              stepNo: 3,
              title: "Permit Issuance",
              description: "Pay computed fees and claim official Building Permit.",
              officeOrWindow: "OBO Releasing Desk",
              duration: "30 minutes",
            },
          ],
          downloadableForms: [
            {
              title: "Unified Building Permit Application Form",
              fileSize: "420 KB",
              fileType: "PDF",
              downloadUrl: "#",
            },
            {
              title: "Electrical & Sanitary Permit Forms",
              fileSize: "280 KB",
              fileType: "ZIP",
              downloadUrl: "#",
            },
          ],
        },
      ],
    },
    {
      id: "dept-4",
      name: "Municipal Health Office & Social Welfare",
      code: "MHO & MSWDO",
      description: "Delivers healthcare programs, medical clearances, social services, and financial assistance to vulnerable Lupi residents.",
      icon: HeartPulse,
      services: [
        {
          id: "s-401",
          title: "Issuance of Medical Certificate & Health Card",
          description: "Health clearances for local workers, food handlers, and students.",
          targetClients: "Workers, Food Handlers, Students",
          processingTime: "1 Hour",
          fees: "₱100.00 Health Card Fee",
          requirements: [
            "1x1 ID Photo (2 copies)",
            "Chest X-Ray Result (Valid within 6 months)",
            "Stool & Urine Examination Results",
          ],
          steps: [
            {
              stepNo: 1,
              title: "Lab Results Screening",
              description: "Present lab tests to medical officer.",
              officeOrWindow: "MHO Consultation Room",
              duration: "20 minutes",
            },
            {
              stepNo: 2,
              title: "Physical Check & Lamination",
              description: "Undergo brief check and issue health card.",
              officeOrWindow: "Health Center Window 2",
              duration: "20 minutes",
            },
          ],
          downloadableForms: [
            {
              title: "Health Card Application & Medical Form",
              fileSize: "160 KB",
              fileType: "PDF",
              downloadUrl: "#",
            },
          ],
        },
      ],
    },
  ];

  // Search Logic
  const filteredDepartments = useMemo(() => {
    const searchLower = searchTerm.trim().toLowerCase();
    if (!searchLower) return departmentsData;

    return departmentsData
      .map((dept) => {
        const matchesDept =
          dept.name.toLowerCase().includes(searchLower) ||
          dept.description.toLowerCase().includes(searchLower);

        const matchingServices = dept.services.filter(
          (s) =>
            s.title.toLowerCase().includes(searchLower) ||
            s.description.toLowerCase().includes(searchLower)
        );

        if (matchesDept || matchingServices.length > 0) {
          return {
            ...dept,
            // If search matches specific services, keep only matching ones for focused table view
            services: matchingServices.length > 0 ? matchingServices : dept.services,
          };
        }
        return null;
      })
      .filter(Boolean) as Department[];
  }, [searchTerm]);

  return (
    <section
      id="services"
      className="relative w-full min-h-screen py-20 sm:py-28 px-4 sm:px-8 bg-slate-50 text-slate-800 overflow-hidden flex flex-col items-center"
    >
      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-10 left-1/4 w-[40rem] h-[30rem] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[35rem] h-[35rem] bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-12"
      >
        {/* ================= 1. HEADER SECTION ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Municipality of Lupi Public Services</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Offices &{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Citizen's Charter
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Select a municipal department to view its complete list of public services, step-by-step procedures, and downloadable application forms.
          </p>
        </motion.div>

        {/* ================= 2. SEARCH BAR ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="relative max-w-2xl mx-auto w-full"
        >
          <div className="flex items-center p-2 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/40">
            <Search className="ml-4 w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search departments or specific services (e.g. Building Permit, Birth Certificate)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2.5 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mr-2 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ================= 3. DEPARTMENT CARDS OR SERVICES TABLE ================= */}
        {!selectedDepartment ? (
          /* GRID OF DEPARTMENTS */
          <motion.div
            variants={animate.containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((dept) => {
                const IconComp = dept.icon;
                return (
                  <motion.div
                    key={dept.id}
                    variants={animate.itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedDepartment(dept)}
                    className="group relative p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-300 shadow-slate-200/50 transition-all cursor-pointer flex flex-col justify-between gap-6"
                  >
                    <div className="space-y-4">
                      {/* Top Badges & Icon */}
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200/80">
                          {dept.code}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {dept.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                          {dept.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{dept.services.length} Service(s) Available</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                        Explore Table
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
                No Lupi departments or services found matching "{searchTerm}".
              </div>
            )}
          </motion.div>
        ) : (
          /* DEPARTMENT SERVICES TABLE VIEW */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Table Navigation Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedDepartment(null)}
                  className="p-2.5 rounded-2xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Back to Departments"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="text-lg sm:text-xl font-black">
                    {selectedDepartment.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Services Listing & Citizen's Charter Guidelines
                  </p>
                </div>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-slate-800 text-emerald-400 border border-slate-700 text-xs font-bold">
                {selectedDepartment.services.length} Listed Service(s)
              </div>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="py-4 px-6">Service Title & Scope</th>
                      <th className="py-4 px-6">Target Clients</th>
                      <th className="py-4 px-6">Processing Time</th>
                      <th className="py-4 px-6 text-center">Action Guide</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {selectedDepartment.services.map((service) => (
                      <tr
                        key={service.id}
                        className="hover:bg-emerald-50/30 transition-colors"
                      >
                        <td className="py-4 px-6 max-w-xs sm:max-w-md">
                          <h4 className="font-extrabold text-slate-900 leading-snug">
                            {service.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {service.description}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-slate-700 font-medium">
                          {service.targetClients}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full text-xs">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            {service.processingTime}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => setSelectedService(service)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Guide & Forms</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ================= 4. STEP-BY-STEP GUIDANCE & FORMS MODAL ================= */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Modal Sticky Header */}
              <div className="sticky top-0 z-20 px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base leading-tight">
                      Service Step-by-Step Guide
                    </h3>
                    <p className="text-xs text-slate-400">
                      Municipality of Lupi Citizen's Charter
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-8 text-slate-800">
                {/* 1. Service Title & Overview */}
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {selectedService.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                {/* 2. Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">
                      Processing Time
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {selectedService.processingTime}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">
                      Fees & Charges
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700">
                      {selectedService.fees}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">
                      Target Clients
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {selectedService.targetClients}
                    </span>
                  </div>
                </div>

                {/* 3. Document Requirements */}
                <div className="space-y-3">
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-emerald-600" />
                    Required Documents & Prerequisites
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                    {selectedService.requirements.map((req, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Step-by-Step Guidance */}
                <div className="space-y-4">
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    Step-by-Step Application Procedure
                  </h4>

                  <div className="space-y-3">
                    {selectedService.steps.map((step) => (
                      <div
                        key={step.stepNo}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors"
                      >
                        <div className="flex items-start gap-3.5">
                          <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                            0{step.stepNo}
                          </span>
                          <div>
                            <h5 className="font-extrabold text-sm text-slate-900">
                              {step.title}
                            </h5>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {step.description}
                            </p>
                            <span className="inline-block mt-2 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                              Office: {step.officeOrWindow}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 self-end sm:self-center">
                          {step.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Downloadable Forms */}
                {selectedService.downloadableForms.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Download className="w-5 h-5 text-emerald-600" />
                      Downloadable Forms
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.downloadableForms.map((form, idx) => (
                        <a
                          key={idx}
                          href={form.downloadUrl}
                          className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer group shadow-md"
                        >
                          <div className="space-y-1">
                            <p className="text-xs font-bold group-hover:text-emerald-400 transition-colors">
                              {form.title}
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {form.fileType} • {form.fileSize}
                            </span>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-800 text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Download className="w-4 h-4" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}