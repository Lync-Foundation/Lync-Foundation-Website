"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Stroke paths for Yu character - uniform width strokes
const YU_STROKES = [
  // Yu component - rectangular box
  { d: "M50 40 L90 40", type: "line" },
  { d: "M50 40 L50 85", type: "line" },
  { d: "M90 40 L90 85", type: "line" },
  { d: "M50 55 L90 55", type: "line" },
  { d: "M50 70 L90 70", type: "line" },
  { d: "M50 85 L90 85", type: "line" },
  { d: "M70 40 L70 105", type: "line" },
  { d: "M60 85 L55 105", type: "line" },
  { d: "M80 85 L85 105", type: "line" },
  // Chuo radical
  { d: "M38 50 L42 55", type: "line" },
  { d: "M40 60 Q38 90, 45 120", type: "curve" },
  { d: "M45 120 Q70 130, 100 125", type: "curve" },
];

// Stroke paths for Jian character - uniform width strokes
const JIAN_STROKES = [
  // Mu (eye) component
  { d: "M120 35 L120 90", type: "line" },
  { d: "M120 35 L160 35", type: "line" },
  { d: "M160 35 L160 90", type: "line" },
  { d: "M120 55 L160 55", type: "line" },
  { d: "M120 72 L160 72", type: "line" },
  { d: "M120 90 L160 90", type: "line" },
  // Er (legs) component
  { d: "M135 90 Q125 115, 115 145", type: "curve" },
  { d: "M145 90 Q155 120, 165 145 Q175 155, 185 150", type: "curve" },
];

// Stroke paths for Dong character - uniform width strokes
const DONG_STROKES = [
  { d: "M210 32 L260 32", type: "line" },
  // Ri (sun) component
  { d: "M218 45 L218 95", type: "line" },
  { d: "M218 45 L252 45", type: "line" },
  { d: "M252 45 L252 95", type: "line" },
  { d: "M218 70 L252 70", type: "line" },
  { d: "M218 95 L252 95", type: "line" },
  // Tree trunk and roots
  { d: "M235 32 L235 150", type: "line" },
  { d: "M235 100 L205 155", type: "line" },
  { d: "M235 100 L265 155", type: "line" },
];

// Stroke paths for Fang character - uniform width strokes
const FANG_STROKES = [
  { d: "M320 32 L323 38", type: "line" },
  { d: "M295 50 L355 50", type: "line" },
  { d: "M320 50 L320 135 Q325 145, 345 140", type: "curve" },
  { d: "M320 70 L285 150", type: "line" },
];

// Border paths
const OUTER_BORDER = "M10 12 C20 6, 80 8, 200 6 C320 8, 380 6, 390 12 C398 20, 400 35, 398 55 C400 100, 398 145, 400 165 C398 180, 395 192, 390 194 C380 200, 320 198, 200 200 C80 198, 20 200, 10 194 C3 188, 1 178, 3 160 C1 115, 3 70, 1 45 C3 28, 6 16, 10 12 Z";
const INNER_BORDER = "M22 24 C32 19, 85 20, 200 19 C315 20, 368 19, 378 24 C385 30, 387 42, 385 58 C387 100, 385 142, 387 160 C385 172, 382 182, 378 184 C368 189, 315 187, 200 189 C85 187, 32 189, 22 184 C15 179, 13 170, 15 154 C13 112, 15 72, 13 52 C15 38, 18 28, 22 24 Z";

const STROKE_COLOR = "#C52F2F";
const STROKE_WIDTH = 3;
const STROKE_DURATION = 0.3;
const STROKE_DELAY = 0.08;
const BORDER_DURATION = 1.0;

// Combine all strokes
const ALL_STROKES = [...YU_STROKES, ...JIAN_STROKES, ...DONG_STROKES, ...FANG_STROKES];

export default function AnimatedSeal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex items-center justify-center"
    >
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[320px] lg:max-w-[380px]"
      >
        {/* Outer border - draw animation */}
        <motion.path
          d={OUTER_BORDER}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: BORDER_DURATION, ease: "easeInOut" }}
        />

        {/* Inner border - draw animation */}
        <motion.path
          d={INNER_BORDER}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: BORDER_DURATION * 0.8, delay: 0.2, ease: "easeInOut" }}
        />

        {/* All character strokes - draw animation with uniform width */}
        {ALL_STROKES.map((stroke, index) => (
          <motion.path
            key={index}
            d={stroke.d}
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{
              duration: STROKE_DURATION,
              delay: BORDER_DURATION + 0.1 + index * STROKE_DELAY,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
