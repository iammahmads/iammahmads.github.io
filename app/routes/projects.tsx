import type { MetaFunction } from "react-router";
import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import snapshot from "~/content/github.snapshot.json";
import { site } from "~/content/site";
import { Chip } from "~/components/ui/Chip";
import type { Project } from "~/lib/github.schema";

export const meta: MetaFunction = () => [
  { title: `Projects & Systems — ${site.name}` },
  {
    name: "description",
    content: "Curated open-source projects, web applications, and developer tooling by Muhammad Ahmad Shahid.",
  },
  { tagName: "link", rel: "canonical", href: `${site.url}/projects` },
  { property: "og:type", content: "website" },
  { property: "og:url", content: `${site.url}/projects` },
  { property: "og:title", content: `Projects & Systems — ${site.name}` },
  { property: "og:description", content: "Curated open-source projects, web applications, and developer tooling by Muhammad Ahmad Shahid." },
  { property: "og:image", content: `${site.url}/muhammad-ahmad-shahid.jpeg` },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: `Projects & Systems — ${site.name}` },
  { name: "twitter:description", content: "Curated open-source projects, web applications, and developer tooling by Muhammad Ahmad Shahid." },
  { name: "twitter:image", content: `${site.url}/muhammad-ahmad-shahid.jpeg` },
];

export default function ProjectsRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTech = searchParams.get("tech") || "All";
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const projects = snapshot.projects as Project[];

  // Compute unique technologies and counts
  const techOptions = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    for (const p of projects) {
      const lang = p.language?.name;
      if (lang) {
        counts[lang] = (counts[lang] || 0) + 1;
      }
    }
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [projects]);

  // Filter projects based on active technology and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesTech =
        activeTech === "All" || p.language?.name === activeTech;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.topics.some((t) => t.toLowerCase().includes(q));
      return matchesTech && matchesQuery;
    });
  }, [projects, activeTech, searchQuery]);

  const handleSelectTech = (tech: string) => {
    if (tech === "All") {
      searchParams.delete("tech");
    } else {
      searchParams.set("tech", tech);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
      {/* Header */}
      <header className="space-y-3 sm:space-y-4 max-w-3xl">
        <span className="text-xs font-semibold text-[#3DF2E0]">
          Software &amp; systems
        </span>
        <h1 className="text-3xl xs:text-4xl sm:text-6xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          All Projects
        </h1>
        <p className="text-[#B9A7FF] text-base sm:text-lg leading-relaxed">
          Full-stack web applications, decentralized platforms, and developer tooling automatically synchronized from GitHub.
        </p>
        <p className="text-xs text-[#8E82A9]">
          Updated from GitHub on {new Date(snapshot.fetchedAt).toLocaleDateString()}
        </p>
      </header>

      {/* Filter and Search Bar */}
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 rounded-2xl bg-[#241346]/40 border border-[#241346]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {techOptions.map(({ name, count }) => (
              <Chip
                key={name}
                label={name}
                count={count}
                active={activeTech === name}
                onClick={() => handleSelectTech(name)}
              />
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects by keyword"
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#170B2B] border border-[#241346] text-[#F3F1FA] placeholder-[#8E82A9] focus:border-[#3DF2E0] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Projects List & Floating Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Project Rows */}
        <div className="lg:col-span-8 space-y-3">
          {filteredProjects.length === 0 ? (
            <div className="p-8 sm:p-12 text-center rounded-2xl bg-[#241346]/20 border border-[#241346] space-y-2">
              <p className="text-base text-[#F3F1FA] font-medium">No matching projects found</p>
              <p className="text-xs text-[#8E82A9]">
                Try clearing your search query or selecting a different technology filter.
              </p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                onMouseEnter={() => setHoveredProject(project)}
                onFocus={() => setHoveredProject(project)}
                className="block p-4 sm:p-6 rounded-2xl bg-[#241346]/30 border border-[#241346] hover:bg-[#241346]/70 hover:border-[#3DF2E0]/50 transition-all duration-200 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA] group-hover:text-[#3DF2E0] transition-colors">
                        {project.title}
                      </h2>
                      {project.featured && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3DF2E0]/15 text-[#3DF2E0] border border-[#3DF2E0]/30 font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#F3F1FA]/75 max-w-xl leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#170B2B] text-[#3DF2E0] border border-[#3DF2E0]/20">
                      {project.language?.name || "Code"}
                    </span>
                    <span className="text-xs text-[#8E82A9]">
                      {new Date(project.pushedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Live Hover Preview Panel (Desktop) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24">
          <div className="p-6 rounded-3xl bg-[#241346]/60 border border-[#241346] backdrop-blur-md space-y-4">
            <span className="text-xs text-[#8E82A9] font-medium">
              Live preview
            </span>

            {hoveredProject ? (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease]">
                {hoveredProject.media ? (
                  <img
                    src={hoveredProject.media.src}
                    alt={hoveredProject.media.alt}
                    className="w-full h-44 object-cover rounded-xl border border-[#241346]"
                  />
                ) : (
                  <div className="w-full h-44 rounded-xl bg-gradient-to-br from-[#170B2B] to-[#241346] flex flex-col items-center justify-center p-4 text-center border border-[#241346]">
                    <span className="text-2xl font-bold text-[#3DF2E0] font-['Bricolage_Grotesque']">
                      &lt;/&gt;
                    </span>
                    <span className="text-xs text-[#8E82A9] mt-2 font-mono">
                      {hoveredProject.language?.name || "Repository"}
                    </span>
                  </div>
                )}

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#F3F1FA]">
                    {hoveredProject.title}
                  </h3>
                  <p className="text-xs text-[#B9A7FF] line-clamp-3 leading-relaxed">
                    {hoveredProject.summary}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-[#241346]">
                  <Link
                    to={`/projects/${hoveredProject.slug}`}
                    className="text-[#3DF2E0] font-semibold hover:underline"
                  >
                    Read case study &rarr;
                  </Link>
                  <a
                    href={hoveredProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8E82A9] hover:text-white"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-56 flex flex-col items-center justify-center text-center p-4 text-[#8E82A9] space-y-2">
                <span className="text-xs">Hover over any project row to view details</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
