// components/navbar/logo.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { JSX } from "react";

interface LogoProps {
  variant?: "header" | "mobile" | "footer";
  className?: string;
}

// Source asset is a perfect 541x541 square (public/ma-logo.png).
// Intrinsic width/height props MUST stay 1:1 to satisfy Next.js Image's
// aspect-ratio contract — this is the same constraint that drove the
// 2026-04-21 fix. Keeping `h-X w-auto` rather than `h-X w-X` so the
// component remains tolerant if the source asset is ever re-exported.
const LOGO_CONFIG = {
  header: { intrinsic: 64, imageClasses: "h-10 w-auto object-contain" },
  mobile: { intrinsic: 64, imageClasses: "h-8 w-auto object-contain" },
  footer: { intrinsic: 64, imageClasses: "h-6 w-auto object-contain" },
} as const;

export const Logo = ({
  variant = "header",
  className,
}: LogoProps): JSX.Element => {
  const config = LOGO_CONFIG[variant];

  // Mobile variant sits inside the navbar bar — no outer container chrome.
  if (variant === "mobile") {
    return (
      <Image
        src="/ma-logo.png"
        alt="Mario Rafael Ayala — Full-Stack AI Engineer"
        width={config.intrinsic}
        height={config.intrinsic}
        className={cn(
          config.imageClasses,
          "transition-opacity duration-200 hover:opacity-90",
          className
        )}
        priority={false}
      />
    );
  }

  // Header and footer variants keep the rounded-pill chrome around the mark.
  return (
    <div
      className={cn(
        "h-16 transition-all duration-500 ease-out",
        "rounded-full border dark:border-slate-700/70",
        "bg-background/95 backdrop-blur-lg",
        "border-border/50 professional-shadow",
        "flex items-center justify-center px-4",
        variant === "footer" && "h-12",
        className
      )}
    >
      <Image
        src="/ma-logo.png"
        alt="Mario Rafael Ayala — Full-Stack AI Engineer"
        width={config.intrinsic}
        height={config.intrinsic}
        className={cn(
          config.imageClasses,
          "transition-opacity duration-200 hover:opacity-90"
        )}
        priority={variant === "header"}
      />
    </div>
  );
};
