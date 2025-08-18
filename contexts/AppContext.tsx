"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark" | "system"
type Language = "pt" | "en"

type AppContextType = {
  theme: Theme
  language: Language
  effectiveTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const browserLang = navigator.language.toLowerCase()
      return browserLang.startsWith("en") ? "en" : "pt"
    }
    return "pt"
  })
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme
    const savedLanguage = localStorage.getItem("portfolio-language") as Language

    if (savedTheme) {
      setTheme(savedTheme)
    }

    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      // Auto-detect browser language if no saved preference
      const browserLang = navigator.language.toLowerCase()
      const detectedLang = browserLang.startsWith("en") ? "en" : "pt"
      setLanguage(detectedLang)
    }
  }, [])

  useEffect(() => {
    // Get system theme preference
    const getSystemTheme = () => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    // Calculate effective theme
    const calculateEffectiveTheme = () => {
      if (theme === "system") {
        return getSystemTheme()
      }
      return theme as "light" | "dark"
    }

    setEffectiveTheme(calculateEffectiveTheme())

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (theme === "system") {
        setEffectiveTheme(getSystemTheme())
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(effectiveTheme)
  }, [effectiveTheme])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("portfolio-theme", newTheme)
  }

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("portfolio-language", newLanguage)
  }

  const value: AppContextType = {
    theme,
    language,
    effectiveTheme,
    setTheme: handleSetTheme,
    setLanguage: handleSetLanguage,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

export const useAppContext = useApp
