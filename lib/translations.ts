export type TranslationKey =
  | "developer"
  | "heroDescription"
  | "viewProjects"
  | "getInTouch"
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "education"
  | "contact"
  | "portfolio"
  | "light"
  | "dark"
  | "system"
  | "portuguese"
  | "english"
  | "contact.title"
  | "contact.subtitle"
  | "contact.letsChat"
  | "contact.description"
  | "contact.sendMessage"
  | "contact.formDescription"
  | "contact.name"
  | "contact.namePlaceholder"
  | "contact.email"
  | "contact.emailPlaceholder"
  | "contact.message"
  | "contact.messagePlaceholder"
  | "contact.sendButton"
  | "contact.sending"
  | "contact.successMessage"
  | "contact.errorMessage"

export const translations = {
  pt: {
    developer: "Desenvolvedor Backend",
    heroDescription:
      "Desenvolvedor Backend especializado em criar soluções robustas e escaláveis. Apaixonado por tecnologia e sempre em busca de novos desafios.",
    viewProjects: "Ver Projetos",
    getInTouch: "Entre em Contato",
    home: "Início",
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    education: "Educação",
    contact: "Contato",
    portfolio: "Portfólio",
    light: "Claro",
    dark: "Escuro",
    system: "Sistema",
    portuguese: "Português",
    english: "Inglês",
    "contact.title": "Entre em Contato",
    "contact.subtitle":
      "Vamos conversar sobre seu próximo projeto. Estou sempre aberto a novas oportunidades e desafios",
    "contact.letsChat": "Vamos Conversar",
    "contact.description":
      "Estou sempre interessado em discutir novos projetos, oportunidades criativas ou parcerias. Não hesite em entrar em contato!",
    "contact.sendMessage": "Enviar Mensagem",
    "contact.formDescription": "Preencha o formulário abaixo e entrarei em contato em breve.",
    "contact.name": "Nome",
    "contact.namePlaceholder": "Seu nome completo",
    "contact.email": "Email",
    "contact.emailPlaceholder": "seu@email.com",
    "contact.message": "Mensagem",
    "contact.messagePlaceholder": "Conte-me sobre seu projeto ou como posso ajudá-lo...",
    "contact.sendButton": "Enviar Mensagem",
    "contact.sending": "Enviando...",
    "contact.successMessage": "Mensagem enviada com sucesso! Entrarei em contato em breve.",
    "contact.errorMessage": "Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.",
  },
  en: {
    developer: "Backend Developer",
    heroDescription:
      "Backend Developer specialized in creating robust and scalable solutions. Passionate about technology and always looking for new challenges.",
    viewProjects: "View Projects",
    getInTouch: "Get in Touch",
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    contact: "Contact",
    portfolio: "Portfolio",
    light: "Light",
    dark: "Dark",
    system: "System",
    portuguese: "Portuguese",
    english: "English",
    "contact.title": "Get in Touch",
    "contact.subtitle": "Let's talk about your next project. I'm always open to new opportunities and challenges",
    "contact.letsChat": "Let's Chat",
    "contact.description":
      "I'm always interested in discussing new projects, creative opportunities or partnerships. Don't hesitate to get in touch!",
    "contact.sendMessage": "Send Message",
    "contact.formDescription": "Fill out the form below and I'll get back to you soon.",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your full name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "your@email.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me about your project or how I can help you...",
    "contact.sendButton": "Send Message",
    "contact.sending": "Sending...",
    "contact.successMessage": "Message sent successfully! I'll get back to you soon.",
    "contact.errorMessage": "Error sending message. Please try again or contact me directly.",
  },
}

export function getVisibleSections() {
  return {
    projects: true,
    education: true,
  }
}
