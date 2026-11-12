"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  PhoneCall,
  ShieldCheck,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { openWhatsApp, buildBookingMessage } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/config";
import { VEHICLE_CATEGORIES } from "@/lib/data";

type FormState = {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  travelDate: string;
  returnDate: string;
  vehicleType: string;
  passengers: string;
  requirements: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Full Name is required";
  if (!f.phone.trim()) e.phone = "Phone number is required";
  else if (!/^\+?[\d\s\-]{7,15}$/.test(f.phone)) e.phone = "Enter a valid 10-digit number";
  if (!f.pickup.trim()) e.pickup = "Pickup location is required";
  if (!f.drop.trim()) e.drop = "Destination is required";
  if (!f.travelDate) e.travelDate = "Travel date is required";
  if (!f.passengers) e.passengers = "Passenger count is required";
  return e;
}

const INIT: FormState = {
  name: "",
  phone: "",
  pickup: "",
  drop: "",
  travelDate: "",
  returnDate: "",
  vehicleType: "Force Urbania (16/17 Seater)",
  passengers: "4",
  requirements: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    openWhatsApp(buildBookingMessage(form));
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const inputCls = (err?: string) =>
    `w-full px-4 py-3 border rounded-xl text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all appearance-none ${
      err
        ? "border-[#C8102E] focus:border-[#C8102E] focus:ring-[#C8102E]/10"
        : "border-slate-200 focus:border-[#C8102E] focus:ring-[#C8102E]/10"
    }`;

  return (
    <div className="overflow-x-hidden bg-white text-[#0D1B3E]">
      {/* ── Contact Hero ── */}
      <section className="relative bg-gradient-to-br from-[#060D1E] via-[#0D1B3E] to-[#16274E] pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[#C8102E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 text-[#FFB3BE] text-xs font-black uppercase tracking-widest"
          >
            <PhoneCall size={13} />
            DIRECT TO DISPATCH TEAM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase mb-4"
          >
            Contact & Quick Booking
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/75 max-w-xl mx-auto leading-relaxed"
          >
            Tell us your travel details and we'll dispatch an instant confirmation directly to your
            WhatsApp with vehicle choices and fare quotes.
          </motion.p>
        </div>
      </section>

      {/* ── Form & Info Layout ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Booking Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-9">
              <h2 className="text-2xl font-black text-[#0D1B3E] mb-1">Trip Booking Enquiry</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-8 leading-relaxed">
                Fill out the form below. Once clicked, your formatted travel requisition will open
                directly on WhatsApp for the owner to review and confirm.
              </p>

              {sent && (
                <div className="mb-6 px-5 py-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                  Your enquiry has been dispatched to WhatsApp!
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 text-left">
                {/* Personal Section */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 mb-4">
                    1. Passenger Information
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Your full name"
                        className={inputCls(errors.name)}
                      />
                      {errors.name && <p className="text-xs text-[#C8102E] mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className={inputCls(errors.phone)}
                      />
                      {errors.phone && <p className="text-xs text-[#C8102E] mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Trip Section */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 mb-4">
                    2. Route & Journey Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Pickup Location *
                      </label>
                      <input
                        value={form.pickup}
                        onChange={(e) => set("pickup", e.target.value)}
                        placeholder="e.g. Nellore Railway Station"
                        className={inputCls(errors.pickup)}
                      />
                      {errors.pickup && <p className="text-xs text-[#C8102E] mt-1">{errors.pickup}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Destination *
                      </label>
                      <input
                        value={form.drop}
                        onChange={(e) => set("drop", e.target.value)}
                        placeholder="e.g. Tirumala / Chennai Airport"
                        className={inputCls(errors.drop)}
                      />
                      {errors.drop && <p className="text-xs text-[#C8102E] mt-1">{errors.drop}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Travel Date *
                      </label>
                      <input
                        type="date"
                        value={form.travelDate}
                        onChange={(e) => set("travelDate", e.target.value)}
                        className={inputCls(errors.travelDate)}
                      />
                      {errors.travelDate && (
                        <p className="text-xs text-[#C8102E] mt-1">{errors.travelDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Return Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={form.returnDate}
                        onChange={(e) => set("returnDate", e.target.value)}
                        className={inputCls()}
                      />
                    </div>
                  </div>
                </div>

                {/* Fleet Section */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 mb-4">
                    3. Vehicle & Group Size
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Vehicle Required *
                      </label>
                      <select
                        value={form.vehicleType}
                        onChange={(e) => set("vehicleType", e.target.value)}
                        className={inputCls()}
                      >
                        <option value="Force Urbania (16/17 Seater)">Force Urbania (16/17 Seater)</option>
                        <option value="Innova Crysta (7/8 Seater)">Innova Crysta (7/8 Seater)</option>
                        <option value="Innova Hycross (7 Seater Luxury)">
                          Innova Hycross (7 Seater Luxury)
                        </option>
                        <option value="Tempo Traveller (12/17 Seater)">
                          Tempo Traveller (12/17 Seater)
                        </option>
                        <option value="Tourist Bus (40/50 Seater)">Tourist Bus (40/50 Seater)</option>
                        <option value="Toyota Fortuner (4x4 SUV)">Toyota Fortuner (4x4 SUV)</option>
                        <option value="Executive Sedan (Etios / Dzire)">
                          Executive Sedan (Etios / Dzire)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Number of Passengers *
                      </label>
                      <select
                        value={form.passengers}
                        onChange={(e) => set("passengers", e.target.value)}
                        className={inputCls(errors.passengers)}
                      >
                        <option value="1-4 Pax">1 - 4 Passengers</option>
                        <option value="5-7 Pax">5 - 7 Passengers</option>
                        <option value="8-12 Pax">8 - 12 Passengers</option>
                        <option value="13-17 Pax">13 - 17 Passengers</option>
                        <option value="18-32 Pax">18 - 32 Passengers</option>
                        <option value="33-50+ Pax">33 - 50+ Passengers</option>
                      </select>
                      {errors.passengers && (
                        <p className="text-xs text-[#C8102E] mt-1">{errors.passengers}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Special Requests or Luggage Notes (Optional)
                  </label>
                  <textarea
                    value={form.requirements}
                    onChange={(e) => set("requirements", e.target.value)}
                    rows={3}
                    placeholder="Specific boarding point, timing constraints, baby stroller, luggage count..."
                    className={inputCls() + " resize-none"}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-3 flex items-center justify-center gap-2.5 py-4 bg-[#C8102E] hover:bg-[#A50D26] text-white text-sm font-black uppercase tracking-wider rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                >
                  <MessageCircle size={18} />
                  Send Booking Enquiry via WhatsApp
                </motion.button>
              </form>
            </div>

            {/* Right: Contact & Quick WhatsApp Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* WhatsApp Card */}
              <div className="bg-[#C8102E] text-white rounded-3xl p-7 shadow-xl">
                <h3 className="text-xl font-black mb-2">Direct WhatsApp Hotline</h3>
                <p className="text-xs sm:text-sm text-white/85 mb-5 leading-relaxed">
                  Need a car within the next 2 hours or want to speak with our travel manager directly?
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    openWhatsApp(
                      "Hi! I need urgent travel assistance from Vasu Car Travels Nellore."
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-[#C8102E] text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                >
                  <MessageCircle size={18} /> Chat Directly on WhatsApp
                </motion.button>
              </div>

              {/* Business Contact Info Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7">
                <h3 className="text-lg font-black text-[#0D1B3E] mb-5">Office Coordinates</h3>
                <ul className="flex flex-col gap-4 text-xs sm:text-sm">
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0 text-[#C8102E]">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Dispatch Phone
                      </span>
                      <p className="font-bold text-[#0D1B3E] mt-0.5">{SITE_CONFIG.PHONE}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0 text-[#C8102E]">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Official Email
                      </span>
                      <p className="font-bold text-[#0D1B3E] mt-0.5 break-all">{SITE_CONFIG.EMAIL}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0 text-[#C8102E]">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Headquarters
                      </span>
                      <p className="font-bold text-[#0D1B3E] mt-0.5">{SITE_CONFIG.ADDRESS}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Operating Hours */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-7">
                <h3 className="flex items-center gap-2 text-base font-black text-[#0D1B3E] mb-4">
                  <Clock size={16} className="text-[#C8102E]" /> Operating Timings
                </h3>
                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-gray-500 font-semibold">Office Desk</span>
                    <span className="font-black text-[#0D1B3E]">6:00 AM – 10:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-gray-500 font-semibold">Emergency Cab Dispatch</span>
                    <span className="font-black text-emerald-600">24/7 Available</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500 font-semibold">WhatsApp Response</span>
                    <span className="font-black text-emerald-600">&lt; 15 Mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
