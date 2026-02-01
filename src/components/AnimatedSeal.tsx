"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Stroke paths for Yu character - 12 strokes with proper seal script structure
// Structure: Yu (monkey pictograph) + Chuo (walking radical)
const YU_STROKES = [
  // HEAD section (like Tian/Jia - square head shape)
  { d: "M58 35 Q65 33, 75 33 Q85 33, 92 35", isStroke: true }, // Top horizontal
  { d: "M58 35 L58 55", isStroke: true }, // Left vertical
  { d: "M92 35 L92 55", isStroke: true }, // Right vertical
  { d: "M58 55 Q65 57, 75 57 Q85 57, 92 55", isStroke: true }, // Bottom horizontal
  // BODY section (like Yong - vertical with internal horizontals)
  { d: "M60 57 L60 95", isStroke: true }, // Left vertical
  { d: "M90 57 L90 95", isStroke: true }, // Right vertical
  { d: "M60 75 Q75 77, 90 75", isStroke: true }, // Middle horizontal
  // LEGS section (like Ba/Er - two diverging strokes)
  { d: "M65 95 Q60 105, 52 120", isStroke: true }, // Left leg
  { d: "M85 95 Q90 105, 98 120", isStroke: true }, // Right leg
  // CHUO radical (walking) - wraps from left and bottom
  { d: "M40 45 Q42 48, 44 52", isStroke: true }, // Dot
  { d: "M42 58 Q38 80, 40 100 Q38 120, 45 140", isStroke: true }, // Curved vertical
  { d: "M45 140 Q60 148, 80 145 Q95 142, 108 150", isStroke: true }, // Horizontal sweep
];

// Stroke paths for Jian character - Seal Script form (8 strokes)
// Structure: Mu (eye) on top + Er (legs) on bottom
const JIAN_STROKES = [
  // Stroke 1: Left vertical of eye (Mu)
  "M138 32 Q134 36, 135 45 L135 85 Q135 92, 139 90 Q143 88, 142 82 L142 42 Q143 36, 138 32 Z",
  // Stroke 2: Top horizontal of eye
  "M140 36 Q145 32, 160 33 Q175 32, 185 36 Q188 40, 184 43 Q178 40, 165 41 Q150 40, 144 42 Q140 40, 140 36 Z",
  // Stroke 3: Right vertical of eye
  "M182 32 Q186 36, 185 45 L185 85 Q185 92, 181 90 Q177 88, 178 82 L178 42 Q177 36, 182 32 Z",
  // Stroke 4: First inner horizontal (upper pupil line)
  "M142 52 Q148 49, 160 50 Q172 49, 178 52 Q176 56, 168 54 Q156 56, 148 54 Q142 55, 142 52 Z",
  // Stroke 5: Second inner horizontal (lower pupil line)
  "M142 68 Q148 65, 160 66 Q172 65, 178 68 Q176 72, 168 70 Q156 72, 148 70 Q142 71, 142 68 Z",
  // Stroke 5b: Bottom horizontal of eye box
  "M140 85 Q145 82, 160 83 Q175 82, 185 85 Q188 89, 184 92 Q178 89, 165 90 Q150 89, 144 91 Q140 89, 140 85 Z",
  // Stroke 6: Pie (left-falling curved leg)
  "M152 92 Q148 98, 142 112 Q136 128, 130 145 Q126 158, 132 162 Q138 158, 142 145 Q148 128, 154 112 Q160 100, 152 92 Z",
  // Stroke 7: Shuwangou (curved sweeping right leg)
  "M168 92 Q164 100, 165 115 Q164 135, 170 150 Q176 162, 188 166 Q200 164, 210 158 Q216 152, 212 147 Q202 152, 192 155 Q180 152, 176 142 Q172 128, 174 112 Q176 100, 168 92 Z",
];

// Stroke paths for Dong character - Seal Script form (8 strokes)
// Structure: Sun (Ri) in center + Tree (Mu) vertical through with diagonals
const DONG_STROKES = [
  // Stroke 1: Top horizontal of tree (above sun)
  "M232 32 Q238 28, 255 29 Q272 28, 278 32 Q280 36, 276 39 Q268 36, 255 37 Q242 36, 236 38 Q232 36, 232 32 Z",
  // Stroke 2: Left vertical of sun box
  "M238 42 Q234 46, 235 54 L235 88 Q235 94, 239 92 Q243 90, 242 85 L242 52 Q243 47, 238 42 Z",
  // Stroke 3: Top horizontal of sun
  "M240 46 Q246 42, 255 43 Q264 42, 270 46 Q272 50, 268 52 Q262 49, 255 50 Q248 49, 244 51 Q240 49, 240 46 Z",
  // Stroke 4: Right vertical of sun box
  "M268 42 Q272 46, 271 54 L271 88 Q271 94, 267 92 Q263 90, 264 85 L264 52 Q263 47, 268 42 Z",
  // Stroke 5: Inner horizontal of sun (middle line)
  "M242 66 Q248 63, 255 64 Q262 63, 268 66 Q266 70, 260 68 Q252 70, 246 68 Q242 69, 242 66 Z",
  // Stroke 5b: Bottom horizontal of sun
  "M240 88 Q246 85, 255 86 Q264 85, 270 88 Q272 92, 268 94 Q262 91, 255 92 Q248 91, 244 93 Q240 91, 240 88 Z",
  // Stroke 6: Main vertical of tree (through sun)
  "M252 28 Q248 32, 250 42 L250 145 Q250 155, 254 152 Q258 149, 257 142 L257 40 Q258 34, 252 28 Z",
  // Stroke 7: Left diagonal (pie - tree root)
  "M250 95 Q246 102, 238 118 Q230 135, 222 152 Q218 164, 224 168 Q230 164, 236 150 Q244 132, 252 115 Q258 102, 250 95 Z",
  // Stroke 8: Right diagonal (na - tree root sweeping right)
  "M256 95 Q260 102, 268 118 Q276 135, 286 152 Q292 164, 298 160 Q300 154, 292 142 Q282 125, 272 108 Q262 95, 256 95 Z",
];

