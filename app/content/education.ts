export type EducationData = {
  intent: {
    level: ("masters" | "phd")[];
    headline: string;
    statement: string;
    intake?: string;
    fields: string[];
    researchInterests: { title: string; why: string; evidenceTags: string[] }[];
    targetRegions?: string[];
  };
  degrees: {
    degree: string;
    institution: string;
    location?: string;
    start: string;
    end: string | "ongoing";
    grade?: string;
    highlights: string[];
    coursework?: string[];
    finalProject?: { title: string; summary: string; link?: string };
  }[];
  timeline: {
    date: string;
    title: string;
    detail?: string;
    kind: "education" | "work" | "project" | "certification" | "award";
  }[];
  credentials: {
    name: string;
    issuer: string;
    date?: string;
    score?: string;
    url?: string;
  }[];
  research?: {
    title: string;
    type: "paper" | "thesis" | "talk" | "writing";
    link?: string;
    year?: string;
  }[];
  documents: { label: string; href: string; note?: string }[];
  contact: { email?: string; subject: string };
};

export const education: EducationData = {
  intent: {
    level: ["masters"],
    headline: "Past & Future",
    statement:
      "Seeking Master's programs focused on software engineering, intelligent systems, and scalable architectures. Eager to contribute to research in code verification, distributed systems, and modern web infrastructure. Prepared through rigorous undergraduate coursework, mentorship leadership, and production software development.",
    fields: ["Software Engineering", "Computer Science", "Intelligent Systems"],
    researchInterests: [
      {
        title: "Code Integrity & Automated Compliance",
        why: "Investigating mechanisms to verify code provenance, trace authorship, and detect integrity violations in academic and enterprise codebases.",
        evidenceTags: ["TypeScript", "verification", "security", "FypGuard"],
      },
      {
        title: "Distributed Web Architecture & Scalability",
        why: "Designing resilient backend services, real-time analytics engines, and decoupled system topologies that maintain predictable latency under load.",
        evidenceTags: ["Node.js", "Express", "MongoDB", "SQL", "TypeScript"],
      },
      {
        title: "Applied AI Tooling for Developers",
        why: "Building developer productivity assistants and automated code contextualization tools powered by large language models.",
        evidenceTags: ["Python", "AI", "LablabAi", "LLM"],
      },
    ],
  },
  degrees: [
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "Government College University Faisalabad",
      location: "Faisalabad, Pakistan",
      start: "Oct 2022",
      end: "Jun 2026",
      highlights: [
        "Core focus on software architecture, design patterns, algorithms, and database systems.",
        "Active contributor to academic software development projects and departmental initiatives.",
      ],
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Analysis & Design",
        "Database Management Systems",
        "Software Architecture & Design",
        "Computer Networks",
        "Web Technologies",
      ],
      finalProject: {
        title: "FypGuard — Code Authorship and Compliance Verification",
        summary:
          "System designed to authenticate student code submissions, detect unauthorized generative assistance, and provide compliance reporting for university evaluation boards.",
        link: "https://github.com/iammahmads/FypGuard",
      },
    },
  ],
  timeline: [
    {
      date: "Jun 2025 – Present",
      title: "Software Engineer at Bitzealth",
      detail: "Developing full-stack web applications and robust digital platforms.",
      kind: "work",
    },
    {
      date: "Oct 2022 – Jun 2026",
      title: "BS Software Engineering at GCUF",
      detail: "Undergraduate degree with capstone in code verification systems.",
      kind: "education",
    },
    {
      date: "2026",
      title: "Stanford Code in Place — Mentor",
      detail:
        "One on one interactive sections, code reviews, and programming workshops for global students learning Python fundamentals.",
      kind: "education",
    },
    {
      date: "2025",
      title: "LablabAi Hackathon — CodeCommenter AI",
      detail: "Built automated code documentation and semantic commenting utility using AI models.",
      kind: "project",
    },
    {
      date: "2025",
      title: "Stanford Code in Place — Section Leader",
      detail:
        "Led weekly interactive sections, code reviews, and programming workshops for global students learning Python fundamentals.",
      kind: "education",
    },
    {
      date: "2024",
      title: "Google Project Management Certificate",
      detail: "Professional certification covering agile methodologies, project lifecycle, and execution frameworks.",
      kind: "certification",
    },
  ],
  credentials: [
    {
      name: "Google Project Management Certificate",
      issuer: "Google / Coursera",
      date: "2024",
    },
  ],
  documents: [
    {
      label: "Curriculum Vitae",
      href: "https://drive.google.com/file/d/1tK1ghdlTtlsmHn5A8Lvr4gahVW34P2e_/view?usp=drive_link",
      note: "Comprehensive overview of academic background, coursework, and research focus.",
    },
    {
      label: "Academic Transcripts & References",
      href: "#education-contact",
      note: "Available on request for admissions committees and prospective advisors.",
    },
  ],
  contact: {
    email: "mahmads0323@gmail.com",
    subject: "[Education] Prospective Master's Research Inquiry",
  },
};

