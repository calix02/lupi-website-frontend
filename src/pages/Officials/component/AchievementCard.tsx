import { type Variants, motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import CircularGallery from "./CircularGallery";
import Pattern1 from "@/assets/pattern/pattern1-emerald.svg";
import Pattern2 from "@/assets/pattern/pattern5.svg";

type AchivementCardProps = {
  variants: Variants;
};

export default function AchievementCard({ variants }: AchivementCardProps) {
  // Mayor Achievements Data
  const achievements = [
    "Digitalization of Public Services & Online Citizen Portal",
    "Infrastructure Expansion: New Municipal Health Center",
    "Agricultural Support & Sustainable Farmers Program",
    "Youth Empowerment & Educational Scholarship Fund",
  ];
  return (
    <motion.div
      variants={variants}
      className="lg:col-span-7 relative flex flex-col justify-between overflow-hidden bg-white border border-slate-200/80 rounded-3xl p-10 sm:p-8 shadow-xl shadow-slate-200/50"
    >
      <div className="absolute top-0 inset-x-0">
        <img
          src={Pattern1}
          alt="Pattern 1"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <h4 className="text-xl font-bold lg:mt-10 text-slate-900">
            Key Accomplishments & Vision
          </h4>
        </div>

        <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
          Highlighting the key initiatives and ongoing municipal projects led
          under the administration of Mayor Christopher V. Jacinto.
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
      <div className="w-full mt-auto rounded-2xl  bg-slate-900 p-4 sm:p-6 text-white overflow-hidden relative min-h-55 flex items-center justify-center">
        <div className="absolute top-0 inset-x-0">
          <img
            src={Pattern2}
            alt="Pattern 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full z-10">
          <p className="text-xs  font-bold uppercase tracking-wider text-slate-900 mb-2 text-center">
            Project Gallery
          </p>
          <CircularGallery />
        </div>
      </div>
    </motion.div>
  );
}
