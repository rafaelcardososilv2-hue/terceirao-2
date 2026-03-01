"use client"

import { useSite } from "@/lib/site-context"
import { useAuth } from "@/lib/auth-context"
import { SocialLinks } from "./social-links"
import { Pencil, Settings, Menu, X, LogOut, Shield, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "topicos", label: "Topicos" },
  { id: "alunos", label: "Alunos" },
  { id: "rifas", label: "Rifas" },
  { id: "mural", label: "Mural" },
]

export function Navbar() {
  const { editMode, toggleEditMode, isAdmin, currentPage, setCurrentPage } = useSite()
  const { user, logout } = useAuth()
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
          <Image
            src="/images/banner.jpeg"
            alt="Terceirão 2k26"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-accent"
          />
          <span className="hidden font-bold text-foreground sm:block">
            Terceirão 2k26
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
        <div className="flex items-center gap-2">
          <SocialLinks size="sm" />

          {/* User badge */}
          <div className="hidden items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-1 sm:flex">
            {isAdmin ? (
              <Shield className="h-3.5 w-3.5 text-accent" />
            ) : (
              <User className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <span className="text-xs font-medium text-foreground max-w-[80px] truncate">
              {user?.name}
            </span>
          </div>

          {/* Edit button - ADMIN ONLY */}
          {isAdmin && (
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
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="rounded-full border border-border bg-card p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Sair"
            title="Sair"
          >
            <LogOut className="h-3.5 w-3.5" />
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
          {/* User info on mobile */}
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
            {isAdmin ? (
              <Shield className="h-4 w-4 text-accent" />
            ) : (
              <User className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">{user?.name}</span>
            <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {isAdmin ? "Admin" : "Aluno"}
            </span>
          </div>

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

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-2">
              <SocialLinks size="sm" />
              <span className="text-xs text-muted-foreground">Siga a turma!</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
