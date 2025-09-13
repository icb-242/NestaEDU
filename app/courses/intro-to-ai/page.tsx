"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ChevronLeft } from "lucide-react";
import { getCourseById } from "@/lib/course/registry";
import { loadModuleProgress } from "@/lib/course/state";

export default function CourseOverviewPage() {
  const course = getCourseById("intro-to-ai");
  if (!course) return null;

  // Calculate overall progress
  const totalSlides = course.modules.reduce((acc, module) => {
    return acc + module.lessons.reduce((lessonAcc, lesson) => {
      return lessonAcc + lesson.slides.length;
    }, 0);
  }, 0);

  const completedSlides = course.modules.reduce((acc, module) => {
    const progress = loadModuleProgress(course.id, module.module);
    return acc + progress.completedSlideIds.length;
  }, 0);

  const progressPercentage = Math.round((completedSlides / totalSlides) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Back Button */}
      <div>
        <Link href="/student/learning">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Learning Center
          </Button>
        </Link>
      </div>

      {/* Course Header */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-2xl">{course.title}</CardTitle>
              <Badge className="bg-green-100 text-green-800">
                New
              </Badge>
            </div>
            <CardDescription className="text-base">
              {course.description}
            </CardDescription>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{course.modules.length} modules</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{totalSlides} lessons</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedSlides} of {totalSlides} completed
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-center">
                <Badge variant="outline" className="mt-2">
                  {progressPercentage}% Complete
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Course Modules</h2>
        <div className="grid gap-4">
          {course.modules.map((module) => (
            <Link key={module.module} href={`/courses/intro-to-ai/module/${module.module}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {module.module}. {module.title}
                      </CardTitle>
                      <Badge variant="outline">{module.duration}</Badge>
                    </div>
                    <CardDescription>{module.goal}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Module Progress */}
                    {module.lessons.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{module.lessons.length} lessons</span>
                          <span className="text-muted-foreground">
                            {loadModuleProgress(course.id, module.module).completedSlideIds.length} completed
                          </span>
                        </div>
                        <Progress
                          value={
                            (loadModuleProgress(course.id, module.module).completedSlideIds.length /
                              module.lessons.reduce((acc, l) => acc + l.slides.length, 0)) *
                            100
                          }
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}



