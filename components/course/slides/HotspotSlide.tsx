"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { HotspotSlide } from "@/lib/course/types";

export function HotspotSlideComponent({ slide, onComplete }: { slide: HotspotSlide; onComplete?: () => void }) {
  const [viewedHotspots, setViewedHotspots] = useState<Set<string>>(new Set());
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const handleHotspotClick = (hotspotId: string) => {
    setViewedHotspots(prev => new Set(Array.from(prev).concat(hotspotId)));
    setActiveHotspot(hotspotId);
    
    // Check if all hotspots have been viewed
    const allViewed = new Set(Array.from(viewedHotspots).concat(hotspotId));
    if (slide.requireAllViewed && allViewed.size === slide.hotspots.length) {
      onComplete?.();
    } else if (!slide.requireAllViewed) {
      onComplete?.();
    }
  };

  const closeHotspot = () => {
    setActiveHotspot(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      
      <div className="relative max-w-md mx-auto">
        {/* Authentic iPhone Home Screen */}
        <div className="relative bg-gray-900 rounded-[2.5rem] p-2 mx-auto w-80 h-[600px] shadow-2xl">
          {/* iPhone Frame */}
          <div className="bg-black rounded-[2rem] p-1 h-full">
            {/* Screen */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-[1.75rem] h-full relative overflow-hidden">
              {/* Status Bar */}
              <div className="flex items-center justify-between px-6 pt-2 pb-1">
                <div className="text-black text-sm font-semibold">9:41</div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-2 bg-black rounded-sm"></div>
                  <div className="w-4 h-2 bg-black rounded-sm"></div>
                  <div className="w-4 h-2 bg-black rounded-sm"></div>
                  <div className="w-4 h-2 bg-black rounded-sm"></div>
                </div>
              </div>

              {/* App Grid - iPhone Standard Layout */}
              <div className="px-6 pt-4">
                {/* First Row */}
                <div className="flex justify-between mb-6">
                  {/* Camera App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-8 h-6 bg-white rounded-sm relative">
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-500 rounded-full border border-gray-600">
                        <div className="w-2.5 h-2.5 bg-gray-700 rounded-full"></div>
                      </div>
                      <div className="absolute top-0.5 right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Photos App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-6 h-6 relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-200 rounded-full"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-200 rounded-full"></div>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-pink-200 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-pink-200 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Maps App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 relative">
                      <div className="w-full h-full bg-white rounded-sm relative">
                        <div className="absolute top-1 left-0 w-full h-0.5 bg-gray-300"></div>
                        <div className="absolute top-2 left-0 w-full h-0.5 bg-gray-300"></div>
                        <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-300"></div>
                        <div className="absolute top-1 left-1 w-0.5 h-4 bg-gray-300"></div>
                        <div className="absolute top-1 left-3 w-0.5 h-4 bg-gray-300"></div>
                        <div className="absolute top-1 left-5 w-0.5 h-4 bg-gray-300"></div>
                        <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Settings App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-gray-600 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Second Row */}
                <div className="flex justify-between mb-6">
                  {/* Messages App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Phone App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Mail App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Safari App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Third Row */}
                <div className="flex justify-between mb-6">
                  {/* Music App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Weather App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Notes App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Calendar App */}
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Keyboard with Predictive Text */}
              <div className="absolute bottom-0 left-0 right-0">
                {/* Text Input Area */}
                <div className="bg-white border-t border-gray-200 px-4 py-3">
                  <div className="text-sm text-gray-800">
                    <span className="text-gray-600">The sky is </span>
                    <span className="text-blue-600 font-medium">blue</span>
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
                
                {/* Predictive Text Bar */}
                <div className="bg-gray-100 border-t border-gray-200 px-4 py-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-xs text-gray-500">Suggestions:</div>
                    <div className="flex space-x-2">
                      <div className="px-2 py-1 bg-white rounded-full text-xs text-blue-600 border border-blue-200">blue</div>
                      <div className="px-2 py-1 bg-white rounded-full text-xs text-blue-600 border border-blue-200">cloudy</div>
                      <div className="px-2 py-1 bg-white rounded-full text-xs text-blue-600 border border-blue-200">grey</div>
                    </div>
                  </div>
                </div>
                
                {/* Keyboard */}
                <div className="bg-gray-200 p-2">
                  {/* Top Row */}
                  <div className="flex justify-center space-x-1 mb-1">
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">Q</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">W</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">E</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">R</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">T</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">Y</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">U</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">I</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">O</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">P</div>
                  </div>
                  
                  {/* Middle Row */}
                  <div className="flex justify-center space-x-1 mb-1">
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">A</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">S</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">D</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">F</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">G</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">H</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">J</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">K</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">L</div>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="flex justify-center space-x-1">
                    <div className="w-8 h-8 bg-gray-300 rounded text-xs flex items-center justify-center font-medium">123</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">Z</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">X</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">C</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">V</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">B</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">N</div>
                    <div className="w-6 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">M</div>
                    <div className="w-8 h-8 bg-gray-300 rounded text-xs flex items-center justify-center font-medium">⌫</div>
                  </div>
                  
                  {/* Space Bar Row */}
                  <div className="flex justify-center mt-1">
                    <div className="w-48 h-8 bg-white rounded text-xs flex items-center justify-center font-medium">space</div>
                  </div>
                </div>
              </div>
              
              {/* Hotspots positioned on specific apps */}
              {slide.hotspots.map((hotspot) => (
                <motion.button
                  key={hotspot.id}
                  className={cn(
                    "absolute w-8 h-8 rounded-full border-2 transition-all duration-200 z-20 shadow-lg",
                    viewedHotspots.has(hotspot.id)
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-primary border-primary hover:bg-primary/80 text-white"
                  )}
                  style={{
                    left: `${hotspot.x * 100}%`,
                    top: `${hotspot.y * 100}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  onClick={() => handleHotspotClick(hotspot.id)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-sm font-bold">
                    {viewedHotspots.has(hotspot.id) ? "✓" : "•"}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Hotspot Info Panel */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-card border rounded-lg"
            >
              {(() => {
                const hotspot = slide.hotspots.find(h => h.id === activeHotspot);
                return hotspot ? (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">{hotspot.title}</h4>
                    <p className="text-muted-foreground">{hotspot.body}</p>
                    <button
                      onClick={closeHotspot}
                      className="text-sm text-primary hover:underline"
                    >
                      Close
                    </button>
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {slide.hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                viewedHotspots.has(hotspot.id) ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Completion Status */}
        {slide.requireAllViewed && viewedHotspots.size === slide.hotspots.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              ✓ All hotspots explored
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
