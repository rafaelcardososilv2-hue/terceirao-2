"use client"

import { useState, useEffect } from "react"
import { Send, Trash2 } from "lucide-react"
import { useSite } from "@/lib/site-context"

interface WallMessage {
  id: string
  author: string
  text: string
  color: string
  createdAt: number
}

const WALL_KEY = "turma32_wall"

const NOTE_COLORS = [
  "bg-yellow-100 text-yellow-900 border-yellow-200",
  "bg-blue-100 text-blue-900 border-blue-200",
  "bg-pink-100 text-pink-900 border-pink-200",
  "bg-green-100 text-green-900 border-green-200",
  "bg-orange-100 text-orange-900 border-orange-200",
]

function loadMessages(): WallMessage[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(WALL_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveMessages(msgs: WallMessage[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(WALL_KEY, JSON.stringify(msgs))
}

export function QuickWall() {
  const { editMode } = useSite()
  const [messages, setMessages] = useState<WallMessage[]>([])
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    setMessages(loadMessages())
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || !author.trim()) return
    const newMsg: WallMessage = {
      id: Math.random().toString(36).slice(2),
      author: author.trim(),
      text: text.trim(),
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      createdAt: Date.now(),
    }
    const updated = [newMsg, ...messages]
    setMessages(updated)
    saveMessages(updated)
    setText("")
  }

  function remove(id: string) {
    const updated = messages.filter((m) => m.id !== id)
    setMessages(updated)
    saveMessages(updated)
  }

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <h2 className="text-xl font-bold text-foreground">Mural de Recados</h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={submit} className="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Seu nome"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary sm:w-36"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Deixe seu recado para a turma..."
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Send className="h-4 w-4" />
          Enviar
        </button>
      </form>

      {messages.length > 0 ? (
        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 break-inside-avoid rounded-xl border p-4 ${msg.color} transition-all hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">{msg.author}</p>
                {editMode && (
                  <button onClick={() => remove(msg.id)} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed">{msg.text}</p>
              <p className="mt-2 text-xs opacity-50">
                {new Date(msg.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card/50 py-12 text-center">
          <p className="text-sm text-muted-foreground">Nenhum recado ainda. Seja o primeiro a escrever!</p>
        </div>
      )}
    </section>
  )
}
