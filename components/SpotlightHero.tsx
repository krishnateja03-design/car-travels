"use client";

import { useEffect, useRef, useState } from "react";

export default function SpotlightHero() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {/* Luxury dynamic spotlight following mouse */}
      <div
        className="absolute w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-40 transition-transform duration-75 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: "radial-gradient(circle, rgba(200, 16, 46, 0.45) 0%, rgba(13, 27, 62, 0.2) 50%, transparent 80%)",
        }}
      />
      {/* Subtle luxury geometric grid matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)] opacity-35" />
    </div>
  );
}
