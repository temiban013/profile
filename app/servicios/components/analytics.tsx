"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = pathname + searchParams.toString();

    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}

// Event tracking utilities
export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

// Specific event trackers for services page
export const analytics = {
  // Form events
  formStart: () => trackEvent("form_start", { form_name: "servicios_contact" }),
  formSubmit: (formData: { business_type?: string; website_status?: string }) =>
    trackEvent("form_submit", {
      form_name: "servicios_contact",
      ...formData,
    }),
  formError: (error: string) =>
    trackEvent("form_error", {
      form_name: "servicios_contact",
      error_message: error,
    }),

  // Section engagement
  sectionView: (sectionName: string) =>
    trackEvent("section_view", {
      section_name: sectionName,
      page: "servicios",
    }),

  // CTA clicks
  ctaClick: (ctaLocation: string) =>
    trackEvent("cta_click", {
      cta_location: ctaLocation,
      page: "servicios",
    }),

  // Pricing interactions
  pricingView: (tier: string) =>
    trackEvent("pricing_view", {
      pricing_tier: tier,
      page: "servicios",
    }),

  // External link clicks
  externalLinkClick: (linkName: string, url: string) =>
    trackEvent("external_link_click", {
      link_name: linkName,
      link_url: url,
      page: "servicios",
    }),

  // FAQ interactions
  faqOpen: (question: string) =>
    trackEvent("faq_open", {
      question: question.substring(0, 100), // Limit length
      page: "servicios",
    }),

  // Testimonial carousel
  testimonialView: (testimonialIndex: number, clientName: string) =>
    trackEvent("testimonial_view", {
      testimonial_index: testimonialIndex,
      client_name: clientName,
      page: "servicios",
    }),

  // Scroll depth milestones
  scrollDepth: (percentage: number) =>
    trackEvent("scroll_depth", {
      scroll_percentage: percentage,
      page: "servicios",
    }),
};
