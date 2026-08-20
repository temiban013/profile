// app/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of nitainodigital.com: scope of services, intellectual property, limitation of liability, and governing law.",
  alternates: {
    canonical: "https://www.nitainodigital.com/terms",
    languages: {
      "es-PR": "https://www.nitainodigital.com/terminos",
      "en-US": "https://www.nitainodigital.com/terms",
    },
  },
  openGraph: {
    title: "Terms of Service | Nitaíno Digital",
    description:
      "Terms governing use of nitainodigital.com and the engagement of services.",
    type: "website",
    locale: "en_US",
    url: "https://www.nitainodigital.com/terms",
  },
};

const EFFECTIVE_DATE = "August 20, 2026";

export default function TermsPage() {
  return (
    <div className="max-w-screen-md mx-auto px-6 pt-32 pb-16 md:pb-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Effective as of {EFFECTIVE_DATE}
      </p>

      <div className="mt-10 space-y-10 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            1. Who we are
          </h2>
          <p className="mt-3">
            This site is operated by Mario Rafael Ayala, doing business as
            Nitaíno Digital.
          </p>
          <address className="mt-4 not-italic">
            Mario Rafael Ayala DBA Nitaíno Digital
            <br />
            15 Calle Santa Ana
            <br />
            Las Marías, PR 00670
            <br />
            Business Registration (Registro de Comerciante) 1641272-0011
            <br />
            Email:{" "}
            <a
              href="mailto:mario@nitainodigital.com"
              className="text-primary hover:underline underline-offset-4"
            >
              mario@nitainodigital.com
            </a>
            <br />
            Phone:{" "}
            <a
              href="tel:+17874585702"
              className="text-primary hover:underline underline-offset-4"
            >
              +1 (787) 458-5702
            </a>
          </address>
          <p className="mt-4">
            By using this site you accept these terms. If you do not agree with
            them, we ask that you not use it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            2. Site content is informational, not an offer
          </h2>
          <p className="mt-3">
            Service descriptions, reference prices, case studies, and any other
            content published on this site are informational in nature.{" "}
            <strong className="text-foreground">
              They do not constitute a binding offer or a contract.
            </strong>
          </p>
          <p className="mt-3">
            Prices shown are starting points and may vary according to the
            actual scope of the work. Nothing published here obligates Nitaíno
            Digital to provide a service on any particular terms or at any
            particular price.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            3. Services are governed by a separate written agreement
          </h2>
          <p className="mt-3">
            All work that Nitaíno Digital performs for a client is governed by
            an individual written agreement between the parties, which defines
            the scope, the deliverables, the schedule, the price, and the
            payment terms. That agreement prevails over any content on this
            site in the event of a discrepancy.
          </p>
          <p className="mt-3">
            Scheduling a consultation through this site does not create a
            contractual relationship and does not obligate either party to
            enter into one.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            4. Intellectual property
          </h2>
          <p className="mt-3">
            The content of this site — text, design, code, logos, branding,
            photographs, and graphic materials — is the property of Mario
            Rafael Ayala DBA Nitaíno Digital, except where otherwise indicated,
            and is protected by applicable intellectual property law.
          </p>
          <p className="mt-3">
            You may read, quote, and share links to this content. You may not
            reproduce it, redistribute it, or use it for commercial purposes
            without our prior written authorization.
          </p>
          <p className="mt-3">
            Client and third-party trademarks, names, and logos appearing in
            the case studies belong to their respective owners and are shown
            for illustrative purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            5. Third-party links and services
          </h2>
          <p className="mt-3">
            This site links to services and sites operated by third parties,
            among them Calendly, GitHub, LinkedIn, YouTube, and WhatsApp. We do
            not control those services and are not responsible for their
            content, their availability, or their privacy practices. Your use
            of them is governed by their own terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            6. No warranties
          </h2>
          <p className="mt-3">
            This site is provided{" "}
            <strong className="text-foreground">as is</strong>. Although we
            endeavor to keep the information correct and current, we do not
            warrant that it is free of errors, that the site will be available
            without interruption, or that the results described in the case
            studies will be reproduced under different circumstances.
          </p>
          <p className="mt-3">
            The metrics and results published correspond to specific projects,
            in specific contexts, and do not constitute a promise of
            performance for future work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            7. Limitation of liability
          </h2>
          <p className="mt-3">
            To the extent permitted by applicable law, Nitaíno Digital shall
            not be liable for indirect, incidental, special, or consequential
            damages arising from the use of, or the inability to use, this site
            or the information contained in it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">8. Privacy</h2>
          <p className="mt-3">
            How we handle data for people who visit this site is described in
            our{" "}
            <Link
              href="/privacy"
              className="text-primary hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            , which forms an integral part of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            9. Governing law
          </h2>
          <p className="mt-3">
            These terms are governed by the laws of the Commonwealth of Puerto
            Rico, without giving effect to its conflict-of-laws rules. Any
            dispute related to this site shall be submitted to the courts of
            competent jurisdiction in Puerto Rico.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            10. Changes to these terms
          </h2>
          <p className="mt-3">
            We may update these terms at any time. The version in force will
            always be the one published on this page, with its effective date
            at the top. Continued use of the site after an update constitutes
            your acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            11. Contact
          </h2>
          <p className="mt-3">
            Any question about these terms may be directed to{" "}
            <a
              href="mailto:mario@nitainodigital.com"
              className="text-primary hover:underline underline-offset-4"
            >
              mario@nitainodigital.com
            </a>{" "}
            or to{" "}
            <a
              href="tel:+17874585702"
              className="text-primary hover:underline underline-offset-4"
            >
              +1 (787) 458-5702
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-14 pt-8 border-t border-border flex flex-wrap gap-x-6 gap-y-2">
        <Link
          href="/privacy"
          className="text-primary hover:underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terminos"
          className="text-primary hover:underline underline-offset-4"
        >
          Leer en español
        </Link>
      </div>
    </div>
  );
}
