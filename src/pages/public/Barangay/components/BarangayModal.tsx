import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  CheckCircle2,
  Clock,
  Info,
  Mail,
  MapPin,
  Phone,
  Users,
  X,
} from "lucide-react";
type Officials = {
  id: string;
  name: string;
  position: string;
};
type Services = {
  id: string;
  title: string;
  description: string;
  processingTime?: string;
};
type BarangayModalProps = {
  setSelectedBarangayModal: () => void;
  cover: string;
  name: string;
  address: string;
  description: string;
  history: string;
  captainImage: string;
  captainName: string;
  captainStatus: string;
  officials: Officials[];
  population: number;
  households: number;
  area: number;
  contact: string;
  email: string;
  officeHours: string;
  dataLastUpdated: string;
  dataVerifiedBy: string;
  services: Services[];
};
export default function BarangayModal({
  setSelectedBarangayModal,
  cover,
  name,
  address,
  description,
  history,
  captainImage,
  captainName,
  captainStatus,
  officials,
  population,
  households,
  area,
  contact,
  email,
  officeHours,
  dataLastUpdated,
  dataVerifiedBy,
  services,
}: BarangayModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={setSelectedBarangayModal}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={setSelectedBarangayModal}
          aria-label="Close Profile"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-0 space-y-8">
          {/* 5a. Profile Header */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
            <img
              src={cover}
              alt={name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-xs font-bold text-white shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Official Barangay Directory Profile
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Barangay {name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {address}
              </p>
            </div>
          </div>

          <div className="px-6 sm:px-10 pb-10 space-y-10">
            {/* 5b. Overview */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Info className="w-5 h-5 text-emerald-600" />
                Barangay Overview & History
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {description}
              </p>
              {history && (
                <p className="text-xs text-slate-500 italic leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                  "{history}"
                </p>
              )}
            </div>

            {/* 6 & 7. Barangay Captain & Officials Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Award className="w-5 h-5 text-amber-600" />
                Barangay Leadership & Officials
              </h3>

              {/* Barangay Captain Featured Card */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-200/80 flex flex-col sm:flex-row items-center gap-4">
                {captainImage ? (
                  <img
                    src={captainImage}
                    alt={captainImage}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-xl">
                    BC
                  </div>
                )}
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                    Barangay Captain
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">
                    {captainName}
                  </h4>
                  <p className="text-xs text-slate-600">
                    Status:{" "}
                    <span className="text-emerald-700 font-semibold">
                      {captainStatus}
                    </span>
                  </p>
                </div>
              </div>

              {/* Barangay Kagawads & Council List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {officials.map((official) => (
                  <div
                    key={official.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
                  >
                    <p className="text-xs font-bold text-slate-800">
                      {official.name}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold">
                      {official.position}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Population Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Users className="w-5 h-5 text-teal-600" />
                Demographics & Population
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
                  <span className="text-2xl font-extrabold text-teal-900 block">
                    {population.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-teal-700">
                    Total Residents
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="text-2xl font-extrabold text-emerald-900 block">
                    {households}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">
                    Households
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                  <span className="text-2xl font-extrabold text-slate-800 block">
                    {area} km²
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    Land Area
                  </span>
                </div>
              </div>
            </div>

            {/* 10. Barangay Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Phone className="w-5 h-5 text-emerald-600" />
                Official Contact & Office Hours
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {contact && (
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Contact Number
                      </span>
                      <span className="font-bold text-slate-800">
                        {contact}
                      </span>
                    </div>
                  </div>
                )}

                {email && (
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Email Address
                      </span>
                      <span className="font-bold text-slate-800">{email}</span>
                    </div>
                  </div>
                )}

                {officeHours && (
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 col-span-1 sm:col-span-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Office Hours
                      </span>
                      <span className="font-bold text-slate-800">
                        {officeHours}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 11. Barangay Services */}
            {services.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                  Available Barangay Services
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">
                          {srv.title}
                        </h4>
                        {srv.processingTime && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            {srv.processingTime}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Last Verified Timestamp Note (Section 14) */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
              <span>Data Last Updated: {dataLastUpdated}</span>
              <span>Verified By: {dataVerifiedBy}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
