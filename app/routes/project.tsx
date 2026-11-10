import type { MetaFunction } from "react-router";
import { Link, useParams } from "react-router";
import snapshot from "~/content/github.snapshot.json";
import { site } from "~/content/site";
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
  const project: Project = (snapshot.projects as Project[]).find((p) => p.slug === slug) || {
    slug: slug || "test",
    name: slug || "test-project",
    title: slug === "test" ? "Test Project Spike" : slug || "Project",
    summary: "Verification spike for static route pre-rendering and dynamic slug generation.",
    repoUrl: site.links.github,
    stars: 0,
    forks: 0,
    pushedAt: new Date().toISOString(),
    languages: [{ name: "TypeScript", share: 100 }],
    topics: ["spike", "testing"],
    featured: false,
    order: 99,
    source: "fallback",
  };

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <Link
        to="/projects"
        className="inline-flex items-center text-sm text-[#3DF2E0] hover:underline"
      >
        &larr; Back to all projects
      </Link>

      <header className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          {project.title}
        </h1>
        <p className="text-xl text-[#B9A7FF] leading-relaxed">
          {project.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-[#3DF2E0] text-[#170B2B] font-semibold hover:bg-white transition-colors"
          >
            View Repository
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-[#241346] text-[#F3F1FA] border border-[#B9A7FF]/40 font-semibold hover:border-[#3DF2E0] transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </header>

      <section className="p-8 rounded-2xl bg-[#241346]/40 border border-[#241346] space-y-4 text-[#F3F1FA]/80">
        <h2 className="text-xl font-bold text-[#F3F1FA]">Project Architecture & Notes</h2>
        <p>
          This project demonstrates clean modular design, defensive typing with TypeScript, and adherence to production software engineering principles.
        </p>
      </section>
    </article>
  );
}
