"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { masterPlanContent } from "@/lib/masterPlanContent";
import { researchContent } from "@/lib/researchContent";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { Footer } from "@/components/Footer";
import { StatsKpis } from "@/components/StatsKpis";
import { ExamTrendsChart } from "@/components/ExamTrendsChart";
import { CalloutCard } from "@/components/plan/CalloutCard";
import { FeatureCard } from "@/components/plan/FeatureCard";
import { MobileFirstBanner } from "@/components/plan/MobileFirstBanner";
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
        <div className="relative h-32">
          {/* Left-aligned navigation */}
          <div className="absolute top-4 left-4 flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="relative w-[96px] h-[96px]">
                {/* Light mode logo */}
                <Image
                  src="/images/brand/nesta education 1-3.png"
                  alt="Nesta Logo"
                  fill
                  className="object-contain dark:opacity-0 dark:scale-0 transition-all duration-300"
                  sizes="96px"
                />
                {/* Dark mode logo */}
                <Image
                  src="/images/brand/nesta education 1-white.png"
                  alt="Nesta Logo"
                  fill
                  className="object-contain opacity-0 scale-0 dark:opacity-100 dark:scale-100 transition-all duration-300"
                  sizes="96px"
                />
              </div>
            </Link>
            <Link
              href="/master-plan"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Our Approach
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

      <main className="pt-32">
        {/* The Challenge Section */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-12"
          >
            <h1 id="reality" className="text-4xl font-bold tracking-tight mb-6 scroll-mt-[160px]">Today's Reality</h1>
            <p className="text-base text-muted-foreground/90 leading-relaxed" >
              {researchContent.marketingCopy.problem}
            </p>
          </motion.div>

          <StatsKpis />
          <ExamTrendsChart />
        </section>

        {/* The Solution Section */}
        <section className="py-20 bg-muted/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-16"
          >
            <h2 id="plan" className="text-4xl font-bold tracking-tight mb-8 scroll-mt-[160px]">Our Plan</h2>
            <div className="text-base text-muted-foreground/90 leading-relaxed space-y-8">
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

          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {masterPlanContent.how.items.map((item) => (
                <FeatureCard
                  key={item.title}
                  title={item.title}
                  subtitle={item.subtitle}
                  features={item.features}
                />
              ))}
            </div>
          </div>
        </section>

        {/* The Future Section */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-16"
          >
            <h2 id="opportunity" className="text-4xl font-bold tracking-tight mb-8 scroll-mt-[160px]">Tomorrow's Opportunity</h2>
            <p className="text-base text-muted-foreground/90 leading-relaxed" >
              With better tools, access, and support, national education outcomes can shift dramatically over the next five years and beyond. Outlined below is the impact we believe we can have on national averages as well as the opportunities for growth within the platform.
            </p>
          </motion.div>

          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            {/* Panel A — National Impact Goals */}
            <div className="rounded-2xl border bg-card p-6 sm:p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">National Impact Goals</h3>
                <span className="text-[11px] text-muted-foreground">Measured via MOE Exam Data</span>
              </div>

              {/* Metric grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Goal 1 */}
                <div className="rounded-xl border bg-card/50 p-5">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-bold mb-1 text-center">
                    Raise Core Proficiency
                  </div>
                  <div className="flex items-end gap-2 justify-center">
                    <div className="text-3xl font-bold leading-none text-green-600">+10%</div>
                    <div className="text-sm text-muted-foreground">Nationwide</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground/90">
                    Increase the number of students earning ≥C in Math, English, and Science on BJC/BGCSE exams
                    from ~ 15% to at least <span className="font-medium text-foreground">25%</span> by 2031.
                  </p>
                </div>

                {/* Goal 2 */}
                <div className="rounded-xl border bg-card/50 p-5">
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-bold mb-1 text-center">
                    Improve Graduation Benchmarks
                  </div>
                  <div className="flex items-end gap-2 justify-center">
                    <div className="text-3xl font-bold leading-none text-green-600">→ 25%</div>
                    <div className="text-sm text-muted-foreground">of Students</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground/90">
                    Grow the # of students achieving ≥C in 5+ subjects from ~11–13% to
                    <span className="font-medium text-foreground"> 25%</span> by 2031 with Nesta tooling and insights.
                  </p>
                </div>
              </div>

              {/* Note about graduation requirements */}
              <div className="mt-6 rounded-xl border border-muted bg-muted/30 p-5">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-semibold text-muted-foreground">Note:</div>
                  <p className="text-sm text-muted-foreground/90 leading-relaxed">
                    The Bahamas' current high school graduation requirement is ≥D in 4 BJC exams; two of which must be Math & English. By establishing a higher bar for our impact goals, we give students a greater chance at not only graduating high school but doing so with an even higher proficiency rate.
                  </p>
                </div>
              </div>
            </div>

            {/* Panel B — The Nesta Roadmap */}
            <div className="rounded-2xl border bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">The Nesta Roadmap</h3>
                <span className="text-[11px] text-muted-foreground">What We're Building Next</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Teacher Portal & Insights */}
                <article className="rounded-xl border bg-card/50 p-5">
                  <h4 className="font-semibold mb-1">Teacher Portal &amp; Insights</h4>
                  <p className="text-sm text-muted-foreground/90">
                    Dashboards to track progress, surface misconceptions, and assign targeted practice sets.
                  </p>
                </article>

                {/* 2. Expanded Course Library */}
                <article className="rounded-xl border bg-card/50 p-5">
                  <h4 className="font-semibold mb-1">Expanded Course Library</h4>
                  <p className="text-sm text-muted-foreground/90">
                    Beyond Intro to AI: coding foundations, data literacy, study skills, and subject-specific boosters.
                  </p>
                </article>

                {/* 3. Offline & Low-Bandwidth Modes */}
                <article className="rounded-xl border bg-card/50 p-5">
                  <h4 className="font-semibold mb-1">Offline &amp; Low-Bandwidth Modes</h4>
                  <p className="text-sm text-muted-foreground/90">
                    Resilient access for students with limited connectivity—learning anywhere across the archipelago.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile First Section */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <MobileFirstBanner {...researchContent.mobileFirst} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
