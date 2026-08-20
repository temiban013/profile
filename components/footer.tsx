// components/footer.tsx
"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ExternalLink from "@/components/external-link";
import {
  GithubLogo,
  LinkedInLogo,
  GmailLogo,
  YoutubeLogo,
  WhatsappLogo,
} from "./icons";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import { getFormattedSocialLinks } from "@/lib/social-links";
import { NitainoCredit } from "./nitaino-credit";
import { usePathname, useRouter } from "next/navigation";
import { scrollToSection } from "@/lib/hooks/use-active-section";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const socialLinks = getFormattedSocialLinks();
  const pathname = usePathname();
  const router = useRouter();

  // Section links scroll hash-less (same behavior as the navbar)
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    const sectionId = href.slice(2);
    if (pathname !== "/") {
      router.push("/");
    }
    scrollToSection(sectionId);
  };

  // Same labels and destinations as the top navbar (single source: lib/i18n.ts)
  const footerLinks = [
    { title: t.about, href: "/#fundador" },
    { title: t.experience, href: "/#experiencia" },
    { title: t.projects, href: "/#casos-de-estudio" },
    { title: t.services, href: "/servicios" },
    { title: t.blog, href: "/blog" },
  ];

  const currentLanguageData = footerLinks;

  return (
    <footer className="mt-20 bg-muted/30">
      <div className="max-w-screen-md mx-auto">
        <div className="py-12 flex flex-col justify-start items-center">
          {/* Enhanced Logo with Professional Styling */}
          <div className="relative group">
            <Image
              src={"/nitaino-logo.png"}
              alt="Nitaíno Digital"
              width={741}
              height={252}
              className="h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </div>

          {/* Navigation Links */}
          <ul className="mt-8 flex items-center justify-center gap-x-6 gap-y-3 flex-wrap px-6">
            {currentLanguageData.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  onClick={(e) => handleSectionClick(e, href)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium hover:underline underline-offset-4"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Legal links — reachable in one click from every page (WP-4) */}
          <ul className="mt-4 flex items-center justify-center gap-x-6 gap-y-2 flex-wrap px-6">
            <li>
              <Link
                href={language === "en" ? "/privacy" : "/privacidad"}
                className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300 hover:underline underline-offset-4"
              >
                {t.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={language === "en" ? "/terms" : "/terminos"}
                className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300 hover:underline underline-offset-4"
              >
                {t.terms}
              </Link>
            </li>
          </ul>
        </div>

        <Separator className="bg-border/50" />

        <div className="py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Nitaíno Digital | Mario R. Ayala. {t.rightsreserved}
              .
            </span>

            {/* Business identity block — indexable operational proof (WP-3) */}
            <address className="text-muted-foreground text-sm not-italic leading-relaxed">
              Mario Rafael Ayala DBA Nitaíno Digital
              <br />
              Las Marías, PR 00670
              <br />
              {t.merchantRegistration}: 1641272-0011
              <br />
              <Link
                href="tel:+17874585702"
                className="hover:text-primary transition-colors duration-300"
              >
                +1 (787) 458-5702
              </Link>
            </address>
          </div>

          {/* Enhanced Social Media Icons */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <ExternalLink
              href={socialLinks.github}
              aria-label={t.githubaccount}
              className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <GithubLogo className="h-5 w-5" />
            </ExternalLink>
            <ExternalLink
              href={socialLinks.linkedin}
              aria-label={t.linkedinaccount}
              className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <LinkedInLogo className="h-5 w-5" />
            </ExternalLink>
            <Link
              href={socialLinks.gmail}
              aria-label={t.sendemail}
              className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <GmailLogo className="h-5 w-5" />
            </Link>
            <ExternalLink
              href={socialLinks.youtube}
              aria-label={t.youtubeaccount}
              className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <YoutubeLogo className="h-5 w-5" />
            </ExternalLink>
            <ExternalLink
              href={socialLinks.whatsapp}
              aria-label={t.whatsappaccount}
              className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <WhatsappLogo className="h-5 w-5" />
            </ExternalLink>
          </div>
        </div>

        <NitainoCredit lang={language} />
      </div>
    </footer>
  );
};

export default Footer;
