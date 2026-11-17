"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Luggage,
  Wind,
  Snowflake,
  MessageCircle,
  X,
  ShieldCheck,
  Check,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { openWhatsApp, buildVehicleEnquiry } from "@/lib/whatsapp";
import type { Vehicle } from "@/lib/data";

/* ── Vehicle Detail Modal ── */
function VehicleModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [form, setForm] = useState({ pickup: "", drop: "", date: "" });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(buildVehicleEnquiry(vehicle.name, vehicle.category, form.pickup, form.drop, form.date));
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal
        aria-label={vehicle.name}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl max-w-xl w-full my-auto overflow-hidden shadow-2xl border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Vehicle Visual Header */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              className="object-cover"
              sizes="(max-width:600px) 100vw,600px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3.5 py-1 bg-[#0D1B3E]/95 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider rounded-lg shadow-md border border-white/10">
                {vehicle.category}
              </span>
              {vehicle.badge && (
                <span className="px-3 py-1 bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-md">
                  {vehicle.badge}
                </span>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{vehicle.name}</h2>
              {vehicle.ratePerKm && (
                <p className="text-xs font-bold text-amber-300 mt-0.5">Indicative Fare: {vehicle.ratePerKm}</p>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-7">
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{vehicle.description}</p>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Users, label: "Passengers", value: `${vehicle.passengers} Seats` },
                { icon: Luggage, label: "Luggage Space", value: vehicle.luggage },
                { icon: Wind, label: "Climate Control", value: vehicle.ac ? "Dual AC" : "Standard" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl text-center border border-slate-100 transition-colors"
                >
                  <Icon size={18} className="text-[#0D1B3E] mb-1" />
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">{label}</span>
                  <span className="text-xs font-black text-[#0D1B3E] mt-0.5">{value}</span>
                </div>
              ))}
            </div>

            {/* Bullet Highlights */}
            <div className="mb-6">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
                Key Vehicle Amenities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {vehicle.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-xs font-semibold text-[#0D1B3E]">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-[#C8102E] flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Instant Booking Form */}
            <form onSubmit={handleSend} className="border-t border-gray-100 pt-5 flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-wider text-[#0D1B3E]">
                  Check Real-Time Availability
                </p>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Instant Reply
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-gray-600">Pickup Location</label>
                  <input
                    required
                    value={form.pickup}
                    onChange={(e) => set("pickup", e.target.value)}
                    placeholder="e.g. Nellore City"
                    className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#C8102E] bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-gray-600">Destination</label>
                  <input
                    required
                    value={form.drop}
                    onChange={(e) => set("drop", e.target.value)}
                    placeholder="e.g. Tirupati / Chennai"
                    className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#C8102E] bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-600">Travel Date</label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#C8102E] bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 py-3.5 bg-[#C8102E] hover:bg-[#A50D26] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <MessageCircle size={18} />
                Get Quote on WhatsApp
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ── High-End Vehicle Card ── */
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -7 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="premium-card group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden text-left"
        aria-label={vehicle.name}
      >
        {/* Visual Showcase */}
        <div className="relative overflow-hidden aspect-[16/11] bg-slate-900">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

          {/* Category Tag */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
            <span className="px-3 py-1 bg-[#0D1B3E]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-md shadow-sm border border-white/10">
              {vehicle.category}
            </span>
            {vehicle.badge && (
              <span className="px-2.5 py-1 bg-[#C8102E] text-white text-[9px] font-black uppercase tracking-wider rounded-md shadow-sm">
                {vehicle.badge}
              </span>
            )}
          </div>

          {/* Climate badge */}
          {vehicle.ac && (
            <span className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-bold rounded-md shadow-sm">
              <Snowflake size={11} /> AC
            </span>
          )}

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="text-xl font-black tracking-tight drop-shadow-sm">{vehicle.name}</h3>
            {vehicle.ratePerKm && (
              <p className="text-[11px] font-bold text-amber-300">{vehicle.ratePerKm} (approx)</p>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-1">
          {/* Quick Specs Icons Bar */}
          <div className="grid grid-cols-2 gap-2 pb-4 mb-4 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Users size={15} className="text-[#0D1B3E]" />
              <span className="font-bold">{vehicle.passengers} Seats</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Luggage size={15} className="text-[#0D1B3E]" />
              <span className="font-medium truncate">{vehicle.luggage}</span>
            </div>
          </div>

          {/* Feature List (Exact Customer Reference Style) */}
          <ul className="flex flex-col gap-2 mb-6 flex-1 text-xs text-slate-600">
            {vehicle.features.slice(0, 4).map((f, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] mt-1.5 shrink-0" />
                <span className="font-semibold text-slate-700 leading-snug">{f}</span>
              </li>
            ))}
          </ul>

          {/* Action Row */}
          <div className="flex items-center gap-2.5 pt-2 mt-auto">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 py-2.5 text-xs font-bold border-2 border-[#0D1B3E] text-[#0D1B3E] rounded-xl hover:bg-[#0D1B3E] hover:text-white transition-all cursor-pointer text-center"
            >
              View Details
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => openWhatsApp(buildVehicleEnquiry(vehicle.name, vehicle.category))}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-[#C8102E] hover:bg-[#A50D26] text-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle size={14} />
              Enquiry Now →
            </motion.button>
          </div>
        </div>
      </motion.article>

      {showModal && <VehicleModal vehicle={vehicle} onClose={() => setShowModal(false)} />}
    </>
  );
}
