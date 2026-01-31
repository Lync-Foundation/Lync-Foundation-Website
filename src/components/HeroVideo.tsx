"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  videoSrc?: string;
  posterSrc?: string;
}

export default function HeroVideo({ 
  videoSrc = "/hero-video.webm",
  posterSrc = "/hero-poster.jpg"
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked, that's okay
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Layer */}
      {!videoError && (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={posterSrc}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc} type="video/webm" />
            <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
          </video>
          
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          
          {/* Vignette effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)"
            }}
          />
        </div>
      )}

      {/* Fallback: Static background (shows while video loads or on error) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          videoLoaded && !videoError ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Imperial gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#0d0808] dark:to-[#080808] from-[#f5f0e6] via-[#f3ece2] to-[#f5f0e6]" />
        
        {/* Lattice pattern */}
        <div 
          className="absolute inset-0 dark:opacity-[0.025] opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(139, 35, 35, 0.4) 1px, transparent 1px),
              linear-gradient(rgba(139, 35, 35, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Vermillion glow */}
        <div 
          className="absolute inset-0 dark:opacity-20 opacity-10"
          style={{
            background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139, 35, 35, 0.3) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* Center Logo - always visible, floats above video */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Pulsing glow behind logo */}
        <motion.div
          className="absolute w-56 h-56 lg:w-72 lg:h-72 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)",
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/logo.png"
              alt="Lync Foundation"
              width={180}
              height={180}
              className="w-40 h-40 lg:w-48 lg:h-48 drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-12 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
