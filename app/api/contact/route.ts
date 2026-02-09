import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { resend, emailConfig } from "@/lib/email/resend";
import { ContactInquiryEmail } from "@/lib/email/templates/contact-inquiry";

function getClientIP(request: NextRequest): string {
  // Check common headers for real IP behind proxies
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback - Vercel provides this
  return request.headers.get("x-vercel-forwarded-for") || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Rate limit check
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Demasiadas solicitudes. Por favor intenta de nuevo más tarde.",
          retryAfter: Math.ceil(
            (rateLimitResult.resetTime - Date.now()) / 1000
          ),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
            ),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check - if filled, likely a bot
    // Return success to not reveal the trap
    if (data.website_url && data.website_url.length > 0) {
      // Honeypot triggered - silently accept to not reveal the trap
      return NextResponse.json({ success: true });
    }

    // Prepare email data (exclude honeypot field)
    const { website_url: _honeypot, ...emailData } = data;
    void _honeypot; // Explicitly unused - honeypot field filtered out

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      replyTo: data.email,
      subject: `Nueva consulta de ${data.name} - Servicios Web`,
      react: ContactInquiryEmail({
        data: emailData,
        metadata: {
          timestamp: new Date().toLocaleString("es-PR", {
            timeZone: "America/Puerto_Rico",
          }),
          ip: clientIP !== "unknown" ? clientIP : undefined,
        },
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Error al enviar el mensaje. Por favor intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
