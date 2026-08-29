"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface PatternFinderProps {
  className?: string;
  pattern?: "dots" | "lines" | "spiral";
  animated?: boolean;
}

export function PatternFinder({ 
  className = "", 
  pattern = "dots", 
  animated = true 
}: PatternFinderProps) {
  const [currentPattern, setCurrentPattern] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const patterns = {
    dots: [
      "●", "●", "●", "○", "●", "●", "●", "○", "●", "●", "●", "○"
    ],
    lines: [
      "─", "─", "─", "│", "─", "─", "─", "│", "─", "─", "─", "│"
    ],
    spiral: [
      "↗", "→", "↘", "↓", "↙", "←", "↖", "↑", "↗", "→", "↘", "↓"
    ]
  };

  useEffect(() => {
    if (animated) {
      setIsAnimating(true);
      const interval = setInterval(() => {
        setCurrentPattern(prev => {
          const newPattern = [...prev];
          if (newPattern.length < patterns[pattern].length) {
            newPattern.push(patterns[pattern][newPattern.length]);
          } else {
            clearInterval(interval);
            setIsAnimating(false);
          }
          return newPattern;
        });
      }, 200);
      
      return () => clearInterval(interval);
    } else {
      setCurrentPattern(patterns[pattern]);
    }
  }, [pattern, animated]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg">
        {patterns[pattern].map((symbol, index) => (
          <motion.div
            key={index}
            className="w-8 h-8 flex items-center justify-center text-2xl font-bold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: currentPattern.includes(symbol) ? 1 : 0.3,
              scale: currentPattern.includes(symbol) ? 1 : 0.8
            }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
      
      {isAnimating && (
        <motion.div
          className="ml-4 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Finding pattern...
        </motion.div>
      )}
      
      {!isAnimating && currentPattern.length === patterns[pattern].length && (
        <motion.div
          className="ml-4 text-sm text-green-600 font-medium"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Pattern found! Every 4th item is different.
        </motion.div>
      )}
    </div>
  );
}
