"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  glowColor = "rgba(200, 16, 46, 0.25)",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), {
    damping: 25,
    stiffness: 220,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), {
    damping: 25,
    stiffness: 220,
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl transition-shadow duration-300 transform-gpu ${className}`}
    >
      {/* Clean border highlight without cursor smudge */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 z-30"
        style={{
          opacity: isHovered ? 1 : 0,
          background: glowColor ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)` : "none",
        }}
      />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
}
