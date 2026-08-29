"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropSlide } from "@/lib/course/types";

export function DragDropSlideComponent({ slide, onComplete }: { slide: DragDropSlide; onComplete?: () => void }) {
  const [dropped, setDropped] = useState<Record<string, string>>({});
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showError, setShowError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleDrop = (itemId: string, targetId: string) => {
    const item = slide.items.find(i => i.id === itemId);
    
    if (item && targetId === item.correctTarget) {
      // Correct placement
      setDropped((prev) => ({ ...prev, [itemId]: targetId }));
      setShowError(null); // Clear any error
      
      // Show tooltip for correct placement
      setShowTooltip(itemId);
      setTimeout(() => setShowTooltip(null), 3000);
      
      // Check if all items are correctly placed
      const allPlaced = slide.items.every((it) => {
        const currentTarget = itemId === it.id ? targetId : dropped[it.id];
        return currentTarget === it.correctTarget;
      });
      
      if (allPlaced && !completed) {
        setCompleted(true);
        setTimeout(() => onComplete?.(), 1000);
      }
    } else {
      // Incorrect placement - show error and don't place the item
      setShowError(itemId);
      setTimeout(() => setShowError(null), 3000);
    }
  };

  const getTooltipText = (itemId: string) => {
    const item = slide.items.find(i => i.id === itemId);
    if (!item) return "";
    
    switch (item.id) {
      case "calculator":
        return "Correct! Calculator uses hard-coded math rules programmed by humans.";
      case "chatgpt":
        return "Correct! ChatGPT learns patterns from billions of text examples.";
      case "alarm":
        return "Correct! Alarm clock follows simple time-based rules.";
      case "netflix":
        return "Correct! Netflix learns your preferences from viewing patterns.";
      case "camera":
        return "Correct! Face unlock learns to recognize faces from training data.";
      default:
        return "Great job!";
    }
  };

  const getErrorText = (itemId: string) => {
    const item = slide.items.find(i => i.id === itemId);
    if (!item) return "";
    
    switch (item.id) {
      case "calculator":
        return "Try again! Calculator uses hard-coded rules, not learning.";
      case "chatgpt":
        return "Try again! ChatGPT learns from data, not fixed rules.";
      case "alarm":
        return "Try again! Alarm clock uses simple rules, not learning.";
      case "netflix":
        return "Try again! Netflix learns from your viewing patterns.";
      case "camera":
        return "Try again! Face unlock learns to recognize faces from data.";
      default:
        return "Not quite right. Try again!";
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      {slide.content && <p className="text-muted-foreground">{slide.content}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Items to Sort</h4>
          <div className="space-y-2">
            {slide.items.map((item) => (
              <motion.div
                key={item.id}
                className={`p-3 rounded-lg cursor-move transition-all ${
                  dropped[item.id] 
                    ? "bg-green-100 border-2 border-green-300" 
                    : "bg-secondary/20 hover:bg-secondary/30"
                }`}
                draggable={!dropped[item.id]}
                onDragStart={(e) => e.dataTransfer.setData("text/plain", item.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: slide.items.indexOf(item) * 0.1 }}
              >
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Drop Zones</h4>
          <div className="space-y-2">
            {slide.targets.map((t) => (
              <div
                key={t.id}
                className="p-4 border-2 border-dashed border-primary/20 rounded-lg min-h-[100px] hover:border-primary/40 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const itemId = e.dataTransfer.getData("text/plain");
                  handleDrop(itemId, t.id);
                }}
              >
                <div className="font-medium mb-2">{t.label}</div>
                {Object.entries(dropped)
                  .filter(([, targetId]) => targetId === t.id)
                  .map(([itemId]) => {
                    const item = slide.items.find((i) => i.id === itemId);
                    return item ? (
                      <motion.div
                        key={itemId}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-2 bg-secondary rounded-md my-1"
                      >
                        {item.label}
                      </motion.div>
                    ) : null;
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tooltip for correct placements */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {getTooltipText(showTooltip)}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error message for incorrect placements */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {getErrorText(showError)}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Completion message */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <p className="text-green-800 font-medium">🎉 Excellent! You've correctly sorted all the examples!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}










