"use client"

const INSTAGRAM_URL =
  "https://www.instagram.com/terceirao2am?igsh=ZWxoaWFkZ2Jwc3Vp"
const TIKTOK_URL =
  "https://www.tiktok.com/@terceiro2am_?_r=1&_t=ZS-94KS7akIqmK"

export function SocialLinks({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
  const btnSize =
    size === "sm"
      ? "h-8 w-8"
      : size === "lg"
        ? "h-12 w-12"
        : "h-10 w-10"

  return (
    <div className="flex items-center gap-2">
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnSize} flex items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110`}
        aria-label="Siga-nos no Instagram"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconSize}
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </a>
      <a
        href={TIKTOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnSize} flex items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110`}
        aria-label="Siga-nos no TikTok"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className={iconSize}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.56a8.27 8.27 0 0 0 4.76 1.51V6.69h-1z" />
        </svg>
      </a>
    </div>
  )
}
