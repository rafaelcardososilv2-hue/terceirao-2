"use client"

import { useSite } from "@/lib/site-context"
import { Image, MessageCircle, FolderOpen, Heart } from "lucide-react"

export function StatsBar() {
  const { state } = useSite()
  const totalPhotos = state.photos.length
  const totalComments = state.comments.length
  const totalTopics = state.topics.length
  const totalLikes = state.photos.reduce((sum, p) => sum + p.likes, 0)

  const stats = [
    { label: "Topicos", value: totalTopics, icon: FolderOpen },
    { label: "Fotos", value: totalPhotos, icon: Image },
    { label: "Comentarios", value: totalComments, icon: MessageCircle },
    { label: "Curtidas", value: totalLikes, icon: Heart },
  ]

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-4 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <s.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
