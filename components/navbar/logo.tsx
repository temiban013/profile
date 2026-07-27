// components/navbar/logo.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { JSX } from "react";

interface LogoProps {
  variant?: "header" | "mobile" | "footer";
  className?: string;
}

// Source asset is the Nitaíno Digital lockup at 741x252 (public/nitaino-logo.png,
// transparent background). Intrinsic width/height props MUST keep that exact
// ratio to satisfy Next.js Image's aspect-ratio contract; `h-X w-auto` lets
// height drive rendered size while width follows the intrinsic ratio.
const LOGO_INTRINSIC = { width: 741, height: 252 } as const;

const LOGO_CONFIG = {
  header: { imageClasses: "h-10 w-auto object-contain" },
  mobile: { imageClasses: "h-8 w-auto object-contain" },
  footer: { imageClasses: "h-6 w-auto object-contain" },
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
        src="/nitaino-logo.png"
        alt="Nitaíno Digital"
        width={LOGO_INTRINSIC.width}
        height={LOGO_INTRINSIC.height}
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
        src="/nitaino-logo.png"
        alt="Nitaíno Digital"
        width={LOGO_INTRINSIC.width}
        height={LOGO_INTRINSIC.height}
        className={cn(
          config.imageClasses,
          "transition-opacity duration-200 hover:opacity-90"
        )}
        priority={variant === "header"}
      />
    </div>
  );
};
