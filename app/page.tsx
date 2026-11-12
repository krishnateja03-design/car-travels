"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Clock,
  MapPin,
  Users,
  Car,
  Truck,
  Bus,
  Compass,
  PhoneCall,
  Calendar,
} from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import { openWhatsApp, buildBookingMessage } from "@/lib/whatsapp";
import { VEHICLES } from "@/lib/data";

const WHY_US_BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Safe & Reliable Travel",
    desc: "GPS-enabled fleet, background-verified chauffeurs, and emergency 24/7 roadside assistance.",
  },
  {
    icon: Car,
    title: "Well Maintained Vehicles",
    desc: "Rigorous safety inspection before every outstation trip. Chilled dual AC and pristine interiors.",
  },
  {
    icon: Users,
    title: "Professional Drivers",
    desc: "Courteous, verified drivers with 10+ years of highway and temple ghat-road mastery.",
  },
  {
    icon: Clock,
    title: "24/7 Dispatch Support",
    desc: "Round-the-clock booking team ready for emergency airport runs and early morning darshans.",
  },
];

const SERVICE_SOLUTIONS = [
  {
    label: "Car Rentals",
    sub: "(South India)",
    desc: "Sedans & SUVs for city, business & airport transfers",
    icon: Car,
    href: "/vehicles?cat=Sedans",
  },
  {
    label: "Tempo Traveller",
    sub: "(All India)",
    desc: "9 to 17 seater luxury pushback vans for group yatras",
    icon: Truck,
    href: "/vehicles?cat=Tempo%20Travellers",
  },
  {
    label: "Bus Rentals",
    sub: "(All India)",
    desc: "Air-suspension luxury coaches for weddings & tours",
    icon: Bus,
    href: "/vehicles?cat=Buses",
  },
  {
    label: "Tours & Packages",
    sub: "(South India)",
    desc: "Custom holiday & temple circuits with hotel bookings",
    icon: Compass,
    href: "/tours",
  },
];

const VEHICLE_CATEGORIES_LIST = [
  "All",
  "Luxury Vans",
  "SUVs & MPVs",
  "Tempo Travellers",
  "Buses",
  "Sedans",
];

