"use client";

import Header from "@/components/Header";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";
import ImperialBackground from "@/components/ImperialBackground";
import SilkRoadAnimation from "@/components/SilkRoadAnimation";

export default function Home() {
  return (
    <>
      {/* Persistent imperial background */}
      <ImperialBackground />
      
      {/* Silk Road Animation - plays in the hero section */}
      <SilkRoadAnimation />
      
      {/* Content layer */}
      <div className="relative z-10">
        <Header />
        <main>
          <Mission />
        </main>
        <Footer />
      </div>
    </>
  );
}
