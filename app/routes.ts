import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects.tsx"),
  route("projects/:slug", "routes/project.tsx"),
  route("education", "routes/education.tsx"),
  route("styleguide", "routes/styleguide.tsx"),
  route("404", "routes/not-found.tsx"),
  route("*", "routes/catch-all.tsx"),
] satisfies RouteConfig;
