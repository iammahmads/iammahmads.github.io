import fs from "node:fs";
import path from "node:path";
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
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };

  fs.writeFileSync(
    path.join(publicDir, "site.webmanifest"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );
  console.log("[generate-seo] Generated site.webmanifest.");

  // 4. Favicon SVG
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#170B2B"/>
  <polygon points="32,8 54,22 54,44 32,56 10,44 10,22" stroke="#3DF2E0" stroke-width="2.5" fill="#241346" fill-opacity="0.8"/>
  <polygon points="32,8 32,56 54,44" fill="#B9A7FF" fill-opacity="0.2"/>
  <polygon points="32,24 44,32 32,40 20,32" stroke="#FFB454" stroke-width="2" fill="#FFB454" fill-opacity="0.45"/>
</svg>
`;

  fs.writeFileSync(path.join(publicDir, "favicon.svg"), faviconSvg, "utf-8");
  console.log("[generate-seo] Generated favicon.svg.");
}

// Run directly if invoked from CLI
if (process.argv[1] && process.argv[1].endsWith("generate-seo.ts")) {
  generateSeoFiles();
}
