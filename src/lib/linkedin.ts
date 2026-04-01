import fs from "node:fs";
import path from "node:path";

export interface LinkedInProfile {
  name: string;
  headline: string;
  summary: string;
  location: string;
  industry: string;
}

export interface LinkedInExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface LinkedInEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  activities: string;
  description: string;
}

export interface LinkedInCertification {
  name: string;
  authority: string;
  startDate: string;
  url: string;
}

export interface LinkedInData {
  lastUpdated: string;
  profile: LinkedInProfile | null;
  experience: LinkedInExperience[];
  education: LinkedInEducation[];
  skills: string[];
  certifications: LinkedInCertification[];
}

const EMPTY_DATA: LinkedInData = {
  lastUpdated: "",
  profile: null,
  experience: [],
  education: [],
  skills: [],
  certifications: [],
};

export function loadLinkedInData(): LinkedInData {
  try {
    const filePath = path.resolve("data/linkedin/profile.json");
    if (!fs.existsSync(filePath)) return EMPTY_DATA;

    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as LinkedInData;
  } catch {
    return EMPTY_DATA;
  }
}

export function mergeSkills(
  configSkills: string[],
  linkedInSkills: string[]
): string[] {
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const skill of [...configSkills, ...linkedInSkills]) {
    const normalized = skill.toLowerCase().trim();
    if (!seen.has(normalized)) {
      seen.add(normalized);
      merged.push(skill);
    }
  }

  return merged;
}
