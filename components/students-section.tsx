"use client"

import { useSite } from "@/lib/site-context"
import { Plus, Trash2, User, X } from "lucide-react"
import { useState, useRef } from "react"

export function StudentsSection() {
  const { state, editMode, addStudent, deleteStudent } = useSite()
  const [showForm, setShowForm] = useState(false)

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-border" />
          <h2 className="text-xl font-bold text-foreground">Alunos da Turma</h2>
        </div>
        {editMode && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Adicionar Aluno
          </button>
        )}
      </div>

      {state.students.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.students.map((student) => (
            <article
              key={student.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:-translate-y-1"
            >
              {editMode && (
                <button
                  onClick={() => {
                    if (confirm("Tem certeza que quer remover este aluno?"))
                      deleteStudent(student.id)
                  }}
                  className="absolute right-3 top-3 z-10 rounded-full bg-destructive/10 p-2 text-destructive opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Remover aluno"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}

              {student.photo ? (
                <img
                  src={student.photo}
                  alt={student.name}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-secondary">
                  <User className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold text-card-foreground">
                  {student.name}
                </h3>
                {student.description && (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {student.description}
                  </p>
                )}
              </div>

              <div
                className="absolute bottom-0 left-0 h-1 w-full bg-accent"
              />
            </article>
          ))}

          {editMode && (
            <button
              onClick={() => setShowForm(true)}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border p-8 text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              <Plus className="h-8 w-8" />
              <span className="text-sm font-medium">Adicionar Aluno</span>
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
          <User className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="mb-2 text-lg font-medium text-foreground">
            Nenhum aluno adicionado
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            {editMode
              ? 'Clique em "Adicionar Aluno" para comecar.'
              : 'O admin ainda nao adicionou alunos.'}
          </p>
          {editMode && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Adicionar Aluno
            </button>
          )}
        </div>
      )}

      {showForm && <AddStudentForm onClose={() => setShowForm(false)} />}
    </section>
  )
}

function AddStudentForm({ onClose }: { onClose: () => void }) {
  const { addStudent } = useSite()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState("")
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
    if (!name.trim()) return
    addStudent({ name: name.trim(), description: description.trim(), photo })
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
        className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl border border-border"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-card-foreground">
            Adicionar Aluno
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* photo preview */}
        <div className="mb-4 flex flex-col items-center gap-3">
          {photo ? (
            <img
              src={photo}
              alt="Preview"
              className="h-24 w-24 rounded-full object-cover border-2 border-accent"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <User className="h-10 w-10 text-muted-foreground/40" />
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="text-sm font-medium text-primary hover:underline"
          >
            {photo ? "Trocar foto" : "Escolher foto"}
          </button>
        </div>

        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Nome
        </label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do aluno"
          className="mb-4 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
        />

        <label className="mb-1 block text-sm font-medium text-card-foreground">
          Descricao
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Uma frase sobre o aluno, apelido, etc."
          rows={2}
          className="mb-6 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
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
