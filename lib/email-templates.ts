// lib/email-templates.ts

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  language: "en" | "es";
}

// Email template for Mario (the recipient)
export function createContactEmailTemplate(data: ContactFormData): string {
  const projectTypeLabels = {
    en: {
      "web-app": "Web Application",
      "e-commerce": "E-commerce Platform",
      portfolio: "Portfolio Website",
      "landing-page": "Landing Page",
      consulting: "Technical Consulting",
      other: "Other",
    },
    es: {
      "web-app": "Aplicación Web",
      "e-commerce": "Plataforma E-commerce",
      portfolio: "Sitio Web Portafolio",
      "landing-page": "Página de Aterrizaje",
      consulting: "Consultoría Técnica",
      other: "Otro",
    },
  };

  const budgetLabels = {
    en: {
      "5k-15k": "$5,000 - $15,000",
      "15k-30k": "$15,000 - $30,000",
      "30k-50k": "$30,000 - $50,000",
      "50k+": "$50,000+",
      discuss: "Let's Discuss",
    },
    es: {
      "5k-15k": "$5,000 - $15,000",
      "15k-30k": "$15,000 - $30,000",
      "30k-50k": "$30,000 - $50,000",
      "50k+": "$50,000+",
      discuss: "Hablemos",
    },
  };

  const timelineLabels = {
    en: {
      asap: "ASAP",
      "1-3months": "1-3 Months",
      "3-6months": "3-6 Months",
      "6months+": "6+ Months",
      flexible: "Flexible",
    },
    es: {
      asap: "Lo antes posible",
      "1-3months": "1-3 Meses",
      "3-6months": "3-6 Meses",
      "6months+": "6+ Meses",
      flexible: "Flexible",
    },
  };

  const t =
    data.language === "en"
      ? {
          newInquiry: "New Portfolio Contact Form Submission",
          contactDetails: "Contact Details",
          projectDetails: "Project Details",
          projectType: "Project Type",
          budget: "Budget Range",
          timeline: "Timeline",
          message: "Project Description",
          replyPrompt:
            "Reply directly to this email to respond to the inquiry.",
        }
      : {
          newInquiry: "Nueva Consulta del Formulario de Contacto",
          contactDetails: "Detalles de Contacto",
          projectDetails: "Detalles del Proyecto",
          projectType: "Tipo de Proyecto",
          budget: "Rango de Presupuesto",
          timeline: "Cronograma",
          message: "Descripción del Proyecto",
          replyPrompt:
            "Responde directamente a este correo para contestar la consulta.",
        };

  return `
<!DOCTYPE html>
<html lang="${data.language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.newInquiry}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
        }
        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 12px 12px 0 0;
            margin: -20px -20px 0 -20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            margin: 0 -20px;
        }
        .section {
            margin-bottom: 25px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        .section h2 {
            margin: 0 0 15px 0;
            color: #1e3a8a;
            font-size: 18px;
            font-weight: 600;
        }
        .detail-row {
            display: flex;
            margin-bottom: 8px;
        }
        .detail-label {
            font-weight: 600;
            color: #4b5563;
            min-width: 120px;
            margin-right: 10px;
        }
        .detail-value {
            color: #1f2937;
        }
        .message-content {
            background: white;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            white-space: pre-wrap;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: #f3f4f6;
            border-radius: 8px;
            color: #6b7280;
            font-size: 14px;
        }
        .priority-tag {
            display: inline-block;
            background: #fef3c7;
            color: #92400e;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📧 ${t.newInquiry}</h1>
        <div class="priority-tag">🚀 New Lead</div>
    </div>
    
    <div class="content">
        <div class="section">
            <h2>👤 ${t.contactDetails}</h2>
            <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div class="detail-value">${data.name}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">
                    <a href="mailto:${data.email}" style="color: #3b82f6;">${
    data.email
  }</a>
                </div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Subject:</div>
                <div class="detail-value">${data.subject}</div>
            </div>
        </div>

        <div class="section">
            <h2>🚀 ${t.projectDetails}</h2>
            ${
              data.projectType
                ? `
            <div class="detail-row">
                <div class="detail-label">${t.projectType}:</div>
                <div class="detail-value">${
                  projectTypeLabels[data.language][
                    data.projectType as keyof typeof projectTypeLabels.en
                  ] || data.projectType
                }</div>
            </div>
            `
                : ""
            }
            ${
              data.budget
                ? `
            <div class="detail-row">
                <div class="detail-label">${t.budget}:</div>
                <div class="detail-value">${
                  budgetLabels[data.language][
                    data.budget as keyof typeof budgetLabels.en
                  ] || data.budget
                }</div>
            </div>
            `
                : ""
            }
            ${
              data.timeline
                ? `
            <div class="detail-row">
                <div class="detail-label">${t.timeline}:</div>
                <div class="detail-value">${
                  timelineLabels[data.language][
                    data.timeline as keyof typeof timelineLabels.en
                  ] || data.timeline
                }</div>
            </div>
            `
                : ""
            }
        </div>

        <div class="section">
            <h2>💬 ${t.message}</h2>
            <div class="message-content">${data.message}</div>
        </div>
    </div>

    <div class="footer">
        📧 ${t.replyPrompt}<br>
        <strong>Portfolio Contact Form</strong> | ${new Date().toLocaleDateString(
          data.language === "en" ? "en-US" : "es-ES"
        )}
    </div>
</body>
</html>`;
}

