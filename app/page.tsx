"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MessageCircle, ChevronRight, Shield, Clock, Star, MapPin,
  Users, Car, CheckCircle, Bus, Truck, ArrowRight, Phone,
} from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import { openWhatsApp, buildBookingMessage } from "@/lib/whatsapp";
import { VEHICLES } from "@/lib/data";

/* ─── data ─────────────────────────────────────────────── */
const WHY_US = [
  { icon: Shield, title: "Safe & Reliable", desc: "Sanitized, well-maintained vehicles with professional, licensed drivers on every trip." },
  { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock service for airport transfers, emergencies, and planned journeys." },
  { icon: Star, title: "5-Star Rated", desc: "Consistently rated 5 stars by thousands of happy customers across South India." },
  { icon: MapPin, title: "Wide Coverage", desc: "All major destinations across AP, Telangana, Tamil Nadu & Karnataka." },
  { icon: Users, title: "Expert Drivers", desc: "Experienced local drivers who know every route for a smooth, comfortable journey." },
  { icon: Car, title: "Premium Fleet", desc: "Economy sedans to luxury coaches — the right vehicle for every trip." },
  { icon: MessageCircle, title: "Instant Booking", desc: "Book instantly via WhatsApp. Get confirmation in minutes, not hours." },
  { icon: CheckCircle, title: "No Hidden Charges", desc: "Transparent, all-inclusive pricing. What you see is what you pay." },
];

const TESTIMONIALS = [
  { text: "Excellent service! The driver was punctual and the car was spotless. Highly recommend Vasu Car Travels for Tirupati trips.", name: "Ravi Kumar", loc: "Nellore", stars: 5 },
  { text: "Booked a Tempo Traveller for our family trip to Ooty. Everything was smooth — the driver knew all the best stops!", name: "Priya Sharma", loc: "Nellore", stars: 5 },
  { text: "Corporate trips to Hyderabad are now stress-free thanks to Vasu Cars. Professional, on-time and comfortable every time.", name: "Suresh Reddy", loc: "Nellore", stars: 5 },
];

const DESTINATIONS = [
  { name: "Tirupati", dist: "140 km", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&q=80" },
  { name: "Chennai", dist: "170 km", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&q=80" },
  { name: "Bangalore", dist: "380 km", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=500&q=80" },
  { name: "Hyderabad", dist: "280 km", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&q=80" },
];

const CATEGORIES = [
  { label: "Sedan", icon: Car, count: 2 },
  { label: "SUV", icon: Car, count: 2 },
  { label: "Tempo Traveller", icon: Truck, count: 2 },
  { label: "Mini Bus", icon: Bus, count: 2 },
  { label: "Tourist Bus", icon: Bus, count: 1 },
  { label: "Luxury", icon: Star, count: 2 },
];

const FEATURED = VEHICLES.slice(0, 3);

/* ─── component ────────────────────────────────────────── */
export default function Home() {
  const [form, setForm] = useState({ pickup: "", drop: "", date: "", vehicleType: "Sedan" });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const handleWA = () => openWhatsApp("Hi! I'd like to book a car with Vasu Car Travels, Nellore.");

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(buildBookingMessage({
      name: "Customer", phone: "", pickup: form.pickup, drop: form.drop,
      travelDate: form.date, returnDate: "", vehicleType: form.vehicleType,
      passengers: "", requirements: "",
    }));
  };

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-[#0D1B3E] focus:outline-none focus:ring-2 focus:ring-[#0D1B3E]/10 transition-all appearance-none";
  const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5";

  return (
    <div className="animate-fade-up">
      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=85"
            alt="South India highway travel"
            fill priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#071020]/92 via-[#0D1B3E]/80 to-[#0D1B3E]/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8102E]/20 border border-[#C8102E]/40 rounded-full mb-7">
            <span className="w-2 h-2 bg-[#C8102E] rounded-full animate-pulse-dot" />
            <span className="text-[13px] font-semibold text-[#FFB3BE] tracking-wide">
              Premium Car Rentals · Nellore, AP
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-4">
            Your Journey,
            <span className="block text-[#D4AF37]">Our Priority.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/70 font-light mb-4">
            Premium Car Rentals Across South India
          </p>
          <p className="text-base text-white/60 max-w-xl leading-relaxed mb-10">
            From comfortable sedans to spacious buses — travel in style and safety with VASU CAR TRAVELS. Trusted by thousands of happy travellers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={handleWA}
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1DB954] text-white text-base font-bold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
            >
              <MessageCircle size={20} />
              Book on WhatsApp
            </button>
            <Link
              href="/vehicles"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/60 hover:bg-white/10 hover:border-white text-white text-base font-semibold rounded-lg transition-all"
            >
              Explore Vehicles <ChevronRight size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 pt-10 border-t border-white/12">
            {[["20000+", "Happy Customers"], ["20+", "Years Experience"], ["10+", "Vehicles"], ["24/7", "Support"]].map(([n, l]) => (
              <div key={l}>
                <div className="text-3xl font-extrabold text-white leading-none">{n}</div>
                <div className="text-sm text-white/55 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          QUICK BOOKING BAR
      ════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="-mt-12 relative z-10 bg-white rounded-2xl shadow-2xl p-7 border border-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <MapPin size={20} className="text-[#C8102E]" />
            <h2 className="text-lg font-bold text-[#0D1B3E]">Quick Booking</h2>
          </div>
          <form onSubmit={handleQuickBook}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className={labelCls} htmlFor="b-pickup">Pickup Location</label>
              <input id="b-pickup" required value={form.pickup} onChange={e => set("pickup", e.target.value)}
                placeholder="e.g. Nellore" className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="b-drop">Drop Location</label>
              <input id="b-drop" required value={form.drop} onChange={e => set("drop", e.target.value)}
                placeholder="e.g. Tirupati" className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="b-date">Travel Date</label>
              <input id="b-date" required type="date" value={form.date} onChange={e => set("date", e.target.value)}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="b-vtype">Vehicle Type</label>
              <select id="b-vtype" value={form.vehicleType} onChange={e => set("vehicleType", e.target.value)}
                className={inputCls}>
                {CATEGORIES.map(c => <option key={c.label}>{c.label}</option>)}
              </select>
            </div>
            <button type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C8102E] hover:bg-[#A50D26] text-white font-bold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer h-[46px]">
              <MessageCircle size={16} />
              Check via WhatsApp
            </button>
          </form>
        </div>
      </div>

      {/* ════════════════════════════════
          VEHICLE CATEGORIES
      ════════════════════════════════ */}
      <section className="py-20" aria-label="Vehicle categories">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">Our Fleet</span>
            <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-[#0D1B3E] mt-2 mb-3">Choose Your Vehicle</h2>
            <div className="w-14 h-1 bg-[#C8102E] rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              From compact sedans to large tourist buses — the right vehicle for every trip, every group, and every budget.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(({ label, icon: Icon, count }) => (
              <Link
                key={label}
                href={`/vehicles?cat=${encodeURIComponent(label)}`}
                className="group flex flex-col items-center gap-3 p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-[#0D1B3E] hover:shadow-lg transition-all text-center"
              >
                <div className="w-14 h-14 bg-gray-100 group-hover:bg-[#0D1B3E] rounded-2xl flex items-center justify-center transition-all">
                  <Icon size={24} className="text-[#0D1B3E] group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-bold text-gray-800 leading-tight">{label}</span>
                <span className="text-[11px] text-gray-400">{count} Vehicles</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FEATURED VEHICLES
      ════════════════════════════════ */}
      <section className="py-20 bg-gray-50" aria-label="Featured vehicles">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
            <div>
              <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">Popular Picks</span>
              <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-[#0D1B3E] mt-2">Featured Vehicles</h2>
            </div>
            <Link
              href="/vehicles"
              className="flex items-center gap-2 px-6 py-3 bg-[#0D1B3E] text-white text-sm font-semibold rounded-lg hover:bg-[#1A2F5E] transition-all"
            >
              View All Vehicles <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {FEATURED.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════ */}
      <section className="py-20" aria-label="Why choose us">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">Why Us</span>
            <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-[#0D1B3E] mt-2 mb-3">Why Choose Vasu Car Travels?</h2>
            <div className="w-14 h-1 bg-[#C8102E] rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">We don't just take you from A to B — we make every journey memorable.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="group p-7 border border-gray-100 rounded-xl hover:border-[#0D1B3E] hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-[#0D1B3E]/7 group-hover:bg-[#0D1B3E] rounded-2xl flex items-center justify-center mb-4 transition-all">
                  <Icon size={24} className="text-[#0D1B3E] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          ABOUT
      ════════════════════════════════ */}
      <section className="py-20 bg-gray-50" aria-label="About">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Images */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80"
                  alt="Vasu Car Travels fleet"
                  fill className="object-cover" sizes="(max-width:1024px) 100vw,560px"
                />
              </div>
              {/* Accent image */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 aspect-[4/3] rounded-xl overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80"
                  alt="Professional driver"
                  fill className="object-cover" sizes="200px"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute top-6 -left-5 bg-[#0D1B3E] text-white px-5 py-3 rounded-xl shadow-xl text-center">
                <div className="text-3xl font-extrabold leading-none">10+</div>
                <div className="text-[11px] opacity-70 uppercase tracking-wide mt-1">Years of Trust</div>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">About Us</span>
              <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-[#0D1B3E] leading-tight">
                Nellore's Most Trusted Car Travel Service
              </h2>
              <div className="w-14 h-1 bg-[#C8102E] rounded" />
              <p className="text-gray-500 leading-relaxed">
                VASU CAR TRAVELS has been Nellore's premier car rental and travel service for over a decade. Founded with a commitment to safety, punctuality, and exceptional customer service, we've grown to serve thousands of families, corporates, and pilgrims across South India.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Our fleet of well-maintained vehicles, combined with our professional driver network, ensures every journey is comfortable, safe, and memorable.
              </p>

              <ul className="flex flex-col gap-3">
                {["GPS-tracked fleet for complete safety", "Professional, licensed & verified drivers", "Transparent, all-inclusive pricing", "24/7 customer support & emergency assistance"].map(h => (
                  <li key={h} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle size={17} className="text-[#C8102E] shrink-0" /> {h}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 flex-wrap mt-2">
                <button onClick={handleWA}
                  className="flex items-center gap-2 px-7 py-3.5 bg-[#C8102E] hover:bg-[#A50D26] text-white font-bold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
                  <MessageCircle size={16} /> Book Now
                </button>
                <Link href="/about"
                  className="flex items-center gap-2 px-7 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-all">
                  Learn More <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          DESTINATIONS
      ════════════════════════════════ */}
      <section className="py-20" aria-label="Destinations">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">Service Areas</span>
            <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-[#0D1B3E] mt-2 mb-3">Popular Destinations</h2>
            <div className="w-14 h-1 bg-[#C8102E] rounded mx-auto mb-4" />
            <p className="text-gray-500">We cover all major destinations from Nellore across South India.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {DESTINATIONS.map(d => (
              <Link key={d.name} href="/contact"
                className="group relative rounded-xl overflow-hidden aspect-[3/4] block"
                aria-label={`Book trip to ${d.name}`}>
                <Image src={d.img} alt={d.name} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:640px) 50vw,(max-width:1024px) 25vw,300px" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071020]/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white font-bold text-lg">{d.name}</div>
                  <div className="text-white/65 text-xs mt-1">{d.dist} from Nellore</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════ */}
      <section className="py-20 bg-[#0D1B3E]" aria-label="Testimonials">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[2px] uppercase text-[#FFB3BE]">Testimonials</span>
            <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-white mt-2 mb-3">What Our Customers Say</h2>
            <div className="w-14 h-1 bg-[#C8102E] rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}
                className="p-7 bg-white/7 border border-white/10 rounded-xl hover:bg-white/11 hover:-translate-y-1 transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm text-white/75 leading-relaxed italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#C8102E]/30 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CTA BANNER
      ════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-[#C8102E] to-[#9B0C23]" aria-label="Call to action">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-white mb-3">
                Ready to Plan Your Trip?
              </h2>
              <p className="text-white/80 text-lg">Get instant quotes and book your journey in minutes via WhatsApp.</p>
            </div>
            <div className="flex gap-4 flex-wrap shrink-0">
              <button onClick={handleWA}
                className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-[#C8102E] font-bold rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer">
                <MessageCircle size={18} /> Book on WhatsApp
              </button>
              <Link href="/contact"
                className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-all">
                <Phone size={18} /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
