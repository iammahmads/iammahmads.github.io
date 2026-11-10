import fs from "node:fs";
import path from "node:path";
import { GithubSnapshotSchema, type Project, type GithubSnapshot } from "../app/lib/github.schema.js";
import { projectOverrides } from "../app/content/projects.overrides.js";

const USERNAME = "iammahmads";
const SNAPSHOT_PATH = path.resolve(process.cwd(), "app/content/github.snapshot.json");
const TOKEN = process.env.GITHUB_TOKEN;

// Helper to convert repo name to kebab-case slug
function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Fallback ranking calculation
function scoreRepo(repo: {
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  pushed_at: string;
}): number {
  let score = 0;
  if (repo.description) score += 100;
  if (repo.homepage) score += 50;
  score += repo.stargazers_count * 10;
  const daysAgo = (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);
  if (daysAgo < 365) score += Math.max(0, 50 - Math.floor(daysAgo / 10));
  return score;
}

async function syncGithub(): Promise<void> {
  console.info(`[github-sync] Syncing GitHub repositories for user: ${USERNAME}`);

  let existingSnapshot: GithubSnapshot | null = null;
  if (fs.existsSync(SNAPSHOT_PATH)) {
    try {
      const raw = fs.readFileSync(SNAPSHOT_PATH, "utf-8");
      existingSnapshot = JSON.parse(raw);
    } catch {
      existingSnapshot = null;
    }
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Antigravity-Portfolio-Sync",
  };
  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`;
  }

  try {
    // 1. Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
    if (!userRes.ok) {
      throw new Error(`GitHub user API returned ${userRes.status}: ${userRes.statusText}`);
    }
    const userData = await userRes.json();

    // 2. Fetch repos
    const reposRes = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      { headers }
    );
    if (!reposRes.ok) {
      throw new Error(`GitHub repos API returned ${reposRes.status}: ${reposRes.statusText}`);
    }
    const allRepos: any[] = await reposRes.json();

    // Filter out forks and archived repos
    const validRepos = allRepos.filter((r) => !r.fork && !r.archived);

    // Known pinned repo list (from GitHub profile)
    const pinnedNames = [
      "FypGuard",
      "short-url",
      "dev-ecommerce",
      "code_commenter",
      "erc-8004-hackathon",
      "blooging",
      "Andoid-Magent-Detector",
      "zerobug",
    ];

    const projects: Project[] = [];

    // Sort by pinned or ranking score
    validRepos.sort((a, b) => {
      const aPinned = pinnedNames.includes(a.name);
      const bPinned = pinnedNames.includes(b.name);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return scoreRepo(b) - scoreRepo(a);
    });

    for (const repo of validRepos) {
      const override = projectOverrides[repo.name] || {};
      if (override.hidden) continue;

      const slug = override.slug || toSlug(repo.name);
      const title = override.title || repo.name.replace(/[-_]/g, " ");
      const summary =
        override.summary ||
        repo.description ||
        "Production-ready application developed and maintained by Muhammad Ahmad Shahid.";

      const isPinned = pinnedNames.includes(repo.name);

      projects.push({
        slug,
        name: repo.name,
        title,
        summary,
        repoUrl: repo.html_url,
        liveUrl: override.liveUrl || repo.homepage || undefined,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        pushedAt: repo.pushed_at,
        language: repo.language ? { name: repo.language } : undefined,
        languages: repo.language ? [{ name: repo.language, share: 100 }] : [],
        topics: Array.isArray(repo.topics) ? repo.topics : [],
        media: override.media,
        featured: override.featured ?? isPinned,
        order: override.order ?? (isPinned ? 10 : 50),
        source: isPinned ? "pinned" : "fallback",
      });
    }

    // Sort projects by order then by stars/pushedAt
    projects.sort((a, b) => a.order - b.order);

    const snapshot: GithubSnapshot = {
      fetchedAt: new Date().toISOString(),
      user: {
        login: userData.login,
        name: userData.name || "Muhammad Ahmad Shahid",
        avatarUrl: userData.avatar_url,
        bio: userData.bio,
      },
      projects,
    };

    // Validate with zod
    const validated = GithubSnapshotSchema.parse(snapshot);
    fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(validated, null, 2), "utf-8");
    console.info(`[github-sync] Successfully wrote ${projects.length} projects to snapshot.`);
  } catch (err: any) {
    console.warn(`[github-sync] GitHub sync warning: ${err.message}`);
    if (existingSnapshot) {
      console.info("[github-sync] Using existing committed snapshot.");
    } else {
      console.warn("[github-sync] Creating fallback baseline snapshot.");
      const fallbackSnapshot: GithubSnapshot = {
        fetchedAt: new Date().toISOString(),
        user: {
          login: USERNAME,
          name: "Muhammad Ahmad Shahid",
        },
        projects: [
          {
            slug: "fypguard",
            name: "FypGuard",
            title: "FypGuard — Code Authorship & Compliance",
            summary: "Academic integrity and compliance verification system to detect unauthorized AI assistance.",
            repoUrl: "https://github.com/iammahmads/FypGuard",
            stars: 0,
            forks: 0,
            pushedAt: new Date().toISOString(),
            language: { name: "TypeScript" },
            languages: [{ name: "TypeScript", share: 100 }],
            topics: ["software-engineering", "compliance", "academic-integrity"],
            featured: true,
            order: 1,
            source: "pinned",
          },
          {
            slug: "short-url",
            name: "short-url",
            title: "URL Shortener & Analytics",
            summary: "URL shortening platform with real-time analytics, user dashboards, and link tracking.",
            repoUrl: "https://github.com/iammahmads/short-url",
            media: {
              type: "image",
              src: "/URL_SHORTNER.png",
              alt: "URL Shortener dashboard",
            },
            stars: 0,
            forks: 0,
            pushedAt: new Date().toISOString(),
            language: { name: "JavaScript" },
            languages: [{ name: "JavaScript", share: 100 }],
            topics: ["react", "node", "express", "mongodb"],
            featured: true,
            order: 2,
            source: "pinned",
          },
        ],
      };
      fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(fallbackSnapshot, null, 2), "utf-8");
    }
  }
}

syncGithub();
