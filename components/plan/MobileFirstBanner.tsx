"use client";

import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";

interface MobileFirstBannerProps {
  title: string;
  body: string;
}

export function MobileFirstBanner({ title, body }: MobileFirstBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-xl border bg-card/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-4">
        <Smartphone className="h-8 w-8" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-base text-muted-foreground/90 leading-relaxed">
        {body}
      </p>
    </motion.div>
  );
}
