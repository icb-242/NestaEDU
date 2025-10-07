"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  title: string;
  body: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-12 relative">
      {/* Vertical line */}
      <div className="absolute top-0 bottom-0 left-[21px] w-px bg-border" />
      
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-8"
        >
          {/* Circle on timeline */}
          <div className="relative">
            <div className="w-[11px] h-[11px] rounded-full bg-primary mt-2" />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-muted-foreground/90 leading-relaxed">
              {item.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
