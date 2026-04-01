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

  const run = await client.actor("UkdBTMOn70jc2XbdM").call({
    profile: LINKEDIN_URL,
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
  const info = raw.basic_info || {};

  return {
    lastUpdated: new Date().toISOString(),
    profile: {
      name: info.fullname || `${info.first_name || ""} ${info.last_name || ""}`.trim(),
      headline: info.headline || "",
      summary: info.about || "",
      location: info.location?.full || info.location?.city || "",
      profilePicture: info.profile_picture_url || "",
      backgroundPicture: info.background_picture_url || "",
      openToWork: info.open_to_work || false,
    },
    experience: (raw.experience || []).map((pos) => ({
      title: pos.title || "",
      company: pos.company || "",
      location: pos.location || "",
      startDate: formatDate(pos.start_date),
      endDate: pos.is_current ? "Presente" : formatDate(pos.end_date),
      duration: pos.duration || "",
      description: pos.description || "",
      employmentType: pos.employment_type || "",
      locationType: pos.location_type || "",
    })),
    education: (raw.education || []).map((edu) => ({
      school: edu.school || "",
      degree: edu.degree_name || edu.degree || "",
      fieldOfStudy: edu.field_of_study || "",
      startDate: formatDate(edu.start_date),
      endDate: formatDate(edu.end_date),
      duration: edu.duration || "",
      schoolLogo: edu.school_logo_url || "",
    })),
    skills: [...new Set(info.top_skills || [])],
    certifications: (raw.certifications || []).map((cert) => ({
      name: cert.name || cert.title || "",
      authority: cert.authority || cert.company || cert.issuer || "",
      startDate: formatDate(cert.start_date),
      url: cert.url || cert.credential_url || "",
    })),
    languages: (raw.languages || []).map((lang) => ({
      language: lang.language || "",
      proficiency: lang.proficiency || "",
    })),
  };
}

main().catch((err) => {
  console.error("Scraping failed:", err.message);
  process.exit(1);
});
