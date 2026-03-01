"use client"

import { useSite } from "@/lib/site-context"
import { SocialLinks } from "./social-links"
import { Pencil, Settings, Menu, X } from "lucide-react"
import { useState } from "react"

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "topicos", label: "Topicos" },
  { id: "alunos", label: "Alunos" },
  { id: "rifas", label: "Rifas" },
  { id: "mural", label: "Mural" },
]

export function Navbar() {
  const { editMode, toggleEditMode, currentPage, setCurrentPage } = useSite()
  const [mobileOpen, setMobileOpen] = useState(false)

  function navigate(page: string) {
    setCurrentPage(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* logo */}
        <button
          onClick={() => navigate("inicio")}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            3-2
          </div>
          <span className="hidden font-bold text-foreground sm:block">
            Turma 3-2
          </span>
        </button>

        {/* desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* right side */}
        <div className="flex items-center gap-3">
          <SocialLinks size="sm" />

          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shadow-sm transition-all ${
              editMode
                ? "bg-primary text-primary-foreground"
                : "bg-card text-card-foreground border border-border"
            }`}
            aria-label={
              editMode ? "Desativar modo de edicao" : "Ativar modo de edicao"
            }
          >
            {editMode ? (
              <Pencil className="h-3.5 w-3.5" />
            ) : (
              <Settings className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {editMode ? "Editando" : "Editar"}
            </span>
          </button>

          {/* mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-foreground md:hidden hover:bg-secondary transition-colors"
            aria-label="Abrir menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <SocialLinks size="sm" />
            <span className="text-xs text-muted-foreground">Siga a turma!</span>
          </div>
        </div>
      )}
    </nav>
  )
}
