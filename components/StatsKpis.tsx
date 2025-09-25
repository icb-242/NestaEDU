"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { researchContent } from "@/lib/researchContent";
import type { Kpi } from "@/lib/researchContent";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

// Simple display of numbers without animation

function getTrendColor(sub: string): string {
  if (!sub) return "text-muted-foreground";
  
  // Check for positive trends (↑)
  if (sub.includes("↑")) {
    return "text-green-600";
  }
  
  // Check for negative trends (↓)
  if (sub.includes("↓")) {
    return "text-red-600";
  }
  
  // Check for percentage values less than 20%
  const percentageMatch = sub.match(/(\d+(?:\.\d+)?)%/);
  if (percentageMatch) {
    const percentage = parseFloat(percentageMatch[1]);
    if (percentage < 20) {
      return "text-red-600";
    }
  }
  
  return "text-muted-foreground";
}

function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  // Remove BJC/BGCSE prefix from the label
  const cleanLabel = kpi.label.replace(/^(BJC|BGCSE)\s+/, '');
  
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      className="rounded-lg border bg-card p-6"
    >
      <div className="space-y-2 text-center">
        <h3 className="text-sm font-medium text-muted-foreground">
          {cleanLabel}
        </h3>
        <p 
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
        >
          {kpi.value}
        </p>
        {kpi.sub && (
          <p 
            className={`text-base ${getTrendColor(kpi.sub)}`}
            style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}
          >
            {kpi.sub}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function StatsKpis() {
  // Separate BGCSE and BJC statistics
  const bgcseKpis = researchContent.kpis.filter(kpi => kpi.label.includes("BGCSE"));
  const bjcKpis = researchContent.kpis.filter(kpi => kpi.label.includes("BJC"));

  return (
    <section id="about" className="py-20 scroll-mt-16">
      <Container>
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Bahamian Education By The Numbers
          </h2>
        </div>
        
        {/* BGCSE Row */}
        <div className="mb-8">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 w-20">
              <h3 className="text-2xl font-bold text-center">BGCSE</h3>
            </div>
            <div className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bgcseKpis.map((kpi, index) => (
                <KpiCard key={kpi.label} kpi={kpi} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* BJC Row */}
        <div>
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 w-20">
              <h3 className="text-2xl font-bold text-center">BJC</h3>
            </div>
            <div className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bjcKpis.map((kpi, index) => (
                <KpiCard key={kpi.label} kpi={kpi} index={index + 3} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}