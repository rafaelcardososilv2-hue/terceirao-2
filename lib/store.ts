/* ---------- tipos ---------- */
export interface Photo {
  id: string
  src: string
  caption: string
  topicId: string
  likes: number
  createdAt: number
}

export interface TopicType {
  id: string
  title: string
  description: string
  icon: string
  color: string
  createdAt: number
}

export interface Comment {
  id: string
  author: string
  text: string
  topicId: string
  createdAt: number
}

export interface SiteSettings {
  siteName: string
  subtitle: string
  heroText: string
  bgColor: string
  accentColor: string
  theme: "light" | "dark"
}

export interface AppState {
  topics: TopicType[]
  photos: Photo[]
  comments: Comment[]
  settings: SiteSettings
}

/* ---------- defaults ---------- */
const ICON_OPTIONS = ["camera", "music", "heart", "star", "trophy", "smile", "zap", "flame"]

export { ICON_OPTIONS }

const COLOR_OPTIONS = [
  "#e85d3a",
  "#2d6a4f",
  "#f4a261",
  "#264653",
  "#e76f51",
  "#457b9d",
  "#d4a373",
  "#9b5de5",
]

export { COLOR_OPTIONS }

const defaultTopics: TopicType[] = [
  {
    id: "trot",
    title: "Trot",
    description: "As melhores brincadeiras e zoeiras da turma",
    icon: "smile",
    color: "#e85d3a",
    createdAt: Date.now(),
  },
  {
    id: "melhores-momentos",
    title: "Melhores Momentos",
    description: "Momentos inesqueciveis que vivemos juntos",
    icon: "heart",
    color: "#2d6a4f",
    createdAt: Date.now(),
  },
  {
    id: "festas",
    title: "Festas",
    description: "Confraternizacoes e comemoracoes da sala",
    icon: "music",
    color: "#f4a261",
    createdAt: Date.now(),
  },
]

const defaultSettings: SiteSettings = {
  siteName: "Turma 3°2",
  subtitle: "Nossa sala, nossas memorias",
  heroText: "Bem-vindos ao espaco da turma mais unida! Aqui compartilhamos nossos momentos, risadas e memorias.",
  bgColor: "#faf7f2",
  accentColor: "#e85d3a",
  theme: "light",
}

/* ---------- storage helpers ---------- */
const STORAGE_KEY = "turma32_data"

export function loadState(): AppState {
  if (typeof window === "undefined") {
    return { topics: defaultTopics, photos: [], comments: [], settings: defaultSettings }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as AppState
  } catch {
    /* ignore */
  }
  return { topics: defaultTopics, photos: [], comments: [], settings: defaultSettings }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
