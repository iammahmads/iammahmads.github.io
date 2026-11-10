import { Link, useLocation } from "react-router";
import { site } from "~/content/site";

export function Nav() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#170B2B]/75 border-b border-[#241346]/80 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-3 text-lg font-semibold tracking-tight text-[#F3F1FA] hover:text-[#3DF2E0] transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#3DF2E0] shadow-[0_0_8px_#3DF2E0] group-hover:scale-125 transition-transform" />
          <span className="font-['Bricolage_Grotesque']">{site.name}</span>
        </Link>

        <nav aria-label="Main Navigation">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link
                to="/projects"
                className={`transition-colors py-1 hover:text-[#3DF2E0] ${
                  location.pathname.startsWith("/projects")
                    ? "text-[#3DF2E0] font-semibold border-b-2 border-[#3DF2E0]"
                    : "text-[#B9A7FF]"
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/education"
                className={`transition-colors py-1 hover:text-[#3DF2E0] ${
                  location.pathname === "/education"
                    ? "text-[#3DF2E0] font-semibold border-b-2 border-[#3DF2E0]"
                    : "text-[#B9A7FF]"
                }`}
              >
                Education
              </Link>
            </li>
            <li>
              <a
                href="/#contact"
                className="text-[#B9A7FF] hover:text-[#3DF2E0] transition-colors py-1"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href={site.links.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B9A7FF] hover:text-[#3DF2E0] transition-colors py-1 inline-flex items-center gap-1"
              >
                <span>CV</span>
                <span className="text-xs">&nearr;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

