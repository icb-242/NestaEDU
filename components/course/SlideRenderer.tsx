"use client";

import { Slide } from "@/lib/course/types";
import {
  HeroSlide,
  CarouselSlide,
  HotspotSlide,
  FlipCardSlide,
  DiagramSlide,
  ChartPlaygroundSlide,
  TimelineSlide,
  DragDropSlide,
  ScenarioSlide,
  InteractiveInputSlide,
  PromptWorkbenchSlide,
  ReflectionSlide,
  ChecklistSlide,
  QuizSlide,
} from "./slides";

interface SlideRendererProps {
  courseId: string;
  module: number;
  lessonIndex: number;
  slideIndex: number;
  slide: Slide;
  onComplete?: (slideId: string) => void;
  onSaveQuizScore?: (quizId: string, correct: number, total: number) => void;
}

export function SlideRenderer({
  courseId,
  module,
  lessonIndex,
  slideIndex,
  slide,
  onComplete,
  onSaveQuizScore,
}: SlideRendererProps) {
  const handleComplete = () => {
    const slideId = `${module}-${lessonIndex}-${slideIndex}`;
    onComplete?.(slideId);
  };

  const handleQuizScore = (correct: number, total: number) => {
    const quizId = `${lessonIndex}-${slideIndex}`;
    onSaveQuizScore?.(quizId, correct, total);
  };

  switch (slide.type) {
    case "hero":
      return <HeroSlide slide={slide} />;
    case "carousel":
      return <CarouselSlide slide={slide} onComplete={handleComplete} />;
    case "hotspot":
      return <HotspotSlide slide={slide} onComplete={handleComplete} />;
    case "flipcard":
      return <FlipCardSlide slide={slide} onComplete={handleComplete} />;
    case "diagram":
      return <DiagramSlide slide={slide} onComplete={handleComplete} />;
    case "chart-playground":
      return <ChartPlaygroundSlide slide={slide} onComplete={handleComplete} />;
    case "timeline":
      return <TimelineSlide slide={slide} onComplete={handleComplete} />;
    case "drag-drop":
      return <DragDropSlide slide={slide} onComplete={handleComplete} />;
    case "scenario":
      return <ScenarioSlide slide={slide} onComplete={handleComplete} />;
    case "interactive-input":
      return <InteractiveInputSlide slide={slide} onComplete={handleComplete} />;
    case "prompt-workbench":
      return <PromptWorkbenchSlide slide={slide} onComplete={handleComplete} />;
    case "reflection":
      return <ReflectionSlide slide={slide} onComplete={handleComplete} />;
    case "checklist":
      return <ChecklistSlide slide={slide} onComplete={handleComplete} />;
    case "quiz":
      return (
        <QuizSlide
          slide={slide}
          onComplete={handleComplete}
          onSaveScore={handleQuizScore}
        />
      );
    default:
      return (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          Unknown slide type: {slide.type}
        </div>
      );
  }
}



