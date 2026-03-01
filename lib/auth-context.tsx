"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"

export type UserRole = "admin" | "student"

export interface AuthUser {
  name: string
  role: UserRole
}

interface AuthContextValue {
  user: AuthUser | null
  login: (name: string, password?: string) => { success: boolean; error?: string }
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AUTH_KEY = "turma32_auth"

const ADMIN_USER = "yutaokotsu"
const ADMIN_PASS = "jujutsu123"

function loadUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveUser(user: AuthUser | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(AUTH_KEY)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setUser(loadUser())
    setHydrated(true)
  }, [])

  const login = useCallback(
    (name: string, password?: string): { success: boolean; error?: string } => {
      const trimmedName = name.trim().toLowerCase()

      // Admin login
      if (password) {
        if (trimmedName === ADMIN_USER && password === ADMIN_PASS) {
          const adminUser: AuthUser = { name: "Admin", role: "admin" }
          setUser(adminUser)
          saveUser(adminUser)
          return { success: true }
        }
        return { success: false, error: "Usuario ou senha incorretos" }
      }

      // Student login
      if (!name.trim()) {
        return { success: false, error: "Digite seu nome" }
      }

      // Block student from using admin name
      if (trimmedName === ADMIN_USER) {
        return { success: false, error: "Nome reservado. Escolha outro nome." }
      }

      const studentUser: AuthUser = { name: name.trim(), role: "student" }
      setUser(studentUser)
      saveUser(studentUser)
      return { success: true }
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
    saveUser(null)
  }, [])

  const isAdmin = user?.role === "admin"

  if (!hydrated) return null

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
