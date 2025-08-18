"use client"

import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { ExternalLink, Github, FileText, ImageIcon } from "lucide-react"
import { usePortfolioData } from "../hooks/usePortfolioData"
import { useState } from "react"

export function Projects() {
  const { projects, getLocalizedText } = usePortfolioData()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Se não houver projetos, não renderiza a seção
  if (projects.length === 0) {
    return null
  }

  return (
    <section id="projetos" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 font-bold">
              {getLocalizedText({ pt: "Projetos", en: "Projects" })}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
              {getLocalizedText({
                pt: "Alguns dos projetos backend que desenvolvi, focando em performance, escalabilidade e boas práticas",
                en: "Some of the backend projects I've developed, focusing on performance, scalability and best practices",
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.gallery?.[0] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-lg md:text-xl leading-tight">{project.title}</CardTitle>
                  <CardDescription className="text-sm md:text-base leading-relaxed">
                    {getLocalizedText(project.description)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2 flex-col sm:flex-row pt-0">
                  <div className="flex gap-2 w-full">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild className="flex-1 min-w-0 bg-transparent">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
                          <span className="truncate">{getLocalizedText({ pt: "Código", en: "Code" })}</span>
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button size="sm" asChild className="flex-1 min-w-0">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
                          <span className="truncate">Demo</span>
                        </a>
                      </Button>
                    )}
                  </div>
                  {(project.gallery && project.gallery.length > 1) || project.documentation ? (
                    <div className="flex gap-2 w-full">
                      {project.gallery && project.gallery.length > 1 && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="secondary" size="sm" className="flex-1 min-w-0">
                              <ImageIcon className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
                              <span className="truncate">{getLocalizedText({ pt: "Galeria", en: "Gallery" })}</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 p-2 md:p-4">
                              {project.gallery.map((image, imgIndex) => (
                                <div key={imgIndex} className="aspect-video overflow-hidden rounded-lg">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`${project.title} - ${getLocalizedText({ pt: "Imagem", en: "Image" })} ${imgIndex + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    onClick={() => setSelectedImage(image)}
                                  />
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      {project.documentation && (
                        <Button variant="secondary" size="sm" asChild className="flex-1 min-w-0">
                          <a href={project.documentation} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
                            <span className="truncate">Docs</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  ) : null}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-0">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Fullscreen view"
              className="w-full h-full object-contain rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}
