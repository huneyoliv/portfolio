"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import { usePortfolioData } from "../hooks/usePortfolioData"
import { ThemeToggle } from "./ThemeToggle"
import { LanguageToggle } from "./LanguageToggle"
import Image from "next/image"
import { useApp } from "@/contexts/AppContext"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { getLocalizedText } = usePortfolioData()
  const { effectiveTheme } = useApp()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Evita rolagem do body quando o menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const navItems = [
    { id: "inicio", label: { pt: "Início", en: "Home" } },
    { id: "sobre", label: { pt: "Sobre", en: "About" } },
    { id: "habilidades", label: { pt: "Habilidades", en: "Skills" } },
    { id: "projetos", label: { pt: "Projetos", en: "Projects" } },
    { id: "educacao", label: { pt: "Educação", en: "Education" } },
    { id: "contato", label: { pt: "Contato", en: "Contact" } },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between min-h-16 py-2">
          <button 
            onClick={() => scrollToSection("inicio")} 
            className="flex items-center gap-2 group hover:scale-105 transition-all duration-300"
          >
            <img
              src={effectiveTheme === "dark" ? "/logos/logo_dark_mode.png" : "/logos/logo_light_mode.png"}
              alt="Huney Oliveira"
              className="h-16 w-auto group-hover:brightness-110 transition-all duration-300"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {getLocalizedText(item.label)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 right-0 z-50 md:hidden bg-background border-t border-border shadow-lg animate-slide-down">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-foreground/80 hover:text-foreground transition-all duration-300 py-2 hover:translate-x-2 hover:bg-muted/30 rounded-md px-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {getLocalizedText(item.label)}
                  </button>
                ))}
                <div className="pt-4 border-t border-border animate-fade-in-up" style={{ animationDelay: `${navItems.length * 100}ms` }}>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <LanguageToggle />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
