"use client"

import { useSite } from "@/lib/site-context"
import { Plus, Trash2, Ticket, X, ExternalLink, Phone } from "lucide-react"
import { useState, useRef } from "react"

export function RafflesSection() {
  const { state, editMode, addRaffle, deleteRaffle } = useSite()
  const [showForm, setShowForm] = useState(false)

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-border" />
          <h2 className="text-xl font-bold text-foreground">Rifas</h2>
        </div>
        {editMode && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Adicionar Rifa
          </button>
        )}
      </div>

      {state.raffles.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.raffles.map((raffle) => (
            <article
              key={raffle.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:-translate-y-1"
            >
              {editMode && (
                <button
                  onClick={() => {
                    if (confirm("Tem certeza que quer remover esta rifa?"))
                      deleteRaffle(raffle.id)
                  }}
                  className="absolute right-3 top-3 z-10 rounded-full bg-destructive/10 p-2 text-destructive opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Remover rifa"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              {raffle.photo ? (
                <img
                  src={raffle.photo}
                  alt={raffle.title}
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center bg-secondary">
                  <Ticket className="h-12 w-12 text-muted-foreground/30" />
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold text-card-foreground">
                  {raffle.title}
                </h3>
                {raffle.description && (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {raffle.description}
                  </p>
                )}

                <div className="mt-3 flex flex-col gap-2">
                  {raffle.sellerName && (
                    <div className="flex items-center gap-2 text-sm text-card-foreground">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent">
                        <span className="text-xs font-bold">
                          {raffle.sellerName[0]?.toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">{raffle.sellerName}</span>
                    </div>
                  )}
                  {raffle.sellerContact && (
                    <a
                      href={`https://wa.me/${raffle.sellerContact.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {raffle.sellerContact}
                    </a>
                  )}
                  {raffle.link && (
                    <a
                      href={raffle.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Acessar link da rifa
                    </a>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-full bg-accent" />
            </article>
          ))}

          {editMode && (
            <button
              onClick={() => setShowForm(true)}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border p-8 text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              <Plus className="h-8 w-8" />
              <span className="text-sm font-medium">Adicionar Rifa</span>
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
          <Ticket className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="mb-2 text-lg font-medium text-foreground">
            Nenhuma rifa adicionada
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            {editMode
              ? 'Clique em "Adicionar Rifa" para comecar.'
              : 'Nenhuma rifa no momento.'}
          </p>
          {editMode && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Adicionar Rifa
            </button>
          )}
        </div>
      )}

      {showForm && <AddRaffleForm onClose={() => setShowForm(false)} />}
    </section>
  )
}

function AddRaffleForm({ onClose }: { onClose: () => void }) {
  const { addRaffle } = useSite()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState("")
  const [sellerName, setSellerName] = useState("")
  const [sellerContact, setSellerContact] = useState("")
  const [link, setLink] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    addRaffle({
      title: title.trim(),
      description: description.trim(),
      photo,
      sellerName: sellerName.trim(),
      sellerContact: sellerContact.trim(),
      link: link.trim(),
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl border border-border"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-card-foreground">
            Adicionar Rifa
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* photo */}
        <div className="mb-4">
          {photo ? (
            <img
              src={photo}
              alt="Preview"
              className="w-full aspect-video rounded-xl object-cover border border-border"
            />
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="flex aspect-video w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/50 hover:border-primary transition-colors"
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Ticket className="h-8 w-8" />
                <span className="text-sm">Clique para adicionar foto</span>
              </div>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          {photo && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 text-sm font-medium text-primary hover:underline"
            >
              Trocar foto
            </button>
          )}
        </div>

        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Nome da Rifa *
        </label>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Rifa do Formatura"
          className="mb-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />

        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Descricao
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhes sobre a rifa, premio, valor, etc."
          rows={2}
          className="mb-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
        />

        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Quem esta vendendo
        </label>
        <input
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          placeholder="Nome do vendedor"
          className="mb-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />

        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Numero de contato (WhatsApp)
        </label>
        <input
          value={sellerContact}
          onChange={(e) => setSellerContact(e.target.value)}
          placeholder="(99) 99999-9999"
          className="mb-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />

        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Link (opcional)
        </label>
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://..."
          className="mb-6 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  )
}
