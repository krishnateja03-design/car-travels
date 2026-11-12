"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Sparkles } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/data";

const GALLERY_CATS = ["All", "Vehicles", "Fleet", "Destinations", "Journeys"] as const;

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    active === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((i) => i.cat === active);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((p) => (p === null ? p : (p + 1) % filtered.length)),
    [filtered.length]
  );
  const prev = useCallback(
    () => setLightbox((p) => (p === null ? p : (p - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );

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
    <div className="overflow-x-hidden bg-white text-[#0D1B3E]">
      {/* ── Gallery Hero ── */}
      <section className="relative bg-gradient-to-br from-[#060D1E] via-[#0D1B3E] to-[#16274E] pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#C8102E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 text-[#FFB3BE] text-xs font-black uppercase tracking-widest"
          >
            <Camera size={13} />
            PHOTOGRAPHY & FLEET ARCHIVE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight uppercase mb-4"
          >
            Our Photo Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/75 max-w-xl mx-auto leading-relaxed"
          >
            A high-resolution visual journey through our vehicles, client trips, South India ghat roads,
            and highway moments.
          </motion.p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GALLERY_CATS.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer ${
                  active === cat
                    ? "bg-[#0D1B3E] text-white shadow-md shadow-[#0D1B3E]/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Masonry Grid with Animations ── */}
      <section className="py-16 bg-slate-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-3xl cursor-pointer break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-300 bg-slate-900 border border-slate-200"
                  onClick={() => setLightbox(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${img.label}`}
                  onKeyDown={(e) => e.key === "Enter" && setLightbox(idx)}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute inset-0 bg-[#0D1B3E]/0 group-hover:bg-[#0D1B3E]/60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 w-12 h-12 bg-white/95 rounded-2xl flex items-center justify-center shadow-xl">
                      <ZoomIn size={22} className="text-[#0D1B3E]" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFB3BE]">
                      {img.cat}
                    </span>
                    <p className="text-white text-sm font-black truncate mt-0.5">{img.label}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Interactive Lightbox Modal ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-[3000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal
            aria-label="Image preview"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={close}
                aria-label="Close"
                className="absolute -top-12 right-0 w-10 h-10 bg-white/15 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Prev Button */}
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute -left-4 sm:-left-14 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Image Frame */}
              <div className="relative w-full max-h-[75vh] aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
                <Image
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].label}
                  fill
                  className="object-contain"
                  sizes="1200px"
                  priority
                />
              </div>

              {/* Next Button */}
              <button
                onClick={next}
                aria-label="Next"
                className="absolute -right-4 sm:-right-14 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>

              <div className="text-center mt-4">
                <p className="text-white text-base font-black">{filtered[lightbox].label}</p>
                <p className="text-white/50 text-xs mt-0.5">
                  Category: {filtered[lightbox].cat} • {lightbox + 1} of {filtered.length}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
