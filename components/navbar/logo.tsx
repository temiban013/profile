// components/navbar/logo.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";
import { JSX } from "react";

interface LogoProps {
  variant?: "header" | "mobile" | "footer";
  className?: string;
}

export const Logo = ({
  variant = "header",
  className,
}: LogoProps): JSX.Element => {
  // Logo should exactly match navbar container styling
  const logoConfig = {
    header: {
      width: 160,
      height: 46,
      imageClasses: "h-10 w-40 object-contain",
    },
    mobile: {
      width: 140,
      height: 40,
      imageClasses: "h-8 w-35 object-contain",
    },
    footer: {
      width: 120,
      height: 34,
      imageClasses: "h-6 w-30 object-contain",
    },
  };

  const config = logoConfig[variant];

  // Mobile variant is integrated inside navbar, no container styling needed
  if (variant === "mobile") {
    return (
      <Image
        src="/mra-logo-rc.png"
        alt="Mario Rafael Ayala - Full Stack Software Engineer"
        width={config.width}
        height={config.height}
        className={cn(
          config.imageClasses,
          "transition-opacity duration-200 hover:opacity-90"
        )}
        priority={false}
      />
    );
  }

  // Header and footer variants have their own containers
  return (
    <div
      className={cn(
        // Exact navbar styling - duplicate the navbar container
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
        src="/mra-logo-rc.png"
        alt="Mario Rafael Ayala - Full Stack Software Engineer"
        width={config.width}
        height={config.height}
        className={cn(
          config.imageClasses,
          "transition-opacity duration-200 hover:opacity-90"
        )}
        priority={variant === "header"}
      />
    </div>
  );
};
