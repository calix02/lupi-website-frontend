import { type LucideIcon } from "lucide-react";
type StatisticCardProp = {
  value: number;
  title: string;
  design: string;
  Icon: LucideIcon;
};
export default function StatisticCard({
  value,
  title,
  design,
  Icon,
}: StatisticCardProp) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-md flex items-center gap-4">
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
    </div>
  );
}
