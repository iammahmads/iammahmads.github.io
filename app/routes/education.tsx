import type { MetaFunction } from "react-router";
import { education } from "~/content/education";
import { site } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: `Education & Postgraduate Research — ${site.name}` },
  {
    name: "description",
    content: "Academic record, research focus, and graduate study intent of Muhammad Ahmad Shahid.",
  },
  {
    property: "og:title",
    content: `Education & Postgraduate Research — ${site.name}`,
  },
  {
    property: "og:description",
    content: "Academic record, research focus, and graduate study intent of Muhammad Ahmad Shahid.",
  },
];

export default function EducationRoute() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Intent section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241346] border border-[#3DF2E0]/40 text-xs text-[#3DF2E0]">
          <span>{education.intent.headline}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          Academic Background & Research Intent
        </h1>

        <p className="text-lg sm:text-xl text-[#B9A7FF] leading-relaxed">
          {education.intent.statement}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {education.intent.fields.map((field) => (
            <span
              key={field}
              className="px-3 py-1 rounded-md bg-[#241346] text-[#F3F1FA] text-sm border border-[#241346]"
            >
              {field}
            </span>
          ))}
        </div>
      </section>

      {/* Research interests */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          Research Interests & Evidence
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {education.intent.researchInterests.map((interest) => (
            <div
              key={interest.title}
              className="p-6 rounded-2xl bg-[#241346]/40 border border-[#241346] space-y-3"
            >
              <h3 className="text-xl font-bold text-[#F3F1FA] font-['Bricolage_Grotesque']">
                {interest.title}
              </h3>
              <p className="text-sm text-[#F3F1FA]/80 leading-relaxed">
                {interest.why}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {interest.evidenceTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded bg-[#170B2B] text-[#3DF2E0] border border-[#3DF2E0]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Degrees */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          Academic Record
        </h2>
        {education.degrees.map((deg) => (
          <div
            key={deg.degree}
            className="p-6 rounded-2xl bg-[#241346]/50 border border-[#241346] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-[#F3F1FA]">{deg.degree}</h3>
              <span className="text-xs text-[#3DF2E0] font-semibold">
                {deg.start} – {deg.end}
              </span>
            </div>
            <p className="text-sm text-[#B9A7FF]">
              {deg.institution} {deg.location && `· ${deg.location}`}
            </p>
            {deg.finalProject && (
              <div className="p-4 rounded-xl bg-[#170B2B]/60 border border-[#241346] space-y-2 text-xs">
                <span className="text-[#3DF2E0] font-semibold uppercase tracking-wider">
                  Final Year Project
                </span>
                <p className="text-[#F3F1FA] font-bold text-sm">
                  {deg.finalProject.title}
                </p>
                <p className="text-[#F3F1FA]/70">{deg.finalProject.summary}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Timeline */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          Journey Timeline
        </h2>
        <div className="space-y-4 border-l-2 border-[#241346] pl-6 ml-2">
          {education.timeline.map((item, idx) => (
            <div key={idx} className="relative space-y-1">
              <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#3DF2E0]" />
              <span className="text-xs text-[#3DF2E0] font-medium">{item.date}</span>
              <h3 className="text-base font-bold text-[#F3F1FA]">{item.title}</h3>
              {item.detail && (
                <p className="text-sm text-[#F3F1FA]/70">{item.detail}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
