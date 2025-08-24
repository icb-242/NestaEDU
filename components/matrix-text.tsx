"use client"

import { useState, useEffect } from "react"

interface MatrixTextProps {
  text: string
  className?: string
}

export function MatrixText({ text, className = "" }: MatrixTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isAnimating, setIsAnimating] = useState(true)

  // Matrix-style characters for scrambling
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

  useEffect(() => {
    let iteration = 0
    const targetText = text
    const animationSpeed = 15 // milliseconds between updates
    const revealDelay = 5 // iterations before starting to reveal each character

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            // Skip spaces and angle brackets - keep them as-is
            if (char === " " || char === "<" || char === ">") {
              return char
            }

            // Calculate when this character should start revealing (left to right)
            const revealStart = index * revealDelay

            // If we haven't reached the reveal point for this character, show random
            if (iteration < revealStart) {
              return matrixChars[Math.floor(Math.random() * matrixChars.length)]
            }

            // If we're in the revealing phase, gradually settle on the correct character
            if (iteration < revealStart + 8) {
              return Math.random() < 0.8
                ? char
                : matrixChars[Math.floor(Math.random() * matrixChars.length)]
            }

            // Character is fully revealed
            return char
          })
          .join("")
      )

      iteration++

      // Stop animation when all characters are revealed
      if (iteration >= targetText.length * revealDelay + 12) {
        setDisplayText(targetText)
        setIsAnimating(false)
        clearInterval(interval)
      }
    }, animationSpeed)

    return () => clearInterval(interval)
  }, [text])

  return (
    <span className={className}>
      {displayText || text}
    </span>
  )
} 