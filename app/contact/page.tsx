"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { openWhatsApp, buildBookingMessage } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/config";
import { VEHICLE_CATEGORIES } from "@/lib/data";

type FormState = {
  name: string; phone: string; pickup: string; drop: string;
  travelDate: string; returnDate: string; vehicleType: string;
  passengers: string; requirements: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const VEHICLE_TYPES = VEHICLE_CATEGORIES.filter(c => c !== "All");

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim())    e.name = "Name is required";
  if (!f.phone.trim())   e.phone = "Phone is required";
  else if (!/^\+?[\d\s\-]{7,15}$/.test(f.phone)) e.phone = "Enter a valid phone number";
  if (!f.pickup.trim())  e.pickup = "Pickup location is required";
  if (!f.drop.trim())    e.drop = "Drop location is required";
  if (!f.travelDate)     e.travelDate = "Travel date is required";
  if (!f.passengers)     e.passengers = "Passengers is required";
  return e;
}

const INIT: FormState = {
  name: "", phone: "", pickup: "", drop: "", travelDate: "",
  returnDate: "", vehicleType: "Sedan", passengers: "", requirements: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof FormState, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    openWhatsApp(buildBookingMessage(form));
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const inputCls = (err?: string) =>
    `w-full px-4 py-3 border rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all appearance-none ${
      err ? "border-[#C8102E] focus:border-[#C8102E] focus:ring-[#C8102E]/10" : "border-gray-200 focus:border-[#0D1B3E] focus:ring-[#0D1B3E]/10"
    }`;

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#071020] to-[#1A2F5E] pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-bold tracking-[2px] uppercase text-[#FFB3BE]">Contact & Book</span>
          <h1 className="font-['Playfair_Display'] text-5xl font-extrabold text-white mt-3 mb-4">Book Your Trip</h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
            Fill in your travel details and we'll connect you instantly on WhatsApp with pricing and availability.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

            {/* ── Booking Form ── */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-extrabold text-[#0D1B3E] mb-1">Booking Enquiry</h2>
              <p className="text-sm text-gray-500 mb-7 leading-relaxed">
                Fill in your details and click "Send via WhatsApp" — your enquiry goes directly to us.
              </p>

              {sent && (
                <div className="mb-6 px-5 py-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-semibold">
                  ✅ Your enquiry has been sent to WhatsApp! We'll respond shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Personal */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-100 mb-4">Personal Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <input value={form.name} onChange={e=>set("name",e.target.value)}
                        placeholder="Your full name" className={inputCls(errors.name)} />
                      {errors.name && <p className="text-xs text-[#C8102E] mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                      <input type="tel" value={form.phone} onChange={e=>set("phone",e.target.value)}
                        placeholder="+91 XXXXX XXXXX" className={inputCls(errors.phone)} />
                      {errors.phone && <p className="text-xs text-[#C8102E] mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Trip */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-100 mb-4">Trip Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pickup Location *</label>
                      <input value={form.pickup} onChange={e=>set("pickup",e.target.value)}
                        placeholder="e.g. Nellore Railway Station" className={inputCls(errors.pickup)} />
                      {errors.pickup && <p className="text-xs text-[#C8102E] mt-1">{errors.pickup}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Drop Location *</label>
                      <input value={form.drop} onChange={e=>set("drop",e.target.value)}
                        placeholder="e.g. Tirupati Temple" className={inputCls(errors.drop)} />
                      {errors.drop && <p className="text-xs text-[#C8102E] mt-1">{errors.drop}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Travel Date *</label>
                      <input type="date" value={form.travelDate} onChange={e=>set("travelDate",e.target.value)}
                        className={inputCls(errors.travelDate)} />
                      {errors.travelDate && <p className="text-xs text-[#C8102E] mt-1">{errors.travelDate}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Return Date <span className="text-gray-400 font-normal">(Optional)</span></label>
                      <input type="date" value={form.returnDate} onChange={e=>set("returnDate",e.target.value)}
                        className={inputCls()} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Vehicle Type</label>
                      <select value={form.vehicleType} onChange={e=>set("vehicleType",e.target.value)}
                        className={inputCls()}>
                        {VEHICLE_TYPES.map(v=><option key={v}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Passengers *</label>
                      <select value={form.passengers} onChange={e=>set("passengers",e.target.value)}
                        className={inputCls(errors.passengers)}>
                        <option value="">Select</option>
                        {["1","2","3","4","5-7","8-12","13-20","21-45","46+"].map(o=><option key={o}>{o}</option>)}
                      </select>
                      {errors.passengers && <p className="text-xs text-[#C8102E] mt-1">{errors.passengers}</p>}
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Additional Requirements</label>
                  <textarea value={form.requirements} onChange={e=>set("requirements",e.target.value)} rows={4}
                    placeholder="Any special needs, preferred vehicle, stops on the way, luggage details..."
                    className={inputCls() + " resize-none"} />
                </div>

                <button type="submit"
                  className="flex items-center justify-center gap-3 py-4 bg-[#25D366] hover:bg-[#1DB954] text-white text-base font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl cursor-pointer">
                  <MessageCircle size={20} />
                  Send Booking Enquiry via WhatsApp
                </button>
              </form>
            </div>

            {/* ── Info Panel ── */}
            <div className="flex flex-col gap-5">
              {/* WhatsApp Card */}
              <div className="bg-gradient-to-br from-[#25D366] to-[#1DB954] rounded-2xl p-7 text-center">
                <h3 className="text-white font-bold text-lg mb-2">Quick WhatsApp Booking</h3>
                <p className="text-white/85 text-sm mb-5 leading-relaxed">Skip the form! Tap below to talk directly with us on WhatsApp.</p>
                <button onClick={() => openWhatsApp("Hi! I'd like to book a car with Vasu Car Travels, Nellore. Please help me with availability and pricing.")}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-[#25D366] font-bold rounded-xl transition-all hover:bg-gray-50 cursor-pointer">
                  <MessageCircle size={20} /> Open WhatsApp
                </button>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#0D1B3E] text-base mb-5">Contact Information</h3>
                <ul className="flex flex-col gap-4">
                  {[
                    { icon: Phone, label: "Phone / WhatsApp", value: SITE_CONFIG.PHONE },
                    { icon: Mail,  label: "Email",            value: SITE_CONFIG.EMAIL },
                    { icon: MapPin,label: "Location",         value: SITE_CONFIG.ADDRESS },
                  ].map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-[#0D1B3E]/7 rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-[#0D1B3E]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
                        <p className="text-sm text-gray-800 font-medium mt-0.5">{value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="flex items-center gap-2 font-bold text-[#0D1B3E] text-base mb-5">
                  <Clock size={16} className="text-[#C8102E]" /> Business Hours
                </h3>
                <ul className="flex flex-col gap-0">
                  {[
                    ["Monday – Friday", "6:00 AM – 10:00 PM"],
                    ["Saturday",        "6:00 AM – 10:00 PM"],
                    ["Sunday",          "7:00 AM – 9:00 PM"],
                    ["Emergencies",     "24/7 WhatsApp"],
                  ].map(([day, hours]) => (
                    <li key={day} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 text-sm">
                      <span className="text-gray-600">{day}</span>
                      <span className="text-emerald-600 font-semibold">{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

