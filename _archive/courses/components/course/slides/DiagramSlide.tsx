"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DiagramSlide } from "@/lib/course/types";
import { TrainingVsInferenceDiagram, FeatureSpaceClusters, AIVisionGlasses } from "@/components/diagrams";

export function DiagramSlideComponent({ slide, onComplete }: { slide: DiagramSlide; onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  
  // Check if this is the AI feedback loop slide
  const isCircularLoop = slide.heading === "How AI Learns Over Time" || slide.heading === "How Netflix's AI Feedback Loop Works";

  const handleNextStep = () => {
    if (currentStep < slide.steps.length - 1) {
      setCompletedSteps(prev => new Set(Array.from(prev).concat(currentStep)));
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step completed
      setCompletedSteps(prev => new Set(Array.from(prev).concat(currentStep)));
      onComplete?.();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (completedSteps.has(stepIndex - 1) || stepIndex === 0) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      {slide.content && <p className="text-muted-foreground">{slide.content}</p>}
      
      {/* Diagram Visualization */}
      <div className="bg-card border rounded-lg p-8 min-h-[300px] flex items-center justify-center">
        <div className="w-full">
          {isCircularLoop ? (
            /* Netflix Feedback Loop - Module 1 */
            /* Perfect Square Layout with Lines Through Nodes */
            <div className="relative w-full max-w-4xl mx-auto">
              {/* Square Network Visualization */}
              <div className="relative">
                <svg className="w-full h-96" viewBox="0 0 500 500">
                  {/* Background connections that go through the nodes */}
                  {slide.steps.map((_, index) => {
                    const nextIndex = (index + 1) % slide.steps.length;
                    const positions = [
                      { x: 250, y: 150 }, // Data - Top
                      { x: 350, y: 250 }, // Pattern - Right
                      { x: 250, y: 350 }, // Prediction - Bottom
                      { x: 150, y: 250 }  // Feedback - Left
                    ];
                    
                    const start = positions[index];
                    const end = positions[nextIndex];
                    
                    return (
                      <motion.line
                        key={`connection-${index}`}
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                        stroke={completedSteps.has(index) ? "#10b981" : "#e5e7eb"}
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ 
                          pathLength: completedSteps.has(index) ? 1 : 0.3,
                          opacity: completedSteps.has(index) ? 1 : 0.4
                        }}
                        transition={{ duration: 1, delay: index * 0.3 }}
                      />
                    );
                  })}
                  
                  {/* Node circles in SVG so lines go through them */}
                  {slide.steps.map((step, index) => {
                    const positions = [
                      { x: 250, y: 150, label: "Data" },     // Top
                      { x: 350, y: 250, label: "Pattern" },  // Right
                      { x: 250, y: 350, label: "Prediction" }, // Bottom
                      { x: 150, y: 250, label: "Feedback" }   // Left
                    ];
                    
                    const pos = positions[index];
                    
                    return (
                      <motion.circle
                        key={`node-${index}`}
                        cx={pos.x}
                        cy={pos.y}
                        r="32"
                        fill={currentStep === index 
                          ? "#3b82f6" 
                          : completedSteps.has(index) 
                          ? "#10b981" 
                          : "#ffffff"
                        }
                        stroke={currentStep === index 
                          ? "#3b82f6" 
                          : completedSteps.has(index) 
                          ? "#10b981" 
                          : "#d1d5db"
                        }
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => handleStepClick(index)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: currentStep >= index ? 1 : 0.3,
                          scale: currentStep === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      />
                    );
                  })}
                  
                  {/* Node numbers/text in SVG */}
                  {slide.steps.map((step, index) => {
                    const positions = [
                      { x: 250, y: 150, label: "Data" },     // Top
                      { x: 350, y: 250, label: "Pattern" },  // Right
                      { x: 250, y: 350, label: "Prediction" }, // Bottom
                      { x: 150, y: 250, label: "Feedback" }   // Left
                    ];
                    
                    const pos = positions[index];
                    
                    return (
                      <motion.text
                        key={`text-${index}`}
                        x={pos.x}
                        y={pos.y + 5}
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                        fill={currentStep === index || completedSteps.has(index) ? "#ffffff" : "#374151"}
                        fontSize="16"
                        fontWeight="bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentStep >= index ? 1 : 0.3 }}
                        transition={{ duration: 0.5 }}
                      >
                        {completedSteps.has(index) ? "✓" : index + 1}
                      </motion.text>
                    );
                  })}
                </svg>
                
                {/* Labels positioned exactly next to their nodes */}
                {/* Data label - ABOVE node 1 at (250, 150) */}
                <motion.div
                  className="absolute"
                  style={{ 
                    left: "50%",
                    top: "24%",
                    transform: "translate(-50%, -50%)"
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: currentStep >= 0 ? 1 : 0.3,
                    scale: 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="font-semibold text-lg text-gray-800">Data</div>
                </motion.div>

                {/* Pattern label - TO THE RIGHT of node 2 at (350, 250) */}
                <motion.div
                  className="absolute"
                  style={{ 
                    left: "76%",
                    top: "50%",
                    transform: "translate(0, -50%)"
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: currentStep >= 1 ? 1 : 0.3,
                    scale: 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="font-semibold text-lg text-gray-800">Pattern</div>
                </motion.div>

                {/* Prediction label - BELOW node 3 at (250, 350) */}
                <motion.div
                  className="absolute"
                  style={{ 
                    left: "50%",
                    top: "76%",
                    transform: "translate(-50%, -50%)"
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: currentStep >= 2 ? 1 : 0.3,
                    scale: 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="font-semibold text-lg text-gray-800">Prediction</div>
                </motion.div>

                {/* Feedback label - TO THE LEFT of node 4 at (150, 250) */}
                <motion.div
                  className="absolute"
                  style={{ 
                    left: "24%",
                    top: "50%",
                    transform: "translate(-100%, -50%)"
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: currentStep >= 3 ? 1 : 0.3,
                    scale: 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="font-semibold text-lg text-gray-800">Feedback</div>
                </motion.div>
              </div>
              
              {/* Progress Indicator */}
              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="text-sm text-gray-600">Learning Progress:</div>
                <div className="flex space-x-1">
                  {slide.steps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "w-3 h-3 rounded-full",
                        completedSteps.has(index) ? "bg-green-500" : "bg-gray-300"
                      )}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {completedSteps.size}/{slide.steps.length}
                </div>
              </div>
            </div>
          ) : slide.asset?.src === "TrainingVsInferenceDiagram" ? (
            /* Training vs Inference Component */
            <TrainingVsInferenceDiagram currentStep={currentStep} />
          ) : slide.asset?.src === "FeatureSpaceClusters" ? (
            /* Feature Space Clusters Component */
            <FeatureSpaceClusters />
          ) : slide.asset?.src === "AIVisionGlasses" ? (
            /* AI Vision Glasses Component */
            <AIVisionGlasses />
          ) : slide.asset ? (
            /* Custom Asset Image */
            <div className="w-full flex justify-center">
              <img 
                src={slide.asset.src} 
                alt={slide.asset.alt}
                className="w-full max-w-4xl h-auto"
              />
            </div>
          ) : (
            /* Linear Layout - Enhanced Visual */
            <div className="relative py-8">
              {/* Flowing Path Line */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={`M 80 60 Q 200 40, 320 60 T 560 60 T 800 60`}
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>

              {/* Step Cards */}
              <div className="relative flex items-center justify-between px-4" style={{ zIndex: 1 }}>
                {slide.steps.map((step, index) => {
                  const colors = [
                    { bg: "from-blue-500 to-blue-600", ring: "ring-blue-200", text: "text-blue-600" },
                    { bg: "from-purple-500 to-purple-600", ring: "ring-purple-200", text: "text-purple-600" },
                    { bg: "from-indigo-500 to-indigo-600", ring: "ring-indigo-200", text: "text-indigo-600" },
                    { bg: "from-green-500 to-green-600", ring: "ring-green-200", text: "text-green-600" }
                  ];
                  const color = colors[index];
                  const isActive = currentStep === index;
                  const isCompleted = completedSteps.has(index);
                  
                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <motion.button
                        className="flex flex-col items-center space-y-3 cursor-pointer group relative"
                        onClick={() => handleStepClick(index)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -5 }}
                      >
                        {/* Glow Effect */}
                        {isActive && (
                          <motion.div
                            className={cn("absolute inset-0 rounded-full blur-xl opacity-50", `bg-gradient-to-r ${color.bg}`)}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}

                        {/* Icon Container */}
                        <motion.div
                          className={cn(
                            "relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-all",
                            isActive
                              ? `bg-gradient-to-br ${color.bg} ring-4 ${color.ring} shadow-xl`
                              : isCompleted
                              ? `bg-gradient-to-br ${color.bg} opacity-90`
                              : "bg-white border-2 border-gray-200"
                          )}
                          animate={{
                            scale: isActive ? 1.1 : 1,
                            rotateY: isActive ? [0, 5, -5, 0] : 0
                          }}
                          transition={{
                            scale: { duration: 0.3 },
                            rotateY: { duration: 2, repeat: isActive ? Infinity : 0 }
                          }}
                        >
                          {/* Step Number or Checkmark */}
                          <div className={cn(
                            "text-2xl font-bold",
                            isActive || isCompleted ? "text-white" : color.text
                          )}>
                            {isCompleted ? "✓" : index + 1}
                          </div>
                          
                          {/* Particle effect for active step */}
                          {isActive && (
                            <>
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-1 h-1 bg-white rounded-full"
                                  initial={{ opacity: 0, x: 0, y: 0 }}
                                  animate={{
                                    opacity: [0, 1, 0],
                                    x: [0, (i - 1) * 20],
                                    y: [0, -30 + i * 10],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                  }}
                                />
                              ))}
                            </>
                          )}
                        </motion.div>

                        {/* Step Label with Background */}
                        <motion.div
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all text-center min-w-[80px]",
                            isActive
                              ? `${color.text} bg-white shadow-md`
                              : isCompleted
                              ? "text-gray-700 bg-gray-100"
                              : "text-gray-500 bg-gray-50"
                          )}
                          animate={{
                            scale: isActive ? 1.05 : 1
                          }}
                        >
                          {step.label}
                        </motion.div>
                      </motion.button>
                      
                      {/* Animated Arrow between steps */}
                      {index < slide.steps.length - 1 && (
                        <div className="flex-1 flex justify-center items-center px-2">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: completedSteps.has(index) ? 1 : 0.3,
                              x: 0
                            }}
                            transition={{ delay: index * 0.2 }}
                          >
                            <motion.div
                              animate={{
                                x: [0, 5, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <ChevronRight 
                                className={cn(
                                  "h-6 w-6",
                                  completedSteps.has(index) ? color.text : "text-muted-foreground/30"
                                )} 
                              />
                            </motion.div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Step Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-primary/5 border border-primary/20 rounded-lg p-4"
        >
          <div className="text-center">
            <h4 className="font-semibold text-primary mb-2">
              Step {currentStep + 1}: {slide.steps[currentStep].label}
            </h4>
            <p className="text-muted-foreground">{slide.steps[currentStep].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
          className={cn(
            "px-4 py-2 rounded-lg transition-colors",
            currentStep === 0
              ? "text-muted-foreground/50 cursor-not-allowed"
              : "text-primary hover:bg-primary/10"
          )}
        >
          Previous
        </button>

        <div className="text-sm text-muted-foreground">
          {currentStep + 1} of {slide.steps.length}
        </div>

        <button
          onClick={handleNextStep}
          className={cn(
            "px-4 py-2 rounded-lg transition-colors font-medium",
            currentStep === slide.steps.length - 1
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-primary hover:bg-primary/10"
          )}
        >
          {currentStep === slide.steps.length - 1 ? "Complete" : "Next"}
        </button>
      </div>
    </div>
  );
}
