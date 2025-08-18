"use client"

import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { usePortfolioData } from "../hooks/usePortfolioData"

export function Skills() {
  const { skills, getLocalizedText } = usePortfolioData()

  const skillCategories = [
    {
      title: getLocalizedText({ pt: "Linguagens", en: "Languages" }),
      skills: skills.languages,
    },
    {
      title: "Frameworks",
      skills: skills.frameworks,
    },
    {
      title: getLocalizedText({ pt: "Bancos de Dados", en: "Databases" }),
      skills: skills.databases,
    },
    {
      title: getLocalizedText({ pt: "Ferramentas", en: "Tools" }),
      skills: skills.tools,
    },
  ]

  return (
    <section id="habilidades" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">
              {getLocalizedText({ pt: "Habilidades Técnicas", en: "Technical Skills" })}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {getLocalizedText({
                pt: "Tecnologias e ferramentas que domino para criar soluções backend robustas e escaláveis",
                en: "Technologies and tools I master to create robust and scalable backend solutions",
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-sm py-1 px-3">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
