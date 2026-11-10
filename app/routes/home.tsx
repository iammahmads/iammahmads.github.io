import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { site } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: `${site.name} — Software Engineer & Builder` },
  { name: "description", content: site.tagline },
  { property: "og:title", content: `${site.name} — Software Engineer & Builder` },
  { property: "og:description", content: site.tagline },
];

export default function HomeRoute() {
  return (
    <div className="space-y-32 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241346] border border-[#B9A7FF]/30 text-xs text-[#B9A7FF]">
            <span className="w-2 h-2 rounded-full bg-[#3DF2E0]" />
            <span>Available for innovative projects & graduate study</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#F3F1FA] font-['Bricolage_Grotesque'] leading-[1.08]">
            {site.name}
          </h1>

          <p className="text-xl sm:text-2xl text-[#B9A7FF] font-medium leading-relaxed">
            {site.tagline}
          </p>

          <p className="text-base sm:text-lg text-[#F3F1FA]/80 leading-relaxed max-w-2xl">
            {site.bio}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-lg bg-[#3DF2E0] text-[#170B2B] font-semibold hover:bg-white transition-all shadow-[0_0_20px_rgba(61,242,224,0.25)]"
            >
              See projects
            </Link>
            <Link
              to="/education"
              className="px-6 py-3 rounded-lg bg-[#241346] text-[#F3F1FA] border border-[#B9A7FF]/40 font-semibold hover:border-[#3DF2E0] hover:text-[#3DF2E0] transition-colors"
            >
              Education and Master's plans
            </Link>
          </div>
        </div>
      </section>

      {/* Intro section */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#241346]/60 border border-[#241346] backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
              Craft, Precision, and Architectural Discipline
            </h2>
            <p className="text-[#F3F1FA]/80 leading-relaxed">
              I believe great software emerges from clarity: clean data structures, robust typed contracts, and respect for performance. From full-stack web applications to AI-assisted developer tooling and smart contracts, I design systems built to last.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={site.photo.src}
              alt={site.photo.alt}
              width={site.photo.width}
              height={site.photo.height}
              className="w-44 h-44 rounded-2xl object-cover border-2 border-[#B9A7FF]/30 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Contact Section Anchor */}
      <section id="contact" className="px-6 max-w-6xl mx-auto scroll-mt-24">
        <div className="max-w-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
            Get in touch
          </h2>
          <p className="text-[#B9A7FF]">
            Send a direct message below, or email me at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-[#3DF2E0] underline underline-offset-4 hover:text-white"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

