"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Luggage, Wind, Snowflake, MessageCircle, X, ShieldCheck } from "lucide-react";
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
      className="fixed inset-0 z-[2000] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={vehicle.name}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gray-100">
          <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="(max-width:600px) 100vw,560px" />
          <span className="absolute top-3 left-3 px-3 py-1 bg-[#0D1B3E] text-white text-xs font-bold rounded-md shadow-sm">
            {vehicle.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h2 className="text-2xl font-black text-[#0D1B3E]">{vehicle.name}</h2>
              <p className="text-xs font-semibold text-gray-500 mt-0.5">{vehicle.category}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              aria-label="Close"
            >
              <X size={18} className="text-gray-600" />
            </button>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">{vehicle.description}</p>

          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            {[
              { icon: Users, label: "Capacity", value: `${vehicle.passengers} Seats` },
              { icon: Luggage, label: "Luggage", value: vehicle.luggage },
              { icon: Wind, label: "Climate", value: vehicle.ac ? "AC" : "Non-AC" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl text-center border border-gray-100">
                <Icon size={17} className="text-[#0D1B3E]" />
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{label}</span>
                <span className="text-xs font-extrabold text-[#0D1B3E]">{value}</span>
              </div>
            ))}
          </div>

          {/* Bullet Feature List */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Vehicle Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vehicle.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs font-semibold text-[#0D1B3E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick WhatsApp Form */}
          <form onSubmit={handleSend} className="border-t border-gray-100 pt-5 flex flex-col gap-3">
            <p className="text-sm font-extrabold text-[#0D1B3E]">Enquire with Trip Details</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Pickup</label>
                <input
                  required
                  value={form.pickup}
                  onChange={(e) => set("pickup", e.target.value)}
                  placeholder="e.g. Nellore"
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8102E] bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600">Drop</label>
                <input
                  required
                  value={form.drop}
                  onChange={(e) => set("drop", e.target.value)}
                  placeholder="e.g. Tirupati"
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8102E] bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">Travel Date</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C8102E] bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 py-3 bg-[#C8102E] hover:bg-[#A50D26] text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <MessageCircle size={18} />
              Enquire on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Vehicle Card (Exact Reference Design Spec) ── */
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article
        className="group bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden text-left"
        aria-label={vehicle.name}
      >
        {/* Vehicle Image */}
        <div className="relative overflow-hidden aspect-[16/11] bg-gray-100">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            loading="lazy"
          />
          {vehicle.badge && (
            <span className="absolute top-3 left-3 px-3 py-0.5 bg-[#0D1B3E] text-white text-[10px] font-extrabold uppercase tracking-wide rounded-md shadow-sm">
              {vehicle.badge}
            </span>
          )}
          {vehicle.ac && (
            <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md shadow-sm">
              <Snowflake size={11} /> AC
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="text-xl font-black text-[#0D1B3E] tracking-tight">{vehicle.name}</h3>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-0.5">{vehicle.category}</p>
          </div>

          {/* Feature List with dots matching reference */}
          <ul className="flex flex-col gap-2 mb-6 flex-1 text-xs text-gray-600">
            {vehicle.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] shrink-0" />
                <span className="font-medium text-gray-700">{f}</span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 py-2.5 text-xs font-bold border-2 border-[#0D1B3E] text-[#0D1B3E] rounded-lg hover:bg-[#0D1B3E] hover:text-white transition-all cursor-pointer"
            >
              Details
            </button>
            <button
              onClick={() => openWhatsApp(buildVehicleEnquiry(vehicle.name, vehicle.category))}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-[#C8102E] hover:bg-[#A50D26] text-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <MessageCircle size={14} />
              Enquiry Now →
            </button>
          </div>
        </div>
      </article>

      {showModal && <VehicleModal vehicle={vehicle} onClose={() => setShowModal(false)} />}
    </>
  );
}
