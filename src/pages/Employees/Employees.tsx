import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OfficeCard from "./component/OfficeCard";
import { Bell, Search, X, Users, Mail, Phone } from "lucide-react";
import { BsBank } from "react-icons/bs";
import { FaRegHospital } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";

// Types
interface Employee {
  id: string;
  name: string;
  position: string;
  email?: string;
  phone?: string;
  isHead?: boolean;
}

interface Office {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
  employees: Employee[];
}

export default function Employees() {
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [filterQuery, setFilterQuery] = useState("");

  const offices: Office[] = [
    {
      title: "Mayor's Office",
      value: 20,
      icon: <BsBank />,
      description:
        "Executive direction, public policy, and overall municipal leadership.",
      employees: [
        {
          id: "1",
          name: "Hon. Municipal Mayor",
          position: "Mayor",
          email: "mayor@lupi.gov.ph",
          isHead: true,
        },
        {
          id: "2",
          name: "Maria Santos",
          position: "Executive Assistant IV",
          email: "m.santos@lupi.gov.ph",
        },
        { id: "3", name: "Ricardo Gomez", position: "Private Secretary" },
      ],
    },
    {
      title: "RHU",
      value: 26,
      icon: <FaRegHospital />,
      description:
        "Primary healthcare, maternal care, and community health services.",
      employees: [
        {
          id: "1",
          name: "Dr. Ana Reyes, MD",
          position: "Municipal Health Officer",
          email: "rhu@lupi.gov.ph",
          isHead: true,
        },
        { id: "2", name: "Elena Ramos, RN", position: "Public Health Nurse" },
      ],
    },
    {
      title: "Treasury Office",
      value: 16,
      icon: <FaMoneyBills />,
      description:
        "Revenue collection, license assessments, and disbursements.",
      employees: [
        {
          id: "1",
          name: "Roberto Tan",
          position: "Municipal Treasurer",
          isHead: true,
        },
      ],
    },
    {
      title: "Accounting Office",
      value: 16,
      icon: <FaMoneyBills />,
      description:
        "Financial accounting, auditing, and municipal budget tracking.",
      employees: [
        {
          id: "1",
          name: "Clara Garcia, CPA",
          position: "Municipal Accountant",
          isHead: true,
        },
      ],
    },
    {
      title: "Assessor Office",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Engr. David Flores",
          position: "Municipal Assessor",
          isHead: true,
        },
      ],
    },
    {
      title: "Budget Office",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Sonia Villanueva",
          position: "Municipal Budget Officer",
          isHead: true,
        },
      ],
    },
    {
      title: "DILG",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "LGOO V Mark Anthony",
          position: "MLGOO Officer",
          isHead: true,
        },
      ],
    },
    {
      title: "Electrician",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Juan Mercado",
          position: "Chief Electrician",
          isHead: true,
        },
      ],
    },
    {
      title: "Engineering",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Engr. Ramon Castillo",
          position: "Municipal Engineer",
          isHead: true,
        },
      ],
    },
    {
      title: "General Services",
      value: 20,
      icon: <BsBank />,
      employees: [
        { id: "1", name: "Pedro Gomez", position: "GSO Officer", isHead: true },
      ],
    },
    {
      title: "HRMO",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Patricia Aquino",
          position: "HRM Officer",
          isHead: true,
        },
      ],
    },
    {
      title: "Kalahi",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Luzviminda Cruz",
          position: "Area Coordinator",
          isHead: true,
        },
      ],
    },
    {
      title: "LCR",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Manuel Roxas",
          position: "Civil Registrar",
          isHead: true,
        },
      ],
    },
    {
      title: "LWSS",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Danilo Perez",
          position: "LWSS Manager",
          isHead: true,
        },
      ],
    },
    {
      title: "MASO",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Benita Morales",
          position: "Municipal Agriculturist",
          isHead: true,
        },
      ],
    },
    {
      title: "MDR",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Gabriel Soriano",
          position: "MDRRM Officer",
          isHead: true,
        },
      ],
    },
    {
      title: "MENRO",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Teresa Aquilino",
          position: "MENR Officer",
          isHead: true,
        },
      ],
    },
    {
      title: "MNAO",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Carmen Laurel",
          position: "MNA Officer",
          isHead: true,
        },
      ],
    },
    {
      title: "MPDO",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Arch. Jose Mari",
          position: "MPDC Officer",
          isHead: true,
        },
      ],
    },
    {
      title: "MSDWDO",
      value: 20,
      icon: <BsBank />,
      employees: [
        {
          id: "1",
          name: "Francisca Silva",
          position: "MSWD Officer",
          isHead: true,
        },
      ],
    },
  ];

  const filteredEmployees = selectedOffice?.employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  return (
    <section className="min-h-screen w-screen relative py-20 lg:px-20 px-5 flex flex-col items-center bg-slate-50">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mt-5 lg:mt-10 md:mt-10 bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide mb-3">
        <Bell className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
        <span>Serving with Excellence</span>
      </div>

      <h1 className="font-extrabold lg:text-6xl text-4xl tracking-tight text-slate-900">
        Meet{" "}
        <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Our Team
        </span>
      </h1>

      <p className="text-slate-500 tracking-wide mt-5 text-center max-w-2xl">
        Dedicated public servants committed to delivering quality services to
        the people of Lupi.
      </p>

      {/* Grid displaying the original OfficeCard design */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-5 mt-10">
        {offices.map((data, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOffice(data);
              setFilterQuery("");
            }}
            className="cursor-pointer transition-transform duration-200 hover:-translate-y-1"
          >
            <OfficeCard
              title={data.title}
              value={data.value}
              icon={data.icon}
            />
          </div>
        ))}
      </div>

      {/* Light-Themed Interactive Modal for Showing Department Employees */}
      <AnimatePresence>
        {selectedOffice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOffice(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-6 bg-slate-100/80 border-b border-slate-200 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 text-xl border border-emerald-200">
                    {selectedOffice.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-800">
                        {selectedOffice.title}
                      </h2>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {selectedOffice.value} Staff
                      </span>
                    </div>
                    {selectedOffice.description && (
                      <p className="mt-1 text-xs text-slate-500">
                        {selectedOffice.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOffice(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Search */}
              <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={`Search personnel in ${selectedOffice.title}...`}
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              {/* Employee List */}
              <div className="p-6 overflow-y-auto space-y-3 flex-1 bg-slate-50/30">
                {filteredEmployees && filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        emp.isHead
                          ? "border-emerald-300 bg-emerald-50/50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                            emp.isHead
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
                              {emp.name}
                            </h4>
                            {emp.isHead && (
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Department Head
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            {emp.position}
                          </p>
                        </div>
                      </div>

                      {(emp.email || emp.phone) && (
                        <div className="flex items-center gap-3 text-xs text-slate-500 sm:border-l sm:border-slate-200 sm:pl-3">
                          {emp.email && (
                            <a
                              href={`mailto:${emp.email}`}
                              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{emp.email}</span>
                            </a>
                          )}
                          {emp.phone && (
                            <a
                              href={`tel:${emp.phone}`}
                              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{emp.phone}</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-400 text-xs font-medium">
                      No personnel match your search.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-slate-100/60 border-t border-slate-200 text-center text-xs text-slate-500">
                Official Directory · Municipality of Lupi
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
