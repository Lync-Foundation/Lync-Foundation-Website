"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface FlyingLogoProps {
  onAnimationComplete?: () => void;
}

// Generic leaf shape used for all three leaves initially
const genericLeafPath = "M 50 10 Q 70 30, 90 50 Q 70 70, 50 90 Q 30 70, 10 50 Q 30 30, 50 10 Z";

// Final paths for each component (from the traced logo)
const finalUpperWingPath = `M 207 229 L 226 288 L 240 323 L 260 361 L 277 385 L 292 402 L 317 423 L 345 439 L 368 449 L 426 468 L 448 478 L 457 484 L 470 497 L 474 503 L 482 524 L 483 547 L 469 611 L 467 630 L 467 655 L 473 633 L 485 603 L 521 525 L 534 483 L 537 464 L 536 445 L 531 427 L 524 414 L 513 400 L 501 389 L 476 372 L 285 279 L 232 248 Z`;
const finalInnerCurvePath = `M 268 446 L 270 456 L 284 487 L 293 501 L 309 519 L 329 533 L 345 540 L 365 546 L 400 553 L 425 563 L 436 571 L 443 579 L 448 588 L 451 602 L 452 601 L 452 595 L 459 566 L 459 550 L 454 533 L 443 518 L 432 510 L 413 501 L 345 484 L 311 472 L 279 455 Z`;
const finalLowerWingPath = `M 836 357 L 802 384 L 770 405 L 649 472 L 611 495 L 577 519 L 557 536 L 538 555 L 521 576 L 498 616 L 488 640 L 478 670 L 465 720 L 466 722 L 473 713 L 486 701 L 514 681 L 560 657 L 614 635 L 664 611 L 698 590 L 722 571 L 744 549 L 757 533 L 773 510 L 787 486 L 801 457 L 816 420 Z`;

