"use client"

import { Card, CardContent } from "../ui/card"
import { Server, Zap, Shield, Layers } from "lucide-react"
import { usePortfolioData } from "../hooks/usePortfolioData"

export function About() {
  const { about, getLocalizedText } = usePortfolioData()

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">{getLocalizedText({ pt: "Sobre Mim", en: "About Me" })}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {getLocalizedText({
                pt: "Desenvolvedor apaixonado por criar soluções backend eficientes e escaláveis",
                en: "Developer passionate about creating efficient and scalable backend solutions",
              })}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl mb-6">{getLocalizedText({ pt: "Minha História", en: "My Story" })}</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>{about.story}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {about.highlights.map((highlight, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="text-center p-0">
                    {index === 0 && <Layers className="h-12 w-12 mx-auto mb-4 text-primary" />}
                    {index === 1 && <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />}
                    {index === 2 && <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />}
                    {index === 3 && <Server className="h-12 w-12 mx-auto mb-4 text-primary" />}
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
