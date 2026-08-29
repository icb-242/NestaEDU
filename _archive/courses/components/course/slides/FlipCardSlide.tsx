"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlipCardSlide } from "@/lib/course/types";

export function FlipCardSlideComponent({ slide, onComplete }: { slide: FlipCardSlide; onComplete?: () => void }) {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [hasSeenAllCards, setHasSeenAllCards] = useState(false);

  const handleCardFlip = (index: number) => {
    setFlippedCards(prev => {
      const newFlipped = new Set(prev);
      if (newFlipped.has(index)) {
        // If already flipped, flip it back
        newFlipped.delete(index);
      } else {
        // If not flipped, flip it
        newFlipped.add(index);
        
        // Check if this is the first time seeing all cards
        if (newFlipped.size === slide.cards.length && !hasSeenAllCards) {
          setHasSeenAllCards(true);
          // Small delay to allow the flip animation to complete
          setTimeout(() => onComplete?.(), 300);
        }
      }
      
      return newFlipped;
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      
      <div className={cn(
        "grid gap-3 max-w-2xl mx-auto",
        slide.uiHints?.layout === "grid-2x2" ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      )}>
        {slide.cards.map((card, index) => {
          const isFlipped = flippedCards.has(index);
          
          return (
            <div
              key={index}
              className="perspective-1000 aspect-square cursor-pointer"
              onClick={() => handleCardFlip(index)}
            >
              <motion.div
                className="relative w-full h-full transform-style-preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Front of card */}
                <div className="absolute inset-0 bg-card border-2 border-primary/20 rounded-lg p-3 flex items-center justify-center text-center backface-hidden">
                  <div className="font-semibold text-primary text-sm">{card.front}</div>
                </div>
                
                {/* Back of card */}
                <div 
                  className="absolute inset-0 bg-primary text-primary-foreground border-2 border-primary rounded-lg p-3 flex items-center justify-center text-center backface-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div className="text-xs leading-tight">{card.back}</div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {slide.cards.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              flippedCards.has(index) ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Completion Status */}
      {hasSeenAllCards && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ✓ All cards viewed
          </div>
        </motion.div>
      )}
    </div>
  );
}
