"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface OutcomeCardProps {
  title: string;
  body: string;
}

export function OutcomeCard({ title, body }: OutcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-xl border bg-card group hover:shadow-lg transition-all hover:bg-card/80"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
      <p className="text-lg text-muted-foreground/90 leading-relaxed">
        {body}
      </p>
    </motion.div>
  );
}
