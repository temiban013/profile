// app/privacy/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy | Nitaíno Digital",
  description:
    "How Nitaíno Digital handles data for visitors to nitainodigital.com: cookies, analytics, third-party services, and your rights.",
  alternates: {
    canonical: "https://www.nitainodigital.com/privacy",
    languages: {
      "es-PR": "https://www.nitainodigital.com/privacidad",
      "en-US": "https://www.nitainodigital.com/privacy",
    },
  },
};

// English content is Phase 2, following the /services precedent.
export default function PrivacyPageEN() {
  redirect("/privacidad");
}
