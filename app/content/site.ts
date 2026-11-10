export const site = {
  name: "Muhammad Ahmad Shahid",
  title: "Muhammad Ahmad Shahid | Software Engineer",
  handle: "iammahmads",
  tagline: "Full-stack software engineer crafting robust applications and preparing for advanced research.",
  taglineOptions: [
    "Building resilient web systems and intelligent tools from concept to code.",
    "Software engineer exploring scalable architectures, code integrity, and intelligent systems.",
    "Full-stack software engineer crafting robust applications and preparing for advanced research."
  ],
  bio: "Software engineering graduate from GCUF with experience developing full-stack web platforms, developer tooling, and intelligent systems. Former Code in Place section leader and open to postgraduate research.",
  url: process.env.SITE_URL || "https://muhammadahmad.onrender.com",
  email: "mahmads0323@gmail.com",
  links: {
    github: "https://github.com/iammahmads",
    linkedin: "https://www.linkedin.com/in/iammahmads",
    x: "https://x.com/iammahmads",
  },
  photo: {
    src: "/muhammad-ahmad-shahid.jpeg",
    alt: "Portrait of Muhammad Ahmad Shahid",
    width: 600,
    height: 600,
  },
  // Editing, deleting or recreating a question in the Google Form changes its entry ID.
  // Submissions will still look successful but fields will be lost. Re-test after any form change.
  contactForm: {
    actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdBoBjQQm-0GHZxKGxrs94P0ugnRJW_SEjbm6Bmd5KHGThAMg/formResponse",
    entries: {
      name: "entry.2005620554",
      email: "entry.1045781291",
      message: "entry.839337160",
    },
    privacyNotice: "Your message goes through Google Forms and is read only by me.",
  },
};
