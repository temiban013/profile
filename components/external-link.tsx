// components/external-link.tsx
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ExternalLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  children: ReactNode;
  className?: string;
  noFollow?: boolean;
}

export default function ExternalLink({
  href,
  children,
  className = "",
  noFollow = false,
  ...props
}: ExternalLinkProps) {
  // Build rel attribute based on props
  const rel = noFollow ? "noopener noreferrer nofollow" : "noopener noreferrer";

  return (
    <a href={href} target="_blank" rel={rel} className={className} {...props}>
      {children}
    </a>
  );
}
