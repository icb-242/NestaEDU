"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  ClipboardList,
  BookOpen,
  UserCircle,
  LogOut,
  PenTool
} from "lucide-react"

interface DesktopNavProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function DesktopNav({ isCollapsed, onToggle }: DesktopNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.clear()
    // Redirect to login
    router.push('/login')
  }

  const links = [
    {
      href: "/student/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/student/tutor",
      label: "AI Tutor",
      icon: MessageSquare,
    },
    {
      href: "/student/practice-exam",
      label: "Practice Exams",
      icon: ClipboardList,
    },
    {
      href: "/student/learning",
      label: "Learning",
      icon: BookOpen,
    },
    {
      href: "/student/profile",
      label: "Profile",
      icon: UserCircle,
    },
  ]

  return (
    <nav
      className={cn(
        "hidden border-r bg-background md:block transition-all duration-300 flex flex-col justify-between",
        isCollapsed ? "w-[4.5rem]" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Top Section with Logo and Title */}
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <PenTool className="h-6 w-6 flex-shrink-0" />
            <span
              className={cn(
                "font-bold tracking-tighter transition-all",
                isCollapsed ? "w-0 opacity-0" : "opacity-100"
              )}
            >
              nesta education
            </span>
          </Link>
          <div className="flex-1 flex justify-end">
            <button
              onClick={onToggle}
              className="h-auto p-2 hover:bg-muted rounded-md transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-auto py-4">
          <div className="space-y-2 px-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-mono text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  pathname === link.href && "bg-muted text-foreground"
                )}
              >
                <link.icon className="h-4 w-4 flex-shrink-0" />
                <span
                  className={cn(
                    "overflow-hidden transition-all",
                    isCollapsed && "w-0"
                  )}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="border-t p-3">
          <button
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-mono text-red-500 transition-colors hover:bg-red-50",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span
              className={cn(
                "overflow-hidden transition-all",
                isCollapsed && "w-0"
              )}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}