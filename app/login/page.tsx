"use client"

import Link from "next/link"
import { PenTool, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function PortalSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative font-mono">
      {/* Black and white grid background */}
      <div 
        className="absolute inset-0 -z-10" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: '#ffffff'
        }}
        aria-hidden="true"
      />

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

      <div className="w-full max-w-2xl">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <PenTool className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tighter">
              nesta education
            </h1>
          </div>
        </div>

        {/* Portal Selection */}
        <Card className="bg-white/80 backdrop-blur-sm border shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-mono text-muted-foreground mb-6">Begin Your Journey:</h2>

            {/* Student Portal */}
            <a 
              href="/auth/login"
              className="block p-4 rounded-lg border-2 border-muted hover:border-primary transition-colors mb-4 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1">👨‍🎓</span>
                <div>
                  <h3 className="text-xl font-bold tracking-tighter">Student Portal</h3>
                  <p className="text-sm font-mono text-muted-foreground mt-1">
                    An AI-powered learning platform built on Socratic teaching principles.
                  </p>
                </div>
              </div>
            </a>

            {/* Teacher Portal */}
            <div className="p-4 rounded-lg border-2 border-muted opacity-75">
              <div className="flex items-start gap-3">
                <span className="mt-1">👨‍🏫</span>
                <div>
                  <h3 className="text-xl font-bold tracking-tighter">Teacher Portal</h3>
                  <p className="text-sm font-mono text-muted-foreground mt-1">
                    Coming Soon!
                  </p>
                </div>
              </div>
            </div>

            {/* Powered by OpenAI */}
            <div className="text-center text-xs font-mono text-muted-foreground mt-6">
              Powered by OpenAI GPT-4α.
            </div>
          </CardContent>
        </Card>

        {/* Beta Disclaimer */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="text-center text-sm border rounded-lg p-4 bg-white/50 backdrop-blur-sm">
            <p className="mb-2 font-mono text-muted-foreground">⚠️ Beta Version Disclaimer ⚠️</p>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              This platform is currently in beta testing. Features, content, and
              performance are still being actively developed and improved. Users may
              occasionally encounter incomplete features, inaccuracies, or unexpected
              behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}