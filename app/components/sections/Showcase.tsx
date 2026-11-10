import { Link } from "react-router";
import snapshot from "~/content/github.snapshot.json";
import { Button } from "~/components/ui/Button";
import type { Project } from "~/lib/github.schema";

export function Showcase() {
  const featured = (snapshot.projects as Project[])
    .filter((p) => p.featured)
    .slice(0, 5);

  return (
    <section className="px-6 max-w-6xl mx-auto py-16 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#241346] pb-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#3DF2E0]">
            Curated work
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
            Featured Projects
          </h2>
        </div>
        <Link
          to="/projects"
          className="text-sm font-semibold text-[#B9A7FF] hover:text-[#3DF2E0] transition-colors"
        >
          View all 23 projects &rarr;
        </Link>
      </div>

      <div className="space-y-12">
        {featured.map((project, index) => (
          <article
            key={project.slug}
            className="p-8 sm:p-12 rounded-3xl bg-[#241346]/40 border border-[#241346] hover:border-[#3DF2E0]/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
          >
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8E82A9]">0{index + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DF2E0]" />
                <span className="text-xs font-medium text-[#3DF2E0]">
                  {project.language?.name || "Full Stack"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA] group-hover:text-[#3DF2E0] transition-colors">
                <Link to={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </h3>

              <p className="text-base sm:text-lg text-[#F3F1FA]/80 leading-relaxed max-w-xl">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {project.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#170B2B] text-[#B9A7FF] border border-[#241346]"
                  >
                    #{topic}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button to={`/projects/${project.slug}`} variant="primary" size="sm">
                  View Case Study
                </Button>
                <Button href={project.repoUrl} external variant="secondary" size="sm">
                  GitHub
                </Button>
                {project.liveUrl && (
                  <Button href={project.liveUrl} external variant="ghost" size="sm">
                    Live Demo &rarr;
                  </Button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              {project.media ? (
                <div className="w-full rounded-2xl overflow-hidden border border-[#241346] shadow-2xl group-hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={project.media.src}
                    alt={project.media.alt}
                    loading="lazy"
                    className="w-full h-56 sm:h-64 object-cover object-top"
                  />
                </div>
              ) : (
                <div className="w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-[#241346] to-[#170B2B] border border-[#241346] p-6 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#3DF2E0]/10 text-[#3DF2E0] flex items-center justify-center font-bold">
                    &lt;/&gt;
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#F3F1FA] font-['Bricolage_Grotesque']">
                      {project.title}
                    </p>
                    <p className="text-xs text-[#8E82A9] mt-1">Open source repository</p>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

