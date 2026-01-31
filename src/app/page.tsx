import Header from "@/components/Header";
import HeroAnimated from "@/components/HeroAnimated";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroAnimated />
        <Mission />
      </main>
      <Footer />
    </>
  );
}
