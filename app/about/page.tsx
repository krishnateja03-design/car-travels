"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, Clock, Heart, Star, MapPin, Car, CheckCircle, MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const VALUES = [
  { icon: Shield, title: "Safety First",     desc: "Every vehicle is rigorously inspected before every trip. All drivers are licensed, trained, and background-verified." },
  { icon: Clock,  title: "Punctuality",      desc: "We understand the value of your time. Our drivers arrive 10 minutes early — every single time." },
  { icon: Heart,  title: "Customer Care",    desc: "We treat every passenger like family. Your comfort and satisfaction is our highest priority." },
  { icon: Star,   title: "Excellence",       desc: "From vehicle cleanliness to driver courtesy — we maintain the highest standards across our fleet." },
  { icon: MapPin, title: "Local Expertise",  desc: "Years of South India operations mean our drivers know every road, shortcut, and safe stop." },
  { icon: Car,    title: "Modern Fleet",     desc: "Regularly maintained, GPS-tracked vehicles that deliver a smooth, reliable ride every time." },
];

const MILESTONES = [
  { num: "10", unit: "+", label: "Years of Service" },
  { num: "2000", unit: "+", label: "Happy Customers" },
  { num: "50", unit: "+", label: "Vehicles in Fleet" },
  { num: "15", unit: "+", label: "Destinations Covered" },
];

export default function AboutPage() {
  const handleWA = () => openWhatsApp("Hi! I'd like to know more about Vasu Car Travels and your services.");

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#071020] to-[#1A2F5E] pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-bold tracking-[2px] uppercase text-[#FFB3BE]">About Us</span>
          <h1 className="font-['Playfair_Display'] text-5xl font-extrabold text-white mt-3 mb-4">About Vasu Car Travels</h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
            Nellore's most trusted name in premium car rentals and South India tours since over a decade.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80"
                  alt="Vasu Car Travels fleet" fill className="object-cover"
                  sizes="(max-width:1024px) 100vw,560px" />
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">Our Story</span>
              <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-[#0D1B3E] leading-tight">
                A Decade of Trusted Travel
              </h2>
              <div className="w-14 h-1 bg-[#C8102E] rounded" />
              <p className="text-gray-500 leading-relaxed">
                VASU CAR TRAVELS was born out of a simple vision — to make quality, reliable transportation accessible to everyone in Nellore and across South India. What started as a small fleet of cars has grown into a comprehensive travel service trusted by thousands.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Over the years, we've helped families reunite at pilgrimage sites, carried corporate executives to important meetings, and guided group tours through the beautiful landscapes of South India. Each journey has shaped us into the company we are today.
              </p>
              <ul className="flex flex-col gap-3">
                {["Fully licensed and registered travel service","GPS-tracked fleet for transparency","Dedicated customer support team","Partnered with experienced local drivers"].map(item=>(
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle size={16} className="text-[#C8102E] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap mt-2">
                <button onClick={handleWA}
                  className="flex items-center gap-2 px-7 py-3.5 bg-[#C8102E] hover:bg-[#A50D26] text-white font-bold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
                  <MessageCircle size={16} /> Get in Touch
                </button>
                <Link href="/contact"
                  className="flex items-center gap-2 px-7 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-all">
                  Book a Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0D1B3E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {MILESTONES.map(m => (
              <div key={m.label} className="py-4">
                <div className="text-5xl font-extrabold text-white leading-none mb-2">
                  {m.num}<span className="text-[#C8102E]">{m.unit}</span>
                </div>
                <div className="text-sm text-white/55">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">What We Stand For</span>
            <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-[#0D1B3E] mt-2 mb-3">Our Core Values</h2>
            <div className="w-14 h-1 bg-[#C8102E] rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">These values guide every decision we make and every mile we drive.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="group p-8 border border-gray-100 rounded-xl hover:border-[#0D1B3E] hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-[#0D1B3E]/7 group-hover:bg-[#0D1B3E] rounded-2xl flex items-center justify-center mb-5 transition-all">
                  <Icon size={24} className="text-[#0D1B3E] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-[2px] uppercase text-[#C8102E]">Our Mission</span>
          <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-[#0D1B3E] mt-2 mb-3">Making Every Journey Exceptional</h2>
          <div className="w-14 h-1 bg-[#C8102E] rounded mx-auto mb-7" />
          <p className="text-gray-500 text-lg leading-relaxed mb-5">
            Our mission is to be the most trusted and preferred travel partner for every person who steps into one of our vehicles — through consistent quality, transparent practices, and an unwavering commitment to safety.
          </p>
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            Whether it's a 10-minute city ride or a week-long South India tour — we bring the same level of professionalism, care, and dedication to every trip.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={handleWA}
              className="flex items-center gap-2 px-8 py-4 bg-[#C8102E] hover:bg-[#A50D26] text-white font-bold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
              <MessageCircle size={18} /> Book on WhatsApp
            </button>
            <Link href="/vehicles"
              className="flex items-center gap-2 px-8 py-4 bg-[#0D1B3E] hover:bg-[#1A2F5E] text-white font-semibold rounded-lg transition-all">
              <Car size={18} /> Explore Fleet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

