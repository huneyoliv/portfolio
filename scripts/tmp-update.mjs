import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const raw = {
  "linkedinUrl": "https://www.linkedin.com/in/huneyoliv",
  "firstName": "Huney",
  "lastName": "Oliveira",
  "fullName": "Huney Oliveira",
  "headline": "Desenvolvedor Back-End em transição | Node.js · Python · FastAPI",
  "about": "Desenvolvedor back-end com experiência prática em Node.js, Python (FastAPI e Flask) e bancos de dados relacionais e não-relacionais (MySQL, MongoDB).\n\n...",
  "addressWithCountry": "Aracaju, Sergipe, Brazil",
  "profilePicHighQuality": "https://media.licdn.com/dms/image/v2/D4E03AQHz7z2dtoDk1g/profile-displayphoto-scale_100_100/B4EZkg_g5cGoAc-/0/1757195146780?e=1776902400&v=beta&t=mOxFwlgGwSoaECzJ1-v2Xl_IoC_XfzEYjdUZRCjv0zU",
  "backgroundPic": "https://media.licdn.com/dms/image/v2/D4E16AQGl7ogPdaK2lw/profile-displaybackgroundimage-shrink_350_1400/B4EZ06UCmKIkAY-/0/1774799827504?e=1776902400&v=beta&t=0GbLCS2TQ3UxRIx_VBZTqmCq5rn7hWZG6c1pzOnKXrs",
  "openToWork": false,
  "experiences": [
    {
      "title": "Técnico de manutenção",
      "companyName": "Freelance",
      "jobDescription": "• Diagnostiquei e reparei mais de 100 equipamentos...",
      "jobStartedOn": "11-2023",
      "jobLocation": "Boquim, Sergipe, Brasil · On-site",
      "jobStillWorking": false
    },
    {
      "title": "Técnico de manutenção",
      "companyName": "TeraBoss",
      "jobDescription": "• Realizei manutenção e reparo...",
      "jobLocation": "Boquim, SE · On-site",
      "jobStillWorking": false
    }
  ],
  "educations": [
    {
      "title": "Universidade Federal de Sergipe",
      "subtitle": "Bacharelado em Ciência da Computação",
      "logo": "https://media.licdn.com/dms/image/v2/D4D0BAQE-me9zEHt3wg/company-logo_200_200/company-logo_200_200/0/1736425756970?e=1776902400&v=beta&t=-HDL8CskQreuS6gd7xWiUey09nI2F2XgJm4u04-sGgk"
    },
    {
      "title": "Universidade Tiradentes-Unit",
      "subtitle": "Bacharelado, Sistemas de Informação",
      "logo": "https://media.licdn.com/dms/image/v2/D4D0BAQG5jAGLVAfu1A/company-logo_200_200/company-logo_200_200/0/1666121349084/unit_br_logo?e=1776902400&v=beta&t=bkT67ysvYhsDLlcqthi-zdLPBkMAzCjQBg4kw3gbKV4"
    }
  ],
  "licenseAndCertificates": [
    {
      "title": "Set Up an App Dev Environment on Google Cloud Skill Badge",
      "subtitle": "Google",
      "caption": "Issued Apr 2026",
      "logo": "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_100_100/B4EZmhegXHGcAU-/0/1759350753990/google_logo?e=1776902400&v=beta&t=LRCYpUl9rmgdri4awRP4FVlvccNARAtgcfqxtRHdedI"
    },
    {
      "title": "Implement Load Balancing on Compute Engine Skill Badge",
      "subtitle": "Google",
      "caption": "Issued Mar 2026",
      "logo": "https://media.licdn.com/dms/image/v2/D4E0BAQGv3cqOuUMY7g/company-logo_100_100/B4EZmhegXHGcAU-/0/1759350753990/google_logo?e=1776902400&v=beta&t=LRCYpUl9rmgdri4awRP4FVlvccNARAtgcfqxtRHdedI"
    }
  ],
  "languages": [
    {
      "name": "English",
      "proficiency": "Elementary proficiency"
    }
  ]
};

function formatDate(dateObj) {
  if (!dateObj) return "";
  if (typeof dateObj === "string") return dateObj;
  const { month, year } = dateObj;
  if (!year) return "";
  return month ? `${month} ${year}` : `${year}`;
}

const info = raw;
const data = {
  lastUpdated: new Date().toISOString(),
  profile: {
    name: info.fullName || `${info.firstName || ""} ${info.lastName || ""}`.trim() || info.name,
    headline: info.headline || "",
    summary: info.about || info.summary || "",
    location: info.addressWithCountry || info.location || "",
    profilePicture: info.profilePicHighQuality || info.profilePic || info.image || "",
    backgroundPicture: info.backgroundPic || info.backgroundPicture || "",
    openToWork: info.openToWork || info.open_to_work || false,
  },
  experience: (info.experiences || raw.experience || []).map((pos) => ({
    title: pos.title || "",
    company: pos.companyName || pos.company || "",
    location: pos.jobLocation || pos.location || "",
    startDate: pos.jobStartedOn || formatDate(pos.startDate || pos.start_date),
    endDate: (pos.jobStillWorking || pos.isCurrent || !pos.jobEndedOn && !pos.endDate) ? "Presente" : (pos.jobEndedOn || formatDate(pos.endDate || pos.end_date)),
    duration: pos.duration || "",
    description: pos.jobDescription || pos.description || "",
    employmentType: pos.employmentType || pos.employment_type || "",
    locationType: pos.jobLocationCountry || pos.locationType || "",
  })),
  education: (info.educations || raw.education || []).map((edu) => ({
    school: edu.title || edu.school || edu.schoolName || "",
    degree: edu.subtitle || edu.degree || "",
    fieldOfStudy: edu.fieldOfStudy || edu.field_of_study || "",
    startDate: edu.period?.startedOn || formatDate(edu.startDate),
    endDate: edu.period?.endedOn || formatDate(edu.endDate),
    duration: edu.duration || "",
    schoolLogo: edu.logo || edu.schoolLogo || "",
  })),
  skills: [...new Set(info.skills || info.top_skills || [])]
    .map(s => typeof s === "string" ? s : (s.title || s.name || ""))
    .filter(Boolean),
  certifications: (info.licenseAndCertificates || raw.certifications || []).map((cert) => ({
    name: cert.title || cert.name || "",
    authority: cert.subtitle || cert.authority || cert.issuer || "",
    startDate: cert.caption ? cert.caption.replace("Issued ", "").replace("Emitido em ", "") : formatDate(cert.startDate),
    url: cert.url || cert.credential_url || cert.certificateId || "",
  })),
  languages: (info.languages || raw.languages || []).map((lang) => ({
    language: lang.name || lang.language || "",
    proficiency: lang.proficiency || "",
  })),
};

const DATA_DIR = path.join(__dirname, "..", "data", "linkedin");
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.writeFileSync(path.join(DATA_DIR, "profile.json"), JSON.stringify(data, null, 2));
console.log("Feito!");
