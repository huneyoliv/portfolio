import puppeteer from "puppeteer";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data", "linkedin");

const LINKEDIN_EMAIL = process.env.LINKEDIN_EMAIL;
const LINKEDIN_PASSWORD = process.env.LINKEDIN_PASSWORD;
const LINKEDIN_USERNAME = process.env.LINKEDIN_USERNAME || "huneyoliv";

if (!LINKEDIN_EMAIL || !LINKEDIN_PASSWORD) {
  console.error("LINKEDIN_EMAIL and LINKEDIN_PASSWORD are required");
  process.exit(1);
}

async function login(page) {
  console.log("Navigating to LinkedIn login...");
  await page.goto("https://www.linkedin.com/login", {
    waitUntil: "networkidle2",
    timeout: 30000,
  });

  await page.type("#username", LINKEDIN_EMAIL, { delay: 50 });
  await page.type("#password", LINKEDIN_PASSWORD, { delay: 50 });
  await page.click('[data-litms-control-urn="login-submit"]');

  await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });

  const currentUrl = page.url();
  if (currentUrl.includes("checkpoint") || currentUrl.includes("challenge")) {
    console.error("LinkedIn is requesting verification. Login blocked.");
    process.exit(1);
  }

  console.log("Login successful");
}

function extractCookie(cookies, name) {
  const cookie = cookies.find((c) => c.name === name);
  return cookie ? cookie.value : null;
}

async function fetchVoyager(cookies, endpoint) {
  const liAt = extractCookie(cookies, "li_at");
  const jsessionId = extractCookie(cookies, "JSESSIONID");

  if (!liAt) {
    console.error("li_at cookie not found");
    return null;
  }

  const headers = {
    Accept: "application/vnd.linkedin.normalized+json+2.1",
    "x-li-lang": "pt_BR",
    "x-restli-protocol-version": "2.0.0",
    Cookie: `li_at=${liAt}; JSESSIONID=${jsessionId}`,
  };

  if (jsessionId) {
    headers["csrf-token"] = jsessionId.replace(/"/g, "");
  }

  const url = `https://www.linkedin.com/voyager/api${endpoint}`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    console.error(`Failed: ${endpoint} -> ${res.status}`);
    return null;
  }

  return res.json();
}

function formatDate(dateObj) {
  if (!dateObj) return "";
  const { month, year } = dateObj;
  if (!year) return "";
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return month ? `${months[month - 1]} ${year}` : `${year}`;
}

function extractProfile(data) {
  if (!data) return null;
  const p = data.profile || data;
  return {
    name: `${p.firstName || ""} ${p.lastName || ""}`.trim(),
    headline: p.headline || "",
    summary: p.summary || "",
    location: p.locationName || p.geoLocationName || "",
    industry: p.industryName || "",
  };
}

function extractPositions(data) {
  if (!data) return [];
  const elements = data.elements || [];
  return elements
    .filter((e) => e.title)
    .map((pos) => ({
      title: pos.title || "",
      company: pos.companyName || "",
      location: pos.locationName || "",
      startDate: formatDate(pos.timePeriod?.startDate),
      endDate: pos.timePeriod?.endDate
        ? formatDate(pos.timePeriod.endDate)
        : "Presente",
      description: pos.description || "",
    }));
}

function extractEducation(data) {
  if (!data) return [];
  const elements = data.elements || [];
  return elements
    .filter((e) => e.schoolName)
    .map((edu) => ({
      school: edu.schoolName || "",
      degree: edu.degreeName || "",
      fieldOfStudy: edu.fieldOfStudy || "",
      startDate: formatDate(edu.timePeriod?.startDate),
      endDate: edu.timePeriod?.endDate
        ? formatDate(edu.timePeriod.endDate)
        : "Presente",
      activities: edu.activities || "",
      description: edu.description || "",
    }));
}

function extractSkills(data) {
  if (!data) return [];
  const elements = data.elements || [];
  const skillNames = elements
    .map((s) => s.name)
    .filter(Boolean);
  return [...new Set(skillNames)];
}

function extractCertifications(data) {
  if (!data) return [];
  const elements = data.elements || [];
  return elements
    .filter((e) => e.name)
    .map((cert) => ({
      name: cert.name || "",
      authority: cert.authority || "",
      startDate: formatDate(cert.timePeriod?.startDate),
      url: cert.url || "",
    }));
}

async function main() {
  console.log("Starting LinkedIn scraper...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await login(page);

    const cookies = await page.cookies();
    console.log("Fetching profile data via Voyager API...");

    const [profile, positions, education, skills, certifications] =
      await Promise.all([
        fetchVoyager(
          cookies,
          `/identity/profiles/${LINKEDIN_USERNAME}`
        ),
        fetchVoyager(
          cookies,
          `/identity/profiles/${LINKEDIN_USERNAME}/positions?count=50`
        ),
        fetchVoyager(
          cookies,
          `/identity/profiles/${LINKEDIN_USERNAME}/educations?count=50`
        ),
        fetchVoyager(
          cookies,
          `/identity/profiles/${LINKEDIN_USERNAME}/skills?count=100`
        ),
        fetchVoyager(
          cookies,
          `/identity/profiles/${LINKEDIN_USERNAME}/certifications?count=50`
        ),
      ]);

    const data = {
      lastUpdated: new Date().toISOString(),
      profile: extractProfile(profile),
      experience: extractPositions(positions),
      education: extractEducation(education),
      skills: extractSkills(skills),
      certifications: extractCertifications(certifications),
    };

    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(
      join(DATA_DIR, "profile.json"),
      JSON.stringify(data, null, 2)
    );
    console.log("LinkedIn data saved to data/linkedin/profile.json");
    console.log(
      `Profile: ${data.profile?.name || "N/A"}, ` +
        `Experience: ${data.experience.length}, ` +
        `Education: ${data.education.length}, ` +
        `Skills: ${data.skills.length}, ` +
        `Certifications: ${data.certifications.length}`
    );
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("Scraping failed:", err.message);
  process.exit(1);
});
