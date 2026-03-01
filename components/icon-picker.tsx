"use client"

import {
  Camera,
  Music,
  Heart,
  Star,
  Trophy,
  Smile,
  Zap,
  Flame,
  type LucideProps,
} from "lucide-react"

const iconMap: Record<string, React.FC<LucideProps>> = {
  camera: Camera,
  music: Music,
  heart: Heart,
  star: Star,
  trophy: Trophy,
  smile: Smile,
  zap: Zap,
  flame: Flame,
}

export function DynIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = iconMap[name] ?? Star
  return <Icon {...props} />
}
