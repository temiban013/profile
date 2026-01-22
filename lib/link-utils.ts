// lib/link-utils.ts (updated)
interface ExternalLinkOptions {
  url: string;
  ariaLabel?: string;
  openInNewTab?: boolean;
}

export function getExternalLinkProps({
  url,
  ariaLabel,
  openInNewTab = true,
}: ExternalLinkOptions): {
  href: string;
  rel: string;
  target?: string;
  "aria-label"?: string;
} {
  return {
    href: url,
    rel: "noopener noreferrer",
    target: openInNewTab ? "_blank" : undefined,
    "aria-label": ariaLabel,
  };
}

// Re-export isExternalUrl from url-utils for backwards compatibility
export { isExternalUrl } from "./url-utils";
