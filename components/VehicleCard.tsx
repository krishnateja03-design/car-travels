"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Luggage, Wind, Snowflake, MessageCircle, X, CheckCircle } from "lucide-react";
import { openWhatsApp, buildVehicleEnquiry } from "@/lib/whatsapp";
import type { Vehicle } from "@/lib/data";

/* ── Modal ── */
function VehicleModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [form, setForm] = useState({ pickup: "", drop: "", date: "" });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(buildVehicleEnquiry(vehicle.name, vehicle.category, form.pickup, form.drop, form.date));
  };

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/70 flex items-center justify-center p-4 animate-fade-up"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={vehicle.name}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
          <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="(max-width:600px) 100vw,560px" />
        </div>

        {/* Content */}
        <div className="p-7">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0D1B3E]">{vehicle.name}</h2>
              <span className="inline-block mt-1.5 px-3 py-1 bg-[#0D1B3E]/10 text-[#0D1B3E] text-xs font-bold rounded-full">
                {vehicle.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
              aria-label="Close"
            >
              <X size={18} className="text-gray-600" />
            </button>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-5">{vehicle.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { icon: Users, label: "Seats", value: vehicle.passengers },
              { icon: Luggage, label: "Luggage", value: vehicle.luggage },
              { icon: Wind, label: "AC", value: vehicle.ac ? "Yes" : "No" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl text-center">
                <Icon size={18} className="text-[#0D1B3E]" />
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{label}</span>
                <span className="text-[13px] font-bold text-gray-900">{value}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {vehicle.features.map((f) => (
              <span key={f} className="text-[11px] font-semibold px-3 py-1 bg-[#0D1B3E]/7 text-[#0D1B3E] rounded-full">{f}</span>
            ))}
          </div>

          {/* Quick Enquiry Form */}
          <form onSubmit={handleSend} className="border-t border-gray-100 pt-5 flex flex-col gap-3">
            <p className="text-sm font-bold text-[#0D1B3E]">Quick Enquiry via WhatsApp</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Pickup Location</label>
                <input required value={form.pickup} onChange={(e) => set("pickup", e.target.value)}
                  placeholder="e.g. Nellore"
                  className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0D1B3E] bg-gray-50 focus:bg-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Drop Location</label>
                <input required value={form.drop} onChange={(e) => set("drop", e.target.value)}
                  placeholder="e.g. Tirupati"
                  className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0D1B3E] bg-gray-50 focus:bg-white transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Travel Date</label>
              <input required type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0D1B3E] bg-gray-50 focus:bg-white transition-colors" />
            </div>
            <button type="submit"
              className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#1DB954] text-white font-bold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
              <MessageCircle size={18} />
              Send Enquiry on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Card ── */
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article
        className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
        aria-label={vehicle.name}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 px-3 py-1 bg-[#0D1B3E] text-white text-[11px] font-bold rounded-full">
            {vehicle.category}
          </span>
          {vehicle.ac && (
            <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-emerald-500/90 text-white text-[11px] font-bold rounded-full">
              <Snowflake size={11} /> AC
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4 flex-1">
          <h3 className="text-lg font-bold text-gray-900">{vehicle.name}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{vehicle.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Users, label: "Seats", value: String(vehicle.passengers) },
              { icon: Luggage, label: "Luggage", value: vehicle.luggage },
              { icon: Wind, label: "AC", value: vehicle.ac ? "Yes" : "No" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-2.5 bg-gray-50 rounded-lg text-center">
                <Icon size={15} className="text-[#0D1B3E]" />
                <span className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">{label}</span>
                <span className="text-xs font-bold text-gray-800 leading-tight">{value}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5">
            {vehicle.features.slice(0, 4).map((f) => (
              <span key={f} className="text-[11px] font-semibold px-2.5 py-1 bg-[#0D1B3E]/7 text-[#0D1B3E] rounded-full">{f}</span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex gap-2 mt-auto pt-1">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 py-2.5 text-sm font-semibold border-2 border-[#0D1B3E] text-[#0D1B3E] rounded-lg hover:bg-[#0D1B3E] hover:text-white transition-all cursor-pointer"
            >
              View Details
            </button>
            <button
              onClick={() => openWhatsApp(buildVehicleEnquiry(vehicle.name, vehicle.category))}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold bg-[#25D366] hover:bg-[#1DB954] text-white rounded-lg transition-all hover:shadow-md cursor-pointer"
            >
              <MessageCircle size={14} />
              Enquire
            </button>
          </div>
        </div>
      </article>

      {showModal && <VehicleModal vehicle={vehicle} onClose={() => setShowModal(false)} />}
    </>
  );
}

