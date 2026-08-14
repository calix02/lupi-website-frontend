import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Filter,
  Users,
  Award,
  Building2,
  X,
  ShieldCheck,
  RotateCcw,
  UserCheck,
  Info,
} from "lucide-react";
import StatisticCard from "./components/StatisticsCard";
import BarangayCard from "./components/BarangayCard";
import BarangayModal from "./components/BarangayModal";
import useInOutAnimation from "@/hooks/useInOutAnimation";

// ==========================================
// 1. DATA MODEL & CMS TYPES (Section 13)
// ==========================================

export interface BarangayOfficial {
  id: string;
  name: string;
  position:
    | "Barangay Captain"
    | "Kagawad"
    | "SK Chairperson"
    | "Barangay Secretary"
    | "Barangay Treasurer";
  photoUrl?: string;
  status: "Active" | "Inactive";
}

export interface BarangayService {
  id: string;
  title: string;
  description: string;
  requirements?: string[];
  processingTime?: string;
}

export interface BarangayProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: "Ongoing" | "Completed" | "Planned";
  date: string;
}

export interface BarangayItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  history: string;
  logoUrl?: string;
  coverImageUrl: string;
  population: number;
  households: number;
  areaKm2: number;
  status: "Active" | "Inactive";
  location: {
    latitude: number;
    longitude: number;
    address: string;
    nearbyLandmarks?: string[];
  };
  captain: BarangayOfficial;
  officials: BarangayOfficial[];
  contact: {
    address: string;
    phone?: string;
    email?: string;
    socialMedia?: string;
    officeHours?: string;
  };
  services: BarangayService[];
  projects: BarangayProject[];
  dataLastUpdated: string;
  dataVerifiedBy: string;
}

// ==========================================
// 2. MOCK DATA (PLACEHOLDERS FOR LGU LUPI)
// ==========================================

