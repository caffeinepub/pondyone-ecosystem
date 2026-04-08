/**
 * PondyOne Icon Generator
 * Generates all required PWA icons using sharp + SVG templates.
 * Outputs: icon-192.png, icon-512.png, icon-maskable-192.png, icon-maskable-512.png, screenshot-mobile.png
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

const PRIMARY = "#FF6B35";
const DARK = "#1A1A2E";
const WHITE = "#FFFFFF";

/** SVG for regular (rounded) icon */
function iconSVG(size) {
  const r = Math.round(size * 0.2); // corner radius ~20%
  const textSize = Math.round(size * 0.52);
  const center = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <clipPath id="clip">
      <rect width="${size}" height="${size}" rx="${r}" ry="${r}"/>
    </clipPath>
  </defs>
  <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${PRIMARY}"/>
  <text
    x="${center}"
    y="${center}"
    text-anchor="middle"
    dominant-baseline="central"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="800"
    font-size="${textSize}"
    fill="${WHITE}"
    letter-spacing="-2"
  >P</text>
</svg>`;
}

/** SVG for maskable icon — full bleed, no rounded corners, P within safe zone (60% area) */
function maskableSVG(size) {
  const textSize = Math.round(size * 0.4); // smaller to stay in safe zone
  const center = size / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${PRIMARY}"/>
  <text
    x="${center}"
    y="${center}"
    text-anchor="middle"
    dominant-baseline="central"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="800"
    font-size="${textSize}"
    fill="${WHITE}"
    letter-spacing="-2"
  >P</text>
</svg>`;
}

/** SVG screenshot placeholder */
function screenshotSVG(w, h) {
  const cx = w / 2;
  const barH = Math.round(h * 0.008);
  const titleY = Math.round(h * 0.45);
  const subY = Math.round(h * 0.52);
  const titleSize = Math.round(w * 0.1);
  const subSize = Math.round(w * 0.045);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${DARK}"/>
  <rect width="${w}" height="${barH * 12}" fill="${PRIMARY}" opacity="0.9"/>
  <text
    x="${cx}"
    y="${titleY}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="800"
    font-size="${titleSize}"
    fill="${WHITE}"
  >PondyOne</text>
  <text
    x="${cx}"
    y="${subY}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="400"
    font-size="${subSize}"
    fill="${WHITE}"
    opacity="0.6"
  >Puducherry &amp; Chennai</text>
</svg>`;
}

async function generate() {
  const tasks = [
    { svg: iconSVG(192),           out: "icon-192.png",            w: 192, h: 192 },
    { svg: iconSVG(512),           out: "icon-512.png",            w: 512, h: 512 },
    { svg: maskableSVG(192),       out: "icon-maskable-192.png",   w: 192, h: 192 },
    { svg: maskableSVG(512),       out: "icon-maskable-512.png",   w: 512, h: 512 },
    { svg: screenshotSVG(390, 844), out: "screenshot-mobile.png", w: 390, h: 844 },
  ];

  for (const { svg, out, w, h } of tasks) {
    const dest = join(PUBLIC, out);
    await sharp(Buffer.from(svg))
      .resize(w, h)
      .png()
      .toFile(dest);
    console.log(`✓  ${out} (${w}×${h})`);
  }

  console.log("\n✅ All icons generated successfully!");
}

generate().catch((err) => {
  console.error("❌ Icon generation failed:", err.message);
  process.exit(1);
});
