"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen, 
  Brain, 
  Clock, 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle, 
  XCircle, 
  Play, 
  Calendar,
  Zap,
  Lightbulb,
  BarChart3,
  ArrowRight,
  Plus,
  MessageSquare,
  FlaskConical
} from "lucide-react"
import Link from "next/link"
import { capitalizeSubject, cn } from "@/lib/utils"
import { getSubjectDisplayName } from "@/lib/subjects"

interface ChatSession {
  id: string
  subject: string
  topic: string
  title: string
  last_message: string
  updated_at: string
  message_count: number
}

interface ExamResult {
  id: string
  subject: string
  score: number
  max_score: number
  total_questions: number
  percentage: number
  created_at: string
}

interface DashboardStats {
  learningSessions: number
  recentSessions: ChatSession[]
  practiceExams: number
  averageScore: number
  weeklyActivity: number[]
  subjectDistribution: { subject: string; count: number }[]
  examResults: ExamResult[]
  currentStreak: number
  lastSessionDate: string | null
  improvementTrend: 'up' | 'down' | 'stable'
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats & { examsThisWeek: number; sessionsThisWeek: number; weeklyChatActivity: number[]; weeklyExamActivity: number[] }>(
    {
      learningSessions: 0,
      recentSessions: [],
      practiceExams: 0,
      averageScore: 0,
      weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
      subjectDistribution: [],
      examResults: [],
      currentStreak: 0,
      lastSessionDate: null,
      improvementTrend: 'stable',
      examsThisWeek: 0,
      sessionsThisWeek: 0,
      weeklyChatActivity: [0, 0, 0, 0, 0, 0, 0],
      weeklyExamActivity: [0, 0, 0, 0, 0, 0, 0],
    }
  )
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userProfileLoaded, setUserProfileLoaded] = useState(false)
  const [dashboardDataLoaded, setDashboardDataLoaded] = useState(false)
  const [showAllExams, setShowAllExams] = useState(false)
  const router = useRouter()

  // Helper function to get the current week's date range (Sunday to Saturday)
  const getCurrentWeekRange = () => {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay()) // Sunday
    startOfWeek.setHours(0, 0, 0, 0)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6) // Saturday
    endOfWeek.setHours(23, 59, 59, 999)
    
    return { startOfWeek, endOfWeek }
  }

  // Helper function to format date range for display
  const getWeekRangeDisplay = () => {
    const { startOfWeek, endOfWeek } = getCurrentWeekRange()
    const formatDate = (date: Date) => {
      const month = date.toLocaleDateString('en-US', { month: 'long' })
      const day = date.getDate()
      const suffix = getDaySuffix(day)
      return { month, day, suffix }
    }
    const startDate = formatDate(startOfWeek)
    const endDate = formatDate(endOfWeek)
    return { startDate, endDate }
  }

  // Helper function to get day suffix (1st, 2nd, 3rd, etc.)
  const getDaySuffix = (day: number) => {
    if (day >= 11 && day <= 13) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  // Helper function to get day of week index (0 = Sunday, 6 = Saturday)
  const getDayOfWeekIndex = (date: Date) => {
    return date.getDay()
  }

  // Helper function to check if a date is within the current week
  const isDateInCurrentWeek = (date: Date) => {
    const { startOfWeek, endOfWeek } = getCurrentWeekRange()
    return date >= startOfWeek && date <= endOfWeek
  }

  useEffect(() => {
    // Always fetch user profile from API on load
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('/api/user/profile')
        if (res.ok) {
          const user = await res.json()

          setUserProfile(user)
          localStorage.setItem('userProfile', JSON.stringify(user))
        } else {
          const profile = localStorage.getItem('userProfile')
          if (profile) {
            setUserProfile(JSON.parse(profile))
          }
        }
      } catch {
        const profile = localStorage.getItem('userProfile')
        if (profile) {
          setUserProfile(JSON.parse(profile))
        }
      }
      setUserProfileLoaded(true)
    }
    fetchUserProfile()
  }, [])

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = (e: Event) => {
      const customEvent = e as CustomEvent
      setUserProfile(null)
      setTimeout(() => {
        setUserProfile(customEvent.detail)
        localStorage.setItem('userProfile', JSON.stringify(customEvent.detail))
      }, 10)
    }
    window.addEventListener("profileUpdated", handleProfileUpdate)
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate)
  }, [])



  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const chatRes = await fetch('/api/chat-sessions')
        let chatHistory: ChatSession[] = []
        if (chatRes.ok) {
          const sessions = await chatRes.json()
          chatHistory = sessions.map((session: any) => ({
            id: session.id,
            subject: session.subject,
            topic: session.topic || '',
            title: session.title || 'Conversation',
            last_message: session.last_message || '',
            updated_at: session.updated_at,
            message_count: session.message_count || 0,
          }))
          
          // Cache the sessions data for faster loading on subjects page
          sessionStorage.setItem('chatHistoryCache', JSON.stringify(chatHistory))
          sessionStorage.setItem('chatHistoryCacheTimestamp', Date.now().toString())
        }

        const examRes = await fetch('/api/exam-results')
        let examResults: ExamResult[] = []
        if (examRes.ok) {
          const results = await examRes.json()
          examResults = results.map((result: any) => ({
            id: result.id,
            subject: getSubjectDisplayName(result.subject), // Convert route parameter to display name
            score: result.score,
            max_score: result.max_score,
            percentage: result.percentage,
            total_questions: result.total_questions,
            time_spent: result.time_spent || 0,
            created_at: result.created_at,
          }))
        }

        const learningSessions = chatHistory.length
        const recentSessions = chatHistory
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 5)
        const practiceExams = examResults.length
        
        // Calculate average score
        let totalPercentage = 0
        let validExams = 0
        
        examResults.forEach((exam) => {
          const percentage = Number(exam.percentage)
          if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
            totalPercentage += percentage
            validExams++
          }
        })
        
        const averageScore = validExams > 0 ? Math.round(totalPercentage / validExams) : 0

        // Calculate weekly activity for current week (Sunday to Saturday)
        const weeklyChatActivity = Array(7).fill(0)
        const weeklyExamActivity = Array(7).fill(0)
        const { startOfWeek, endOfWeek } = getCurrentWeekRange()

        // Process chat sessions for current week
        chatHistory.forEach((session) => {
          try {
            const sessionDate = new Date(session.updated_at)
            if (isDateInCurrentWeek(sessionDate)) {
              const dayIndex = getDayOfWeekIndex(sessionDate)
              weeklyChatActivity[dayIndex]++
            }
          } catch {
            // Skip sessions with invalid dates
          }
        })

        // Process exam results for current week
        examResults.forEach((exam) => {
          try {
            const examDate = new Date(exam.created_at)
            if (isDateInCurrentWeek(examDate)) {
              const dayIndex = getDayOfWeekIndex(examDate)
              weeklyExamActivity[dayIndex]++
            }
          } catch {
            // Skip exams with invalid dates
          }
        })

        const subjectCount: { [key: string]: number } = {}
        chatHistory.forEach((session) => {
          if (session.subject) {
            subjectCount[session.subject] = (subjectCount[session.subject] || 0) + 1
          }
        })
        const subjectDistribution = Object.entries(subjectCount).map(([subject, count]) => ({
          subject,
          count,
        }))
        
        // Collect all unique days with activity (chat session or exam)
        const activityDates = new Set<string>()
        chatHistory.forEach((session) => {
          try {
            const d = new Date(session.updated_at)
            activityDates.add(d.toISOString().slice(0, 10))
          } catch (e) {}
        })
        examResults.forEach((exam) => {
          try {
            const d = new Date(exam.created_at)
            activityDates.add(d.toISOString().slice(0, 10))
          } catch (e) {}
        })
        
        let currentStreak = 0
        let lastSessionDate = null
        const sortedDates = Array.from(activityDates).sort().reverse()
        
        // If there's any activity, start with at least 1 day streak
        if (sortedDates.length > 0) {
          currentStreak = 1
          lastSessionDate = sortedDates[0]
          
          // Check for consecutive days starting from the second most recent day
          for (let i = 1; i < sortedDates.length; i++) {
            const currentDate = new Date(sortedDates[i])
            const expectedDate = new Date()
            expectedDate.setDate(expectedDate.getDate() - i)
            expectedDate.setHours(0, 0, 0, 0)
            
            if (currentDate.toISOString().slice(0, 10) === expectedDate.toISOString().slice(0, 10)) {
              currentStreak++
            } else {
              break
            }
          }
        }
        
        let improvementTrend: 'up' | 'down' | 'stable' = 'stable'
        if (chatHistory.length >= 4) {
          try {
            const now = new Date()
            const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
            const fourWeeksAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000)
            const recentSessions = chatHistory.filter(session => {
              try {
                return new Date(session.updated_at) >= twoWeeksAgo
              } catch (e) {
                return false
              }
            }).length
            const previousSessions = chatHistory.filter(session => {
              try {
                const sessionDate = new Date(session.updated_at)
                return sessionDate >= fourWeeksAgo && sessionDate < twoWeeksAgo
              } catch (e) {
                return false
              }
            }).length
            if (recentSessions > previousSessions) improvementTrend = 'up'
            else if (recentSessions < previousSessions) improvementTrend = 'down'
          } catch (e) {}
        }
        
        // Calculate number of practice exams taken this week
        const examsThisWeek = examResults.filter(exam => {
          try {
            const d = new Date(exam.created_at)
            return isDateInCurrentWeek(d)
          } catch {
            return false
          }
        }).length
        
        // Calculate number of chat sessions this week
        const sessionsThisWeek = chatHistory.filter(session => {
          try {
            const d = new Date(session.updated_at)
            return isDateInCurrentWeek(d)
          } catch {
            return false
          }
        }).length
        
        const finalStats = {
          learningSessions,
          recentSessions,
          practiceExams,
          averageScore,
          weeklyActivity: weeklyChatActivity,
          weeklyChatActivity,
          weeklyExamActivity,
          subjectDistribution,
          examResults,
          currentStreak,
          lastSessionDate,
          improvementTrend,
          examsThisWeek,
          sessionsThisWeek,
        }
        
        setStats(finalStats)
        setDashboardDataLoaded(true)
      } catch (error) {
        setStats({
          learningSessions: 0,
          recentSessions: [],
          practiceExams: 0,
          averageScore: 0,
          weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
          subjectDistribution: [],
          examResults: [],
          currentStreak: 0,
          lastSessionDate: null,
          improvementTrend: 'stable',
          examsThisWeek: 0,
          sessionsThisWeek: 0,
          weeklyChatActivity: [0, 0, 0, 0, 0, 0, 0],
          weeklyExamActivity: [0, 0, 0, 0, 0, 0, 0],
        })
        // Still set dashboard data as loaded even on error to prevent infinite loading
        setDashboardDataLoaded(true)
      }
    }

    // Initial data fetch
    fetchDashboardData()

    // Listen for chat session updates
    const handleChatSessionUpdate = () => {
      fetchDashboardData()
    }

    window.addEventListener("chatSessionUpdated", handleChatSessionUpdate)

    return () => {
      window.removeEventListener("chatSessionUpdated", handleChatSessionUpdate)
    }
  }, [router])

  useEffect(() => {
    if (userProfileLoaded && dashboardDataLoaded) {
      setIsLoading(false)
    }
  }, [userProfileLoaded, dashboardDataLoaded])

  useEffect(() => {
    if (userProfileLoaded && isLoading) {
      const timeout = setTimeout(() => {
        if (isLoading && !dashboardDataLoaded) {
          setIsLoading(false)
          setDashboardDataLoaded(true)
        }
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [userProfileLoaded, isLoading, dashboardDataLoaded])

  // Fallback timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false)
        setDashboardDataLoaded(true)
      }
    }, 5000)
    return () => clearTimeout(timeout)
  }, [isLoading])

  useEffect(() => {
    // Mobile viewport fix - ensure proper zoom on mobile
    const fixMobileViewport = () => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        // Force proper viewport on mobile
        const viewport = document.querySelector('meta[name="viewport"]')
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover')
        }
        
        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input, textarea, select')
        inputs.forEach(input => {
          input.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
              setTimeout(() => {
                window.scrollTo(0, 0)
              }, 100)
            }
          })
        })
      }
    }

    // Run viewport fix on mount
    fixMobileViewport()

    // Also run on window resize
    window.addEventListener('resize', fixMobileViewport)
    
    return () => {
      window.removeEventListener('resize', fixMobileViewport)
    }
  }, [])

  const getUserInitials = () => {
    if (userProfile?.firstName && userProfile?.lastName) {
      return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase()
    }
    return "YU"
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  const getStudentName = () => {
    if (userProfile?.firstName) {
      return userProfile.firstName
    }
    return "Student"
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />
    return <XCircle className="h-4 w-4 text-red-600" />
  }

  const getStreakMessage = () => {
    if (stats.currentStreak === 0) return "Start your learning streak today!"
    if (stats.currentStreak === 1) return "Let's get started!"
    if (stats.currentStreak < 7) return `${stats.currentStreak} day streak! You're building momentum!`
    if (stats.currentStreak < 30) return `${stats.currentStreak} day streak! You're on fire!`
    return `${stats.currentStreak} day streak! You're unstoppable!`
  }

  const getDaysSinceLastSession = () => {
    if (!stats.lastSessionDate) return null
    const lastSession = new Date(stats.lastSessionDate)
    const now = new Date()
    const daysDiff = Math.floor((now.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24))
    return daysDiff
  }

  // Helper function to format relative time
  const formatRelativeTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      const now = new Date()
      const diffInMs = now.getTime() - date.getTime()
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      if (diffInHours < 24) return `${diffInHours}h ago`
      if (diffInDays < 7) return `${diffInDays}d ago`
      return date.toLocaleDateString()
    } catch {
      return 'Unknown'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Header with Text */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-muted rounded-full animate-pulse"></div>
                <div>
                  <div className="h-6 w-48 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading Message */}
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-muted-foreground font-mono">
            <span className="text-sm">$ loading dashboard</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* Loading Metrics */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-12 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-3 w-16 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading Charts */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        </div>

        {/* Loading Recent Activity */}
        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2"></div>
            <div className="h-4 w-48 bg-muted rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-24 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 dashboard-page dashboard-container dashboard-scroll">
      {/* Welcome Header with Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-primary">{getUserInitials()}</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tighter">
                  {getGreeting()}, {userProfile?.firstName ? userProfile.firstName : "Student"}!
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">{getStreakMessage()}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0 justify-center sm:justify-end">
              <Link href="/student/tutor">
                <Button className="text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5 font-mono">
                  &gt; study
                </Button>
              </Link>
              <Link href="/student/practice-exam">
                <Button className="text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5 font-mono" variant="outline">
                  &gt; take exam
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume where you left off */}
      {stats.recentSessions.length > 0 && (
        <Link href={`/student/tutor?resume=${stats.recentSessions[0].id}`}>
          <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Play className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">// resume last session</p>
                    <p className="text-sm font-mono font-medium group-hover:text-primary transition-colors">
                      {stats.recentSessions[0].title}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>
      )}

      {/* Key Metrics - Focused on Learning Momentum */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow active:scale-95 md:active:scale-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-widest">streak</CardTitle>
            <Zap className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.currentStreak}</div>
            <p className="text-xs text-muted-foreground font-mono">
              {stats.currentStreak === 0 ? "// start today" : stats.currentStreak === 1 ? "// day in a row" : "// days in a row"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow active:scale-95 md:active:scale-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-widest">sessions / wk</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.sessionsThisWeek}</div>
            <p className="text-xs text-muted-foreground font-mono">
              // {stats.learningSessions} total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow active:scale-95 md:active:scale-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-widest">exams / wk</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.examsThisWeek}</div>
            <p className="text-xs text-muted-foreground font-mono">
              // {stats.practiceExams} total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow active:scale-95 md:active:scale-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-widest">avg. score</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground font-mono">
              // {stats.practiceExams} exams taken
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Sessions - Enhanced */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  &gt; recent_sessions
                </CardTitle>
                <CardDescription className="font-mono text-xs">// click to continue any conversation</CardDescription>
              </div>
              <Link href="/student/tutor">
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stats.recentSessions.length > 0 ? (
              <div className="space-y-3">
                {stats.recentSessions.map((session) => (
                  <Link key={session.id} href={`/student/tutor?resume=${session.id}`}>
                    <div className="flex items-center justify-between p-4 md:p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group active:bg-muted active:scale-98">
                      <div className="flex-1">
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{session.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {capitalizeSubject(session.subject)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{session.message_count} messages</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{formatRelativeTime(session.updated_at)}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-mono text-muted-foreground">&gt; no sessions found</p>
                <p className="text-xs font-mono text-muted-foreground mb-4">// try one of these to get started</p>
                
                <div className="space-y-3">
                  {/* Mathematics Example */}
                  <Link href="/student/tutor?subject=math&question=Solve%20for%20x%20in%20x%5E2%2B3%3D19">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start text-left h-auto p-3"
                    >
                      <div className="flex items-start gap-3">
                        <FlaskConical className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Mathematics</p>
                          <p className="text-xs text-muted-foreground">Solve for x in x²+3=19</p>
                        </div>
                      </div>
                    </Button>
                  </Link>

                  {/* Science Example */}
                  <Link href="/student/tutor?subject=science&question=How%20many%20carbons%20are%20in%20Glucose%3F">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start text-left h-auto p-3"
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Science</p>
                          <p className="text-xs text-muted-foreground">How many carbons are in Glucose?</p>
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>

                <div className="mt-4 flex justify-center">
                  <Link href="/student/tutor">
                    <Button size="sm" className="font-mono">
                      &gt; start studying
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exam Performance - Enhanced */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                  <Award className="h-4 w-4" />
                  &gt; exam_performance
                </CardTitle>
                <CardDescription className="font-mono text-xs">// your recent practice results</CardDescription>
              </div>
              <Link href="/student/practice-exam">
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stats.examResults.length > 0 ? (
              <div className="space-y-3">
                {(showAllExams ? stats.examResults : stats.examResults.slice(0, 4)).map((exam) => (
                  <Link 
                    key={exam.id} 
                    href={`/student/practice-exam?examId=${exam.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group active:bg-muted active:scale-98">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getScoreIcon(exam.percentage)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">{capitalizeSubject(exam.subject)}</p>
                          <p className="text-xs text-muted-foreground">
                            {exam.score}/{exam.max_score} points
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <span className={`font-bold text-sm ${getScoreColor(exam.percentage)}`}>{exam.percentage}%</span>
                        <p className="text-xs text-muted-foreground">{new Date(exam.created_at).toLocaleDateString()}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                    </div>
                  </Link>
                ))}
                {stats.examResults.length > 4 && (
                  <div className="text-center pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAllExams(!showAllExams)}
                    >
                      {showAllExams ? `Show Less` : `View All (${stats.examResults.length})`}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-mono text-muted-foreground">&gt; no exams found</p>
                <p className="text-xs font-mono text-muted-foreground">// test your knowledge</p>
                <Link href="/student/practice-exam">
                  <Button variant="outline" size="sm" className="mt-2 font-mono">
                    &gt; take first exam
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Graph */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            &gt; activity_this_week
          </CardTitle>
          <CardDescription className="font-mono text-xs">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded mr-1 align-middle"></span> sessions
            <span className="inline-block w-3 h-3 bg-purple-500 rounded ml-4 mr-1 align-middle"></span> exams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-24 w-full">
            {(() => {
              // Get the dates for the current week (Sunday to Saturday)
              const { startOfWeek } = getCurrentWeekRange();
              const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              return days.map((day, i) => {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                const label = `${day} (${date.getMonth() + 1}/${date.getDate()})`;
                return (
                  <div key={i} className="flex flex-col items-center flex-1 min-w-0">
                    {/* Stacked bar: chat (bottom, blue), exam (top, purple) */}
                    <div className="flex flex-col-reverse h-20 w-full">
                      <div
                        className="bg-blue-500 rounded-t"
                        style={{ height: `${(stats.weeklyChatActivity?.[i] || 0) * 12}px`, minHeight: 2 }}
                        title={`Learning Sessions: ${stats.weeklyChatActivity?.[i] || 0}`}
                      />
                      <div
                        className="bg-purple-500 rounded-b"
                        style={{ height: `${(stats.weeklyExamActivity?.[i] || 0) * 12}px`, minHeight: 2 }}
                        title={`Practice Exams: ${stats.weeklyExamActivity?.[i] || 0}`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 truncate flex flex-col items-center">
                      <span className="block sm:inline">{day}</span>
                      <span className="block sm:inline">{date.getMonth() + 1}/{date.getDate()}</span>
                    </span>
                  </div>
                );
              });
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
