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
  { tagName: "link", rel: "canonical", href: `${site.url}/` },
  { property: "og:type", content: "website" },
  { property: "og:url", content: `${site.url}/` },
  { property: "og:title", content: `${site.name} — Full-Stack Software Engineer` },
  { property: "og:description", content: site.tagline },
  { property: "og:image", content: `${site.url}/muhammad-ahmad-shahid.jpeg` },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: `${site.name} — Full-Stack Software Engineer` },
  { name: "twitter:description", content: site.tagline },
  { name: "twitter:image", content: `${site.url}/muhammad-ahmad-shahid.jpeg` },
];

export default function HomeRoute() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Software Engineer",
    description: site.bio,
    sameAs: [site.links.github, site.links.linkedin, site.links.x],
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Intro />
      <Showcase />
      <Capabilities />
      <EducationTeaser />
      <Contact />
    </div>
  );
}
