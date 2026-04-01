export async function fetchGitHubProjects(username: string) {
  const token = import.meta.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`,
    { headers }
  );

  if (!res.ok) return [];

  const repos = await res.json();

  const projects = [];
  for (const repo of repos) {
    if (repo.fork || repo.private) continue;

    let hasImages = false;
    try {
      const imgRes = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/contents/img`,
        { headers }
      );
      if (imgRes.ok) {
        const imgFiles = await imgRes.json();
        hasImages = Array.isArray(imgFiles) && imgFiles.length > 0;
      }
    } catch {}

    projects.push({
      name: repo.name,
      description: repo.description || repo.name.replace(/[-_]/g, " "),
      link: repo.homepage || repo.html_url,
      codeLink: repo.html_url,
      skills: repo.topics || [],
      hasPreview: !!repo.homepage,
      images: hasImages
        ? `https://api.github.com/repos/${username}/${repo.name}/contents/img`
        : null,
      stars: repo.stargazers_count || 0,
      language: repo.language || null,
    });
  }

  return projects;
}
