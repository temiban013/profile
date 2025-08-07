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
  // Configuration object that defines different sizes and styling for different contexts
  // This approach ensures consistency while allowing context-appropriate scaling
  const logoConfig = {
    header: {
      width: 180, // Significantly increased for better visibility
      height: 52, // Proportionally increased to maintain aspect ratio
      containerClasses: "h-13 w-45", // Fixed container prevents layout shift during loading
      imageClasses: "h-13 w-45 rounded-xl", // Auto width maintains natural proportions
    },
    mobile: {
      width: 160,
      height: 46,
      containerClasses: "h-12 w-40",
      imageClasses: "h-12 w-40 rounded-lg",
    },
    footer: {
      width: 140,
      height: 40,
      containerClasses: "h-10 w-35",
      imageClasses: "h-10 w-35 rounded-lg",
    },
  };

  const config = logoConfig[variant];

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        config.containerClasses,
        className
      )}
    >
      {/* 
        Enhanced background system for maximum visibility
        The key insight here is layering multiple visual techniques:
        1. Solid background color for guaranteed contrast
        2. Backdrop blur for modern aesthetic
        3. Border for definition
        4. Shadow for depth perception
      */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl transition-all duration-300",
          // Solid background ensures visibility against any page content
          "bg-background/95 backdrop-blur-md",
          // Border provides clear edge definition
          "border-2 border-border/60",
          // Enhanced shadow system creates depth and draws attention
          "shadow-lg shadow-black/10 dark:shadow-black/20",
          // Hover effects provide interactive feedback
          "group-hover:bg-background group-hover:border-primary/40",
          "group-hover:shadow-xl group-hover:shadow-primary/20"
        )}
      />

      {/* 
        Logo image with enhanced visibility techniques
        Using multiple rendering strategies ensures the logo is clearly visible
      */}
      <Image
        src="/mra-logo-rc.png"
        alt="Mario Rafael Ayala - Full Stack Software Engineer"
        width={config.width}
        height={config.height}
        className={cn(
          config.imageClasses,
          "relative z-10 transition-all duration-300",
          // Scale effect provides hover feedback without being distracting
          "group-hover:scale-105",
          // Drop shadow ensures text/logo elements have contrast against backgrounds
          "drop-shadow-sm filter",
          // Brightness adjustment can help with visibility on complex backgrounds
          "brightness-100 contrast-110"
        )}
        priority={variant === "header"} // Critical resource - load immediately for header usage
      />

      {/* 
        Subtle professional identifier that appears on hover
        This provides context about your role without cluttering the initial view
      */}
      {variant === "header" && (
        <div
          className={cn(
            "absolute -bottom-2 left-1/2 transform -translate-x-1/2",
            "text-xs text-primary font-medium tracking-wide",
            "opacity-0 group-hover:opacity-90 transition-all duration-300",
            "whitespace-nowrap pointer-events-none",
            // Background ensures text readability
            "bg-background/90 px-2 py-1 rounded-md shadow-sm"
          )}
        >
          Software Engineer
        </div>
      )}
    </div>
  );
};
