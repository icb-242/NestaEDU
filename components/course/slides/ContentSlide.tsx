"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { ContentSlide } from "@/lib/course/types";

export function ContentSlideComponent({ slide, onComplete }: { slide: ContentSlide; onComplete?: () => void }) {
  // Auto-advance after 5 seconds for content slides
  useEffect(() => {
    if (slide.requiresCompletion) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [slide.requiresCompletion, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-gray-900 dark:text-gray-100"
      >
        {slide.heading}
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="prose prose-lg dark:prose-invert max-w-none"
      >
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {slide.content}
        </p>
      </motion.div>
    </motion.div>
  );
}
