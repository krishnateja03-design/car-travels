"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { openWhatsApp, buildTourEnquiry } from "@/lib/whatsapp";
import { TOUR_PACKAGES, type TourPackage } from "@/lib/data";

const TOUR_CATS = ["All", "Pilgrimage", "City Tour", "Hill Station", "Nature", "Beach"] as const;

export default function ToursPage() {
  const [active, setActive] = useState("All");
  const [customForm, setCustomForm] = useState({
    name: "",
    phone: "",
    destination: "",
    passengers: "4",
    date: "",
    message: "",
  });

  const set = (k: string, v: string) => setCustomForm((p) => ({ ...p, [k]: v }));
  const filtered =
    active === "All" ? TOUR_PACKAGES : TOUR_PACKAGES.filter((t) => t.category === active);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(
      `🌟 *VASU CAR TRAVELS – Custom Tour Package Enquiry*\n\n` +
        `👤 *Name:* ${customForm.name}\n` +
        `📞 *Phone:* ${customForm.phone}\n` +
        `📍 *Destination:* ${customForm.destination}\n` +
        `👥 *Passengers:* ${customForm.passengers}\n` +
        `📅 *Travel Date:* ${customForm.date}\n` +
        `📝 *Special Requests:* ${customForm.message || "None"}\n\n` +
        `Please share an itinerary and fare quote. Thank you!`
    );
  };

  const inputCls =
    "w-full px-4 py-3 border border-white/20 bg-white/10 text-white placeholder-white/40 rounded-xl text-sm focus:outline-none focus:border-white focus:bg-white/15 transition-all";

  return (
    <div className="overflow-x-hidden bg-white text-[#0D1B3E]">
      {/* ── Tours Hero ── */}
      <section className="relative bg-gradient-to-br from-[#060D1E] via-[#0D1B3E] to-[#16274E] pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#C8102E]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 text-[#FFB3BE] text-xs font-black uppercase tracking-widest"
          >
            <Compass size={13} />
            SOUTH INDIA TOUR PACKAGES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase mb-4"
          >
            Handcrafted Tours & Pilgrimages
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed"
          >
            Tirupati Balaji Darshan, Ooty hill stations, Coorg coffee plantations, Chennai coastal
            tours, and Shirdi yatra. Safe drivers, clean AC vehicles, zero headache.
          </motion.p>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TOUR_CATS.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                  active === cat
                    ? "bg-[#0D1B3E] text-white shadow-md shadow-[#0D1B3E]/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tour Packages Cards ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((tour: TourPackage) => (
                <motion.article
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden text-left"
                >
                  {/* Photo Header */}
                  <div className="relative overflow-hidden aspect-[16/10] bg-slate-900">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-wider rounded-md shadow-md">
                      {tour.category}
                    </span>

                    <span className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-md">
                      <Clock size={11} /> {tour.duration}
                    </span>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-xl font-black tracking-tight">{tour.title}</h3>
                      <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="text-[#C8102E]" /> {tour.distance}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs text-slate-600 leading-relaxed mb-5">{tour.description}</p>

                    {/* Highlights */}
                    <div className="mb-5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                        Tour Highlights
                      </p>
                      <ul className="flex flex-col gap-1.5 text-xs">
                        {tour.highlights.slice(0, 3).map((h) => (
                          <li key={h} className="flex items-center gap-2 text-slate-700 font-medium">
                            <CheckCircle size={13} className="text-[#C8102E] shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Vehicle Options */}
                    <div className="mb-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                        Suggested Vehicles
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {tour.vehicleOptions.map((v) => (
                          <span
                            key={v}
                            className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 text-[#0D1B3E] rounded-md"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openWhatsApp(buildTourEnquiry(tour.title, tour.duration))}
                      className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-[#C8102E] hover:bg-[#A50D26] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <MessageCircle size={15} /> Enquire on WhatsApp
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Custom Tour Request Section ── */}
      <section className="py-20 bg-[#0D1B3E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5">
              <span className="text-xs font-black tracking-[2px] uppercase text-[#FFB3BE]">
                CUSTOM TOUR PACKAGES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2 mb-5 leading-tight">
                Plan a Custom Itinerary
              </h2>
              <p className="text-sm text-white/75 leading-relaxed mb-6">
                Need a multi-city South India tour, family wedding convoy, or temple yatra? Tell us
                your preferred places, group size, and dates. We will curate the route and vehicle.
              </p>

              <div className="flex flex-col gap-3 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-[#C8102E]" />
                  <span>No rigid time limits – travel at your family's pace</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-[#C8102E]" />
                  <span>Doorstep pickup from Nellore or any South India location</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#C8102E]" />
                  <span>24/7 dedicated support & route monitoring</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleCustomSubmit}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-9 flex flex-col gap-4 shadow-2xl"
              >
                <h3 className="text-lg font-black text-white mb-1">Request Custom Tour Quote</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                      Your Name *
                    </label>
                    <input
                      required
                      value={customForm.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Enter full name"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={customForm.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                    Destination(s) *
                  </label>
                  <input
                    required
                    value={customForm.destination}
                    onChange={(e) => set("destination", e.target.value)}
                    placeholder="e.g. Ooty - Kodaikanal - Madurai"
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                      Passengers *
                    </label>
                    <select
                      value={customForm.passengers}
                      onChange={(e) => set("passengers", e.target.value)}
                      className={inputCls + " appearance-none text-slate-900 bg-white"}
                    >
                      <option value="1-4 Pax">1 - 4 Passengers (Sedan / MPV)</option>
                      <option value="5-7 Pax">5 - 7 Passengers (Innova Crysta)</option>
                      <option value="8-12 Pax">8 - 12 Passengers (Tempo Traveller)</option>
                      <option value="13-17 Pax">13 - 17 Passengers (Force Urbania)</option>
                      <option value="18-32 Pax">18 - 32 Passengers (Mini Bus)</option>
                      <option value="33-50 Pax">33 - 50 Passengers (Tourist Coach)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                      Travel Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={customForm.date}
                      onChange={(e) => set("date", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                    Additional Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={customForm.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Preferred stops, hotel assistance, budget requirements..."
                    className={inputCls + " resize-none"}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 py-4 bg-[#C8102E] hover:bg-[#A50D26] text-white text-sm font-black uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle size={18} /> Send Tour Request on WhatsApp
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
