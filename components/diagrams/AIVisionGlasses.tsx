"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function AIVisionGlasses() {
  const [t, setT] = useState(0); // 0..100
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-animate when playing
  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    
    setIsPlaying(true);
    let currentT = t;
    const interval = setInterval(() => {
      currentT += 2;
      if (currentT >= 100) {
        currentT = 100;
        setIsPlaying(false);
        clearInterval(interval);
      }
      setT(currentT);
    }, 50);
  };

  const progress = t / 100;

  // Generate deterministic feature clusters
  const { catFeatures, dogFeatures } = useMemo(() => {
    const rand = (seed: number) => () => { 
      seed = (seed * 9301 + 49297) % 233280; 
      return seed / 233280; 
    };
    
    const r1 = rand(42);
    const r2 = rand(123);
    
    const catFeatures = Array.from({ length: 80 }, () => ({
      x: 120 + (r1() - 0.5) * 100,
      y: 150 + (r1() - 0.5) * 80,
      intensity: 0.3 + r1() * 0.5
    }));
    
    const dogFeatures = Array.from({ length: 80 }, () => ({
      x: 380 + (r2() - 0.5) * 100,
      y: 250 + (r2() - 0.5) * 80,
      intensity: 0.4 + r2() * 0.4
    }));
    
    return { catFeatures, dogFeatures };
  }, []);

  // Caption text based on slider position
  const getCaption = () => {
    if (t < 20) return "🖼️ Humans see images as pictures — shapes, colors, and objects.";
    if (t < 70) return "🔢 AI breaks images into patterns — edges, brightness, textures, represented as numbers.";
    return "🎯 The AI organizes features into clusters it can recognize and classify.";
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-8">
      {/* Main Visualization */}
      <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 rounded-2xl border-2 border-primary/20 p-12 shadow-xl overflow-hidden">
        
        {/* Title above glasses */}
        <div className="text-center mb-8">
          <h4 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">
            👓 AI Vision Glasses
          </h4>
          <p className="text-base text-muted-foreground">
            Drag the slider to see how AI transforms images into numerical features
          </p>
        </div>

        {/* Two-Panel View - Much Larger and Wider */}
        <div className="grid grid-cols-2 gap-12">
          
          {/* LEFT PANEL: Human View */}
          <motion.div
            animate={{ opacity: 1 - progress * 0.7 }}
            className="relative rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-8 shadow-lg overflow-hidden h-[600px] flex flex-col"
          >
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300">
                Human View
              </span>
            </div>
            
            {/* Clipart-style image using SVG - Larger */}
            <div className="flex-1 flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full max-w-full h-auto max-h-full">
              <defs>
                <linearGradient id="catBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF9E4A" />
                  <stop offset="100%" stopColor="#E67E22" />
                </linearGradient>
                <linearGradient id="dogBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A0826D" />
                  <stop offset="100%" stopColor="#8B6F47" />
                </linearGradient>
                <radialGradient id="catEyeGrad">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFA500" />
                </radialGradient>
              </defs>
              
              {/* Background - soft gradient */}
              <rect width="300" height="300" fill="#E8F5E9"/>
              
              {/* Cat (left) - Enhanced clipart style */}
              <g transform="translate(90, 100)">
                {/* Body */}
                <ellipse cx="0" cy="30" rx="28" ry="35" fill="url(#catBodyGrad)"/>
                
                {/* Head */}
                <ellipse cx="0" cy="0" rx="32" ry="30" fill="url(#catBodyGrad)"/>
                
                {/* Ears */}
                <path d="M -22,-25 L -30,-40 L -14,-28 Z" fill="#FF9E4A"/>
                <path d="M -22,-25 L -26,-36 L -17,-27 Z" fill="#FFB366"/>
                <path d="M 22,-25 L 30,-40 L 14,-28 Z" fill="#FF9E4A"/>
                <path d="M 22,-25 L 26,-36 L 17,-27 Z" fill="#FFB366"/>
                
                {/* White muzzle */}
                <ellipse cx="0" cy="8" rx="20" ry="18" fill="white"/>
                
                {/* Eyes */}
                <ellipse cx="-11" cy="-5" rx="6" ry="8" fill="url(#catEyeGrad)"/>
                <ellipse cx="11" cy="-5" rx="6" ry="8" fill="url(#catEyeGrad)"/>
                <ellipse cx="-11" cy="-4" rx="3" ry="6" fill="#1F2937"/>
                <ellipse cx="11" cy="-4" rx="3" ry="6" fill="#1F2937"/>
                <ellipse cx="-10" cy="-7" rx="1.5" ry="2.5" fill="white" opacity="0.9"/>
                <ellipse cx="12" cy="-7" rx="1.5" ry="2.5" fill="white" opacity="0.9"/>
                
                {/* Nose */}
                <path d="M 0,8 L -3,11 L 0,12 L 3,11 Z" fill="#FF6B9D"/>
                
                {/* Mouth */}
                <path d="M 0,12 Q -7,15 -9,13 M 0,12 Q 7,15 9,13" stroke="#FF6B9D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                
                {/* Whiskers */}
                <line x1="-20" y1="5" x2="-35" y2="3" stroke="#1F2937" strokeWidth="1" opacity="0.6"/>
                <line x1="-20" y1="9" x2="-35" y2="10" stroke="#1F2937" strokeWidth="1" opacity="0.6"/>
                <line x1="20" y1="5" x2="35" y2="3" stroke="#1F2937" strokeWidth="1" opacity="0.6"/>
                <line x1="20" y1="9" x2="35" y2="10" stroke="#1F2937" strokeWidth="1" opacity="0.6"/>
                
                {/* Stripes */}
                <path d="M -8,-20 Q -8,-12 -12,-8" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
                <path d="M 8,-20 Q 8,-12 12,-8" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
                
                {/* Paws */}
                <ellipse cx="-15" cy="60" rx="8" ry="6" fill="#E67E22"/>
                <ellipse cx="15" cy="60" rx="8" ry="6" fill="#E67E22"/>
              </g>
              
              {/* Dog (right) - Enhanced clipart style */}
              <g transform="translate(210, 170)">
                {/* Body */}
                <ellipse cx="0" cy="35" rx="32" ry="38" fill="url(#dogBodyGrad)"/>
                
                {/* Head */}
                <ellipse cx="0" cy="0" rx="35" ry="32" fill="url(#dogBodyGrad)"/>
                
                {/* Floppy ears */}
                <ellipse cx="-28" cy="5" rx="12" ry="20" fill="#8B6F47" transform="rotate(-20, -28, 5)"/>
                <ellipse cx="28" cy="5" rx="12" ry="20" fill="#8B6F47" transform="rotate(20, 28, 5)"/>
                
                {/* Snout */}
                <ellipse cx="0" cy="12" rx="18" ry="16" fill="#C9A882"/>
                
                {/* Eyes */}
                <ellipse cx="-12" cy="-8" rx="5" ry="7" fill="white"/>
                <ellipse cx="12" cy="-8" rx="5" ry="7" fill="white"/>
                <circle cx="-12" cy="-6" r="3.5" fill="#1F2937"/>
                <circle cx="12" cy="-6" r="3.5" fill="#1F2937"/>
                <circle cx="-11" cy="-8" r="1.5" fill="white" opacity="0.9"/>
                <circle cx="13" cy="-8" r="1.5" fill="white" opacity="0.9"/>
                
                {/* Nose */}
                <ellipse cx="0" cy="15" rx="6" ry="5" fill="#1F2937"/>
                <ellipse cx="0" cy="14" rx="2" ry="1.5" fill="white" opacity="0.4"/>
                
                {/* Mouth */}
                <path d="M 0,20 L 0,25 M 0,25 Q -6,28 -8,26 M 0,25 Q 6,28 8,26" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                
                {/* Collar */}
                <ellipse cx="0" cy="28" rx="22" ry="4" fill="#DC2626"/>
                <circle cx="0" cy="28" r="3" fill="#FBBF24"/>
                
                {/* Spots */}
                <ellipse cx="-18" cy="-15" rx="6" ry="5" fill="#654321" opacity="0.4"/>
                <ellipse cx="15" cy="-12" rx="5" ry="4" fill="#654321" opacity="0.4"/>
                
                {/* Paws */}
                <ellipse cx="-18" cy="68" rx="9" ry="7" fill="#8B6F47"/>
                <ellipse cx="18" cy="68" rx="9" ry="7" fill="#8B6F47"/>
              </g>
              
              {/* Labels */}
              <text x="90" y="180" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2D3748">Cat</text>
              <text x="210" y="260" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2D3748">Dog</text>
            </svg>
            </div>
          </motion.div>
          
          {/* RIGHT PANEL: AI Feature View */}
          <motion.div
            animate={{ opacity: 0.3 + progress * 0.7 }}
            className="relative rounded-xl border-2 border-purple-400 dark:border-purple-600 bg-slate-900 p-8 shadow-lg overflow-hidden h-[600px] flex flex-col"
          >
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full text-sm font-semibold text-purple-700 dark:text-purple-300">
                AI Feature View
              </span>
            </div>
            
            {/* Feature Space Visualization - Larger */}
            <div className="flex-1 flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full max-w-full h-auto max-h-full">
              {/* Background grid */}
              <g opacity={0.1 + progress * 0.15}>
                {Array.from({length: 9}, (_, i) => (
                  <line key={`v${i}`} x1={30 + i * 40} y1={20} x2={30 + i * 40} y2={280} stroke="#a855f7" strokeWidth="0.5"/>
                ))}
                {Array.from({length: 7}, (_, i) => (
                  <line key={`h${i}`} x1={30} y1={20 + i * 40} x2={370} y2={20 + i * 40} stroke="#a855f7" strokeWidth="0.5"/>
                ))}
              </g>
              
              {/* Cat Feature Cluster (Blue) - Repositioned and larger */}
              <g>
                {catFeatures.map((feat, idx) => {
                  const initialX = 200 + (Math.random() - 0.5) * 300;
                  const initialY = 150 + (Math.random() - 0.5) * 220;
                  const finalX = 100 + (feat.x - 120) * 0.5;
                  const finalY = 100 + (feat.y - 150) * 0.5;
                  const currentX = initialX + (finalX - initialX) * progress;
                  const currentY = initialY + (finalY - initialY) * progress;
                  
                  return (
                    <motion.circle
                      key={`cat-${idx}`}
                      cx={currentX}
                      cy={currentY}
                      r={2.5 + progress * 2}
                      fill="#3b82f6"
                      opacity={0.5 + progress * 0.4}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.005 }}
                    />
                  );
                })}
                
                {/* Cat Cluster Label */}
                <motion.g
                  animate={{ opacity: progress > 0.5 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <rect x="40" y="35" width="130" height="35" rx="8" fill="#1E3A8A" opacity="0.9"/>
                  <text x="105" y="58" textAnchor="middle" fontSize="16" fontWeight="700" fill="#DBEAFE">
                    Cat Features
                  </text>
                </motion.g>
              </g>
              
              {/* Dog Feature Cluster (Red) - Repositioned and larger */}
              <g>
                {dogFeatures.map((feat, idx) => {
                  const initialX = 200 + (Math.random() - 0.5) * 300;
                  const initialY = 150 + (Math.random() - 0.5) * 220;
                  const finalX = 280 + (feat.x - 380) * 0.6;
                  const finalY = 190 + (feat.y - 250) * 0.55;
                  const currentX = initialX + (finalX - initialX) * progress;
                  const currentY = initialY + (finalY - initialY) * progress;
                  
                  return (
                    <motion.circle
                      key={`dog-${idx}`}
                      cx={currentX}
                      cy={currentY}
                      r={2.5 + progress * 2}
                      fill="#ef4444"
                      opacity={0.5 + progress * 0.4}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.005 }}
                    />
                  );
                })}
                
                {/* Dog Cluster Label */}
                <motion.g
                  animate={{ opacity: progress > 0.5 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <rect x="230" y="235" width="130" height="35" rx="8" fill="#7F1D1D" opacity="0.9"/>
                  <text x="295" y="258" textAnchor="middle" fontSize="16" fontWeight="700" fill="#FCA5A5">
                    Dog Features
                  </text>
                </motion.g>
              </g>
              
              {/* Decision Boundary - More prominent */}
              <motion.path
                d={`M 40 ${70 - progress * 30} Q 200 ${150 + (1-progress) * 35} 360 ${230 + progress * 20}`}
                fill="none"
                stroke="#a855f7"
                strokeWidth={2 + progress * 3}
                strokeDasharray="10,5"
                opacity={0.4 + progress * 0.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Axes labels - Larger */}
              <motion.g
                animate={{ opacity: 0.4 + progress * 0.6 }}
              >
                <text x="200" y="295" textAnchor="middle" fontSize="13" fill="#a855f7" fontWeight="700">
                  Feature 1 (edge patterns)
                </text>
                <text x="12" y="150" textAnchor="middle" fontSize="13" fill="#a855f7" fontWeight="700" transform="rotate(-90, 12, 150)">
                  Feature 2 (color)
                </text>
              </motion.g>
            </svg>
            </div>
          </motion.div>
        </div>

        {/* Visual Divider / Transition Indicator */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-8xl opacity-15">
            👓
          </div>
        </motion.div>
      </div>

      {/* Control Panel */}
      <div className="bg-card border-2 border-primary/20 rounded-xl p-8 space-y-6 shadow-md">
        {/* Slider Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-foreground">
              AI Understanding
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlay}
                className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label={isPlaying ? "Pause animation" : "Play animation"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-primary" />
                ) : (
                  <Play className="w-5 h-5 text-primary" />
                )}
              </button>
              <span className="text-lg font-bold text-primary w-16 text-right">
                {t}%
              </span>
            </div>
          </div>
          
          <div className="relative">
            <input 
              type="range" 
              min={0} 
              max={100} 
              value={t} 
              onChange={(e) => setT(parseInt(e.target.value))}
              className="w-full h-4 bg-gradient-to-r from-gray-200 via-purple-200 to-blue-200 dark:from-gray-800 dark:via-purple-900 dark:to-blue-900 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  #E5E7EB 0%, 
                  #A78BFA ${t}%, 
                  #D1D5DB ${t}%, 
                  #D1D5DB 100%)`
              }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground font-medium">
            <span>🖼️ Human View</span>
            <span>🔢 AI Features</span>
          </div>
        </div>

        {/* Dynamic Caption */}
        <motion.div
          key={`caption-${Math.floor(t/20)}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-primary/30 rounded-lg p-5"
        >
          <p className="text-base text-center font-medium text-gray-700 dark:text-gray-300">
            {getCaption()}
          </p>
        </motion.div>

        {/* Feature Legend */}
        <div className="flex items-center justify-center gap-8 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-500 shadow-sm"></div>
            <span className="text-sm font-medium text-muted-foreground">Cat features</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-red-500 shadow-sm"></div>
            <span className="text-sm font-medium text-muted-foreground">Dog features</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-purple-500"></div>
            <span className="text-sm font-medium text-muted-foreground">Decision boundary</span>
          </div>
        </div>
      </div>

      {/* Educational Context */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <p className="text-base text-amber-900 dark:text-amber-200 text-center leading-relaxed">
          <strong>Key insight:</strong> AI doesn't "see" pictures — it converts every image into thousands of numbers 
          representing patterns like edges, colors, and textures. Similar images produce similar numbers, 
          creating clusters the model can learn to recognize.
        </p>
      </div>
    </div>
  );
}

