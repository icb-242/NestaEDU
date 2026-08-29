'use client';

import { useState, useEffect } from 'react';

interface TextDecodeProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export function TextDecode({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 1000 
}: TextDecodeProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      startDecode();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const startDecode = () => {
    const targetChars = text.split('');
    const totalChars = targetChars.length;
    let currentIndex = 0;
    
    // Start with random characters
    const initialText = targetChars.map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
    setDisplayText(initialText);

    const decodeInterval = setInterval(() => {
      if (currentIndex < totalChars) {
        // Replace characters one by one with target characters
        const newText = text.substring(0, currentIndex + 1) + 
                       targetChars.slice(currentIndex + 1).map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
        setDisplayText(newText);
        currentIndex++;
      } else {
        clearInterval(decodeInterval);
        setDisplayText(text);
        setIsComplete(true);
      }
    }, duration / totalChars);
  };

  return (
    <span className={`text-decode ${className}`}>
      {displayText}
    </span>
  );
}









