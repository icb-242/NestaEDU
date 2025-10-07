"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChartPlaygroundSlide } from "@/lib/course/types";

export function ChartPlaygroundSlideComponent({ slide, onComplete }: { slide: ChartPlaygroundSlide; onComplete?: () => void }) {
  const [sliderValue, setSliderValue] = useState(slide.initialData.samples);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Calculate accuracy based on sample size (simplified learning curve)
  const calculateAccuracy = (samples: number) => {
    const baseAccuracy = 0.6;
    const maxAccuracy = 0.95;
    const improvement = (maxAccuracy - baseAccuracy) * (1 - Math.exp(-samples / 1000));
    return Math.min(baseAccuracy + improvement, maxAccuracy);
  };

  const currentAccuracy = calculateAccuracy(sliderValue);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    if (!hasInteracted) {
      setHasInteracted(true);
      onComplete?.();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      {slide.content && <p className="text-muted-foreground">{slide.content}</p>}
      
      {/* Interactive Chart Area */}
      <div className="bg-card border rounded-lg p-8">
        <div className="space-y-6">
          {/* Chart Visualization */}
          <div className="h-64 flex items-end justify-center space-x-2 bg-gradient-to-t from-primary/5 to-transparent rounded-lg p-4">
            {/* Simple bar chart representation */}
            <div className="flex items-end space-x-1 h-full">
              {[100, 500, 1000, 2000, 5000, sliderValue].map((value, index) => {
                const height = Math.min((value / 10000) * 100, 100);
                const isCurrent = value === sliderValue;
                
                return (
                  <motion.div
                    key={index}
                    className={cn(
                      "w-8 rounded-t transition-all duration-300",
                      isCurrent 
                        ? "bg-primary" 
                        : value < sliderValue 
                        ? "bg-primary/60" 
                        : "bg-muted"
                    )}
                    style={{ height: `${height}%` }}
                    animate={{ 
                      backgroundColor: isCurrent ? "#3b82f6" : value < sliderValue ? "#3b82f6" : "#e5e7eb"
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Accuracy Display */}
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {Math.round(currentAccuracy * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>

          {/* Slider Control */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Number of Training Samples</label>
              <span className="text-sm text-muted-foreground">{sliderValue.toLocaleString()}</span>
            </div>
            
            <input
              type="range"
              min="10"
              max="10000"
              value={sliderValue}
              onChange={(e) => handleSliderChange(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(sliderValue / 10000) * 100}%, #e5e7eb ${(sliderValue / 10000) * 100}%, #e5e7eb 100%)`
              }}
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10</span>
              <span>10,000</span>
            </div>
          </div>

          {/* Explanation */}
          {slide.explain && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border border-primary/20 rounded-lg p-4"
            >
              <p className="text-sm text-muted-foreground">{slide.explain}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Interaction Status */}
      {hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ✓ Interactive exploration complete
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Add custom styles for the slider
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};



