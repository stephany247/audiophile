import AboutSection from "@/components/home/AboutSection";
import Categories from "@/components/home/Categories";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-black antialiased">
      <Hero />
      <Categories />
      <FeaturedGrid />
      <AboutSection />
    </main>
  );
}
