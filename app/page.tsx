"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Phone,
  ChevronDown,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import BookingModal from "@/components/BookingModal";
import SplitTextReveal from "@/components/SplitTextReveal";
import { VEHICLES } from "@/lib/data";

/* ─── Data ─────────────────────────────────────────────── */

const STATS = [
  { target: 15, suffix: "+", label: "Years of Service", icon: Award },
  { target: 50, suffix: "K+", label: "Happy Passengers", icon: Users },
  { target: 100, suffix: "%", label: "Verified Drivers", icon: ShieldCheck },
  { prefix: "24/7", target: 0, suffix: "", label: "WhatsApp Support", icon: Phone },
];

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || target === 0) return;
    let start = 0;
    const duration = 1600; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, target]);

  if (prefix) {
    return <span ref={ref}>{prefix}</span>;
  }

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    desc: "GPS-tracked fleet, police-verified chauffeurs, and 24/7 emergency roadside support.",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    desc: "Book on WhatsApp and get confirmed in minutes — no long wait times.",
  },
  {
    icon: TrendingUp,
    title: "Transparent Pricing",
    desc: "All-inclusive fixed quotes. Zero hidden toll, fuel, or night charges.",
  },
  {
    icon: Star,
    title: "Premium Comfort",
    desc: "Spotless interiors, chilled dual AC, and reclining seats on every journey.",
  },
];

const SERVICE_SOLUTIONS = [
  {
    label: "Car Rentals",
    sub: "South India",
    desc: "Sedans & SUVs for airport, city, and business travel",
    icon: Car,
    href: "/vehicles?cat=Sedans",
    highlight: "Daily & Outstation",
    color: "from-blue-600 to-blue-800",
  },
  {
    label: "SUV & MPV Fleet",
    sub: "South India",
    desc: "Hyundai Venue, Innova Crysta & 8-Seater Hycross for premium family trips",
    icon: Truck,
    href: "/vehicles?cat=SUVs%20%26%20MPVs",
    highlight: "Most Popular",
    color: "from-[#C8102E] to-rose-800",
  },
  {
    label: "Bus Rentals",
    sub: "All India",
    desc: "28+1 seater air-suspension luxury coaches for weddings, events & tours",
    icon: Bus,
    href: "/vehicles?cat=Buses",
    highlight: "Corporate & Weddings",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    label: "Tour Packages",
    sub: "South India",
    desc: "Tailored holiday & temple darshan circuits with verified stays",
    icon: Compass,
    href: "/tours",
    highlight: "Custom Circuits",
    color: "from-violet-600 to-violet-800",
  },
];

const DESTINATIONS_TICKER = [
  "Tirupati", "Ooty", "Coorg", "Madurai", "Hampi", "Kanyakumari",
  "Munnar", "Alleppey", "Goa", "Shirdi", "Mahabalipuram", "Thanjavur",
  "Bangalore", "Hyderabad", "Chennai", "Pondicherry", "Kodaikanal",
];

const VEHICLE_CATEGORIES_LIST = ["All", "Luxury Vans", "SUVs & MPVs", "Tempo Travellers", "Buses", "Sedans"];

/* ─── Page Component ───────────────────────────────────── */

