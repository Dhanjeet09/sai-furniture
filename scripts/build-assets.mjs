/**
 * Builds optimized, deployable image assets from the design sources.
 *
 * Run with: node scripts/build-assets.mjs
 *
 * - Converts the supplied PNG concepts into WebP at sane dimensions
 * - Writes the social share card (1200x630) and app icons
 * - Keeps originals untouched in tmp/image-source
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "tmp", "image-source");
const assetDir = path.join(root, "assets");
const appDir = path.join(root, "app");

/*
 * Two of the supplied concepts carry baked-in overlay badges
 * ("Completed project" chips and a corner watermark). They contradict the
 * page's honest "concept visual" labelling, so they are cropped away here.
 */
const images = [
  { from: "luxury-kitchen.png", to: "kitchen-hero.webp", width: 1400 },
  {
    from: "modular-kitchen-concept.png",
    to: "kitchen-concept.webp",
    width: 1200,
    trim: { top: 126, bottom: 132 }
  },
  { from: "walnut-ivory-wardrobe.png", to: "wardrobe-walnut.webp", width: 1200 },
  { from: "wardrobe-suite.png", to: "wardrobe-suite.webp", width: 1200 },
  {
    from: "tv-unit-concept.png",
    to: "tv-unit.webp",
    width: 1200,
    trim: { top: 126 }
  },
  { from: "modular-living-tv.png", to: "living-tv.webp", width: 1200 },
  { from: "modular-office.png", to: "office.webp", width: 1200 }
];

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3e2c21"/>
      <stop offset="0.55" stop-color="#4b3325"/>
      <stop offset="1" stop-color="#2e211a"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#c99a6d"/>
      <stop offset="1" stop-color="#c99a6d" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="72" y="64" width="90" height="2" fill="url(#line)"/>
  <text x="72" y="72" font-family="Georgia, 'Times New Roman', serif" font-size="20" letter-spacing="6" fill="#f4eadf">SAI <tspan fill="#d9b48c">FURNITURE</tspan></text>
  <text x="72" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="96" fill="#f8f1e9">Modular living,</text>
  <text x="72" y="366" font-family="Georgia, 'Times New Roman', serif" font-size="96" font-style="italic" fill="#d9b48c">made beautiful.</text>
  <text x="72" y="446" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#e6d7c8">Custom furniture, modular kitchens and interior woodwork</text>
  <text x="72" y="482" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#bda99a">Avadhpuri, Bhopal · +91 98260 25149</text>
  <rect x="72" y="528" width="220" height="54" fill="#8a5a3b"/>
  <text x="182" y="562" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="600" fill="#fffaf5">Discuss your project</text>
  <circle cx="1050" cy="200" r="150" fill="none" stroke="#d9b48c" stroke-opacity="0.18"/>
  <circle cx="1050" cy="200" r="220" fill="none" stroke="#d9b48c" stroke-opacity="0.1"/>
</svg>`;

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#3e2c21"/>
  <path d="M150 356V156h34l72 118 72-118h34v200h-38V224l-58 94h-20l-58-94v132z" fill="#f8f1e9"/>
  <rect x="150" y="380" width="212" height="12" fill="#c99a6d"/>
</svg>`;

await mkdir(assetDir, { recursive: true });
await mkdir(appDir, { recursive: true });

for (const image of images) {
  const input = path.join(sourceDir, image.from);
  const output = path.join(assetDir, image.to);
  const source = sharp(input);
  const meta = await source.metadata();
  const top = image.trim?.top ?? 0;
  const bottom = image.trim?.bottom ?? 0;

  const pipeline =
    top || bottom
      ? sharp(input).extract({
          left: 0,
          top,
          width: meta.width,
          height: meta.height - top - bottom
        })
      : sharp(input);

  const info = await pipeline
    .resize({ width: image.width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(output);
  console.log(`${image.to}: ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public", "og.png"));
console.log("public/og.png written");

await sharp(Buffer.from(iconSvg)).resize(180).png().toFile(path.join(appDir, "apple-icon.png"));
await writeFile(path.join(appDir, "icon.svg"), iconSvg.trim());
console.log("icons written");
