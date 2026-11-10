import { site } from "~/content/site";

export function Intro() {
  return (
    <section className="px-6 max-w-6xl mx-auto py-12">
      <div className="p-8 sm:p-14 rounded-3xl bg-[#241346]/40 border border-[#241346] backdrop-blur-md grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA] leading-tight">
            Engineering with Discipline &amp; Clear Purpose
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#F3F1FA]/85 leading-relaxed">
            <p>
              I am a software engineering graduate from GCUF. My focus is building robust, high-performance web systems and developer utilities that solve concrete problems.
            </p>
            <p>
              Having led coding sections for Stanford’s Code in Place and engineered full-stack platforms at Bitzealth, I value clean boundaries, reliable typing with TypeScript, and systems that degrade gracefully under stress.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-8 text-sm">
            <div>
              <span className="block text-2xl font-bold text-[#3DF2E0] font-['Bricolage_Grotesque']">
                23+
              </span>
              <span className="text-[#8E82A9] text-xs">Public Repositories</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-[#B9A7FF] font-['Bricolage_Grotesque']">
                2x
              </span>
              <span className="text-[#8E82A9] text-xs">Code in Place Section Leader</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#B9A7FF]/30 to-[#3DF2E0]/30 blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />
            <picture>
              <img
                src={site.photo.src}
                alt={site.photo.alt}
                width={site.photo.width}
                height={site.photo.height}
                loading="lazy"
                className="relative w-56 h-56 rounded-2xl object-cover border border-[#B9A7FF]/40 shadow-2xl"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}

