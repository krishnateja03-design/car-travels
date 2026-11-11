"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import { openWhatsApp } from "@/lib/whatsapp";
import { VEHICLES, VEHICLE_CATEGORIES, type VehicleCategory } from "@/lib/data";

function VehiclesContent() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<VehicleCategory>("All");

  useEffect(() => {
    const cat = searchParams.get("cat") as VehicleCategory | null;
    if (cat && VEHICLE_CATEGORIES.includes(cat)) setActive(cat);
  }, [searchParams]);

  const filtered = active === "All" ? VEHICLES : VEHICLES.filter(v => v.category === active);

  return (
    <>
      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {VEHICLE_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`px-5 py-2 rounded-full text-sm font-semibold border shrink-0 transition-all cursor-pointer ${
                active === cat
                  ? "bg-[#0D1B3E] border-[#0D1B3E] text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#0D1B3E] hover:text-[#0D1B3E]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-14 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <p className="text-gray-500 text-sm">
              Showing <span className="font-bold text-gray-900">{filtered.length}</span> vehicle{filtered.length !== 1 ? "s" : ""}
              {active !== "All" && ` in ${active}`}
            </p>
            <button
              onClick={() => openWhatsApp("Hi! I'd like to enquire about your vehicle fleet and pricing.")}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1DB954] text-white text-sm font-semibold rounded-lg transition-all cursor-pointer"
            >
              <MessageCircle size={15} /> Enquire All Vehicles
            </button>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map(v => <VehicleCard key={v.id} vehicle={v} />)}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              <p className="text-xl font-semibold text-gray-500 mb-2">No vehicles found</p>
              <p className="text-sm">Try a different category or contact us directly.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function VehiclesPage() {
  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#071020] to-[#1A2F5E] pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-bold tracking-[2px] uppercase text-[#FFB3BE]">Our Fleet</span>
          <h1 className="font-['Playfair_Display'] text-5xl font-extrabold text-white mt-3 mb-4">Premium Vehicle Fleet</h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
            Choose from our wide range of well-maintained vehicles for any trip — city rides, outstation travel, group tours, and corporate transfers.
          </p>
        </div>
      </section>

      <Suspense fallback={
        <div className="py-20 text-center text-gray-400">
          <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-[#0D1B3E] rounded-full animate-spin" />
        </div>
      }>
        <VehiclesContent />
      </Suspense>
    </div>
  );
}
