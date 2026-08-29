"use client";

import { motion } from "framer-motion";
import { latest, rate, heroStats } from "@/lib/examData";

const BJC_RAMP = ["#b5d4f4", "#378add", "#185fa5"];
const BGCSE_RAMP = ["#f5c4b3", "#d85a30", "#993c1d"];

type WaffleStats = {
  title: string;
  registered: number;
  satFive: number;
  passed: number;
  satPct: number;
  passPct: number;
  ramp: string[];
};

function buildStats(
  title: string,
  candidates: number | null,
  satFivePlus: number | undefined,
  mathEngSci: number | null,
  ramp: string[]
): WaffleStats {
  const registered = candidates ?? 0;
  const satFive = satFivePlus ?? 0;
  const passed = mathEngSci ?? 0;
  const satPct = registered > 0 ? Math.round((satFive / registered) * 100) : 0;
  const passRate = rate(mathEngSci, candidates);
  const passPct = passRate != null ? Math.round(passRate) : 0;
  return { title, registered, satFive, passed, satPct, passPct, ramp };
}

function WaffleGrid({ stats }: { stats: WaffleStats }) {
  const [restColor, satColor, passColor] = stats.ramp;
  const satMissed = Math.max(stats.satPct - stats.passPct, 0);
  const rest = Math.max(100 - stats.satPct, 0);

  const cells = Array.from({ length: 100 }, (_, i) => {
    if (i < stats.passPct) return passColor;
    if (i < stats.satPct) return satColor;
    return restColor;
  });

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">{stats.title}</h4>
      <div
        role="img"
        aria-label={`${stats.title}: ${stats.passPct} of 100 registered students earned a C or better in Math, English and a science. ${stats.satPct} sat five or more subjects.`}
        className="grid w-full max-w-[220px] gap-[3px] [grid-template-columns:repeat(10,minmax(0,1fr))]"
      >
        {cells.map((fill, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: i * 0.006 }}
            className="aspect-square rounded-[2px]"
            style={{ backgroundColor: fill }}
          />
        ))}
      </div>
      <ul className="space-y-1 text-xs text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>
        <li className="flex items-start gap-2">
          <span
            className="mt-0.5 h-3 w-3 shrink-0 rounded-[2px]"
            style={{ backgroundColor: passColor }}
            aria-hidden
          />
          <span>
            {stats.passPct} of 100 — {stats.passed.toLocaleString()} with ≥C in
            Math, English and a science
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span
            className="mt-0.5 h-3 w-3 shrink-0 rounded-[2px]"
            style={{ backgroundColor: satColor }}
            aria-hidden
          />
          <span>
            {satMissed} of 100 — sat five or more subjects, missed the bar
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span
            className="mt-0.5 h-3 w-3 shrink-0 rounded-[2px]"
            style={{ backgroundColor: restColor }}
            aria-hidden
          />
          <span>
            {rest} of 100 — registered, never sat five subjects
          </span>
        </li>
      </ul>
    </div>
  );
}

export function StatsKpis() {
  const hero = heroStats();
  const bjc = buildStats(
    `BJC ${latest.year}`,
    latest.bjc.candidates,
    latest.bjc.satFivePlus,
    latest.bjc.mathEngSci,
    BJC_RAMP
  );
  const bgcse = buildStats(
    `BGCSE ${latest.year}`,
    latest.bgcse.candidates,
    latest.bgcse.satFivePlus,
    latest.bgcse.mathEngSci,
    BGCSE_RAMP
  );

  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-0 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-snug max-w-4xl font-medium tracking-tight">
          In {hero.year},{" "}
          <span className="font-bold">
            {hero.candidates.toLocaleString()}
          </span>{" "}
          students sat BJC and BGCSE exams. Just{" "}
          <span className="font-bold">{hero.passed.toLocaleString()}</span>{" "}
          earned a C or better in Math, English and a science.{" "}
          <span className="font-bold">
            {hero.rate < 10
              ? "Under ten percent."
              : `${Math.round(hero.rate)} percent.`}
          </span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-2">
        <WaffleGrid stats={bjc} />
        <WaffleGrid stats={bgcse} />
      </div>
    </section>
  );
}
