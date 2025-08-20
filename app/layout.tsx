import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/contexts/AppContext"

export const metadata: Metadata = {
  title: "Huney Oliveira",
  description: "Desenvolvedor Backend especializado em Node.js e arquiteturas escaláveis",

  icons: {
    icon: [
      { url: "/favicons/favicon_light_mode.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicons/favicon_dark_mode.ico", media: "(prefers-color-scheme: dark)" },
      { url: "/favicons/favicon_dark_mode.ico" }, // Default fallback
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                }
                // Force scroll to top on page load
                window.addEventListener('load', () => {
                  setTimeout(() => {
                    window.scrollTo(0, 0)
                  }, 0)
                })
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
