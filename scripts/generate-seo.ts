import fs from "node:fs";
import path from "node:path";

// Load .env if present
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^['"](.*)['"]$/, "$1");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

import { site } from "../app/content/site";

interface SnapshotProject {
  slug: string;
}

interface Snapshot {
  projects: SnapshotProject[];
}

export function generateSeoFiles() {
  const rootDir = process.cwd();
  const snapshotPath = path.join(rootDir, "app/content/github.snapshot.json");
  const publicDir = path.join(rootDir, "public");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  let projects: SnapshotProject[] = [];
  if (fs.existsSync(snapshotPath)) {
    try {
      const data: Snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf-8"));
      projects = data.projects || [];
    } catch {
      console.warn("[generate-seo] Could not parse github.snapshot.json, using static routes only.");
    }
  }

  // 1. Sitemap
  const staticUrls = [
    { loc: `${site.url}/`, priority: "1.0", changefreq: "weekly" },
    { loc: `${site.url}/projects`, priority: "0.9", changefreq: "daily" },
    { loc: `${site.url}/education`, priority: "0.8", changefreq: "monthly" },
  ];

  const projectUrls = projects.map((p) => ({
    loc: `${site.url}/projects/${p.slug}`,
    priority: "0.7",
    changefreq: "weekly",
  }));

  const allUrls = [...staticUrls, ...projectUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
      .map(
        (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
      )
      .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf-8");
  console.log(`[generate-seo] Generated sitemap.xml with ${allUrls.length} URLs.`);

  // 2. Robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;

  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf-8");
  console.log("[generate-seo] Generated robots.txt.");

  // 3. Web App Manifest
  const manifest = {
    name: "Muhammad Ahmad Shahid — Software Engineer",
    short_name: "Ahmad Shahid",
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#170B2B",
    theme_color: "#170B2B",
    icons: [
      {
        src: "/favicon.jpeg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };

  fs.writeFileSync(
    path.join(publicDir, "site.webmanifest"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );
  console.log("[generate-seo] Generated site.webmanifest.");
}

// Run directly if invoked from CLI
if (process.argv[1] && process.argv[1].endsWith("generate-seo.ts")) {
  generateSeoFiles();
}
