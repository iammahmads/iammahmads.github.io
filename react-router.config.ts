import type { Config } from "@react-router/dev/config";
import fs from "node:fs";
import path from "node:path";

export default {
  ssr: false,
  async prerender() {
    const baseRoutes = ["/", "/projects", "/education", "/styleguide", "/404"];
    const snapshotPath = path.resolve(process.cwd(), "app/content/github.snapshot.json");
    if (fs.existsSync(snapshotPath)) {
      try {
        const raw = fs.readFileSync(snapshotPath, "utf-8");
        const data = JSON.parse(raw);
        if (Array.isArray(data.projects)) {
          const projectRoutes = data.projects.map((p: { slug: string }) => `/projects/${p.slug}`);
          return [...baseRoutes, ...projectRoutes];
        }
      } catch (err) {
        console.warn("Could not read github.snapshot.json during prerender path generation", err);
      }
    }
    return [...baseRoutes, "/projects/test"];
  },
} satisfies Config;
