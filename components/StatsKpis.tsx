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
  // Remove BJC/BGCSE prefix from the label and handle special case for "# of Candidates"
  const cleanLabel = kpi.label.includes("# of Candidates") ? "# of Candidates" : kpi.label.replace(/^(BJC|BGCSE)\s+/, '');
  
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
          className="text-xl font-bold tracking-tight"
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
  
  // Debug logging
  console.log("BGCSE KPIs:", bgcseKpis);
  console.log("BJC KPIs:", bjcKpis);

  return (
    <section id="about" className="pt-0 pb-12 scroll-mt-16">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-lg font-bold tracking-tight">
            Bahamian Education By The Numbers
          </h2>
        </div>
        
        <div className="flex">
          {/* Year and Brace */}
          <div className="flex gap-4">
            <div className="flex items-center">
              <span className="text-xl font-bold">2024</span>
              <div className="relative w-8 h-[140px] mx-4 ml-4">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-foreground"></div>
                {/* Top horizontal */}
                <div className="absolute top-0 left-4 w-[16px] h-[2px] bg-foreground"></div>
                {/* Bottom horizontal */}
                <div className="absolute bottom-0 left-4 w-[16px] h-[2px] bg-foreground"></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex-1">
              {/* BGCSE Row */}
              <div className="mb-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-14 -ml-2">
                    <h3 className="text-lg font-bold">BGCSE</h3>
                  </div>
                  <div className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ml-12">
                    {bgcseKpis.map((kpi, index) => {
                      console.log("Rendering BGCSE KPI:", kpi);
                      return <KpiCard key={kpi.label} kpi={kpi} index={index} />;
                    })}
                  </div>
                </div>
              </div>

              {/* BJC Row */}
              <div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-14 -ml-2">
                    <h3 className="text-lg font-bold">BJC</h3>
                  </div>
                  <div className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ml-12">
                    {bjcKpis.map((kpi, index) => (
                      <KpiCard key={kpi.label} kpi={kpi} index={index + 3} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}