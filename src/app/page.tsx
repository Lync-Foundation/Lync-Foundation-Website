"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroAnimated from "@/components/HeroAnimated";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";
import ImperialBackground from "@/components/ImperialBackground";

export default function Home() {
  const [logoInNav, setLogoInNav] = useState(false);

  return (
    <>
      {/* Persistent imperial background */}
      <ImperialBackground />
      
      {/* Content layer */}
      <div className="relative z-10">
        <Header showLogo={logoInNav} />
        <main>
          <HeroAnimated onLogoAnimationComplete={() => setLogoInNav(true)} />
          <Mission />
        </main>
        <Footer />
      </div>
    </>
  );
}