// Auto-reply email template for the sender
export function createAutoReplyTemplate(data: ContactFormData): string {
  const t =
    data.language === "en"
      ? {
          thankYou: "Thank you for contacting me!",
          received:
            "I've received your message and will get back to you within 24 hours.",
          reviewingProject: "I'm currently reviewing your project details:",
          subject: "Subject",
          projectType: "Project Type",
          lookingForward: "Looking forward to discussing your project!",
          bestRegards: "Best regards",
          signature: "Mario Rafael Ayala",
          title: "Senior Software Engineer",
          website: "Portfolio",
          doNotReply:
            "This is an automated response. Please do not reply to this email.",
          yourMessage: "Your Message",
        }
      : {
          thankYou: "¡Gracias por contactarme!",
          received:
            "He recibido tu mensaje y te responderé dentro de 24 horas.",
          reviewingProject:
            "Actualmente estoy revisando los detalles de tu proyecto:",
          subject: "Asunto",
          projectType: "Tipo de Proyecto",
          lookingForward: "¡Espero con ansias discutir tu proyecto!",
          bestRegards: "Saludos cordiales",
          signature: "Mario Rafael Ayala",
          title: "Ingeniero de Software Senior",
          website: "Portafolio",
          doNotReply:
            "Esta es una respuesta automatizada. Por favor no respondas a este correo.",
          yourMessage: "Tu Mensaje",
        };

  return `
<!DOCTYPE html>
<html lang="${data.language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.thankYou}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
        }
        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 12px 12px 0 0;
            margin: -20px -20px 0 -20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            margin: 0 -20px;
        }
        .message {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            margin: 20px 0;
        }
        .project-summary {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .project-summary h3 {
            margin: 0 0 15px 0;
            color: #1e3a8a;
        }
        .detail-row {
            margin-bottom: 8px;
        }
        .detail-label {
            font-weight: 600;
            color: #4b5563;
        }
        .signature {
            margin-top: 30px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
        }
        .signature-name {
            font-weight: 600;
            color: #1e3a8a;
            font-size: 18px;
        }
        .signature-title {
            color: #6b7280;
            margin: 5px 0;
        }
        .signature-website {
            margin-top: 10px;
        }
        .signature-website a {
            color: #3b82f6;
            text-decoration: none;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding: 15px;
            background: #fef3c7;
            border-radius: 8px;
            color: #92400e;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>✅ ${t.thankYou}</h1>
    </div>
    
    <div class="content">
        <div class="message">
            <p>Hi ${data.name},</p>
            <p>${t.received}</p>
        </div>

        <div class="project-summary">
            <h3>${t.reviewingProject}</h3>
            <div class="detail-row">
                <span class="detail-label">${t.subject}:</span> ${data.subject}
            </div>
            ${
              data.projectType
                ? `
            <div class="detail-row">
                <span class="detail-label">${t.projectType}:</span> ${data.projectType}
            </div>
            `
                : ""
            }
        </div>

        <p>${t.lookingForward}</p>

        <div class="signature">
            <div class="signature-name">${t.signature}</div>
            <div class="signature-title">${t.title}</div>
            <div class="signature-website">
                <a href="https://mariorafaelayala.com">${
                  t.website
                }: mariorafaelayala.com</a>
            </div>
        </div>
    </div>

    <div class="footer">
        ⚠️ ${t.doNotReply}
    </div>
</body>
</html>`;
}
