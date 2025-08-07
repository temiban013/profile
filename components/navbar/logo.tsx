import type { ComponentPropsWithoutRef, JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps extends ComponentPropsWithoutRef<"div"> {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeConfig = {
  sm: {
    container: "h-8",
    image: "h-8 w-8",
    text: "text-lg",
  },
  md: {
    container: "h-10",
    image: "h-10 w-10",
    text: "text-xl",
  },
  lg: {
    container: "h-12",
    image: "h-12 w-12",
    text: "text-2xl",
  },
} as const;

export const Logo = ({
  size = "md",
  showText = true,
  className,
  ...props
}: LogoProps): JSX.Element => {
  const config = sizeConfig[size];

  const LogoContent = (): JSX.Element => (
    <div
      className={cn(
        "flex items-center gap-3 transition-all duration-300",
        "hover:scale-105 active:scale-95",
        config.container,
        className
      )}
      {...props}
    >
      {/* Logo Image - Fixed aspect ratio */}
      <div
        className={cn(
          "relative overflow-hidden rounded-lg",
          "bg-gradient-to-br from-primary/10 to-primary/5",
          "border border-primary/20 shadow-sm",
          config.image
        )}
      >
        <Image
          src="/mra-logo-rc.png" // Ensure this path exists in your public folder
          alt="Mario Ayala - Full Stack Software Engineer"
          width={40} // Fixed intrinsic width
          height={40} // Fixed intrinsic height
          className="object-contain p-1" // CSS sizing respects container
          priority
          unoptimized={process.env.NODE_ENV === "development"} // Dev optimization
        />
      </div>

      {/* Logo Text - Only show when requested */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "font-bold text-foreground tracking-tight",
              config.text
            )}
          >
            Mario
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            Software Engineer
          </span>
        </div>
      )}
    </div>
  );

  return (
    <Link
      href="/"
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
      aria-label="Go to homepage"
    >
      <LogoContent />
    </Link>
  );
};
