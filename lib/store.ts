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

export interface Student {
  id: string
  name: string
  photo: string
  description: string
  createdAt: number
}

export interface Raffle {
  id: string
  title: string
  description: string
  photo: string
  sellerName: string
  sellerContact: string
  link: string
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
  students: Student[]
  raffles: Raffle[]
  settings: SiteSettings
}

/* ---------- defaults ---------- */
const ICON_OPTIONS = ["camera", "music", "heart", "star", "trophy", "smile", "zap", "flame"]

export { ICON_OPTIONS }

const COLOR_OPTIONS = [
  "#722f37",
  "#c9a84c",
  "#8b4049",
  "#d4b96a",
  "#5c2329",
  "#a35760",
  "#b8860b",
  "#9b5de5",
]

export { COLOR_OPTIONS }

const defaultTopics: TopicType[] = [
  {
    id: "trot",
    title: "Trot",
    description: "As melhores brincadeiras e zoeiras da turma",
    icon: "smile",
    color: "#722f37",
    createdAt: Date.now(),
  },
  {
    id: "melhores-momentos",
    title: "Melhores Momentos",
    description: "Momentos inesqueciveis que vivemos juntos",
    icon: "heart",
    color: "#c9a84c",
    createdAt: Date.now(),
  },
  {
    id: "festas",
    title: "Festas",
    description: "Confraternizacoes e comemoracoes da sala",
    icon: "music",
    color: "#8b4049",
    createdAt: Date.now(),
  },
]

const defaultSettings: SiteSettings = {
  siteName: "Turma 3\u00b02",
  subtitle: "Nossa sala, nossas memorias",
  heroText:
    "Bem-vindos ao espaco da turma mais unida! Aqui compartilhamos nossos momentos, risadas e memorias.",
  bgColor: "#fdf8f4",
  accentColor: "#722f37",
  theme: "light",
}

/* ---------- storage helpers ---------- */
const STORAGE_KEY = "turma32_data"

export function loadState(): AppState {
  if (typeof window === "undefined") {
    return {
      topics: defaultTopics,
      photos: [],
      comments: [],
      students: [],
      raffles: [],
      settings: defaultSettings,
    }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as AppState
      // ensure new fields exist for existing users
      if (!parsed.students) parsed.students = []
      if (!parsed.raffles) parsed.raffles = []
      return parsed
    }
  } catch {
    /* ignore */
  }
  return {
    topics: defaultTopics,
    photos: [],
    comments: [],
    students: [],
    raffles: [],
    settings: defaultSettings,
  }
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
