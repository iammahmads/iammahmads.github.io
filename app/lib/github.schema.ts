import { z } from "zod";

export const ProjectLanguageSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
});

export const ProjectLanguageShareSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
  share: z.number(),
});

export const ProjectMediaSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string(),
  alt: z.string(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  title: z.string(),
  summary: z.string(),
  repoUrl: z.string().url(),
  liveUrl: z.string().url().optional(),
  stars: z.number().default(0),
  forks: z.number().default(0),
  pushedAt: z.string(),
  language: ProjectLanguageSchema.optional(),
  languages: z.array(ProjectLanguageShareSchema).default([]),
  topics: z.array(z.string()).default([]),
  media: ProjectMediaSchema.optional(),
  readme: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  source: z.enum(["pinned", "fallback"]).default("fallback"),
});

export const GithubSnapshotSchema = z.object({
  fetchedAt: z.string(),
  user: z.object({
    login: z.string(),
    name: z.string().nullable().optional(),
    avatarUrl: z.string().url().optional(),
    bio: z.string().nullable().optional(),
  }),
  projects: z.array(ProjectSchema),
});

export type Project = z.infer<typeof ProjectSchema>;
export type GithubSnapshot = z.infer<typeof GithubSnapshotSchema>;
