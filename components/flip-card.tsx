"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { RotateCcw } from "lucide-react"

interface FlipCardProps {
  frontTitle?: string
  frontContent: React.ReactNode
  backTitle?: string
  backContent: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  autoFlip?: boolean
  flipDelay?: number
}

export function FlipCard({
  frontTitle,
  frontContent,
  backTitle,
  backContent,
  className,
  size = "md",
  autoFlip = false,
  flipDelay = 3000,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Auto flip functionality
  useState(() => {
    if (autoFlip) {
      const timer = setTimeout(() => {
        setIsFlipped(true)
      }, flipDelay)
      return () => clearTimeout(timer)
    }
  })

  const sizeClasses = {
    sm: "h-32 w-48",
    md: "h-48 w-64",
    lg: "h-64 w-80"
  }

  return (
    <div 
      className={cn(
        "relative cursor-pointer perspective-1000",
        sizeClasses[size],
        className
      )}
      onClick={handleFlip}
    >
      {/* Card Container */}
      <div 
        className={cn(
          "relative w-full h-full transition-transform duration-700 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front Face */}
        <Card className={cn(
          "absolute inset-0 w-full h-full backface-hidden border-2 border-primary/20",
          "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20"
        )}>
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
            {frontTitle && (
              <h3 className="text-lg font-semibold text-foreground">
                {frontTitle}
              </h3>
            )}
            <div className="flex-1 flex items-center justify-center">
              {frontContent}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <RotateCcw className="h-3 w-3" />
              <span>Click to flip</span>
            </div>
          </CardContent>
        </Card>

        {/* Back Face */}
        <Card className={cn(
          "absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-2 border-green-500/20",
          "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20"
        )}>
          <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
            {backTitle && (
              <h3 className="text-lg font-semibold text-foreground">
                {backTitle}
              </h3>
            )}
            <div className="flex-1 flex items-center justify-center">
              {backContent}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <RotateCcw className="h-3 w-3" />
              <span>Click to flip back</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Preset flip cards for common learning scenarios
export function DefinitionFlipCard({ 
  term, 
  definition,
  className 
}: { 
  term: string
  definition: string
  className?: string 
}) {
  return (
    <FlipCard
      frontTitle="Term"
      frontContent={
        <div className="text-xl font-bold text-primary">
          {term}
        </div>
      }
      backTitle="Definition"
      backContent={
        <div className="text-sm leading-relaxed">
          {definition}
        </div>
      }
      className={className}
    />
  )
}

export function QuestionFlipCard({ 
  question, 
  answer,
  className 
}: { 
  question: string
  answer: string
  className?: string 
}) {
  return (
    <FlipCard
      frontTitle="Question"
      frontContent={
        <div className="text-sm leading-relaxed">
          {question}
        </div>
      }
      backTitle="Answer"
      backContent={
        <div className="text-sm leading-relaxed font-medium text-green-700 dark:text-green-300">
          {answer}
        </div>
      }
      className={className}
    />
  )
}

export function ConceptFlipCard({ 
  concept, 
  explanation,
  example,
  className 
}: { 
  concept: string
  explanation: string
  example?: string
  className?: string 
}) {
  return (
    <FlipCard
      frontTitle="Concept"
      frontContent={
        <div className="text-lg font-semibold text-primary">
          {concept}
        </div>
      }
      backTitle="Explanation"
      backContent={
        <div className="space-y-2">
          <div className="text-sm leading-relaxed">
            {explanation}
          </div>
          {example && (
            <div className="text-xs text-muted-foreground italic border-t pt-2">
              Example: {example}
            </div>
          )}
        </div>
      }
      className={className}
    />
  )
} 