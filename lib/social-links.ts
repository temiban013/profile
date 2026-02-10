// lib/social-links.ts
export interface SocialLink {
  platform: "whatsapp" | "youtube" | "gmail" | "linkedin" | "github" | "fiverr";
  value: string;
}

export function formatSocialUrl(platform: string, value: string): string {
  // Return empty string if no value provided
  if (!value) return "";

  switch (platform) {
    case "whatsapp":
      // If it's already a properly formatted WhatsApp URL, return as is
      if (
        value.startsWith("https://wa.me/") ||
        value.startsWith("whatsapp://")
      ) {
        return value;
      }
      // If it's just a phone number, format it properly
      // Remove any non-numeric characters except +
      const cleanPhone = value.replace(/[^\d+]/g, "");
      return `https://wa.me/${cleanPhone}`;

    case "gmail":
      // If it's already a mailto link, return as is
      if (value.startsWith("mailto:")) {
        return value;
      }
      // Otherwise, format as mailto
      return `mailto:${value}`;

    case "youtube":
    case "linkedin":
    case "github":
    case "fiverr":
      // For these platforms, ensure it's a full URL
      if (value.startsWith("http://") || value.startsWith("https://")) {
        return value;
      }
      // If it's just a username or partial URL, prepend https://
      return `https://${value}`;

    default:
      return value;
  }
}

// Helper to get all formatted social links
export function getFormattedSocialLinks() {
  return {
    whatsapp: formatSocialUrl(
      "whatsapp",
      process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP || ""
    ),
    youtube: formatSocialUrl(
      "youtube",
      process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || ""
    ),
    gmail: formatSocialUrl("gmail", process.env.NEXT_PUBLIC_SOCIAL_EMAIL || ""),
    linkedin: formatSocialUrl(
      "linkedin",
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || ""
    ),
    github: formatSocialUrl(
      "github",
      process.env.NEXT_PUBLIC_SOCIAL_GITHUB || ""
    ),
    fiverr: formatSocialUrl(
      "fiverr",
      process.env.NEXT_PUBLIC_SOCIAL_FIVERR || ""
    ),
  };
}
