"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle, Share2, Globe, Heart } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1B3E] text-white">
      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
          {/* Logo & Description */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block bg-white p-2.5 rounded-xl w-fit shadow-md">
              <div className="relative w-48 h-12">
                <Image
                  src="/logo.png"
                  alt="VASU CAR TRAVELS - Nellore"
                  fill
                  className="object-contain"
                  sizes="192px"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/70 max-w-sm">
              VASU CAR TRAVELS, based in Nellore, offers premium car and van rentals across South India and tempo travellers & buses across India. Clean, safe, and reliable travel.
            </p>
            <div className="flex gap-2.5">
              {[Share2, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#C8102E] flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm"
                  aria-label="Social Link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#C8102E] rounded-full inline-block"></span> Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              {[
                ["Home", "/"],
                ["Our Vehicles", "/vehicles"],
                ["Tours & Packages", "/tours"],
                ["Gallery", "/gallery"],
                ["About Us", "/about"],
                ["Contact Us", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white hover:translate-x-1 inline-block transition-transform">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#C8102E] rounded-full inline-block"></span> Contact Us
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#C8102E] mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.PHONE}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#C8102E] mt-0.5 shrink-0" />
                <span className="break-all">{SITE_CONFIG.EMAIL}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C8102E] mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.ADDRESS}</span>
              </li>
            </ul>
          </div>

          {/* Follow & Quick WhatsApp Action */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#C8102E] rounded-full inline-block"></span> Instant Booking
            </h3>
            <p className="text-xs text-white/60 mb-4 leading-relaxed">
              Need immediate cab booking or outstation rate quote? Message our dispatch team directly on WhatsApp.
            </p>
            <button
              onClick={() => openWhatsApp("Hi! I'd like to book a vehicle with Vasu Car Travels.")}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#C8102E] hover:bg-[#A50D26] text-white text-sm font-bold rounded-lg shadow-md transition-all cursor-pointer"
            >
              <MessageCircle size={16} />
              Book on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* ── Sub Footer Bar ── */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <p>© {year} {SITE_CONFIG.BUSINESS_NAME}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>Safe Rides</span>
          <span>•</span>
          <span>Trusted Service</span>
          <span>•</span>
          <span>Across India</span>
        </div>
      </div>
    </footer>
  );
}
