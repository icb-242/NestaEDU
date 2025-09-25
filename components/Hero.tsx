"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "./ui/Container";
import { siteContent } from "@/lib/siteContent";
import { useState, useEffect } from "react";

export function Hero() {
  const { hero } = siteContent;
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  const targetTitle = hero.title;
  const animationDuration = 750; // 0.75 seconds
  const delayPerChar = animationDuration / targetTitle.length;

  useEffect(() => {
    // Initialize with scrambled text of exact same length
    const scrambledText = targetTitle.split('').map(() => 
      matrixChars[Math.floor(Math.random() * matrixChars.length)]
    ).join('');
    setDisplayedTitle(scrambledText);

    // Start animation after a brief delay
    const startTimer = setTimeout(() => {
      const animateChar = (index: number) => {
        if (index < targetTitle.length) {
          setDisplayedTitle(prev => {
            const newTitle = prev.split('');
            newTitle[index] = targetTitle[index];
            return newTitle.join('');
          });
          
          setTimeout(() => animateChar(index + 1), delayPerChar);
        }
      };
      animateChar(0);
    }, 300);

    return () => clearTimeout(startTimer);
  }, [targetTitle, delayPerChar]);

  const handleScrollClick = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pt-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10 bg-grid dark:bg-grid-dark"
        aria-hidden="true"
      />
      
      {/* Content */}
      <Container className="flex min-h-[calc(100vh-4rem)] flex-col items-start justify-start py-8 pt-16">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16 w-full">

          {/* Text Content */}
          <div className="text-left max-w-6xl flex-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl mb-6">
              {displayedTitle || targetTitle}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-6xl" style={{ fontFamily: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}>
              {hero.subtitle}
            </p>
          </div>
        </div>

        {/* Bahamas Video - Centered on page */}
        <div className="flex justify-center items-center mt-8 w-full">
          <div className="relative w-[65rem] h-[26rem] md:w-[90rem] md:h-[36rem] mx-auto">
            <video
              src="/videos/bahamas-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Scroll Arrow */}
        <motion.button
          onClick={handleScrollClick}
          className="mt-8 p-4 text-muted-foreground hover:text-foreground transition-colors mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: 5 }}
          aria-label="Scroll to next section"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.button>
      </Container>
    </div>
  );
}