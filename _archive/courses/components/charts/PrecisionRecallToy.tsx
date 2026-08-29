"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PrecisionRecallToyProps {
  onComplete?: () => void;
}

export const PrecisionRecallToy = ({ onComplete }: PrecisionRecallToyProps) => {
  const [threshold, setThreshold] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Calculate precision and recall based on threshold
  // Lower threshold = higher recall, lower precision
  // Higher threshold = lower recall, higher precision
  const calculateMetrics = (t: number) => {
    const normalizedT = t / 100;
    
    // Recall decreases as threshold increases (miss more positives)
    const recall = 0.95 - (normalizedT * 0.6); // 0.95 at t=0, 0.35 at t=100
    
    // Precision increases as threshold increases (fewer false positives)
    const precision = 0.45 + (normalizedT * 0.5); // 0.45 at t=0, 0.95 at t=100
    
    return {
      precision: Math.max(0, Math.min(1, precision)),
      recall: Math.max(0, Math.min(1, recall))
    };
  };
  
  const { precision, recall } = calculateMetrics(threshold);
  
  const handleSliderChange = (value: number) => {
    setThreshold(value);
    if (!hasInteracted) {
      setHasInteracted(true);
      onComplete?.();
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <div className="flex items-end justify-center gap-8 h-80">
          {/* Precision Bar */}
          <div className="flex flex-col items-center space-y-3">
            <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Precision
            </div>
            <div className="relative w-24 h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <motion.div
                className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg"
                initial={{ height: "50%" }}
                animate={{ height: `${precision * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {(precision * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-center text-gray-600 dark:text-gray-400 max-w-[120px]">
              Of flagged items,<br/>how many are correct?
            </div>
          </div>
          
          {/* Recall Bar */}
          <div className="flex flex-col items-center space-y-3">
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">
              Recall
            </div>
            <div className="relative w-24 h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <motion.div
                className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg"
                initial={{ height: "50%" }}
                animate={{ height: `${recall * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {(recall * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-center text-gray-600 dark:text-gray-400 max-w-[120px]">
              Of all true positives,<br/>how many did we catch?
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-950 dark:to-green-950 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Decision Threshold: <span className="text-purple-600 dark:text-purple-400">{threshold}%</span>
          </label>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {threshold < 40 && "🎯 High Recall (catch more, more false alarms)"}
            {threshold >= 40 && threshold <= 60 && "⚖️ Balanced"}
            {threshold > 60 && "🔍 High Precision (fewer false alarms, miss more)"}
          </div>
        </div>
        
        <input
          type="range"
          min={0}
          max={100}
          value={threshold}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              #10B981 0%, 
              #8B5CF6 ${threshold}%, 
              #D1D5DB ${threshold}%, 
              #D1D5DB 100%)`
          }}
        />
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Low (catch more)</span>
          <span>High (be more selective)</span>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            <strong>The Trade-off:</strong> Lower threshold = more positives caught (↑ recall) but more false alarms (↓ precision). 
            Higher threshold = fewer false alarms (↑ precision) but more misses (↓ recall).
          </p>
        </div>
      </div>
      
      {hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ✓ Explored the precision-recall trade-off
          </div>
        </motion.div>
      )}
    </div>
  );
};

