export type SkillCategory = {
  name: string;
  description: string;
  skills: {
    name: string;
    level: "core" | "proficient" | "familiar";
    evidenceRepos: string[];
  }[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    description: "Designing responsive, accessible, and high-performance client interfaces.",
    skills: [
      { name: "React", level: "core", evidenceRepos: ["portfolio", "short-url", "dev-ecommerce", "blooging"] },
      { name: "TypeScript", level: "core", evidenceRepos: ["FypGuard", "dev-ecommerce", "portfolio"] },
      { name: "Tailwind CSS", level: "core", evidenceRepos: ["short-url", "dev-ecommerce", "portfolio"] },
      { name: "JavaScript (ESNext)", level: "core", evidenceRepos: ["short-url", "blooging", "zerobug"] },
      { name: "Next.js", level: "proficient", evidenceRepos: ["piyushgargdev-nextjs"] },
    ],
  },
  {
    name: "Backend & Systems",
    description: "Architecting modular REST APIs, data pipelines, and service logic.",
    skills: [
      { name: "Node.js", level: "core", evidenceRepos: ["short-url", "dev-ecommerce", "blooging"] },
      { name: "Express", level: "core", evidenceRepos: ["short-url", "dev-ecommerce", "blooging"] },
      { name: "Python", level: "proficient", evidenceRepos: ["code_commenter", "name-generator-ai", "leetcode-solutions"] },
      { name: "RESTful APIs", level: "core", evidenceRepos: ["short-url", "dev-ecommerce"] },
      { name: "Kotlin", level: "familiar", evidenceRepos: ["Andoid-Magent-Detector"] },
    ],
  },
  {
    name: "Databases & Storage",
    description: "Modeling schema architectures, document persistence, and query optimization.",
    skills: [
      { name: "MongoDB", level: "core", evidenceRepos: ["short-url", "dev-ecommerce", "blooging"] },
      { name: "SQL & Relational DBs", level: "proficient", evidenceRepos: ["bus-managment"] },
      { name: "Mongoose ODM", level: "core", evidenceRepos: ["short-url", "dev-ecommerce"] },
    ],
  },
  {
    name: "DevOps & Engineering Practice",
    description: "Tooling, testing, and modern version control workflows.",
    skills: [
      { name: "Git & GitHub", level: "core", evidenceRepos: ["portfolio", "FypGuard"] },
      { name: "Render Deployment", level: "core", evidenceRepos: ["portfolio"] },
      { name: "Agile & Project Management", level: "proficient", evidenceRepos: [] },
      { name: "Linux / Bash", level: "proficient", evidenceRepos: [] },
    ],
  },
];
