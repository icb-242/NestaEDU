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

function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      className="rounded-lg border bg-card p-6"
    >
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {kpi.label}
        </h3>
        <p className="text-3xl font-bold tracking-tight">
          {kpi.value}
        </p>
        {kpi.sub && (
          <p className="text-sm text-muted-foreground">
            {kpi.sub}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function StatsKpis() {
  return (
    <section id="about" className="py-20 scroll-mt-16">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchContent.kpis.map((kpi, index) => (
            <KpiCard key={kpi.label} kpi={kpi} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}