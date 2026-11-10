import { describe, it, expect } from "vitest";
import { ProjectSchema } from "../app/lib/github.schema";

describe("GitHub Schema Validation", () => {
  it("validates a well-formed project", () => {
    const sample = {
      slug: "fypguard",
      name: "FypGuard",
      title: "FypGuard",
      summary: "Code authorship and compliance verification.",
      repoUrl: "https://github.com/iammahmads/FypGuard",
      stars: 12,
      forks: 2,
      pushedAt: new Date().toISOString(),
      languages: [{ name: "TypeScript", share: 100 }],
      topics: ["software-engineering", "compliance"],
      featured: true,
      order: 1,
      source: "pinned" as const,
    };

    const parsed = ProjectSchema.safeParse(sample);
    expect(parsed.success).toBe(true);
  });

  it("fails if repoUrl is not a valid URL", () => {
    const invalid = {
      slug: "bad",
      name: "bad",
      title: "bad",
      summary: "bad",
      repoUrl: "not-a-url",
      pushedAt: new Date().toISOString(),
    };
    const parsed = ProjectSchema.safeParse(invalid);
    expect(parsed.success).toBe(false);
  });
});
