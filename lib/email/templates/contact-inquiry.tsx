import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ContactFormInput } from "@/lib/validation/contact-schema";

interface ContactInquiryEmailProps {
  data: Omit<ContactFormInput, "website_url">;
  metadata: {
    timestamp: string;
    ip?: string;
  };
}

const businessTypeLabels: Record<string, string> = {
  restaurant: "Restaurante",
  cafeteria: "Cafetería",
  "food-truck": "Food Truck / Kiosco",
  bakery: "Panadería / Repostería",
  bar: "Bar / Cervecería",
  other: "Otro tipo de negocio",
};

export function ContactInquiryEmail({
  data,
  metadata,
}: ContactInquiryEmailProps) {
  const businessTypeLabel =
    businessTypeLabels[data.businessType] || data.businessType;

  return (
    <Html>
      <Head />
      <Preview>
        Nueva consulta de {data.name} - {businessTypeLabel}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Nueva Consulta de Servicios Web</Heading>

          <Section style={section}>
            <Text style={label}>Nombre</Text>
            <Text style={value}>{data.name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email</Text>
            <Text style={value}>{data.email}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Teléfono</Text>
            <Text style={value}>{data.phone}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Tipo de Negocio</Text>
            <Text style={value}>{businessTypeLabel}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>¿Tiene sitio web actualmente?</Text>
            <Text style={value}>{data.hasWebsite === "yes" ? "Sí" : "No"}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Objetivos</Text>
            <Text style={goalsValue}>{data.goals}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>Enviado: {metadata.timestamp}</Text>
            {metadata.ip && <Text style={footerText}>IP: {metadata.ip}</Text>}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const heading = {
  color: "#0f172a",
  fontSize: "24px",
  fontWeight: "bold" as const,
  padding: "0 48px",
  marginBottom: "24px",
};

const section = {
  padding: "0 48px",
  marginBottom: "16px",
};

const label = {
  color: "#64748b",
  fontSize: "12px",
  fontWeight: "600" as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "4px",
};

const value = {
  color: "#0f172a",
  fontSize: "16px",
  margin: "0",
};

const goalsValue = {
  color: "#0f172a",
  fontSize: "16px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  lineHeight: "1.5",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "32px 48px",
};

const footer = {
  padding: "0 48px",
};

const footerText = {
  color: "#94a3b8",
  fontSize: "12px",
  margin: "4px 0",
};

export default ContactInquiryEmail;
