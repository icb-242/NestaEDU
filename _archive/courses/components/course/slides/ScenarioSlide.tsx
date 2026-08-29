"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScenarioSlide } from "@/lib/course/types";

export function ScenarioSlideComponent({ slide, onComplete }: { slide: ScenarioSlide; onComplete?: () => void }) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (selectedChoice === slide.correctChoice) onComplete?.();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>{slide.scenario}</p>
      </div>
      <div className="space-y-2">
        {slide.choices.map((choice) => (
          <div
            key={choice.id}
            className={cn(
              "p-4 rounded-lg cursor-pointer transition-colors",
              selectedChoice === choice.id
                ? "bg-primary/20 ring-2 ring-primary"
                : "bg-secondary/20 hover:bg-secondary/30"
            )}
            onClick={() => !submitted && setSelectedChoice(choice.id)}
          >
            {choice.text}
          </div>
        ))}
      </div>
      {submitted && selectedChoice && (
        <div
          className={cn(
            "p-3 rounded-lg",
            selectedChoice === slide.correctChoice
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          )}
        >
          {slide.feedback[selectedChoice]}
        </div>
      )}
      <Button onClick={handleSubmit} disabled={!selectedChoice || submitted}>
        Submit Answer
      </Button>
    </div>
  );
}


















