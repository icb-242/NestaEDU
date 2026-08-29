"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface StickyNavProps {
  items: NavItem[];
  activeSection: string;
}

export function StickyNav({ items, activeSection }: StickyNavProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Get the element's position relative to the viewport
      const rect = element.getBoundingClientRect();
      
      // Calculate the total offset (header + nav + extra padding)
      const totalOffset = 160; // 96px header + 48px nav + 16px extra padding
      
      // Calculate the final scroll position
      // Using scrollY instead of pageYOffset for more accurate current scroll position
      const scrollPosition = window.scrollY + rect.top - totalOffset;
      
      // Scroll to position
      window.scrollTo({
        top: Math.max(0, scrollPosition), // Prevent negative scroll
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <nav className="flex items-center justify-center gap-8 h-12">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                text-sm transition-all relative px-3 py-1
                ${activeSection === item.id 
                  ? "text-foreground font-semibold bg-primary/5 rounded-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:rounded-md"}
              `}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
