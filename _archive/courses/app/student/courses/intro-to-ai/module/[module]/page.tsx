"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  const [progress, setProgress] = useState({ completedSlideIds: [] });
  const [isClient, setIsClient] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Default to collapsed for safety

  // Load progress and sidebar state
  useEffect(() => {
    setIsClient(true);
    if (course?.id) {
      setProgress(loadModuleProgress(course.id, moduleNumber));
    }
    
    // Check sidebar state from localStorage
    const savedSidebarState = localStorage.getItem("sidebarCollapsed");
    if (savedSidebarState) {
      try {
        setSidebarCollapsed(JSON.parse(savedSidebarState));
      } catch (e) {
        setSidebarCollapsed(false); // Default to not collapsed if parse fails
      }
    } else {
      setSidebarCollapsed(false); // Default to not collapsed
    }
    
    // Listen for sidebar state changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sidebarCollapsed" && e.newValue) {
        try {
          setSidebarCollapsed(JSON.parse(e.newValue));
        } catch {
          // Ignore invalid sidebar state
        }
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [course?.id, moduleNumber]);

  // Keyboard navigation support
  useEffect(() => {
    if (!module) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentLesson = module.lessons[lessonIndex];
      if (!currentLesson) return;
      
      const currentSlide = currentLesson.slides[slideIndex];
      if (!currentSlide) return;
      
      // Check if we can go back
      const canNavigateBack = lessonIndex > 0 || slideIndex > 0;
      
      // Check if we can go forward
      const canNavigateForward = lessonIndex < module.lessons.length - 1 || 
                                 slideIndex < currentLesson.slides.length - 1;
      
      if (e.key === "ArrowLeft" && canNavigateBack) {
        // Go back logic
        if (slideIndex > 0) {
          setSlideIndex(slideIndex - 1);
        } else if (lessonIndex > 0) {
          setLessonIndex(lessonIndex - 1);
          setSlideIndex(module.lessons[lessonIndex - 1].slides.length - 1);
        }
      } else if (e.key === "ArrowRight") {
        const currentSlideId = `${module.module}-${lessonIndex}-${slideIndex}`;
        const isCompleted = progress.completedSlideIds.includes(currentSlideId);
        const slideRequiresCompletion = currentSlide.requiresCompletion;
        if (canNavigateForward && (isCompleted || !slideRequiresCompletion)) {
          // Go forward logic
          if (slideIndex < currentLesson.slides.length - 1) {
            setSlideIndex(slideIndex + 1);
          } else if (lessonIndex < module.lessons.length - 1) {
            setLessonIndex(lessonIndex + 1);
            setSlideIndex(0);
          }
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [module, lessonIndex, slideIndex, progress]);

  if (!course || !module) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <Link href="/student/courses/intro-to-ai">
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
    
    // Auto-advance for hero slides
    if (currentSlide?.type === 'hero') {
      setTimeout(() => {
        goForward();
      }, 300); // Small delay for smooth transition
    }
  };

  const handleQuizScore = (quizId: string, correct: number, total: number) => {
    saveQuizScore(course.id, moduleNumber, quizId, { correct, total });
    setProgress(loadModuleProgress(course.id, moduleNumber));
  };

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
        <Link href="/student/courses/intro-to-ai">
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

      {/* Lesson Tabs Navigation */}
      <TooltipProvider>
        <div className="border rounded-lg bg-card">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-2 border-b overflow-x-auto">
            {module.lessons.map((lesson, lIdx) => {
              const lessonSlides = lesson.slides.length;
              const lessonCompletedSlides = lesson.slides.filter((_, sIdx) => {
                const id = `${module.module}-${lIdx}-${sIdx}`;
                return progress.completedSlideIds.includes(id);
              }).length;
              const isCurrentLesson = lIdx === lessonIndex;
              const isLessonComplete = lessonCompletedSlides === lessonSlides;
              
              return (
                <Tooltip key={lIdx}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        setLessonIndex(lIdx);
                        setSlideIndex(0);
                      }}
                      className={cn(
                        "flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                        isCurrentLesson
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : isLessonComplete
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {isLessonComplete && <span className="text-xs">✓</span>}
                        <span>Lesson {lIdx + 1}</span>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-center">
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {lessonCompletedSlides}/{lessonSlides} slides completed
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

        {/* Current Lesson Info & Slide Progress */}
        <div className="p-4 space-y-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Module {module.module}</span>
            <span className="text-muted-foreground">›</span>
            <span className="font-medium text-foreground">
              Lesson {lessonIndex + 1}: {currentLesson.title}
            </span>
            <span className="text-muted-foreground">›</span>
            <span className="text-muted-foreground">
              Slide {slideIndex + 1} of {currentLesson.slides.length}
            </span>
          </div>

          {/* Slide Progress Dots */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-2">Progress:</span>
            {currentLesson.slides.map((_, sIdx) => {
              const slideId = `${module.module}-${lessonIndex}-${sIdx}`;
              const isCompleted = progress.completedSlideIds.includes(slideId);
              const isCurrent = sIdx === slideIndex;
              
              return (
                <button
                  key={sIdx}
                  onClick={() => {
                    if (sIdx <= slideIndex || isCompleted) {
                      setSlideIndex(sIdx);
                    }
                  }}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                    isCurrent
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 scale-110"
                      : isCompleted
                      ? "bg-green-500 text-white hover:scale-105"
                      : "bg-muted text-muted-foreground",
                    (sIdx <= slideIndex || isCompleted) ? "cursor-pointer" : "opacity-40 cursor-not-allowed"
                  )}
                  disabled={sIdx > slideIndex && !isCompleted}
                >
                  {isCompleted && !isCurrent ? "✓" : sIdx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      </TooltipProvider>

      {/* Current Slide with Side Navigation */}
      <div className="relative">
        {/* Left Arrow - Outside Card */}
        {canGoBack && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0
            }}
            whileHover={{ scale: 1.2, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
            className="absolute -left-20 top-1/2 -translate-y-1/2 z-20 text-primary/40 hover:text-primary transition-all duration-300"
            style={{
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))"
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-16 w-16" strokeWidth={2} />
          </motion.button>
        )}

        {/* Right Arrow - Outside Card */}
        {canGoForward && !(!progress.completedSlideIds.includes(`${module.module}-${lessonIndex}-${slideIndex}`) && currentSlide.requiresCompletion) && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.2, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={goForward}
            className="absolute -right-20 top-1/2 -translate-y-1/2 z-20 text-primary/40 hover:text-primary transition-all duration-300"
            style={{
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))"
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="h-16 w-16" strokeWidth={2} />
          </motion.button>
        )}

        {/* Slide Content */}
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
      </div>

    </div>
  );
}
