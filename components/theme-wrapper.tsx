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
      root.style.setProperty("--foreground", "#f5ede4")
      root.style.setProperty("--card", "#2d1a1e")
      root.style.setProperty("--card-foreground", "#f5ede4")
      root.style.setProperty("--muted-foreground", "#b8a0a5")
      root.style.setProperty("--border", "#4d2e34")
      root.style.setProperty("--input", "#4d2e34")
      root.style.setProperty("--secondary", "#3d2228")
      root.style.setProperty("--secondary-foreground", "#f5ede4")
      root.style.setProperty("--accent", "#c9a84c")
    } else {
      root.classList.remove("dark")
      root.style.setProperty("--foreground", "#2d1a1e")
      root.style.setProperty("--card", "#ffffff")
      root.style.setProperty("--card-foreground", "#2d1a1e")
      root.style.setProperty("--muted-foreground", "#7a6568")
      root.style.setProperty("--border", "#e6d5c3")
      root.style.setProperty("--input", "#e6d5c3")
      root.style.setProperty("--secondary", "#f5ede4")
      root.style.setProperty("--secondary-foreground", "#2d1a1e")
      root.style.setProperty("--accent", "#c9a84c")
    }
  }, [bgColor, accentColor, theme])

  return <>{children}</>
}
