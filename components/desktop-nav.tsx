"use client"

import Link from "next/link"
import Image from "next/image"
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
  LogOut,
  User
} from "lucide-react"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

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
      icon: User,
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
        <div className="flex h-20 items-center border-b px-4">
          <Link href="/" className={cn(
            "flex items-center gap-4 overflow-hidden transition-all",
            isCollapsed ? "justify-center w-full" : ""
          )}>
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src="/images/brand/nesta-logo-transparent.png"
                alt="Nesta Education Logo"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <span
              className={cn(
                "font-bold tracking-tighter text-lg transition-all",
                isCollapsed ? "w-0 opacity-0" : "opacity-100"
              )}
            >
              nesta education
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-visible py-4 relative">
          <div className="space-y-2 px-3">
            {links.map((link) => (
              <div key={link.href} className="relative group">
                <Link
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
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999]">
                    {link.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Toggle Button - Center of Sidebar */}
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <button
              onClick={onToggle}
              className="h-auto p-3 hover:bg-muted rounded-md transition-colors bg-background border"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="border-t p-3">
          <div className={cn(
            "flex w-full items-center justify-center",
            isCollapsed ? "justify-center" : "justify-start"
          )}>
            <ThemeToggleButton />
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