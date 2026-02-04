import { describe, it, expect } from "vitest";
import { contactSchema, clientContactSchema } from "../validation/contact-schema";

describe("contactSchema", () => {
  const validData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "7871234567",
    businessType: "restaurant",
    hasWebsite: "no" as const,
    goals: "I want to create a website for my restaurant",
  };

  describe("valid inputs", () => {
    it("accepts valid form data", () => {
      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("accepts hasWebsite as 'yes'", () => {
      const result = contactSchema.safeParse({
        ...validData,
        hasWebsite: "yes",
      });
      expect(result.success).toBe(true);
    });

    it("accepts empty honeypot field", () => {
      const result = contactSchema.safeParse({
        ...validData,
        website_url: "",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("name validation", () => {
    it("rejects name shorter than 2 characters", () => {
      const result = contactSchema.safeParse({
        ...validData,
        name: "J",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("2 caracteres");
      }
    });

    it("rejects name longer than 100 characters", () => {
      const result = contactSchema.safeParse({
        ...validData,
        name: "A".repeat(101),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("100 caracteres");
      }
    });
  });

  describe("email validation", () => {
    it("rejects invalid email format", () => {
      const result = contactSchema.safeParse({
        ...validData,
        email: "not-an-email",
      });
      expect(result.success).toBe(false);
    });

    it("rejects email longer than 254 characters", () => {
      const longEmail = "a".repeat(250) + "@b.co";
      const result = contactSchema.safeParse({
        ...validData,
        email: longEmail,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("phone validation", () => {
    it("rejects phone shorter than 10 digits", () => {
      const result = contactSchema.safeParse({
        ...validData,
        phone: "123456789",
      });
      expect(result.success).toBe(false);
    });

    it("accepts phone with exactly 10 digits", () => {
      const result = contactSchema.safeParse({
        ...validData,
        phone: "1234567890",
      });
      expect(result.success).toBe(true);
    });

    it("rejects phone longer than 20 characters", () => {
      const result = contactSchema.safeParse({
        ...validData,
        phone: "1".repeat(21),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("businessType validation", () => {
    it("rejects empty business type", () => {
      const result = contactSchema.safeParse({
        ...validData,
        businessType: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("goals validation", () => {
    it("rejects goals shorter than 10 characters", () => {
      const result = contactSchema.safeParse({
        ...validData,
        goals: "Too short",
      });
      expect(result.success).toBe(false);
    });

    it("rejects goals longer than 2000 characters", () => {
      const result = contactSchema.safeParse({
        ...validData,
        goals: "A".repeat(2001),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("honeypot field (website_url)", () => {
    it("rejects non-empty honeypot field", () => {
      const result = contactSchema.safeParse({
        ...validData,
        website_url: "http://spam.com",
      });
      expect(result.success).toBe(false);
    });
  });
});

describe("clientContactSchema", () => {
  it("does not include website_url field", () => {
    const validClientData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "7871234567",
      businessType: "restaurant",
      hasWebsite: "no" as const,
      goals: "I want to create a website for my restaurant",
    };

    const result = clientContactSchema.safeParse(validClientData);
    expect(result.success).toBe(true);

    // Verify the shape doesn't include website_url
    if (result.success) {
      expect("website_url" in result.data).toBe(false);
    }
  });
});