const MOCK_BARANGAYS: BarangayItem[] = [
  {
    id: "lupi-brgy-poblacion",
    name: "Poblacion",
    slug: "poblacion",
    description:
      "The municipal center of Lupi, serving as the hub for government activities, trade, cultural gatherings, and civic administration.",
    history:
      "Established as the administrative center of Lupi during early township development, Poblacion has historically hosted the municipal hall and primary public market.",
    logoUrl:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    coverImageUrl:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop",
    population: 3420,
    households: 780,
    areaKm2: 4.2,
    status: "Active",
    location: {
      latitude: 13.7845,
      longitude: 122.9011,
      address: "Poblacion, Lupi, Camarines Sur, 4409",
      nearbyLandmarks: [
        "Lupi Municipal Hall",
        "Poblacion Plaza",
        "Lupi Central School",
      ],
    },
    captain: {
      id: "cap-1",
      name: "Hon. Roberto V. Mendoza",
      position: "Barangay Captain",
      status: "Active",
      photoUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
    officials: [
      {
        id: "off-1",
        name: "Maria L. Santos",
        position: "Kagawad",
        status: "Active",
      },
      {
        id: "off-2",
        name: "Jose B. Reyes",
        position: "Kagawad",
        status: "Active",
      },
      {
        id: "off-3",
        name: "Carlos T. Cruz",
        position: "SK Chairperson",
        status: "Active",
      },
      {
        id: "off-4",
        name: "Elena P. Ramos",
        position: "Barangay Secretary",
        status: "Active",
      },
      {
        id: "off-5",
        name: "Grace D. Torres",
        position: "Barangay Treasurer",
        status: "Active",
      },
    ],
    contact: {
      address: "Barangay Hall, Main Street, Poblacion, Lupi, Camarines Sur",
      phone: "+63 (054) 881-2026",
      email: "poblacion@lupi.gov.ph",
      socialMedia: "facebook.com/BrgyPoblacionLupi",
      officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
    },
    services: [
      {
        id: "srv-1",
        title: "Barangay Clearance",
        description:
          "Official document issued for employment, business permits, and legal background verification.",
        processingTime: "15-30 Minutes",
      },
      {
        id: "srv-2",
        title: "Certificate of Indigency",
        description:
          "Issued to qualified low-income residents for medical, educational, or financial aid.",
        processingTime: "Same Day",
      },
      {
        id: "srv-3",
        title: "Certificate of Residency",
        description:
          "Verification of official residence within Barangay Poblacion.",
        processingTime: "15 Minutes",
      },
    ],
    projects: [
      {
        id: "prj-1",
        title: "Plaza Rehabilitation & Solar Lighting",
        description:
          "Installation of energy-efficient solar street lamps and beautification of the civic plaza.",
        imageUrl:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
        status: "Completed",
        date: "May 2026",
      },
      {
        id: "prj-2",
        title: "Barangay Disaster Resiliency Workshop",
        description:
          "Community training for typhoon preparedness and emergency response drills.",
        imageUrl:
          "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=600&auto=format&fit=crop",
        status: "Ongoing",
        date: "July 2026",
      },
    ],
    dataLastUpdated: "August 2026",
    dataVerifiedBy: "LGU Lupi Municipal Planning & Development Office",
  },
  {
    id: "lupi-brgy-san-isidro",
    name: "San Isidro",
    slug: "san-isidro",
    description:
      "An agricultural community dedicated to sustainable farming, rice production, and local agri-trade.",
    history:
      "Named after the patron saint of farmers, San Isidro has historically been the primary agricultural basket of the municipality.",
    logoUrl:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    coverImageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    population: 2150,
    households: 490,
    areaKm2: 8.5,
    status: "Active",
    location: {
      latitude: 13.7912,
      longitude: 122.9155,
      address: "San Isidro, Lupi, Camarines Sur, 4409",
      nearbyLandmarks: ["San Isidro Chapel", "Agri-Irrigation Canal"],
    },
    captain: {
      id: "cap-2",
      name: "Hon. Antonio K. Hernandez",
      position: "Barangay Captain",
      status: "Active",
      photoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
    officials: [
      {
        id: "off-21",
        name: "Danilo F. Aguinaldo",
        position: "Kagawad",
        status: "Active",
      },
      {
        id: "off-22",
        name: "Sonia M. Gutierrez",
        position: "Kagawad",
        status: "Active",
      },
    ],
    contact: {
      address: "San Isidro Barangay Hall, Lupi, Camarines Sur",
      phone: "+63 (054) 881-2099",
      email: "sanisidro@lupi.gov.ph",
      officeHours: "Monday - Friday: 8:00 AM - 5:00 PM",
    },
    services: [
      {
        id: "srv-21",
        title: "Farmer Assistance & Seed Distribution",
        description:
          "Coordination with Municipal Agriculture Office for localized farm input distribution.",
      },
    ],
    projects: [],
    dataLastUpdated: "August 2026",
    dataVerifiedBy: "LGU Lupi Municipal Planning & Development Office",
  },
  {
    id: "lupi-brgy-tan-awan",
    name: "Tan-awan",
    slug: "tan-awan",
    description:
      "Known for its elevated scenic views, lush green eco-trails, and natural freshwater sources.",
    history:
      "Derived from the Bicolano word 'Tan-awan' meaning lookout point, referencing its high vantage point over Lupi.",
    logoUrl:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
    coverImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
    population: 1840,
    households: 395,
    areaKm2: 12.1,
    status: "Active",
    location: {
      latitude: 13.801,
      longitude: 122.889,
      address: "Tan-awan, Lupi, Camarines Sur, 4409",
      nearbyLandmarks: ["Tan-awan Eco Park Trailhead", "Water Reservoir"],
    },
    captain: {
      id: "cap-3",
      name: "Hon. Elena S. Belmonte",
      position: "Barangay Captain",
      status: "Active",
      photoUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
    officials: [
      {
        id: "off-31",
        name: "Ricardo N. Villa",
        position: "Kagawad",
        status: "Active",
      },
    ],
    contact: {
      address:
        "Tan-awan Barangay Hall, High Plain District, Lupi, Camarines Sur",
      phone: "+63 (054) 881-3101",
      email: "tanawan@lupi.gov.ph",
      officeHours: "Monday - Friday: 8:00 AM - 4:30 PM",
    },
    services: [
      {
        id: "srv-31",
        title: "Ecotourism Trekking Permit",
        description:
          "Clearance and guide assignment for visitors entering local forest reserves.",
      },
    ],
    projects: [],
    dataLastUpdated: "August 2026",
    dataVerifiedBy: "LGU Lupi Municipal Planning & Development Office",
  },
];

// ==========================================
// 3. MAIN COMPONENT: BARANGAY DIRECTORY
// ==========================================

export default function BarangayDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPopulationRange, setSelectedPopulationRange] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedBarangayModal, setSelectedBarangayModal] =
    useState<BarangayItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter Logic
  const filteredBarangays = useMemo(() => {
    return MOCK_BARANGAYS.filter((b) => {
      // Search
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        b.name.toLowerCase().includes(query) ||
        b.captain.name.toLowerCase().includes(query) ||
        b.location.address.toLowerCase().includes(query);

      // Population Range Filter
      let matchesPopulation = true;
      if (selectedPopulationRange === "<2000")
        matchesPopulation = b.population < 2000;
      if (selectedPopulationRange === "2000-3000")
        matchesPopulation = b.population >= 2000 && b.population <= 3000;
      if (selectedPopulationRange === ">3000")
        matchesPopulation = b.population > 3000;

      // Status Filter
      let matchesStatus = true;
      if (selectedStatus !== "All") matchesStatus = b.status === selectedStatus;

      return matchesSearch && matchesPopulation && matchesStatus;
    });
  }, [searchQuery, selectedPopulationRange, selectedStatus]);

  // Statistics Aggregations
  const totalBarangaysCount = MOCK_BARANGAYS.length;
  const totalResidentsCount = useMemo(
    () => MOCK_BARANGAYS.reduce((acc, curr) => acc + curr.population, 0),
    [],
  );
  const activeCaptainsCount = useMemo(
    () => MOCK_BARANGAYS.filter((b) => b.captain.status === "Active").length,
    [],
  );
  const totalOfficialsCount = useMemo(
    () =>
      MOCK_BARANGAYS.reduce(
        (acc, curr) => acc + curr.officials.length + (curr.captain ? 1 : 0),
        0,
      ),
    [],
  );

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedPopulationRange("All");
    setSelectedStatus("All");
  };

  const animate = useInOutAnimation();

  return (
    <section className="w-full bg-slate-50 text-slate-900 font-sans min-h-screen pb-24">
      {/* ==========================================
          1. HERO / HEADER SECTION
      ========================================== */}
      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        className="relative bg-linear-to-b from-slate-900 via-slate-900 to-emerald-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Subtle Map / Geographic Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-size-[3rem_3rem] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6 text-center">
          {/* Breadcrumb Navigation */}
          <motion.nav
            variants={animate.itemVariants}
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-slate-300 backdrop-blur-md"
          >
            <a href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-slate-400">Government</span>
            <span>/</span>
            <span className="text-emerald-400">Barangay Directory</span>
          </motion.nav>

          {/* Title & Tagline */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <motion.h1
              variants={animate.itemVariants}
              className="text-3xl sm:text-5xl font-black tracking-tight leading-tight"
            >
              Barangay{" "}
              <span className="text-emerald-400 underline decoration-amber-400 decoration-4 underline-offset-8">
                Directory
              </span>
            </motion.h1>
            <motion.p
              variants={animate.itemVariants}
              className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed"
            >
              “Know Your Barangay. Connect With Your Community.” Explore the
              barangays of Lupi and discover important information about our
              communities, local officials, population, and public services.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        {/* ==========================================
            2. DIRECTORY STATISTICS CARDS
        ========================================== */}
        <motion.div
          variants={animate.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <StatisticCard
            variants={animate.itemVariants}
            title="Total Barangays"
            Icon={Building2}
            value={totalBarangaysCount}
            design={"bg-emerald-50 text-emerald-700"}
          />
          <StatisticCard
            variants={animate.itemVariants}
            title="Total Residents"
            Icon={Users}
            value={totalResidentsCount}
            design={"bg-teal-50 text-teal-700"}
          />
          <StatisticCard
            variants={animate.itemVariants}
            title="Active Captains"
            Icon={Award}
            value={activeCaptainsCount}
            design={"bg-amber-50 text-amber-700"}
          />
          <StatisticCard
            variants={animate.itemVariants}
            title="Barangay Officials"
            Icon={UserCheck}
            value={totalOfficialsCount}
            design={"bg-cyan-50 text-cyan-700"}
          />
        </motion.div>

        {/* ==========================================
            3. SEARCH AND FILTER SYSTEM
        ========================================== */}
        <motion.div
          variants={animate.containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4"
        >
          <motion.div
            variants={animate.itemVariants}
            className="flex flex-col lg:flex-row items-center gap-4"
          >
            {/* Search Input */}
            <div className="relative w-full lg:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search barangay by name, captain, or landmark..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium transition-all text-slate-800 placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-emerald-600 shrink-0" />
                <select
                  value={selectedPopulationRange}
                  onChange={(e) => setSelectedPopulationRange(e.target.value)}
                  className="w-full sm:w-auto px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:border-emerald-500 outline-none cursor-pointer"
                >
                  <option value="All">All Populations</option>
                  <option value="<2000">Under 2,000 residents</option>
                  <option value="2000-3000">2,000 - 3,000 residents</option>
                  <option value=">3000">Above 3,000 residents</option>
                </select>
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:border-emerald-500 outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {(searchQuery ||
                selectedPopulationRange !== "All" ||
                selectedStatus !== "All") && (
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* ==========================================
            4. BARANGAY GRID & CARDS
        ========================================== */}
        <div>
          {isLoading ? (
            // Skeleton Loading State (Section 16)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 animate-pulse"
                >
                  <div className="h-44 bg-slate-200 rounded-2xl w-full" />
                  <div className="h-6 bg-slate-200 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-10 bg-slate-200 rounded-xl w-full" />
                </div>
              ))}
            </div>
          ) : filteredBarangays.length > 0 ? (
            <motion.div
              variants={animate.containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredBarangays.map((barangay) => (
                <>
                  <BarangayCard
                    variants={animate.itemVariants}
                    key={barangay.id}
                    cover={barangay.coverImageUrl}
                    name={barangay.name}
                    status={barangay.status}
                    address={barangay.location.address}
                    population={barangay.population}
                    officials={barangay.officials.length + 1}
                    captain={barangay.captain.name}
                    setSelectedBarangay={() =>
                      setSelectedBarangayModal(barangay)
                    }
                  />
                </>
              ))}
            </motion.div>
          ) : (
            // No Results State (Section 16)
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Info className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Barangay Not Found
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Try searching using a different barangay name or clearing active
                filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Administrative Data Verification Note (Section 14) */}
        <motion.div
          variants={animate.itemVariants}
          className="p-4 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p>
            <strong>Official Administrative Note:</strong> Information published
            in this directory is verified and maintained by the authorized LGU
            Lupi Administrator. Population figures are based on verified
            municipal census data.
          </p>
        </motion.div>
      </div>

      {/* ==========================================
          5. DETAILED BARANGAY PROFILE MODAL
      ========================================== */}
      <AnimatePresence>
        {selectedBarangayModal && (
          <>
            <BarangayModal
              setSelectedBarangayModal={() => setSelectedBarangayModal(null)}
              cover={selectedBarangayModal.coverImageUrl}
              name={selectedBarangayModal.name}
              address={selectedBarangayModal.location.address}
              description={selectedBarangayModal.description}
              history={selectedBarangayModal.history}
              captainImage={selectedBarangayModal.captain.photoUrl ?? ""}
              captainName={selectedBarangayModal.captain.name}
              captainStatus={selectedBarangayModal.captain.status}
              officials={selectedBarangayModal.officials}
              population={selectedBarangayModal.population}
              households={selectedBarangayModal.households}
              area={selectedBarangayModal.areaKm2}
              contact={selectedBarangayModal.contact.phone ?? ""}
              email={selectedBarangayModal.contact.email ?? ""}
              officeHours={selectedBarangayModal.contact.officeHours ?? ""}
              dataLastUpdated={selectedBarangayModal.dataLastUpdated}
              dataVerifiedBy={selectedBarangayModal.dataVerifiedBy}
              services={selectedBarangayModal.services ?? []}
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
