import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { site } from "~/content/site";

export function Nav() {
  const location = useLocation();
  const isEducationPage = location.pathname.startsWith("/education");
  const cvUrl = isEducationPage ? site.links.educationalCv : site.links.cv;
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[#170B2B]/90 border-b border-[#241346]/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className={`transition-colors py-1 hover:text-[#3DF2E0] text-base font-semibold ${location.pathname === "/" ? "text-[#3DF2E0] border-b-2 border-[#3DF2E0]" : "text-[#B9A7FF]"
            }`}
        >
          Home
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 rounded-lg text-[#B9A7FF] hover:text-[#3DF2E0] hover:bg-[#241346]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3DF2E0]"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden sm:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link
                to="/projects"
                className={`transition-colors py-1 hover:text-[#3DF2E0] ${location.pathname.startsWith("/projects")
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
                className={`transition-colors py-1 hover:text-[#3DF2E0] ${location.pathname === "/education"
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

      {/* Mobile Drawer */}
      {menuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="sm:hidden border-b border-[#241346] bg-[#170B2B]/95 backdrop-blur-xl px-6 py-6 transition-all"
        >
          <ul className="flex flex-col gap-4 text-base font-medium">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`block py-2 transition-colors ${location.pathname === "/" ? "text-[#3DF2E0] font-semibold" : "text-[#B9A7FF]"
                  }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                onClick={() => setMenuOpen(false)}
                className={`block py-2 transition-colors ${location.pathname.startsWith("/projects") ? "text-[#3DF2E0] font-semibold" : "text-[#B9A7FF]"
                  }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/education"
                onClick={() => setMenuOpen(false)}
                className={`block py-2 transition-colors ${location.pathname === "/education" ? "text-[#3DF2E0] font-semibold" : "text-[#B9A7FF]"
                  }`}
              >
                Education
              </Link>
            </li>
            <li>
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-[#B9A7FF] hover:text-[#3DF2E0] transition-colors"
              >
                Contact
              </a>
            </li>
            <li className="pt-2 border-t border-[#241346]">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#241346] text-[#3DF2E0] border border-[#3DF2E0]/30 font-semibold"
              >
                <span>View CV</span>
                <span>&uarr;</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
