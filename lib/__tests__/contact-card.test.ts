import { describe, it, expect } from "vitest";
import { CONTACT_CARD, buildVCard } from "../contact-card";

describe("buildVCard", () => {
  const vcard = buildVCard();
  const lines = vcard.split("\r\n").filter((line) => line.length > 0);

  it("uses CRLF line endings", () => {
    expect(vcard).toContain("\r\n");
    // Every real line break is CRLF, never a lone LF.
    expect(vcard.replace(/\r\n/g, "")).not.toContain("\n");
  });

  it("begins and ends with the vCard 3.0 envelope", () => {
    expect(lines[0]).toBe("BEGIN:VCARD");
    expect(lines[1]).toBe("VERSION:3.0");
    expect(lines[lines.length - 1]).toBe("END:VCARD");
  });

  it("includes FN with the full name", () => {
    expect(vcard).toContain(`FN:${CONTACT_CARD.fullName}`);
  });

  it("includes ORG with the í intact (UTF-8, no ECI mangling)", () => {
    expect(vcard).toContain("ORG:Nitaíno Digital");
  });

  it("includes TITLE", () => {
    expect(vcard).toContain(`TITLE:${CONTACT_CARD.title}`);
  });

  it("includes both TEL lines, WORK then CELL", () => {
    expect(vcard).toContain(
      `TEL;TYPE=WORK,VOICE:${CONTACT_CARD.phones.office.e164}`
    );
    expect(vcard).toContain(
      `TEL;TYPE=CELL,VOICE:${CONTACT_CARD.phones.cell.e164}`
    );
  });

  it("includes EMAIL", () => {
    expect(vcard).toContain(`EMAIL;TYPE=WORK:${CONTACT_CARD.email}`);
  });

  it("includes URL", () => {
    expect(vcard).toContain(`URL:${CONTACT_CARD.siteUrl}`);
  });

  it("does not include an ADR (street address stays out per decision D-3)", () => {
    expect(vcard).not.toContain("ADR");
  });
});
