# scripts/qr — Nitaíno Digital QR generator

PTF-106. Moved into the repo from `~/Pictures/nitaino-qr/source/` so the QR
assets are reproducible. Design decisions (ink color, ECC levels, clear
zones, rounded-module rendering, vector mark, card layout) were validated by
the original session and are unchanged here — see
`.project/coordination/handoff-supervisor_continuation-2026-09-18-networking-lead-capture.md`
(or its archived copy under `.project/archive/coordination/`, once archived)
for the evidence.

## Scripts

- **`build.cjs`** — generates the QR codes and cards. Two variants:
  - `nitaino-qr` — payload **`https://www.nitainodigital.com/conecta?utm_source=qr`**.
    Error correction level H, ink `#0e2148`, rounded modules, vector mark
    (`public/nitaino-mark.svg`'s three polygons, inlined in this script)
    centered in a cleared 9×9-module zone. Produces:
    - `nitaino-qr.svg` / `.png` — standalone QR, 4-module quiet zone.
    - `nitaino-qr-card.svg` / `.png` — 1080×1920 lock-screen card.
    - `nitaino-qr-print.svg` / `.png` — **new**, 3.5×2 in business card at
      300 dpi, QR ≥ 1 in wide including quiet zone. The source script only
      produced the lock-screen card and the bare standalone QR; this print
      layout is added for PTF-106 since the source had no card-stock design
      to carry over.
  - `nitaino-contact` — payload is a vCard 3.0 (CRLF line endings), kept in
    field-for-field and byte parity with `lib/contact-card.ts`'s
    `buildVCard()`. Error correction level Q, same rendering rules. **Phone-
    screen use only — never print this one.** At 77 modules it's too dense
    to scan reliably at business-card size (see the handoff's verification
    notes). Produces the same three outputs (`nitaino-contact.svg/.png`,
    `nitaino-contact-card.svg/.png`); no print variant is generated for it.
- **`verify.cjs`** — decodes every PNG in `out/` with jsQR under ten
  degradations (scale, blur, rotation, dimming, simulated glare) and
  compares the decoded bytes to the exact expected payload. On a mismatch it
  re-runs a plain black-and-white control QR of the same payload at the same
  pixels-per-module; if the control fails identically, the case is reported
  as `LIMIT` (a decoder/resolution limit, not a design defect) rather than a
  design failure.
- **`trace.cjs`** — historical/regeneration tool. Traces the three flat
  color regions of `public/nitaino-mark.png` (the old AI-generated bitmap
  mark) into vector polygons, writing `out/mark-vector.json`. This is how
  `public/nitaino-mark.svg`'s polygons and the `MARK` constant in
  `build.cjs` were originally derived. Only needed again if the source PNG
  is ever regenerated and the polygons need re-tracing.

## Run

```bash
node scripts/qr/build.cjs
node scripts/qr/verify.cjs
node scripts/qr/trace.cjs   # only if re-deriving the mark polygons
```

## Output

Everything lands in `scripts/qr/out/` (gitignored — not committed, not
served by the site). Regenerate on demand; nothing under `out/` is a build
input for the Next.js app.

## Payload

- Website / print QR: `https://www.nitainodigital.com/conecta?utm_source=qr`
  — the `/conecta` page (PTF-105) so contact details never go stale and
  scans are countable via `utm_source` in Vercel Analytics.
- vCard QR: same fields as `lib/contact-card.ts`'s `buildVCard()` (name, org,
  title, both phone lines, work email, site URL — no street address, per
  decision D-3). That file is TypeScript and can't be `require()`'d from
  this `.cjs` script, so the vCard is duplicated by hand in `build.cjs` and
  `verify.cjs`; if `lib/contact-card.ts` changes, update both to match — it
  is the source of truth, not the other way around.

## Rule

**The vCard QR (`nitaino-contact*`) is for phone screens only. Never print
it.** Print only the website/`/conecta` QR (`nitaino-qr-print.svg/.png`).
