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
  
  // Exact traced paths from the Lync logo SVG trace
  // Upper wing (left wing flying upward)
  const upperWingPath = `M 207 229 L 226 288 L 240 323 L 260 361 L 277 385 L 292 402 L 317 423 L 345 439 L 368 449 L 426 468 L 448 478 L 457 484 L 470 497 L 474 503 L 482 524 L 483 547 L 469 611 L 467 630 L 467 655 L 473 633 L 485 603 L 521 525 L 534 483 L 537 464 L 536 445 L 531 427 L 524 414 L 513 400 L 501 389 L 476 372 L 285 279 L 232 248 Z`;
  
  // Inner curve detail (the white space between wings)
  const innerCurvePath = `M 268 446 L 270 456 L 284 487 L 293 501 L 309 519 L 329 533 L 345 540 L 365 546 L 400 553 L 425 563 L 436 571 L 443 579 L 448 588 L 451 602 L 452 601 L 452 595 L 459 566 L 459 550 L 454 533 L 443 518 L 432 510 L 413 501 L 345 484 L 311 472 L 279 455 Z`;
  
  // Lower wing (right wing extending downward-right)
  const lowerWingPath = `M 836 357 L 802 384 L 770 405 L 649 472 L 611 495 L 577 519 L 557 536 L 538 555 L 521 576 L 498 616 L 488 640 L 478 670 L 465 720 L 466 722 L 473 713 L 486 701 L 514 681 L 560 657 L 614 635 L 664 611 L 698 590 L 722 571 L 744 549 L 757 533 L 773 510 L 787 486 L 801 457 L 816 420 Z`;

  // Animation variants
  const pathDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { 
          duration: 1.8, 
          delay: i * 0.5,
          ease: "easeInOut" as const
        },
        opacity: { duration: 0.3, delay: i * 0.5 },
      },
    }),
  };

  const fillIn = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 2.0 + i * 0.3,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, 0, -2, 0],
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
        transition={{ duration: 3, delay: 2.5 }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(105, 78, 250, 0.4) 0%, rgba(168, 85, 247, 0.25) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.2, 1],
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
        viewBox="0 0 1024 1024"
        className="relative z-10"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Main gradient matching the original logo colors */}
          <linearGradient id="logoGradient" gradientUnits="userSpaceOnUse" x1="207" y1="229" x2="744" y2="549">
            <stop offset="0%" stopColor="#e8f8ff" />
            <stop offset="35%" stopColor="#664af7" />
            <stop offset="100%" stopColor="#ab84ff" />
          </linearGradient>

          {/* Upper wing gradient: Light tip, smooth transition, dark bottom */}
          <linearGradient id="upperWingGradient" gradientUnits="userSpaceOnUse" x1="207" y1="229" x2="537" y2="655">
            <stop offset="0%" stopColor="#e8f8ff" />
            <stop offset="10%" stopColor="#d0efff" />
            <stop offset="20%" stopColor="#b8e6ff" />
            <stop offset="30%" stopColor="#a9dbff" />
            <stop offset="40%" stopColor="#99c3ff" />
            <stop offset="50%" stopColor="#89a7ff" />
            <stop offset="60%" stopColor="#7881ff" />
            <stop offset="70%" stopColor="#7374ff" />
            <stop offset="80%" stopColor="#6c5bfe" />
            <stop offset="100%" stopColor="#664af7" />
          </linearGradient>

          {/* Lower wing gradient: Deep indigo to lavender-purple */}
          <linearGradient id="lowerWingGradient" gradientUnits="userSpaceOnUse" x1="465" y1="722" x2="836" y2="357">
            <stop offset="0%" stopColor="#664af7" />
            <stop offset="20%" stopColor="#6c5bfe" />
            <stop offset="40%" stopColor="#8460ff" />
            <stop offset="60%" stopColor="#8f6aff" />
            <stop offset="80%" stopColor="#9e78ff" />
            <stop offset="100%" stopColor="#ab84ff" />
          </linearGradient>

          {/* Inner curve gradient: Lighter tip, darker bottom */}
          <linearGradient id="innerCurveGradient" gradientUnits="userSpaceOnUse" x1="268" y1="446" x2="459" y2="602">
            <stop offset="0%" stopColor="#90b3ff" />
            <stop offset="15%" stopColor="#7c8bff" />
            <stop offset="30%" stopColor="#6f68ff" />
            <stop offset="50%" stopColor="#664af7" />
            <stop offset="100%" stopColor="#664af7" />
          </linearGradient>

          {/* Soft glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shimmer gradient */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* === UPPER WING === */}
        {/* Stroke draws first */}
        <motion.path
          d={upperWingPath}
          stroke="url(#upperWingGradient)"
          strokeWidth="8"
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

        {/* === INNER CURVE (cut-out area becomes filled shape) === */}
        <motion.path
          d={innerCurvePath}
          stroke="url(#innerCurveGradient)"
          strokeWidth="6"
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
          d={innerCurvePath}
          fill="url(#innerCurveGradient)"
          variants={fillIn}
          initial="hidden"
          animate="visible"
          custom={1}
        />

        {/* === LOWER WING === */}
        <motion.path
          d={lowerWingPath}
          stroke="url(#lowerWingGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
          variants={pathDraw}
          initial="hidden"
          animate="visible"
          custom={2}
        />
        <motion.path
          d={lowerWingPath}
          fill="url(#lowerWingGradient)"
          variants={fillIn}
          initial="hidden"
          animate="visible"
          custom={2}
        />

        {/* === SHIMMER EFFECT === */}
        <clipPath id="logoClip">
          <path d={upperWingPath} />
          <path d={innerCurvePath} />
          <path d={lowerWingPath} />
        </clipPath>
        
        <motion.rect
          x="-200"
          y="0"
          width="300"
          height="1024"
          fill="url(#shimmer)"
          clipPath="url(#logoClip)"
          initial={{ x: -300 }}
          animate={{ x: 1200 }}
          transition={{
            duration: 2,
            delay: 5,
            repeat: Infinity,
            repeatDelay: 6,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </svg>
    </motion.div>
  );
}
