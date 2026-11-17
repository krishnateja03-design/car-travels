"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import { SITE_CONFIG } from "@/lib/config";

const NAV_LINKS = [
  { label: "Home",             href: "/" },
  { label: "Our Vehicles",     href: "/vehicles" },
  { label: "Tours",            href: "/tours" },
  { label: "About Us",         href: "/about" },
  { label: "Contact",          href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide navbar when scrolling DOWN past 100px; show when scrolling UP
      if (y > 100) {
        setHidden(y > lastY);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openBooking = () => {
    setMenuOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* ── Top Navigation Bar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2.5" : "bg-white py-3.5 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Official Company Logo */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="VASU CAR TRAVELS Home">
            <div className="relative w-44 sm:w-52 h-12">
              <Image
                src="/logo.png"
                alt="VASU CAR TRAVELS - Nellore"
                fill
                priority
                className="object-contain object-left group-hover:opacity-95 transition-opacity"
                sizes="210px"
              />
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3.5 py-1.5 text-sm font-semibold rounded-md transition-all ${
                  isActive(l.href)
                    ? "text-[#C8102E] bg-red-50/80 font-bold"
                    : "text-[#0D1B3E] hover:text-[#C8102E] hover:bg-gray-50"
                }`}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* WhatsApp CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={openBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#C8102E] hover:bg-[#A50D26] text-white text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer glow-red"
            >
              <MessageCircle size={16} />
              Book on WhatsApp
            </button>
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="lg:hidden p-2 text-[#0D1B3E] rounded-md hover:bg-gray-100 transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Slide Down Menu ── */}
      <div
        className={`fixed inset-x-0 top-[68px] z-40 bg-white border-b border-gray-100 shadow-xl transition-all duration-250 lg:hidden ${
          menuOpen && !hidden ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!menuOpen || hidden}
      >
        <nav className="px-5 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={menuOpen ? 0 : -1}
              className={`px-4 py-3 text-[15px] font-semibold rounded-lg transition-all ${
                isActive(l.href)
                  ? "text-[#C8102E] bg-red-50 font-bold"
                  : "text-[#0D1B3E] hover:text-[#C8102E] hover:bg-gray-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={openBooking}
            tabIndex={menuOpen ? 0 : -1}
            className="mt-3 flex items-center justify-center gap-2 py-3.5 bg-[#C8102E] hover:bg-[#A50D26] text-white font-bold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <MessageCircle size={18} />
            Book on WhatsApp
          </button>
        </nav>
      </div>

      {/* Global Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
