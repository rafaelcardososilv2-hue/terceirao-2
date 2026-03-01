"use client"

import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { SocialLinks } from "./social-links"
import { Lock, User, Eye, EyeOff, LogIn } from "lucide-react"

export function LoginScreen() {
  const { login } = useAuth()
  const [mode, setMode] = useState<"student" | "admin">("student")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (mode === "admin") {
      const result = login(name, password)
      if (!result.success) setError(result.error || "Erro no login")
    } else {
      const result = login(name)
      if (!result.success) setError(result.error || "Erro no login")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fdf8f4] px-4">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #722f37 0, #722f37 1px, transparent 0, transparent 50%)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Banner */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="absolute -inset-3 rounded-full bg-[#c9a84c]/20 blur-xl" />
            <Image
              src="/images/banner.jpeg"
              alt="Terceirão 2k26"
              width={120}
              height={120}
              className="relative h-28 w-28 rounded-full object-cover shadow-2xl ring-4 ring-[#c9a84c]"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#2d1a1e] md:text-4xl">
            Terceirão 2k26
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-px w-12 bg-[#c9a84c]" />
            <div className="h-2 w-2 rotate-45 bg-[#c9a84c]" />
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>
          <p className="mt-2 text-sm text-[#7a6568]">
            Turma 3°2 - Entre para acessar
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-[#e6d5c3] bg-white p-6 shadow-xl">
          {/* Mode Toggle */}
          <div className="mb-6 flex rounded-xl bg-[#f5ede4] p-1">
            <button
              type="button"
              onClick={() => {
                setMode("student")
                setError("")
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                mode === "student"
                  ? "bg-[#722f37] text-white shadow-sm"
                  : "text-[#7a6568] hover:text-[#2d1a1e]"
              }`}
            >
              <User className="h-4 w-4" />
              Estudante
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("admin")
                setError("")
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                mode === "admin"
                  ? "bg-[#722f37] text-white shadow-sm"
                  : "text-[#7a6568] hover:text-[#2d1a1e]"
              }`}
            >
              <Lock className="h-4 w-4" />
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name field */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#2d1a1e]">
                {mode === "admin" ? "Usuario" : "Seu nome"}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a6568]" />
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={mode === "admin" ? "Digite o usuario" : "Como voce se chama?"}
                  className="w-full rounded-lg border border-[#e6d5c3] bg-[#fdf8f4] py-2.5 pl-10 pr-3 text-sm text-[#2d1a1e] placeholder:text-[#7a6568]/60 outline-none transition-all focus:border-[#722f37] focus:ring-2 focus:ring-[#722f37]/20"
                />
              </div>
            </div>

            {/* Password field (admin only) */}
            {mode === "admin" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#2d1a1e]">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a6568]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="w-full rounded-lg border border-[#e6d5c3] bg-[#fdf8f4] py-2.5 pl-10 pr-10 text-sm text-[#2d1a1e] placeholder:text-[#7a6568]/60 outline-none transition-all focus:border-[#722f37] focus:ring-2 focus:ring-[#722f37]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6568] hover:text-[#2d1a1e] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#722f37] py-3 text-sm font-semibold text-white transition-all hover:bg-[#5c2329] active:scale-[0.98]"
            >
              <LogIn className="h-4 w-4" />
              {mode === "admin" ? "Entrar como Admin" : "Entrar"}
            </button>
          </form>

          {mode === "student" && (
            <p className="mt-4 text-center text-xs text-[#7a6568]">
              Basta digitar seu nome para acessar o site da turma.
            </p>
          )}
        </div>

        {/* Social links */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <SocialLinks size="md" />
          <p className="text-xs text-[#7a6568]">
            Terceirão 2k26 - Turma 3°2
          </p>
        </div>
      </div>
    </div>
  )
}
