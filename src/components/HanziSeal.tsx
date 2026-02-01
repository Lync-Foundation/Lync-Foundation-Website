"use client";

import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";

// Character order for animation: 遇→見→東→方
const CHARACTERS = ["遇", "見", "東", "方"];
const STROKE_COLOR = "#C52F2F";
const ANIMATION_SPEED = 1.5;

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

    // Create a writer for each character - larger size
    CHARACTERS.forEach((char, index) => {
      const charDiv = document.getElementById(`hanzi-${index}`);
      if (!charDiv) return;

      const writer = HanziWriter.create(`hanzi-${index}`, char, {
        width: 130,
        height: 130,
        padding: 3,
        strokeColor: STROKE_COLOR,
        radicalColor: STROKE_COLOR,
        strokeAnimationSpeed: ANIMATION_SPEED,
        delayBetweenStrokes: 100,
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
        setTimeout(() => animateSequentially(index + 1), 120);
      },
    });
  };

  return (
    <div
      className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Dramatic organic seal border - larger and more spread out */}
      <div className="relative" ref={containerRef}>
        <svg
          viewBox="0 0 380 520"
          className="w-full h-auto"
          style={{ minWidth: "340px", maxWidth: "420px" }}
        >
          {/* Outer border - dramatic organic curves with breakpoints */}
          <path
            d="M18 25 
               C35 8, 80 18, 130 12 
               Q165 8, 190 14 
               C220 6, 280 16, 320 10 
               Q345 8, 362 22
               C378 38, 375 70, 372 120 
               Q376 165, 370 210 
               C378 260, 374 310, 376 360 
               Q378 410, 368 450 
               C358 485, 340 502, 300 508 
               Q250 515, 190 512 
               C130 518, 80 510, 45 502 
               Q18 495, 10 460 
               C2 420, 6 370, 4 320 
               Q0 270, 8 220 
               C2 170, 6 120, 4 75 
               Q2 45, 18 25 Z"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
          
          {/* Inner border - organic with subtle variations */}
          <path
            d="M38 50 
               C52 35, 95 42, 140 38 
               Q175 34, 190 40 
               C225 32, 275 42, 315 36 
               Q338 34, 348 48
               C360 62, 356 92, 354 135 
               Q358 175, 352 220 
               C360 265, 356 310, 358 355 
               Q360 400, 352 435 
               C344 465, 328 478, 292 483 
               Q245 489, 190 486 
               C135 491, 88 484, 58 478 
               Q35 472, 28 440 
               C20 405, 24 360, 22 315 
               Q18 270, 26 225 
               C20 180, 24 135, 22 95 
               Q20 68, 38 50 Z"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="2"
            opacity="0.6"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Small decorative notches/breakpoints on outer border */}
          <circle cx="100" cy="12" r="2" fill={STROKE_COLOR} opacity="0.5" />
          <circle cx="280" cy="10" r="2.5" fill={STROKE_COLOR} opacity="0.4" />
          <circle cx="374" cy="180" r="2" fill={STROKE_COLOR} opacity="0.5" />
          <circle cx="6" cy="280" r="2.5" fill={STROKE_COLOR} opacity="0.4" />
          <circle cx="120" cy="510" r="2" fill={STROKE_COLOR} opacity="0.5" />
          <circle cx="260" cy="512" r="2" fill={STROKE_COLOR} opacity="0.4" />

          {/* Staggered zigzag layout - more spread out */}
          {/* 遇 at (0, 3) - left, TOP */}
          {/* 東 at (1.5, 2) - right, second from top */}
          {/* 見 at (0, 1) - left, third from top */}
          {/* 方 at (1.5, 0) - right, BOTTOM */}
          
          {/* 遇 - TOP LEFT (0, 3) */}
          <foreignObject x="35" y="45" width="140" height="140">
            <div
              id="hanzi-0"
              className="hanzi-char flex justify-center items-center w-full h-full"
            />
          </foreignObject>

          {/* 見 - THIRD from top, LEFT (0, 1) */}
          <foreignObject x="35" y="290" width="140" height="140">
            <div
              id="hanzi-1"
              className="hanzi-char flex justify-center items-center w-full h-full"
            />
          </foreignObject>

          {/* 東 - SECOND from top, RIGHT (1.5, 2) */}
          <foreignObject x="200" y="155" width="140" height="140">
            <div
              id="hanzi-2"
              className="hanzi-char flex justify-center items-center w-full h-full"
            />
          </foreignObject>

          {/* 方 - BOTTOM RIGHT (1.5, 0) */}
          <foreignObject x="200" y="355" width="140" height="140">
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
