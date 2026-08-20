// app/terms/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Terms of Service | Nitaíno Digital",
  description:
    "Terms governing use of nitainodigital.com: scope of services, intellectual property, limitation of liability, and governing law.",
  alternates: {
    canonical: "https://www.nitainodigital.com/terms",
    languages: {
      "es-PR": "https://www.nitainodigital.com/terminos",
      "en-US": "https://www.nitainodigital.com/terms",
    },
  },
};

// English content is Phase 2, following the /services precedent.
export default function TermsPageEN() {
  redirect("/terminos");
}
