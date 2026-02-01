"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";
import ImperialBackground from "@/components/ImperialBackground";
import SilkRoadAnimation from "@/components/SilkRoadAnimation";

export default function Home() {
  // Check if animation already played this session
  const [logoInNav, setLogoInNav] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("silkRoadAnimationPlayed") === "true";
    }
    return false;
  });

  // Also check on mount for SSR compatibility
  useEffect(() => {
    if (sessionStorage.getItem("silkRoadAnimationPlayed") === "true") {
      setLogoInNav(true);
    }
  }, []);

  return (
    <>
      {/* Persistent imperial background */}
      <ImperialBackground />
      
      {/* Silk Road Animation - plays in the hero section */}
      <SilkRoadAnimation onAnimationComplete={() => setLogoInNav(true)} />
      
      {/* Content layer */}
      <div className="relative z-10">
        <Header showLogo={logoInNav} />
        <main>
          <Mission />
        </main>
        <Footer />
      </div>
    </>
  );
}
