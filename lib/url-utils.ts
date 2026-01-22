// lib/url-utils.ts
/**
 * Get absolute URL from relative path
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.mariorafaelayala.com";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Check if a URL is external
 * Safe to use in both client and server components
 */
export function isExternalUrl(url: string): boolean {
  // URLs that start with http/https and don't include our domain
  if (url.startsWith("http")) {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://www.mariorafaelayala.com";
    return !url.startsWith(baseUrl);
  }

  // URLs that start with mailto, tel, etc.
  if (url.startsWith("mailto:") || url.startsWith("tel:")) {
    return true;
  }

  // URLs that don't start with / are considered external
  return !url.startsWith("/");
}

/**
 * Get proper props for an anchor tag based on URL type
 */
export function getLinkProps(
  url: string,
  noFollow = false
): {
  href: string;
  target?: string;
  rel?: string;
} {
  if (isExternalUrl(url)) {
    return {
      href: url,
      target: "_blank",
      rel: noFollow ? "noopener noreferrer nofollow" : "noopener noreferrer",
    };
  }

  return { href: url };
}
