import { Header, Hero, Mission, Products, Footer } from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Mission />
        <Products />
      </main>
      <Footer />
    </>
  );
}