export default function FlyingLogo({ onAnimationComplete }: FlyingLogoProps) {
  const [phase, setPhase] = useState<"entry" | "converge" | "assemble" | "flying" | "complete">("entry");
  const containerControls = useAnimation();
  
  // Animation sequence
  useEffect(() => {
    const runAnimation = async () => {
      // Phase 1: Entry - leaves scattered (0-2s)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPhase("converge");
      
      // Phase 2: Converge to center (2-4s)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPhase("assemble");
      
      // Phase 3: Assemble in center (4-5.5s)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPhase("flying");
      
      // Phase 4: Fly to nav (5.5-7s)
      await containerControls.start({
        x: "-42vw",
        y: "-42vh",
        scale: 0.15,
        transition: {
          duration: 1.5,
          ease: [0.4, 0, 0.2, 1],
        }
      });
      
      // Small delay then complete
      await new Promise(resolve => setTimeout(resolve, 200));
      setPhase("complete");
      onAnimationComplete?.();
    };
    
    runAnimation();
  }, [containerControls, onAnimationComplete]);

  if (phase === "complete") {
    return null;
  }

  // Calculate positions based on phase
  const getLeafTransform = (leafIndex: number) => {
    // Starting positions - spread across the viewport
    const startPositions = [
      { x: -350, y: -280, rotate: -45, scale: 0.3 },  // Top-left distant
      { x: 380, y: -200, rotate: 30, scale: 0.25 },   // Top-right distant
      { x: -200, y: 350, rotate: 15, scale: 0.35 },   // Bottom-left distant
    ];
    
    // Center convergence positions
    const convergePositions = [
      { x: -80, y: -60, rotate: -20, scale: 0.5 },
      { x: 100, y: -30, rotate: 15, scale: 0.45 },
      { x: 0, y: 80, rotate: 5, scale: 0.55 },
    ];
    
    // Assembled positions (matching logo layout)
    const assembledPositions = [
      { x: -60, y: -40, rotate: 0, scale: 0.8 },   // Upper wing
      { x: -20, y: 10, rotate: 0, scale: 0.6 },    // Inner curve
      { x: 60, y: 20, rotate: 0, scale: 0.85 },    // Lower wing
    ];

    switch (phase) {
      case "entry":
        return startPositions[leafIndex];
      case "converge":
        return convergePositions[leafIndex];
      case "assemble":
      case "flying":
        return assembledPositions[leafIndex];
      default:
        return assembledPositions[leafIndex];
    }
  };

  // Get visual properties based on phase
  const getLeafStyle = (leafIndex: number) => {
    const sketchColors = ["#FFD866", "#E05820", "#8B2323"]; // Golden to vermillion sketch colors
    const midColors = ["#FFC040", "#D04028", "#9E2626"]; // Autumn transition colors
    const finalGradients = [
      "url(#upperWingGradient)",
      "url(#innerCurveGradient)", 
      "url(#lowerWingGradient)"
    ];

    switch (phase) {
      case "entry":
        return {
          stroke: sketchColors[leafIndex],
          strokeWidth: 2,
          fill: "none",
          opacity: 0.7,
          strokeDasharray: "8,4",
        };
      case "converge":
        return {
          stroke: midColors[leafIndex],
          strokeWidth: 3,
          fill: "none",
          opacity: 0.85,
          strokeDasharray: "4,2",
        };
      case "assemble":
        return {
          stroke: midColors[leafIndex],
          strokeWidth: 4,
          fill: midColors[leafIndex],
          fillOpacity: 0.6,
          opacity: 1,
          strokeDasharray: "none",
        };
      case "flying":
        return {
          stroke: "none",
          fill: finalGradients[leafIndex],
          opacity: 1,
          strokeDasharray: "none",
        };
      default:
        return {};
    }
  };

  // Get path based on phase (morph from generic to final)
  const getLeafPath = (leafIndex: number) => {
    const finalPaths = [finalUpperWingPath, finalInnerCurvePath, finalLowerWingPath];
    
    // In entry phase, use generic leaf shape
    if (phase === "entry") {
      return genericLeafPath;
    }
    // In converge phase, still use generic but will transition
    if (phase === "converge") {
      return genericLeafPath;
    }
    // In assemble and flying phases, use final paths
    return finalPaths[leafIndex];
  };

  // Get viewBox based on phase
  const getViewBox = () => {
    if (phase === "entry" || phase === "converge") {
      return "0 0 100 100";
    }
    return "0 0 1024 1024";
  };

  return (
    <motion.div 
      className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
      animate={containerControls}
    >
      {/* Ambient glow that grows with the animation - autumn red/gold theme */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{
          opacity: phase === "flying" ? 0 : phase === "assemble" ? 0.5 : phase === "converge" ? 0.35 : 0.2,
          scale: phase === "flying" ? 0.5 : phase === "assemble" ? 1.2 : phase === "converge" ? 0.85 : 0.5,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(255, 180, 40, 0.25) 0%, rgba(139, 35, 35, 0.15) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Three flying leaves */}
      {[0, 1, 2].map((leafIndex) => {
        const transform = getLeafTransform(leafIndex);
        const style = getLeafStyle(leafIndex);
        
        return (
          <motion.div
            key={leafIndex}
            className="absolute"
            initial={{
              x: getLeafTransform(leafIndex).x,
              y: getLeafTransform(leafIndex).y,
              rotate: getLeafTransform(leafIndex).rotate,
              scale: getLeafTransform(leafIndex).scale,
              opacity: 0,
            }}
            animate={{
              x: transform.x,
              y: transform.y,
              rotate: transform.rotate,
              scale: transform.scale,
              opacity: phase === "entry" ? 1 : 1,
            }}
            transition={{
              duration: phase === "entry" ? 0.8 : 1.5,
              delay: phase === "entry" ? leafIndex * 0.3 : 0,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              width: phase === "entry" || phase === "converge" ? 150 : 400,
              height: phase === "entry" || phase === "converge" ? 150 : 400,
            }}
          >
            <motion.svg
              viewBox={getViewBox()}
              className="w-full h-full"
              style={{ overflow: 'visible' }}
              animate={{
                filter: phase === "flying" ? "drop-shadow(0 0 20px rgba(255, 150, 24, 0.5))" : "none",
              }}
              transition={{ duration: 0.5 }}
            >
              <defs>
                {/* Upper Wing Gradient: 香山红叶 - golden tip to 故宫红墙 base */}
                <linearGradient id="upperWingGradient" gradientUnits="userSpaceOnUse" x1="207" y1="229" x2="537" y2="655">
                  <stop offset="0%" stopColor="#FFF8DC" />
                  <stop offset="10%" stopColor="#FFE488" />
                  <stop offset="20%" stopColor="#FFC844" />
                  <stop offset="30%" stopColor="#FF9E18" />
                  <stop offset="40%" stopColor="#FF7010" />
                  <stop offset="50%" stopColor="#E04420" />
                  <stop offset="60%" stopColor="#D03428" />
                  <stop offset="70%" stopColor="#B82828" />
                  <stop offset="85%" stopColor="#8B2323" />
                  <stop offset="100%" stopColor="#7A1F1F" />
                </linearGradient>
                {/* Inner Curve Gradient: Golden tip to deep red base */}
                <linearGradient id="innerCurveGradient" gradientUnits="userSpaceOnUse" x1="268" y1="446" x2="459" y2="602">
                  <stop offset="0%" stopColor="#FFD866" />
                  <stop offset="20%" stopColor="#FFA020" />
                  <stop offset="40%" stopColor="#E05820" />
                  <stop offset="60%" stopColor="#B83028" />
                  <stop offset="80%" stopColor="#8B2323" />
                  <stop offset="100%" stopColor="#7A1F1F" />
                </linearGradient>
                {/* Lower Wing Gradient: 故宫红墙 base (40%) then rapid to golden tip */}
                <linearGradient id="lowerWingGradient" gradientUnits="userSpaceOnUse" x1="465" y1="722" x2="836" y2="357">
                  <stop offset="0%" stopColor="#7A1F1F" />
                  <stop offset="20%" stopColor="#8B2323" />
                  <stop offset="40%" stopColor="#9E2626" />
                  <stop offset="55%" stopColor="#D04028" />
                  <stop offset="70%" stopColor="#F07818" />
                  <stop offset="85%" stopColor="#FFB428" />
                  <stop offset="100%" stopColor="#FFE066" />
                </linearGradient>
              </defs>

              <motion.path
                d={getLeafPath(leafIndex)}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  stroke: style.stroke,
                  strokeWidth: style.strokeWidth || 0,
                  fill: style.fill || "none",
                  opacity: style.opacity,
                  strokeDasharray: style.strokeDasharray,
                }}
                transition={{
                  pathLength: { duration: 1.5, ease: "easeInOut" },
                  default: { duration: 0.8, ease: "easeInOut" },
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        );
      })}

      {/* Particle trails during flight */}
      {phase === "flying" && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 ? "#FFE066" : i % 3 === 1 ? "#FF8810" : "#8B2323",
              }}
              initial={{ 
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                scale: 1,
                opacity: 0.8,
              }}
              animate={{
                x: (Math.random() - 0.5) * 400 + 200,
                y: (Math.random() - 0.5) * 400 + 200,
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
