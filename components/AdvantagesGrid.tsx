"use client";

import { advantages } from "@/lib/advantages";
import { Smartphone, Cpu, BookOpen, CheckCircle2, Lock } from "lucide-react";
import React from "react";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Smartphone,
  Cpu,
  BookOpen,
  CheckCircle2,
  Lock,
};

export function AdvantagesGrid() {
  return (
    <section
      id="advantages"
      aria-labelledby="advantages-heading"
      className="container mx-auto max-w-5xl px-4 md:px-6 py-14 md:py-20"
    >
      <h2
        id="advantages-heading"
        className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 text-center"
      >
        Why Nesta?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 justify-items-center">
        {advantages.map((item) => {
          const Icon = iconMap[item.icon] ?? Smartphone;
          return (
            <article
              key={item.key}
              className="w-full max-w-md rounded-2xl border p-6 md:p-7 shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-accent/60"
              aria-label={item.title}
            >
              <div className="h-10 w-10 mb-4">
                <Icon aria-hidden="true" className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.body}</p>
              <a
                href="#about"
                className="sr-only focus:not-sr-only focus:outline-none"
              >
                Learn more about our approach
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
