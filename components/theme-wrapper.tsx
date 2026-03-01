"use client"

import { useSite } from "@/lib/site-context"
import { useEffect, type ReactNode } from "react"

export function ThemeWrapper({ children }: { children: ReactNode }) {
  const { state } = useSite()
  const { bgColor, accentColor, theme } = state.settings

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--background", bgColor)
    root.style.setProperty("--primary", accentColor)
    root.style.setProperty("--ring", accentColor)

    if (theme === "dark") {
      root.classList.add("dark")
      root.style.setProperty("--foreground", "#f0ebe3")
      root.style.setProperty("--card", "#262626")
      root.style.setProperty("--card-foreground", "#f0ebe3")
      root.style.setProperty("--muted-foreground", "#a3a3a3")
      root.style.setProperty("--border", "#404040")
      root.style.setProperty("--input", "#404040")
      root.style.setProperty("--secondary", "#333333")
      root.style.setProperty("--secondary-foreground", "#f0ebe3")
    } else {
      root.classList.remove("dark")
      root.style.setProperty("--foreground", "#1a1a1a")
      root.style.setProperty("--card", "#ffffff")
      root.style.setProperty("--card-foreground", "#1a1a1a")
      root.style.setProperty("--muted-foreground", "#6b6b6b")
      root.style.setProperty("--border", "#e0d8cc")
      root.style.setProperty("--input", "#e0d8cc")
      root.style.setProperty("--secondary", "#f0ebe3")
      root.style.setProperty("--secondary-foreground", "#1a1a1a")
    }
  }, [bgColor, accentColor, theme])

  return <>{children}</>
}
