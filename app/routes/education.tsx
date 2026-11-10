import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { education } from "~/content/education";
import { site } from "~/content/site";
import snapshot from "~/content/github.snapshot.json";
import { ContactForm } from "~/components/ui/ContactForm";
import type { Project } from "~/lib/github.schema";

export const meta: MetaFunction = () => [
  { title: `Education & Postgraduate Research — ${site.name}` },
  {
    name: "description",
    content: "Academic record, research focus, and graduate study intent of Muhammad Ahmad Shahid.",
  },
  { tagName: "link", rel: "canonical", href: `${site.url}/education` },
  { property: "og:type", content: "website" },
  { property: "og:url", content: `${site.url}/education` },
  { property: "og:title", content: `Education & Postgraduate Research — ${site.name}` },
  { property: "og:description", content: "Academic record, research focus, and graduate study intent of Muhammad Ahmad Shahid." },
  { property: "og:image", content: `${site.url}/muhammad-ahmad-shahid.jpeg` },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: `Education & Postgraduate Research — ${site.name}` },
  { name: "twitter:description", content: "Academic record, research focus, and graduate study intent of Muhammad Ahmad Shahid." },
  { name: "twitter:image", content: `${site.url}/muhammad-ahmad-shahid.jpeg` },
];

export default function EducationRoute() {
  const allProjects = snapshot.projects as Project[];

  // Helper to find projects matching evidence tags
  const findEvidenceProjects = (tags: string[]) => {
    return allProjects.filter((p) =>
      tags.some(
        (t) =>
          p.name.toLowerCase() === t.toLowerCase() ||
          p.slug.toLowerCase() === t.toLowerCase() ||
          p.language?.name.toLowerCase() === t.toLowerCase() ||
          p.topics.some((top) => top.toLowerCase() === t.toLowerCase())
      )
    );
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: `${site.url}/education`,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Government College University Faisalabad",
    },
    knowsAbout: education.intent.fields,
    jobTitle: "Software Engineer",
    sameAs: [site.links.github, site.links.linkedin, site.links.x],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Intent Section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#241346] border border-[#3DF2E0]/40 text-xs text-[#3DF2E0] font-semibold">
          <span>{education.intent.headline}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA] leading-[1.05]">
          Education &amp; Postgraduate Intent
        </h1>

        <p className="text-xl sm:text-2xl text-[#B9A7FF] leading-relaxed font-['Instrument_Sans']">
          {education.intent.statement}
        </p>

        <div className="pt-2 space-y-2">
          <p className="text-xs text-[#8E82A9]">
            Intended fields of study
          </p>
          <div className="flex flex-wrap gap-2">
            {education.intent.fields.map((field) => (
              <span
                key={field}
                className="px-3.5 py-1.5 rounded-xl bg-[#241346] text-[#F3F1FA] text-sm font-medium border border-[#241346]"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Focus and Evidence */}
      <section className="space-y-8 border-t border-[#241346] pt-12">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#3DF2E0]">
            Academic focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
            Research Interests &amp; Concrete Evidence
          </h2>
          <p className="text-[#8E82A9] text-sm">
            Each research area is supported by practical implementation in my public codebase.
          </p>
        </div>

        <div className="space-y-6">
          {education.intent.researchInterests.map((interest) => {
            const evidence = findEvidenceProjects(interest.evidenceTags);
            return (
              <div
                key={interest.title}
                className="p-8 rounded-3xl bg-[#241346]/40 border border-[#241346] space-y-4"
              >
                <h3 className="text-2xl font-bold text-[#F3F1FA] font-['Bricolage_Grotesque']">
                  {interest.title}
                </h3>
                <p className="text-base text-[#F3F1FA]/85 leading-relaxed">
                  {interest.why}
                </p>

                {evidence.length > 0 && (
                  <div className="pt-2 space-y-2 border-t border-[#241346]/80">
                    <p className="text-xs text-[#8E82A9]">Demonstrated in project:</p>
                    <div className="flex flex-wrap gap-3">
                      {evidence.map((p) => (
                        <Link
                          key={p.slug}
                          to={`/projects/${p.slug}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#170B2B] text-xs font-semibold text-[#3DF2E0] border border-[#3DF2E0]/30 hover:border-[#3DF2E0] transition-colors"
                        >
                          <span>{p.title}</span>
                          <span>&rarr;</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Academic Record */}
      <section className="space-y-8 border-t border-[#241346] pt-12">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#3DF2E0]">
            Degrees
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
            Academic Record
          </h2>
        </div>

        <div className="space-y-6">
          {education.degrees.map((deg) => (
            <div
              key={deg.degree}
              className="p-8 rounded-3xl bg-[#241346]/40 border border-[#241346] space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#241346] pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#F3F1FA] font-['Bricolage_Grotesque']">
                    {deg.degree}
                  </h3>
                  <p className="text-sm text-[#B9A7FF] mt-1">
                    {deg.institution} {deg.location && `· ${deg.location}`}
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#170B2B] text-[#3DF2E0] border border-[#3DF2E0]/30 self-start sm:self-auto">
                  {deg.start} – {deg.end}
                </span>
              </div>

              {deg.highlights && deg.highlights.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-[#8E82A9]">
                    Key highlights
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-[#F3F1FA]/80">
                    {deg.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {deg.coursework && deg.coursework.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-[#8E82A9]">
                    Relevant coursework
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {deg.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-xs px-3 py-1 rounded-lg bg-[#170B2B] text-[#F3F1FA]/80 border border-[#241346]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {deg.finalProject && (
                <div className="p-6 rounded-2xl bg-[#170B2B]/70 border border-[#3DF2E0]/30 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-[#3DF2E0] font-bold">
                      Final year capstone project
                    </span>
                    {deg.finalProject.link && (
                      <a
                        href={deg.finalProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#3DF2E0] underline hover:text-white"
                      >
                        View Repository &rarr;
                      </a>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-[#F3F1FA]">
                    {deg.finalProject.title}
                  </h4>
                  <p className="text-sm text-[#F3F1FA]/80 leading-relaxed">
                    {deg.finalProject.summary}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Journey Timeline */}
      <section className="space-y-8 border-t border-[#241346] pt-12">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#3DF2E0]">
            Chronology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
            Journey Timeline
          </h2>
        </div>

        <div className="relative border-l-2 border-[#241346] pl-6 sm:pl-8 ml-3 space-y-8">
          {education.timeline.map((item, idx) => (
            <div key={idx} className="relative space-y-1.5">
              <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#3DF2E0] border-2 border-[#170B2B]" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#3DF2E0] font-mono">
                  {item.date}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#241346] text-[#B9A7FF] capitalize">
                  {item.kind}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#F3F1FA] font-['Bricolage_Grotesque']">
                {item.title}
              </h3>
              {item.detail && (
                <p className="text-sm text-[#F3F1FA]/75 leading-relaxed">
                  {item.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Optional Research & Writing */}
      {education.research && education.research.length > 0 && (
        <section className="space-y-8 border-t border-[#241346] pt-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#3DF2E0]">
              Publications &amp; writing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
              Research &amp; Preprints
            </h2>
          </div>

          <div className="space-y-4">
            {education.research.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[#241346]/40 border border-[#241346] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#3DF2E0] font-medium capitalize">{item.type}</span>
                    {item.year && <span className="text-xs text-[#8E82A9]">· {item.year}</span>}
                  </div>
                  <h3 className="text-lg font-bold text-[#F3F1FA] mt-1">{item.title}</h3>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#3DF2E0] underline shrink-0 hover:text-white"
                  >
                    Read &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Credentials */}
      <section className="space-y-8 border-t border-[#241346] pt-12">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#3DF2E0]">
            Certifications
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
            Verified Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education.credentials.map((cred) => (
            <div
              key={cred.name}
              className="p-6 rounded-2xl bg-[#241346]/40 border border-[#241346] space-y-2"
            >
              <span className="text-xs text-[#3DF2E0] font-semibold">{cred.issuer}</span>
              <h3 className="text-base font-bold text-[#F3F1FA]">{cred.name}</h3>
              {cred.date && <p className="text-xs text-[#8E82A9]">Issued {cred.date}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Documents */}
      <section className="space-y-6 border-t border-[#241346] pt-12">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#3DF2E0]">
            Academic materials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
            Official Documents &amp; References
          </h2>
        </div>

        <div className="p-8 rounded-3xl bg-[#241346]/30 border border-[#241346] space-y-4">
          {education.documents.map((doc, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#170B2B]/60 border border-[#241346]"
            >
              <div>
                <p className="text-base font-bold text-[#F3F1FA]">{doc.label}</p>
                {doc.note && <p className="text-xs text-[#8E82A9] mt-0.5">{doc.note}</p>}
              </div>
              <a
                href="#education-contact"
                className="inline-flex items-center text-xs text-[#3DF2E0] font-semibold hover:underline shrink-0"
              >
                Request via Contact Block &rarr;
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Contact for Admissions and Supervisors */}
      <section id="education-contact" className="space-y-8 border-t border-[#241346] pt-12 scroll-mt-24">
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#3DF2E0]">
            Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
            Contact for Admissions &amp; Advisors
          </h2>
          <p className="text-base text-[#B9A7FF] max-w-2xl leading-relaxed">
            Prospective supervisors and graduate program committees are welcome to connect. Submissions through this form are tagged with <code className="text-[#3DF2E0] font-mono">[Education]</code> for prioritized notification.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#241346]/50 border border-[#241346]">
          <ContactForm sourceTag="Education" />
        </div>
      </section>
    </div>
  );
}
