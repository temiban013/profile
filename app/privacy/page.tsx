// app/privacy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
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

const EFFECTIVE_DATE = "August 20, 2026";

export default function PrivacyPage() {
  return (
    <div className="max-w-screen-md mx-auto px-6 pt-32 pb-16 md:pb-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Effective as of {EFFECTIVE_DATE}
      </p>

      <div className="mt-10 space-y-10 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            1. Who is responsible for your data
          </h2>
          <p className="mt-3">
            The party responsible for this website is Mario Rafael Ayala,
            doing business as Nitaíno Digital.
          </p>
          <address className="mt-4 not-italic">
            Mario Rafael Ayala DBA Nitaíno Digital
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
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            2. This site does not collect data through forms
          </h2>
          <p className="mt-3">
            We want to be explicit about this because it is uncommon:{" "}
            <strong className="text-foreground">
              nitainodigital.com has no contact forms and does not collect
              information on our servers.
            </strong>{" "}
            There is no user registration, no accounts, no visitor database,
            and we do not ask you for your name, address, or phone number
            anywhere on the site.
          </p>
          <p className="mt-3">
            All communication happens because you decide to initiate it: by
            writing to our email address or by scheduling an appointment
            through Calendly. At that point you voluntarily share with us
            whatever information you choose to include in your message.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            3. Cookies we use
          </h2>
          <p className="mt-3">
            This site stores a single first-party cookie, of a functional
            nature:
          </p>
          <ul className="mt-4 space-y-3 list-disc pl-5">
            <li>
              <strong className="text-foreground">lang</strong> — stores
              whether you prefer to view the site in Spanish or English, so we
              do not have to ask you again on every visit. It is kept for one
              year. It does not contain personal information and cannot
              identify you.
            </li>
          </ul>
          <p className="mt-4">
            The analytics services described in the next section may set
            their own cookies under their respective policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            4. Analytics and third-party services
          </h2>
          <p className="mt-3">
            We use the following third-party services. Each operates under
            its own privacy policy, and we recommend you review them.
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-semibold text-foreground">
                Vercel Analytics and Vercel Speed Insights
              </h3>
              <p className="mt-2">
                Loaded on{" "}
                <strong className="text-foreground">every page</strong> of
                the site. They collect aggregate data about visits and about
                the technical performance of the pages (load times, Core Web
                Vitals metrics). Vercel is also the platform where this site
                is hosted, so it processes the requests your browser sends,
                including your IP address.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Google Analytics
              </h3>
              <p className="mt-2">
                Used only on the{" "}
                <Link
                  href="/services"
                  className="text-primary hover:underline underline-offset-4"
                >
                  Services
                </Link>{" "}
                page. It records page views and certain interactions within
                that page: scroll depth, clicks on call-to-action buttons,
                opening of frequently asked questions, and viewing of
                testimonials. It is used to understand which content is
                useful, not to identify individuals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Calendly</h3>
              <p className="mt-2">
                The links to schedule an appointment take you outside this
                site, to the Calendly domain. Any information you provide
                there (name, email, selected date) is received by Calendly
                under its privacy policy, and we receive it as a notification
                of the scheduled appointment.
              </p>
            </div>
          </div>

          <p className="mt-5">
            The site&apos;s typeface is served from our own domain, so your
            browser does not make requests to external font servers when
            visiting us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            5. What we use this information for
          </h2>
          <p className="mt-3">
            Aggregate analytics data is used to understand which pages are
            useful, detect performance issues, and improve the site.
            Information you send us by email or through Calendly is used to
            respond to you and, where applicable, to coordinate and provide
            the service you request.
          </p>
          <p className="mt-3">
            <strong className="text-foreground">
              We do not sell, rent, or share your information with third
              parties for marketing purposes.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            6. How long we keep the information
          </h2>
          <p className="mt-3">
            Email correspondence is kept for as long as necessary to handle
            your request and comply with accounting or legal obligations.
            Analytics data is retained in aggregate form according to each
            provider&apos;s retention periods. The language cookie expires
            after one year, and you can delete it at any time from your
            browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            7. Your rights
          </h2>
          <p className="mt-3">
            You may request access to the information we hold about you, its
            correction, or its deletion. Since we do not maintain a visitor
            database, in practice this refers to correspondence you have sent
            us.
          </p>
          <p className="mt-3">
            To exercise any of these rights, write to us at{" "}
            <a
              href="mailto:mario@nitainodigital.com"
              className="text-primary hover:underline underline-offset-4"
            >
              mario@nitainodigital.com
            </a>
            . You can also block or delete cookies from your browser
            settings, and disable Google Analytics using the add-ons Google
            provides for that purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            8. Minors
          </h2>
          <p className="mt-3">
            This site is directed at individuals and businesses seeking
            professional services. It is not directed at children under 13,
            and we do not knowingly collect information from minors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            9. Changes to this policy
          </h2>
          <p className="mt-3">
            If we change how we handle data — for example, if we add a
            contact form in the future — we will update this page and revise
            the effective date shown at the top.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            10. Contact
          </h2>
          <p className="mt-3">
            Any questions about this policy can be directed to{" "}
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
          href="/terms"
          className="text-primary hover:underline underline-offset-4"
        >
          Terms of Service
        </Link>
        <Link
          href="/privacidad"
          className="text-primary hover:underline underline-offset-4"
        >
          Leer en español
        </Link>
      </div>
    </div>
  );
}
