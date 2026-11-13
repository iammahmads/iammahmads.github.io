import { useState } from "react";
import { Link, useLocation } from "react-router";
import { site } from "~/content/site";

export function Nav() {
  const location = useLocation();
  const isEducationPage = location.pathname.startsWith("/education");
  const cvUrl = isEducationPage ? site.links.educationalCv : site.links.cv;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#170B2B]/75 border-b border-[#241346]/80 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className={`transition-colors py-1 hover:text-[#3DF2E0] ${
            location.pathname === "/" ? "text-[#3DF2E0] font-semibold border-b-2 border-[#3DF2E0]" : "text-[#B9A7FF]"
          }`}
        >
          Home
        </Link>
        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-[#B9A7FF] hover:text-[#3DF2E0] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        {/* Navigation links */}
        <nav aria-label="Main Navigation" className={`flex-1 ${menuOpen ? "block" : "hidden"} sm:block`}>
          <ul className="flex flex-col sm:flex-row items-center gap-6 text-sm font-medium">
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
              <a href="/#contact" className="text-[#B9A7FF] hover:text-[#3DF2E0] transition-colors py-1">
                Contact
              </a>
            </li>
            <li>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B9A7FF] hover:text-[#3DF2E0] transition-colors py-1 inline-flex items-center gap-1"
              >
                <span>CV</span>
                <span className="text-xs">&uarr;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
