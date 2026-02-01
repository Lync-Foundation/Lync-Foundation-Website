"use client";

import { useEffect, useRef } from "react";

// Cloud path data extracted from cloud.svg - Traditional Chinese auspicious clouds (祥云)
const CLOUD_PATHS = [
  // Cloud 1 - Spiral flowing cloud
  "m 64.378981,156.50531 c 0,-1.73314 4.49731,-9.3155 7.84507,-13.22661 3.81129,-4.45264 9.77855,-7.86789 13.74706,-7.86789 6.50676,0 12.26681,-6.81278 10.92505,-12.92177 -1.20702,-5.49553 -8.98699,-9.20843 -12.31718,-5.87823 -1.92127,1.92127 -1.3861,2.96996 0.89314,1.75015 4.89367,-2.61901 10.67245,2.28763 9.41846,7.99702 -1.95591,8.90521 -17.5529,9.675 -21.99468,1.08556 -3.08563,-5.96695 -0.51809,-14.74896 5.64875,-19.32101 4.79782,-3.55706 17.60612,-1.94318 22.948449,2.89156 1.19009,1.07701 1.89198,1.19587 2.3818,0.40332 0.83547,-1.35182 5.98007,-0.39605 9.1903,1.70737 3.02931,1.98488 6.31378,9.11203 6.31378,13.70062 0,4.62866 -2.54951,10.27395 -5.30618,11.74927 -1.12501,0.60209 -7.25385,1.67282 -13.61965,2.37941 -6.365789,0.7066 -13.824169,2.04951 -16.574169,2.98425 -5.7332,1.94876 -13.51065,7.31359 -15.90898,10.97391 -1.61892,2.47078 -3.59102,3.34566 -3.59102,1.59307 z",
  // Cloud 2 - Compact swirl
  "m 84.720701,141.22367 c 3.38705,-1.05617 10.61981,-2.19363 16.072789,-2.52767 8.92094,-0.54649 10.21816,-0.87867 12.9446,-3.31475 2.66607,-2.38214 3.03675,-3.37481 3.08549,-8.26293 0.0597,-5.98587 -1.77564,-9.55784 -6.47803,-12.60773 l -2.46657,-1.59978 1.85241,2.87111 c 2.43374,3.77215 2.52904,8.99741 0.21082,11.55902 -2.38065,2.63059 -3.17289,2.01678 -3.84273,-2.97726 -1.26823,-9.45536 -9.374769,-15.95287 -19.903409,-15.95287 -4.32808,0 -5.46268,0.44633 -8.2617,3.25 -7.91045,7.92361 -3.98385,19.75 6.5574,19.75 4.04826,0 6.78234,-1.59399 7.93522,-4.62628 1.68691,-4.43692 -2.14002,-8.46522 -6.05273,-6.3712 -1.02291,0.54745 -2.17233,1.97996 -2.55428,3.18336 -0.6799,2.14219 -0.72413,2.14745 -2.11232,0.25106 -3.12166,-4.26447 0.90613,-10.43694 6.81053,-10.43694 5.85349,0 9.97639,4.14771 10.60277,10.66658 0.70119,7.2974 -2.55798,10.73968 -12.74198,13.45786 -5.32579,1.42149 -8.44216,2.91005 -10.75,5.13485 -4.11962,3.97137 -4.21379,5.56317 -0.15828,2.67539 1.70045,-1.21082 5.86295,-3.06564 9.25,-4.12182 z",
  // Cloud 3 - Simple curl
  "m 60.384011,414.52889 c 0.003,-0.33995 1.70115,-2.85748 3.77416,-5.59453 4.55198,-6.01007 9.50235,-9.52355 13.41835,-9.52355 9.50948,0 15.55979,-9.67057 10.61574,-16.96777 -4.38134,-6.46666 -12.5635,-6.1479 -14.24582,0.55499 -0.81697,3.25507 0.91644,5.61422 1.88435,2.56459 1.36097,-4.28801 8.08315,-3.85285 9.19963,0.59554 2.4927,9.93172 -14.17886,12.41462 -18.23152,2.71523 -2.26939,-5.43141 0.0807,-12.37282 5.27612,-15.58375 2.74806,-1.69839 4.43789,-2.02312 8.20576,-1.57687 9.77759,1.15801 16.1114,6.89776 17.64798,15.99272 l 0.69606,4.11994 1.877079,-2.3181 c 2.49375,-3.07965 2.36743,-5.09485 -0.592789,-9.45697 -2.59134,-3.81856 -2.28596,-4.25762 1.863889,-2.67985 3.00041,1.14076 6.60598,7.70819 6.60598,12.03258 0,4.19891 -2.40559,9.61923 -4.8496,10.92723 -1.11041,0.59427 -4.185999,1.09619 -6.834659,1.11538 -6.92137,0.0501 -19.32197,2.43193 -24.43329,4.69291 -2.41433,1.06797 -6.07556,3.53175 -8.13607,5.47506 -2.06051,1.94331 -3.74412,3.25516 -3.74135,2.91522 z",
];

interface Cloud {
  x: number;
  y: number;
  pathIndex: number;
  scale: number;
  opacity: number;
  speed: number;
  floatOffset: number;
  floatSpeed: number;
}

export default function FloatingClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const cloudsRef = useRef<Cloud[]>([]);
  const pathsRef = useRef<Path2D[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Parse SVG paths to Path2D objects
    pathsRef.current = CLOUD_PATHS.map((d) => new Path2D(d));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initClouds();
    };

    const initClouds = () => {
      const width = canvas.width;
      const height = canvas.height;
      cloudsRef.current = [];

      // Create 8-12 floating clouds distributed across the screen
      const cloudCount = 10;
      for (let i = 0; i < cloudCount; i++) {
        cloudsRef.current.push({
          x: Math.random() * (width + 400) - 200,
          y: Math.random() * height,
          pathIndex: Math.floor(Math.random() * CLOUD_PATHS.length),
          scale: 0.8 + Math.random() * 1.2, // Varied sizes
          opacity: 0.03 + Math.random() * 0.05, // Very subtle
          speed: 0.1 + Math.random() * 0.2, // Slow drift
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.0005 + Math.random() * 0.001,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cloudsRef.current.forEach((cloud) => {
        // Horizontal drift
        cloud.x += cloud.speed;

        // Gentle vertical floating
        const floatY = Math.sin(time * cloud.floatSpeed + cloud.floatOffset) * 20;

        // Wrap around when cloud goes off screen
        if (cloud.x > canvas.width + 200) {
          cloud.x = -200;
          cloud.y = Math.random() * canvas.height;
        }

        // Draw cloud
        ctx.save();
        ctx.translate(cloud.x, cloud.y + floatY);
        ctx.scale(cloud.scale, cloud.scale);
        // Center the cloud path (paths are offset in original SVG)
        ctx.translate(-80, -130);
        
        // Crimson/red color matching the seal theme
        ctx.fillStyle = `rgba(197, 47, 47, ${cloud.opacity})`;
        ctx.fill(pathsRef.current[cloud.pathIndex]);
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
