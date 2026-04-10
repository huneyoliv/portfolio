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

  const run = await client.actor("harvestapi/linkedin-profile-scraper").call({
    profileScraperMode: "Profile details no email ($4 per 1k)",
    queries: [LINKEDIN_URL],
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
  // Suporte unificado à estrutura do harvestapi e atores anteriores
  const info = raw.basic_info || raw.profile || raw;

  return {
    lastUpdated: new Date().toISOString(),
    profile: {
      name: info.fullName || `${info.firstName || ""} ${info.lastName || ""}`.trim() || info.name,
      headline: info.headline || "",
      summary: info.about || info.summary || "",
      location: info.location?.linkedinText || info.addressWithCountry || info.location || "",
      profilePicture: info.profilePicture?.url || info.profilePicHighQuality || info.profilePic || info.image || "",
      backgroundPicture: info.coverPicture?.url || info.backgroundPic || info.backgroundPicture || "",
      openToWork: info.openToWork || info.open_to_work || false,
    },
    experience: (info.experience || info.experiences || []).map((pos) => ({
      title: pos.position || pos.title || "",
      company: pos.companyName || pos.company || "",
      location: pos.location || pos.jobLocation || "",
      startDate: pos.startDate?.text || pos.jobStartedOn || formatDate(pos.startDate || pos.start_date),
      endDate: (!pos.endDate?.text && !pos.endDate && !pos.jobEndedOn && pos.isCurrent !== false) ? "Presente" : (pos.endDate?.text || pos.jobEndedOn || formatDate(pos.endDate || pos.end_date)),
      duration: pos.duration || "",
      description: pos.description || pos.jobDescription || "",
      employmentType: pos.employmentType || pos.employment_type || "",
      locationType: pos.workplaceType || pos.jobLocationCountry || pos.locationType || "",
    })),
    education: (info.education || info.educations || []).map((edu) => ({
      school: edu.schoolName || edu.title || edu.school || "",
      degree: edu.degree || edu.subtitle || "",
      fieldOfStudy: edu.fieldOfStudy || edu.field_of_study || "",
      startDate: edu.startDate?.text || edu.period?.startedOn || formatDate(edu.startDate),
      endDate: edu.endDate?.text || edu.period?.endedOn || formatDate(edu.endDate),
      duration: edu.period || edu.duration || "",
      schoolLogo: edu.schoolLogo?.url || edu.logo || edu.schoolLogo || "",
    })),
    skills: [...new Set(info.skills || info.top_skills || [])]
      .map(s => typeof s === "string" ? s : (s.name || s.title || ""))
      .filter(Boolean),
    certifications: (info.certifications || info.licenseAndCertificates || []).map((cert) => ({
      name: cert.title || cert.name || "",
      authority: cert.issuedBy || cert.subtitle || cert.authority || cert.issuer || "",
      startDate: cert.issuedAt ? cert.issuedAt.replace("Issued ", "").replace("Emitido em ", "") : (cert.caption ? cert.caption.replace("Issued ", "").replace("Emitido em ", "") : formatDate(cert.startDate)),
      url: cert.url || cert.credential_url || cert.certificateId || "",
      logo: cert.issuedByLogo?.url || cert.issuedByLogo || cert.logo || cert.companyLogo?.url || cert.companyLogo || cert.authorityLogo || cert.image || "",
    })),
    languages: (info.languages || []).map((lang) => ({
      language: lang.name || lang.language || "",
      proficiency: lang.proficiency || "",
    })),
  };
}

main().catch((err) => {
  console.error("Scraping failed:", err.message);
  process.exit(1);
});
