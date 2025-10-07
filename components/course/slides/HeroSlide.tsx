"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HeroSlide } from "@/lib/course/types";

export function HeroSlideComponent({ slide, onComplete }: { slide: HeroSlide; onComplete?: () => void }) {
  const [started, setStarted] = useState(false);
  const [showBrain, setShowBrain] = useState(false);

  const handleStart = () => {
    setStarted(true);
    onComplete?.();
  };

  // Animate dots forming into brain after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBrain(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Generate random dots for background animation
  const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 p-8 relative overflow-hidden">
      {/* Animated background dots */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: showBrain ? 0.3 : 0.8, 
              scale: showBrain ? 0.5 : 1,
            }}
            transition={{ 
              duration: 1, 
              delay: dot.delay,
              type: "spring",
              stiffness: 100
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          {slide.heading}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          {slide.content}
        </p>
      </motion.div>

      {/* AI in Action - Realistic App Screenshots */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl relative z-10"
      >
        {/* Netflix - "Because you watched" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-80 h-48 bg-black rounded-xl p-3 relative overflow-hidden shadow-lg">
            {/* Netflix Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">N</span>
                </div>
                <span className="text-white text-lg font-bold">Netflix</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex space-x-4 mb-3 text-xs text-gray-400">
              <span className="text-white">Home</span>
              <span>TV Shows</span>
              <span>Movies</span>
              <span>New & Popular</span>
            </div>
            
            {/* Recommendation Section */}
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-red-400 font-semibold text-xs mb-2">Because you watched</div>
              <div className="text-white text-sm font-bold mb-1">Stranger Things</div>
              <div className="text-gray-400 text-xs mb-3">We think you'll love these similar shows</div>
              
              {/* Movie Thumbnails */}
              <div className="flex space-x-2">
                <div className="w-12 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">D</span>
                </div>
                <div className="w-12 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">O</span>
                </div>
                <div className="w-12 h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <div className="w-12 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
              </div>
            </div>
          </div>
          <span className="text-lg text-muted-foreground font-semibold">Netflix Recommendations</span>
        </motion.div>

        {/* Maps - Traffic Route */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-80 h-48 bg-white rounded-xl p-3 relative overflow-hidden shadow-lg">
            {/* Google Maps Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-gray-700 text-sm font-medium">Maps</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="bg-gray-100 rounded-lg p-2 mb-3 flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span className="text-gray-600 text-xs">Search for a place or address</span>
            </div>
            
            {/* Route Display */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div className="flex-1 h-1 bg-green-500 rounded"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
              </div>
              
              {/* Route Options */}
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-blue-600 font-semibold text-xs">Faster route available</div>
                  <div className="text-green-600 text-xs font-bold">18 min</div>
                </div>
                <div className="text-gray-600 text-xs mb-1">+5 min • Avoid traffic</div>
                <div className="text-gray-500 text-xs">Saves 12 minutes in current traffic</div>
              </div>
            </div>
          </div>
          <span className="text-lg text-muted-foreground font-semibold">Smart Navigation</span>
        </motion.div>

        {/* Chat - Support Conversation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-80 h-48 bg-white rounded-xl p-3 relative overflow-hidden shadow-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div>
                  <div className="text-gray-800 text-sm font-semibold">Customer Support</div>
                  <div className="text-green-500 text-xs">Online • AI Assistant</div>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="space-y-2">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white px-3 py-2 rounded-lg rounded-br-sm max-w-xs">
                  <div className="text-xs">I need help with my order</div>
                  <div className="text-xs opacity-75 mt-1">2:34 PM</div>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-sm max-w-xs">
                  <div className="text-xs font-semibold mb-1">AI Assistant</div>
                  <div className="text-xs">Hi! I'd be happy to help with your order. Can you provide your order number?</div>
                  <div className="text-xs opacity-75 mt-1">2:35 PM</div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white px-3 py-2 rounded-lg rounded-br-sm max-w-xs">
                  <div className="text-xs">#12345</div>
                  <div className="text-xs opacity-75 mt-1">2:36 PM</div>
                </div>
              </div>
            </div>
          </div>
          <span className="text-lg text-muted-foreground font-semibold">AI Chat Support</span>
        </motion.div>

        {/* Camera - Face ID Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-80 h-48 bg-black rounded-3xl p-4 relative overflow-hidden shadow-lg">
            {/* Phone Frame */}
            <div className="w-full h-full bg-black rounded-2xl relative">
              {/* Status Bar */}
              <div className="flex items-center justify-between px-4 py-2">
                <div className="text-white text-sm font-medium">9:41</div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              
              {/* Face ID Interface */}
              <div className="flex flex-col items-center justify-center h-full px-4">
                {/* Face ID Circle */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 border-2 border-green-400 rounded-full flex items-center justify-center relative">
                    {/* Scanning Animation */}
                    <div className="absolute -inset-2 border border-green-400 rounded-full animate-pulse opacity-50"></div>
                    <div className="absolute -inset-4 border border-green-300 rounded-full animate-pulse opacity-30"></div>
                    
                    {/* Inner Circle */}
                    <div className="w-16 h-16 border border-green-300 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Text */}
                <div className="text-center">
                  <div className="text-white font-semibold text-lg mb-2">Face ID</div>
                  <div className="text-gray-300 text-sm">Position your face within the frame</div>
                </div>
              </div>
            </div>
          </div>
          <span className="text-lg text-muted-foreground font-semibold">Biometric Security</span>
        </motion.div>
      </motion.div>

    </div>
  );
}



