"use client";

import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";

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
    containerRef.current.innerHTML = "";
    writersRef.current = [];

    // Create a writer for each character
    CHARACTERS.forEach((char, index) => {
      const charDiv = document.createElement("div");
      charDiv.id = `hanzi-${index}`;
      charDiv.style.display = "inline-block";
      containerRef.current?.appendChild(charDiv);

      const writer = HanziWriter.create(`hanzi-${index}`, char, {
        width: 70,
        height: 70,
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
      {/* Irregular organic seal border using SVG */}
      <div className="relative">
        <svg
          viewBox="0 0 340 120"
          className="w-full h-auto"
          style={{ minWidth: "300px" }}
        >
          {/* Outer border - irregular organic rectangle */}
          <path
            d="M8 12 
               C18 6, 60 9, 170 7 
               C280 9, 322 6, 332 12 
               C340 20, 342 32, 338 50 
               C342 68, 340 88, 335 100 
               C328 112, 300 116, 170 118 
               C40 116, 12 112, 5 100 
               C0 88, -2 68, 2 50 
               C-2 32, 0 20, 8 12 Z"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="3.5"
            className="transition-all duration-300"
          />
          
          {/* Inner border - slightly irregular */}
          <path
            d="M18 22 
               C26 17, 65 19, 170 18 
               C275 19, 314 17, 322 22 
               C328 28, 330 38, 327 50 
               C330 62, 328 78, 324 88 
               C318 98, 290 102, 170 103 
               C50 102, 22 98, 16 88 
               C10 78, 8 62, 12 50 
               C8 38, 10 28, 18 22 Z"
            fill="none"
            stroke={STROKE_COLOR}
            strokeWidth="1.8"
            opacity="0.7"
            className="transition-all duration-300"
          />

          {/* Foreign object to embed the character container */}
          <foreignObject x="30" y="20" width="280" height="80">
            <div
              ref={containerRef}
              className="flex justify-center items-center gap-0 h-full"
              style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                height: "100%"
              }}
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}
