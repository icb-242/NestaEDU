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

export function OutcomeTiles() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {researchContent.outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="rounded-lg border bg-card p-6"
            >
              <h3 className="text-lg font-semibold">{outcome.title}</h3>
              <p className="mt-2 text-muted-foreground">{outcome.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}