"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReflectionSlide } from "@/lib/course/types";

export function ReflectionSlideComponent({ slide, onComplete }: { slide: ReflectionSlide; onComplete?: () => void }) {
  const [reflection, setReflection] = useState("");

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      <p className="text-muted-foreground">{slide.prompt}</p>
      <div className="space-y-4">
        <Textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Type your reflection here..."
          rows={6}
        />
        <div className="flex justify-end">
          <Button
            onClick={() => {
              if (reflection.trim()) {
                localStorage.setItem(slide.saveKey, reflection);
                onComplete?.();
              }
            }}
            disabled={!reflection.trim()}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}




