"use client"

import { SiteProvider } from "@/lib/site-context"
import { ThemeWrapper } from "@/components/theme-wrapper"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { QuickWall } from "@/components/quick-wall"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { TopicsSection } from "@/components/topics-section"

export default function Home() {
  return (
    <SiteProvider>
      <ThemeWrapper>
        <main className="min-h-screen bg-background transition-colors duration-300">
          <HeroSection />

          <div className="flex flex-col gap-12 pb-16">
            <StatsBar />
            <TopicsSection />
            <QuickWall />
          </div>

          <footer className="border-t border-border py-8 text-center">
            <p className="text-sm text-muted-foreground">
              Turma 3°2 &mdash; Feito com carinho pela galera
            </p>
          </footer>

          <ThemeCustomizer />
        </main>
      </ThemeWrapper>
    </SiteProvider>
  )
}
