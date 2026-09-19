#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS build script, not part of the Next.js app bundle. */
"use strict";

// Nitaíno Digital QR card + standalone QR generator — PTF-106 WS-C.
//
// Moved into the repo from ~/Pictures/nitaino-qr/source/build.cjs so the
// output is reproducible. Design decisions (ink color, ECC levels, clear
// zones, rounded-module rendering, card layout, vector mark) are unchanged
// from the source script — see the 2026-09-18 networking-lead-capture
// handoff for the evidence behind each one. The only functional change is
// the website/print QR payload, re-pointed at /conecta (PTF-105) with a
// utm_source=qr tag so scans are countable in Vercel Analytics.
//
// Run: node scripts/qr/build.cjs
// Output: scripts/qr/out/ (gitignored)

const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");
const opentype = require("opentype.js");
const sharp = require("sharp");

// Plain site URL — used only for the vCard's URL: field (matches
// lib/contact-card.ts CONTACT_CARD.siteUrl). The printed/scanned QR payload
// below points at /conecta instead so scans land on the trackable page.
const SITE = "https://www.nitainodigital.com";
const CONECTA_URL = "https://www.nitainodigital.com/conecta?utm_source=qr";

// vCard 3.0, CRLF line endings — phone-screen use only, never printed (77
// modules is too dense at card size). Field-for-field parity with
// lib/contact-card.ts buildVCard(), including its trailing CRLF, so this QR
// decodes to the exact bytes the "Guardar contacto" download serves. This
// .cjs script cannot require() that TypeScript module directly, so the
// fields are duplicated here by hand — lib/contact-card.ts is the source of
// truth; keep this in sync with it, not the other way around.
const VCARD =
  [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Ayala;Mario Rafael;;;",
    "FN:Mario Rafael Ayala",
    "ORG:Nitaíno Digital",
    "TITLE:Fundador",
    "TEL;TYPE=WORK,VOICE:+17874585702",
    "TEL;TYPE=CELL,VOICE:+14074767353",
    "EMAIL;TYPE=WORK:mario@nitainodigital.com",
    `URL:${SITE}`,
    "END:VCARD",
  ].join("\r\n") + "\r\n";

// cardModule for nitaino-qr: the source used 20 for the SITE payload (v4,
// 33 modules) — the largest integer pixel size that still fits a >=4-module
// quiet zone in the 840px card panel (41 * 20 = 820 <= 840). The /conecta
// payload is longer (52 vs 30 bytes) and needs QR version 6 (41 modules,
// same ECC H) instead of version 4 (33 modules); 20px/module no longer fits
// (41 * 20 = 820 fits the QR itself, but the required 4-module quiet zone
// pushes total need to 49 * 20 = 980 > 840 panel). 17 is the same "largest
// integer that fits" rule reapplied to N=41 (49 * 17 = 833 <= 840) — not a
// new design decision, just the existing sizing rule re-solved for the
// larger code. See the build output for the confirmed module count.
const VARIANTS = [
  { name: 'nitaino-qr', payload: CONECTA_URL, ecl: 'H', logo: 9, cardModule: 17, soloModule: 30,
    pill: 'nitainodigital.com', bottom: 'Oficina +1 (787) 458-5702  ·  Cel +1 (407) 476-7353', bottom2: 'mario@nitainodigital.com' },
  { name: 'nitaino-contact', payload: VCARD, ecl: 'Q', logo: 15, cardModule: 9, soloModule: 16,
    pill: 'Guarda mi contacto', bottom: 'Oficina +1 (787) 458-5702  ·  Cel +1 (407) 476-7353', bottom2: 'mario@nitainodigital.com' },
];
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

// Brand blues sampled from public/nitaino-mark.png
const NAVY = '#183673';
const ROYAL = '#286ce0';
const SKY = '#53d5f6';
// Every functional QR module uses one deep navy: probe runs showed royal-blue finder centers and the
// lighter brand navy stop decoding once glare lifts the blacks; this ink matches a plain black QR.
const INK = '#0e2148';

// The mark as vectors, traced from public/nitaino-mark.png (512x512) with
// scripts/qr/trace.cjs: three flat shapes in the brand blues, so the SVGs
// contain no bitmap. Identical to the three <polygon> elements in
// public/nitaino-mark.svg (same points, same fill colors, same 512 space) —
// kept inlined here (rather than parsed from the SVG at build time) so this
// script has no dependency on an XML/SVG parser; if the SVG's polygons ever
// change, update this constant to match.
const MARK_VIEW = 512;
const MARK = (
  `<polygon points="36,255 409,106 257,466" fill="${SKY}"/>` +
  `<polygon points="101,106 254,255 101,404" fill="${NAVY}"/>` +
  `<polygon points="257,46 476,253 257,253" fill="${ROYAL}"/>`
);

