"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * Premium GSAP Preloader — rich navy + crimson gold palette.
 * Circular SVG ring with crimson glow. Fade-bloom exit.
 */
export default function LuxuryPreloader() {
  const [visible, setVisible] = useState(true);

  const wrapRef    = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<SVGCircleElement>(null);
  const numRef     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const radius = 58;
    const circ   = 2 * Math.PI * radius;

    if (ringRef.current) {
      ringRef.current.style.strokeDasharray  = `${circ}`;
      ringRef.current.style.strokeDashoffset = `${circ}`;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new CustomEvent("preloaderDone"));
          setVisible(false);
        },
      });

      /* Logo */
      tl.fromTo(logoRef.current,
        { opacity: 0, y: 28, filter: "blur(14px)", scale: 0.9 },
        { opacity: 1, y: 0,  filter: "blur(0px)",  scale: 1,
          duration: 0.75, ease: "power3.out" }
      );

      /* Ring + text block */
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      /* Ring + counter */
      const obj = { pct: 0 };
      tl.to(obj, {
        pct: 100,
        duration: 1.2,
        ease: "power1.inOut",
        onUpdate: () => {
          if (ringRef.current)
            ringRef.current.style.strokeDashoffset = `${circ * (1 - obj.pct / 100)}`;
          if (numRef.current)
            numRef.current.textContent = `${Math.round(obj.pct)}`;
        },
      }, "-=0.1");

      tl.to({}, { duration: 0.35 });

      /* Bloom-out */
      tl.to(wrapRef.current, {
        opacity: 0, scale: 1.04, duration: 0.65, ease: "power2.inOut",
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[10000] pointer-events-none select-none flex items-center justify-center"
    >
      {/* ── Rich dark background ── */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #111e38 0%, #07101f 55%, #030810 100%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Centre crimson ambient glow — behind ring */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 58%, rgba(200,16,46,0.13) 0%, transparent 70%)",
        }}
      />

      {/* Top brand stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #8B0000 20%, #C8102E 40%, #FF4B63 50%, #C8102E 60%, #8B0000 80%, transparent 100%)",
          boxShadow: "0 0 18px 2px rgba(200,16,46,0.4)",
        }}
      />
      {/* Bottom brand stripe */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #8B0000 20%, #C8102E 40%, #FF4B63 50%, #C8102E 60%, #8B0000 80%, transparent 100%)",
          boxShadow: "0 0 18px 2px rgba(200,16,46,0.4)",
        }}
      />

      {/* Corner marks */}
      {[
        "top-5 left-5 border-t-[1.5px] border-l-[1.5px]",
        "top-5 right-5 border-t-[1.5px] border-r-[1.5px]",
        "bottom-5 left-5 border-b-[1.5px] border-l-[1.5px]",
        "bottom-5 right-5 border-b-[1.5px] border-r-[1.5px]",
      ].map((cls, i) => (
        <div key={i} className={`absolute ${cls} border-[#C8102E]/50 w-6 h-6`} />
      ))}

      {/* ── Centre column ── */}
      <div className="relative z-10 flex flex-col items-center gap-7">

        {/* Logo */}
        <div
          ref={logoRef}
          className="relative w-52 sm:w-64 h-14"
          style={{ opacity: 0 }}
        >
          <Image
            src="/logo.png"
            alt="Vasu Car Travels"
            fill
            priority
            className="object-contain drop-shadow-2xl"
            sizes="280px"
          />
        </div>

        {/* Ring block */}
        <div ref={contentRef} className="flex flex-col items-center gap-5" style={{ opacity: 0 }}>

          {/* SVG ring */}
          <div className="relative w-36 h-36">
            {/* outer glow halo */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(200,16,46,0.14) 0%, transparent 70%)",
              }}
            />

            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 128 128"
            >
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#6b0000" />
                  <stop offset="35%"  stopColor="#C8102E" />
                  <stop offset="70%"  stopColor="#FF4B63" />
                  <stop offset="100%" stopColor="#FFa0b0" />
                </linearGradient>
                <filter id="ringGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* track */}
              <circle
                cx="64" cy="64" r="58"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1.5"
              />
              {/* secondary inner glow track */}
              <circle
                cx="64" cy="64" r="58"
                fill="none"
                stroke="rgba(200,16,46,0.08)"
                strokeWidth="8"
              />
              {/* animated fill */}
              <circle
                ref={ringRef}
                cx="64" cy="64" r="58"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#ringGlow)"
                style={{ transition: "none" }}
              />
            </svg>

            {/* Number inside */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
              <span
                ref={numRef}
                className="text-4xl font-black text-white tabular-nums leading-none"
                style={{ textShadow: "0 0 20px rgba(200,16,46,0.6)" }}
              >
                0
              </span>
              <span className="text-[9px] font-bold tracking-widest mt-1" style={{ color: "#C8102E" }}>
                %
              </span>
            </div>
          </div>

          {/* Brand text */}
          <div className="flex flex-col items-center gap-2">
            <p
              className="text-[9px] font-black uppercase tracking-[0.35em]"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              VASU CAR TRAVELS
            </p>
            <div className="flex items-center gap-2">
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, transparent, #C8102E)" }} />
              <p
                className="text-[8px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Nellore · South India · Est. 2010
              </p>
              <span className="w-6 h-px" style={{ background: "linear-gradient(90deg, #C8102E, transparent)" }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
