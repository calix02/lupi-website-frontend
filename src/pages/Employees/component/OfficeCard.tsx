"use client";

import { useEffect, useState } from "react";
import { BsBank } from "react-icons/bs";

interface OfficeCardProps {
  title?: string;
  label?: string;
  value?: number;
  icon?: React.ReactNode;
}

export default function OfficeCard({
  title = "Office of the Mayor",
  label = "Total Employees",
  value = 20,
  icon,
}: OfficeCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div className="group relative w-full h-50 overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-white via-white to-emerald-50/40 p-5 px-10 shadow-md transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10 cursor-pointer">
      <style>{`
        @keyframes officecard-seal-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes officecard-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes officecard-rise {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .officecard-seal-ring { animation: officecard-seal-spin 14s linear infinite; }
        .officecard-bar { background-size: 200% 200%; animation: officecard-shimmer 4s ease-in-out infinite; }
        .officecard-rise { animation: officecard-rise 0.6s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .officecard-seal-ring, .officecard-bar, .officecard-rise { animation: none !important; }
        }
      `}</style>

      {/* left ribbon accent */}
      <div className="officecard-bar absolute left-3 top-1/2 h-[85%] w-1.5 -translate-y-1/2 rounded-full bg-linear-to-b from-emerald-950 via-emerald-600 to-amber-400" />

      {/* watermark seal */}
      <div className="absolute -right-6 -bottom-6 flex h-36 w-36 items-center justify-center">
        <div className="officecard-seal-ring absolute inset-0 rounded-full border border-dashed border-emerald-800/20" />
        <div className="absolute inset-3 rounded-full border border-emerald-800/10" />
        {icon ?? (
          <BsBank className="h-16 w-16 text-emerald-800/25 transition-colors duration-500 group-hover:text-emerald-800/40" />
        )}
      </div>

      <div className="relative z-10 pl-2">
        <h1 className=" text-xl font-semibold tracking-wide text-slate-900">
          {title}
        </h1>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          {label}
        </p>
        <p className="officecard-rise mt-5 ml-1 text-5xl font-bold tabular-nums text-emerald-800">
          {count}
        </p>
      </div>
    </div>
  );
}