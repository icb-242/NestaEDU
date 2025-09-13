"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { researchContent } from "@/lib/researchContent";
import type { Callout } from "@/lib/researchContent";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

function CalloutCard({ callout, index }: { callout: Callout; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      className="rounded-lg border bg-card p-6"
    >
      <h3 className="text-lg font-semibold">{callout.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {callout.body}
      </p>
    </motion.div>
  );
}

export function InsightCallouts() {
  const callouts = [
    researchContent.callouts.polarization,
    researchContent.callouts.gender,
  ];

  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {callouts.map((callout, index) => (
            <CalloutCard
              key={callout.title}
              callout={callout}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}