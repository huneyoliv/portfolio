import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/contexts/AppContext"

export const metadata: Metadata = {
  title: "Huney Oliveira",
  description: "Desenvolvedor Backend especializado em Node.js e arquiteturas escaláveis",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/logos/logo_light_mode.png", media: "(prefers-color-scheme: light)", sizes: "96x96" },
      { url: "/logos/logo_dark_mode.png", media: "(prefers-color-scheme: dark)", sizes: "96x96" },
      { url: "/logos/logo_light_mode.png", media: "(prefers-color-scheme: light)", sizes: "64x64" },
      { url: "/logos/logo_dark_mode.png", media: "(prefers-color-scheme: dark)", sizes: "64x64" },
      { url: "/logos/logo_light_mode.png", sizes: "32x32" },
      { url: "/logos/logo_dark_mode.png", sizes: "32x32" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
