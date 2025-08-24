"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, ChevronLeft, ChevronRight, Brain, Clock, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import { FlipCard, DefinitionFlipCard, QuestionFlipCard, ConceptFlipCard } from "@/components/flip-card"

interface Section {
  id: string
  title: string
  type: "content" | "flipcards" | "quiz" | "reflection"
  content?: React.ReactNode
  flipCards?: Array<{
    type: "definition" | "question" | "concept"
    data: any
  }>
}

export default function IntroToAIModule() {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())

  // Framework for content injection - can be easily replaced with dynamic content
  const sections: Section[] = [
    {
      id: "introduction",
      title: "What is Artificial Intelligence?",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed">
              Artificial Intelligence (AI) is a branch of computer science that aims to create 
              machines capable of performing tasks that typically require human intelligence.
            </p>
            <p>
              These tasks include learning, reasoning, problem-solving, perception, and language 
              understanding. AI systems can analyze data, recognize patterns, and make decisions 
              with minimal human intervention.
            </p>
          </div>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Brain className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Key Insight</h3>
                  <p className="text-sm">
                    AI doesn't aim to replace human intelligence, but to augment and 
                    assist human capabilities in solving complex problems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: "definitions",
      title: "Key Terms and Concepts",
      type: "flipcards",
      flipCards: [
        {
          type: "definition",
          data: {
            term: "Artificial Intelligence",
            definition: "The simulation of human intelligence in machines that are programmed to think and learn like humans."
          }
        },
        {
          type: "definition",
          data: {
            term: "Machine Learning",
            definition: "A subset of AI that enables machines to learn automatically and improve from experience without being explicitly programmed."
          }
        },
        {
          type: "definition",
          data: {
            term: "Algorithm",
            definition: "A set of rules or instructions that a computer follows to solve a problem or complete a task."
          }
        },
        {
          type: "concept",
          data: {
            concept: "Neural Networks",
            explanation: "Computing systems inspired by biological neural networks that can learn and make decisions.",
            example: "Image recognition systems that can identify objects in photos"
          }
        }
      ]
    },
    {
      id: "history",
      title: "Brief History of AI",
      type: "content",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-lg">1950s - The Beginning</h3>
              <p className="text-muted-foreground">
                Alan Turing proposed the "Turing Test" and the term "Artificial Intelligence" 
                was coined at the Dartmouth Conference in 1956.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">1960s-1970s - Early Development</h3>
              <p className="text-muted-foreground">
                First AI programs were created, including ELIZA (a chatbot) and expert systems 
                for specific domains.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">1980s-1990s - Machine Learning Era</h3>
              <p className="text-muted-foreground">
                Focus shifted to machine learning algorithms and neural networks. 
                IBM's Deep Blue defeated chess world champion Garry Kasparov in 1997.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-lg">2000s-Present - Deep Learning Revolution</h3>
              <p className="text-muted-foreground">
                Breakthrough in deep learning, big data, and computing power led to 
                modern AI applications like virtual assistants, autonomous vehicles, and AI tutors.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "knowledge-check",
      title: "Knowledge Check",
      type: "flipcards",
      flipCards: [
        {
          type: "question",
          data: {
            question: "When was the term 'Artificial Intelligence' first coined?",
            answer: "The term was coined in 1956 at the Dartmouth Conference."
          }
        },
        {
          type: "question",
          data: {
            question: "What is the main goal of Artificial Intelligence?",
            answer: "To create machines capable of performing tasks that typically require human intelligence, such as learning, reasoning, and problem-solving."
          }
        },
        {
          type: "question",
          data: {
            question: "How does Machine Learning relate to AI?",
            answer: "Machine Learning is a subset of AI that enables machines to learn and improve from experience without being explicitly programmed."
          }
        }
      ]
    },
    {
      id: "reflection",
      title: "Reflection and Next Steps",
      type: "reflection",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                What You've Learned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>The definition and core purpose of Artificial Intelligence</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>Key terms including Machine Learning, Algorithms, and Neural Networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>The historical evolution of AI from the 1950s to present day</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>How AI aims to augment rather than replace human intelligence</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Ready for the Next Module?</h3>
              <p className="mb-4">
                Great job completing the introduction! Next, you'll explore how AI actually works 
                under the hood and learn about the fundamental concepts that make AI systems function.
              </p>
              <Link href="/student/learning/ai-fundamentals/how-ai-works">
                <Button className="w-full" size="lg">
                  Continue to "How AI Works"
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  const handleSectionComplete = () => {
    const currentSectionId = sections[currentSection].id
    setCompletedSections(prev => new Set(Array.from(prev).concat(currentSectionId)))
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const progress = ((currentSection + 1) / sections.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/student/learning">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Learning
          </Button>
        </Link>
        <Badge variant="outline">Module 1 of 8</Badge>
      </div>

      {/* Module Header */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl">Introduction to AI</CardTitle>
              <CardDescription className="text-base">
                Understanding the basics and history of Artificial Intelligence
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              30 min
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              5 sections
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{currentSection + 1} of {sections.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Section Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map((section, index) => (
          <Button
            key={section.id}
            variant={index === currentSection ? "default" : completedSections.has(section.id) ? "secondary" : "outline"}
            size="sm"
            onClick={() => setCurrentSection(index)}
            className="whitespace-nowrap"
          >
            {completedSections.has(section.id) && (
              <CheckCircle className="h-3 w-3 mr-1" />
            )}
            {index + 1}. {section.title}
          </Button>
        ))}
      </div>

      {/* Current Section Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {completedSections.has(sections[currentSection].id) && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
            {sections[currentSection].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sections[currentSection].type === "content" && sections[currentSection].content}
          
          {sections[currentSection].type === "flipcards" && (
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Click on each card to reveal the answer or explanation.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {sections[currentSection].flipCards?.map((card, index) => {
                  if (card.type === "definition") {
                    return (
                      <DefinitionFlipCard
                        key={index}
                        term={card.data.term}
                        definition={card.data.definition}
                        className="mx-auto"
                      />
                    )
                  } else if (card.type === "question") {
                    return (
                      <QuestionFlipCard
                        key={index}
                        question={card.data.question}
                        answer={card.data.answer}
                        className="mx-auto"
                      />
                    )
                  } else if (card.type === "concept") {
                    return (
                      <ConceptFlipCard
                        key={index}
                        concept={card.data.concept}
                        explanation={card.data.explanation}
                        example={card.data.example}
                        className="mx-auto"
                      />
                    )
                  }
                  return null
                })}
              </div>
            </div>
          )}

          {sections[currentSection].type === "reflection" && sections[currentSection].content}
        </CardContent>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Section {currentSection + 1} of {sections.length}
        </div>

        <Button
          onClick={handleSectionComplete}
          disabled={currentSection === sections.length - 1 && completedSections.has(sections[currentSection].id)}
        >
          {currentSection === sections.length - 1 ? "Complete Module" : "Next"}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
} 