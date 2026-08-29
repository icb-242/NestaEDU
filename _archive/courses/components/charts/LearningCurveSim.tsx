"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface LearningCurveSimProps {
  onComplete?: () => void;
}

export const LearningCurveSim = ({ onComplete }: LearningCurveSimProps) => {
  const [samples, setSamples] = useState(200);
  
  // Calculate accuracy based on logarithmic learning curve
  const calculateAccuracy = (n: number, maxAcc: number, learningRate: number) => {
    return maxAcc * (1 - Math.exp(-learningRate * n / 1000));
  };
  
  // Generate points for the curves
  const generatePoints = (maxSamples: number) => {
    const points = [];
    const step = maxSamples / 50; // 50 points for smooth curve
    
    for (let i = 10; i <= maxSamples; i += step) {
      const trainAcc = calculateAccuracy(i, 0.95, 3);
      const testAcc = calculateAccuracy(i, 0.85, 2.5);
      
      points.push({
        x: i,
        trainAcc,
        testAcc
      });
    }
    
    return points;
  };
  
  const points = generatePoints(samples);
  const currentTrainAcc = calculateAccuracy(samples, 0.95, 3);
  const currentTestAcc = calculateAccuracy(samples, 0.85, 2.5);
  
  // Convert data points to SVG path
  const createPath = (points: any[], type: 'train' | 'test') => {
    const width = 600;
    const height = 300;
    const padding = 40;
    
    const xScale = (x: number) => padding + ((x / 10000) * (width - 2 * padding));
    const yScale = (y: number) => height - padding - (y * (height - 2 * padding));
    
    const pathData = points.map((p, i) => {
      const x = xScale(p.x);
      const y = yScale(type === 'train' ? p.trainAcc : p.testAcc);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    return pathData;
  };
  
  const trainPath = createPath(points, 'train');
  const testPath = createPath(points, 'test');
  
  const showDiminishingLabel = samples > 7000;
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <svg width="100%" viewBox="0 0 600 300" className="overflow-visible">
          {/* Grid lines */}
          <g opacity="0.1">
            {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val, i) => (
              <line
                key={`grid-${i}`}
                x1="40"
                y1={260 - (val * 220)}
                x2="560"
                y2={260 - (val * 220)}
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
          </g>
          
          {/* Axes */}
          <line x1="40" y1="260" x2="560" y2="260" stroke="currentColor" strokeWidth="2" />
          <line x1="40" y1="260" x2="40" y2="40" stroke="currentColor" strokeWidth="2" />
          
          {/* Y-axis labels */}
          <g className="text-xs fill-current">
            {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val, i) => (
              <text
                key={`y-label-${i}`}
                x="30"
                y={265 - (val * 220)}
                textAnchor="end"
                className="fill-gray-600 dark:fill-gray-400"
              >
                {val.toFixed(1)}
              </text>
            ))}
          </g>
          
          {/* X-axis labels */}
          <g className="text-xs fill-current">
            {[0, 2500, 5000, 7500, 10000].map((val, i) => (
              <text
                key={`x-label-${i}`}
                x={40 + (i * 130)}
                y="280"
                textAnchor="middle"
                className="fill-gray-600 dark:fill-gray-400"
              >
                {val}
              </text>
            ))}
          </g>
          
          {/* Axis titles */}
          <text
            x="15"
            y="150"
            transform="rotate(-90, 15, 150)"
            textAnchor="middle"
            className="text-sm font-semibold fill-gray-700 dark:fill-gray-300"
          >
            Accuracy (0–1)
          </text>
          <text
            x="300"
            y="295"
            textAnchor="middle"
            className="text-sm font-semibold fill-gray-700 dark:fill-gray-300"
          >
            Number of Training Examples
          </text>
          
          {/* Training accuracy curve (blue) */}
          <motion.path
            d={trainPath}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          
          {/* Test accuracy curve (green) */}
          <motion.path
            d={testPath}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          />
          
          {/* Current point markers */}
          <motion.circle
            cx={40 + ((samples / 10000) * 520)}
            cy={260 - (currentTrainAcc * 220)}
            r="5"
            fill="#3B82F6"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
          />
          <motion.circle
            cx={40 + ((samples / 10000) * 520)}
            cy={260 - (currentTestAcc * 220)}
            r="5"
            fill="#10B981"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1, delay: 0.3 }}
          />
          
          {/* Diminishing returns label */}
          {showDiminishingLabel && (
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <rect
                x="420"
                y="60"
                width="130"
                height="40"
                rx="8"
                fill="#FEF3C7"
                stroke="#F59E0B"
                strokeWidth="2"
              />
              <text
                x="485"
                y="78"
                textAnchor="middle"
                className="text-xs font-semibold fill-amber-800"
              >
                More data,
              </text>
              <text
                x="485"
                y="92"
                textAnchor="middle"
                className="text-xs font-semibold fill-amber-800"
              >
                smaller gains
              </text>
            </motion.g>
          )}
          
          {/* Legend */}
          <g>
            <line x1="450" y1="180" x2="480" y2="180" stroke="#3B82F6" strokeWidth="3" />
            <text x="485" y="185" className="text-xs fill-gray-700 dark:fill-gray-300">
              Training Accuracy
            </text>
            
            <line x1="450" y1="200" x2="480" y2="200" stroke="#10B981" strokeWidth="3" />
            <text x="485" y="205" className="text-xs fill-gray-700 dark:fill-gray-300">
              Test Accuracy
            </text>
          </g>
        </svg>
      </div>
      
      {/* Controls */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Dataset Size: <span className="text-blue-600 dark:text-blue-400">{samples.toLocaleString()}</span> examples
          </label>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Train: {(currentTrainAcc * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Test: {(currentTestAcc * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
        
        <Slider
          value={[samples]}
          onValueChange={(value) => setSamples(value[0])}
          min={10}
          max={10000}
          step={100}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>10 examples</span>
          <span>10,000 examples</span>
        </div>
        
        <p className="text-xs text-center text-gray-600 dark:text-gray-400 italic mt-4">
          💡 Notice how accuracy improves quickly at first, then slows down. More data helps, but with diminishing returns!
        </p>
      </div>
      
      {onComplete && (
        <button
          onClick={onComplete}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Continue
        </button>
      )}
    </div>
  );
};
