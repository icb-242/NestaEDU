import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { getAIModel } from "@/lib/ai"

export async function POST(request: NextRequest) {
  try {
    const { examData, answers } = await request.json()

    if (!examData || !answers) {
      return NextResponse.json({ error: "Exam data and answers are required" }, { status: 400 })
    }

    try {
      const prompt = `Grade this exam quickly. Write feedback directly TO the student (use "you", not "the student").

EXAM: ${examData.title} (${examData.questions.length} questions, ${examData.totalPoints} points)

QUESTIONS:
${examData.questions
  .map((q: any, index: number) => {
    const userAnswer = answers[q.id] || "No answer"
    return `Q${index + 1}(${q.points}pts): ${q.type} - "${q.question}" | Correct: "${q.correctAnswer}" | Student: "${userAnswer}"`
  })
  .join("\n")}

RULES: Multiple choice = exact match gets full points. Short answer = partial credit for length/quality. Be encouraging.

Return ONLY this JSON:
{
  "totalScore": number,
  "maxScore": ${examData.totalPoints},
  "percentage": number,
  "feedback": "Brief encouraging feedback to student",
  "questionResults": [
    {
      "questionId": number,
      "userAnswer": "answer",
      "isCorrect": boolean,
      "pointsEarned": number,
      "maxPoints": number,
      "feedback": "Brief feedback to student",
      "correctAnswer": "correct answer"
    }
  ]
}`

      // Add timeout for grading (15 seconds max)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Grading timeout')), 15000)
      )

      const gradingPromise = generateText({
        model: getAIModel('gpt-4o-mini'),
        prompt,
        temperature: 0.1,
        maxTokens: 1500,
      })

      const result = await Promise.race([gradingPromise, timeoutPromise]) as any
      const { text } = result

      // Clean the response to ensure it's valid JSON
      let cleanedText = text.trim()
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/```json\n?/, "").replace(/\n?```$/, "")
      }
      if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/```\n?/, "").replace(/\n?```$/, "")
      }

      let gradingResults
      try {
        gradingResults = JSON.parse(cleanedText)
      } catch {
        throw new Error("AI response was not valid JSON")
      }

      // Validate the grading structure
      if (!gradingResults.questionResults || !Array.isArray(gradingResults.questionResults)) {
        throw new Error("Invalid grading structure - missing questionResults array")
      }

      return NextResponse.json(gradingResults)
    } catch (aiError) {
      // Check if it's a timeout error
      const isTimeout = aiError instanceof Error && aiError.message === 'Grading timeout'
      
      // Return enhanced fallback grading
      const fallbackGrading = generateFallbackGrading(examData, answers)
      return NextResponse.json({
        ...fallbackGrading,
        isMock: true,
        mockMessage: isTimeout
          ? "Using automated grading - grading took too long"
          : "Using automated grading - AI grading failed",
      })
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to grade exam",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

function generateFallbackGrading(examData: any, answers: any) {
  let totalScore = 0
  const questionResults = []

  for (const question of examData.questions) {
    const userAnswer = answers[question.id] || ""
    let pointsEarned = 0
    let isCorrect = false

    if (question.type === "multiple-choice") {
      isCorrect = userAnswer.trim().toLowerCase() === question.correctAnswer?.trim().toLowerCase()
      pointsEarned = isCorrect ? question.points : 0
    } else {
      // For short answer, give partial credit based on answer length and presence
      if (userAnswer.trim().length > 10) {
        pointsEarned = Math.round(question.points * 0.7) // 70% credit for substantial answers
        isCorrect = true
      } else if (userAnswer.trim().length > 0) {
        pointsEarned = Math.round(question.points * 0.3) // 30% credit for minimal answers
      }
    }

    totalScore += pointsEarned

    questionResults.push({
      questionId: question.id,
      userAnswer: userAnswer || "No answer provided",
      isCorrect,
      pointsEarned,
      maxPoints: question.points,
      feedback: isCorrect
        ? "Great job! You demonstrated a good understanding of this concept."
        : "You can improve on this question. Review the topic and try again for better results.",
      correctAnswer: question.correctAnswer,
    })
  }

  const percentage = Math.round((totalScore / examData.totalPoints) * 100)

  return {
    totalScore,
    maxScore: examData.totalPoints,
    percentage,
    feedback: `You scored ${totalScore} out of ${examData.totalPoints} points (${percentage}%). ${
      percentage >= 80
        ? "Excellent work! You have a strong understanding of the material."
        : percentage >= 60
          ? "Good effort! Review the areas where you lost points to improve further."
          : "Keep studying! Focus on understanding the fundamental concepts to improve your score."
    }`,
    questionResults,
  }
}
