import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import snapshot from "~/content/github.snapshot.json";
import { site } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: `Projects — ${site.name}` },
  { name: "description", content: "Curated open-source projects, web applications, and developer tooling by Muhammad Ahmad Shahid." },
  { property: "og:title", content: `Projects — ${site.name}` },
  { property: "og:description", content: "Curated open-source projects, web applications, and developer tooling by Muhammad Ahmad Shahid." },
];

export default function ProjectsRoute() {
  const projects = snapshot.projects;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl sm:text-6xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          Projects
        </h1>
        <p className="text-[#B9A7FF] text-lg max-w-2xl">
          Live repositories, full-stack web applications, and open-source contributions automatically synced from GitHub.
        </p>
        <p className="text-xs text-[#8E82A9]">
          Updated from GitHub on {new Date(snapshot.fetchedAt).toLocaleDateString()}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="p-6 rounded-2xl bg-[#241346]/50 border border-[#241346] hover:border-[#3DF2E0]/50 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#170B2B] text-[#3DF2E0] border border-[#3DF2E0]/30">
                  {project.language?.name || "Code"}
                </span>
                <span className="text-xs text-[#8E82A9]">
                  {project.stars > 0 && `★ ${project.stars} · `}
                  {new Date(project.pushedAt).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA] group-hover:text-[#3DF2E0] transition-colors">
                <Link to={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </h2>

              <p className="text-sm text-[#F3F1FA]/80 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-[#241346]/80 text-xs">
              <Link
                to={`/projects/${project.slug}`}
                className="text-[#3DF2E0] font-semibold hover:underline"
              >
                View project details
              </Link>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8E82A9] hover:text-white transition-colors"
              >
                GitHub &rarr;
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

