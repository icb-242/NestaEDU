"use client";

import { motion } from "framer-motion";
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
      className="w-full h-full rounded-lg border bg-card p-6"
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
  
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-0 pb-12 scroll-mt-16">
      <div className="mb-12 text-center">
        <h2 className="text-lg font-bold tracking-tight">
          2024 Performance By The Numbers
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6">
        {/* LEFT RAIL (labels only) */}
        <div className="relative hidden lg:block h-full">
          {/* BGCSE label */}
          <div className="absolute right-6 top-[60px]">
            <span className="text-lg font-bold tracking-tight">BGCSE</span>
          </div>

          {/* BJC label */}
          <div className="absolute right-6 bottom-[60px]">
            <span className="text-lg font-bold tracking-tight">BJC</span>
          </div>
        </div>

        {/* RIGHT: stats grid */}
        <div className="w-full">
          {/* Top row (BGCSE) */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-bold mb-4 lg:hidden">BGCSE</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {bgcseKpis.map((kpi, index) => (
                <KpiCard key={kpi.label} kpi={kpi} index={index} />
              ))}
            </div>
          </div>

          {/* Bottom row (BJC) */}
          <div>
            <h3 className="text-lg font-bold mb-4 lg:hidden">BJC</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bjcKpis.map((kpi, index) => (
                <KpiCard key={kpi.label} kpi={kpi} index={index + 3} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}