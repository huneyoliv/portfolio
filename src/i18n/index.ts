export const translations: Record<string, Record<string, string>> = {
  pt: {
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.experience": "Experiência",
    "nav.education": "Educação",
    "nav.certifications": "Certificações",
    "nav.contact": "Contato",
    "hero.greeting": "Olá! 👋",
    "hero.intro": "Eu sou",
    "about.title": "Sobre Mim",
    "projects.title": "Projetos",
    "projects.view": "Ver Projeto",
    "projects.code": "Código",
    "experience.title": "Experiência",
    "education.title": "Educação",
    "certifications.title": "Certificações",
    "contact.title": "Contato",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.message": "Mensagem",
    "contact.send": "Enviar",
    "contact.success": "Mensagem enviada com sucesso!",
    "contact.error": "Erro ao enviar. Tente novamente.",
    "footer.rights": "Todos os direitos reservados.",
  },
  en: {
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",
    "hero.greeting": "Hello! 👋",
    "hero.intro": "I'm",
    "about.title": "About Me",
    "projects.title": "Projects",
    "projects.view": "View Project",
    "projects.code": "Code",
    "experience.title": "Experience",
    "education.title": "Education",
    "certifications.title": "Certifications",
    "contact.title": "Contact",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.success": "Message sent successfully!",
    "contact.error": "Error sending. Please try again.",
    "footer.rights": "All rights reserved.",
  },
};

export function t(key: string, lang: string = "pt"): string {
  return translations[lang]?.[key] ?? translations["pt"]?.[key] ?? key;
}

export function getLocaleFromUrl(url: URL): string {
  const pathname = url.pathname;
  if (pathname.startsWith("/en")) return "en";
  return "pt";
}
