import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { site } from "~/content/site";

export const meta: MetaFunction = () => [
  { title: `404 Not Found — ${site.name}` },
  { name: "description", content: "The page you are looking for could not be found." },
  { name: "robots", content: "noindex, nofollow" },
];

export default function NotFoundRoute() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-6">
      <div className="space-y-2">
        <p className="text-xs text-[#3DF2E0] font-semibold">
          Error 404
        </p>
        <h1 className="text-5xl sm:text-7xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
          Page Not Found
        </h1>
      </div>

      <p className="text-[#B9A7FF] max-w-md text-base leading-relaxed">
        The link you followed does not exist or may have been moved during our architecture redesign.
      </p>

      <div className="pt-4 flex items-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-[#3DF2E0] text-[#170B2B] font-semibold hover:bg-white transition-colors"
        >
          Return Home
        </Link>
        <Link
          to="/projects"
          className="px-6 py-3 rounded-lg bg-[#241346] text-[#F3F1FA] border border-[#B9A7FF]/40 font-semibold hover:border-[#3DF2E0] transition-colors"
        >
          Explore Projects
        </Link>
      </div>
    </div>
  );
}

