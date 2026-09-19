#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS build script, not part of the Next.js app bundle. */
"use strict";

/**
 * scripts/brand/build-icons.cjs — PTF-107 WS-B
 *
 * Regenerates Nitaíno Digital's icon/OG assets from the traced three-polygon
 * vector mark (public/nitaino-mark.svg), replacing the soft-edged AI bitmap
 * mark (public/nitaino-mark.png).
 *
 * Two modes:
 *
 *   --compare (DEFAULT)   Renders the OLD bitmap mark next to the NEW vector
 *                         mark, at a large size and at the two favicon sizes
 *                         (32px/16px, upscaled with nearest-neighbour so the
 *                         owner can judge small-size legibility without the
 *                         upscale smoothing away real aliasing), on both a
 *                         light and a dark background, with text labels.
 *                         Writes ONLY the comparison PNG (default
 *                         scripts/brand/out/mark-compare.png, override with
 *                         --out <path>). Writes nothing else.
 *
 *   --write               Regenerates the real raster assets: favicon-16x16,
 *                         favicon-32x32, apple-touch-icon, android-chrome
 *                         192/512, public/nitaino-mark.png and app/favicon.ico
 *                         (PNG-in-ICO container, hand-built, no extra
 *                         dependency). Overwrites live, deployed assets;
 *                         review --compare's output first.
 *
 *   --with-og             With --write, also regenerates public/og-nitaino.png.
 *                         Off by default: the OG text renders in a generic
 *                         font until a Geist font file is wired in.
 *
 * Usage:
 *   node scripts/brand/build-icons.cjs                       # compare (default)
 *   node scripts/brand/build-icons.cjs --compare --out a.png
 *   node scripts/brand/build-icons.cjs --write
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..", "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "app");

const MARK_SVG = path.join(PUBLIC_DIR, "nitaino-mark.svg");
const OLD_MARK_PNG = path.join(PUBLIC_DIR, "nitaino-mark.png");
const DEFAULT_COMPARE_OUT = path.join(__dirname, "out", "mark-compare.png");

// Brand colors — see public/nitaino-mark.svg, traced from
// ~/Pictures/nitaino-qr/source/build.cjs `MARK` (512x512 space). Only NAVY
// and ROYAL are referenced directly here (for OG wordmark text); SKY is
// baked into the mark SVG/PNG renders themselves.
const NAVY = "#183673";
const ROYAL = "#286ce0";

// Background conventions measured from the CURRENT committed assets so
// --write reproduces them (see build report for the measurements):
//   - favicon-16/32, android-chrome-192/512, nitaino-mark.png: transparent
//     background, mark rasterized directly (no extra frame/padding beyond
//     what's already baked into the 512 mark artwork).
//   - apple-touch-icon.png (180x180): opaque background_color (#EFF6FA,
//     matches app/manifest.ts), mark content inset to ~83.9% of the canvas
//     (measured bbox 126x135 of 180x180, centered) — i.e. more "safe zone"
//     padding than the transparent icons.
//   - og-nitaino.png (1200x630): opaque #EFF6FA background, mark on the left
//     at ~799x401 within the 1200x630 canvas, wordmark + tagline to the
//     right/below (see writeOgImage()).
const BG_LIGHT = "#EFF6FA"; // app/manifest.ts background_color
const BG_DARK = "#0B1220"; // compare-mode-only dark swatch, not a site color
const APPLE_ICON_SIZE = 180;
const APPLE_ICON_CONTENT_RATIO = 151 / 180; // measured from public/apple-touch-icon.png

// ─────────────────────────────────────────────────────────────────────────
// Argument parsing
// ─────────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { mode: "compare", out: null, withOg: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--write") args.mode = "write";
    else if (a === "--compare") args.mode = "compare";
    else if (a === "--with-og") args.withOg = true;
    else if (a === "--out") args.out = argv[++i];
    else if (a.startsWith("--out=")) args.out = a.slice("--out=".length);
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

// ─────────────────────────────────────────────────────────────────────────
// Rasterizing helpers
// ─────────────────────────────────────────────────────────────────────────

/**
 * Rasterize the vector mark at exactly `size`x`size` px, transparent
 * background. Sets `density` proportionally to the requested size so small
 * renders (e.g. 16px) are rasterized crisply at that resolution rather than
 * rendered large and smoothed down.
 */
