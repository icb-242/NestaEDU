"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

// (Removed) Web Speech API declarations and dictation features

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, ImageIcon, CalculatorIcon, Sigma, Bot, Loader2, X, BookOpen, FlaskConical, ArrowRight, MessageSquare, Clock, Trash2, Mic, MicOff } from "lucide-react"

// Web Speech API type declarations
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}
import { MathKeyboard } from "@/components/math-keyboard"
import { capitalizeSubject } from "@/lib/utils"
import { Calculator } from "@/components/calculator"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams, useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  image?: string
}

interface ChatSession {
  id: string
  subject: string
  topic: string
  title: string
  last_message: string
  updated_at: string
  message_count: number
  messages?: Message[]
}

export default function AITutorPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') === 'chat-history' ? 'chat-history' : 'new-chat'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [showMathKeyboard, setShowMathKeyboard] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("general")
  const [subjectChosen, setSubjectChosen] = useState(false)
  const [isLoadingSession, setIsLoadingSession] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<any>({})
  const [isRecording, setIsRecording] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [interimTranscript, setInterimTranscript] = useState("")
  const [waveformHeights, setWaveformHeights] = useState(Array(16).fill(2))
  
  // Audio analysis refs
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Chat History state
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([])
  const [historyActiveTab, setHistoryActiveTab] = useState("math")
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const fileInputRef = useRef<HTMLInputElement>(null)
  // (Removed) Audio and waveform refs
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const questionPrefilledRef = useRef(false)
  const { toast } = useToast()
  const router = useRouter()

  const { messages, input, setInput, handleSubmit, isLoading, append, setMessages } = useChat({
    api: "/api/chat",
    body: {
      subject: selectedSubject,
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Initialize speech recognition after useChat hook
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsRecording(true)
        toast({
          title: "Voice Recording Started",
          description: "Speak now to dictate your message...",
        })
      }

      recognition.onresult = (event) => {
        let finalTranscript = ""
        let interimText = ""
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimText += event.results[i][0].transcript
          }
        }
        
        // Update interim transcript for real-time display
        setInterimTranscript(interimText)
        
        // Add final transcript to input
        if (finalTranscript) {
          setInput((prev) => prev + " " + finalTranscript.trim())
          setInterimTranscript("") // Clear interim text when we have final text
        }
      }

      recognition.onend = () => {
        setIsRecording(false)
        setInterimTranscript("")
      }

      recognition.onerror = (event) => {
        setIsRecording(false)
        setInterimTranscript("")
        toast({
          title: "Voice Recognition Error",
          description: "There was an error with voice recognition. Please try again.",
          variant: "destructive",
        })
      }

      setRecognition(recognition)
    }
  }, [toast, setInput])

  // (Removed) speech recognition initialization

  // (Removed) waveform starter

  // Load historical session if `resume` param is provided
  useEffect(() => {
    const resumeId = searchParams.get("resume")
    if (resumeId) {
      // Switch to new chat tab when resuming a session
      setActiveTab("new-chat")
      setIsLoadingSession(true)
      try {
        // Fetch the specific session from database
        fetch(`/api/chat-sessions?id=${resumeId}`)
          .then(response => response.json())
          .then(session => {
            if (session && !session.error) {
              setSelectedSubject(session.subject)
              setSubjectChosen(true)
              setCurrentSessionId(resumeId)
              
              // Set the messages directly
              setMessages(session.messages || [])
              
              toast({
                title: "Session Resumed",
                description: `Continuing conversation: ${session.title}`,
              })
            } else {
              toast({
                title: "Session Not Found",
                description: "The requested conversation could not be found.",
                variant: "destructive",
              })
            }
          })
          .catch(() => {
            toast({
              title: "Error",
              description: "Failed to load the conversation.",
              variant: "destructive",
            })
          })
          .finally(() => {
            setIsLoadingSession(false)
          })
      } catch {
        toast({
          title: "Error",
          description: "Failed to load the conversation.",
          variant: "destructive",
        })
        setIsLoadingSession(false)
      }
    }
  }, [searchParams, toast, setMessages])

  const loadChatHistory = async () => {
    if (isHistoryLoading) return
    
    setIsHistoryLoading(true)
    try {
      const response = await fetch('/api/chat-sessions')
      if (response.ok) {
        const sessions = await response.json()
        const chatHistory = sessions.map((session: any) => ({
          id: session.id,
          subject: session.subject,
          topic: session.topic || '',
          title: session.title || 'Conversation',
          last_message: session.last_message || '',
          updated_at: session.updated_at,
          message_count: session.message_count || 0,
        }))
        setChatHistory(chatHistory)
        
        sessionStorage.setItem('chatHistoryCache', JSON.stringify(chatHistory))
        sessionStorage.setItem('chatHistoryCacheTimestamp', Date.now().toString())
      }
    } catch {
      // History load failure is non-critical
    } finally {
      setIsHistoryLoading(false)
      setIsInitialLoad(false)
    }
  }

  const deleteSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat-sessions?id=${sessionId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setChatHistory(prev => prev.filter(session => session.id !== sessionId))
        toast({
          title: "Session deleted",
          description: "The conversation has been deleted successfully.",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete the conversation.",
        variant: "destructive",
      })
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date().getTime()
    const messageTime = new Date(timestamp).getTime()
    const diffInHours = Math.floor((now - messageTime) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`
    
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}mo ago`
  }

  const filterSessionsBySubject = (sessions: ChatSession[], subject: string) => {
    return sessions.filter(session => session.subject === subject)
  }



  const capitalizeSubject = (subject: string) => {
    if (subject === "Math") return subject
    return subject.charAt(0).toUpperCase() + subject.slice(1)
  }

  // Load chat history when switching to that tab
  useEffect(() => {
    if (activeTab === "chat-history") {
      loadChatHistory()
    }
  }, [activeTab])

  const SubjectContent = ({ subject }: { subject: string }) => {
    const sessions = filterSessionsBySubject(chatHistory, subject)
    
    if (sessions.length === 0) {
      return (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start a conversation in the New Chat tab to see your {capitalizeSubject(subject)} sessions here.
          </p>
        </div>
      )
    }

    return (
      <div className="grid gap-3">
        {sessions.map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-sm truncate">{session.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3" />
                      {session.message_count}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {session.last_message}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(session.updated_at)}
                    </div>
                    {session.topic && (
                      <span className="text-xs bg-secondary px-2 py-0.5 rounded">
                        {capitalizeSubject(session.topic)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Link href={`/student/tutor?resume=${session.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      Continue
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this conversation? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteSession(session.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const getSubjectIcon = () => {
    switch (selectedSubject) {
      case "math":
        return <CalculatorIcon className="h-5 w-5" />
      case "science":
        return <FlaskConical className="h-5 w-5" />
      default:
        return <Bot className="h-5 w-5" />
    }
  }

  const getSubjectColor = () => {
    switch (selectedSubject) {
      case "math":
        return "bg-blue-100 text-blue-600"
      case "science":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getSubjectTitle = () => {
    switch (selectedSubject) {
      case "math":
        return "Mathematics Tutor"
      case "science":
        return "Science Tutor"
      default:
        return "General AI Tutor"
    }
  }

  // Voice recording functions

  // Voice recording handler
  const handleVoiceRecording = () => {
    if (!recognition) return

    if (isRecording) {
      recognition.stop()
    } else {
      recognition.start()
    }
    setIsRecording(!isRecording)
  }

  const userInitials =
    userProfile.firstName && userProfile.lastName
      ? `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase()
      : "ST"

  // (Removed) audio analysis, waveform functions, and voice recording handler

  // Image upload handler
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          resolve(result)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      setUploadedImage(base64String)
      toast({
        title: "Image uploaded successfully",
        description: "You can now ask questions about this image.",
      })
    } catch {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      if (event.target) {
        event.target.value = ""
      }
    }
  }

  // Calculator focus handler
  const handleCalculatorFocusChange = (hasFocus: boolean) => {
    if (!hasFocus) {
      // When calculator is closed or loses focus, focus the textarea
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }

  const renderMessageContent = (content: any) => {
    if (typeof content === "string") {
      return <div className="whitespace-pre-wrap font-code">{content}</div>
    }

    if (Array.isArray(content)) {
      return (
        <div className="space-y-2">
          {content.map((item, index) => {
            if (item.type === "text") {
              return (
                <div key={index} className="whitespace-pre-wrap font-code">
                  {item.text}
                </div>
              )
            }
            if (item.type === "image") {
              return (
                <div key={index} className="mt-2">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt="Uploaded content"
                    className="max-w-sm rounded-lg border"
                  />
                </div>
              )
            }
            return null
          })}
        </div>
      )
    }
    return <div className="whitespace-pre-wrap font-code">{String(content)}</div>
  }

  const renderNewChatTab = () => {
    if (isLoadingSession) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading conversation...</p>
          </div>
        </div>
      )
    }

    // Subject selection screen — shown when no conversation is active
    if (messages.length === 0 && !subjectChosen && !isLoadingSession) {
      return (
        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-xs font-mono text-muted-foreground">&gt; select_subject</p>
            <p className="text-sm font-mono text-muted-foreground mt-1">// choose a subject to start your session</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                id: "math",
                label: "Mathematics",
                desc: "Algebra, geometry, trigonometry, calculus and more",
                icon: <CalculatorIcon className="h-8 w-8" />,
                color: "border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30",
                iconColor: "bg-blue-100 text-blue-600",
              },
              {
                id: "science",
                label: "Science",
                desc: "Biology, chemistry, physics and earth science",
                icon: <FlaskConical className="h-8 w-8" />,
                color: "border-green-400 hover:bg-green-50 dark:hover:bg-green-950/30",
                iconColor: "bg-green-100 text-green-600",
              },
              {
                id: "general",
                label: "General",
                desc: "English, social studies, or any other subject",
                icon: <Bot className="h-8 w-8" />,
                color: "border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/30",
                iconColor: "bg-gray-100 text-gray-600",
              },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSubject(s.id)
                  setSubjectChosen(true)
                }}
                className={`flex flex-col items-center gap-4 p-6 rounded-xl border-2 transition-all text-left cursor-pointer ${s.color}`}
              >
                <div className={`p-3 rounded-full ${s.iconColor}`}>{s.icon}</div>
                <div>
                  <p className="font-mono font-semibold text-sm">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    }

    return (
      <Card className="flex-1 flex flex-col min-h-0">
        <CardContent className="flex-1 p-0">
          <ScrollArea ref={scrollAreaRef} className="h-[60vh] md:h-full p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div
                    className={`h-12 w-12 mx-auto mb-4 rounded-full flex items-center justify-center ${getSubjectColor()}`}
                  >
                    {getSubjectIcon()}
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mb-2">// {selectedSubject} tutor ready</p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Ask me a question, upload an image of a problem, or start with what you're studying.
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className={getSubjectColor()}>{getSubjectIcon()}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-blue-50 dark:bg-blue-950/30 text-foreground border border-blue-200 dark:border-blue-800"}`}
                  >
                    {renderMessageContent(message.content)}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-green-100 text-green-600">{userInitials}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className={getSubjectColor()}>{getSubjectIcon()}</AvatarFallback>
                  </Avatar>
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 flex items-center gap-2 border border-blue-200 dark:border-blue-800">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-foreground">{getSubjectTitle()} is thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <Separator />

        <div className="p-4 space-y-3 pb-6 md:pb-4">
          {/* Show uploaded image preview */}
          {uploadedImage && (
            <div className="relative inline-block">
              <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="max-w-xs rounded-lg border" />
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={() => setUploadedImage(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Voice recording indicator */}
          {isRecording && (
            <div className="flex items-center gap-2 p-3 bg-secondary/20 dark:bg-secondary/10 border border-border rounded-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
              <span className="text-sm font-medium">Listening</span>
            </div>
          )}

          <form onSubmit={(e) => {
            if (isRecording) {
              recognition?.stop()
            }
            handleSubmit(e)
          }} className="space-y-3">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={input + (interimTranscript ? " " + interimTranscript : "")}
                onChange={(e) => {
                  const newValue = e.target.value
                  if (interimTranscript) {
                    // Remove interim text when user types
                    const withoutInterim = newValue.replace(" " + interimTranscript, "")
                    setInput(withoutInterim)
                  } else {
                    setInput(newValue)
                  }
                }}
                placeholder="Ask me anything about your studies..."
                className={`min-h-[80px] pr-16 resize-none text-base ${
                  isRecording ? 'ring-2 ring-blue-300 dark:ring-blue-600' : ''
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    if (isRecording) {
                      recognition?.stop()
                    }
                    handleSubmit(e)
                  }
                }}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 h-8 px-3 text-xs font-medium"
                disabled={isLoading || (!input.trim() && !uploadedImage)}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>

            {/* Input Tools - Mobile Layout */}
            <div className="flex md:hidden justify-center gap-1">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant={isRecording ? "default" : "outline"}
                  size="sm"
                  onClick={handleVoiceRecording}
                  disabled={!recognition}
                  className="flex flex-col items-center justify-center h-10"
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  <span className="text-xs">{isRecording ? "Stop" : "Dictate"}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex flex-col items-center justify-center h-10"
                >
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                  <span className="text-xs">Upload</span>
                </Button>
                <Button
                  type="button"
                  variant={showMathKeyboard ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setShowMathKeyboard(!showMathKeyboard)
                    setShowCalculator(false)
                  }}
                  className="flex flex-col items-center justify-center h-10"
                >
                  <Sigma className="h-4 w-4" />
                  <span className="text-xs">Math Keyboard</span>
                </Button>
                <Button
                  type="button"
                  variant={showCalculator ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setShowCalculator(!showCalculator)
                    setShowMathKeyboard(false)
                  }}
                  className="flex flex-col items-center justify-center h-10"
                >
                  <CalculatorIcon className="h-4 w-4" />
                  <span className="text-xs">Calculator</span>
                </Button>
              </div>
            </div>

            {/* Input Tools - Desktop Layout */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                type="button"
                variant={isRecording ? "default" : "outline"}
                size="sm"
                onClick={handleVoiceRecording}
                disabled={!recognition}
                className="flex items-center gap-2 h-9 md:h-8"
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>{isRecording ? "Stop Recording" : "Dictate"}</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 h-9 md:h-8"
              >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                <span>Upload Image</span>
              </Button>
              <Button
                type="button"
                variant={showMathKeyboard ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setShowMathKeyboard(!showMathKeyboard)
                  setShowCalculator(false)
                }}
                className="flex items-center gap-2 h-9 md:h-8"
              >
                <Sigma className="h-4 w-4" />
                <span>Math Keyboard</span>
              </Button>
              <Button
                type="button"
                variant={showCalculator ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setShowCalculator(!showCalculator)
                  setShowMathKeyboard(false)
                }}
                className="flex items-center gap-2 h-9 md:h-8"
              >
                <CalculatorIcon className="h-4 w-4" />
                <span>Calculator</span>
              </Button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </form>
        </div>
      </Card>
    )
  }

  const renderChatHistoryTab = () => {
    if (isHistoryLoading && isInitialLoad) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading conversations...</p>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Subject Filter Tabs */}
        <div className="flex justify-center gap-2">
          {["math", "science", "general"].map((subject) => {
            const subjectSessions = filterSessionsBySubject(chatHistory, subject)
            const subjectCount = subjectSessions.length
            return (
              <Button
                key={subject}
                variant={historyActiveTab === subject ? "default" : "outline"}
                onClick={() => setHistoryActiveTab(subject)}
                className="capitalize"
              >
                {subject === "math" ? capitalizeSubject("Math") : capitalizeSubject(subject)} ({subjectCount})
              </Button>
            )
          })}
        </div>

        {/* Loading indicator */}
        {isHistoryLoading && !isInitialLoad && (
          <div className="text-center py-4">
            <span className="text-sm text-muted-foreground">Refreshing conversations...</span>
          </div>
        )}

        {/* Content based on active tab */}
        <div>
          <SubjectContent subject={historyActiveTab} />
        </div>
      </div>
    )
  }

  const renderTutorHeader = () => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className={getSubjectColor()}>{getSubjectIcon()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{getSubjectTitle()}</CardTitle>
              <p className="text-sm text-muted-foreground">Your personal learning assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-28 sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="math">{capitalizeSubject("Math")}</SelectItem>
                <SelectItem value="science">Science</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
              Online
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>
  )

  return (
    <div className="flex flex-col min-h-0 max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={activeTab === "new-chat" ? "default" : "outline"}
          size="lg"
          className="flex items-center gap-2 px-6 py-3 font-mono"
          onClick={() => setActiveTab("new-chat")}
        >
          &gt; new session
        </Button>
        <Button
          variant={activeTab === "chat-history" ? "default" : "outline"}
          size="lg"
          className="flex items-center gap-2 px-6 py-3 font-mono"
          onClick={() => setActiveTab("chat-history")}
        >
          &gt; history
        </Button>
      </div>

      {/* Header - only show on New Chat tab */}
      {activeTab === "new-chat" && renderTutorHeader()}

      {/* Tab Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {activeTab === "new-chat" && renderNewChatTab()}
        {activeTab === "chat-history" && renderChatHistoryTab()}
      </div>

      {/* Math Keyboard - render outside main content for overlay */}
      {showMathKeyboard && (
        <MathKeyboard
          onInsert={(symbol) => {
            setInput((prev) => prev + symbol)
            textareaRef.current?.focus()
          }}
          onClose={() => setShowMathKeyboard(false)}
        />
      )}

      {/* Calculator - render outside main content for overlay */}
      {showCalculator && <Calculator onClose={() => setShowCalculator(false)} onFocusChange={handleCalculatorFocusChange} />}
    </div>
  )
} 