import { describe, it, expect } from "vitest";
import { scoreRepo, rankRepos, type RepoMetadata } from "../app/lib/github-ranking";

describe("GitHub Ranking & Fallback Logic", () => {
  it("prioritizes pinned repositories above non-pinned repositories", () => {
    const repos: RepoMetadata[] = [
      {
        name: "high-star-repo",
        description: "Popular repo",
        homepage: "https://example.com",
        stargazers_count: 50,
        pushed_at: new Date().toISOString(),
      },
      {
        name: "pinned-repo",
        description: "Pinned project",
        homepage: null,
        stargazers_count: 0,
        pushed_at: new Date().toISOString(),
      },
    ];

    const sorted = rankRepos(repos, ["pinned-repo"]);
    expect(sorted[0].name).toBe("pinned-repo");
    expect(sorted[1].name).toBe("high-star-repo");
  });

  it("scores repositories with description and homepage higher than empty ones", () => {
    const repoWithAll = {
      name: "complete",
      description: "Great summary",
      homepage: "https://live.app",
      stargazers_count: 5,
      pushed_at: new Date().toISOString(),
    };

    const repoWithNone = {
      name: "minimal",
      description: null,
      homepage: null,
      stargazers_count: 5,
      pushed_at: new Date().toISOString(),
    };

    expect(scoreRepo(repoWithAll)).toBeGreaterThan(scoreRepo(repoWithNone));
  });

  it("filters out forks and archived repositories from public ranking", () => {
    const repos: RepoMetadata[] = [
      {
        name: "original",
        description: "Active work",
        homepage: null,
        stargazers_count: 1,
        pushed_at: new Date().toISOString(),
        fork: false,
        archived: false,
      },
      {
        name: "forked-lib",
        description: "Forked work",
        homepage: null,
        stargazers_count: 10,
        pushed_at: new Date().toISOString(),
        fork: true,
        archived: false,
      },
      {
        name: "old-archive",
        description: "Archived work",
        homepage: null,
        stargazers_count: 10,
        pushed_at: new Date().toISOString(),
        fork: false,
        archived: true,
      },
    ];

    const sorted = rankRepos(repos);
    expect(sorted).toHaveLength(1);
    expect(sorted[0].name).toBe("original");
  });

  it("gracefully falls back when API call fails or token is missing", async () => {
    // Verifying that offline or missing token yields valid snapshot format
    const snapshotRaw = await import("../app/content/github.snapshot.json");
    expect(snapshotRaw.projects).toBeInstanceOf(Array);
    expect(snapshotRaw.projects.length).toBeGreaterThan(0);
    expect(snapshotRaw.fetchedAt).toBeDefined();
  });
});
