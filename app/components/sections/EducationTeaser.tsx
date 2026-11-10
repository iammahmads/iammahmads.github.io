import { education } from "~/content/education";
import { Button } from "~/components/ui/Button";

export function EducationTeaser() {
  return (
    <section className="px-6 max-w-6xl mx-auto py-16">
      <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#241346]/80 to-[#170B2B] border border-[#B9A7FF]/30 relative overflow-hidden space-y-8">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#170B2B] border border-[#3DF2E0]/40 text-xs text-[#3DF2E0] font-semibold">
            {education.intent.headline}
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA] leading-tight">
            Academic Background &amp; Research Intent
          </h2>

          <p className="text-base sm:text-lg text-[#F3F1FA]/85 leading-relaxed">
            Preparing for postgraduate study in Software Engineering &amp; Intelligent Systems. Exploring automated code verification, compliance algorithms, and scalable web topology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-[#170B2B]/70 border border-[#241346]">
            <p className="text-xs text-[#8E82A9]">Degree</p>
            <p className="text-base font-bold text-[#F3F1FA] mt-1">BS Software Engineering</p>
            <p className="text-xs text-[#B9A7FF] mt-0.5">GCUF (2022–2026)</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#170B2B]/70 border border-[#241346]">
            <p className="text-xs text-[#8E82A9]">Capstone Research</p>
            <p className="text-base font-bold text-[#F3F1FA] mt-1">FypGuard System</p>
            <p className="text-xs text-[#3DF2E0] mt-0.5">Authorship Verification</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#170B2B]/70 border border-[#241346]">
            <p className="text-xs text-[#8E82A9]">Teaching</p>
            <p className="text-base font-bold text-[#F3F1FA] mt-1">Code in Place Section Leader</p>
            <p className="text-xs text-[#FFB454] mt-0.5">Stanford (2025 &amp; 2026)</p>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-4">
          <Button to="/education" size="lg" variant="primary">
            Explore Education &amp; Research Page &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
