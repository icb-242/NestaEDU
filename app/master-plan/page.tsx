"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { masterPlanContent } from "@/lib/masterPlanContent";
import { researchContent } from "@/lib/researchContent";
import { Container } from "@/components/ui/Container";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { Footer } from "@/components/Footer";
import { StatsKpis } from "@/components/StatsKpis";
import { ExamTrendsChart } from "@/components/ExamTrendsChart";
import { CalloutCard } from "@/components/plan/CalloutCard";
import { FeatureCard } from "@/components/plan/FeatureCard";
import { MobileFirstBanner } from "@/components/plan/MobileFirstBanner";
import { Timeline } from "@/components/plan/Timeline";
import { OutcomeCard } from "@/components/plan/OutcomeCard";
import { StickyNav } from "@/components/plan/StickyNav";

export default function MasterPlanPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Get all sections
          const sections = Array.from(document.querySelectorAll("h1[id], h2[id]"));
          
          if (entry.isIntersecting) {
            // Find the current section
            const currentSection = sections.find((section) => {
              const rect = section.getBoundingClientRect();
              // Consider a section "active" when it's in the top portion of the viewport
              return rect.top <= 200 && rect.bottom > 200;
            });
            
            if (currentSection) {
              setActiveSection(currentSection.id);
            }
          }
        });
      },
      {
        // Observe when elements enter the viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
        // Start observing slightly before elements enter the viewport
        rootMargin: "-100px 0px -50% 0px"
      }
    );

    // Observe all section headers
    document.querySelectorAll("h1[id], h2[id]").forEach((section) => {
      observer.observe(section);
    });

    // Also update active section on scroll
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll("h1[id], h2[id]"));
      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom > 200;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tocItems = [
    { id: "reality", label: "Today's Reality" },
    { id: "plan", label: "Our Plan" },
    { id: "opportunity", label: "Tomorrow's Opportunity" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="relative h-24">
          {/* Left-aligned navigation */}
          <div className="absolute top-4 left-4 flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src="/images/brand/nesta-logo-transparent.png"
                  alt="Nesta Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
            </Link>
            <Link
              href="/master-plan"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Master Plan
            </Link>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Start Learning
            </Link>
          </div>

          {/* Right-aligned theme toggle */}
          <div className="absolute top-4 right-4">
            <ThemeToggleButton />
          </div>
        </div>

        {/* Sticky Nav */}
        <div className="border-t border-b">
          <StickyNav items={tocItems} activeSection={activeSection} />
        </div>
      </header>

      <main className="pt-24">
        {/* The Challenge Section */}
        <section className="py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h1 id="reality" className="text-4xl font-bold tracking-tight mb-6 scroll-mt-[160px]">Today's Reality</h1>
              <p className="text-base text-muted-foreground/90 max-w-5xl leading-relaxed" >
                {researchContent.marketingCopy.problem}
              </p>
            </motion.div>

            <StatsKpis />
            <ExamTrendsChart />
          </Container>
        </section>

        {/* The Solution Section */}
        <section className="py-20 bg-muted/50">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 id="plan" className="text-4xl font-bold tracking-tight mb-8 scroll-mt-[160px]">Our Plan</h2>
              <div className="text-base text-muted-foreground/90 max-w-5xl leading-relaxed space-y-8">
                <p>{researchContent.marketingCopy.approach.split('\n\n')[0]}</p>
                <ul className="list-none space-y-4 pl-4">
                  {researchContent.marketingCopy.approach
                    .split('\n\n')
                    .filter(p => p.startsWith('•'))
                    .map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                </ul>
                <p>{researchContent.marketingCopy.approach.split('\n\n').slice(-1)[0]}</p>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
              {masterPlanContent.how.items.map((item) => (
                <FeatureCard
                  key={item.title}
                  title={item.title}
                  subtitle={item.subtitle}
                  features={item.features}
                />
              ))}
            </div>

            <MobileFirstBanner {...researchContent.mobileFirst} />
          </Container>
        </section>

        {/* The Future Section */}
        <section className="py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 id="opportunity" className="text-4xl font-bold tracking-tight mb-8 scroll-mt-[160px]">Tomorrow's Opportunity</h2>
              <p className="text-base text-muted-foreground/90 max-w-3xl leading-relaxed" >
                {researchContent.marketingCopy.impact}
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto mb-16">
              <Timeline items={masterPlanContent.furtherAhead.roadmap} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {researchContent.outcomes.map((outcome) => (
                <OutcomeCard key={outcome.title} {...outcome} />
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
