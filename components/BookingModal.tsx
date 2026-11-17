"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { openWhatsApp, buildBookingMessage } from "@/lib/whatsapp";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVehicle?: string;
}

const COMMON_CITIES = [
  "Nellore",
  "Tirupati",
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Vijayawada",
  "Guntur",
  "Ongole",
  "Kavali",
  "Gudur",
  "Srisailam",
  "Kalahasti",
  "Kanipakam",
  "Ooty",
  "Kodaikanal",
  "Coorg",
  "Madurai",
  "Mahabalipuram",
  "Pondicherry",
  "Kanyakumari",
  "Munnar",
  "Alleppey",
  "Goa",
  "Shirdi",
  "Coimbatore",
  "Chittoor",
];

const INITIAL_FORM = {
  name: "",
  phone: "",
  pickup: "",
  drop: "",
  travelDate: "",
  returnDate: "",
  vehicleType: "Force Urbania (16/17 Seater)",
  passengers: "1-4 Passengers",
  requirements: "",
};

export default function BookingModal({ isOpen, onClose, defaultVehicle }: BookingModalProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [pickupOpen, setPickupOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) {
        setPickupOpen(false);
      }
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update default vehicle when opened or changed
  useEffect(() => {
    if (defaultVehicle) {
      setForm((p) => ({ ...p, vehicleType: defaultVehicle }));
    }
  }, [defaultVehicle, isOpen]);

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setPickupOpen(false);
    setDropOpen(false);
    onClose();
  };

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const filteredPickupCities = COMMON_CITIES.filter((city) =>
    city.toLowerCase().includes(form.pickup.toLowerCase().trim())
  );

  const filteredDropCities = COMMON_CITIES.filter((city) =>
    city.toLowerCase().includes(form.drop.toLowerCase().trim())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(
      buildBookingMessage({
        name: form.name || "Customer",
        phone: form.phone || "Not specified",
        pickup: form.pickup,
        drop: form.drop,
        travelDate: form.travelDate,
        returnDate: form.returnDate,
        vehicleType: form.vehicleType,
        passengers: form.passengers,
        requirements: form.requirements,
      })
    );
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={handleClose}
          role="dialog"
          aria-modal
          aria-label="Book on WhatsApp"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl max-w-lg w-full my-auto overflow-hidden shadow-2xl border border-gray-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0D1B3E] text-white p-6 sm:p-7 relative">
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-black uppercase tracking-wider text-white/90 mb-3 border border-white/10">
                <Sparkles size={13} className="text-[#C8102E]" /> Fast WhatsApp Booking
              </div>
              <h2 className="text-2xl font-black tracking-tight">Plan Your Journey</h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Fill details below — we'll send an instant availability & fare quote to your WhatsApp!
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-7 flex flex-col gap-4 text-left">
              {/* Name */}
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/10 transition-all"
                />
              </div>

              {/* Pickup & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Pickup Location with sleek custom dropdown */}
                <div ref={pickupRef} className="relative">
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                    Pickup Location *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.pickup}
                    onFocus={() => setPickupOpen(true)}
                    onChange={(e) => {
                      set("pickup", e.target.value);
                      setPickupOpen(true);
                    }}
                    placeholder="e.g. Nellore"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/10 transition-all"
                  />
                  {pickupOpen && filteredPickupCities.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto z-50 py-1">
                      {filteredPickupCities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            set("pickup", city);
                            setPickupOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#C8102E] transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>{city}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Destination with sleek custom dropdown */}
                <div ref={dropRef} className="relative">
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                    Destination *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.drop}
                    onFocus={() => setDropOpen(true)}
                    onChange={(e) => {
                      set("drop", e.target.value);
                      setDropOpen(true);
                    }}
                    placeholder="e.g. Tirupati"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/10 transition-all"
                  />
                  {dropOpen && filteredDropCities.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto z-50 py-1">
                      {filteredDropCities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            set("drop", city);
                            setDropOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#C8102E] transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>{city}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Travel Date & Return Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                    Travel Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={form.travelDate}
                    onChange={(e) => set("travelDate", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                    Return Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={form.returnDate}
                    onChange={(e) => set("returnDate", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/10 transition-all"
                  />
                </div>
              </div>

              {/* Vehicle Required & Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                    Vehicle Required *
                  </label>
                  <div className="relative">
                    <select
                      value={form.vehicleType}
                      onChange={(e) => set("vehicleType", e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 font-medium focus:bg-white focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/10 transition-all cursor-pointer"
                    >
                      <option value="Force Urbania (16/17 Seater)">Force Urbania (16/17 Seater)</option>
                      <option value="Innova Crysta (7/8 Seater)">Innova Crysta (7/8 Seater)</option>
                      <option value="Innova Hycross (7 Seater Hybrid)">Innova Hycross (7 Seater Hybrid)</option>
                      <option value="Force Tempo Traveller (12/17 Seater)">Force Tempo Traveller (12/17 Seater)</option>
                      <option value="Luxury Tourist Bus (32/40/50 Seater)">Luxury Tourist Bus (32/40/50 Seater)</option>
                      <option value="Sedans (Swift Dzire / Etios)">Sedans (Swift Dzire / Etios)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                    Passengers *
                  </label>
                  <div className="relative">
                    <select
                      value={form.passengers}
                      onChange={(e) => set("passengers", e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 font-medium focus:bg-white focus:outline-none focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/10 transition-all cursor-pointer"
                    >
                      <option value="1-4 Passengers">1 - 4 Passengers</option>
                      <option value="5-7 Passengers">5 - 7 Passengers</option>
                      <option value="8-12 Passengers">8 - 12 Passengers</option>
                      <option value="13-17 Passengers">13 - 17 Passengers</option>
                      <option value="18-32 Passengers">18 - 32 Passengers</option>
                      <option value="33-50+ Passengers">33 - 50+ Passengers</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-2 w-full flex items-center justify-center gap-2 py-4 bg-[#C8102E] hover:bg-[#A50D26] text-white text-base font-black uppercase tracking-wider rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer glow-red"
              >
                <MessageCircle size={22} className="fill-white" />
                Send Enquiry on WhatsApp
              </motion.button>
              <p className="text-center text-[11px] text-gray-400 font-semibold">
                Takes 5 seconds • Direct connection to Vasu Car Travels dispatch owner
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

