"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Heart,
  Star,
  MapPin,
  Car,
  CheckCircle,
  MessageCircle,
  Award,
  Users,
  Compass,
  Sparkles,
} from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import PageHero from "@/components/PageHero";

const VALUES = [
  {
    icon: Shield,
    title: "Passenger Safety First",
    desc: "Rigorous mechanical checks, speed governors, clean tyres, and verified chauffeurs ensure your family travels in absolute security.",
  },
  {
    icon: Clock,
    title: "Punctuality & Reliability",
    desc: "We understand that flight transfers and temple darshan timings cannot wait. Our vehicles arrive at your doorstep 10 minutes ahead.",
  },
  {
    icon: Heart,
    title: "Warm Hospitality",
    desc: "Polite, helpful drivers who understand elderly passengers, family luggage handling, and infant travel needs with utmost care.",
  },
  {
    icon: Star,
    title: "Spotless Vehicle Hygiene",
    desc: "Full interior deep cleaning, vacuumed fabric seats, air fresheners, and chilled multi-zone AC for long hot highway drives.",
  },
  {
    icon: MapPin,
    title: "Deep South India Route Mastery",
    desc: "From the hairpin ghat bends of Tirumala and Ooty to Hyderabad expressways, our drivers know safe bypasses and clean food stops.",
  },
  {
    icon: Car,
    title: "Modern, Diverse Fleet",
    desc: "Whether you need a quick sedan for 3 passengers or a 50-seater bus for marriage transport, we have the ideal fleet ready in Nellore.",
  },
];

const MILESTONES = [
  { num: "20+", label: "Years of Trust in Nellore" },
  { num: "25,000+", label: "Safe Trips Completed" },
  { num: "100%", label: "Verified AC Vehicles" },
  { num: "4.9 ★", label: "Customer Satisfaction" },
];

export default function AboutPage() {
  const handleWA = () =>
    openWhatsApp("Hi! I would like to know more about Vasu Car Travels services.");

  return (
    <div className="overflow-x-hidden bg-white text-[#0D1B3E]">
      <PageHero
        badge="ESTABLISHED IN NELLORE"
        badgeIcon={Award}
        title="About Vasu Car Travels"
        subtitle="Two decades of dedication to safe, reliable, and premium car rental service across Andhra Pradesh, Tamil Nadu, Karnataka, and beyond."
      />

      {/* ── Story Section with Visual ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Box */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-900 border border-slate-200 group">
                <Image
                  src="/vehicles/fleet-hero.jpg"
                  alt="Vasu Car Travels Fleet on South India Highway"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width:1024px) 100vw,600px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-3 py-1 bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-wider rounded-md">
                    Two Decades of Service
                  </span>
                  <p className="text-xl font-black mt-2">Serving Families & Businesses in Nellore</p>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col gap-5"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#C8102E]" />
                <span className="text-xs font-black tracking-[2px] uppercase text-[#C8102E]">
                  OUR STORY
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B3E] tracking-tight leading-tight">
                Your Trusted Travel Partner in Nellore & Across South India
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                Founded with a mission to deliver safe, transparent, and dignified travel experiences,
                <strong> VASU CAR TRAVELS</strong> has grown from a humble family-run service into one
                of Nellore's most reputed private travel agencies.
              </p>

              <p className="text-sm text-gray-600 leading-relaxed">
                Over the years, we have handled thousands of pilgrim visits to Tirumala and Shirdi,
                corporate transport for industrial hubs in Sri City and Krishnapatnam Port, and wedding
                shuttles across South India. Our principle remains simple: <em>treat every customer like family</em>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "100% Sanitized & AC Vehicles",
                  "Verified Highway Drivers",
                  "Fixed Honest Kilometer Rates",
                  "24/7 Booking & Road Support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs font-bold text-[#0D1B3E]">
                    <CheckCircle size={16} className="text-[#C8102E] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWA}
                  className="px-7 py-3.5 bg-[#C8102E] hover:bg-[#A50D26] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle size={16} className="inline mr-2" /> Book with Us
                </motion.button>
                <Link
                  href="/vehicles"
                  className="px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-[#0D1B3E] text-xs font-bold rounded-xl transition-all"
                >
                  Explore Fleet →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Milestones Bar ── */}
      <section className="py-16 bg-[#0D1B3E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {MILESTONES.map((m) => (
              <div key={m.label} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {m.num}
                </span>
                <span className="text-xs text-white/70 font-semibold mt-1 uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values Grid ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-black tracking-[2px] uppercase text-[#C8102E]">
              WHAT WE STAND FOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B3E] tracking-tight mt-1">
              Our Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col text-left"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#C8102E] flex items-center justify-center mb-6">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-black text-[#0D1B3E] mb-2">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
