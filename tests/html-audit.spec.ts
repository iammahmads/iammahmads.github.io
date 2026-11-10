import { describe, it, expect, beforeAll } from "vitest";
import fs from "node:fs";
import path from "node:path";
import snapshot from "../app/content/github.snapshot.json";
import { site } from "../app/content/site";

describe("Pre-rendered Static HTML & SEO Verification", () => {
  const buildDir = path.join(process.cwd(), "build/client");

  beforeAll(() => {
    expect(fs.existsSync(buildDir), "build/client directory must exist").toBe(true);
  });

  const checkHtmlFile = (filePath: string, expectedText: string, expectedCanonical: string) => {
    expect(fs.existsSync(filePath), `File exists: ${filePath}`).toBe(true);
    const html = fs.readFileSync(filePath, "utf-8");

    // Lang attribute
    expect(html).toContain('lang="en"');

    // Title & Description
    expect(html).toMatch(/<title>[^<]+<\/title>/);
    expect(html).toContain('name="description"');

    // Canonical link
    expect(html).toContain(`<link rel="canonical" href="${expectedCanonical}"/>`);

    // OpenGraph & Twitter
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:description"');
    expect(html).toContain('name="twitter:card"');

    // Expected key content
    expect(html).toContain(expectedText);

    // No <canvas> in static pre-rendered HTML (performance & SEO isolation)
    expect(html).not.toContain("<canvas");
  };

  it("verifies home page static HTML, meta, canonical, and JSON-LD", () => {
    const homeHtmlPath = path.join(buildDir, "index.html");
    checkHtmlFile(homeHtmlPath, site.name, `${site.url}/`);

    const html = fs.readFileSync(homeHtmlPath, "utf-8");
    expect(html).toContain('application/ld+json');
    expect(html).toContain(site.links.github);
  });

  it("verifies projects index static HTML, meta, and canonical", () => {
    const projectsHtmlPath = path.join(buildDir, "projects/index.html");
    checkHtmlFile(projectsHtmlPath, "All Projects", `${site.url}/projects`);
  });

  it("verifies education page static HTML, meta, canonical, and JSON-LD", () => {
    const eduHtmlPath = path.join(buildDir, "education/index.html");
    checkHtmlFile(eduHtmlPath, "Government College University Faisalabad", `${site.url}/education`);

    const html = fs.readFileSync(eduHtmlPath, "utf-8");
    expect(html).toContain('application/ld+json');
    expect(html).toContain('EducationalOrganization');
  });

  it("verifies all project detail pages are statically pre-rendered with JSON-LD", () => {
    const projects = snapshot.projects;
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      const detailPath = path.join(buildDir, `projects/${project.slug}/index.html`);
      expect(fs.existsSync(detailPath), `Detail page exists for ${project.slug}`).toBe(true);
      const html = fs.readFileSync(detailPath, "utf-8");

      expect(html).toContain(`<link rel="canonical" href="${site.url}/projects/${project.slug}"/>`);
      expect(html).toContain('application/ld+json');
      expect(html).toContain('SoftwareSourceCode');
      expect(html).not.toContain("<canvas");
    }
  });

  it("verifies 404 page is generated both in 404/index.html and root 404.html", () => {
    expect(fs.existsSync(path.join(buildDir, "404/index.html"))).toBe(true);
    expect(fs.existsSync(path.join(buildDir, "404.html"))).toBe(true);
    const html = fs.readFileSync(path.join(buildDir, "404.html"), "utf-8");
    expect(html).toContain("404");
  });

  it("verifies sitemap.xml and robots.txt exist and are properly structured", () => {
    const sitemapPath = path.join(buildDir, "sitemap.xml");
    const robotsPath = path.join(buildDir, "robots.txt");
    expect(fs.existsSync(sitemapPath)).toBe(true);
    expect(fs.existsSync(robotsPath)).toBe(true);

    const sitemap = fs.readFileSync(sitemapPath, "utf-8");
    expect(sitemap).toContain(`${site.url}/`);
    expect(sitemap).toContain(`${site.url}/projects`);
    expect(sitemap).toContain(`${site.url}/education`);

    const robots = fs.readFileSync(robotsPath, "utf-8");
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain(`Sitemap: ${site.url}/sitemap.xml`);
  });
});
