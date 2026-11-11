"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MessageCircle, ChevronRight, ShieldCheck, Clock, Star, MapPin,
  Users, Car, CheckCircle, Bus, Truck, ArrowRight, Phone, Calendar,
  Sparkles, Award, Navigation
} from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import { openWhatsApp, buildBookingMessage } from "@/lib/whatsapp";
import { VEHICLES } from "@/lib/data";

const WHY_US_BENEFITS = [
  { icon: ShieldCheck, title: "Safe & Reliable Travel", desc: "Verified chauffeurs, GPS-enabled fleet, and thoroughly sanitized vehicles for high-speed highway peace of mind." },
  { icon: Car,         title: "Well Maintained Vehicles", desc: "Regularly serviced vehicles, pristine interiors, powerful dual AC, and zero breakdown guarantee." },
  { icon: Users,       title: "Professional Drivers", desc: "Courteous, non-smoking, well-trained drivers with deep knowledge of South India routes and destinations." },
  { icon: Clock,       title: "24/7 Dispatch Support", desc: "Round-the-clock emergency assistance, live trip tracking, and instant WhatsApp booking confirmation." },
];

const SERVICE_SOLUTIONS = [
  { label: "Car Rentals", sub: "(South India)", icon: Car, href: "/vehicles?cat=Sedans" },
  { label: "Tempo Traveller", sub: "(All India)", icon: Truck, href: "/vehicles?cat=Tempo%20Travellers" },
  { label: "Bus Rentals", sub: "(All India)", icon: Bus, href: "/vehicles?cat=Buses" },
  { label: "Tours & Packages", sub: "(South India)", icon: MapPin, href: "/tours" },
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
    vehicleType: "Innova Crysta",
    passengers: "4",
    requirements: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const handleWA = () => openWhatsApp("Hi! I'd like to book a car with Vasu Car Travels, Nellore.");

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(buildBookingMessage({
      name: form.name || "Customer",
      phone: form.phone || "Not specified",
      pickup: form.pickup,
      drop: form.drop,
      travelDate: form.travelDate,
      returnDate: form.returnDate,
      vehicleType: form.vehicleType,
      passengers: form.passengers,
      requirements: form.requirements,
    }));
  };

  const filteredVehicles = selectedCat === "All"
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === selectedCat);

  return (
    <div className="animate-fade-up bg-white text-[#0D1B3E]">

      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Mirroring Reference Image 1)
      ══════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-br from-[#071020] via-[#0D1B3E] to-[#1A2F5E]">
        {/* Background Image with scenic mountain / road overlay */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=85"
            alt="South India Scenic Travel Road"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E] via-transparent to-black/30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            {/* Tagline Indicator */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-0.5 bg-[#C8102E]" />
              <span className="text-xs font-black tracking-[2px] uppercase text-white/90">
                VASU CAR TRAVELS – NELLORE
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] uppercase mb-4">
              Your Journey, <br />
              <span className="text-[#C8102E]">Our Priority</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 font-medium mb-8">
              Premium Car Rentals Across South India
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleWA}
                className="flex items-center gap-2 px-7 py-3.5 bg-[#C8102E] hover:bg-[#A50D26] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle size={18} />
                Book on WhatsApp
              </button>
              <Link
                href="/vehicles"
                className="flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 backdrop-blur-sm transition-all"
              >
                Explore Vehicles <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Featured Vehicle Fleet Banner with Force Urbania & Innova */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[16/8] sm:aspect-[21/9] bg-black/40">
            <Image
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=85"
              alt="Premium fleet vehicles"
              fill
              priority
              className="object-cover"
              sizes="(max-width:1200px) 100vw,1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between w-full gap-4 text-white">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C8102E] bg-white px-2.5 py-0.5 rounded-sm">Fleet Showcase</span>
                  <p className="text-xl sm:text-2xl font-black mt-1">Force Urbania, Innova Crysta & Luxury Hycross</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-white/70">Starting at standard outstation km rates</span>
                  <p className="text-sm font-bold text-emerald-400">All-Inclusive Packages Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Feature Badges on Hero Footer (From Design Reference) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
            {WHY_US_BENEFITS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-xs">
                  <div className="w-10 h-10 rounded-lg bg-[#C8102E]/20 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#C8102E]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{item.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. COMFORTABLE RIDES / ABOUT SECTION (Mirroring Reference)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-[#C8102E]" />
                <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">
                  ABOUT VASU CAR TRAVELS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D1B3E] tracking-tight leading-tight mb-6">
                Comfortable Rides. <br />
                <span className="text-[#C8102E]">Unforgettable Journeys.</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                VASU CAR TRAVELS, based in Nellore, offers premium car and van rentals across South India and tempo travellers & buses across India. Whether it's a family trip, corporate travel, wedding or a group tour — we make your journey smooth, safe, and memorable.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8102E] hover:bg-[#A50D26] text-white text-sm font-bold rounded-lg shadow-md transition-all cursor-pointer"
                >
                  Know More →
                </Link>
                <button
                  onClick={handleWA}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-[#0D1B3E] text-sm font-bold rounded-lg border border-gray-300 transition-all cursor-pointer"
                >
                  <MessageCircle size={16} className="text-[#25D366]" /> Chat on WhatsApp
                </button>
              </div>
            </div>

            {/* Right Card with Landscape "Explore South India" Banner */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group">
                <Image
                  src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80"
                  alt="Explore South India with Vasu Car Travels"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:1024px) 100vw,500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div>
                    <span className="px-3 py-1 bg-[#C8102E] text-white text-xs font-black uppercase rounded-md">
                      Speciality Tours
                    </span>
                    <h3 className="text-2xl font-black text-white mt-2">Explore South India</h3>
                    <p className="text-xs text-white/80 mt-1">Nellore • Tirupati • Chennai • Bangalore • Hyderabad • Ooty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. TRAVEL SOLUTIONS FOR EVERY NEED (Mirroring Reference)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-[#C8102E]" />
              <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">
                OUR SERVICES
              </span>
              <span className="w-6 h-0.5 bg-[#C8102E]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B3E] tracking-tight">
              Travel Solutions for Every Need
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_SOLUTIONS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Link
                  key={idx}
                  href={s.href}
                  className="group flex flex-col items-center justify-center p-8 bg-gray-50 hover:bg-[#0D1B3E] border border-gray-100 hover:border-[#0D1B3E] rounded-2xl transition-all duration-300 text-center shadow-xs hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white group-hover:bg-[#C8102E] flex items-center justify-center shadow-sm mb-4 transition-colors">
                    <Icon size={28} className="text-[#0D1B3E] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-black text-[#0D1B3E] group-hover:text-white transition-colors">
                    {s.label}
                  </h3>
                  <span className="text-xs text-gray-500 group-hover:text-white/70 transition-colors mt-1 font-semibold">
                    {s.sub}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. PREMIUM VEHICLES FOR EVERY JOURNEY (Mirroring Middle Screen)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-[#C8102E]" />
                <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">
                  OUR FLEET
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B3E] tracking-tight">
                Premium Vehicles for Every Journey
              </h2>
              <p className="text-sm text-gray-500 mt-1 max-w-lg">
                Well-maintained, comfortable and reliable vehicles for your travel needs in Nellore and across South India.
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {VEHICLE_CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCat === cat
                      ? "bg-[#0D1B3E] text-white shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Cards Grid - 6 Featured Cards exact as in customer image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.slice(0, 6).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D1B3E] hover:bg-[#1A2F5E] text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              View Full Fleet (All 8+ Categories) →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. PLAN YOUR JOURNEY & BOOKING ENQUIRY (Mirroring Right Screen)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" id="booking-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-[#C8102E]" />
              <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">
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
            {/* Left Column: Booking Enquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
              <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#C8102E] flex items-center justify-center text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0D1B3E]">Booking Enquiry</h3>
                  <p className="text-xs text-gray-500">Fast confirmation via WhatsApp directly to owner</p>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4 text-left">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-colors"
                  />
                </div>

                {/* Pickup & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Pickup Location *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.pickup}
                      onChange={(e) => set("pickup", e.target.value)}
                      placeholder="Enter pickup location (e.g. Nellore)"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Destination *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.drop}
                      onChange={(e) => set("drop", e.target.value)}
                      placeholder="Enter destination (e.g. Tirupati / Chennai)"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-colors"
                    />
                  </div>
                </div>

                {/* Travel Date & Return Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Travel Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={form.travelDate}
                      onChange={(e) => set("travelDate", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Return Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={form.returnDate}
                      onChange={(e) => set("returnDate", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-colors"
                    />
                  </div>
                </div>

                {/* Vehicle Required & Number of Passengers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Vehicle Required *
                    </label>
                    <select
                      value={form.vehicleType}
                      onChange={(e) => set("vehicleType", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-colors"
                    >
                      <option value="Force Urbania (16/17 Seater)">Force Urbania (16/17 Seater)</option>
                      <option value="Innova Crysta (7/8 Seater)">Innova Crysta (7/8 Seater)</option>
                      <option value="Innova Hycross (7 Seater Luxury)">Innova Hycross (7 Seater Luxury)</option>
                      <option value="Tempo Traveller (12/17 Seater)">Tempo Traveller (12/17 Seater)</option>
                      <option value="Tourist Bus (40/50 Seater)">Tourist Bus (40/50 Seater)</option>
                      <option value="Toyota Fortuner (4x4 SUV)">Toyota Fortuner (4x4 SUV)</option>
                      <option value="Sedan (Etios / Dzire)">Sedan (Etios / Dzire)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Number of Passengers *
                    </label>
                    <select
                      value={form.passengers}
                      onChange={(e) => set("passengers", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-colors"
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

                {/* Additional details */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Special Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.requirements}
                    onChange={(e) => set("requirements", e.target.value)}
                    placeholder="Specific stops, AC preferences, luggage notes..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:bg-white focus:outline-none focus:border-[#C8102E] transition-colors resize-none"
                  />
                </div>

                {/* Submit button directly to WhatsApp */}
                <button
                  type="submit"
                  className="mt-2 w-full flex items-center justify-center gap-2 py-4 bg-[#C8102E] hover:bg-[#A50D26] text-white text-base font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <MessageCircle size={20} />
                  Book on WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400 font-semibold mt-1">
                  We'll get back to you shortly on WhatsApp with instant availability and fare quotes.
                </p>
              </form>
            </div>

            {/* Right Column: Why Choose Us & Road Image (Exact as Right Reference Screen) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Navy Blue Card */}
              <div className="bg-[#0D1B3E] text-white rounded-2xl p-7 shadow-xl">
                <h3 className="text-xl font-black mb-6">Why Choose Us?</h3>
                <div className="flex flex-col gap-5 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Car size={20} className="text-[#C8102E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Wide Range of Vehicles</h4>
                      <p className="text-xs text-white/60 mt-0.5">Cars, Tempo Travellers, Luxury Vans & Buses.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} className="text-[#C8102E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Well Maintained Fleet</h4>
                      <p className="text-xs text-white/60 mt-0.5">Clean, safe, comfortable, and sanitized.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Users size={20} className="text-[#C8102E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Experienced Drivers</h4>
                      <p className="text-xs text-white/60 mt-0.5">Professional, verified, and route experts.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Calendar size={20} className="text-[#C8102E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Flexible Booking</h4>
                      <p className="text-xs text-white/60 mt-0.5">Easy & hassle-free round trips and one-way drops.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highway Photo with "Your Journey, Our Priority" Watermark */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-lg group">
                <Image
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
                  alt="Scenic highway travel"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:1024px) 100vw,500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/90 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <p className="font-serif italic text-white/90 text-2xl font-black">
                      Your Journey, <br />
                      <span className="text-[#C8102E] font-sans not-italic font-black text-xl">Our Priority</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Area Bar (Exact from reference bottom) */}
          <div className="mt-14 p-6 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <MapPin size={22} className="text-[#C8102E] shrink-0" />
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">Our Service Area</span>
                <p className="text-base font-black text-[#0D1B3E]">
                  South India Car Rentals <span className="text-gray-300 mx-2">|</span> Tempo & Bus Rentals Across India
                </p>
              </div>
            </div>
            <p className="text-xs font-semibold text-gray-500">
              Tamil Nadu • Kerala • Karnataka • Andhra Pradesh • Telangana • And More...
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
