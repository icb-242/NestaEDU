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
import { FeatureCard } from "@/components/plan/FeatureCard";
import { StickyNav } from "@/components/plan/StickyNav";

export default function MasterPlanPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(
        document.querySelectorAll("h1[id], h2[id]")
      );
      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom > 200;
      });
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tocItems = [
    { id: "reality", label: "Today's Reality" },
    { id: "plan", label: "Our Plan" },
    { id: "next", label: "What's Next" },
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
                <Image
                  src="/images/brand/nesta education 1-3.png"
                  alt="Nesta Logo"
                  fill
                  className="object-contain dark:opacity-0 dark:scale-0 transition-all duration-300"
                  sizes="96px"
                />
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

          <div className="absolute top-4 right-4">
            <ThemeToggleButton />
          </div>
        </div>

        <div className="border-t border-b">
          <StickyNav items={tocItems} activeSection={activeSection} />
        </div>
      </header>

      <main className="pt-32">
        {/* ── Section 1: Today's Reality ── */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-12"
          >
            <h1
              id="reality"
              className="text-4xl font-bold tracking-tight mb-6 scroll-mt-[160px]"
            >
              Today&apos;s Reality
            </h1>
          </motion.div>

          <StatsKpis />

          {/* Explainer — context the hero line no longer carries */}
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-12">
            <p className="text-base text-muted-foreground/90 leading-relaxed max-w-3xl mx-auto text-center">
              Every year, roughly 16,000 students sit BJC and BGCSE exams. Over
              the past decade the share earning a C or better in Math, English
              and a science has stayed between 7 and 12 percent. It fell sharply
              in 2020 and returned to where it had been. The bar hasn&apos;t
              moved in eleven years.
            </p>
          </div>

          <ExamTrendsChart />
        </section>

        {/* ── Section 2: Our Plan ── */}
        <section className="py-20 bg-muted/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-16"
          >
            <h2
              id="plan"
              className="text-4xl font-bold tracking-tight mb-8 scroll-mt-[160px]"
            >
              Our Plan
            </h2>
            <p className="text-base text-muted-foreground/90 leading-relaxed">
              {masterPlanContent.how.intro}
            </p>
          </motion.div>

          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {masterPlanContent.how.items.map((item) => (
                <FeatureCard
                  key={item.title}
                  title={item.title}
                  subtitle={item.subtitle}
                  features={item.features}
                  cta={item.cta}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: What's Next ── */}
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-12"
          >
            <h2
              id="next"
              className="text-3xl font-bold tracking-tight mb-4 scroll-mt-[160px]"
            >
              What&apos;s Next
            </h2>
            <p className="text-base text-muted-foreground/90 leading-relaxed">
              {masterPlanContent.furtherAhead.intro}
            </p>
          </motion.div>

          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {masterPlanContent.furtherAhead.roadmap.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border bg-card/50 p-5"
                >
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground/90">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            {/* Mobile line */}
            <p className="mt-10 text-sm text-muted-foreground text-center">
              {researchContent.mobileFirst.body}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