export default function Home() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    travelDate: "",
    returnDate: "",
    vehicleType: "Force Urbania (16/17 Seater)",
    passengers: "4",
    requirements: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const handleWA = () =>
    openWhatsApp("Hi! I would like to book a car with Vasu Car Travels, Nellore.");

  const handleBookingSubmit = (e: React.FormEvent) => {
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
  };

  const filteredVehicles =
    selectedCat === "All" ? VEHICLES : VEHICLES.filter((v) => v.category === selectedCat);

  return (
    <div className="bg-white text-[#0D1B3E] overflow-x-hidden">
      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Exact Reference Screen 1)
      ══════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-br from-[#060D1E] via-[#0D1B3E] to-[#16274E]">
        {/* Exact Scenic Mountain Road Background from Reference */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <Image
            src="/vehicles/hero-bg.jpg"
            alt="Scenic Highway Road Trip Across South India"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#C8102E]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse-dot" />
              <span className="text-[11px] sm:text-xs font-black tracking-[2px] uppercase text-white/90">
                VASU CAR TRAVELS – NELLORE
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.06] uppercase mb-5"
            >
              YOUR JOURNEY, <br />
              <span className="text-[#C8102E] drop-shadow-sm">OUR PRIORITY</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-2xl text-white/80 font-medium mb-8 leading-relaxed"
            >
              Premium Car Rentals Across South India
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWA}
                className="flex items-center gap-2 px-8 py-4 bg-[#C8102E] hover:bg-[#A50D26] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                <MessageCircle size={18} />
                Book on WhatsApp
              </motion.button>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/vehicles"
                  className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 backdrop-blur-md transition-all"
                >
                  Explore Vehicles <ChevronRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* EXACT Visual Showcase Card (Force Urbania + Innova Crysta + Hycross from Reference) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 aspect-[16/8] sm:aspect-[21/9] bg-slate-900"
          >
            <Image
              src="/vehicles/fleet-hero.jpg"
              alt="Force Urbania, Innova Crysta & Hycross Luxury Fleet"
              fill
              priority
              className="object-cover"
              sizes="(max-width:1200px) 100vw,1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4 text-white">
                <div>
                  <span className="px-3 py-1 bg-[#C8102E] text-white text-[11px] font-black uppercase tracking-wider rounded-md shadow-sm">
                    Fleet Showcase
                  </span>
                  <p className="text-2xl sm:text-3xl font-black mt-2">
                    Force Urbania • Innova Crysta • Luxury Hycross
                  </p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">
                    Sanitized, AC Luxury Vans, MPVs, Coaches & Airport Sedans in Nellore
                  </p>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="text-xs font-bold text-white/60">Transparent Outstation Pricing</span>
                  <p className="text-sm font-extrabold text-emerald-400">All-Inclusive Fixed Quotes</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4 Feature Badges (Exact from Reference Hero) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
            {WHY_US_BENEFITS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#C8102E]/20 flex items-center justify-center shrink-0 text-[#C8102E]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                      {item.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. COMFORTABLE RIDES / ABOUT SECTION (Exact Reference Screen 1 Bottom)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-[#C8102E]" />
                <span className="text-xs font-black tracking-[2px] uppercase text-[#C8102E]">
                  ABOUT VASU CAR TRAVELS
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0D1B3E] tracking-tight leading-tight mb-6">
                Comfortable Rides. <br />
                <span className="text-[#C8102E]">Unforgettable Journeys.</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                VASU CAR TRAVELS, based in Nellore, offers premium car and van rentals across South India
                and tempo travellers & buses across India. Whether it's a family pilgrimage to Tirupati,
                corporate airport shuttle, wedding convoy or an extended group tour — we make your
                journey smooth, safe, and memorable.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C8102E] hover:bg-[#A50D26] text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Know More →
                </Link>
                <button
                  onClick={handleWA}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-100 text-[#0D1B3E] text-sm font-bold rounded-xl border border-gray-300 shadow-xs transition-all cursor-pointer"
                >
                  <MessageCircle size={17} className="text-[#25D366]" /> Chat on WhatsApp
                </button>
              </div>
            </div>

            {/* Right Card with EXACT "Explore South India" Photo from Reference Screen 1 */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group bg-slate-900 border border-slate-200">
                <Image
                  src="/vehicles/explore-south-india.jpg"
                  alt="Explore South India Tours with Vasu Car Travels"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width:1024px) 100vw,500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-8">
                  <div>
                    <span className="px-3 py-1 bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-wider rounded-md shadow-sm">
                      Speciality Tours
                    </span>
                    <h3 className="text-3xl font-black text-white mt-2 tracking-tight">
                      Explore South India
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-1">
                      Nellore • Tirupati • Chennai • Bangalore • Hyderabad • Ooty • Coorg • Goa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. TRAVEL SOLUTIONS FOR EVERY NEED (Reference Screen 1 Bottom Icons)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-[#C8102E]" />
              <span className="text-xs font-black tracking-[2px] uppercase text-[#C8102E]">
                OUR SERVICES
              </span>
              <span className="w-6 h-0.5 bg-[#C8102E]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B3E] tracking-tight">
              Travel Solutions for Every Need
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_SOLUTIONS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Link
                  key={idx}
                  href={s.href}
                  className="group flex flex-col items-center justify-center p-8 bg-slate-50 hover:bg-[#0D1B3E] border border-slate-200/80 hover:border-[#0D1B3E] rounded-3xl transition-all duration-300 text-center shadow-xs hover:shadow-2xl hover:-translate-y-1.5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white group-hover:bg-[#C8102E] flex items-center justify-center shadow-md mb-5 transition-colors">
                    <Icon
                      size={30}
                      className="text-[#0D1B3E] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-lg font-black text-[#0D1B3E] group-hover:text-white transition-colors">
                    {s.label}
                  </h3>
                  <span className="text-xs font-black text-[#C8102E] group-hover:text-amber-300 transition-colors mt-0.5">
                    {s.sub}
                  </span>
                  <p className="text-xs text-gray-500 group-hover:text-white/70 transition-colors mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. PREMIUM VEHICLES FOR EVERY JOURNEY (Exact Reference Middle Screen)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-[#C8102E]" />
                <span className="text-xs font-black tracking-[2px] uppercase text-[#C8102E]">
                  OUR FLEET
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0D1B3E] tracking-tight">
                Premium Vehicles for Every Journey
              </h2>
              <p className="text-sm text-gray-500 mt-2 max-w-xl">
                Well-maintained, comfortable, and reliable vehicles for your travel needs in Nellore
                and across South India.
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {VEHICLE_CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCat === cat
                      ? "bg-[#0D1B3E] text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Cards Grid - 6 EXACT Photos Cropped from Reference Middle Screen */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.slice(0, 6).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 px-9 py-4 bg-[#0D1B3E] hover:bg-[#1A2F5E] text-white text-sm font-black uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              View Full Fleet (All Categories) →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. PLAN YOUR JOURNEY & BOOKING ENQUIRY (Exact Reference Right Screen)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" id="booking-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-[#C8102E]" />
              <span className="text-xs font-black tracking-[2px] uppercase text-[#C8102E]">
                GET IN TOUCH
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0D1B3E] tracking-tight">
              Plan Your Journey
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Tell us your travel details and we'll get back to you with the best vehicle and quote.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Booking Form (Exact matching Reference Right Screen) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-9">
              <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#C8102E] flex items-center justify-center text-white shadow-md">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0D1B3E]">Booking Enquiry</h3>
                  <p className="text-xs text-gray-500">Fast confirmation via WhatsApp directly to owner</p>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4 text-left">
                {/* Name */}
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                    Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-all"
                  />
                </div>

                {/* Pickup & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                      Pickup Location *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.pickup}
                      onChange={(e) => set("pickup", e.target.value)}
                      placeholder="Enter pickup location"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                      Destination *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.drop}
                      onChange={(e) => set("drop", e.target.value)}
                      placeholder="Enter destination"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-all"
                    />
                  </div>
                </div>

                {/* Travel Date & Return Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                      Travel Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={form.travelDate}
                      onChange={(e) => set("travelDate", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-all"
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
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-all"
                    />
                  </div>
                </div>

                {/* Vehicle Required & Passengers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                      Vehicle Required *
                    </label>
                    <select
                      value={form.vehicleType}
                      onChange={(e) => set("vehicleType", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-all"
                    >
                      <option value="Force Urbania">Force Urbania</option>
                      <option value="Innova Crysta">Innova Crysta</option>
                      <option value="Innova Hycross">Innova Hycross</option>
                      <option value="Tempo Traveller">Tempo Traveller</option>
                      <option value="Tourist Bus">Tourist Bus</option>
                      <option value="Other Cars (Sedans / SUVs)">Other Cars (Sedans / SUVs)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                      Number of Passengers *
                    </label>
                    <select
                      value={form.passengers}
                      onChange={(e) => set("passengers", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-all"
                    >
                      <option value="1-4 Passengers">1 - 4 Passengers</option>
                      <option value="5-7 Passengers">5 - 7 Passengers</option>
                      <option value="8-12 Passengers">8 - 12 Passengers</option>
                      <option value="13-17 Passengers">13 - 17 Passengers</option>
                      <option value="18-32 Passengers">18 - 32 Passengers</option>
                      <option value="33-50+ Passengers">33 - 50+ Passengers</option>
                    </select>
                  </div>
                </div>

                {/* Submit button directly to WhatsApp */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-3 w-full flex items-center justify-center gap-2 py-4 bg-[#C8102E] hover:bg-[#A50D26] text-white text-base font-black uppercase tracking-wider rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                >
                  <MessageCircle size={20} />
                  Book on WhatsApp
                </motion.button>
                <p className="text-center text-xs text-gray-400 font-semibold mt-1">
                  We'll get back to you shortly on WhatsApp with instant availability and fare quotes.
                </p>
              </form>
            </div>

            {/* Right: Why Choose Us & Scenic Photo (Exact from Customer Reference Screen 3) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Navy Blue Card */}
              <div className="bg-[#0D1B3E] text-white rounded-3xl p-8 shadow-2xl border border-slate-800">
                <h3 className="text-2xl font-black mb-6">Why Choose Us?</h3>
                <div className="flex flex-col gap-5 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Car size={22} className="text-[#C8102E]" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-base">Wide Range of Vehicles</h4>
                      <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                        Cars, Tempo Travellers, Buses
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck size={22} className="text-[#C8102E]" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-base">Well Maintained Fleet</h4>
                      <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                        Clean, Safe & Comfortable
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Users size={22} className="text-[#C8102E]" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-base">Experienced Drivers</h4>
                      <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                        Professional & Verified
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Calendar size={22} className="text-[#C8102E]" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-base">Flexible Booking</h4>
                      <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                        Easy & Hassle Free
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* EXACT Scenic Highway Photo from Customer Reference Screen 3 */}
              <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl group border border-slate-200">
                <Image
                  src="/vehicles/scenic-road.jpg"
                  alt="Scenic highway travel"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width:1024px) 100vw,500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E] via-[#0D1B3E]/30 to-transparent flex items-end p-8">
                  <div>
                    <p className="font-serif italic text-white/95 text-2xl font-black">
                      Your Journey, <br />
                      <span className="text-[#C8102E] font-sans not-italic font-black text-xl">
                        Our Priority
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Area Bar (Exact from Reference Bottom) */}
          <div className="mt-14 p-7 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-[#C8102E]" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                  Our Service Area
                </span>
                <p className="text-base sm:text-lg font-black text-[#0D1B3E]">
                  South India Car Rentals <span className="text-gray-300 mx-2">|</span> Tempo & Bus
                  Rentals Across India
                </p>
              </div>
            </div>
            <p className="text-xs font-bold text-gray-500">
              Tamil Nadu • Kerala • Karnataka • Andhra Pradesh • Telangana • And More...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