const fontFile = (w) =>
  require.resolve(`@fontsource/geist/files/geist-latin-${w}-normal.woff`);
const loadFont = (w) => {
  const b = fs.readFileSync(fontFile(w));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const fonts = { 400: loadFont(400), 500: loadFont(500), 600: loadFont(600), 700: loadFont(700) };

// Text as outlined paths, so the output never depends on installed fonts.
// runs: [{text, weight, fill}], centered on cx.
// Own serializer: opentype's toPathData emitted a NaN control point for one glyph.
const n2 = (v) => { if (!Number.isFinite(v)) throw new Error('non-finite path value'); return +v.toFixed(2); };
function pathData(p) {
  return p.commands.map((c) =>
    c.type === 'M' || c.type === 'L' ? `${c.type}${n2(c.x)} ${n2(c.y)}`
    : c.type === 'Q' ? `Q${n2(c.x1)} ${n2(c.y1)} ${n2(c.x)} ${n2(c.y)}`
    : c.type === 'C' ? `C${n2(c.x1)} ${n2(c.y1)} ${n2(c.x2)} ${n2(c.y2)} ${n2(c.x)} ${n2(c.y)}`
    : 'Z').join('');
}
function layout(text, weight, size, tracking) {
  const f = fonts[weight], k = size / f.unitsPerEm;
  const glyphs = [...text].map((ch) => f.charToGlyph(ch));
  let x = 0;
  const pos = glyphs.map((g, i) => {
    const at = x;
    x += g.advanceWidth * k + tracking;
    if (glyphs[i + 1]) x += (f.getKerningValue(g, glyphs[i + 1]) || 0) * k;
    return at;
  });
  return { glyphs, pos, width: x - tracking };
}
function textLine(runs, cx, baseline, size, tracking = 0) {
  const laid = runs.map((r) => layout(r.text, r.weight, size, tracking));
  let x = cx - laid.reduce((a, l) => a + l.width + tracking, -tracking) / 2;
  return runs
    .map((r, i) => {
      const d = laid[i].glyphs.map((g, j) => pathData(g.getPath(x + laid[i].pos[j], baseline, size))).join('');
      x += laid[i].width + tracking;
      return `<path d="${d}" fill="${r.fill}"/>`;
    })
    .join('');
}
const textWidth = (text, weight, size, tracking = 0) => layout(text, weight, size, tracking).width;

// ---- One variant: QR matrix, standalone QR, lock-screen card ------------------
function variant(cfg) {
const qr = QRCode.create(cfg.payload, { errorCorrectionLevel: cfg.ecl });
const N = qr.modules.size;
const LOGO = cfg.logo; // cleared center zone, in modules (0 = no mark)
const z0 = (N - LOGO) / 2;
const z1 = z0 + LOGO;
const inFinder = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7);
const inLogo = (r, c) => r >= z0 && r < z1 && c >= z0 && c < z1;
const dark = (r, c) =>
  r >= 0 && c >= 0 && r < N && c < N && !inFinder(r, c) && !inLogo(r, c) && qr.modules.data[r * N + c] === 1;

// Neighbor-aware rounding: a corner is rounded only where both adjacent sides are open.
function qrGroup(ox, oy, m) {
  const R = m * 0.5;
  let d = '';
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (!dark(r, c)) continue;
      const x = ox + c * m;
      const y = oy + r * m;
      const up = dark(r - 1, c), dn = dark(r + 1, c), lf = dark(r, c - 1), rt = dark(r, c + 1);
      const tl = !up && !lf ? R : 0, tr = !up && !rt ? R : 0, br = !dn && !rt ? R : 0, bl = !dn && !lf ? R : 0;
      d +=
        `M${x + tl},${y}H${x + m - tr}` + (tr ? `A${tr},${tr} 0 0 1 ${x + m},${y + tr}` : '') +
        `V${y + m - br}` + (br ? `A${br},${br} 0 0 1 ${x + m - br},${y + m}` : '') +
        `H${x + bl}` + (bl ? `A${bl},${bl} 0 0 1 ${x},${y + m - bl}` : '') +
        `V${y + tl}` + (tl ? `A${tl},${tl} 0 0 1 ${x + tl},${y}` : '') + 'Z';
    }
  }
  const rr = (x, y, s, rad) =>
    `M${x + rad},${y}H${x + s - rad}A${rad},${rad} 0 0 1 ${x + s},${y + rad}V${y + s - rad}A${rad},${rad} 0 0 1 ${x + s - rad},${y + s}H${x + rad}A${rad},${rad} 0 0 1 ${x},${y + s - rad}V${y + rad}A${rad},${rad} 0 0 1 ${x + rad},${y}Z`;
  const finder = (r, c) => {
    const x = ox + c * m, y = oy + r * m;
    return (
      `<path fill-rule="evenodd" fill="${INK}" d="${rr(x, y, 7 * m, 2.1 * m)}${rr(x + m, y + m, 5 * m, 1.35 * m)}"/>` +
      `<path fill="${INK}" d="${rr(x + 2 * m, y + 2 * m, 3 * m, 0.95 * m)}"/>`
    );
  };
  const ls = LOGO * m * 0.96; // mark size inside the cleared zone
  const lx = ox + (N * m - ls) / 2, ly = oy + (N * m - ls) / 2;
  return (
    `<path fill="${INK}" d="${d}"/>` +
    finder(0, 0) + finder(0, N - 7) + finder(N - 7, 0) +
    (LOGO === 0 ? '' : `<g transform="translate(${lx} ${ly}) scale(${ls / MARK_VIEW})">${MARK}</g>`)
  );
}

