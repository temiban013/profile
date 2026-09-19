"use client";

// app/conecta/conecta-client.tsx
// Digital business card opened from a QR/NFC scan. Mobile-first: one
// primary action (save the contact), then every other way to reach Mario,
// all as large, thumb-friendly tap targets.
import { useEffect, useRef } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import {
  Download,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Linkedin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/contexts/language-context";
import { formatSocialUrl } from "@/lib/social-links";
import { CONTACT_CARD } from "@/lib/contact-card";
import { cn } from "@/lib/utils";

const translations = {
  es: {
    eyebrow: "Tarjeta digital",
    h1: "Guarda mi contacto",
    role: "Fundador",
    saveContact: "Guardar contacto",
    saveContactHint: "Se abre en Contactos en iPhone y Android",
    whatsappOffice: "WhatsApp oficina",
    whatsappCell: "WhatsApp celular",
    call: "Llamar",
    email: "Enviar correo",
    calendly: "Agendar una llamada",
    linkedin: "Ver LinkedIn",
    markAlt: "Marca de Nitaíno Digital",
  },
  en: {
    eyebrow: "Digital card",
    h1: "Save my contact",
    role: "Founder",
    saveContact: "Save contact",
    saveContactHint: "Opens in Contacts on iPhone and Android",
    whatsappOffice: "WhatsApp office",
    whatsappCell: "WhatsApp cell",
    call: "Call",
    email: "Send email",
    calendly: "Schedule a call",
    linkedin: "View LinkedIn",
    markAlt: "Nitaíno Digital mark",
  },
} as const;

const VCARD_HREF = "/conecta/mario.vcf";
const VCARD_FILENAME = "mario-ayala.vcf";
const WHATSAPP_OFFICE_URL = formatSocialUrl(
  "whatsapp",
  CONTACT_CARD.phones.office.whatsapp
);
const WHATSAPP_CELL_URL = formatSocialUrl(
  "whatsapp",
  CONTACT_CARD.phones.cell.whatsapp
);
const TEL_HREF = `tel:${CONTACT_CARD.phones.office.e164}`;
const MAILTO_HREF = `mailto:${CONTACT_CARD.email}`;

interface ActionLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  index: number;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  variant?: "primary" | "default";
}

function ActionLink({
  href,
  icon,
  label,
  index,
  external = false,
  onClick,
  variant = "default",
}: ActionLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4 duration-500",
        "flex items-center gap-4 w-full rounded-2xl px-5 py-4 min-h-16",
        "text-base font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "active:scale-[0.98]",
        variant === "primary"
          ? "bg-primary text-primary-foreground professional-shadow-lg hover:bg-primary/90"
          : "glass-effect professional-shadow text-foreground hover:bg-primary/5"
      )}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <span
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full shrink-0",
          variant === "primary"
            ? "bg-primary-foreground/15"
            : "bg-primary/10 text-primary"
        )}
      >
        {icon}
      </span>
      {label}
    </a>
  );
}

export default function ConectaClient() {
  const { language } = useLanguage();
  const t = translations[language];

  // Android only: handing the .vcf to the share sheet lets the person pick
  // Contacts and land on the save screen, skipping the download notification.
  // The file is fetched ahead of the tap so share() runs inside the user
  // gesture. Everywhere else (and on any failure) the plain link download runs.
  const vcardFileRef = useRef<File | null>(null);

  useEffect(() => {
    if (!/Android/i.test(navigator.userAgent) || !navigator.canShare) return;
    let cancelled = false;
    fetch(VCARD_HREF)
      .then((res) => (res.ok ? res.blob() : Promise.reject(res.status)))
      .then((blob) => {
        const file = new File([blob], VCARD_FILENAME, { type: "text/vcard" });
        if (!cancelled && navigator.canShare({ files: [file] })) {
          vcardFileRef.current = file;
        }
      })
      .catch(() => {
        // Leave the ref empty; the link download still works.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSaveContact: React.MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    const file = vcardFileRef.current;
    try {
      track("vcard_download", { method: file ? "share" : "download" });
    } catch {
      // Analytics is best-effort; never block the contact save on it.
    }
    if (!file) return;

    event.preventDefault();
    navigator
      .share({ files: [file], title: CONTACT_CARD.fullName })
      .catch((error: unknown) => {
        // Closing the share sheet is not a failure; anything else falls back.
        if (error instanceof DOMException && error.name === "AbortError") return;
        window.location.assign(VCARD_HREF);
      });
  };

  return (
    <div className="max-w-md mx-auto px-6 pt-28 pb-16 md:pt-32 md:pb-24">
      <div
        className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "0ms" }}
      >
        <Image
          src="/nitaino-mark.svg"
          alt={t.markAlt}
          width={512}
          height={512}
          priority
          unoptimized
          className="w-16 h-16 rounded-2xl professional-shadow"
        />

        <Badge variant="secondary" className="mt-5 professional-shadow">
          {t.eyebrow}
        </Badge>

        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-gradient">
          {t.h1}
        </h1>

        <p className="mt-3 text-muted-foreground">
          <span className="font-semibold text-foreground">
            {CONTACT_CARD.fullName}
          </span>{" "}
          — {t.role}, {CONTACT_CARD.org}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <div>
          <ActionLink
            href={VCARD_HREF}
            icon={<Download className="h-5 w-5" />}
            label={t.saveContact}
            index={1}
            variant="primary"
            onClick={handleSaveContact}
          />
          <p
            className="mt-2 text-center text-xs text-muted-foreground animate-in fade-in duration-500"
            style={{ animationDelay: "200ms" }}
          >
            {t.saveContactHint}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ActionLink
            href={WHATSAPP_OFFICE_URL}
            icon={<MessageCircle className="h-5 w-5" />}
            label={t.whatsappOffice}
            index={2}
            external
          />
          <ActionLink
            href={WHATSAPP_CELL_URL}
            icon={<MessageCircle className="h-5 w-5" />}
            label={t.whatsappCell}
            index={3}
            external
          />
        </div>

        <ActionLink
          href={TEL_HREF}
          icon={<Phone className="h-5 w-5" />}
          label={t.call}
          index={4}
        />

        <ActionLink
          href={MAILTO_HREF}
          icon={<Mail className="h-5 w-5" />}
          label={t.email}
          index={5}
        />

        <ActionLink
          href={CONTACT_CARD.calendlyUrl}
          icon={<Calendar className="h-5 w-5" />}
          label={t.calendly}
          index={6}
          external
        />

        <ActionLink
          href={CONTACT_CARD.linkedinUrl}
          icon={<Linkedin className="h-5 w-5" />}
          label={t.linkedin}
          index={7}
          external
        />
      </div>
    </div>
  );
}