async function rasterizeMarkSvg(size) {
  const density = 72 * (size / 512);
  return sharp(MARK_SVG, { density })
    .resize(size, size, { fit: "contain" })
    .png()
    .toBuffer();
}

/** Resize the old bitmap mark to `size`x`size`, default (smooth) resampling. */
async function resizeOldMark(size) {
  return sharp(OLD_MARK_PNG).resize(size, size).png().toBuffer();
}

/** Upscale a small raster with nearest-neighbour so real pixels stay blocky. */
async function upscaleNearest(buffer, targetSize) {
  return sharp(buffer)
    .resize(targetSize, targetSize, { kernel: "nearest" })
    .png()
    .toBuffer();
}

/** Composite `markPng` (with its own alpha) centered over a solid bg square. */
async function onSolidBackground(markPng, size, bgColor) {
  const bg = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bgColor,
    },
  })
    .png()
    .toBuffer();
  return sharp(bg).composite([{ input: markPng, top: 0, left: 0 }]).png().toBuffer();
}

// ─────────────────────────────────────────────────────────────────────────
// --compare mode
// ─────────────────────────────────────────────────────────────────────────

async function buildCompareImage(outPath) {
  const DISPLAY = 200; // every tile is shown at this size regardless of source resolution
  const ROW_LABEL_W = 280;
  const GAP = 20;
  const MARGIN = 32;
  const HEADER_H = 88;
  const COLHEADER_H = 34;
  const CAPTION_H = 22; // per-tile caption under each panel, inside the row height
  const ROW_H = DISPLAY + CAPTION_H + GAP;

  const sizeGroups = [
    { label: "512 px (large)", size: 512, upscale: false },
    { label: "32 px favicon", size: 32, upscale: true },
    { label: "16 px favicon", size: 16, upscale: true },
  ];
  const backgrounds = [
    { label: "light bg", color: BG_LIGHT },
    { label: "dark bg", color: BG_DARK },
  ];

  // Build the (size, background) row list: 3 sizes x 2 backgrounds = 6 rows.
  const rows = [];
  for (const g of sizeGroups) {
    for (const b of backgrounds) rows.push({ group: g, bg: b });
  }

  const colX = [MARGIN + ROW_LABEL_W, MARGIN + ROW_LABEL_W + DISPLAY + GAP];
  const canvasW = colX[1] + DISPLAY + MARGIN;
  const canvasH = MARGIN + HEADER_H + COLHEADER_H + rows.length * ROW_H + MARGIN;

  // ---- Base canvas: title, column headers, row labels, tile borders ----
  const escXml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const rowLabelParts = [];
  const tileBorderParts = [];
  const captionParts = [];
  rows.forEach((row, i) => {
    const y = MARGIN + HEADER_H + COLHEADER_H + i * ROW_H;
    rowLabelParts.push(
      `<text x="${MARGIN}" y="${y + DISPLAY / 2}" font-family="sans-serif" font-size="15" fill="#1f2937" dominant-baseline="middle">${escXml(row.group.label)}</text>`,
      `<text x="${MARGIN}" y="${y + DISPLAY / 2 + 20}" font-family="sans-serif" font-size="13" fill="#6b7280" dominant-baseline="middle">${escXml(row.bg.label)}${row.group.upscale ? ` · upscaled ${Math.round((DISPLAY / row.group.size) * 10) / 10}x` : ""}</text>`,
    );
    for (const x of colX) {
      tileBorderParts.push(
        `<rect x="${x - 1}" y="${y - 1}" width="${DISPLAY + 2}" height="${DISPLAY + 2}" fill="none" stroke="#9ca3af" stroke-width="1"/>`,
      );
    }
    captionParts.push(
      `<text x="${colX[0] + DISPLAY / 2}" y="${y + DISPLAY + 16}" font-family="sans-serif" font-size="12" fill="#6b7280" text-anchor="middle">${row.group.size}×${row.group.size} actual</text>`,
      `<text x="${colX[1] + DISPLAY / 2}" y="${y + DISPLAY + 16}" font-family="sans-serif" font-size="12" fill="#6b7280" text-anchor="middle">${row.group.size}×${row.group.size} actual</text>`,
    );
  });

  const colHeaderY = MARGIN + HEADER_H + COLHEADER_H - 10;
  const baseSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">
      <rect x="0" y="0" width="${canvasW}" height="${canvasH}" fill="#f4f4f5"/>
      <text x="${MARGIN}" y="${MARGIN + 26}" font-family="sans-serif" font-size="22" font-weight="700" fill="#111827">Nitaíno Digital — mark comparison</text>
      <text x="${MARGIN}" y="${MARGIN + 50}" font-family="sans-serif" font-size="14" fill="#374151">OLD bitmap (public/nitaino-mark.png) vs NEW traced vector (public/nitaino-mark.svg) — PTF-107 WS-B</text>
      <text x="${colX[0] + DISPLAY / 2}" y="${colHeaderY}" font-family="sans-serif" font-size="16" font-weight="700" fill="#111827" text-anchor="middle">OLD (bitmap)</text>
      <text x="${colX[1] + DISPLAY / 2}" y="${colHeaderY}" font-family="sans-serif" font-size="16" font-weight="700" fill="#111827" text-anchor="middle">NEW (vector)</text>
      ${rowLabelParts.join("\n")}
      ${tileBorderParts.join("\n")}
      ${captionParts.join("\n")}
    </svg>
  `;

  let canvas = sharp(Buffer.from(baseSvg)).png();
  const baseBuffer = await canvas.toBuffer();

  // ---- Build each tile: old/new x size x background ----
  const composites = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const y = MARGIN + HEADER_H + COLHEADER_H + i * ROW_H;

    let oldSmall = await resizeOldMark(row.group.size);
    let newSmall = await rasterizeMarkSvg(row.group.size);
    let oldDisplay = oldSmall;
    let newDisplay = newSmall;
    if (row.group.upscale) {
      oldDisplay = await upscaleNearest(oldSmall, DISPLAY);
      newDisplay = await upscaleNearest(newSmall, DISPLAY);
    } else {
      // Large size: normal (smooth) resize down/up to the display size.
      oldDisplay = await sharp(oldSmall).resize(DISPLAY, DISPLAY).png().toBuffer();
      newDisplay = await sharp(newSmall).resize(DISPLAY, DISPLAY).png().toBuffer();
    }

    const oldTile = await onSolidBackground(oldDisplay, DISPLAY, row.bg.color);
    const newTile = await onSolidBackground(newDisplay, DISPLAY, row.bg.color);

    composites.push({ input: oldTile, top: y, left: colX[0] });
    composites.push({ input: newTile, top: y, left: colX[1] });
  }

  const finalPng = await sharp(baseBuffer).composite(composites).png().toBuffer();
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, finalPng);
  return outPath;
}

// ─────────────────────────────────────────────────────────────────────────
// --write mode (implemented, NOT executed as of PTF-107 WS-B)
// ─────────────────────────────────────────────────────────────────────────

/** Hand-built PNG-in-ICO container (no extra dependency). */
function buildIco(images) {
  // images: [{ size: number, png: Buffer }]
  const count = images.length;
  const headerSize = 6 + 16 * count;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved, must be 0
  header.writeUInt16LE(1, 2); // image type: 1 = icon
  header.writeUInt16LE(count, 4);

  let offset = headerSize;
  images.forEach((img, i) => {
    const e = 6 + i * 16;
    const sizeByte = img.size >= 256 ? 0 : img.size; // 0 means 256 per ICO spec
    header.writeUInt8(sizeByte, e + 0); // width
    header.writeUInt8(sizeByte, e + 1); // height
    header.writeUInt8(0, e + 2); // color palette count (0 = no palette)
    header.writeUInt8(0, e + 3); // reserved
    header.writeUInt16LE(1, e + 4); // color planes
    header.writeUInt16LE(32, e + 6); // bits per pixel
    header.writeUInt32LE(img.png.length, e + 8); // size of PNG data
    header.writeUInt32LE(offset, e + 12); // offset of PNG data from file start
    offset += img.png.length;
  });

  return Buffer.concat([header, ...images.map((img) => img.png)]);
}

async function writeOgImage(outPath) {
  // Reproduces the measured layout of the current public/og-nitaino.png:
  // 1200x630, #EFF6FA background, mark on the left (~799x401, vertically
  // centered), wordmark + tagline + caption to the right/below.
  //
  // NOTE (honesty flag): the wordmark/tagline/caption below are laid out
  // with generic sans-serif via SVG <text>, not the site's actual Geist
  // font — this script runs standalone (outside Next's font pipeline) and
  // has no bundled font file. Text position/sizing is a best-effort match
  // of the measured current image; glyph shapes and exact kerning WILL
  // differ from the original until a real font file is wired in (e.g. via
  // @fontsource/geist, already planned for WS-C's QR scripts). Review the
  // rendered output before treating this as final.
  const W = 1200;
  const H = 630;
  const markW = 300;
  const markH = Math.round(markW * (457 / 427)); // preserve mark aspect ratio
  const markLeft = 220;
  const markTop = Math.round((H - markH) / 2);

  const markPng = await sharp(MARK_SVG, { density: 72 * (markW / 512) })
    .resize(markW, markH, { fit: "contain" })
    .png()
    .toBuffer();

  const textX = markLeft + markW + 60;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect x="0" y="0" width="${W}" height="${H}" fill="${BG_LIGHT}"/>
      <text x="${textX}" y="270" font-family="sans-serif" font-size="72" font-weight="800" fill="${NAVY}">Nitaíno</text>
      <text x="${textX}" y="340" font-family="sans-serif" font-size="52" font-weight="700" fill="${ROYAL}">Digital</text>
      <text x="600" y="470" font-family="serif" font-style="italic" font-size="28" fill="${NAVY}" text-anchor="middle">Soluciones digitales con raíces taínas</text>
      <text x="600" y="525" font-family="sans-serif" font-size="18" letter-spacing="3" fill="#6b7280" text-anchor="middle">AI ENGINEERING · WEB · VIDEO · TRAINING — PUERTO RICO</text>
    </svg>
  `;

  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  const final = await sharp(base)
    .composite([{ input: markPng, top: markTop, left: markLeft }])
    .png()
    .toBuffer();
  fs.writeFileSync(outPath, final);
  return outPath;
}

