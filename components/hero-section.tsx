"use client"

import { useSite } from "@/lib/site-context"
import { Pencil, Settings } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const { state, updateSettings, editMode, toggleEditMode } = useSite()
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
      {/* background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center md:py-24">
        {/* edit mode toggle */}
        <button
          onClick={toggleEditMode}
          className={`fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg transition-all ${
            editMode
              ? "bg-primary text-primary-foreground"
              : "bg-card text-card-foreground border border-border"
          }`}
          aria-label={editMode ? "Desativar modo de edicao" : "Ativar modo de edicao"}
        >
          {editMode ? <Pencil className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
          {editMode ? "Editando" : "Editar Site"}
        </button>

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
              editMode ? "cursor-pointer hover:ring-2 hover:ring-primary/50 rounded-lg px-4 py-2 transition-all" : ""
            }`}
          >
            {settings.siteName}
          </h1>
        )}

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
              editMode ? "cursor-pointer hover:ring-2 hover:ring-primary/50 rounded-lg px-4 py-1 transition-all" : ""
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
              editMode ? "cursor-pointer hover:ring-2 hover:ring-primary/50 rounded-lg px-4 py-2 transition-all" : ""
            }`}
          >
            {settings.heroText}
          </p>
        )}

        {/* decorative divider */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-px w-12 bg-border" />
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    </header>
  )
}
