import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { MetaFunction } from "react-router";
import { Nav } from "~/components/ui/Nav";
import { Footer } from "~/components/ui/Footer";
import { SkipLink } from "~/components/ui/SkipLink";
import { Scene } from "~/components/scene/Scene";
import { SmoothScroll } from "~/components/ui/SmoothScroll";
import { site } from "~/content/site";
import "~/app.css";

export const meta: MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "theme-color", content: "#170B2B" },
  { title: site.title },
  { name: "description", content: site.tagline },
  { property: "og:site_name", content: site.name },
  { property: "og:type", content: "website" },
  { property: "og:title", content: site.title },
  { property: "og:description", content: site.tagline },
  { property: "og:image", content: `${site.url}/muhammad-ahmad-shahid.jpeg` },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: site.title },
  { name: "twitter:description", content: site.tagline },
  { name: "twitter:image", content: `${site.url}/muhammad-ahmad-shahid.jpeg` },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#170B2B] text-[#F3F1FA] antialiased min-h-screen flex flex-col relative selection:bg-[#3DF2E0] selection:text-[#170B2B]">
        <SkipLink />
        <Scene />
        <SmoothScroll />
        <Nav />
        <main id="main-content" className="flex-1 relative z-10 pt-16">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "An unexpected error occurred.";
  let status = 500;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-[#3DF2E0] font-['Bricolage_Grotesque']">
        {status}
      </h1>
      <p className="mt-4 text-xl text-[#F3F1FA] max-w-md">{message}</p>
      <a
        href="/"
        className="mt-8 px-6 py-3 rounded-lg bg-[#3DF2E0] text-[#170B2B] font-semibold hover:bg-white transition-colors"
      >
        Return Home
      </a>
    </div>
  );
}
