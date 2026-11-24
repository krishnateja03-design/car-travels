"use client";

import { motion } from "framer-motion";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
}

export default function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  wordClassName = "",
}: SplitTextRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay * i,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
      rotateX: -45,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.28em] perspective-1000 ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`inline-block transform-gpu ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
