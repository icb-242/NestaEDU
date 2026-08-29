"use client";

import { motion } from "framer-motion";
import { Repeat, Archive, Zap } from "lucide-react";

interface TrainingVsInferenceDiagramProps {
  currentStep?: number;
}

export const TrainingVsInferenceDiagram = ({ currentStep = 0 }: TrainingVsInferenceDiagramProps) => {
  const isTrainingActive = currentStep === 0;
  const isFreezeActive = currentStep === 1;
  const isInferenceActive = currentStep === 2;
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-center gap-4 md:gap-6">
        
        {/* STAGE 1: TRAINING */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            scale: isTrainingActive ? 1.05 : 1,
            filter: isTrainingActive ? "blur(0px)" : "blur(3px)",
          }}
          transition={{ duration: 0.6, scale: { duration: 0.3 }, filter: { duration: 0.3 } }}
          className="flex-1"
        >
          <div className={`relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-3 border-blue-500 rounded-3xl p-8 shadow-lg transition-opacity ${!isTrainingActive ? 'opacity-50' : 'opacity-100'}`}>
            {/* Pulsing gradient background - only when active */}
            {isTrainingActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-3xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            
            <div className="relative z-10 flex flex-col items-center space-y-4">
              {/* Icon - only rotates when active */}
              <motion.div
                animate={isTrainingActive ? { rotate: [0, 360] } : { rotate: 0 }}
                transition={{ duration: 4, repeat: isTrainingActive ? Infinity : 0, ease: "linear" }}
                className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Repeat className="w-10 h-10 text-white" />
              </motion.div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                TRAINING
              </h3>
              
              {/* Visual: Examples - only bounce when active */}
              <div className="flex items-center gap-2 my-4">
                <motion.div
                  animate={isTrainingActive ? { y: [0, -5, 0] } : { y: 0 }}
                  transition={{ duration: 1.5, repeat: isTrainingActive ? Infinity : 0, delay: 0 }}
                  className="text-3xl"
                >
                  🐱
                </motion.div>
                <motion.div
                  animate={isTrainingActive ? { y: [0, -5, 0] } : { y: 0 }}
                  transition={{ duration: 1.5, repeat: isTrainingActive ? Infinity : 0, delay: 0.3 }}
                  className="text-3xl"
                >
                  🐕
                </motion.div>
                <motion.div
                  animate={isTrainingActive ? { y: [0, -5, 0] } : { y: 0 }}
                  transition={{ duration: 1.5, repeat: isTrainingActive ? Infinity : 0, delay: 0.6 }}
                  className="text-3xl"
                >
                  🐦
                </motion.div>
              </div>
              
              {/* Description */}
              <p className="text-center text-sm font-semibold text-blue-600 dark:text-blue-300">
                Learning patterns<br/>from examples
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* ARROW 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-shrink-0"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path d="M 5 20 L 45 20 L 40 15 M 45 20 L 40 25" stroke="url(#gradient1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </motion.div>
        </motion.div>
        
        {/* STAGE 2: FREEZE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: isFreezeActive ? 1.05 : 1,
            filter: isFreezeActive ? "blur(0px)" : "blur(3px)",
          }}
          transition={{ delay: 0.3, duration: 0.6, scale: { duration: 0.3 }, filter: { duration: 0.3 } }}
          className="flex-1"
        >
          <div className={`relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-3 border-purple-500 rounded-3xl p-8 shadow-lg transition-opacity ${!isFreezeActive ? 'opacity-50' : 'opacity-100'}`}>
            {/* Static gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10 rounded-3xl" />
            
            <div className="relative z-10 flex flex-col items-center space-y-4">
              {/* Icon - only pulses when active */}
              <motion.div
                initial={{ scale: 1 }}
                animate={isFreezeActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: isFreezeActive ? Infinity : 0 }}
                className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Archive className="w-10 h-10 text-white" />
              </motion.div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                FREEZE
              </h3>
              
              {/* Visual: Lock - pops in when active */}
              <motion.div
                animate={isFreezeActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: isFreezeActive ? Infinity : 0 }}
                className="text-5xl my-2"
              >
                🔒
              </motion.div>
              
              {/* Description */}
              <p className="text-center text-sm font-semibold text-purple-600 dark:text-purple-300">
                Save learned<br/>knowledge
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* ARROW 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex-shrink-0"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path d="M 5 20 L 45 20 L 40 15 M 45 20 L 40 25" stroke="url(#gradient2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </motion.div>
        </motion.div>
        
        {/* STAGE 3: INFERENCE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            scale: isInferenceActive ? 1.05 : 1,
            filter: isInferenceActive ? "blur(0px)" : "blur(3px)",
          }}
          transition={{ delay: 0.6, duration: 0.6, scale: { duration: 0.3 }, filter: { duration: 0.3 } }}
          className="flex-1"
        >
          <div className={`relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-3 border-green-500 rounded-3xl p-8 shadow-lg transition-opacity ${!isInferenceActive ? 'opacity-50' : 'opacity-100'}`}>
            {/* Glowing effect - only when active */}
            {isInferenceActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-3xl"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            
            <div className="relative z-10 flex flex-col items-center space-y-4">
              {/* Icon - only pulses when active */}
              <motion.div
                animate={isInferenceActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: isInferenceActive ? Infinity : 0 }}
                className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">
                INFERENCE
              </h3>
              
              {/* Visual: Input → Output - only animates when active */}
              <div className="flex items-center gap-3 my-4">
                <motion.div
                  animate={isInferenceActive ? { x: [0, -5, 0] } : { x: 0 }}
                  transition={{ duration: 2, repeat: isInferenceActive ? Infinity : 0 }}
                  className="text-3xl"
                >
                  ❓
                </motion.div>
                
                <motion.div
                  animate={isInferenceActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5, repeat: isInferenceActive ? Infinity : 0, repeatDelay: 2 }}
                  className="text-xl"
                >
                  ⚡
                </motion.div>
                
                <motion.div
                  animate={isInferenceActive ? { x: [0, 5, 0] } : { x: 0 }}
                  transition={{ duration: 2, repeat: isInferenceActive ? Infinity : 0 }}
                  className="text-3xl"
                >
                  🐱
                </motion.div>
              </div>
              
              {/* Description */}
              <p className="text-center text-sm font-semibold text-green-600 dark:text-green-300">
                Make fast<br/>predictions
              </p>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};