async function writeAll({ withOg }) {
  // favicon-16x16.png / favicon-32x32.png — transparent bg, direct rasterization.
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-16x16.png"), await rasterizeMarkSvg(16));
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon-32x32.png"), await rasterizeMarkSvg(32));

  // android-chrome-192/512 and nitaino-mark.png — transparent bg, direct
  // rasterization. (Today, nitaino-mark.png and android-chrome-512x512.png
  // are byte-identical; keep them that way.)
  const mark512 = await rasterizeMarkSvg(512);
  fs.writeFileSync(path.join(PUBLIC_DIR, "android-chrome-192x192.png"), await rasterizeMarkSvg(192));
  fs.writeFileSync(path.join(PUBLIC_DIR, "android-chrome-512x512.png"), mark512);
  fs.writeFileSync(path.join(PUBLIC_DIR, "nitaino-mark.png"), mark512);

  // apple-touch-icon.png — 180x180, opaque #EFF6FA background, mark inset to
  // the measured ~83.9% content ratio, centered.
  const appleContentSize = Math.round(APPLE_ICON_SIZE * APPLE_ICON_CONTENT_RATIO);
  const appleMark = await rasterizeMarkSvg(appleContentSize);
  const appleBg = await sharp({
    create: {
      width: APPLE_ICON_SIZE,
      height: APPLE_ICON_SIZE,
      channels: 4,
      background: BG_LIGHT,
    },
  })
    .png()
    .toBuffer();
  const appleOffset = Math.round((APPLE_ICON_SIZE - appleContentSize) / 2);
  const appleIcon = await sharp(appleBg)
    .composite([{ input: appleMark, top: appleOffset, left: appleOffset }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "apple-touch-icon.png"), appleIcon);

  // OG image — opt-in (--with-og). writeOgImage() draws its text in a generic
  // font, not Geist, so it stays off until a Geist font file is wired in.
  if (withOg) await writeOgImage(path.join(PUBLIC_DIR, "og-nitaino.png"));

  // favicon.ico — single 32x32 PNG-in-ICO entry, matching today's convention
  // ("1 icon, 32x32, 32 bits/pixel").
  const favicon32 = await rasterizeMarkSvg(32);
  const ico = buildIco([{ size: 32, png: favicon32 }]);
  fs.writeFileSync(path.join(APP_DIR, "favicon.ico"), ico);
}

// ─────────────────────────────────────────────────────────────────────────
// Entry point
// ─────────────────────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.mode === "write") {
    console.log("Writing regenerated raster assets (public/, app/favicon.ico)...");
    await writeAll({ withOg: args.withOg });
    console.log("Done.");
  } else {
    const outPath = args.out ? path.resolve(process.cwd(), args.out) : DEFAULT_COMPARE_OUT;
    const written = await buildCompareImage(outPath);
    console.log(`Wrote comparison image: ${written}`);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}

module.exports = { buildCompareImage, writeAll, buildIco };