// Stroke paths for Fang character - Seal Script form (4 strokes)
// Structure: Dot + horizontal + vertical-hook + left-falling
const FANG_STROKES = [
  // Stroke 1: Dian (dot) at top
  "M345 32 Q340 28, 342 35 Q340 44, 348 50 Q356 44, 352 38 Q354 32, 345 32 Z",
  // Stroke 2: Heng (horizontal)
  "M318 55 Q325 50, 345 52 Q365 50, 375 55 Q378 60, 374 64 Q366 60, 350 62 Q334 60, 324 63 Q318 60, 318 55 Z",
  // Stroke 3: Hengzhegou (horizontal-bend-hook)
  "M345 55 Q340 60, 342 72 L342 135 Q340 148, 348 155 Q358 150, 368 145 Q376 140, 372 135 Q364 140, 355 145 Q350 142, 350 132 L350 70 Q352 62, 345 55 Z",
  // Stroke 4: Pie (left-falling)
  "M342 72 Q336 82, 328 100 Q318 122, 308 145 Q302 160, 310 165 Q318 160, 325 142 Q336 118, 346 95 Q354 80, 342 72 Z",
];

// Border paths
const OUTER_BORDER = "M10 12 C20 6, 80 8, 200 6 C320 8, 380 6, 390 12 C398 20, 400 35, 398 55 C400 100, 398 145, 400 165 C398 180, 395 192, 390 194 C380 200, 320 198, 200 200 C80 198, 20 200, 10 194 C3 188, 1 178, 3 160 C1 115, 3 70, 1 45 C3 28, 6 16, 10 12 Z";
const INNER_BORDER = "M22 24 C32 19, 85 20, 200 19 C315 20, 368 19, 378 24 C385 30, 387 42, 385 58 C387 100, 385 142, 387 160 C385 172, 382 182, 378 184 C368 189, 315 187, 200 189 C85 187, 32 189, 22 184 C15 179, 13 170, 15 154 C13 112, 15 72, 13 52 C15 38, 18 28, 22 24 Z";

const STROKE_COLOR = "#C52F2F";
const STROKE_DURATION = 0.4; // Duration for each stroke
const STROKE_DELAY = 0.15; // Delay between strokes
const BORDER_DURATION = 1.2; // Duration for border drawing

export default function AnimatedSeal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
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
        className="w-full h-auto max-w-[280px] lg:max-w-[320px]"
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
          transition={{ duration: BORDER_DURATION * 0.8, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Yu character strokes - animate one by one with drawing effect */}
        {YU_STROKES.map((stroke, index) => (
          <motion.path
            key={`yu-${index}`}
            d={stroke.d}
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{
              duration: STROKE_DURATION,
              delay: BORDER_DURATION + 0.2 + index * STROKE_DELAY,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Jian character strokes - animate after Yu completes */}
        {JIAN_STROKES.map((strokePath, index) => (
          <motion.path
            key={`jian-${index}`}
            d={strokePath}
            fill={STROKE_COLOR}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: STROKE_DURATION,
              delay: BORDER_DURATION + 0.2 + (YU_STROKES.length + index) * STROKE_DELAY,
              ease: "easeOut",
            }}
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          />
        ))}

        {/* Dong character strokes - animate after Jian completes */}
        {DONG_STROKES.map((strokePath, index) => (
          <motion.path
            key={`dong-${index}`}
            d={strokePath}
            fill={STROKE_COLOR}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: STROKE_DURATION,
              delay: BORDER_DURATION + 0.2 + (YU_STROKES.length + JIAN_STROKES.length + index) * STROKE_DELAY,
              ease: "easeOut",
            }}
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          />
        ))}

        {/* Fang character strokes - animate after Dong completes */}
        {FANG_STROKES.map((strokePath, index) => (
          <motion.path
            key={`fang-${index}`}
            d={strokePath}
            fill={STROKE_COLOR}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: STROKE_DURATION,
              delay: BORDER_DURATION + 0.2 + (YU_STROKES.length + JIAN_STROKES.length + DONG_STROKES.length + index) * STROKE_DELAY,
              ease: "easeOut",
            }}
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