// ---- Standalone QR ---------------------------------------------------------
function standaloneSvg() {
  const m = cfg.soloModule, q = 4, S = (N + 2 * q) * m;
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">` +
    `<rect width="${S}" height="${S}" fill="#ffffff"/>` + qrGroup(q * m, q * m, m) + `</svg>`
  );
}

// ---- Lock-screen card ------------------------------------------------------
function cardSvg() {
  const W = 1080, H = 1920, m = cfg.cardModule;
  const P = 840;
  const pad = (P - N * m) / 2;
  if (pad < 4 * m) throw new Error('quiet zone under 4 modules');
  const px = (W - P) / 2, py = 520;
  const cx = W / 2;
  const MUTED = '#a9b9dc';

  const pillText = cfg.pill;
  const pillSize = 36;
  const pillW = textWidth(pillText, 600, pillSize, 0.4) + 96;
  const pillH = 78, pillY = 1664;

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<defs>` +
    `<linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#10275a"/><stop offset="0.55" stop-color="#0a1836"/><stop offset="1" stop-color="#060e22"/></linearGradient>` +
    `<radialGradient id="glow" cx="0.5" cy="0.49" r="0.5"><stop offset="0" stop-color="${ROYAL}" stop-opacity="0.55"/><stop offset="0.6" stop-color="${ROYAL}" stop-opacity="0.12"/><stop offset="1" stop-color="${ROYAL}" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="rule" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ROYAL}"/><stop offset="1" stop-color="${SKY}"/></linearGradient>` +
    `<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="28"/></filter>` +
    `</defs>` +
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>` +
    // faceted-triangle motif, echoing the mark
    `<g>` +
    `<polygon points="1080,0 1080,430 640,0" fill="${ROYAL}" fill-opacity="0.16"/>` +
    `<polygon points="1080,120 1080,610 800,300" fill="${SKY}" fill-opacity="0.10"/>` +
    `<polygon points="560,0 900,0 760,210" fill="${SKY}" fill-opacity="0.07"/>` +
    `<polygon points="0,1920 0,1500 400,1920" fill="${ROYAL}" fill-opacity="0.16"/>` +
    `<polygon points="0,1380 0,1790 250,1640" fill="${SKY}" fill-opacity="0.09"/>` +
    `<polygon points="180,1920 520,1920 330,1740" fill="${SKY}" fill-opacity="0.06"/>` +
    `</g>` +
    `<rect x="${px - 260}" y="${py - 260}" width="${P + 520}" height="${P + 520}" fill="url(#glow)"/>` +
    // panel shadow + panel
    `<rect x="${px + 10}" y="${py + 34}" width="${P - 20}" height="${P - 10}" rx="64" fill="#020713" fill-opacity="0.7" filter="url(#soft)"/>` +
    `<rect x="${px}" y="${py}" width="${P}" height="${P}" rx="64" fill="#ffffff"/>` +
    qrGroup(px + pad, py + pad, m) +
    // identity block
    textLine([{ text: 'Nitaíno ', weight: 700, fill: '#ffffff' }, { text: 'Digital', weight: 700, fill: SKY }], cx, 1472, 78, -1.5) +
    textLine([{ text: 'Mario Rafael Ayala', weight: 600, fill: '#ffffff' }, { text: '  ·  Fundador', weight: 400, fill: MUTED }], cx, 1540, 38) +
    `<rect x="${cx - 44}" y="1572" width="88" height="4" rx="2" fill="url(#rule)"/>` +
    textLine([{ text: 'Soluciones digitales con raíces taínas', weight: 400, fill: MUTED }], cx, 1626, 30) +
    `<rect x="${cx - pillW / 2}" y="${pillY}" width="${pillW}" height="${pillH}" rx="${pillH / 2}" fill="#ffffff" fill-opacity="0.07" stroke="${SKY}" stroke-opacity="0.55" stroke-width="2"/>` +
    textLine([{ text: pillText, weight: 600, fill: '#ffffff' }], cx, pillY + 51, pillSize, 0.4) +
    textLine([{ text: cfg.bottom, weight: 400, fill: MUTED }], cx, 1800, 27) +
    (cfg.bottom2 ? textLine([{ text: cfg.bottom2, weight: 400, fill: MUTED }], cx, 1846, 27) : '') +
    `</svg>`
  );
}

// ---- Print-ready business card (3.5x2in @ 300dpi, QR >= 1in wide) --------
// New for PTF-106: the source script only produced the lock-screen card and
// bare standalone QR above; it had no print layout. This adds one, for the
// website/conecta variant only (see printCards() below) — the vCard variant
// stays phone-screen only per the handoff (77 modules is too dense to print
// at card size).
function printCardSvg() {
  const DPI = 300;
  const W = 3.5 * DPI, H = 2 * DPI; // 1050 x 600
  const quietModules = 4;
  const qrPx = 1.05 * DPI; // >= 1in wide including quiet zone
  const m = qrPx / (N + 2 * quietModules);
  const qrX = 0.28 * DPI;
  const qrY = (H - qrPx) / 2;
  const textX = qrX + qrPx + 0.34 * DPI;
  const textRight = W - 0.24 * DPI;

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<rect width="${W}" height="${H}" fill="#ffffff"/>` +
    `<rect x="${qrX}" y="${qrY}" width="${qrPx}" height="${qrPx}" fill="#ffffff"/>` +
    qrGroup(qrX + quietModules * m, qrY + quietModules * m, m) +
    textLine([{ text: 'Nitaíno ', weight: 700, fill: NAVY }, { text: 'Digital', weight: 700, fill: ROYAL }], (textX + textRight) / 2, 0.62 * DPI, 46, -0.8) +
    textLine([{ text: 'Mario Rafael Ayala', weight: 600, fill: NAVY }], (textX + textRight) / 2, 1.0 * DPI, 26) +
    textLine([{ text: 'Fundador', weight: 400, fill: '#4b5b7a' }], (textX + textRight) / 2, 1.24 * DPI, 20) +
    `<rect x="${(textX + textRight) / 2 - 40}" y="${1.34 * DPI}" width="80" height="3" rx="1.5" fill="${ROYAL}"/>` +
    textLine([{ text: cfg.pill, weight: 600, fill: NAVY }], (textX + textRight) / 2, 1.58 * DPI, 22) +
    textLine([{ text: cfg.bottom, weight: 400, fill: '#4b5b7a' }], (textX + textRight) / 2, 1.80 * DPI, 15) +
    `</svg>`
  );
}

