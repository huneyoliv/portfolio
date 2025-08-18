"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Menu, X } from "lucide-react"
import { usePortfolioData } from "../hooks/usePortfolioData"
import { ThemeToggle } from "./ThemeToggle"
import { LanguageToggle } from "./LanguageToggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { getLocalizedText } = usePortfolioData()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollToSection("inicio")} className="text-xl font-medium">
            {getLocalizedText({ pt: "Portfólio", en: "Portfolio" })}
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
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-foreground/80 hover:text-foreground transition-colors"
                >
                  {getLocalizedText(item.label)}
                </button>
              ))}
              <div className="flex items-center gap-2 pt-4 border-t border-border sm:hidden">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
