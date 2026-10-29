import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Generates the installable-app icons from the existing brand mark.
 *
 * Run with: node scripts/build-icons.mjs
 *
 * The maskable variant keeps the mark inside the 80% safe zone so Android
 * launchers can crop it to a circle without clipping the letterform.
 */
const root = process.cwd();
const mark = await readFile(path.join(root, "app", "icon.svg"));

await sharp(mark)
  .resize(192, 192)
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public", "icon-192.png"));

await sharp(mark)
  .resize(512, 512)
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public", "icon-512.png"));

const maskableMark = await sharp(mark).resize(380, 380).png().toBuffer();

await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: "#3e2c21"
  }
})
  .composite([{ input: maskableMark, gravity: "center" }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public", "icon-maskable-512.png"));

console.log("public/icon-192.png, public/icon-512.png, public/icon-maskable-512.png written");
