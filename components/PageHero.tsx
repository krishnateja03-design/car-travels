"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface PageHeroProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle: string;
}

export default function PageHero({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#060D1E] via-[#0D1B3E] to-[#16274E] pt-28 pb-16 text-center overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#C8102E]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 text-[#FFB3BE] text-xs font-black uppercase tracking-widest"
        >
          {BadgeIcon && <BadgeIcon size={13} />}
          <span>{badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase mb-4"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
