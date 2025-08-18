"use client"

import { Button } from "../ui/button"
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
    <section id="inicio" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
            {getLocalizedText({ pt: "Olá, eu sou", en: "Hello, I'm" })}
            <br />
            <span className="text-primary">{personal.name}</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl text-primary mb-3 sm:mb-4 px-2">
            {getLocalizedText(personal.title)}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            {getLocalizedText(personal.description)}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <Button size="lg" onClick={() => scrollToSection("projetos")} className="w-full sm:w-auto min-w-[160px]">
              {getLocalizedText({ pt: "Ver Projetos", en: "View Projects" })}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contato")}
              className="w-full sm:w-auto min-w-[160px]"
            >
              {getLocalizedText({ pt: "Entre em Contato", en: "Get in Touch" })}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-12">
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50"
              aria-label="Email"
            >
              <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
          </div>

          <button
            onClick={() => scrollToSection("sobre")}
            className="animate-bounce text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="h-7 w-7 sm:h-8 sm:w-8 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  )
}
