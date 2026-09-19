// lib/contact-card.ts
// Single source of truth for Mario Ayala's contact details — shared by the
// /conecta landing page (app/conecta/conecta-client.tsx) and its vCard
// download (app/conecta/mario.vcf/route.ts). Field values are kept in parity
// with the VCARD constant in ~/Pictures/nitaino-qr/source/build.cjs so the
// QR-code vCard and the web download never drift apart.
//
// Street address is intentionally omitted — see decision D-3 (app/page.tsx),
// reaffirmed for /conecta in the 2026-09-18 networking-lead-capture handoff:
// the address stays out of anything public-facing, cards included.

export const CONTACT_CARD = {
  fullName: "Mario Rafael Ayala",
  familyName: "Ayala",
  givenName: "Mario Rafael",
  org: "Nitaíno Digital",
  title: "Fundador",
  phones: {
    // `whatsapp` is the same number without the leading "+": that's the
    // digit-only form formatSocialUrl()/wa.me expect (see lib/social-links.ts).
    office: {
      e164: "+17874585702",
      display: "+1 (787) 458-5702",
      whatsapp: "17874585702",
    },
    cell: {
      e164: "+14074767353",
      display: "+1 (407) 476-7353",
      whatsapp: "14074767353",
    },
  },
  email: "mario@nitainodigital.com",
  siteUrl: "https://www.nitainodigital.com",
  linkedinUrl: "https://www.linkedin.com/in/marioayalamscs",
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/temiban013",
} as const;

/**
 * Builds a vCard 3.0 payload with CRLF line endings (RFC 6350 §3.1).
 * Field-for-field parity with the QR generator's VCARD constant in
 * ~/Pictures/nitaino-qr/source/build.cjs: N, FN, ORG, TITLE, both TEL lines
 * (WORK then CELL), EMAIL, URL, in the same order. No ADR.
 */
export function buildVCard(): string {
  const { familyName, givenName, fullName, org, title, phones, email, siteUrl } =
    CONTACT_CARD;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${familyName};${givenName};;;`,
    `FN:${fullName}`,
    `ORG:${org}`,
    `TITLE:${title}`,
    `TEL;TYPE=WORK,VOICE:${phones.office.e164}`,
    `TEL;TYPE=CELL,VOICE:${phones.cell.e164}`,
    `EMAIL;TYPE=WORK:${email}`,
    `URL:${siteUrl}`,
    "END:VCARD",
  ];

  return lines.join("\r\n") + "\r\n";
}
