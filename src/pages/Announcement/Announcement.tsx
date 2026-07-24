import { motion } from "framer-motion";
import { Calendar, ArrowRight, Quote, ShieldCheck, Bell } from "lucide-react";
import MayorImage from "@/assets/Mayor.jpg"; // Replace with Mayor Topi's actual photo path

// Import your announcement thumbnail photos
import AssistanceImg from "@/assets/logos/LGU.jpg";
import HealthMissionImg from "@/assets/logos/LGU.jpg";
import RoadProjImg from "@/assets/logos/LGU.jpg";

export default function Announcement() {
  const announcements = [
    {
      id: 1,
      tag: "Urgent Advisory",
      title: "Schedule of Municipal Financial Assistance Distribution",
      date: "July 28, 2026",
      desc: "All qualified beneficiaries are advised to report to the Lupi Covered Court starting at 8:00 AM.",
      urgent: true,
      image: AssistanceImg,
    },
    {
      id: 2,
      tag: "Community",
      title: "Free Healthcare & Dental Mission in Barangay Napolidan",
      date: "August 02, 2026",
      desc: "In partnership with the Rural Health Unit, medical checkups and basic medicine will be provided free.",
      urgent: false,
      image: HealthMissionImg,
    },
    {
      id: 3,
      tag: "Development",
      title: "Public Hearing for New Infrastructure & Road Projects",
      date: "August 10, 2026",
      desc: "Join us at the Session Hall as we present the upcoming farm-to-market road developments.",
      urgent: false,
      image: RoadProjImg,
    },
  ];

  // Animation variants for entering and exiting
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.96 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1] as const
      },
    },
  };

  return (
    <section
      id="announcements"
      className="relative w-full min-h-screen py-24 px-6 bg-slate-50 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#0edb91 0.75px, transparent 0.75px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* Floating Ambient Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-teal-200/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Content Container with Repeatable Scroll Animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.25 }} // Triggers entrance when 25% visible, exits when scrolled away
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide mb-3">
            <Bell className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
            <span>Public Updates & Advisories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Latest Announcements &{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Mayor's Corner
            </span>
          </h2>
        </motion.div>

        {/* Two-Column Grid: Mayor's Message + Announcements List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Mayor Topi's Message Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden group hover:border-emerald-400/50 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/20 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Message from LGU Leadership</span>
              </div>

              <Quote className="w-10 h-10 text-emerald-500/20 mb-3" />

              <blockquote className="text-slate-700 text-base sm:text-lg leading-relaxed italic font-medium">
                "Dear fellow Lupinians, true progress is achieved when every family in our municipality feels supported, safe, and empowered. Let us continue to work hand-in-hand toward a transparent, modern, and thriving Lupi."
              </blockquote>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
              <div className="relative">
                <img
                  src={MayorImage}
                  alt="Mayor Topi"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Hon. Mayor Topi</h4>
                <p className="text-xs font-semibold text-emerald-600">Municipal Mayor, Lupi</p>
              </div>
            </div>
          </motion.div>

          {/* Bulletin / Announcements List */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {announcements.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative flex flex-col sm:flex-row items-stretch gap-5 rounded-2xl bg-white p-4 sm:p-5 shadow-md shadow-slate-200/50 border border-slate-200/70 hover:shadow-xl hover:border-emerald-300 transition-all cursor-pointer overflow-hidden"
              >
                {/* Thumbnail Image */}
                <div className="relative w-full sm:w-36 h-36 sm:h-auto shrink-0 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1 space-y-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          item.urgent
                            ? "bg-rose-100 text-rose-700 border border-rose-200"
                            : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {item.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 pt-1">
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View All Bulletins Link */}
            <motion.div variants={itemVariants} className="pt-2 text-right">
              <a
                href="#all-announcements"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <span>View All Official Bulletins</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}