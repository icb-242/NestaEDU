"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  features: string[];
  cta?: { label: string; href: string };
}

export function FeatureCard({ title, subtitle, features, cta }: FeatureCardProps) {
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
            <span className="text-primary mt-1">&bull;</span>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <Link
          href={cta.href}
          className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
        >
          {cta.label}
        </Link>
      )}
    </motion.div>
  );
}
