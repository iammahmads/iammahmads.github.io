import fs from "node:fs";
import path from "node:path";

const clientDir = path.resolve(process.cwd(), "build/client");
const notFoundDir = path.join(clientDir, "404");
const notFoundHtml = path.join(notFoundDir, "index.html");
const target404 = path.join(clientDir, "404.html");

if (fs.existsSync(notFoundHtml)) {
  fs.copyFileSync(notFoundHtml, target404);
  console.log("Successfully copied build/client/404/index.html to build/client/404.html");
} else if (!fs.existsSync(target404)) {
  console.warn("Notice: 404.html not found in build/client. Creating fallback.");
  const indexHtml = path.join(clientDir, "index.html");
  if (fs.existsSync(indexHtml)) {
    fs.copyFileSync(indexHtml, target404);
  }
}
