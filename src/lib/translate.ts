const GOOGLE_TRANSLATE_URL =
  "https://translate.googleapis.com/translate_a/single";

export async function translateText(
  text: string,
  targetLang: string = "en"
): Promise<string> {
  if (!text || text.trim().length === 0) return text;

  const params = new URLSearchParams({
    client: "gtx",
    sl: "auto",
    tl: targetLang,
    dt: "t",
    q: text,
  });

  try {
    const res = await fetch(`${GOOGLE_TRANSLATE_URL}?${params}`);
    if (!res.ok) return text;

    const data = await res.json();
    const detectedLang = data[2] || "unknown";

    if (detectedLang === targetLang) return text;

    const translated = data[0]
      ?.map((segment: [string]) => segment[0])
      .join("");
    return translated || text;
  } catch {
    return text;
  }
}

export async function translateTexts(
  texts: string[],
  targetLang: string
): Promise<string[]> {
  return Promise.all(texts.map((t) => translateText(t, targetLang)));
}

export async function translateConfig(
  config: Record<string, unknown>,
  targetLang: string = "en"
) {
  const translated: Record<string, unknown> = { ...config };

  if (typeof config.title === "string") {
    translated.title = await translateText(config.title, targetLang);
  }
  if (typeof config.description === "string") {
    translated.description = await translateText(
      config.description,
      targetLang
    );
  }
  if (typeof config.aboutMe === "string") {
    translated.aboutMe = await translateText(config.aboutMe, targetLang);
  }

  if (Array.isArray(config.projects)) {
    translated.projects = await Promise.all(
      config.projects.map(async (p: Record<string, unknown>) => ({
        ...p,
        description:
          typeof p.description === "string"
            ? await translateText(p.description, targetLang)
            : p.description,
      }))
    );
  }

  if (Array.isArray(config.education)) {
    translated.education = await Promise.all(
      config.education.map(async (e: Record<string, unknown>) => ({
        ...e,
        degree:
          typeof e.degree === "string"
            ? await translateText(e.degree, targetLang)
            : e.degree,
        achievements: Array.isArray(e.achievements)
          ? await translateTexts(e.achievements as string[], targetLang)
          : e.achievements,
      }))
    );
  }

  return translated;
}

export async function translateGitHubProjects(
  projects: Record<string, unknown>[],
  targetLang: string
) {
  return Promise.all(
    projects.map(async (p) => ({
      ...p,
      description:
        typeof p.description === "string"
          ? await translateText(p.description, targetLang)
          : p.description,
    }))
  );
}

export async function translateLinkedInData(
  data: {
    experience?: { title: string; company: string; description: string }[];
    education?: {
      school: string;
      degree: string;
      fieldOfStudy: string;
      description: string;
      activities: string;
    }[];
    certifications?: { name: string; authority: string }[];
    profile?: { summary: string; headline: string } | null;
  },
  targetLang: string
) {
  const result = { ...data };

  if (data.profile) {
    result.profile = {
      ...data.profile,
      summary: await translateText(data.profile.summary, targetLang),
      headline: await translateText(data.profile.headline, targetLang),
    };
  }

  if (data.experience) {
    result.experience = await Promise.all(
      data.experience.map(async (exp) => ({
        ...exp,
        title: await translateText(exp.title, targetLang),
        description: await translateText(exp.description, targetLang),
      }))
    );
  }

  if (data.education) {
    result.education = await Promise.all(
      data.education.map(async (edu) => ({
        ...edu,
        degree: await translateText(edu.degree, targetLang),
        fieldOfStudy: await translateText(edu.fieldOfStudy, targetLang),
        description: await translateText(edu.description, targetLang),
      }))
    );
  }

  if (data.certifications) {
    result.certifications = await Promise.all(
      data.certifications.map(async (cert) => ({
        ...cert,
        name: await translateText(cert.name, targetLang),
      }))
    );
  }

  return result;
}
