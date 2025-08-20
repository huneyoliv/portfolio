"use client"

import { Button } from "./ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { usePortfolioData } from "../hooks/usePortfolioData"

export function Hero() {
  const { personal, getLocalizedText } = usePortfolioData()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center pt-32 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent animate-fade-in-up animation-delay-100">
            {getLocalizedText({ pt: "Olá, eu sou", en: "Hello, I'm" })}
            <br />
            <span className="text-primary bg-gradient-to-r from-primary via-primary to-accent bg-clip-text animate-pulse-subtle">
              {personal.name}
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl text-primary mb-3 sm:mb-4 px-2 animate-fade-in-up animation-delay-300">
            {getLocalizedText(personal.title)}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 animate-fade-in-up animation-delay-500">
            {getLocalizedText(personal.description)}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 animate-fade-in-up animation-delay-700">
            <Button
              size="lg"
              onClick={() => scrollToSection("projetos")}
              className="w-full sm:w-auto min-w-[160px] hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              Ver Projetos
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contato")}
              className="w-full sm:w-auto min-w-[160px] hover:scale-105 transition-all duration-300 hover:shadow-lg"
            >
              {getLocalizedText({ pt: "Entre em Contato", en: "Get in Touch" })}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-12 animate-fade-in-up animation-delay-900">
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 p-2 rounded-lg hover:bg-muted/50 hover:scale-110 hover:rotate-3"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 p-2 rounded-lg hover:bg-muted/50 hover:scale-110 hover:-rotate-3"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-muted-foreground hover:text-foreground transition-all duration-300 p-2 rounded-lg hover:bg-muted/50 hover:scale-110 hover:rotate-3"
              aria-label="Email"
            >
              <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
          </div>

          <button
            onClick={() => scrollToSection("sobre")}
            className="animate-bounce text-muted-foreground hover:text-foreground transition-all duration-300 p-2 rounded-lg hover:bg-muted/50 group animation-delay-1100"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="h-7 w-7 sm:h-8 sm:w-8 mx-auto group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