export default function Home() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const filteredVehicles = selectedCat === "All" ? VEHICLES : VEHICLES.filter((v) => v.category === selectedCat);
  const displayVehicles = filteredVehicles.slice(0, 3);

  // Cinematic staggered entrance easing
  const cinematicReveal = (delay = 0) => ({
    initial: { opacity: 0, y: 32, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      duration: 0.9,
      delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <div className="bg-white text-[#0D1B3E] overflow-x-hidden selection:bg-[#C8102E] selection:text-white">

      {/* ══════════════════════════════════════════════════════════
          HERO — Full Screen, Cinematic, Premium
      ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=1920&q=90"
            alt="Scenic luxury highway travel road trip"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          {/* Balanced gradient overlay so the right side vehicle shines through cleanly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060D1E]/95 via-[#0D1B3E]/80 to-[#060D1E]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] via-transparent to-[#060D1E]/30" />
        </motion.div>

        {/* Ambient glows */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#C8102E]/15 rounded-full blur-[130px] pointer-events-none z-10 animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-blue-700/10 rounded-full blur-[120px] pointer-events-none z-10" />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">

          {/* Top brand badge */}
          <motion.div {...cinematicReveal(0)} className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full glass-panel border border-white/20 mb-8 backdrop-blur-xl shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8102E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C8102E]" />
            </span>
            <span className="text-[11px] font-black tracking-[3px] uppercase text-white/95">
              Vasu Car Travels · Nellore · Est. 2010
            </span>
          </motion.div>

          {/* Main Headline with Split Character / Word Spring Reveal */}
          <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] uppercase mb-6 max-w-4xl drop-shadow-2xl">
            <SplitTextReveal text="Your Journey," delay={0.1} />{" "}
            <span className="block text-gradient-red drop-shadow-[0_10px_20px_rgba(200,16,46,0.35)] mt-1">
              <SplitTextReveal text="Our Priority." delay={0.35} />
            </span>
          </h1>

          {/* Sub-headline */}
          <motion.p {...cinematicReveal(0.24)} className="text-base sm:text-lg text-white/85 font-normal mb-10 leading-relaxed max-w-xl text-balance">
            Premium car rentals across South India. Verified chauffeurs, clean AC fleet, and
            instant WhatsApp booking — your comfort guaranteed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...cinematicReveal(0.36)} className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 shimmer-button text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-2xl glow-red cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle size={20} className="fill-white group-hover:scale-110 transition-transform" />
              Book on WhatsApp
            </button>

            <Link
              href="/vehicles"
              className="flex items-center gap-2.5 px-8 py-4 glass-panel hover:bg-white/15 text-white font-bold text-sm rounded-2xl border border-white/20 transition-all hover:border-white/40 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Fleet <ChevronRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div {...cinematicReveal(0.48)} className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8">
            {[
              "On-Time Pickup Guarantee",
              "Zero Hidden Charges",
              "GPS Tracked Fleet",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 text-xs font-semibold text-white/80 tracking-wide"
              >
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                {t}
              </span>
            ))}
          </motion.div>

          {/* Stats Counters — Minimalist & Animated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 max-w-3xl pt-8 border-t border-white/10"
          >
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 + idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col group cursor-default"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
                    >
                      <Icon size={18} className="text-[#FF4B63]" />
                    </motion.div>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                      <AnimatedCounter
                        target={stat.target}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    </span>
                  </div>
                  <div className="text-xs font-medium text-white/60 tracking-wide pl-6">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          DESTINATIONS TICKER — Luxury Dark Navy Marquee Strip
      ══════════════════════════════════════════════════════════ */}
      <div className="bg-[#060D1E] border-y border-white/10 py-3.5 overflow-hidden relative shadow-inner">
        <div className="animate-ticker flex items-center gap-0 whitespace-nowrap select-none">
          {[...DESTINATIONS_TICKER, ...DESTINATIONS_TICKER].map((dest, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-xs sm:text-sm font-bold text-white/80 uppercase tracking-widest hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] shrink-0" />
              {dest}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          ABOUT / WHY VASU — Split premium layout
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-14 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -right-32 top-0 bottom-0 w-96 bg-slate-50 rounded-l-[80px] hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-0.5 bg-[#C8102E]" />
                  <span className="text-xs font-black tracking-[2.5px] uppercase text-[#C8102E]">About Vasu Car Travels</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D1B3E] tracking-tight leading-tight mb-4">
                  Comfortable Rides.{" "}
                  <span className="text-[#C8102E]">Unforgettable Journeys.</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  Based in Nellore, Vasu Car Travels has been the trusted choice for South India car
                  rentals since 2010. We serve families, corporates, pilgrims, and tourists with
                  premium vehicles, transparent pricing, and professional chauffeurs.
                </p>

                {/* Why Us grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {WHY_US.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-red-50/50 border border-slate-200/70 hover:border-red-100 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-[#C8102E] border border-slate-200 flex items-center justify-center shrink-0 shadow-xs transition-all">
                          <Icon size={16} className="text-[#C8102E] group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#0D1B3E] mb-0.5">{item.title}</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8102E] hover:bg-[#A50D26] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all glow-red cursor-pointer"
                >
                  <MessageCircle size={16} /> Book on WhatsApp
                </button>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1B3E] hover:bg-[#1a2f5e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all glow-navy"
                >
                  Our Story <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Right — Human-designed 3-card layered travel collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-between"
            >
              <div className="grid grid-cols-2 gap-3.5">
                {/* Main Hero Card — Innova */}
                <div className="col-span-2 relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-slate-200/90 group">
                  <Image
                    src="/vehicles/innova-crysta.jpg"
                    alt="Innova Crysta Travel Fleet"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:1024px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#C8102E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <p className="text-base sm:text-lg font-bold leading-tight">Toyota Innova Crysta & Hycross</p>
                    <p className="text-[11px] text-white/80 mt-0.5">Ideal for family outstation & Tirupati pilgrimages</p>
                  </div>
                </div>

                {/* Left Mini Card — Urbania */}
                <div className="relative h-36 sm:h-40 rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 group">
                  <Image
                    src="/vehicles/force-urbania.jpg"
                    alt="Force Urbania Group Luxury Van"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <p className="text-xs font-bold leading-tight">Force Urbania</p>
                    <p className="text-[10px] text-white/80">17 Seater Luxury Van</p>
                  </div>
                </div>

                {/* Right Mini Card — Tirupati */}
                <div className="relative h-36 sm:h-40 rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 group">
                  <Image
                    src="/vehicles/tirupati.jpg"
                    alt="Tirupati Temple Darshan Trips"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <p className="text-xs font-bold leading-tight">Tirupati Darshan</p>
                    <p className="text-[10px] text-white/80">Daily from Nellore</p>
                  </div>
                </div>
              </div>

              {/* Bottom Trust Strip */}
              <div className="mt-3.5 p-3 bg-slate-50 border border-slate-200/90 rounded-xl flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-[11px] sm:text-xs">Vehicles Ready in Nellore</span>
                </div>
                <span className="font-bold text-[#C8102E] text-[11px] sm:text-xs">24/7 Available</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVICES — Premium dark card grid
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-14 bg-[#060D1E] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
              <Sparkles size={12} className="text-[#C8102E]" />
              <span className="text-[11px] font-black tracking-[3px] uppercase text-white/70">Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Travel Solutions for Every Need
            </h2>
            <p className="text-sm text-white/50 mt-3 max-w-xl mx-auto">
              From compact city sedans to 50+ passenger luxury coaches — reliable, premium journeys every time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICE_SOLUTIONS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={s.href}
                    className="group relative flex flex-col p-7 h-full bg-[#0D1B3E]/80 hover:bg-[#12234e] border border-white/10 hover:border-white/25 rounded-3xl transition-all duration-300 shadow-xl overflow-hidden"
                  >
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`} />

                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/10 text-white/80 uppercase tracking-widest self-start mb-5 border border-white/10">
                      {s.highlight}
                    </span>

                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                      <Icon size={26} className="text-white" />
                    </div>

                    <h3 className="text-lg font-black text-white mb-1">{s.label}</h3>
                    <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-3">{s.sub}</span>
                    <p className="text-xs text-white/70 leading-relaxed flex-1">{s.desc}</p>

                    <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#FF4B63] group-hover:gap-2.5 transition-all">
                      <span>Explore Fleet</span>
                      <ArrowRight size={13} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FLEET PREVIEW — Top 3 vehicles + View More
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-14 bg-slate-50 relative">
        <div className="absolute top-0 left-0 right-0 h-px section-divider" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-0.5 bg-[#C8102E]" />
                <span className="text-xs font-black tracking-[2.5px] uppercase text-[#C8102E]">Our Fleet</span>
                <span className="w-8 h-0.5 bg-[#C8102E]" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0D1B3E] tracking-tight">
                Premium Vehicles for Every Journey
              </h2>
              <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                Well-maintained, sanitized, and comfortable vehicles ready for your next South India adventure.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayVehicles.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 text-center"
          >
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#0D1B3E] hover:bg-[#1a2f5e] text-white text-sm font-black uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-2xl transition-all glow-navy"
            >
              View Full Fleet ({VEHICLES.length} Vehicles) →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA BANNER — Full bleed, premium dark
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-12 sm:py-14 overflow-hidden bg-[#060D1E]">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80"
            alt="South India road trip"
            fill
            className="object-cover object-center opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#060D1E]/90 via-[#0D1B3E]/80 to-[#060D1E]/90" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#C8102E] text-white text-[11px] font-black uppercase tracking-widest rounded-lg shadow-lg mb-6">
              Instant Confirmation
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-6">
              Ready to Plan Your{" "}
              <span className="text-gradient-red">Next Journey?</span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
              Book directly on WhatsApp for instant quotes. Customized trip plans, professional
              chauffeurs, and competitive outstation rates across South India.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 px-10 py-4.5 shimmer-button text-white font-black text-base uppercase tracking-wider rounded-2xl shadow-2xl glow-red cursor-pointer"
              >
                <MessageCircle size={22} className="fill-white" />
                Book on WhatsApp
              </motion.button>
              <Link
                href="/contact"
                className="flex items-center gap-2.5 px-10 py-4.5 glass-panel hover:bg-white/15 text-white font-bold text-base rounded-2xl border border-white/20 backdrop-blur-md transition-all hover:border-white/40"
              >
                Contact Us <ChevronRight size={18} />
              </Link>
            </div>

            {/* Service area pill */}
            <div className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 glass-panel rounded-full border border-white/10">
              <MapPin size={14} className="text-[#C8102E] shrink-0" />
              <p className="text-xs font-bold text-white/60">
                Tamil Nadu · Kerala · Karnataka · Andhra Pradesh · Telangana · All India (Buses & Luxury Vans)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
