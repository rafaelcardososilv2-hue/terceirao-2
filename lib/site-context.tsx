"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import {
  type AppState,
  type TopicType,
  type Photo,
  type Comment,
  type Student,
  type Raffle,
  type SiteSettings,
  loadState,
  saveState,
  uid,
} from "./store"

interface SiteContextValue {
  state: AppState
  /* topics */
  addTopic: (t: Omit<TopicType, "id" | "createdAt">) => void
  updateTopic: (id: string, t: Partial<TopicType>) => void
  deleteTopic: (id: string) => void
  /* photos */
  addPhoto: (p: Omit<Photo, "id" | "createdAt" | "likes">) => void
  deletePhoto: (id: string) => void
  likePhoto: (id: string) => void
  /* comments */
  addComment: (c: Omit<Comment, "id" | "createdAt">) => void
  deleteComment: (id: string) => void
  /* students */
  addStudent: (s: Omit<Student, "id" | "createdAt">) => void
  updateStudent: (id: string, s: Partial<Student>) => void
  deleteStudent: (id: string) => void
  /* raffles */
  addRaffle: (r: Omit<Raffle, "id" | "createdAt">) => void
  updateRaffle: (id: string, r: Partial<Raffle>) => void
  deleteRaffle: (id: string) => void
  /* settings */
  updateSettings: (s: Partial<SiteSettings>) => void
  /* ui */
  editMode: boolean
  toggleEditMode: () => void
  currentPage: string
  setCurrentPage: (page: string) => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState)
  const [editMode, setEditMode] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [currentPage, setCurrentPage] = useState("inicio")

  useEffect(() => {
    setState(loadState())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveState(state)
  }, [state, hydrated])

  /* topics */
  const addTopic = useCallback(
    (t: Omit<TopicType, "id" | "createdAt">) => {
      setState((s) => ({
        ...s,
        topics: [...s.topics, { ...t, id: uid(), createdAt: Date.now() }],
      }))
    },
    []
  )

  const updateTopic = useCallback(
    (id: string, t: Partial<TopicType>) => {
      setState((s) => ({
        ...s,
        topics: s.topics.map((topic) =>
          topic.id === id ? { ...topic, ...t } : topic
        ),
      }))
    },
    []
  )

  const deleteTopic = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      topics: s.topics.filter((topic) => topic.id !== id),
      photos: s.photos.filter((p) => p.topicId !== id),
      comments: s.comments.filter((c) => c.topicId !== id),
    }))
  }, [])

  /* photos */
  const addPhoto = useCallback(
    (p: Omit<Photo, "id" | "createdAt" | "likes">) => {
      setState((s) => ({
        ...s,
        photos: [
          ...s.photos,
          { ...p, id: uid(), createdAt: Date.now(), likes: 0 },
        ],
      }))
    },
    []
  )

  const deletePhoto = useCallback((id: string) => {
    setState((s) => ({ ...s, photos: s.photos.filter((p) => p.id !== id) }))
  }, [])

  const likePhoto = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      photos: s.photos.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      ),
    }))
  }, [])

  /* comments */
  const addComment = useCallback(
    (c: Omit<Comment, "id" | "createdAt">) => {
      setState((s) => ({
        ...s,
        comments: [
          ...s.comments,
          { ...c, id: uid(), createdAt: Date.now() },
        ],
      }))
    },
    []
  )

  const deleteComment = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      comments: s.comments.filter((c) => c.id !== id),
    }))
  }, [])

  /* students */
  const addStudent = useCallback(
    (s: Omit<Student, "id" | "createdAt">) => {
      setState((prev) => ({
        ...prev,
        students: [
          ...prev.students,
          { ...s, id: uid(), createdAt: Date.now() },
        ],
      }))
    },
    []
  )

  const updateStudent = useCallback(
    (id: string, s: Partial<Student>) => {
      setState((prev) => ({
        ...prev,
        students: prev.students.map((st) =>
          st.id === id ? { ...st, ...s } : st
        ),
      }))
    },
    []
  )

  const deleteStudent = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      students: prev.students.filter((st) => st.id !== id),
    }))
  }, [])

  /* raffles */
  const addRaffle = useCallback(
    (r: Omit<Raffle, "id" | "createdAt">) => {
      setState((prev) => ({
        ...prev,
        raffles: [
          ...prev.raffles,
          { ...r, id: uid(), createdAt: Date.now() },
        ],
      }))
    },
    []
  )

  const updateRaffle = useCallback(
    (id: string, r: Partial<Raffle>) => {
      setState((prev) => ({
        ...prev,
        raffles: prev.raffles.map((rf) =>
          rf.id === id ? { ...rf, ...r } : rf
        ),
      }))
    },
    []
  )

  const deleteRaffle = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      raffles: prev.raffles.filter((rf) => rf.id !== id),
    }))
  }, [])

  /* settings */
  const updateSettings = useCallback(
    (s: Partial<SiteSettings>) => {
      setState((prev) => ({
        ...prev,
        settings: { ...prev.settings, ...s },
      }))
    },
    []
  )

  const toggleEditMode = useCallback(() => setEditMode((v) => !v), [])

  return (
    <SiteContext.Provider
      value={{
        state,
        addTopic,
        updateTopic,
        deleteTopic,
        addPhoto,
        deletePhoto,
        likePhoto,
        addComment,
        deleteComment,
        addStudent,
        updateStudent,
        deleteStudent,
        addRaffle,
        updateRaffle,
        deleteRaffle,
        updateSettings,
        editMode,
        toggleEditMode,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error("useSite must be used within SiteProvider")
  return ctx
}
