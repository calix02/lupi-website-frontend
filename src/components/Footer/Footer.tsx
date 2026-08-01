import { motion } from "framer-motion";
import Logo from "@/assets/logos/lupi_logo.png";
import {
  Mail,
  Phone,
  MapPin,
  
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Heart,
  ArrowUp,
} from "lucide-react";
import Pattern from "@/assets/pattern/pattern1.svg";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Lupi", href: "#about" },
    { name: "Leadership & Officials", href: "#officials" },
    { name: "Services", href: "#services" },
    { name: "Contact Us", href: "#contact" },
  ];

  const publicServices = [
    { name: "Mayor's Permit", href: "#" },
    { name: "Civil Registry", href: "#" },
    { name: "Social Welfare (MSWDO)", href: "#" },
    { name: "Barangay Affairs", href: "#" },
    { name: "Disaster Risk Reduction (MDRRMO)", href: "#" },
  ];

  return (
    <footer className="relative w-full bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white overflow-hidden font-sans">
      {/* ================= 1. GRADIENT GREEN AMBIENT BACKGROUND ================= */}
      {/* Background Decorative Grid */}
        <div className="relative top-0 w-full ">
            <img src={Pattern} alt="Pattern" className="w-full h-full object-cover" />
        </div>
    

      {/* Top Gradient Highlight Bar */}

      {/* ================= 2. MAIN FOOTER CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-emerald-800/60">
          
          {/* BRAND & TOWN OVERVIEW (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center gap-2.5">
              <div className="h-15 w-15 flex items-center justify-center ">
                <img src={Logo} alt="Lupi Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  LUPI
                </span>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mt-0.5">
                  Camarines Sur
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal">
              Official portal of the Local Government Unit of Lupi, Camarines Sur. Empowering our community through transparent governance, sustainable growth, and dedicated public service.
            </p>

            {/* Facebook / Social Link Button */}
            <div className="pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-700/60 bg-emerald-900/40 px-4 py-2.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-800/60 hover:text-white transition-all backdrop-blur-md shadow-sm"
              >
                <ExternalLink className="h-4 w-4 text-emerald-400" />
                <span>Follow LGU Lupi on Facebook</span>
                <ExternalLink className="h-3 w-3 text-emerald-400/70" />
              </a>
            </div>
          </div>

          {/* QUICK NAVIGATION (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 border-b border-emerald-800/80 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-emerald-100/70 hover:text-white hover:translate-x-1 flex items-center gap-1.5 transition-all"
                  >
                    <ChevronRight className="h-3 w-3 text-emerald-400" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* PUBLIC SERVICES (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 border-b border-emerald-800/80 pb-2">
              Municipal Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {publicServices.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-emerald-100/70 hover:text-white hover:translate-x-1 flex items-center gap-1.5 transition-all"
                  >
                    <ChevronRight className="h-3 w-3 text-teal-400" />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* DIRECT CONTACT INFO (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 border-b border-emerald-800/80 pb-2">
              Municipal Hall
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-emerald-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Poblacion, Lupi, Camarines Sur, Philippines 4409</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>+63 (054) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@lupi.gov.ph" className="hover:underline text-emerald-200">
                  info@lupi.gov.ph
                </a>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-900/80 border border-emerald-700/50 px-3 py-1 text-[11px] font-semibold text-emerald-300 mt-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Mon – Fri: 8:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. BOTTOM BAR & BACK TO TOP ================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 text-center">
            <span>© {new Date().getFullYear()} LGU Municipality of Lupi. Built with</span>
            <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400 inline mx-0.5" />
            <span>for all Lupiniangs.</span>
          </div>

          {/* Back to Top Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-800/50 hover:bg-emerald-700/60 border border-emerald-700/60 px-4 py-2 text-xs font-bold text-emerald-100 transition-colors shadow-sm backdrop-blur-sm cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-emerald-300" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}