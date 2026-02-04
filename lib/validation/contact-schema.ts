import { z } from "zod";

// Shared validation schema for contact form
// Used by both client (react-hook-form) and server (API route)
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .email("Email inválido")
    .max(254, "Email no puede exceder 254 caracteres"),
  phone: z
    .string()
    .min(10, "Teléfono debe tener al menos 10 dígitos")
    .max(20, "Teléfono no puede exceder 20 caracteres"),
  businessType: z
    .string()
    .min(1, "Por favor selecciona un tipo de negocio")
    .max(50, "Tipo de negocio no puede exceder 50 caracteres"),
  hasWebsite: z.enum(["yes", "no"]),
  goals: z
    .string()
    .min(10, "Por favor describe tus objetivos (mínimo 10 caracteres)")
    .max(2000, "Los objetivos no pueden exceder 2000 caracteres"),
  // Honeypot field for spam protection - should always be empty
  website_url: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof contactSchema>;

// Schema without honeypot for client-side form (honeypot handled separately)
export const clientContactSchema = contactSchema.omit({ website_url: true });
export type ClientContactFormInput = z.infer<typeof clientContactSchema>;
