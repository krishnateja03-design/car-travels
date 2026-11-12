"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Shield, Award, Sparkles, SlidersHorizontal } from "lucide-react";
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

  const filtered = active === "All" ? VEHICLES : VEHICLES.filter((v) => v.category === active);

  return (
    <>
      {/* Category Filter Bar */}
      <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-2 pr-2 text-slate-400 shrink-0">
              <SlidersHorizontal size={16} />
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">Filter:</span>
            </div>
            {VEHICLE_CATEGORIES.map((cat) => {
              const count =
                cat === "All" ? VEHICLES.length : VEHICLES.filter((v) => v.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActive(cat)}
                  aria-pressed={active === cat}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                    active === cat
                      ? "bg-[#0D1B3E] text-white shadow-md shadow-[#0D1B3E]/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      active === cat ? "bg-[#C8102E] text-white" : "bg-white text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vehicles Grid Section */}
      <section className="py-16 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-6 border-b border-slate-200/80 gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#C8102E]">
                Available Fleet in Nellore
              </p>
              <h2 className="text-2xl font-black text-[#0D1B3E] tracking-tight mt-0.5">
                Showing {filtered.length} {filtered.length === 1 ? "Option" : "Options"}
                {active !== "All" && ` in ${active}`}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                openWhatsApp(
                  "Hi! I would like to enquire about your complete vehicle fleet availability and outstation quotes."
                )
              }
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8102E] hover:bg-[#A50D26] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer w-fit"
            >
              <MessageCircle size={16} /> Enquire All Fleet via WhatsApp
            </motion.button>
          </div>

          {/* Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filtered.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3 }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-xl font-black text-[#0D1B3E] mb-2">No vehicles in this category</p>
              <p className="text-sm text-gray-500 mb-6">
                Try selecting "All" or contact our dispatch team on WhatsApp for customized options.
              </p>
              <button
                onClick={() => setActive("All")}
                className="px-6 py-3 bg-[#0D1B3E] text-white text-xs font-bold rounded-xl"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function VehiclesPage() {
  return (
    <div className="overflow-x-hidden bg-white text-[#0D1B3E]">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#060D1E] via-[#0D1B3E] to-[#16274E] pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#C8102E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 text-[#FFB3BE] text-xs font-black uppercase tracking-widest"
          >
            <Sparkles size={13} />
            VASU CAR TRAVELS FLEET
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase mb-4"
          >
            Premium Vehicles For Every Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed"
          >
            From luxurious Force Urbania vans and Innova Crysta MPVs to 50-seater tourist buses and
            executive airport sedans. Always AC, always verified, always on time.
          </motion.p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="py-32 text-center">
            <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-[#C8102E] rounded-full animate-spin" />
            <p className="text-xs font-bold text-gray-500 mt-3">Loading vehicle fleet...</p>
          </div>
        }
      >
        <VehiclesContent />
      </Suspense>
    </div>
  );
}
