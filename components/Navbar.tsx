"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, MessageCircle, Menu, X } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { label: "Home",            href: "/" },
  { label: "Vehicles",        href: "/vehicles" },
  { label: "Tours & Packages",href: "/tours" },
  { label: "Gallery",         href: "/gallery" },
  { label: "About Us",        href: "/about" },
  { label: "Contact",         href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleWA = () =>
    openWhatsApp(`Hi! I'd like to enquire about car rental services from ${SITE_CONFIG.BUSINESS_NAME}, ${SITE_CONFIG.LOCATION}.`);

  return (
    <>
      {/* ── Desktop Nav ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0D1B3E] shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="VASU CAR TRAVELS Home">
            <div className="w-11 h-11 bg-[#C8102E] rounded-xl flex items-center justify-center shrink-0">
              <Car size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <span className="block text-white font-extrabold text-[17px] tracking-wide">VASU CAR TRAVELS</span>
              <span className="block text-white/60 text-[11px] tracking-[1.5px] uppercase font-medium">Nellore</span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(l.href)
                    ? "text-white bg-white/15"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleWA}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1DB954] text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
            >
              <MessageCircle size={16} />
              Book on WhatsApp
            </button>
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="lg:hidden p-2 text-white"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div
        className={`fixed inset-x-0 top-[72px] z-40 bg-[#0D1B3E] shadow-2xl transition-all duration-250 lg:hidden ${
          menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={menuOpen ? 0 : -1}
              className={`px-4 py-3 text-[15px] font-medium rounded-lg transition-all ${
                isActive(l.href)
                  ? "text-white bg-white/15"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={handleWA}
            tabIndex={menuOpen ? 0 : -1}
            className="mt-3 flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#1DB954] text-white font-semibold rounded-lg transition-all cursor-pointer"
          >
            <MessageCircle size={18} />
            Book on WhatsApp
          </button>
        </nav>
      </div>
    </>
  );
}

