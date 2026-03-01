"use client"

import Image from "next/image"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { SiteProvider, useSite } from "@/lib/site-context"
import { ThemeWrapper } from "@/components/theme-wrapper"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { QuickWall } from "@/components/quick-wall"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { TopicsSection } from "@/components/topics-section"
import { StudentsSection } from "@/components/students-section"
import { RafflesSection } from "@/components/raffles-section"
import { SocialLinks } from "@/components/social-links"
import { LoginScreen } from "@/components/login-screen"

function AuthGate() {
  const { user } = useAuth()

  if (!user) return <LoginScreen />

  return (
    <SiteProvider>
      <ThemeWrapper>
        <PageContent />
      </ThemeWrapper>
    </SiteProvider>
  )
}

function PageContent() {
  const { currentPage } = useSite()

  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />

      {currentPage === "inicio" && (
        <>
          <HeroSection />
          <div className="flex flex-col gap-12 pb-16">
            <StatsBar />
            <TopicsSection />
            <QuickWall />
          </div>
        </>
      )}

      {currentPage === "topicos" && (
        <div className="flex flex-col gap-12 py-10 pb-16">
          <TopicsSection />
        </div>
      )}

      {currentPage === "alunos" && (
        <div className="flex flex-col gap-12 py-10 pb-16">
          <StudentsSection />
        </div>
      )}

      {currentPage === "rifas" && (
        <div className="flex flex-col gap-12 py-10 pb-16">
          <RafflesSection />
        </div>
      )}

      {currentPage === "mural" && (
        <div className="flex flex-col gap-12 py-10 pb-16">
          <QuickWall />
        </div>
      )}

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4">
          <Image
            src="/images/banner.jpeg"
            alt="Terceirão 2k26"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-accent"
          />
          <SocialLinks size="md" />
          <p className="text-sm text-muted-foreground">
            {"Terceirão 2k26 \u2014 Turma 3\u00b02 \u2014 Feito com carinho pela galera"}
          </p>
        </div>
      </footer>

      <ThemeCustomizer />
    </main>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  )
}
