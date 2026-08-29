"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuizSlide } from "@/lib/course/types";

export function QuizSlideComponent({ slide, onComplete, onSaveScore }: {
  slide: QuizSlide;
  onComplete?: () => void;
  onSaveScore?: (correct: number, total: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    
    // Calculate score
    let correct = 0;
    slide.questions.forEach(q => {
      const answer = answers[q.id];
      if (q.isMulti) {
        const selectedAnswers = (answer as string[]) || [];
        const correctAnswers = (q.answer as string[]);
        if (
          selectedAnswers.length === correctAnswers.length &&
          selectedAnswers.every(a => correctAnswers.includes(a))
        ) {
          correct++;
        }
      } else {
        if (answer === q.answer) correct++;
      }
    });

    const total = slide.questions.length;
    const passScore = slide.passScore ?? Math.ceil(0.7 * total);
    
    onSaveScore?.(correct, total);
    if (correct >= passScore) onComplete?.();
  };

  const toggleAnswer = (questionId: string, option: string) => {
    if (submitted) return;

    const question = slide.questions.find(q => q.id === questionId);
    if (!question) return;

    if (question.isMulti) {
      const current = (answers[questionId] as string[]) || [];
      const updated = current.includes(option)
        ? current.filter(a => a !== option)
        : [...current, option];
      setAnswers(prev => ({ ...prev, [questionId]: updated }));
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: option }));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      <ol className="list-decimal ml-4 space-y-8">
        {slide.questions.map((q) => {
          const answer = answers[q.id];
          const isCorrect = submitted && (
            q.isMulti
              ? JSON.stringify(answer) === JSON.stringify(q.answer)
              : answer === q.answer
          );

          return (
            <li key={q.id} className="space-y-3">
              <div className="font-medium">{q.q}</div>
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = q.isMulti
                    ? (answer as string[] || []).includes(opt)
                    : answer === opt;

                  return (
                    <div
                      key={opt}
                      className={cn(
                        "p-3 rounded-lg cursor-pointer transition-colors",
                        isSelected
                          ? "bg-primary/20 ring-2 ring-primary"
                          : "bg-secondary/20 hover:bg-secondary/30",
                        submitted && isSelected && (
                          isCorrect
                            ? "bg-emerald-100 text-emerald-700 ring-emerald-500"
                            : "bg-rose-100 text-rose-700 ring-rose-500"
                        )
                      )}
                      onClick={() => toggleAnswer(q.id, opt)}
                    >
                      {opt}
                    </div>
                  );
                })}
              </div>
              {submitted && q.explain && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {q.explain}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <Button
        onClick={handleSubmit}
        disabled={submitted || Object.keys(answers).length !== slide.questions.length}
      >
        Submit Quiz
      </Button>
    </div>
  );
}


















