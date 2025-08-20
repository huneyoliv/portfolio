"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Calendar } from "lucide-react"
import { usePortfolioData } from "../hooks/usePortfolioData"

export function Education() {
  const { education, certifications, getLocalizedText } = usePortfolioData()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "degree":
        return "🎓"
      case "certification":
        return "📜"
      case "course":
        return "📚"
      default:
        return "📖"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "degree":
        return getLocalizedText({ pt: "Graduação", en: "Degree" })
      case "certification":
        return getLocalizedText({ pt: "Certificação", en: "Certification" })
      case "course":
        return getLocalizedText({ pt: "Curso", en: "Course" })
      default:
        return type
    }
  }

  const allEducationItems = [
    ...education.map((item) => ({ ...item, type: "degree" })),
    ...certifications.map((item) => ({ ...item, type: "certification" })),
  ]

  if (allEducationItems.length === 0) {
    return null
  }

  return (
    <section id="educacao" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl mb-4">
              {getLocalizedText({ pt: "Educação & Certificações", en: "Education & Certifications" })}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {getLocalizedText({
                pt: "Minha formação acadêmica e certificações profissionais que fundamentam minha expertise técnica",
                en: "My academic background and professional certifications that support my technical expertise",
              })}
            </p>
          </div>

          <div className="space-y-6">
            {allEducationItems.map((item, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      <div>
                        <CardTitle className="text-xl">{item.degree || item.name}</CardTitle>
                        <CardDescription className="text-base mt-1">{item.institution || item.issuer}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {getTypeLabel(item.type)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.period || item.date}
                      </div>
                      {item.credentialId && (
                        <div className="flex items-center gap-1">
                          <span>ID: {item.credentialId}</span>
                        </div>
                      )}
                    </div>

                    {item.description && <p className="text-muted-foreground">{item.description}</p>}
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
