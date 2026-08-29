"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { ContentSlide } from "@/lib/course/types";

export function ContentSlideComponent({ slide, onComplete }: { slide: ContentSlide; onComplete?: () => void }) {
  // Auto-advance after 5 seconds for content slides
  useEffect(() => {
    if (slide.requiresCompletion) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [slide.requiresCompletion, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-gray-900 dark:text-gray-100"
      >
        {slide.heading}
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="prose prose-lg dark:prose-invert max-w-none"
      >
        {slide.content.split('\n\n').map((paragraph, index) => {
          // Handle horizontal rules
          if (paragraph.trim() === '---') {
            return <hr key={index} className="my-6 border-gray-300 dark:border-gray-600" />;
          }
          
          // Handle bullet lists
          if (paragraph.trim().startsWith('•')) {
            const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
            return (
              <ul key={index} className="space-y-2 my-4">
                {items.map((item, i) => (
                  <li key={i} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {item.replace('•', '').trim().split('**').map((part, j) => 
                      j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                    )}
                  </li>
                ))}
              </ul>
            );
          }
          
          // Handle markdown tables
          if (paragraph.includes('|') && paragraph.split('\n').length > 2) {
            const lines = paragraph.split('\n').filter(line => line.trim());
            const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
            const rows = lines.slice(2).map(line => 
              line.split('|').map(cell => cell.trim()).filter(Boolean)
            );
            
            return (
              <div key={index} className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      {headers.map((header, i) => (
                        <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {header.split('**').map((part, j) => 
                            j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {rows.map((row, i) => (
                      <tr key={i} className="bg-white dark:bg-gray-900">
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {cell.replace(/"/g, '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          
          // Regular paragraphs with bold and italic support
          return (
            <p key={index} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {paragraph.split('**').map((part, i) => {
                if (i % 2 === 0) {
                  // Handle italic within non-bold text
                  return part.split('*').map((subpart, j) => 
                    j % 2 === 0 ? subpart : <em key={`${i}-${j}`}>{subpart}</em>
                  );
                } else {
                  // Bold text
                  return <strong key={i}>{part}</strong>;
                }
              })}
            </p>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
