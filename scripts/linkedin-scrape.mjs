import { ApifyClient } from "apify-client";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data", "linkedin");

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const LINKEDIN_URL =
  process.env.LINKEDIN_URL || "https://www.linkedin.com/in/huneyoliv";

if (!APIFY_TOKEN) {
  console.error("APIFY_TOKEN environment variable is required");
  process.exit(1);
}

const client = new ApifyClient({ token: APIFY_TOKEN });

async function main() {
  console.log(`Scraping LinkedIn profile: ${LINKEDIN_URL}`);

  const run = await client.actor("dev_fusion/Linkedin-Profile-Scraper").call({
    profileUrls: [LINKEDIN_URL],
    cookie: process.env.LINKEDIN_COOKIE || "",
  });

  console.log(`Actor run completed: ${run.id}`);

  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  if (!items || items.length === 0) {
    throw new Error("No data returned from actor");
  }

  const raw = items[0];
  const data = transformData(raw);

  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(join(DATA_DIR, "profile.json"), JSON.stringify(data, null, 2));

  console.log("LinkedIn data saved to data/linkedin/profile.json");
  console.log(
    `Profile: ${data.profile.name}, ` +
      `Experience: ${data.experience.length}, ` +
      `Education: ${data.education.length}, ` +
      `Skills: ${data.skills.length}, ` +
      `Certifications: ${data.certifications.length}`
  );
}

function formatDate(dateObj) {
  if (!dateObj) return "";
  if (typeof dateObj === "string") return dateObj;
  const { month, year } = dateObj;
  if (!year) return "";
  return month ? `${month} ${year}` : `${year}`;
}

function transformData(raw) {
  // Suporte à estrutura do dev_fusion/Linkedin-Profile-Scraper
  const info = raw.basic_info || raw.profile || raw;

  return {
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
}

main().catch((err) => {
  console.error("Scraping failed:", err.message);
  process.exit(1);
});
