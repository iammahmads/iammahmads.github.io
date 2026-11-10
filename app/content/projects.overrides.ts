import type { Project } from "~/lib/github.schema";

export type ProjectOverride = Partial<Omit<Project, "name">> & {
  hidden?: boolean;
};

export const projectOverrides: Record<string, ProjectOverride> = {
  FypGuard: {
    title: "FypGuard — Code Authorship & Compliance",
    summary: "Academic integrity and compliance verification system to detect unauthorized AI assistance and authenticate code authorship.",
    featured: true,
    order: 1,
  },
  "short-url": {
    title: "URL Shortener & Analytics",
    summary: "Scalable URL shortening service with real-time click tracking, geolocation analytics, and interactive charts.",
    media: {
      type: "image",
      src: "/URL_SHORTNER.png",
      alt: "URL Shortener dashboard screenshot",
    },
    featured: true,
    order: 2,
  },
  "dev-ecommerce": {
    title: "Full-Stack E-Commerce Platform",
    summary: "Modern web store featuring product catalogs, cart state management, checkout flows, and persistent data storage.",
    media: {
      type: "image",
      src: "/ECOMMERECE.png",
      alt: "E-Commerce store product page",
    },
    featured: true,
    order: 3,
  },
  code_commenter: {
    title: "CodeCommenter AI",
    summary: "AI-assisted code annotation tool built for the LablabAi hackathon to generate structured inline documentation.",
    featured: true,
    order: 4,
  },
  "erc-8004-hackathon": {
    title: "ERC-8004 Token Standard",
    summary: "Decentralized application exploring experimental Ethereum token standard mechanics built during a Web3 hackathon.",
    featured: true,
    order: 5,
  },
  blooging: {
    title: "Blogger CMS",
    summary: "Content publishing platform with rich-text editor, user authentication, and responsive article layouts.",
    media: {
      type: "image",
      src: "/BLOGGER.png",
      alt: "Blogger app dashboard",
    },
    featured: false,
    order: 6,
  },
  "Andoid-Magent-Detector": {
    title: "Android Magnet Detector",
    summary: "Native Android utility reading hardware magnetometer sensors to detect localized magnetic flux variations.",
    featured: false,
    order: 7,
  },
  zerobug: {
    title: "ZeroBug",
    summary: "Debugging and quality assurance sandbox for tracking and resolving application issues.",
    featured: false,
    order: 8,
  },
  portfolio: {
    hidden: true,
  },
  iammahmads: {
    hidden: true,
  },
};

