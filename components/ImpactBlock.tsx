"use client";

import { motion } from "framer-motion";
import { Container } from "./ui/Container";
import { researchContent } from "@/lib/researchContent";

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

export function ImpactBlock() {
  const { impactBlock } = researchContent;

  return (
    <section className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-12">
            {impactBlock.title}
          </h2>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2" />

            <div className="space-y-12">
              {impactBlock.steps.map((step, index) => (
                <motion.div
                  key={step.label}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  className="relative grid gap-8 md:grid-cols-2"
                >
                  <div className={index % 2 ? "md:col-start-2" : ""}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{step.label}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="mt-12 text-center text-muted-foreground">
            {impactBlock.blurb}
          </p>
        </div>
      </Container>
    </section>
  );
}