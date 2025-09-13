"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChecklistSlide } from "@/lib/course/types";

export function ChecklistSlideComponent({ slide, onComplete }: { slide: ChecklistSlide; onComplete?: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (slide.requireAllChecked && checked.size === slide.items.length) onComplete?.();
  }, [checked, slide.items.length, slide.requireAllChecked, onComplete]);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      <div className="space-y-3">
        {slide.items.map((item, idx) => {
          const isChecked = checked.has(idx);
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-secondary/10 transition-colors cursor-pointer"
              onClick={() => {
                const next = new Set(checked);
                isChecked ? next.delete(idx) : next.add(idx);
                setChecked(next);
              }}
            >
              <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                isChecked
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-primary/20"
              )}>
                {isChecked && <CheckCircle className="h-3 w-3" />}
              </div>
              <span className="text-sm">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}



