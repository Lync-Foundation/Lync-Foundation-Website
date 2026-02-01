import Header from "@/components/Header";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";
import ImperialBackground from "@/components/ImperialBackground";
import SilkRoadAnimation from "@/components/SilkRoadAnimation";
import FloatingClouds from "@/components/FloatingClouds";

export default function Home() {
  return (
    <>
      {/* Persistent imperial background */}
      <ImperialBackground />
      
      {/* Floating clouds - bottom-most animated layer */}
      <FloatingClouds />
      
      {/* Floating particles background */}
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
