"use client";

import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";

const CHARACTERS = ["遇", "見", "東", "方"];
const STROKE_COLOR = "#C52F2F";
const ANIMATION_SPEED = 1.5; // Speed multiplier

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
        width: 80,
        height: 80,
        padding: 2,
        strokeColor: STROKE_COLOR,
        radicalColor: STROKE_COLOR,
        strokeAnimationSpeed: ANIMATION_SPEED,
        delayBetweenStrokes: 150,
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
        // Start next character after current one finishes
        setTimeout(() => animateSequentially(index + 1), 200);
      },
    });
  };

  return (
    <div
      className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Seal border frame */}
      <div className="relative border-4 border-[#C52F2F] rounded-lg p-4 bg-[#faf8f5]/80">
        {/* Inner border */}
        <div className="border-2 border-[#C52F2F]/60 rounded p-3">
          {/* Character container */}
          <div
            ref={containerRef}
            className="flex justify-center items-center gap-1"
          />
        </div>
      </div>
    </div>
  );
}
