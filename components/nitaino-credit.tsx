/**
 * NitainoCredit — Portfolio branding footer
 *
 * Adapted from the embeddable client-site credit component.
 * Since this IS the portfolio, there's no link (self-redirect is pointless),
 * no browser tooltip, and the tagline is always visible.
 */

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

type CreditLang = "es" | "en";

interface NitainoCreditProps {
  lang?: CreditLang;
  className?: string;
}

// ──────────────────────────────────────────────
// Bilingual content
// ──────────────────────────────────────────────

const CONTENT = {
  es: {
    craftedIn: "Hecho con orgullo en",
    location: "Borikén",
    tagline: "Soluciones digitales con raíces taínas",
    by: "por",
    brandName: "Nitaíno Digital",
    ariaLabel: "Sitio web desarrollado por Nitaíno Digital en Puerto Rico",
  },
  en: {
    craftedIn: "Crafted with pride in",
    location: "Puerto Rico",
    tagline: "Digital solutions rooted in heritage",
    by: "by",
    brandName: "Nitaíno Digital",
    ariaLabel: "Website developed by Nitaíno Digital in Puerto Rico",
  },
} as const;

// ──────────────────────────────────────────────
// Inline SVG: traced three-polygon brand mark
// (same shapes as public/nitaino-mark.svg — PTF-107)
// ──────────────────────────────────────────────

function NitainoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon points="36,255 409,106 257,466" fill="#53d5f6" />
      <polygon points="101,106 254,255 101,404" fill="#183673" />
      <polygon points="257,46 476,253 257,253" fill="#286ce0" />
    </svg>
  );
}

// ──────────────────────────────────────────────
// Puerto Rico flag accent — thin tricolor line
// ──────────────────────────────────────────────

function PRAccent() {
  return (
    <span className="inline-flex items-center gap-0 mx-2" aria-hidden="true">
      <span className="w-3 h-0.5 rounded-full bg-red-500" />
      <span className="w-3 h-0.5 bg-white dark:bg-gray-200" />
      <span className="w-3 h-0.5 rounded-full bg-blue-600" />
    </span>
  );
}

// ──────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────

export function NitainoCredit({ lang = "es", className = "" }: NitainoCreditProps) {
  const t = CONTENT[lang];

  return (
    <div
      className={`border-t border-border py-5 px-4 text-muted-foreground ${className}`}
      role="contentinfo"
      aria-label={t.ariaLabel}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs tracking-wide">
        <span className="inline-flex items-center gap-2">
          <NitainoMark className="w-5 h-5" />
          <span>
            {t.craftedIn}{" "}
            <span className="font-semibold">{t.location}</span>
          </span>
          <PRAccent />
          <span>
            {t.by}{" "}
            <span className="font-semibold">{t.brandName}</span>
          </span>
        </span>

        <span className="text-[10px] opacity-60 italic">
          — {t.tagline}
        </span>
      </div>
    </div>
  );
}

export default NitainoCredit;
