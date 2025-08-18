import { useApp } from "@/contexts/AppContext"
import portfolioConfig from "@/data/portfolio-config.json"

export function usePortfolioData() {
  const { language } = useApp()

  const getLocalizedText = (textObj: { pt: string; en: string } | string) => {
    if (typeof textObj === "string") return textObj
    return textObj[language] || textObj.pt
  }

  const getLocalizedArray = <T extends { [key: string]: any }>(array: T[], localizedFields: string[]): T[] => {
    return array.map((item) => {
      const localizedItem = { ...item }
      localizedFields.forEach((field) => {
        if (item[field] && typeof item[field] === "object" && item[field].pt) {
          localizedItem[field] = getLocalizedText(item[field])
        }
      })
      return localizedItem
    })
  }

  return {
    personal: {
      ...portfolioConfig.personal,
      title: getLocalizedText(portfolioConfig.personal.title),
      subtitle: getLocalizedText(portfolioConfig.personal.subtitle),
      description: getLocalizedText(portfolioConfig.personal.description),
      location: getLocalizedText(portfolioConfig.personal.location),
    },
    about: {
      story: getLocalizedText(portfolioConfig.about.story),
      highlights: getLocalizedArray(portfolioConfig.about.highlights, ["title", "description"]),
    },
    skills: portfolioConfig.skills,
    projects: getLocalizedArray(portfolioConfig.projects, ["description"]),
    education: getLocalizedArray(portfolioConfig.education, ["degree", "description"]),
    certifications: portfolioConfig.certifications,
    getLocalizedText,
  }
}
