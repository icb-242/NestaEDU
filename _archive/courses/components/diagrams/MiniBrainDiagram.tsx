"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface MiniBrainDiagramProps {
  className?: string;
  animated?: boolean;
  showNeurons?: boolean;
}

export function MiniBrainDiagram({ 
  className = "", 
  animated = true, 
  showNeurons = true 
}: MiniBrainDiagramProps) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    { id: 0, label: "Input", neurons: 4, color: "bg-blue-400" },
    { id: 1, label: "Hidden 1", neurons: 6, color: "bg-purple-400" },
    { id: 2, label: "Hidden 2", neurons: 4, color: "bg-purple-400" },
    { id: 3, label: "Output", neurons: 2, color: "bg-green-400" }
  ];

  return (
    <div className={`relative ${className}`}>
      <svg width="300" height="200" viewBox="0 0 300 200" className="w-full h-auto">
        {/* Background */}
        <rect width="300" height="200" fill="transparent" />
        
        {/* Neural network layers */}
        {layers.map((layer, layerIndex) => (
          <g key={layer.id}>
            {/* Layer label */}
            <motion.text
              x={50 + layerIndex * 60}
              y={20}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#374151"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: layerIndex * 0.2 }}
            >
              {layer.label}
            </motion.text>
            
            {/* Neurons in this layer */}
            {Array.from({ length: layer.neurons }).map((_, neuronIndex) => {
              const x = 50 + layerIndex * 60;
              const y = 40 + (neuronIndex * (120 / (layer.neurons - 1)));
              
              return (
                <motion.circle
                  key={neuronIndex}
                  cx={x}
                  cy={y}
                  r="8"
                  fill={layer.color}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onClick={() => setActiveLayer(layer.id)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.3,
                    delay: layerIndex * 0.1 + neuronIndex * 0.05,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              );
            })}
            
            {/* Connections to next layer */}
            {layerIndex < layers.length - 1 && showNeurons && (
              <>
                {Array.from({ length: layer.neurons }).map((_, fromIndex) => {
                  const fromX = 50 + layerIndex * 60;
                  const fromY = 40 + (fromIndex * (120 / (layer.neurons - 1)));
                  
                  return Array.from({ length: layers[layerIndex + 1].neurons }).map((_, toIndex) => {
                    const toX = 50 + (layerIndex + 1) * 60;
                    const toY = 40 + (toIndex * (120 / (layers[layerIndex + 1].neurons - 1)));
                    
                    return (
                      <motion.line
                        key={`${fromIndex}-${toIndex}`}
                        x1={fromX}
                        y1={fromY}
                        x2={toX}
                        y2={toY}
                        stroke="#D1D5DB"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: animated ? 1 : 0 }}
                        transition={{ 
                          duration: 0.5,
                          delay: layerIndex * 0.3 + fromIndex * 0.05 + toIndex * 0.02
                        }}
                      />
                    );
                  });
                })}
              </>
            )}
          </g>
        ))}
        
        {/* Data flow animation */}
        {animated && (
          <motion.circle
            r="3"
            fill="#F59E0B"
            initial={{ cx: 50, cy: 100 }}
            animate={{
              cx: [50, 110, 170, 230],
              cy: [100, 80, 120, 100]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </svg>
      
      {/* Layer description */}
      {activeLayer !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"
        >
          {activeLayer === 0 && "Input layer: Receives raw data (text, images, numbers)"}
          {activeLayer === 1 && "Hidden layer 1: Finds basic patterns and features"}
          {activeLayer === 2 && "Hidden layer 2: Combines patterns into complex relationships"}
          {activeLayer === 3 && "Output layer: Makes final predictions or decisions"}
        </motion.div>
      )}
    </div>
  );
}
