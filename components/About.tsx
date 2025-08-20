"use client"

import { Card, CardContent } from "./ui/card"
import { Server, Zap, Shield, Layers } from "lucide-react"
import { usePortfolioData } from "../hooks/usePortfolioData"

export function About() {
  const { about, getLocalizedText } = usePortfolioData()

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl mb-4">{getLocalizedText({ pt: "Sobre Mim", en: "About Me" })}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {getLocalizedText({
                pt: "Desenvolvedor apaixonado por criar soluções backend eficientes e escaláveis",
                en: "Developer passionate about creating efficient and scalable backend solutions",
              })}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-fade-in-up animation-delay-300">
              <h3 className="text-2xl mb-6">{getLocalizedText({ pt: "Minha História", en: "My Story" })}</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>{about.story}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {about.highlights.map((highlight, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${500 + index * 150}ms` }}
                >
                  <CardContent className="text-center p-0">
                    {index === 0 && <Layers className="h-12 w-12 mx-auto mb-4 text-primary hover:scale-110 transition-transform duration-300" />}
                    {index === 1 && <Zap className="h-12 w-12 mx-auto mb-4 text-primary hover:scale-110 transition-transform duration-300" />}
                    {index === 2 && <Shield className="h-12 w-12 mx-auto mb-4 text-primary hover:scale-110 transition-transform duration-300" />}
                    {index === 3 && <Server className="h-12 w-12 mx-auto mb-4 text-primary hover:scale-110 transition-transform duration-300" />}
                    <h4 className="mb-2">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
