"use client"

import { ThemeToggleButton } from "@/components/theme-toggle-button"

export function AppHeader() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6 justify-end">
        <ThemeToggleButton />
      </div>
    </header>
  )
}