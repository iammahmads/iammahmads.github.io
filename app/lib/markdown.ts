import { defaultSchema } from "rehype-sanitize";

export interface MarkdownOptions {
  repoName?: string;
  defaultBranch?: string;
}

// Rewrite relative links and images to point to GitHub repository raw/blob URLs
export function rewriteRelativeUrls(
  markdown: string,
  repoName: string,
  owner: string = "iammahmads",
  branch: string = "main"
): string {
  const rawBase = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}`;
  const blobBase = `https://github.com/${owner}/${repoName}/blob/${branch}`;

  // Replace relative image links ![alt](path) where path does not start with http, /, or #
  let processed = markdown.replace(
    /!\[(.*?)\]\(((?!https?:\/\/|\/|#).*?)\)/g,
    `![$1](${rawBase}/$2)`
  );

  // Replace relative hyperlinks [text](path)
  processed = processed.replace(
    /\[(.*?)\]\(((?!https?:\/\/|\/|#|mailto:).*?)\)/g,
    `[$1](${blobBase}/$2)`
  );

  return processed;
}

export const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...((defaultSchema.attributes as any)?.code || []), "className"],
    span: [...((defaultSchema.attributes as any)?.span || []), "className"],
  },
};
