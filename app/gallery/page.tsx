"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/data";

const GALLERY_CATS = ["All", "Vehicles", "Fleet", "Destinations", "Journeys"] as const;

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.cat === active);

  const close = useCallback(() => setLightbox(null), []);
  const next  = useCallback(() => setLightbox(p => p === null ? p : (p + 1) % filtered.length), [filtered.length]);
  const prev  = useCallback(() => setLightbox(p => p === null ? p : (p - 1 + filtered.length) % filtered.length), [filtered.length]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox, close, next, prev]);

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#071020] to-[#1A2F5E] pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-bold tracking-[2px] uppercase text-[#FFB3BE]">Gallery</span>
          <h1 className="font-['Playfair_Display'] text-5xl font-extrabold text-white mt-3 mb-4">Our Photo Gallery</h1>
          <p className="text-white/65 text-lg max-w-lg mx-auto">A visual journey through our fleet, destinations, and happy customer moments.</p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex gap-2 overflow-x-auto scrollbar-none">
          {GALLERY_CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border shrink-0 transition-all cursor-pointer ${
                active === cat ? "bg-[#0D1B3E] border-[#0D1B3E] text-white" : "bg-white border-gray-200 text-gray-600 hover:border-[#0D1B3E] hover:text-[#0D1B3E]"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-14 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img, idx) => (
              <div key={img.id}
                className={`group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid ${img.span === "row" ? "aspect-[3/4]" : img.span === "col" ? "aspect-[4/3]" : "aspect-square"}`}
                onClick={() => setLightbox(idx)}
                role="button" tabIndex={0} aria-label={`View ${img.label}`}
                onKeyDown={e => e.key === "Enter" && setLightbox(idx)}
              >
                <Image src={img.src} alt={img.label} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" loading="lazy" />
                <div className="absolute inset-0 bg-[#0D1B3E]/0 group-hover:bg-[#0D1B3E]/55 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 w-11 h-11 bg-white/90 rounded-full flex items-center justify-center">
                    <ZoomIn size={20} className="text-[#0D1B3E]" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <p className="text-white text-sm font-semibold">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[3000] bg-black/92 flex items-center justify-center p-4"
          onClick={close} role="dialog" aria-modal aria-label="Image preview">
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button onClick={close} aria-label="Close"
              className="absolute -top-12 right-0 w-10 h-10 bg-white/15 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all">
              <X size={20} />
            </button>
            {/* Prev */}
            <button onClick={prev} aria-label="Previous"
              className="absolute left-[-56px] top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all">
              <ChevronLeft size={22} />
            </button>
            {/* Image */}
            <div className="relative w-full max-h-[80vh] rounded-xl overflow-hidden aspect-video">
              <Image src={filtered[lightbox].src} alt={filtered[lightbox].label}
                fill className="object-contain" sizes="900px" priority />
            </div>
            {/* Next */}
            <button onClick={next} aria-label="Next"
              className="absolute right-[-56px] top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all">
              <ChevronRight size={22} />
            </button>
            <p className="text-center text-white/60 text-sm mt-4">
              {filtered[lightbox].label} · {lightbox + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

