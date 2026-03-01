"use client"

import { useSite } from "@/lib/site-context"
import { Plus } from "lucide-react"
import { useState } from "react"
import { TopicCard, CreateTopicForm, TopicDetail } from "./topic-card"

export function TopicsSection() {
  const { state, editMode } = useSite()
  const [showCreate, setShowCreate] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-border" />
          <h2 className="text-xl font-bold text-foreground">Topicos</h2>
        </div>
        {editMode && (
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Novo Topico
          </button>
        )}
      </div>

      {state.topics.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} onSelect={setSelectedTopic} />
          ))}

          {/* add card (edit mode) */}
          {editMode && (
            <button
              onClick={() => setShowCreate(true)}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border p-6 text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              <Plus className="h-8 w-8" />
              <span className="text-sm font-medium">Adicionar Topico</span>
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
          <p className="mb-2 text-lg font-medium text-foreground">Nenhum topico criado</p>
          <p className="mb-4 text-sm text-muted-foreground">
            Clique em &quot;Editar Site&quot; para comecar a criar topicos.
          </p>
        </div>
      )}

      {/* modals */}
      {showCreate && <CreateTopicForm onClose={() => setShowCreate(false)} />}
      {selectedTopic && <TopicDetail topicId={selectedTopic} onClose={() => setSelectedTopic(null)} />}
    </section>
  )
}
