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
    credentialId?: string;
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
      start: "Dec 2022",
      end: "Jul 2026",
      grade: "CGPA: 3.52 / 4.00 (Final Semester GPA: 3.77)",
      highlights: [
        "Core focus on software architecture, design patterns, algorithms, and database systems.",
        "Active contributor to academic software development projects and departmental initiatives.",
        "Completed Final Year Project: FypGuard (code authorship, integrity analysis, and compliance verification system).",
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
    {
      degree: "Higher Secondary Certificate (FSc Pre-Engineering)",
      institution: "Allama Iqbal Science College",
      location: "Gojra, Pakistan",
      start: "2019",
      end: "2021",
      highlights: [
        "Foundational coursework in Advanced Mathematics, Physics, and Chemistry.",
      ],
    },
  ],
  timeline: [
    {
      date: "Mar 2026 – Present",
      title: "Full Stack Web Developer at BitZealth Technologies",
      detail: "Developing full-stack web applications and robust digital platforms.",
      kind: "work",
    },
    {
      date: "Apr 2026 – May 2026",
      title: "Stanford Code in Place — Mentor",
      detail:
        "One-on-one interactive teaching sessions, code reviews, and programming workshops for global students learning Python fundamentals.",
      kind: "education",
    },
    {
      date: "Apr 2026",
      title: "CS50 Puzzle Day 2026 — Harvard University",
      detail: "Solved cryptic, multi-layered algorithmic and logical challenges under global competition constraints (2nd consecutive year).",
      kind: "award",
    },
    {
      date: "Apr 2026",
      title: "National Skills Competency Test (NSCT) — 75.7th Percentile",
      detail: "Standardized competency evaluation by Higher Education Commission Pakistan across DSA, OS, Networking, and AI/ML.",
      kind: "award",
    },
    {
      date: "Apr 2026",
      title: "AI Trading Agents Hackathon — Macro-Sentry",
      detail: "Built verifiable AI trading agent pipeline with Kraken CLI execution and on-chain ERC-8004 identity on Surge.xyz / lablab.ai.",
      kind: "project",
    },
    {
      date: "Jul 2024 – Jul 2025",
      title: "Web Developer at Russell's International",
      detail: "Collaborated on web application development, responsive design, workflows, and clean code maintenance.",
      kind: "work",
    },
    {
      date: "Apr 2025 – May 2025",
      title: "Stanford Code in Place — Section Leader",
      detail:
        "Selected from 2,000+ applicants to lead weekly interactive sections and Python programming workshops for students worldwide.",
      kind: "education",
    },
    {
      date: "Apr 2025",
      title: "CS50 Puzzle Day 2025 — Harvard University",
      detail: "Successfully solved all 9 global puzzle challenges with team Crackers.",
      kind: "award",
    },
    {
      date: "Dec 2022 – Jul 2026",
      title: "BS Software Engineering at GCUF",
      detail: "Graduated with 3.52 CGPA; capstone in code verification and authorship tracking.",
      kind: "education",
    },
    {
      date: "Jan 2023",
      title: "Google Project Management Professional Certificate",
      detail: "Completed full Coursera specialization covering Agile, Scrum, risk management, and project execution frameworks.",
      kind: "certification",
    },
  ],
  credentials: [
    {
      name: "Stanford Code in Place Section Leader",
      issuer: "Stanford Online",
      date: "Jun 2025",
      url: "https://digitalcredential.stanford.edu/check/853267FD25EDCA1CCB50EF0CE647D858F17711F842BA2DA5733B5538192BDEC2YnpqZGJrbkhhL25udE02NzdTY3M4WlpTTzBpZTlwS0RLRFMyTlVsSGgvVWhkdmE5",
    },
    {
      name: "Build a Website on Google Cloud Skill Badge",
      issuer: "Google Cloud",
      date: "Apr 2026",
      url: "https://www.credly.com/earner/earned/badge/7b608984-d212-45f7-a448-083aea103caf",
      credentialId: "7b608984-d212-45f7-a448-083aea103caf",
    },
    {
      name: "Prompt Design in Vertex AI Skill Badge",
      issuer: "Google Cloud Security",
      date: "Apr 2026",
      url: "https://www.credly.com/earner/earned/badge/52d71091-15ec-4739-8354-d2867fd2b532",
      credentialId: "52d71091-15ec-4739-8354-d2867fd2b532",
    },
    {
      name: "Google Project Management Professional Certificate",
      issuer: "Google / Coursera",
      date: "Jan 2023",
      url: "https://www.credly.com/badges/e978bf4c-e2f6-4f40-a7a5-a60e55c6e093/linked_in_profile",
      credentialId: "YU83YYKHN37U",
    },
    {
      name: "CS50 Puzzle Day 2026 Certificate",
      issuer: "Harvard University",
      date: "Apr 2026",
      url: "https://cs50.harvard.edu/certificates/c07b11e7-3ee6-405c-a51d-521f9f70863d",
      credentialId: "c07b11e7-3ee6-405c-a51d-521f9f70863d",
    },
    {
      name: "CS50 Puzzle Day 2025 Certificate",
      issuer: "Harvard University",
      date: "Apr 2025",
      url: "https://certificates.cs50.io/5d2f0f38-062c-4971-9aa2-a9800ea9a893",
      credentialId: "5d2f0f38-062c-4971-9aa2-a9800ea9a893",
    },
    {
      name: "National Skills Competency Test (NSCT)",
      issuer: "Higher Education Commission (HEC) Pakistan",
      date: "Apr 2026",
      score: "75.7th Percentile (55/100)",
    },
    {
      name: "Google AI Seekho 2026 — Silver Tier Swag Winner",
      issuer: "Google for Developers",
      date: "Jun 2026",
      score: "Selected among 7,000 participants",
    },
    {
      name: "AI Agents Fundamentals",
      issuer: "Hugging Face",
      date: "Jun 2025",
      url: "https://huggingface.co/datasets/agents-course/certificates/resolve/main/certificates/iammahmads/2025-06-05.png",
      credentialId: "iammahmads",
    },
    {
      name: "AI Trading Agents Hackathon Certificate",
      issuer: "lablab.ai / Surge.xyz",
      date: "Apr 2026",
      url: "https://lablab.ai/u/@iammahmads/cmoyxfny804x7s601rqlv5058",
      credentialId: "cmoyxfny804x7s601rqlv5058",
    },
    {
      name: "Deriv AI Talent Sprint Hackathon Certificate",
      issuer: "lablab.ai / Deriv",
      date: "Feb 2026",
      url: "https://lablab.ai/u/@iammahmads/cmlf2qxq300bbbb0sttzhxhqi",
      credentialId: "cmlf2qxq300bbbb0sttzhxhqi",
    },
    {
      name: "IBM BOB 2.0 Hackathon Certificate",
      issuer: "lablab.ai / IBM",
      date: "Sep 2026",
      url: "https://lablab.ai/u/@iammahmads/cmulaqx260235s601px1aga0o",
      credentialId: "cmulaqx260235s601px1aga0o",
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