return { qr, N, standaloneSvg, cardSvg, printCardSvg };
}

(async () => {
  for (const cfg of VARIANTS) {
    const v = variant(cfg);
    const s = v.standaloneSvg(), c = v.cardSvg();
    const S = (v.N + 8) * cfg.soloModule;
    fs.writeFileSync(path.join(OUT, `${cfg.name}.svg`), s);
    fs.writeFileSync(path.join(OUT, `${cfg.name}-card.svg`), c);
    await sharp(Buffer.from(s), { density: 144 }).resize(S, S).png().toFile(path.join(OUT, `${cfg.name}.png`));
    await sharp(Buffer.from(c), { density: 144 }).resize(1080, 1920).png().toFile(path.join(OUT, `${cfg.name}-card.png`));
    console.log(cfg.name, 'version', v.qr.version, 'modules', v.N, 'ecl', cfg.ecl, 'bytes', Buffer.byteLength(cfg.payload));

    // Print-ready 3.5x2in business card, website variant only (print target
    // per the handoff; the vCard/contact variant is phone-only, too dense to
    // print).
    if (cfg.name === 'nitaino-qr') {
      const p = v.printCardSvg();
      fs.writeFileSync(path.join(OUT, `${cfg.name}-print.svg`), p);
      await sharp(Buffer.from(p), { density: 300 })
        .resize(3.5 * 300, 2 * 300)
        .png()
        .toFile(path.join(OUT, `${cfg.name}-print.png`));
      console.log(cfg.name, 'print card written: 3.5x2in @ 300dpi, QR >= 1in wide');
    }
  }
})();
