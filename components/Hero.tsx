"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Container } from "./ui/Container";
import { siteContent } from "@/lib/siteContent";
import { useState } from "react";

export function Hero() {
  const { hero } = siteContent;
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      <Container className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl">
          {/* Logo */}
          <div className="w-48 h-48 md:w-64 md:h-64 relative flex-shrink-0 md:ml-8">
            <div className={`absolute inset-0 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src="/images/brand/nesta-logo.png"
                alt="Nesta Education Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 192px, 256px"
                onError={(e) => {
                  console.error('Error loading logo:', e);
                  setImageError(true);
                }}
                onLoad={() => {
                  console.log('Logo loaded successfully');
                  setImageLoaded(true);
                }}
              />
            </div>
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-muted rounded-full w-full h-full"></div>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {hero.subtitle}
            </p>
          </div>
        </div>

        {/* Scroll Arrow */}
        <motion.button
          onClick={handleScrollClick}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 p-4 text-muted-foreground hover:text-foreground transition-colors"
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