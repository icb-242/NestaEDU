"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, CheckCircle, Lock, Trophy, Target, Brain, Users, Lightbulb, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Module {
  id: string
  title: string
  description: string
  duration: string
  completed: boolean
  locked: boolean
  topics: string[]
  icon: React.ElementType
}

interface Course {
  id: string
  title: string
  description: string
  totalModules: number
  completedModules: number
  estimatedTime: string
  level: "Beginner" | "Intermediate" | "Advanced"
  modules: Module[]
}

export default function AIFundamentalsCoursePage() {
  // AI Course Framework - Ready for content injection
  const aiCourse: Course = {
    id: "ai-fundamentals",
    title: "Beginner to Builder",
    description: "Comprehensive introduction to Technology & Artificial Intelligence. Designed specifically for students to learn how to build their own AI applications.",
    totalModules: 8,
    completedModules: 0,
    estimatedTime: "4-6 hours",
    level: "Beginner",
    modules: [
      {
        id: "intro-to-ai",
        title: "Introduction to AI",
        description: "What is Artificial Intelligence? Understanding the basics and history of AI.",
        duration: "30 min",
        completed: false,
        locked: false,
        topics: ["Definition of AI", "Brief History", "Types of AI", "AI vs Human Intelligence"],
        icon: Brain
      },
      {
        id: "how-ai-works",
        title: "How AI Works",
        description: "Explore the fundamental concepts behind how AI systems learn and make decisions.",
        duration: "45 min",
        completed: false,
        locked: true,
        topics: ["Machine Learning Basics", "Neural Networks", "Training Data", "Algorithms"],
        icon: Target
      },
      {
        id: "ai-in-daily-life",
        title: "AI in Daily Life",
        description: "Discover how AI is already part of your everyday experiences.",
        duration: "30 min",
        completed: false,
        locked: true,
        topics: ["Social Media", "Search Engines", "Voice Assistants", "Recommendations"],
        icon: Users
      },
      {
        id: "ai-in-education",
        title: "AI in Education",
        description: "Learn how AI is transforming education and learning experiences.",
        duration: "40 min",
        completed: false,
        locked: true,
        topics: ["Personalized Learning", "AI Tutors", "Adaptive Testing", "Educational Tools"],
        icon: BookOpen
      },
      {
        id: "ai-ethics",
        title: "AI Ethics & Responsibility",
        description: "Understanding the ethical considerations and responsible use of AI.",
        duration: "35 min",
        completed: false,
        locked: true,
        topics: ["Bias in AI", "Privacy Concerns", "Fair AI", "Responsible Development"],
        icon: Trophy
      },
      {
        id: "future-of-ai",
        title: "Future of AI",
        description: "Explore upcoming AI developments and their potential impact.",
        duration: "30 min",
        completed: false,
        locked: true,
        topics: ["Emerging Technologies", "Career Opportunities", "Societal Impact", "Predictions"],
        icon: Lightbulb
      },
      {
        id: "ai-tools-platforms",
        title: "AI Tools & Platforms",
        description: "Hands-on experience with popular AI tools and platforms available today.",
        duration: "50 min",
        completed: false,
        locked: true,
        topics: ["ChatGPT", "Image Generators", "Code Assistants", "Learning Platforms"],
        icon: Target
      },
      {
        id: "final-project",
        title: "Final Project",
        description: "Apply everything you've learned in a comprehensive final project.",
        duration: "60 min",
        completed: false,
        locked: true,
        topics: ["Project Planning", "AI Application Design", "Presentation", "Peer Review"],
        icon: Trophy
      }
    ]
  }

  const progressPercentage = (aiCourse.completedModules / aiCourse.totalModules) * 100

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-2">
        <Link href="/student/learning">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Learning Center
          </Button>
        </Link>
      </div>

      {/* Course Overview Header */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-xl">{aiCourse.title}</CardTitle>
              <Badge className={getLevelColor(aiCourse.level)}>
                {aiCourse.level}
              </Badge>
            </div>
            <CardDescription className="text-base">
              {aiCourse.description}
            </CardDescription>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{aiCourse.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{aiCourse.totalModules} modules</span>
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
                  {aiCourse.completedModules} of {aiCourse.totalModules} completed
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-center">
                <Badge variant="outline" className="mt-2">
                  {Math.round(progressPercentage)}% Complete
                </Badge>
              </div>
            </div>

            {/* Start Course Button */}
            <div className="flex justify-center">
              <Link href="/student/learning/ai-fundamentals/intro-to-ai">
                <Button size="lg" className="px-8">
                  {aiCourse.completedModules === 0 ? "Start Course" : "Continue Learning"}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-center">Course Modules</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2">
          {aiCourse.modules.map((module, index) => {
            const Icon = module.icon
            return (
              <Card 
                key={module.id} 
                className={`relative transition-all duration-200 ${
                  module.locked 
                    ? "opacity-60 bg-muted/50" 
                    : "hover:shadow-lg cursor-pointer"
                } ${module.completed ? "border-green-500 bg-green-50/50" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${
                        module.completed 
                          ? "bg-green-100 text-green-600" 
                          : module.locked 
                            ? "bg-gray-100 text-gray-400"
                            : "bg-primary/10 text-primary"
                      }`}>
                        {module.locked ? (
                          <Lock className="h-4 w-4" />
                        ) : module.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-base">
                          {index + 1}. {module.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {module.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-2 text-sm">
                    {module.description}
                  </CardDescription>
                  
                  {/* Topics Preview */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium">Topics covered:</span>
                    <div className="flex flex-wrap gap-1">
                      {module.topics.slice(0, 3).map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="text-xs py-0 px-1.5">
                          {topic}
                        </Badge>
                      ))}
                      {module.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs py-0 px-1.5">
                          +{module.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-3">
                    {module.locked ? (
                      <Button disabled variant="outline" className="w-full">
                        <Lock className="h-4 w-4 mr-2" />
                        Locked
                      </Button>
                    ) : module.completed ? (
                      <Link href={`/student/learning/ai-fundamentals/${module.id}`} className="block">
                        <Button variant="outline" className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/student/learning/ai-fundamentals/${module.id}`} className="block">
                        <Button className="w-full">
                          {index === 0 ? "Start Module" : "Begin Module"}
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
} 