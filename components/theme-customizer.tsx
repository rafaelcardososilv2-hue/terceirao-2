"use client"

import { useSite } from "@/lib/site-context"
import { Palette, X, RotateCcw } from "lucide-react"
import { useState } from "react"

const BG_COLORS = [
  { label: "Creme", value: "#faf7f2" },
  { label: "Branco", value: "#ffffff" },
  { label: "Azul Claro", value: "#f0f4f8" },
  { label: "Rosa Claro", value: "#fef2f2" },
  { label: "Verde Claro", value: "#f0fdf4" },
  { label: "Escuro", value: "#1a1a1a" },
]

const ACCENT_COLORS = [
  { label: "Laranja", value: "#e85d3a" },
  { label: "Verde", value: "#2d6a4f" },
  { label: "Azul", value: "#457b9d" },
  { label: "Dourado", value: "#f4a261" },
  { label: "Rosa", value: "#e76f51" },
  { label: "Roxo", value: "#9b5de5" },
]

export function ThemeCustomizer() {
  const { state, updateSettings, editMode } = useSite()
  const [open, setOpen] = useState(false)
  const { settings } = state

  if (!editMode) return null

  function resetAll() {
    if (confirm("Resetar todas as configuracoes visuais?")) {
      updateSettings({
        bgColor: "#faf7f2",
        accentColor: "#e85d3a",
        theme: "light",
      })
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-accent-foreground shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Personalizar tema"
      >
        <Palette className="h-5 w-5" />
        Personalizar
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-foreground/30 backdrop-blur-sm sm:items-center sm:p-4" onClick={() => setOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-t-2xl bg-card p-6 shadow-2xl border border-border sm:rounded-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-card-foreground">Personalizar</h2>
              <div className="flex items-center gap-2">
                <button onClick={resetAll} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary transition-colors" title="Resetar">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Background color */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-card-foreground">Cor de Fundo</label>
              <div className="flex flex-wrap gap-2">
                {BG_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => updateSettings({ bgColor: c.value, theme: c.value === "#1a1a1a" ? "dark" : "light" })}
                    className={`group relative h-10 w-10 rounded-full border-2 transition-all ${
                      settings.bgColor === c.value ? "border-primary scale-110" : "border-border hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  >
                    <span className="sr-only">{c.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Personalizada:</label>
                <input
                  type="color"
                  value={settings.bgColor}
                  onChange={(e) =>
                    updateSettings({
                      bgColor: e.target.value,
                      theme: isColorDark(e.target.value) ? "dark" : "light",
                    })
                  }
                  className="h-8 w-8 cursor-pointer rounded border-0"
                />
              </div>
            </div>

            {/* Accent color */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-card-foreground">Cor de Destaque</label>
              <div className="flex flex-wrap gap-2">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => updateSettings({ accentColor: c.value })}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      settings.accentColor === c.value ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  >
                    <span className="sr-only">{c.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Personalizada:</label>
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => updateSettings({ accentColor: e.target.value })}
                  className="h-8 w-8 cursor-pointer rounded border-0"
                />
              </div>
            </div>

            {/* live preview */}
            <div className="rounded-xl p-4 border border-border" style={{ backgroundColor: settings.bgColor }}>
              <p className="text-xs font-medium" style={{ color: isColorDark(settings.bgColor) ? "#f0ebe3" : "#1a1a1a" }}>
                Pre-visualizacao
              </p>
              <div className="mt-2 h-2 w-3/4 rounded-full" style={{ backgroundColor: settings.accentColor }} />
              <div className="mt-1 h-2 w-1/2 rounded-full" style={{ backgroundColor: settings.accentColor, opacity: 0.5 }} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function isColorDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}
