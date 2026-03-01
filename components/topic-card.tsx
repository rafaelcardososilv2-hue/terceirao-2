"use client"

import { useSite } from "@/lib/site-context"
import type { TopicType } from "@/lib/store"
import { DynIcon } from "./icon-picker"
import { Trash2, MessageCircle, ImagePlus } from "lucide-react"
import { useState, useRef } from "react"

export function TopicCard({
  topic,
  onSelect,
}: {
  topic: TopicType
  onSelect: (id: string) => void
}) {
  const { state, editMode, deleteTopic } = useSite()
  const photoCount = state.photos.filter((p) => p.topicId === topic.id).length
  const commentCount = state.comments.filter((c) => c.topicId === topic.id).length

  return (
    <article
      onClick={() => onSelect(topic.id)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
    >
      {editMode && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            if (confirm("Tem certeza que quer apagar este topico?")) deleteTopic(topic.id)
          }}
          className="absolute right-3 top-3 rounded-full bg-destructive/10 p-2 text-destructive opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Apagar topico"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: topic.color + "20" }}>
        <DynIcon name={topic.icon} className="h-6 w-6" style={{ color: topic.color }} />
      </div>

      <h3 className="mb-1 text-lg font-semibold text-card-foreground">{topic.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ImagePlus className="h-3.5 w-3.5" />
          {photoCount} fotos
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="h-3.5 w-3.5" />
          {commentCount} comentarios
        </span>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full transition-all" style={{ backgroundColor: topic.color }} />
    </article>
  )
}

/* ---------- Create topic form ---------- */
export function CreateTopicForm({ onClose }: { onClose: () => void }) {
  const { addTopic } = useSite()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("star")
  const [color, setColor] = useState("#e85d3a")

  const icons = ["camera", "music", "heart", "star", "trophy", "smile", "zap", "flame"]
  const colors = ["#e85d3a", "#2d6a4f", "#f4a261", "#264653", "#e76f51", "#457b9d", "#d4a373", "#9b5de5"]

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    addTopic({ title: title.trim(), description: description.trim(), icon, color })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl border border-border"
      >
        <h2 className="mb-4 text-xl font-bold text-card-foreground">Novo Topico</h2>

        <label className="mb-1 block text-sm font-medium text-card-foreground">Nome</label>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Melhores Momentos"
          className="mb-4 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />

        <label className="mb-1 block text-sm font-medium text-card-foreground">Descricao</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Uma breve descricao..."
          rows={2}
          className="mb-4 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
        />

        <label className="mb-2 block text-sm font-medium text-card-foreground">Icone</label>
        <div className="mb-4 flex flex-wrap gap-2">
          {icons.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIcon(i)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${
                icon === i ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-secondary"
              }`}
            >
              <DynIcon name={i} className="h-5 w-5 text-foreground" />
            </button>
          ))}
        </div>

        <label className="mb-2 block text-sm font-medium text-card-foreground">Cor</label>
        <div className="mb-6 flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`h-8 w-8 rounded-full transition-all ${
                color === c ? "ring-2 ring-offset-2 ring-foreground" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            Cancelar
          </button>
          <button type="submit" className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Criar Topico
          </button>
        </div>
      </form>
    </div>
  )
}

/* ---------- Topic detail modal ---------- */
export function TopicDetail({ topicId, onClose }: { topicId: string; onClose: () => void }) {
  const { state, addPhoto, deletePhoto, likePhoto, addComment, deleteComment, editMode } = useSite()
  const topic = state.topics.find((t) => t.id === topicId)
  const photos = state.photos.filter((p) => p.topicId === topicId).sort((a, b) => b.createdAt - a.createdAt)
  const comments = state.comments.filter((c) => c.topicId === topicId).sort((a, b) => b.createdAt - a.createdAt)

  const [commentAuthor, setCommentAuthor] = useState("")
  const [commentText, setCommentText] = useState("")
  const [photoCaption, setPhotoCaption] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  if (!topic) return null

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      addPhoto({ src: reader.result as string, caption: photoCaption || "Sem legenda", topicId })
      setPhotoCaption("")
    }
    reader.readAsDataURL(file)
  }

  function handleComment(e: React.FormEvent) {
    e.preventDefault()
    if (!commentText.trim() || !commentAuthor.trim()) return
    addComment({ author: commentAuthor.trim(), text: commentText.trim(), topicId })
    setCommentText("")
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-foreground/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto my-8 w-full max-w-3xl rounded-2xl bg-card shadow-2xl border border-border"
      >
        {/* header */}
        <div className="flex items-center gap-4 border-b border-border p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: topic.color + "20" }}>
            <DynIcon name={topic.icon} className="h-6 w-6" style={{ color: topic.color }} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-card-foreground">{topic.title}</h2>
            <p className="text-sm text-muted-foreground">{topic.description}</p>
          </div>
          <button onClick={onClose} className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-secondary transition-colors">
            Fechar
          </button>
        </div>

        <div className="p-6">
          {/* upload photo */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Adicionar Foto</h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={photoCaption}
                onChange={(e) => setPhotoCaption(e.target.value)}
                placeholder="Legenda da foto..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
              />
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <ImagePlus className="h-4 w-4" />
                Enviar Foto
              </button>
            </div>
          </div>

          {/* photo grid */}
          {photos.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Fotos ({photos.length})</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative overflow-hidden rounded-xl border border-border">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-foreground/60 backdrop-blur-sm p-2">
                      <p className="text-xs text-background truncate">{photo.caption}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <button
                          onClick={() => likePhoto(photo.id)}
                          className="flex items-center gap-1 text-xs text-background/80 hover:text-background transition-colors"
                        >
                          <span className="text-red-400">&#9829;</span> {photo.likes}
                        </button>
                        {editMode && (
                          <button
                            onClick={() => deletePhoto(photo.id)}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            Apagar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* comments */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Comentarios ({comments.length})
            </h3>
            <form onSubmit={handleComment} className="mb-4 flex flex-col gap-2 sm:flex-row">
              <input
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary sm:w-32"
              />
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escreva um comentario..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar
              </button>
            </form>

            <div className="space-y-2">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {c.author[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">{c.author}</p>
                    <p className="text-sm text-muted-foreground break-words">{c.text}</p>
                  </div>
                  {editMode && (
                    <button
                      onClick={() => deleteComment(c.id)}
                      className="shrink-0 text-xs text-destructive hover:underline"
                    >
                      Apagar
                    </button>
                  )}
                </div>
              ))}
              {comments.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">Nenhum comentario ainda. Seja o primeiro!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
