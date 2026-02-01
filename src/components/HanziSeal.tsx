"use client";

import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";

// Character order for animation: 遇→見→東→方
// But layout is 2x2 vertical seal (read right-to-left, top-to-bottom)
// Layout:  東  遇
//          方  見
const CHARACTERS = ["遇", "見", "東", "方"];
const STROKE_COLOR = "#C52F2F";
const ANIMATION_SPEED = 1.5;

// Grid positions for each character (col, row) - 0-indexed
// 遇: right column (1), top row (0)
// 見: right column (1), bottom row (1)
// 東: left column (0), top row (0)
// 方: left column (0), bottom row (1)
const POSITIONS = [
  { col: 1, row: 0 }, // 遇 - top right
  { col: 1, row: 1 }, // 見 - bottom right
  { col: 0, row: 0 }, // 東 - top left
  { col: 0, row: 1 }, // 方 - bottom left
];

export default function HanziSeal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const writersRef = useRef<HanziWriter[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    const charContainers = containerRef.current.querySelectorAll(".hanzi-char");
    charContainers.forEach((el) => (el.innerHTML = ""));
    writersRef.current = [];

    // Create a writer for each character
    CHARACTERS.forEach((char, index) => {
      const charDiv = document.getElementById(`hanzi-${index}`);
      if (!charDiv) return;

      const writer = HanziWriter.create(`hanzi-${index}`, char, {
        width: 91, // 70 * 1.3 = 91
        height: 91,
        padding: 2,
        strokeColor: STROKE_COLOR,
        radicalColor: STROKE_COLOR,
        strokeAnimationSpeed: ANIMATION_SPEED,
        delayBetweenStrokes: 120,
        showOutline: false,
        showCharacter: false,
      });

      writersRef.current.push(writer);
    });

    // Start animation after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      animateSequentially(0);
    }, 800);

    return () => {
      clearTimeout(timer);
      writersRef.current = [];
    };
  }, []);

  const animateSequentially = (index: number) => {
    if (index >= writersRef.current.length) return;

    const writer = writersRef.current[index];
    writer.animateCharacter({
      onComplete: () => {
        setTimeout(() => animateSequentially(index + 1), 150);
      },
    });
  };

  return (
    <div
      className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Irregular organic seal border using SVG - vertical 2x2 layout */}
      <div className="relative" ref={containerRef}>
        <svg
          viewBox="0 0 240 300"
          className="w-full h-auto"
          style={{ minWidth: "200px", maxWidth: "260px" }}
        >
          {/* Outer border - irregular organic rectangle (vertical) */}
          <path
            d="M12 16 
               C22 8, 50 11, 120 9 
               C190 11, 218 8, 228 16 
               C238 26, 240 55, 236 150 
               C240 245, 238 278, 228 288 
               C218 298, 190 295, 120 297 
               C50 295, 22 298, 12 288 
               C2 278, 0 245, 4 150 
               C0 55, 2 26, 12 16 Z"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="3.5"
            className="transition-all duration-300"
          />
          
          {/* Inner border - slightly irregular */}
          <path
            d="M24 28 
               C32 22, 55 24, 120 23 
               C185 24, 208 22, 216 28 
               C224 36, 226 60, 223 150 
               C226 240, 224 268, 216 276 
               C208 284, 185 282, 120 283 
               C55 282, 32 284, 24 276 
               C16 268, 14 240, 17 150 
               C14 60, 16 36, 24 28 Z"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="1.8"
            opacity="0.7"
            className="transition-all duration-300"
          />

          {/* Staggered zigzag layout (y increases upward in coord system) */}
          {/* 遇 at (0, 3) - left, TOP */}
          {/* 東 at (1.5, 2) - right, second from top */}
          {/* 見 at (0, 1) - left, third from top */}
          {/* 方 at (1.5, 0) - right, BOTTOM */}
          
          {/* 遇 - TOP LEFT (0, 3) */}
          <foreignObject x="25" y="20" width="95" height="95">
            <div
              id="hanzi-0"
              className="hanzi-char flex justify-center items-center w-full h-full"
            />
          </foreignObject>

          {/* 見 - THIRD from top, LEFT (0, 1) */}
          <foreignObject x="25" y="150" width="95" height="95">
            <div
              id="hanzi-1"
              className="hanzi-char flex justify-center items-center w-full h-full"
            />
          </foreignObject>

          {/* 東 - SECOND from top, RIGHT (1.5, 2) */}
          <foreignObject x="120" y="85" width="95" height="95">
            <div
              id="hanzi-2"
              className="hanzi-char flex justify-center items-center w-full h-full"
            />
          </foreignObject>

          {/* 方 - BOTTOM RIGHT (1.5, 0) */}
          <foreignObject x="120" y="195" width="95" height="95">
            <div
              id="hanzi-3"
              className="hanzi-char flex justify-center items-center w-full h-full"
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}
