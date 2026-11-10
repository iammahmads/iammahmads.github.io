import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve(process.cwd(), "public");
const images = [
  "muhammad-ahmad-shahid.jpeg",
  "URL_SHORTNER.png",
  "BLOGGER.png",
  "ECOMMERECE.png",
  "HOSPITAL.png",
  "BUS_MANAGMENT.png",
  "3-STRATEGIES.png",
  "LOGO.png",
];

async function optimize() {
  for (const img of images) {
    const input = path.join(publicDir, img);
    if (!fs.existsSync(input)) continue;
    const base = path.parse(img).name;
    const webpOutput = path.join(publicDir, `${base}.webp`);
    if (!fs.existsSync(webpOutput)) {
      await sharp(input).webp({ quality: 85 }).toFile(webpOutput);
      console.log(`Generated ${base}.webp`);
    }
  }
}

optimize().catch((err) => {
  console.error("Image optimization error:", err);
});
