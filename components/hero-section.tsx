"use client"

import { useSite } from "@/lib/site-context"
import { SocialLinks } from "./social-links"
import Image from "next/image"
import { useState } from "react"

export function HeroSection() {
  const { state, updateSettings, editMode } = useSite()
  const { settings } = state
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState("")

  function startEdit(field: string, currentValue: string) {
    if (!editMode) return
    setEditingField(field)
    setTempValue(currentValue)
  }

  function commitEdit(field: string) {
    if (tempValue.trim()) {
      updateSettings({ [field]: tempValue.trim() })
    }
    setEditingField(null)
  }

  return (
    <header className="relative overflow-hidden">
      {/* decorative wine/gold pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* gold accent line at top */}
      <div className="h-1 w-full bg-accent" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-12 text-center md:py-20">
        {/* banner image */}
        <div className="relative mb-2">
          <div className="absolute -inset-3 rounded-full bg-accent/20 blur-xl" />
          <Image
            src="/images/banner.jpeg"
            alt="Terceirão 2k26 - Banner da turma"
            width={180}
            height={180}
            className="relative h-36 w-36 rounded-full object-cover shadow-2xl ring-4 ring-accent md:h-44 md:w-44"
            priority
          />
        </div>

        {/* site name */}
        {editingField === "siteName" ? (
          <input
            autoFocus
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => commitEdit("siteName")}
            onKeyDown={(e) => e.key === "Enter" && commitEdit("siteName")}
            className="bg-transparent text-center text-5xl font-bold tracking-tight text-foreground outline-none ring-2 ring-primary rounded-lg px-4 py-2 md:text-7xl"
          />
        ) : (
          <h1
            onClick={() => startEdit("siteName", settings.siteName)}
            className={`text-5xl font-bold tracking-tight text-foreground md:text-7xl text-balance ${
              editMode
                ? "cursor-pointer hover:ring-2 hover:ring-primary/50 rounded-lg px-4 py-2 transition-all"
                : ""
            }`}
          >
            {settings.siteName}
          </h1>
        )}

        {/* gold decorative divider */}
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-accent" />
          <div className="h-2.5 w-2.5 rotate-45 bg-accent" />
          <div className="h-px w-16 bg-accent" />
        </div>

        {/* subtitle */}
        {editingField === "subtitle" ? (
          <input
            autoFocus
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => commitEdit("subtitle")}
            onKeyDown={(e) => e.key === "Enter" && commitEdit("subtitle")}
            className="bg-transparent text-center text-xl text-muted-foreground outline-none ring-2 ring-primary rounded-lg px-4 py-1 md:text-2xl"
          />
        ) : (
          <p
            onClick={() => startEdit("subtitle", settings.subtitle)}
            className={`text-xl text-muted-foreground md:text-2xl text-pretty ${
              editMode
                ? "cursor-pointer hover:ring-2 hover:ring-primary/50 rounded-lg px-4 py-1 transition-all"
                : ""
            }`}
          >
            {settings.subtitle}
          </p>
        )}

        {/* hero text */}
        {editingField === "heroText" ? (
          <textarea
            autoFocus
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => commitEdit("heroText")}
            className="w-full max-w-2xl bg-transparent text-center text-base leading-relaxed text-muted-foreground outline-none ring-2 ring-primary rounded-lg px-4 py-2 resize-none"
            rows={3}
          />
        ) : (
          <p
            onClick={() => startEdit("heroText", settings.heroText)}
            className={`max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty ${
              editMode
                ? "cursor-pointer hover:ring-2 hover:ring-primary/50 rounded-lg px-4 py-2 transition-all"
                : ""
            }`}
          >
            {settings.heroText}
          </p>
        )}

        {/* social links */}
        <div className="mt-2">
          <SocialLinks size="lg" />
        </div>
      </div>
    </header>
  )
}
