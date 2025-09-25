import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsKpis } from "@/components/StatsKpis";
import { ExamTrendsChart } from "@/components/ExamTrendsChart";
import { OfferingCards } from "@/components/OfferingCards";
import { AdvantagesGrid } from "@/components/AdvantagesGrid";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsKpis />
        <ExamTrendsChart />
        <OfferingCards />
        <AdvantagesGrid />
      </main>
      <Footer />
    </>
  );
}