"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { InteractiveInputSlide } from "@/lib/course/types";

export function InteractiveInputSlideComponent({ slide, onComplete }: { slide: InteractiveInputSlide; onComplete?: () => void }) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [aiPredictions, setAiPredictions] = useState<string[]>([]);

  // Pattern Guessing Game specific logic
  const isPatternGame = slide.heading === "Pattern Guessing Game";
  
  // Common AI predictions for "The sky is ___"
  const skyPredictions = ["blue", "clear", "cloudy", "dark", "bright"];
  
  useEffect(() => {
    if (isPatternGame && input.trim()) {
      // Simulate AI thinking delay
      const timer = setTimeout(() => {
        setShowPrediction(true);
        // Show top 3 predictions based on input
        const filtered = skyPredictions.filter(pred => 
          pred.toLowerCase().startsWith(input.toLowerCase()) || 
          input.toLowerCase().includes(pred.toLowerCase())
        );
        setAiPredictions(filtered.length > 0 ? filtered.slice(0, 3) : skyPredictions.slice(0, 3));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [input, isPatternGame]);

  const handleSubmit = () => {
    setSubmitted(true);
    
    // Save to localStorage if there's a saveKey
    if ('saveKey' in slide && slide.saveKey) {
      localStorage.setItem(slide.saveKey, input);
    }
    
    onComplete?.();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      {slide.content && <p className="text-muted-foreground">{slide.content}</p>}
      
      <div className="space-y-4">
        {isPatternGame ? (
          <div className="space-y-4">
            <div className="text-lg font-medium">
              The sky is <span className="text-blue-600 font-bold">{input}</span>
            </div>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your guess..."
              className="text-lg"
              disabled={submitted}
            />
            
            <AnimatePresence>
              {showPrediction && !submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <p className="text-sm text-gray-600">AI's top predictions:</p>
                  <div className="flex gap-2">
                    {aiPredictions.map((pred, index) => (
                      <motion.div
                        key={pred}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {pred}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    This is how ChatGPT predicts words — pattern matching at scale!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={slide.placeholder ?? "Type here…"}
            rows={6}
            disabled={submitted}
          />
        )}
        
        <Button
          onClick={handleSubmit}
          disabled={!input.trim() || submitted}
        >
          {isPatternGame ? "Continue" : "Submit"}
        </Button>
      </div>
      
      {submitted && slide.feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-emerald-100 text-emerald-700"
        >
          {slide.feedback}
        </motion.div>
      )}
    </div>
  );
}










