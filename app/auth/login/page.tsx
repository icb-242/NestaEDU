"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

export default function StudentLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Clear any existing user data to prevent showing old cached data
      localStorage.removeItem("userProfile")
      localStorage.removeItem("userName")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("userRole")
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("userFirstName")
      
      // Store authentication data
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", data.user.email)
      localStorage.setItem("userRole", "student")
      localStorage.setItem("userName", `${data.user.firstName} ${data.user.lastName}`)
      
      // Save user profile data
      localStorage.setItem("userProfile", JSON.stringify(data.user))

      // Redirect to student dashboard
      router.push("/student/dashboard")
    } catch (error: any) {
      setError(error.message || "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Theme-aware grid background */}
      <div 
        className="absolute inset-0 -z-10 bg-background" 
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--sketch-line)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--sketch-line)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link 
          href="/login"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal Selection</span>
        </Link>
      </div>

      {/* Theme Toggle Button - Positioned at the top right */}
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/brand/nesta-logo-transparent.png"
                  alt="Nesta Education Logo"
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
            </Link>
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold tracking-tighter">
                nesta education
              </span>
            </Link>
          </div>
          <CardDescription className="font-mono text-sm text-muted-foreground">
            Student Portal Login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-sm text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-mono text-sm text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="font-mono"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-mono text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}