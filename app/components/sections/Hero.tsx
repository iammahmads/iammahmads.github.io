import { site } from "~/content/site";
import { Button } from "~/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 max-w-6xl mx-auto pt-4 sm:pt-8 pb-12 sm:pb-16">
      <div className="max-w-3xl space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F3F1FA] font-['Bricolage_Grotesque'] leading-[1.05] sm:leading-[1.02] break-words">
            {site.name}
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-[#B9A7FF] font-medium leading-snug">
            {site.tagline}
          </p>
        </div>

        <p className="text-base sm:text-lg text-[#F3F1FA]/80 leading-relaxed max-w-2xl font-['Instrument_Sans']">
          {site.bio}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
          <Button to="/projects" size="lg" variant="primary" className="w-full sm:w-auto">
            See projects
          </Button>
          <Button to="/education" size="lg" variant="secondary" className="w-full sm:w-auto">
            Education
          </Button>
          <Button
            href={site.links.cv}
            external
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto"
          >
            View CV &uarr;
          </Button>
        </div>
      </div>
    </section>
  );
}

