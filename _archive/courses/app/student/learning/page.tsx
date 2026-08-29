"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Target, Trophy } from "lucide-react"

export default function LearningPage() {
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

      {/* Available Courses */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <a href="/student/courses/intro-to-ai" className="block">
          <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Beginner to Builder 🤖</h2>
                  <p className="text-muted-foreground mt-2">
                    A comprehensive introduction to Artificial Intelligence, from basic concepts to practical applications.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>6 Modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    <span>Self-paced</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  )
}