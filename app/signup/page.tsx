"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { Footer } from "@/components/Footer"
import { SignupForm } from "@/components/auth/SignupForm"
import { useState } from "react"

export default function SignupPage() {
  const [showSignup, setShowSignup] = useState(false)
  const [selectedPortal, setSelectedPortal] = useState<'student' | 'teacher' | null>(null)

  const handlePortalSelect = (portal: 'student' | 'teacher') => {
    if (portal === 'teacher') {
      // Teacher portal is not available yet
      return
    }
    setSelectedPortal(portal)
    setShowSignup(true)
  }

  const handleCloseSignup = () => {
    setShowSignup(false)
    setSelectedPortal(null)
  }

  return (
    <div className="min-h-screen flex flex-col font-mono">
      <div className="absolute inset-0 -z-10 bg-background" aria-hidden="true" />

      {/* Back Button - Positioned at the top left */}
      <div className="absolute top-4 left-4">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Theme Toggle Button - Positioned at the top right */}
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className="relative w-16 h-16">
                {/* Light mode logo */}
                <Image
                  src="/images/brand/nesta education 1-3.png"
                  alt="Nesta Education Logo"
                  fill
                  className="object-contain dark:opacity-0 dark:scale-0 transition-all duration-300"
                  sizes="64px"
                />
                {/* Dark mode logo */}
                <Image
                  src="/images/brand/nesta education 1-white.png"
                  alt="Nesta Education Logo"
                  fill
                  className="object-contain opacity-0 scale-0 dark:opacity-100 dark:scale-100 transition-all duration-300"
                  sizes="64px"
                />
              </div>
              <h1 className="text-2xl font-bold tracking-tighter">
                nesta education
              </h1>
            </div>
          </div>

        {/* Container that switches between Portal Selection and Signup Form */}
        <div className="w-full max-w-2xl transition-all duration-300 ease-in-out">
          {!showSignup ? (
            // Portal Selection
            <Card className="bg-card/80 backdrop-blur-sm border shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-mono text-muted-foreground mb-6">Create Your Account:</h2>

                {/* Student Portal */}
                <button 
                  onClick={() => handlePortalSelect('student')}
                  className="w-full text-left p-4 rounded-lg border-2 border-muted hover:border-primary transition-colors mb-4 cursor-pointer bg-card/50 hover:bg-card/80"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1">👨‍🎓</span>
                    <div>
                      <h3 className="text-xl font-bold tracking-tighter text-card-foreground">Student Portal</h3>
                      <p className="text-sm font-mono text-muted-foreground mt-1">
                        An AI-powered learning platform built on Socratic teaching principles.
                      </p>
                    </div>
                  </div>
                </button>

                {/* Teacher Portal */}
                <button 
                  onClick={() => handlePortalSelect('teacher')}
                  className="w-full text-left p-4 rounded-lg border-2 border-muted opacity-75 bg-card/30"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1">👨‍🏫</span>
                    <div>
                      <h3 className="text-xl font-bold tracking-tighter text-card-foreground">Teacher Portal</h3>
                      <p className="text-sm font-mono text-muted-foreground mt-1">
                        Coming Soon!
                      </p>
                    </div>
                  </div>
                </button>

                {/* Login Link */}
                <div className="text-center mt-6">
                  <p className="text-sm font-mono text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>

                {/* Powered by OpenAI */}
                <div className="text-center text-xs font-mono text-muted-foreground mt-4">
                  Powered by OpenAI GPT-4α.
                </div>
              </CardContent>
            </Card>
          ) : (
            // Signup Form (when a portal is selected)
            selectedPortal && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 flex justify-center">
                <SignupForm onClose={handleCloseSignup} portalType={selectedPortal} />
              </div>
            )
          )}
        </div>

      </div>
      </main>
      
      {/* Footer with border */}
      <footer className="mt-auto border-t">
        <Footer />
      </footer>
    </div>
  )
}




