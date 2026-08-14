import { type Variants, motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
type StatisticCardProp = {
  value: number;
  title: string;
  design: string;
  Icon: LucideIcon;
  variants: Variants;
};
export default function StatisticCard({
  value,
  title,
  design,
  Icon,
  variants,
}: StatisticCardProp) {
  return (
    <motion.div
      variants={variants}
      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-md flex items-center gap-4"
    >
      <div className={` ${design} p-3.5 rounded-xl shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {value}
        </p>
      </div>
    </motion.div>
  );
}
