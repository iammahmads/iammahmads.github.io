import { useState } from "react";
import { site } from "~/content/site";

export function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  if (!site.email) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is unavailable
      setCopied(false);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={`mailto:${site.email}`}
        className="text-base sm:text-lg font-medium text-[#F3F1FA] hover:text-[#3DF2E0] transition-colors focus-visible:rounded"
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="px-2.5 py-1 rounded-md bg-[#241346] text-xs text-[#3DF2E0] hover:bg-[#3DF2E0] hover:text-[#170B2B] transition-colors font-semibold cursor-pointer border border-[#241346] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DF2E0]"
        aria-label="Copy email address to clipboard"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
