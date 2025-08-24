"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, CheckCircle, Lock, Trophy, Target, Brain, Users, Lightbulb } from "lucide-react"
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

export default function LearningPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

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
        topics: ["Emerging Technologies", "AI Careers", "Future Applications", "Preparing for AI"],
        icon: Lightbulb
      },
      {
        id: "ai-tools-students",
        title: "AI Tools for Students",
        description: "Practical AI tools that can help with studying and learning.",
        duration: "45 min",
        completed: false,
        locked: true,
        topics: ["Study Assistants", "Research Tools", "Writing Aids", "Learning Platforms"],
        icon: Target
      },
      {
        id: "ai-final-project",
        title: "Final Project & Assessment",
        description: "Apply your AI knowledge in a comprehensive final project.",
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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <Card className="border-2 border-primary/10 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <CardContent className="pt-6 pb-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Learning Center</h1>
            </div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Start your journey into the world of Technology & Artificial Intelligence!
            </p> 
            
            {/* Learning Features */}
            <div className="grid gap-3 md:grid-cols-3 max-w-4xl mx-auto mt-6">
              <div className="text-center space-y-1.5">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm">Interactive Content</h3>
                <p className="text-xs text-muted-foreground">
                  Flip cards, quizzes, and hands-on activities to reinforce learning
                </p>
              </div>
              <div className="text-center space-y-1.5">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm">Self-Paced Learning</h3>
                <p className="text-xs text-muted-foreground">
                  Learn at your own speed with progress tracking and flexible scheduling
                </p>
              </div>
              <div className="text-center space-y-1.5">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm">Achievement System</h3>
                <p className="text-xs text-muted-foreground">
                  Earn badges and track your progress as you master new concepts
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacer */}
      <div className="h-12"></div>

      {/* Course Overview Card */}
      <Link href="/student/learning/ai-fundamentals">
        <Card className="border-2 border-primary/20 cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/40">
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

            {/* View Course Button */}
            <div className="flex justify-center">
              <Button size="lg" className="px-8 pointer-events-none">
                View Course Modules
              </Button>
            </div>
          </div>
        </CardContent>
        </Card>
      </Link>
    </div>
  )
} 