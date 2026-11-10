import { site } from "~/content/site";
import { Button } from "~/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 max-w-6xl mx-auto pt-8 pb-16">
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#241346]/80 border border-[#B9A7FF]/30 text-xs text-[#B9A7FF] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#3DF2E0] shadow-[0_0_8px_#3DF2E0] animate-pulse" />
          <span>Available for innovative engineering &amp; graduate study</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F3F1FA] font-['Bricolage_Grotesque'] leading-[1.02]">
            {site.name}
          </h1>

          <p className="text-2xl sm:text-3xl text-[#B9A7FF] font-medium leading-snug">
            {site.tagline}
          </p>
        </div>

        <p className="text-base sm:text-lg text-[#F3F1FA]/80 leading-relaxed max-w-2xl font-['Instrument_Sans']">
          {site.bio}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Button to="/projects" size="lg" variant="primary">
            See projects
          </Button>
          <Button to="/education" size="lg" variant="secondary">
            Education and Master's plans
          </Button>
          <Button
            href={site.links.cv}
            external
            size="lg"
            variant="ghost"
          >
            View CV &uarr;
          </Button>
        </div>
      </div>
    </section>
  );
}

