#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS build script, not part of the Next.js app bundle. */
"use strict";

// Trace the three flat triangles of nitaino-mark.png into vector polygons —
// PTF-106 WS-C / PTF-107 groundwork. Moved into the repo from
// ~/Pictures/nitaino-qr/source/trace.cjs; behavior is unchanged.
//
// Historical note: this is how public/nitaino-mark.svg's three <polygon>
// points were originally derived (PTF-107), and how the MARK constant in
// scripts/qr/build.cjs was seeded. The vector mark is now checked in, so
// this script is mainly useful if the source PNG is ever re-photographed or
// re-generated and the polygons need re-tracing.
//
// Input: public/nitaino-mark.png (in this repo — the old AI-generated bitmap
// mark, kept for this exact purpose; do not delete it while this script is
// expected to run).
// Output: scripts/qr/out/mark-vector.json (gitignored)
//
// Run: node scripts/qr/trace.cjs
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const MARK_PNG = path.join(__dirname, "..", "..", "public", "nitaino-mark.png");
const OUT = path.join(__dirname, "out");
const COLORS = { navy: [0x18, 0x36, 0x73], royal: [0x28, 0x6c, 0xe0], sky: [0x53, 0xd5, 0xf6] };
const hull = (pts) => { // Andrew monotone chain
  pts.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [], upper = [];
  for (const p of pts) { while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); }
  for (const p of pts.reverse()) { while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
};
const triArea = (a, b, c) => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
(async () => {
  const { data, info } = await sharp(MARK_PNG).raw().toBuffer({ resolveWithObject: true });
  const pts = { navy: [], royal: [], sky: [] };
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    if (data[i + 3] < 250) continue;
    let best = null, bd = Infinity;
    for (const [k, c] of Object.entries(COLORS)) {
      const d = Math.hypot(data[i] - c[0], data[i + 1] - c[1], data[i + 2] - c[2]);
      if (d < bd) { bd = d; best = k; }
    }
    if (bd < 40) pts[best].push([x, y]);
  }
  const out = {};
  for (const k of Object.keys(pts)) {
    const h = hull(pts[k]);
    let tri = null, ba = 0;
    for (let a = 0; a < h.length; a++) for (let b = a + 1; b < h.length; b++) for (let c = b + 1; c < h.length; c++) {
      const A = triArea(h[a], h[b], h[c]); if (A > ba) { ba = A; tri = [h[a], h[b], h[c]]; }
    }
    // Also the best quadrilateral; keep it when it explains clearly more of the pixel area.
    let quad = null, qa = 0;
    for (let a = 0; a < h.length; a++) for (let b = a + 1; b < h.length; b++) for (let c = b + 1; c < h.length; c++) for (let d = c + 1; d < h.length; d++) {
      const A = triArea(h[a], h[b], h[c]) + triArea(h[a], h[c], h[d]); if (A > qa) { qa = A; quad = [h[a], h[b], h[c], h[d]]; }
    }
    const useQuad = qa > ba * 1.05;
    out[k] = { poly: useQuad ? quad : tri, pixels: pts[k].length, area: Math.round(useQuad ? qa : ba) };
    console.log(k, useQuad ? 'quad' : 'tri', JSON.stringify(out[k].poly), 'pixels', pts[k].length, 'tri area', Math.round(ba), 'quad area', Math.round(qa));
  }
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "mark-vector.json"), JSON.stringify(out));
})();
