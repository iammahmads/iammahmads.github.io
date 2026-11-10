export interface RepoMetadata {
  name: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork?: boolean;
  archived?: boolean;
}

export function scoreRepo(repo: {
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  pushed_at: string;
}): number {
  let score = 0;
  if (repo.description && repo.description.trim().length > 0) {
    score += 100;
  }
  if (repo.homepage && repo.homepage.trim().length > 0) {
    score += 50;
  }
  score += repo.stargazers_count * 10;
  const daysAgo = (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);
  if (daysAgo < 365) {
    score += Math.max(0, 50 - Math.floor(daysAgo / 10));
  }
  return score;
}

export function rankRepos<T extends RepoMetadata>(
  repos: T[],
  pinnedNames: string[] = []
): T[] {
  const filtered = repos.filter((r) => !r.fork && !r.archived);

  return filtered.sort((a, b) => {
    const aPinned = pinnedNames.includes(a.name);
    const bPinned = pinnedNames.includes(b.name);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return scoreRepo(b) - scoreRepo(a);
  });
}
