import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/contexts/AppContext"

export const metadata: Metadata = {
  title: "Portfolio Pessoal",
  description: "Desenvolvedor Backend especializado em Node.js e arquiteturas escaláveis",
  generator: "v0.app",
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
