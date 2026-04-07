"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MessageSquare,
  ClipboardList,
  UserCircle,
} from "lucide-react"

export function MobileBottomNav() {
  const pathname = usePathname()

  const links = [
    {
      href: "/student/dashboard",
      label: "Home",
      icon: LayoutDashboard,
    },
    {
      href: "/student/tutor",
      label: "Study",
      icon: MessageSquare,
    },
    {
      href: "/student/practice-exam",
      label: "Exams",
      icon: ClipboardList,
    },
    {
      href: "/student/profile",
      label: "Profile",
      icon: UserCircle,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around px-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-col items-center gap-1 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground",
              pathname === link.href && "text-foreground"
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}