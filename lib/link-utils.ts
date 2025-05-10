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

// Check if a URL is external (server-compatible version)
export function isExternalUrl(
  url: string,
  baseUrl = "https://www.mariorafaelayala.com"
): boolean {
  // If it's an absolute URL that doesn't match our base URL
  if (url.startsWith("http")) {
    return !url.startsWith(baseUrl);
  }

  // If it starts with a slash, it's internal
  return !url.startsWith("/");
}
