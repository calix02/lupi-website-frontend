import { motion } from "framer-motion";
import { Building2, Award, Mail, Phone, ShieldCheck, Sparkles, Star, UserCheck } from "lucide-react";
import Mayor from "@/assets/Mayor.jpg";
import CircularGallery from "./component/CircularGallery";

export default function Officials() {
  // Councilors with full name + official title
  const councilorItems = [
    {
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Juan Dela Cruz",
    },
    {
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Elena G. Torres",
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Ricardo P. Dalisay ",
    },
    {
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Sofia M. Aquino",
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Mark Anthony Ramos",
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      text: "Hon. Angela K. Mendoza",
    },
  ];

  return (
    <section
      id="officials"
      className="relative min-h-screen w-full bg-slate-50 text-slate-800 py-24 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden font-sans"
    >
      {/* ================= 1. LIGHT BACKGROUND & PATTERN DESIGN ================= */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-96 w-175 rounded-full bg-emerald-200/40 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-teal-200/30 blur-[100px] pointer-events-none z-0" />

      {/* Decorative Frame Lines */}
      <div className="absolute inset-4 sm:inset-8 border border-slate-200 pointer-events-none z-0 rounded-3xl" />
      <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-emerald-600 z-10" />
      <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-emerald-600 z-10" />
      <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-emerald-600 z-10" />
      <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-emerald-600 z-10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center">
        {/* ================= 2. SECTION HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md mb-3">
            <Building2 className="h-4 w-4 text-emerald-600" />
            <span>Municipal Administration</span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900">
            Meet Our{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Local Leadership
            </span>
          </h2>

          <p className="mt-3 max-w-xl text-base text-slate-600 font-medium">
            Dedicated leaders serving with integrity, commitment, and vision.
          </p>
        </motion.div>

        {/* ================= 3. MAYOR HIGHLIGHT HERO CARD ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-slate-200/60"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          <div className="absolute top-4 right-4 h-12 w-12 border-t-2 border-r-2 border-emerald-500/20 pointer-events-none" />
          <div className="absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-emerald-500/20 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Mayor Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative h-80 sm:h-96 w-full max-w-sm rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-xl group">
                <img
                  src={Mayor}
                  alt="Municipal Mayor"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-white/90 px-3 py-1 backdrop-blur-md text-xs font-bold text-emerald-800 shadow-md">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span>Chief Executive</span>
                </div>
              </div>
            </div>

            {/* Mayor Details */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Office of the Municipal Mayor</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Hon. Cristopher Jacinto
              </h3>

              <p className="text-lg font-bold text-emerald-700 uppercase tracking-wider">
                Municipal Mayor
              </p>

              <blockquote className="mt-2 text-sm sm:text-base text-slate-600 italic border-l-4 border-emerald-500 pl-4 py-1">
                "Committed to transparent governance, rapid progress, and dedicated public service for all residents."
              </blockquote>

              <div className="pt-4 flex flex-wrap gap-3 w-full border-t border-slate-100 mt-4">
                <a
                  href="mailto:mayor@lupi.gov.ph"
                  className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-emerald-50 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-800 transition-colors border border-slate-200"
                >
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span>mayor@lupi.gov.ph</span>
                </a>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200">
                  <Phone className="h-4 w-4 text-teal-600" />
                  <span>+63 (054) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= 4. VICE MAYOR HIGHLIGHT CARD ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl mb-20 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-slate-200/60"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-teal-500 via-cyan-500 to-sky-500" />
          <div className="absolute top-4 right-4 h-12 w-12 border-t-2 border-r-2 border-teal-500/20 pointer-events-none" />
          <div className="absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-teal-500/20 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Vice Mayor Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative h-80 sm:h-96 w-full max-w-sm rounded-2xl overflow-hidden border-2 border-teal-500/30 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                  alt="Municipal Vice Mayor"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-teal-400/40 bg-white/90 px-3 py-1 backdrop-blur-md text-xs font-bold text-teal-800 shadow-md">
                  <Award className="h-3.5 w-3.5 text-teal-600" />
                  <span>Presiding Officer</span>
                </div>
              </div>
            </div>

            {/* Vice Mayor Details */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
              <div className="inline-flex items-center gap-2 rounded-lg bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-semibold text-teal-800">
                <UserCheck className="h-4 w-4 text-teal-600" />
                <span>Office of the Vice Mayor</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Hon. Vice Mayor
              </h3>

              <p className="text-lg font-bold text-teal-700 uppercase tracking-wider">
                Municipal Vice Mayor
              </p>

              <blockquote className="mt-2 text-sm sm:text-base text-slate-600 italic border-l-4 border-teal-500 pl-4 py-1">
                "Fostering legislative excellence and unity to serve the best interests of every citizen."
              </blockquote>

              <div className="pt-4 flex flex-wrap gap-3 w-full border-t border-slate-100 mt-4">
                <a
                  href="mailto:vicemayor@lupi.gov.ph"
                  className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-teal-50 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-800 transition-colors border border-slate-200"
                >
                  <Mail className="h-4 w-4 text-teal-600" />
                  <span>vicemayor@lupi.gov.ph</span>
                </a>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 border border-slate-200">
                  <Phone className="h-4 w-4 text-teal-600" />
                  <span>+63 (054) 123-4568</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= 5. COUNCILORS SECTION & CIRCULAR GALLERY ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-emerald-600 animate-pulse" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center">
              Sangguniang Bayan Councilors
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mb-8 text-center">
            Drag or scroll horizontally to browse council members
          </p>

          {/* Gallery Wrapper - Exact original placement */}
          <div className="w-full h-125 relative rounded-3xl border border-slate-200 bg-white/60 backdrop-blur-md shadow-xl overflow-hidden p-2">
            <CircularGallery
              items={councilorItems}
              bend={1.5}
              textColor="#0f172a"
              borderRadius={0.06}
              scrollEase={0.05}
              scrollSpeed={2}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}