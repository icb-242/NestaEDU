"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PromptWorkbenchSlide } from "@/lib/course/types";

export function PromptWorkbenchSlideComponent({ slide, onComplete }: { slide: PromptWorkbenchSlide; onComplete?: () => void }) {
  const [prompt, setPrompt] = useState("");
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      <p className="text-muted-foreground">{slide.instructions}</p>
      <div className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={slide.inputLabel}
          rows={6}
        />
        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => setShowHints((s) => !s)}>
            {showHints ? "Hide Tips" : "Show Tips"}
          </Button>
          <Button
            onClick={() => {
              if (prompt.trim()) {
                localStorage.setItem(slide.saveKey, prompt);
                onComplete?.();
              }
            }}
            disabled={!prompt.trim()}
          >
            Save & Continue
          </Button>
        </div>
        <AnimatePresence>
          {showHints && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {slide.improvementHints.map((hint, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-sm text-muted-foreground">{hint}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}




