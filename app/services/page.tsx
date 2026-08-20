import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Web Development for Puerto Rico Businesses",
  description:
    "Professional websites for restaurants and businesses in Puerto Rico. 7.5M tourists search on Google. Can they find you? Free consultation.",
  keywords: [
    "web development Puerto Rico",
    "restaurant website",
    "web design PR",
    "business websites",
    "e-commerce Puerto Rico",
    "digital menu",
    "Google Business",
  ],
  openGraph: {
    title: "Your Business Deserves More Than Just Facebook | Nitaíno Digital",
    description:
      "$4.6 billion spent on food in PR in 2024. Make sure tourists can find you.",
    type: "website",
    locale: "en_US",
    url: "https://www.nitainodigital.com/services",
  },
  alternates: {
    canonical: "https://www.nitainodigital.com/services",
    languages: {
      "es-PR": "https://www.nitainodigital.com/servicios",
      "en-US": "https://www.nitainodigital.com/services",
    },
  },
};

// For now, redirect English version to Spanish
// English content components will be implemented in Phase 2
export default function ServicesPageEN() {
  redirect("/servicios");
}
