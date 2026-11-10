import { useState } from "react";
import { skillCategories } from "~/content/skills";

export function Capabilities() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="px-6 max-w-6xl mx-auto py-16 space-y-12">
      <div className="space-y-3 border-b border-[#241346] pb-6">
        <span className="text-xs font-semibold text-[#3DF2E0] uppercase tracking-wider">
          Technical Stack
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          Engineering Capabilities
        </h2>
        <p className="text-[#B9A7FF] max-w-xl text-base">
          Grouped by engineering domain with direct evidence from public production code and open-source repositories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          <div
            key={category.name}
            className="p-8 rounded-3xl bg-[#241346]/40 border border-[#241346] space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
                {category.name}
              </h3>
              <p className="text-xs text-[#8E82A9]">{category.description}</p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-default border ${
                    hoveredSkill === skill.name
                      ? "bg-[#3DF2E0] text-[#170B2B] border-[#3DF2E0] shadow-[0_0_12px_rgba(61,242,224,0.3)] font-semibold"
                      : "bg-[#170B2B]/80 text-[#F3F1FA] border-[#241346] hover:border-[#B9A7FF]/40"
                  }`}
                >
                  <span>{skill.name}</span>
                  {skill.evidenceRepos.length > 0 && hoveredSkill === skill.name && (
                    <span className="ml-1.5 opacity-70 text-[10px]">
                      ({skill.evidenceRepos.slice(0, 2).join(", ")})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

