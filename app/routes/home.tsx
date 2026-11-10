import type { MetaFunction } from "react-router";
import { site } from "~/content/site";
import { Hero } from "~/components/sections/Hero";
import { Intro } from "~/components/sections/Intro";
import { Showcase } from "~/components/sections/Showcase";
import { Capabilities } from "~/components/sections/Capabilities";
import { EducationTeaser } from "~/components/sections/EducationTeaser";
import { Contact } from "~/components/sections/Contact";

export const meta: MetaFunction = () => [
  { title: `${site.name} — Full-Stack Software Engineer` },
  { name: "description", content: site.tagline },
  { property: "og:title", content: `${site.name} — Full-Stack Software Engineer` },
  { property: "og:description", content: site.tagline },
  { property: "og:image", content: `${site.url}/muhammad-ahmad-shahid.jpeg` },
];

export default function HomeRoute() {
  return (
    <div className="space-y-12">
      <Hero />
      <Intro />
      <Showcase />
      <Capabilities />
      <EducationTeaser />
      <Contact />
    </div>
  );
}
