"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  features: string[];
}

export function FeatureCard({ title, subtitle, features }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-xl border bg-card hover:shadow-lg transition-all hover:bg-card/80"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-base text-muted-foreground/90 mb-6 leading-relaxed">
        {subtitle}
      </p>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground/90">
            <span className="text-primary mt-1">•</span>
            <span className="leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
