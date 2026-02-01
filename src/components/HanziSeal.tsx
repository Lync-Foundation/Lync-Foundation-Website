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

          {/* Traditional Chinese decorative elements - 祥云 (auspicious clouds) and flowing patterns */}
          
          {/* Top-left cloud spiral (祥云) */}
          <path
            d="M60 190 
               C55 185, 48 188, 50 195
               C52 202, 60 205, 65 200
               C70 195, 68 188, 62 186
               C56 184, 50 190, 55 198
               C60 206, 72 204, 75 195"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="1.2"
            opacity="0.3"
            strokeLinecap="round"
          />
          
          {/* Top-left cloud tail */}
          <path
            d="M75 195 
               C82 192, 88 198, 85 205
               C82 212, 75 210, 78 203"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="1"
            opacity="0.25"
            strokeLinecap="round"
          />
          
          {/* Center flowing flame element */}
          <path
            d="M185 245 
               C178 235, 172 242, 175 252
               C178 262, 188 258, 185 248
               C182 238, 175 245, 180 255
               C185 265, 195 260, 192 250"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="1.1"
            opacity="0.28"
            strokeLinecap="round"
          />
          
          {/* Center flame tendril */}
          <path
            d="M192 250 
               C198 255, 195 265, 188 268
               C181 271, 178 265, 182 260"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="0.9"
            opacity="0.22"
            strokeLinecap="round"
          />
          
          {/* Bottom-right cloud spiral */}
          <path
            d="M320 400 
               C325 395, 332 398, 330 405
               C328 412, 320 415, 315 410
               C310 405, 312 398, 318 396
               C324 394, 330 400, 325 408
               C320 416, 308 414, 305 405"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="1.2"
            opacity="0.3"
            strokeLinecap="round"
          />
          
          {/* Bottom-right cloud extension */}
          <path
            d="M305 405 
               C298 402, 292 408, 295 415
               C298 422, 305 420, 302 413"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="1"
            opacity="0.25"
            strokeLinecap="round"
          />
          
          {/* Left side flowing wave */}
          <path
            d="M48 350 
               C42 345, 38 352, 42 360
               C46 368, 55 365, 52 355
               C49 345, 42 350, 46 362"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="1"
            opacity="0.25"
            strokeLinecap="round"
          />
          
          {/* Right side decorative swirl */}
          <path
            d="M340 155 
               C345 150, 352 153, 350 160
               C348 167, 340 170, 335 165
               C330 160, 332 153, 338 151
               C344 149, 350 155, 345 163"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="1.1"
            opacity="0.28"
            strokeLinecap="round"
          />
          
          {/* Small accent spirals */}
          <path
            d="M170 140 C165 135, 160 140, 165 148 C170 156, 178 152, 175 145"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="0.8"
            opacity="0.2"
            strokeLinecap="round"
          />
          
          <path
            d="M180 380 C175 375, 170 380, 175 388 C180 396, 188 392, 185 385"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="0.8"
            opacity="0.2"
            strokeLinecap="round"
          />

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
