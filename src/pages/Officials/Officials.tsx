import { motion } from "framer-motion";
import { Building2, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import Mayor from "@/assets/Official-Mayor.jpg";
import CircularGallery from "./component/CircularGallery";
import useInOutAnimation from "@/hooks/useInOutAnimation";
import Pattern1 from "@/assets/pattern/pattern1-emerald.svg"
import { FaAward } from "react-icons/fa6";

export default function Officials() {
  const animate = useInOutAnimation();

  // Vice Mayor Data
  const viceMayor = {
    name: "Hon. Maria Clara Santos",
    title: "Municipal Vice Mayor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    message: "Working hand-in-hand with the council to legislate programs that uplift every Lupinian family.",
  };

  // Mayor Achievements Data
  const achievements = [
    "Digitalization of Public Services & Online Citizen Portal",
    "Infrastructure Expansion: New Municipal Health Center",
    "Agricultural Support & Sustainable Farmers Program",
    "Youth Empowerment & Educational Scholarship Fund",
  ];

  // Councilors with full name + official title
  const councilorItems = [
    {
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
      name: "Hon. Juan Dela Cruz",
      title: "Sangguniang Bayan Member",
    },
    {
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
      name: "Hon. Elena G. Torres",
      title: "Sangguniang Bayan Member",
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      name: "Hon. Ricardo P. Dalisay",
      title: "Sangguniang Bayan Member",
    },
    {
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=800",
      name: "Hon. Sofia M. Aquino",
      title: "Sangguniang Bayan Member",
    },
    {
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
      name: "Hon. Mark Anthony Ramos",
      title: "Sangguniang Bayan Member",
    },
    {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      name: "Hon. Angela K. Mendoza",
      title: "Sangguniang Bayan Member",
    },
  ];

  return (
    <section
      id="officials"
      className="relative min-h-screen w-full bg-slate-50 px-4 sm:px-8 flex flex-col py-16 sm:py-24 items-center justify-center overflow-hidden font-sans"
    >
      <motion.div
        variants={animate.containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.15 }}
        className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center"
      >
        {/* ================= 1. SECTION HEADER ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md mb-3">
            <Building2 className="h-4 w-4 text-emerald-600" />
            <span>Municipal Administration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Meet Our{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Local Leadership
            </span>
          </h2>

          <p className="mt-3 max-w-xl text-base text-slate-600 font-medium">
            Dedicated leaders serving Lupi with integrity, commitment, and vision.
          </p>
        </motion.div>

        {/* ================= 2. MAYOR SECTION & GALLERY ================= */}
        <motion.div variants={animate.itemVariants} className="w-full mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Mayor Profile */}
            <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left  p-6 sm:p-8 relative overflow-hidden">
              
              <div className="relative mb-6 group">
                <img
                  src={Mayor}
                  alt="Municipal Mayor"
                  className="w-56 h-72 sm:w-64 sm:h-80 rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute -bottom-3 -right-3  text-emerald-700 rounded-2xl ">
                  <FaAward className="h-10 w-10" />
                </div>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-2">
                Chief Executive
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Hon. Christopher V. Jacinto
              </h3>
              <p className="text-base font-semibold text-emerald-700 mt-1">
                Municipal Mayor
              </p>

              {/* Mayor's Message */}
              <div className="mt-6 pt-6 border-t border-slate-100 relative">
                <Quote className="h-8 w-8 text-emerald-200 absolute -top-4 left-0 z-0" />
                <p className="text-sm sm:text-base text-slate-600 italic leading-relaxed relative z-10">
                  "Ang ating layunin ay maghatid ng tapat, mabilis, at de-kalidad na serbisyo para sa bawat pamilyang Lupinian. Samahan ninyo kami sa pagbuo ng mas progresibong bayan."
                </p>
              </div>
            </div>

            {/* Right Side: Mayor's Achievements & Interactive Gallery */}
            <div className="lg:col-span-7 relative flex flex-col justify-between overflow-hidden bg-white border border-slate-200/80 rounded-3xl p-10 sm:p-8 shadow-xl shadow-slate-200/50">
            <div className= "absolute top-0 inset-x-0">
              <img src={Pattern1} alt="Pattern 1" className="w-full h-full object-cover" />

            </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <h4 className="text-xl font-bold lg:mt-10 text-slate-900">
                    Key Accomplishments & Vision
                  </h4>
                </div>

                <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
                  Highlighting the key initiatives and ongoing municipal projects led under the administration of Mayor Christopher V. Jacinto.
                </p>

                {/* Achievements List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {achievements.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Circular / Custom Gallery Component Container */}
              <div className="w-full mt-auto rounded-2xl bg-slate-900 p-4 sm:p-6 text-white overflow-hidden relative min-h-55 flex items-center justify-center">
                <div className="w-full h-full">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 text-center">
                    Project Gallery
                  </p>
                  <CircularGallery />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= 3. VICE MAYOR SECTION (CENTERED) ================= */}
        <motion.div
          variants={animate.itemVariants}
          className="w-full max-w-2xl mx-auto mb-20 text-center"
        >
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-teal-500 to-cyan-500" />

            <div className="relative mb-4">
              <img
                src={viceMayor.image}
                alt={viceMayor.name}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shadow-md border-4 border-emerald-50"
              />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-2">
              Presiding Officer
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              {viceMayor.name}
            </h3>
            <p className="text-sm font-semibold text-teal-700 mt-0.5 mb-4">
              {viceMayor.title}
            </p>

            <p className="text-sm text-slate-600 italic max-w-lg leading-relaxed">
              "{viceMayor.message}"
            </p>
          </div>
        </motion.div>

        {/* ================= 4. COUNCILORS SECTION (GRID OF 3) ================= */}
        <motion.div variants={animate.itemVariants} className="w-full">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Sangguniang Bayan Members
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Dedicated councilors working for legislative excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {councilorItems.map((councilor, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-slate-200/80 p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="overflow-hidden rounded-xl w-full h-64 mb-4 bg-slate-100">
                  <img
                    src={councilor.image}
                    alt={councilor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {councilor.name}
                </h4>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  {councilor.title}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}