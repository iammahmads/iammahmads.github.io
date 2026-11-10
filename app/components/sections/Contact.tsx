import { site } from "~/content/site";
import { ContactForm } from "~/components/ui/ContactForm";
import { CopyEmail } from "~/components/ui/CopyEmail";

export function Contact() {
  return (
    <section id="contact" className="px-6 max-w-6xl mx-auto py-20 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-semibold text-[#3DF2E0]">
            Contact
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-['Bricolage_Grotesque'] text-[#F3F1FA]">
            Let's build together.
          </h2>

          <p className="text-[#B9A7FF] text-base sm:text-lg leading-relaxed">
            Whether you have an inquiry regarding full-stack software development, developer tooling, or postgraduate research opportunities, feel free to reach out.
          </p>

          <div className="space-y-4 pt-4 border-t border-[#241346]">
            <div>
              <p className="text-xs text-[#8E82A9] mb-1">Direct email</p>
              <CopyEmail />
            </div>

            <div>
              <p className="text-xs text-[#8E82A9]">Profiles &amp; Verification</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-[#F3F1FA]">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3DF2E0] transition-colors underline underline-offset-4"
                >
                  GitHub
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3DF2E0] transition-colors underline underline-offset-4"
                >
                  LinkedIn
                </a>
                <a
                  href={site.links.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3DF2E0] transition-colors underline underline-offset-4"
                >
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#241346]/40 border border-[#241346] backdrop-blur-md">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

