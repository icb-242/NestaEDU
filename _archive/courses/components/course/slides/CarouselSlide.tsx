"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CarouselSlide } from "@/lib/course/types";

export function CarouselSlideComponent({ slide, onComplete }: { slide: CarouselSlide; onComplete?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedItems, setViewedItems] = useState<Set<number>>(new Set());

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % slide.items.length;
    setCurrentIndex(newIndex);
    setViewedItems(prev => new Set(Array.from(prev).concat(currentIndex)));
    
    // Check if all items have been viewed
    const allViewed = new Set(Array.from(viewedItems).concat(currentIndex));
    if (allViewed.size === slide.items.length) {
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + slide.items.length) % slide.items.length);
  };

  const currentItem = slide.items[currentIndex];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      
      <div className="relative max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-card border rounded-lg p-8 text-center space-y-4 min-h-[200px] flex flex-col justify-center"
          >
            <h4 className="text-xl font-semibold text-primary">{currentItem.label}</h4>
            <p className="text-muted-foreground text-lg">{currentItem.caption}</p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {/* Progress Dots */}
          <div className="flex gap-2">
            {slide.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  index === currentIndex
                    ? "bg-primary"
                    : viewedItems.has(index)
                    ? "bg-primary/50"
                    : "bg-muted"
                )}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Completion Status */}
        {viewedItems.size === slide.items.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              ✓ All items viewed
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
