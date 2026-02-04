import { Resend } from "resend";

// Initialize Resend client
// API key should be set in RESEND_API_KEY environment variable
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const emailConfig = {
  from: process.env.RESEND_FROM_EMAIL || "noreply@mariorafaelayala.com",
  to: process.env.RESEND_TO_EMAIL || "marioayaladev@gmail.com",
};
