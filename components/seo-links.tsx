// components/seo-link.tsx
import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";

interface SEOLinkProps
  extends Omit<ComponentProps<typeof NextLink>, "aria-label"> {
  children: ReactNode;
  ariaLabel?: string;
  external?: boolean;
  className?: string;
}

export default function SEOLink({
  children,
  ariaLabel,
  external = false,
  className = "",
  ...props
}: SEOLinkProps) {
  // Add appropriate SEO attributes for external links
  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  // Handle aria-label separately to avoid type issues
  const ariaLabelProp = ariaLabel ? { "aria-label": ariaLabel } : {};

  return (
    <NextLink
      className={className}
      {...externalProps}
      {...ariaLabelProp}
      {...props}
    >
      {children}
    </NextLink>
  );
}
