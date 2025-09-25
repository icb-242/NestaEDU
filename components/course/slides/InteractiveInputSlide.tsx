"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InteractiveInputSlide } from "@/lib/course/types";

export function InteractiveInputSlideComponent({ slide, onComplete }: { slide: InteractiveInputSlide; onComplete?: () => void }) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      {slide.content && <p className="text-muted-foreground">{slide.content}</p>}
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={slide.placeholder ?? "Type here…"}
          rows={6}
          disabled={submitted}
        />
        <Button
          onClick={() => {
            setSubmitted(true);
            onComplete?.();
          }}
          disabled={!input.trim() || submitted}
        >
          Submit
        </Button>
      </div>
      {submitted && slide.feedback && (
        <div className="p-3 rounded-lg bg-emerald-100 text-emerald-700">
          {slide.feedback}
        </div>
      )}
    </div>
  );
}




