"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

export function AppHeader() {
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    // Get user profile from localStorage
    const profile = localStorage.getItem('userProfile')
    if (profile) {
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  const getUserInitials = () => {
    if (userProfile?.firstName && userProfile?.lastName) {
      return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase()
    }
    return "NU"
  }

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6 justify-end">
        <Link href="/student/profile">
          <Avatar className="h-8 w-8 hover:opacity-80 transition-opacity">
            <AvatarImage
              src={userProfile?.avatar}
              alt="User Avatar"
              className="object-cover"
            />
            <AvatarFallback className="text-sm font-bold">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}