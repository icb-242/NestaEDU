"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineSlide } from "@/lib/course/types";

export function TimelineSlideComponent({ slide, onComplete }: { slide: TimelineSlide; onComplete?: () => void }) {
  const [activeEvent, setActiveEvent] = useState<number>(0);
  const [viewedEvents, setViewedEvents] = useState<Set<number>>(new Set());

  const handleEventClick = (index: number) => {
    setActiveEvent(index);
    setViewedEvents(prev => new Set(Array.from(prev).concat(index)));
    
    // Complete when last event is viewed
    if (index === slide.events.length - 1) {
      onComplete?.();
    }
  };

  const isHorizontal = slide.uiHints?.orientation === "horizontal";

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      {slide.content && <p className="text-muted-foreground">{slide.content}</p>}
      
      <div className="bg-card border rounded-lg p-8">
        {isHorizontal ? (
          /* Horizontal Timeline */
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted transform -translate-y-1/2" />
            
            {/* Timeline Events */}
            <div className="relative flex justify-between">
              {slide.events.map((event, index) => {
                const isActive = activeEvent === index;
                const isViewed = viewedEvents.has(index);
                
                return (
                  <motion.button
                    key={event.id}
                    className="relative flex flex-col items-center space-y-2 group"
                    onClick={() => handleEventClick(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Event Dot */}
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 relative z-10 transition-colors",
                      isActive
                        ? "bg-primary border-primary"
                        : isViewed
                        ? "bg-green-500 border-green-500"
                        : "bg-background border-muted-foreground"
                    )}>
                      {isViewed && !isActive && (
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    
                    {/* Event Year */}
                    <div className={cn(
                      "text-sm font-semibold transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}>
                      {event.year}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Vertical Timeline */
          <div className="space-y-6">
            {slide.events.map((event, index) => {
              const isActive = activeEvent === index;
              const isViewed = viewedEvents.has(index);
              
              return (
                <motion.div
                  key={event.id}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <button
                    onClick={() => handleEventClick(index)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0",
                      isActive
                        ? "bg-primary border-primary text-primary-foreground"
                        : isViewed
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-background border-muted-foreground text-muted-foreground"
                    )}
                  >
                    {isViewed && !isActive ? (
                      <span className="text-xs font-bold">✓</span>
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </button>
                  
                  {/* Event Content */}
                  <motion.div
                    className={cn(
                      "flex-1 p-4 rounded-lg border transition-colors cursor-pointer",
                      isActive
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted/20 border-muted/20 hover:bg-muted/30"
                    )}
                    onClick={() => handleEventClick(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="space-y-2">
                      <div className="font-semibold text-primary">{event.year}</div>
                      <p className="text-muted-foreground text-sm">{event.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Active Event Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg"
          >
            <div className="text-center space-y-2">
              <h4 className="text-lg font-semibold text-primary">
                {slide.events[activeEvent].year}
              </h4>
              <p className="text-muted-foreground">
                {slide.events[activeEvent].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex justify-center gap-2 mt-6">
          {slide.events.map((_, index) => (
            <button
              key={index}
              onClick={() => handleEventClick(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                activeEvent === index
                  ? "bg-primary"
                  : viewedEvents.has(index)
                  ? "bg-green-500"
                  : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Utility function for conditional classes
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};
