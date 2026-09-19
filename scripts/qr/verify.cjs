#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS build script, not part of the Next.js app bundle. */
"use strict";

// Decode every output under ten degradations and compare with the exact
// expected payload — PTF-106 WS-C. Moved into the repo from
// ~/Pictures/nitaino-qr/source/verify.cjs; behavior is unchanged from the
// source script except the expected website/print payload, which now points
// at /conecta (see scripts/qr/build.cjs for why).
//
// Run: node scripts/qr/verify.cjs
const sharp = require("sharp");
const jsQR = require("jsqr");
const QRCode = require("qrcode");
const path = require("path");
const OUT = path.join(__dirname, process.argv[2] || 'out');
const SITE = 'https://www.nitainodigital.com';
const CONECTA_URL = 'https://www.nitainodigital.com/conecta?utm_source=qr';
// Must match the VCARD constant in scripts/qr/build.cjs exactly (which is
// itself kept in field-for-field + byte parity with lib/contact-card.ts
// buildVCard(), trailing CRLF included).
const VCARD = ['BEGIN:VCARD', 'VERSION:3.0', 'N:Ayala;Mario Rafael;;;', 'FN:Mario Rafael Ayala', 'ORG:Nitaíno Digital', 'TITLE:Fundador',
  'TEL;TYPE=WORK,VOICE:+17874585702', 'TEL;TYPE=CELL,VOICE:+14074767353', 'EMAIL;TYPE=WORK:mario@nitainodigital.com', `URL:${SITE}`, 'END:VCARD'].join('\r\n') + '\r\n';
// [file, expected payload, error-correction level, pixels per module in the file]
const FILES = [['nitaino-qr.png', CONECTA_URL, 'H', 30], ['nitaino-qr-card.png', CONECTA_URL, 'H', 20], ['nitaino-contact.png', VCARD, 'Q', 16], ['nitaino-contact-card.png', VCARD, 'Q', 9]];
const variants = [
  ['full size', (i) => i],
  ['50% scale', (i, w) => i.resize(Math.round(w * 0.5))],
  ['25% scale', (i, w) => i.resize(Math.round(w * 0.25))],
  ['15% scale', (i, w) => i.resize(Math.round(w * 0.15))],
  ['blur sigma 4', (i) => i.blur(4)],
  ['grayscale + low contrast', (i) => i.grayscale().linear(0.5, 70)],
  ['rotated 17deg', (i) => i.rotate(17, { background: '#222222' })],
  ['dim (40% brightness)', (i) => i.linear(0.4, 0)],
  ['glare: blacks lifted (0.7x+40)', (i) => i.grayscale().linear(0.7, 40)],
  ['glare: blacks lifted (0.6x+100)', (i) => i.grayscale().linear(0.6, 100)],
];
async function decode(pipeline) {
  const { data: raw, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels, px = info.width * info.height, data = new Uint8ClampedArray(px * 4), g = ch < 3;
  for (let i = 0; i < px; i++) {
    data[i * 4] = raw[i * ch]; data[i * 4 + 1] = raw[i * ch + (g ? 0 : 1)]; data[i * 4 + 2] = raw[i * ch + (g ? 0 : 2)]; data[i * 4 + 3] = 255;
  }
  const r = jsQR(data, info.width, info.height);
  // jsQR reads byte-mode data as UTF-8 via binaryData; compare bytes to avoid any charset guessing.
  return { r, info, text: r ? Buffer.from(r.binaryData).toString('utf8') : null };
}
(async () => {
  let fail = 0, limit = 0;
  for (const [file, expect, ecl, ppm] of FILES) {
    // Plain black-and-white QR of the same payload at the same pixels per module: the baseline any styling is judged against.
    const modules = QRCode.create(expect, { errorCorrectionLevel: ecl }).modules.size + 8;
    const control = await QRCode.toBuffer(expect, { errorCorrectionLevel: ecl, width: modules * ppm, margin: 4 });
    const f = path.join(OUT, file);
    const meta = await sharp(f).metadata();
    for (const [name, fn] of variants) {
      const { info, text } = await decode(fn(sharp(f), meta.width));
      const ok = text === expect;
      let tag = ok ? 'PASS ' : 'FAIL ', note = text === null ? 'no code found' : ok ? 'exact match' : 'MISMATCH';
      if (!ok) {
        const c = await decode(fn(sharp(control), modules * ppm));
        if (c.text !== expect) { tag = 'LIMIT'; limit++; note += ' — plain control fails identically (decoder/resolution limit, not the design)'; } else fail++;
      }
      console.log(`${tag} ${file.padEnd(26)} ${name.padEnd(32)} ${info.width}x${info.height}  ${note}`);
    }
  }
  console.log(`${fail} design failures, ${limit} decoder-limit cases (plain control also fails)`);
  process.exit(fail ? 1 : 0);
})();
