import { site } from "~/content/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#241346] bg-[#170B2B] text-[#8E82A9] py-12 relative z-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm text-[#F3F1FA] font-medium">{site.name}</p>
          <p className="text-xs text-[#8E82A9] mt-1">
            Built with React 19, React Router, Three.js & Tailwind CSS.
          </p>
        </div>

        <ul className="flex items-center gap-6 text-sm">
          <li>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3DF2E0] transition-colors"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3DF2E0] transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={site.links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3DF2E0] transition-colors"
            >
              X (Twitter)
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-[#3DF2E0] transition-colors"
            >
              Email
            </a>
          </li>
        </ul>

        <p className="text-xs text-[#8E82A9]">
          &copy; {currentYear} Muhammad Ahmad Shahid
        </p>
      </div>
    </footer>
  );
}

