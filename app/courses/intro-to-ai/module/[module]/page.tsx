"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { getCourseById } from "@/lib/course/registry";
import { loadModuleProgress, markSlideComplete, saveQuizScore } from "@/lib/course/state";
import { SlideRenderer } from "@/components/course/SlideRenderer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ModulePlayerPage({ params }: { params: { module: string } }) {
  const moduleNumber = parseInt(params.module, 10);
  const course = getCourseById("intro-to-ai");
  const module = course?.modules.find(m => m.module === moduleNumber);

  const [lessonIndex, setLessonIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(() => loadModuleProgress(course?.id ?? "", moduleNumber));

  useEffect(() => {
    if (course?.id) {
      setProgress(loadModuleProgress(course.id, moduleNumber));
    }
  }, [course?.id, moduleNumber]);

  if (!course || !module) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <Link href="/courses/intro-to-ai">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              No module data yet. Check back soon!
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentLesson = module.lessons[lessonIndex];
  const currentSlide = currentLesson?.slides[slideIndex];
  const totalSlides = module.lessons.reduce((acc, l) => acc + l.slides.length, 0);
  const progressPercentage = Math.round((progress.completedSlideIds.length / totalSlides) * 100);

  const handleSlideComplete = (slideId: string) => {
    markSlideComplete(course.id, moduleNumber, slideId);
    setProgress(loadModuleProgress(course.id, moduleNumber));

    // Don't auto-advance anymore since we have navigation buttons
    // Let the user choose when to move forward
  };

  const handleQuizScore = (quizId: string, correct: number, total: number) => {
    saveQuizScore(course.id, moduleNumber, quizId, { correct, total });
    setProgress(loadModuleProgress(course.id, moduleNumber));
  };

  // Navigation functions
  const canGoBack = lessonIndex > 0 || slideIndex > 0;
  const canGoForward = lessonIndex < module.lessons.length - 1 || slideIndex < currentLesson.slides.length - 1;

  const goBack = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else if (lessonIndex > 0) {
      setLessonIndex(lessonIndex - 1);
      setSlideIndex(module.lessons[lessonIndex - 1].slides.length - 1);
    }
  };

  const goForward = () => {
    const currentSlideId = `${module.module}-${lessonIndex}-${slideIndex}`;
    const isCompleted = progress.completedSlideIds.includes(currentSlideId);
    const currentSlideObj = currentLesson.slides[slideIndex];
    
    // Only allow forward navigation if the slide is completed or doesn't require completion
    if (isCompleted || !currentSlideObj.requiresCompletion) {
      if (slideIndex < currentLesson.slides.length - 1) {
        setSlideIndex(slideIndex + 1);
      } else if (lessonIndex < module.lessons.length - 1) {
        setLessonIndex(lessonIndex + 1);
        setSlideIndex(0);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/courses/intro-to-ai">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
        </Link>
        <Badge variant="outline">Module {module.module} of {course.modules.length}</Badge>
      </div>

      {/* Module Header */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="space-y-3">
            <CardTitle className="text-2xl">{module.title}</CardTitle>
            <CardDescription className="text-base">{module.goal}</CardDescription>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {progress.completedSlideIds.length} of {totalSlides} completed
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Lesson & Slide Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Lesson {lessonIndex + 1}: {currentLesson.title}
        </div>
        <div className="text-sm text-muted-foreground">
          Slide {slideIndex + 1} of {currentLesson.slides.length}
        </div>
      </div>

      {/* Current Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${lessonIndex}-${slideIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <SlideRenderer
                courseId={course.id}
                module={module.module}
                lessonIndex={lessonIndex}
                slideIndex={slideIndex}
                slide={currentSlide}
                onComplete={handleSlideComplete}
                onSaveQuizScore={handleQuizScore}
              />
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={goBack}
          disabled={!canGoBack}
          className="w-[120px]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {/* Mini Progress */}
        <div className="flex gap-1">
          {currentLesson.slides.map((_, idx) => {
            const slideId = `${module.module}-${lessonIndex}-${idx}`;
            const isCompleted = progress.completedSlideIds.includes(slideId);
            const isCurrent = idx === slideIndex;

            return (
              <div
                key={idx}
                className={cn(
                  "w-2 h-2 rounded-full",
                  isCompleted ? "bg-primary" : "bg-muted",
                  isCurrent && "ring-2 ring-primary ring-offset-2"
                )}
              />
            );
          })}
        </div>

        <Button
          variant="outline"
          onClick={goForward}
          disabled={!canGoForward}
          className={cn(
            "w-[120px]",
            !progress.completedSlideIds.includes(`${module.module}-${lessonIndex}-${slideIndex}`) &&
            currentSlide.requiresCompletion &&
            "opacity-50 cursor-not-allowed"
          )}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Lesson Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {module.lessons.map((lesson, lIdx) => (
          <div key={lIdx} className="flex gap-1">
            {lesson.slides.map((slide, sIdx) => {
              const id = `${module.module}-${lIdx}-${sIdx}`;
              const isCurrent = lIdx === lessonIndex && sIdx === slideIndex;
              const isCompleted = progress.completedSlideIds.includes(id);
              const canAccess =
                lIdx < lessonIndex ||
                (lIdx === lessonIndex && sIdx <= slideIndex) ||
                isCompleted;

              return (
                <Button
                  key={id}
                  variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (canAccess) {
                      setLessonIndex(lIdx);
                      setSlideIndex(sIdx);
                    }
                  }}
                  className={cn(
                    "whitespace-nowrap",
                    !canAccess && "opacity-50 cursor-not-allowed",
                    isCurrent && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  {lIdx + 1}.{sIdx + 1}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}