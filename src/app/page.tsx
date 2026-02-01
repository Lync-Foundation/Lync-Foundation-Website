"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";
import ImperialBackground from "@/components/ImperialBackground";
import SilkRoadAnimation from "@/components/SilkRoadAnimation";

export default function Home() {
  // Logo appears after silk ribbon orbits it
  const [showLogo, setShowLogo] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("silkRoadAnimationPlayed") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (sessionStorage.getItem("silkRoadAnimationPlayed") === "true") {
      setShowLogo(true);
    }
  }, []);

  return (
    <>
      {/* Persistent imperial background */}
      <ImperialBackground />
      
      {/* Silk Road Animation - one ribbon flies to logo */}
      <SilkRoadAnimation onLogoReveal={() => setShowLogo(true)} />
      
      {/* Content layer */}
      <div className="relative z-10">
        <Header showLogo={showLogo} />
        <main>
          <Mission />
        </main>
        <Footer />
      </div>
    </>
  );
}
