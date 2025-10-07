"use client";

import { motion } from "framer-motion";

interface CalloutCardProps {
  title: string;
  body: string;
}

export function CalloutCard({ title, body }: CalloutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl border bg-card"
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground" style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}>
        {body}
      </p>
    </motion.div>
  );
}
