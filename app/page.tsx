import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsKpis } from "@/components/StatsKpis";
import { ChartCoreProficiency } from "@/components/ChartCoreProficiency";
import { ChartParticipationVsProficiency } from "@/components/ChartParticipationVsProficiency";
import { InsightCallouts } from "@/components/InsightCallouts";
import { InfoBand } from "@/components/InfoBand";
import { ImpactBlock } from "@/components/ImpactBlock";
import { MobileFirstCard } from "@/components/MobileFirstCard";
import { TeacherBenefits } from "@/components/TeacherBenefits";
import { OutcomeTiles } from "@/components/OutcomeTiles";
import { ValueChain } from "@/components/ValueChain";
import { OfferingCards } from "@/components/OfferingCards";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsKpis />
        <ChartCoreProficiency />
        <ChartParticipationVsProficiency />
        <InsightCallouts />
        <InfoBand />
        <ImpactBlock />
        <MobileFirstCard />
        <TeacherBenefits />
        <OutcomeTiles />
        <ValueChain />
        <OfferingCards />
      </main>
      <Footer />
    </>
  );
}