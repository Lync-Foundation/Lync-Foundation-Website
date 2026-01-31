"use client";

import { motion } from "framer-motion";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export default function AnimatedLogo({ 
  size = 200, 
  className = "",
}: AnimatedLogoProps) {
  
  // More accurate paths matching the Lync logo
  // Upper wing: Starts from center, curves up and left, ends at a point
  const upperWingPath = `
    M 48 52
    Q 44 46, 38 40
    Q 30 32, 22 26
    Q 14 20, 10 16
    Q 6 12, 10 10
    Q 16 8, 26 14
    Q 38 22, 48 32
    Q 56 40, 58 48
    Q 58 52, 52 54
    Q 50 54, 48 52
    Z
  `;
  
  // Lower wing: Starts from center, curves down and right
  const lowerWingPath = `
    M 52 56
    Q 56 60, 62 66
    Q 70 74, 78 80
    Q 86 86, 90 86
    Q 94 86, 92 82
    Q 88 76, 80 68
    Q 70 58, 60 54
    Q 56 52, 52 56
    Z
  `;
  
  // Curved stem going down-left
  const stemPath = `
    M 46 54
    Q 42 64, 36 76
    Q 30 88, 24 96
  `;

  // Animation variants
  const pathDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { 
          duration: 1.5, 
          delay: i * 0.4,
          ease: "easeInOut" as const
        },
        opacity: { duration: 0.3, delay: i * 0.4 },
      },
    }),
  };

  const fillIn = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1.5 + i * 0.3,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 3, 0, -3, 0],
      }}
      transition={{
        y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 },
        rotate: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 },
      }}
    >
      {/* Pulsing glow behind logo */}
      <motion.div
        className="absolute -inset-16"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ 
          opacity: [0, 0.7, 0.5],
          scale: [0.6, 1.2, 1],
        }}
        transition={{ duration: 3, delay: 2 }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.2) 40%, transparent 65%)",
            filter: "blur(35px)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 105"
        className="relative z-10"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Upper wing: sky blue → indigo */}
          <linearGradient id="upperWingGradient" x1="100%" y1="0%" x2="20%" y2="80%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          {/* Lower wing: indigo → purple */}
          <linearGradient id="lowerWingGradient" x1="20%" y1="20%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>

          {/* Stem gradient */}
          <linearGradient id="stemGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* Soft glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === UPPER WING === */}
        {/* Stroke draws first */}
        <motion.path
          d={upperWingPath}
          stroke="url(#upperWingGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
          variants={pathDraw}
          initial="hidden"
          animate="visible"
          custom={0}
        />
        {/* Fill fades in after */}
        <motion.path
          d={upperWingPath}
          fill="url(#upperWingGradient)"
          variants={fillIn}
          initial="hidden"
          animate="visible"
          custom={0}
        />

        {/* === LOWER WING === */}
        <motion.path
          d={lowerWingPath}
          stroke="url(#lowerWingGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
          variants={pathDraw}
          initial="hidden"
          animate="visible"
          custom={1}
        />
        <motion.path
          d={lowerWingPath}
          fill="url(#lowerWingGradient)"
          variants={fillIn}
          initial="hidden"
          animate="visible"
          custom={1}
        />

        {/* === STEM === */}
        <motion.path
          d={stemPath}
          stroke="url(#stemGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow)"
          variants={pathDraw}
          initial="hidden"
          animate="visible"
          custom={2}
        />

        {/* === SHIMMER EFFECT === */}
        <clipPath id="logoClip">
          <path d={upperWingPath} />
          <path d={lowerWingPath} />
        </clipPath>
        
        <motion.rect
          x="-30"
          y="0"
          width="40"
          height="110"
          fill="url(#shimmer)"
          clipPath="url(#logoClip)"
          initial={{ x: -40 }}
          animate={{ x: 130 }}
          transition={{
            duration: 1.5,
            delay: 5,
            repeat: Infinity,
            repeatDelay: 5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        <defs>
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
