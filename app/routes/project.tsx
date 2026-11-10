import type { MetaFunction } from "react-router";
import { Link, useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import snapshot from "~/content/github.snapshot.json";
import { site } from "~/content/site";
import { Button } from "~/components/ui/Button";
import { rewriteRelativeUrls, sanitizeSchema } from "~/lib/markdown";
import type { Project } from "~/lib/github.schema";

export const meta: MetaFunction = ({ params }) => {
  const slug = params.slug;
  const project = (snapshot.projects as Project[]).find((p) => p.slug === slug);
  const title = project ? `${project.title} — ${site.name}` : `Project — ${site.name}`;
  const description = project?.summary || site.tagline;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];
};

export default function ProjectDetailRoute() {
  const { slug } = useParams();
  const allProjects = snapshot.projects as Project[];
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);

  const project: Project =
    currentIndex !== -1
      ? allProjects[currentIndex]
      : {
          slug: slug || "project",
          name: slug || "Project",
          title: slug?.replace(/[-_]/g, " ") || "Project",
          summary: "Open-source application developed by Muhammad Ahmad Shahid.",
          repoUrl: site.links.github,
          stars: 0,
          forks: 0,
          pushedAt: new Date().toISOString(),
          languages: [{ name: "TypeScript", share: 100 }],
          topics: [],
          featured: false,
          order: 99,
          source: "fallback",
        };

  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const processedReadme = project.readme
    ? rewriteRelativeUrls(project.readme, project.name)
    : null;

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* Back Link */}
      <nav aria-label="Breadcrumb">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-[#3DF2E0] hover:underline"
        >
          &larr; Back to all projects
        </Link>
      </nav>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs px-3 py-1 rounded-full bg-[#241346] text-[#3DF2E0] border border-[#3DF2E0]/30 font-semibold">
            {project.language?.name || "Code"}
          </span>
          {project.featured && (
            <span className="text-xs px-3 py-1 rounded-full bg-[#3DF2E0]/20 text-[#3DF2E0] font-semibold">
              Featured Project
            </span>
          )}
          <span className="text-xs text-[#8E82A9]">
            Last updated {new Date(project.pushedAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA] leading-[1.05]">
          {project.title}
        </h1>

        <p className="text-xl sm:text-2xl text-[#B9A7FF] leading-relaxed font-['Instrument_Sans']">
          {project.summary}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button href={project.repoUrl} external variant="primary" size="md">
            View on GitHub &rarr;
          </Button>
          {project.liveUrl && (
            <Button href={project.liveUrl} external variant="secondary" size="md">
              Open Live Demo
            </Button>
          )}
        </div>
      </header>

      {/* Media Plate */}
      <section className="space-y-4">
        {project.media ? (
          <div className="rounded-3xl overflow-hidden border border-[#241346] shadow-2xl bg-[#170B2B]">
            <img
              src={project.media.src}
              alt={project.media.alt}
              className="w-full h-auto max-h-[500px] object-cover object-top"
            />
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[#241346]/80 to-[#170B2B] border border-[#241346] space-y-4">
            <span className="text-xs font-mono text-[#3DF2E0] uppercase tracking-wider">
              Technical Profile
            </span>
            <p className="text-2xl font-bold text-[#F3F1FA] font-['Bricolage_Grotesque']">
              {project.name}
            </p>
            <p className="text-sm text-[#F3F1FA]/70 leading-relaxed max-w-xl">
              This repository forms part of Muhammad Ahmad Shahid’s verified portfolio of public software projects, implementing typed abstractions and scalable architecture.
            </p>
          </div>
        )}
      </section>

      {/* Project Topics & Stack Details */}
      <section className="p-8 rounded-3xl bg-[#241346]/30 border border-[#241346] space-y-6">
        <h2 className="text-xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          Stack &amp; Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.topics.length > 0 ? (
            project.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 rounded-xl bg-[#170B2B] text-xs font-medium text-[#B9A7FF] border border-[#241346]"
              >
                #{topic}
              </span>
            ))
          ) : (
            <span className="text-xs text-[#8E82A9]">
              Technologies indexed from repository language metadata.
            </span>
          )}
        </div>
      </section>

      {/* README Case Study */}
      {processedReadme && (
        <section className="p-8 sm:p-12 rounded-3xl bg-[#241346]/30 border border-[#241346] space-y-6">
          <h2 className="text-2xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA] border-b border-[#241346] pb-4">
            Repository Documentation
          </h2>
          <div className="prose prose-invert max-w-none prose-headings:font-['Bricolage_Grotesque'] prose-headings:text-[#F3F1FA] prose-p:text-[#F3F1FA]/80 prose-a:text-[#3DF2E0] prose-code:text-[#3DF2E0] prose-code:bg-[#170B2B] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#170B2B] prose-pre:border prose-pre:border-[#241346]">
            <ReactMarkdown rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}>
              {processedReadme}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* Previous / Next Navigation */}
      <footer className="pt-8 border-t border-[#241346] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {prevProject && (
          <Link
            to={`/projects/${prevProject.slug}`}
            className="p-4 rounded-2xl bg-[#241346]/30 border border-[#241346] hover:border-[#3DF2E0]/40 transition-colors text-left space-y-1 group"
          >
            <span className="text-[10px] text-[#8E82A9] uppercase font-mono block">
              &larr; Previous Project
            </span>
            <span className="text-sm font-bold text-[#F3F1FA] group-hover:text-[#3DF2E0] transition-colors block">
              {prevProject.title}
            </span>
          </Link>
        )}

        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="p-4 rounded-2xl bg-[#241346]/30 border border-[#241346] hover:border-[#3DF2E0]/40 transition-colors text-right space-y-1 group sm:ml-auto"
          >
            <span className="text-[10px] text-[#8E82A9] uppercase font-mono block">
              Next Project &rarr;
            </span>
            <span className="text-sm font-bold text-[#F3F1FA] group-hover:text-[#3DF2E0] transition-colors block">
              {nextProject.title}
            </span>
          </Link>
        )}
      </footer>
    </article>
  );
}
