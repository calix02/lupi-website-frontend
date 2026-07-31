import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import SocialCard from "./component/SocialCard";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-slate-50 text-slate-800 py-24 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden font-sans"
    >
      {/* ================= 1. LIGHT BACKGROUND & PATTERN DESIGN ================= */}
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-size-[36px_36px] pointer-events-none" />

      {/* Animated Glowing Light Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-10 h-96 w-96 rounded-full bg-emerald-200/50 blur-[130px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-12 left-10 h-100 w-100 rounded-full bg-teal-200/40 blur-[140px] pointer-events-none z-0"
      />

      {/* Decorative Frame Lines & Corners */}
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
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900">
            Connect With{" "}
            <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Lupi Municipal Hall
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-600 font-medium">
            We are here to assist you. Send us a message or reach out through our official communication channels.
          </p>
        </motion.div>

        {/* ================= 3. MAIN CONTACT CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* LEFT: Contact Cards & Info (5 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-4"
          >
            {/* Phone Card */}
            <SocialCard icon={Phone } borderColor1="bg-emerald-500" borderColor2=" border-emerald-200" backgroundColor="bg-emerald-100" textColor="text-emerald-700" variants={itemVariants} title="Contact Number" kind="Call Us" link="#" nameLink="+63 917 123-4567" tags="+63 917 123-4567(Hotline)"/>


            {/* Email Card */}
            
            <SocialCard icon={Mail } borderColor1="bg-teal-500" borderColor2=" border-teal-200" backgroundColor="bg-teal-100" textColor="text-teal-700" variants={itemVariants} title="Official Email" kind="Email Us" link="mailto:support@lupi.gov.ph" nameLink="info@lupi.gov.ph" tags="support@lupi.gov.ph"/>

            {/* Facebook Social Card */}
            <SocialCard icon={ExternalLink} borderColor1="bg-blue-600" borderColor2=" border-blue-200" backgroundColor="bg-blue-100" textColor="text-blue-600" variants={itemVariants} title="Facebook Page" kind="Social Media" link="https://www.facebook.com/profile.php?id=100063643063038" nameLink="LGU Municipality of Lupi" tags="Follow us for real-time announcements & updates"/>
            

            {/* Address & Hours Info Box */}
            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <MapPin className="h-32 w-32" />
              </div>
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Municipal Office</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm">
                  <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Poblacion, Lupi, Camarines Sur, Philippines 4409</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300 text-xs sm:text-sm pt-2 border-t border-slate-800">
                  <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Monday – Friday: 8:00 AM – 5:00 PM</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Animated Interactive Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative rounded-3xl border border-slate-200 bg-white/90 p-8 sm:p-10 backdrop-blur-xl shadow-2xl shadow-slate-200/60 flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Send Us a Message</h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Fill out the form below and our staff will respond promptly.
                  </p>
                </div>
                <Sparkles className="h-5 w-5 text-amber-500 animate-pulse hidden sm:block" />
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 p-6"
                >
                  <CheckCircle2 className="h-14 w-14 text-emerald-600" />
                  <h4 className="text-xl font-bold text-slate-900">Message Sent Successfully!</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                    Thank you for reaching out to LGU Lupi. Your inquiry has been routed to the appropriate department.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Juan Dela Cruz"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. juan@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 09171234567"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Subject *
                      </label>
                      <select
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      >
                        <option value="">Select Topic...</option>
                        <option value="general">General Inquiry</option>
                        <option value="permits">Business / Mayor's Permit</option>
                        <option value="services">Social Services</option>
                        <option value="feedback">Feedback / Suggestion</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message or inquiry here..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Message</span>
                  </motion.button>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 font-medium">
                Your personal details are protected in accordance with the Data Privacy Act of 2012.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}