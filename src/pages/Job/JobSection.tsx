import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Search,
  Building2,
  UserCheck,
  Clock,
  X,
  Send,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import useInOutAnimation from "@/hooks/useInOutAnimation";

// Interfaces based on CSC standard job posting form
export interface JobVacancy {
  id: string;
  itemNo: number;
  positionTitle: string;
  parentheticalTitle?: string;
  plantillaItemNo: string;
  salaryGrade: number;
  monthlySalary: string;
  education: string;
  training: string;
  experience: string;
  eligibility: string;
  competency?: string;
  placeOfAssignment: string;
  companyName: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  emailAddress: string;
  noOfPersonRequired: number;
  deadline: string;
  postedDate: string;
  department: string;
  employmentType: "Permanent" | "Contractual" | "Casual";
}

export default function JobVacanciesSection() {
  const animate = useInOutAnimation();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Adjust items per page as needed

  // Sample Datasets matching Philippine LGU Plantilla format
  const jobVacancies: JobVacancy[] = [
    {
      id: "job-1",
      itemNo: 1,
      positionTitle: "Information Technology Officer I",
      plantillaItemNo: "1-40",
      salaryGrade: 19,
      monthlySalary: "46,221.00",
      education: "Bachelor's degree relevant to the job",
      training: "8 hours relevant training",
      experience: "2 years of relevant experience",
      eligibility: "Career Service (Professional) / Second Level Eligibility",
      competency: "Systems Administration, Web Development, Database Management",
      placeOfAssignment: "Office of the Municipal Mayor",
      companyName: "Municipality of Pulilan",
      address: "Poblacion, Pulilan, Bulacan",
      contactPerson: "Elena C. Esguerra",
      contactNumber: "(044) 769-1206",
      emailAddress: "hrmo@pulilan.gov.ph",
      noOfPersonRequired: 1,
      deadline: "August 17, 2026",
      postedDate: "August 1, 2026",
      department: "Mayor's Office",
      employmentType: "Permanent",
    },
    {
      id: "job-2",
      itemNo: 2,
      positionTitle: "Administrative Officer V",
      parentheticalTitle: "HRMO III",
      plantillaItemNo: "2-12",
      salaryGrade: 18,
      monthlySalary: "43,681.00",
      education: "Bachelor's degree relevant to the job",
      training: "8 hours relevant training",
      experience: "2 years of relevant experience",
      eligibility: "Career Service (Professional) / Second Level Eligibility",
      competency: "Personnel Administration, Talent Acquisition, CSC Compliance",
      placeOfAssignment: "Human Resource Management Office",
      companyName: "Municipality of Pulilan",
      address: "Poblacion, Pulilan, Bulacan",
      contactPerson: "Elena C. Esguerra",
      contactNumber: "(044) 769-1206",
      emailAddress: "hrmo@pulilan.gov.ph",
      noOfPersonRequired: 1,
      deadline: "August 20, 2026",
      postedDate: "August 2, 2026",
      department: "HRMO",
      employmentType: "Permanent",
    },
    {
      id: "job-3",
      itemNo: 3,
      positionTitle: "Disaster Risk Reduction & Management Officer II",
      plantillaItemNo: "5-08",
      salaryGrade: 15,
      monthlySalary: "35,097.00",
      education: "Bachelor's degree relevant to the job",
      training: "4 hours relevant training",
      experience: "1 year of relevant experience",
      eligibility: "Career Service (Professional) / Second Level Eligibility",
      competency: "Emergency Response, Hazard Mapping, Disaster Planning",
      placeOfAssignment: "MDRRMO Operations Center",
      companyName: "Municipality of Pulilan",
      address: "Poblacion, Pulilan, Bulacan",
      contactPerson: "Elena C. Esguerra",
      contactNumber: "(044) 769-1206",
      emailAddress: "hrmo@pulilan.gov.ph",
      noOfPersonRequired: 2,
      deadline: "August 25, 2026",
      postedDate: "August 5, 2026",
      department: "MDRRMO",
      employmentType: "Permanent",
    },
    {
      id: "job-4",
      itemNo: 4,
      positionTitle: "Accountant II",
      plantillaItemNo: "3-15",
      salaryGrade: 16,
      monthlySalary: "38,150.00",
      education: "Bachelor's degree in Commerce/Business Administration major in Accounting",
      training: "4 hours relevant training",
      experience: "1 year of relevant experience",
      eligibility: "RA 1080 (CPA)",
      competency: "Government Accounting, Auditing, Financial Reconciliation",
      placeOfAssignment: "Office of the Municipal Accountant",
      companyName: "Municipality of Pulilan",
      address: "Poblacion, Pulilan, Bulacan",
      contactPerson: "Elena C. Esguerra",
      contactNumber: "(044) 769-1206",
      emailAddress: "hrmo@pulilan.gov.ph",
      noOfPersonRequired: 1,
      deadline: "August 28, 2026",
      postedDate: "August 6, 2026",
      department: "Accounting",
      employmentType: "Permanent",
    },
    {
      id: "job-5",
      itemNo: 5,
      positionTitle: "Administrative Assistant III",
      parentheticalTitle: "Computer Operator II",
      plantillaItemNo: "1-52",
      salaryGrade: 9,
      monthlySalary: "21,211.00",
      education: "Completion of 2 years studies in college or High School Graduate with relevant vocational course",
      training: "4 hours relevant training",
      experience: "1 year of relevant experience",
      eligibility: "Career Service (Subprofessional) / First Level Eligibility",
      competency: "Data Entry, Records Management",
      placeOfAssignment: "Office of the Municipal Mayor",
      companyName: "Municipality of Pulilan",
      address: "Poblacion, Pulilan, Bulacan",
      contactPerson: "Elena C. Esguerra",
      contactNumber: "(044) 769-1206",
      emailAddress: "hrmo@pulilan.gov.ph",
      noOfPersonRequired: 1,
      deadline: "August 30, 2026",
      postedDate: "August 7, 2026",
      department: "Mayor's Office",
      employmentType: "Permanent",
    },
  ];

  // Search Logic
  const searchedJobs = useMemo(() => {
    const searchLower = searchTerm.trim().toLowerCase();
    if (!searchLower) return jobVacancies;

    return jobVacancies.filter(
      (job) =>
        job.positionTitle.toLowerCase().includes(searchLower) ||
        job.placeOfAssignment.toLowerCase().includes(searchLower) ||
        job.plantillaItemNo.toLowerCase().includes(searchLower) ||
        job.department.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  // Reset to Page 1 on Search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination Calculations
  const totalPages = Math.ceil(searchedJobs.length / itemsPerPage);
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return searchedJobs.slice(start, start + itemsPerPage);
  }, [searchedJobs, currentPage, itemsPerPage]);

  return (
    <section
      id="careers"
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
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12"
      >
        {/* ================= 1. SECTION HEADER ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-xs">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span>Join Our Team</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Career Opportunities &{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Job Vacancies
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Explore open public service positions and plantilla items. Become part of our municipal workforce in delivering excellence to our citizens.
          </p>
        </motion.div>

        {/* ================= 2. SEARCH BAR ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="flex items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/40 max-w-2xl mx-auto w-full"
        >
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by position title, department, or plantilla item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>
        </motion.div>

        {/* ================= 3. JOB CARDS GRID ================= */}
        <motion.div
          variants={animate.containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={animate.itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedJob(job)}
                className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-300 shadow-slate-200/50 transition-all cursor-pointer flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold border border-emerald-200">
                      Salary Grade {job.salaryGrade}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Apply by: {job.deadline}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                      {job.positionTitle}
                    </h3>
                    {job.parentheticalTitle && (
                      <p className="text-xs font-semibold text-slate-500">
                        ({job.parentheticalTitle})
                      </p>
                    )}
                    <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {job.placeOfAssignment}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Monthly Salary
                      </span>
                      <span className="font-extrabold text-emerald-700">
                        ₱{job.monthlySalary}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Plantilla Item
                      </span>
                      <span className="font-bold text-slate-700">
                        {job.plantillaItemNo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>{job.noOfPersonRequired} Slot(s) Available</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
              No job vacancies match your search criteria.
            </div>
          )}
        </motion.div>

        {/* ================= 4. PAGINATION CONTROLS ================= */}
        {totalPages > 1 && (
          <motion.div
            variants={animate.itemVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/80"
          >
            <p className="text-xs text-slate-500 font-medium">
              Showing{" "}
              <strong className="text-slate-900">
                {(currentPage - 1) * itemsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong className="text-slate-900">
                {Math.min(currentPage * itemsPerPage, searchedJobs.length)}
              </strong>{" "}
              of <strong className="text-slate-900">{searchedJobs.length}</strong> vacancies
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all cursor-pointer disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all cursor-pointer disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ================= 5. DETAILED JOB MODAL ================= */}
      <AnimatePresence>
        {selectedJob && (
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
              {/* Modal Header */}
              <div className="sticky top-0 z-20 px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base leading-tight">
                      Civil Service Job Vacancy Notice
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedJob.companyName} • Posted {selectedJob.postedDate}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-8 text-slate-800">
                {/* Contact Information Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <strong className="text-slate-900 font-extrabold w-36">Company Name:</strong>
                      <span className="text-slate-700">{selectedJob.companyName}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <strong className="text-slate-900 font-extrabold w-36">Address:</strong>
                      <span className="text-slate-700">{selectedJob.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <strong className="text-slate-900 font-extrabold w-36">Contact Person:</strong>
                      <span className="text-slate-700">{selectedJob.contactPerson}</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <strong className="text-slate-900 font-extrabold w-36">Contact Number:</strong>
                      <span className="text-slate-700">{selectedJob.contactNumber}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <strong className="text-slate-900 font-extrabold w-36">Email Address:</strong>
                      <span className="text-emerald-700 font-semibold">{selectedJob.emailAddress}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <strong className="text-slate-900 font-extrabold w-36">No. of Person Required:</strong>
                      <span className="font-extrabold text-slate-900">{selectedJob.noOfPersonRequired}</span>
                    </p>
                  </div>
                </div>

                {/* Position Details Table */}
                <div className="border border-slate-300 rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-xs sm:text-sm text-left border-collapse">
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="w-1/3 py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          No
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-800">
                          {selectedJob.itemNo}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Position Title (Parenthetical Title, if applicable)
                        </td>
                        <td className="py-3.5 px-5 font-bold text-emerald-800">
                          {selectedJob.positionTitle}{" "}
                          {selectedJob.parentheticalTitle && `(${selectedJob.parentheticalTitle})`}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Plantilla Item No.
                        </td>
                        <td className="py-3.5 px-5 font-medium text-slate-800">
                          {selectedJob.plantillaItemNo}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Salary/ Job/ Pay Grade
                        </td>
                        <td className="py-3.5 px-5 font-medium text-slate-800">
                          {selectedJob.salaryGrade}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Monthly Salary
                        </td>
                        <td className="py-3.5 px-5 font-extrabold text-slate-900">
                          ₱{selectedJob.monthlySalary}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Education
                        </td>
                        <td className="py-3.5 px-5 text-slate-800">
                          {selectedJob.education}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Training
                        </td>
                        <td className="py-3.5 px-5 text-slate-800">
                          {selectedJob.training}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Experience
                        </td>
                        <td className="py-3.5 px-5 text-slate-800">
                          {selectedJob.experience}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Eligibility
                        </td>
                        <td className="py-3.5 px-5 text-slate-800">
                          {selectedJob.eligibility}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Competency (if applicable)
                        </td>
                        <td className="py-3.5 px-5 text-slate-800">
                          {selectedJob.competency || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-5 font-bold bg-slate-100 text-slate-900 border-r border-slate-300">
                          Place of Assignment
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-800">
                          {selectedJob.placeOfAssignment}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Application Instructions */}
                <div className="space-y-4 pt-2">
                  <p className="text-xs sm:text-sm text-slate-700">
                    Interested and qualified applicants should signify their interest in writing. Attach the following documents to the application letter and send to the address below not later than{" "}
                    <strong className="text-slate-900 font-extrabold underline decoration-emerald-500 underline-offset-4">
                      {selectedJob.deadline}
                    </strong>.
                  </p>

                  <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-slate-700 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200/80">
                    <li>
                      Fully accomplished <strong>Personal Data Sheet (PDS)</strong> with recent passport-sized picture (CS Form No. 212, Revised 2017) which can be downloaded at{" "}
                      <a
                        href="http://www.csc.gov.ph"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 underline font-bold hover:text-emerald-800"
                      >
                        www.csc.gov.ph
                      </a>;
                    </li>
                    <li>Performance rating in the last rating period (if applicable);</li>
                    <li>Photocopy of certificate of eligibility/rating/license; and</li>
                    <li>Photocopy of Transcript of Records (TOR).</li>
                  </ol>
                </div>

                {/* Email Apply CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 text-white">
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base">Ready to Submit Your Application?</h4>
                    <p className="text-xs text-slate-400">
                      Send your complete documents to <span className="text-emerald-400">{selectedJob.emailAddress}</span>
                    </p>
                  </div>
                  <a
                    href={`mailto:${selectedJob.emailAddress}?subject=Application for ${selectedJob.positionTitle}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply via Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}