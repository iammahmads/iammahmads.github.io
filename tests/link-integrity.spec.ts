import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Internal Link Integrity Across Pre-rendered HTML", () => {
  const buildDir = path.join(process.cwd(), "build/client");

  // Collect all html files
  function getHtmlFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(getHtmlFiles(fullPath));
      } else if (file.endsWith(".html")) {
        results.push(fullPath);
      }
    }
    return results;
  }

  it("ensures all internal href links resolve to existing pre-rendered HTML pages", () => {
    const htmlFiles = getHtmlFiles(buildDir);
    expect(htmlFiles.length).toBeGreaterThan(0);

    const hrefRegex = /href="(\/[^"#:?]*)/g;
    const missingLinks = new Set<string>();

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, "utf-8");
      let match;
      while ((match = hrefRegex.exec(content)) !== null) {
        const url = match[1];
        if (!url || url === "/" || url.startsWith("/assets/") || url.endsWith(".xml") || url.endsWith(".txt") || url.endsWith(".webmanifest") || url.endsWith(".svg") || url.endsWith(".jpeg") || url.endsWith(".png")) {
          continue;
        }

        // Check if destination exists as directory with index.html or as .html
        const cleanPath = url.replace(/^\//, "");
        const asDirIndex = path.join(buildDir, cleanPath, "index.html");
        const asHtml = path.join(buildDir, `${cleanPath}.html`);

        if (!fs.existsSync(asDirIndex) && !fs.existsSync(asHtml)) {
          missingLinks.add(url);
        }
      }
    }

    expect(Array.from(missingLinks)).toEqual([]);
  });
});

