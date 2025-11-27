// Type definitions for Services Landing Page

export type Language = "es" | "en";

export interface ServiceOffering {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  icon: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  popular?: boolean;
  features: string[];
  included: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  quote: string;
  result?: string;
  photo?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  hasWebsite: "yes" | "no";
  goals: string;
}

export interface ServicesContent {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  problem: {
    title: string;
    painPoints: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    stat: {
      value: string;
      label: string;
    };
  };
  solution: {
    title: string;
  };
  services: {
    title: string;
    offerings: ServiceOffering[];
  };
  comparison: {
    title: string;
  };
  pricing: {
    title: string;
    tiers: PricingTier[];
    financing: string;
  };
  testimonials: {
    title: string;
    items: Testimonial[];
  };
  faq: {
    title: string;
    items: FAQItem[];
  };
  cta: {
    headline: string;
    subtext: string;
    button: string;
    alternative: string;
  };
}
