// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  createContactEmailTemplate,
  createAutoReplyTemplate,
} from "@/lib/email-templates";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions for request validation
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  language: "en" | "es";
}

// Type for incoming form data (before validation)
interface IncomingContactData {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  projectType?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  language?: unknown;
}

// Validation function
function validateContactForm(data: IncomingContactData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Required field validation
  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length < 2
  ) {
    errors.push("Name is required and must be at least 2 characters long");
  }

  if (!data.email || typeof data.email !== "string") {
    errors.push("Email is required");
  } else {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Invalid email format");
    }
  }

  if (
    !data.subject ||
    typeof data.subject !== "string" ||
    data.subject.trim().length < 5
  ) {
    errors.push("Subject is required and must be at least 5 characters long");
  }

  if (
    !data.message ||
    typeof data.message !== "string" ||
    data.message.trim().length < 20
  ) {
    errors.push("Message is required and must be at least 20 characters long");
  }

  // Language validation
  if (
    typeof data.language !== "string" ||
    !["en", "es"].includes(data.language)
  ) {
    data.language = "en"; // Default to English if not provided
  }

  // Optional field validation (set defaults if not provided)
  data.projectType = data.projectType || "";
  data.budget = data.budget || "";
  data.timeline = data.timeline || "";

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Rate limiting (simple in-memory store - for production use Redis or database)
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per 15 minutes

  const current = rateLimitMap.get(ip);

  if (!current) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  // Reset if window has passed
  if (now - current.lastRequest > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  // Check if under limit
  if (current.count < maxRequests) {
    current.count++;
    current.lastRequest = now;
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate form data
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name: (body.name as string).trim(),
      email: (body.email as string).trim().toLowerCase(),
      subject: (body.subject as string).trim(),
      projectType: (body.projectType as string) || "",
      budget: (body.budget as string) || "",
      timeline: (body.timeline as string) || "",
      message: (body.message as string).trim(),
      language: (body.language as "en" | "es") || "en",
    };

    // Environment variables validation
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const resendToEmail = process.env.RESEND_TO_EMAIL;

    if (!resendFromEmail || !resendToEmail) {
      console.error(
        "Missing required environment variables: RESEND_FROM_EMAIL or RESEND_TO_EMAIL"
      );
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    // Prepare emails
    const contactEmailHtml = createContactEmailTemplate(formData);
    const autoReplyHtml = createAutoReplyTemplate(formData);

    const emailPromises = [];

    // Email to Mario (main notification)
    emailPromises.push(
      resend.emails.send({
        from: resendFromEmail,
        to: resendToEmail,
        replyTo: formData.email, // Allow direct reply to the sender
        subject: `Portfolio Contact: ${formData.subject}`,
        html: contactEmailHtml,
        tags: [
          { name: "category", value: "contact-form" },
          {
            name: "project-type",
            value: formData.projectType || "unspecified",
          },
          { name: "language", value: formData.language },
        ],
      })
    );

    // Auto-reply to sender
    const autoReplySubject =
      formData.language === "en"
        ? "Thank you for contacting Mario Rafael Ayala"
        : "Gracias por contactar a Mario Rafael Ayala";

    emailPromises.push(
      resend.emails.send({
        from: resendFromEmail,
        to: formData.email,
        subject: autoReplySubject,
        html: autoReplyHtml,
        tags: [
          { name: "category", value: "auto-reply" },
          { name: "language", value: formData.language },
        ],
      })
    );

    // Send both emails
    const emailResults = await Promise.allSettled(emailPromises);

    // Check if main email succeeded
    const mainEmailResult = emailResults[0];
    if (mainEmailResult.status === "rejected") {
      console.error(
        "Failed to send main contact email:",
        mainEmailResult.reason
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to send message. Please try again or contact directly.",
        },
        { status: 500 }
      );
    }

    // Auto-reply failure is not critical, just log it
    const autoReplyResult = emailResults[1];
    if (autoReplyResult.status === "rejected") {
      console.warn("Failed to send auto-reply email:", autoReplyResult.reason);
    }

    // Log successful submission (for analytics/monitoring)
    console.log(
      `Contact form submission from ${formData.email} - Subject: ${formData.subject}`
    );

    return NextResponse.json({
      success: true,
      message:
        "Message sent successfully! You should receive a confirmation email shortly.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS (if needed)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
