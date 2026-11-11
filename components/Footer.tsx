"use client";

import Link from "next/link";
import { Car, Phone, Mail, MapPin, MessageCircle, Share2, Globe } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#071020] text-white/70">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-b border-white/8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#C8102E] rounded-xl flex items-center justify-center shrink-0">
                <Car size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-extrabold text-base tracking-wide">VASU CAR TRAVELS</span>
                <span className="block text-white/50 text-[11px] tracking-[1.5px] uppercase">Nellore</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/55 max-w-xs">
              Your trusted travel partner for premium car rentals, outstation trips, and curated South India tour packages. Comfort, safety, and punctuality — always.
            </p>
            <div className="flex gap-2">
              {[Share2, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#C8102E] hover:text-white hover:border-[#C8102E] transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {[["Home", "/"], ["Our Fleet", "/vehicles"], ["Tours & Packages", "/tours"], ["Gallery", "/gallery"], ["About Us", "/about"], ["Book Now", "/contact"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/55 hover:text-white hover:pl-1 transition-all">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {["Sedan Rentals", "SUV & MPV Hire", "Tempo Travellers", "Bus Rentals", "South India Tours", "Pilgrimage Packages", "Airport Transfers"].map((s) => (
                <li key={s}>
                  <Link href="/vehicles" className="text-sm text-white/55 hover:text-white hover:pl-1 transition-all">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              {[
                { icon: MapPin, text: SITE_CONFIG.ADDRESS },
                { icon: Phone, text: SITE_CONFIG.PHONE },
                { icon: Mail, text: SITE_CONFIG.EMAIL },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/55">
                  <Icon size={15} className="text-[#C8102E] mt-0.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
            <button
              onClick={() => openWhatsApp("Hi! I'd like to know more about your services.")}
              className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1DB954] text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-white/35">© {year} {SITE_CONFIG.BUSINESS_NAME}. All rights reserved.</p>
        <div className="flex gap-5">
          {["Privacy Policy", "Terms of Service"].map((t) => (
            <a key={t} href="#" onClick={(e) => e.preventDefault()} className="text-xs text-white/35 hover:text-white/60 transition-colors">
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
