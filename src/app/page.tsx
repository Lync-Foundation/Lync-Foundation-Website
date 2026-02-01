"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";
import ImperialBackground from "@/components/ImperialBackground";
import SilkRoadAnimation from "@/components/SilkRoadAnimation";

export default function Home() {
  const [logoInNav, setLogoInNav] = useState(false);

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
