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

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const socialLinks = getFormattedSocialLinks();

  const footerLinks = {
    es: [
      {
        title: "Sobre mí",
        href: "/#about",
      },
      {
        title: "Experiencia",
        href: "/#experience",
      },
      {
        title: "Proyectos",
        href: "/#projects",
      },
    ],
    en: [
      {
        title: "About",
        href: "/#about",
      },
      {
        title: "Experience",
        href: "/#experience",
      },
      {
        title: "Projects",
        href: "/#projects",
      },
    ],
  };

  const currentLanguageData = footerLinks[language];

  return (
    <footer className="mt-20 bg-muted/30">
      <div className="max-w-screen-md mx-auto">
        <div className="py-12 flex flex-col justify-start items-center">
          {/* Enhanced Logo with Professional Styling */}
          <div className="relative group">
            <Image
              src={"/mra-logo-sq.png"}
              alt="Logo MRA"
              width={100}
              height={100}
              className="h-20 w-20 rounded-2xl professional-shadow transition-all duration-300 group-hover:scale-110 group-hover:professional-shadow-lg"
            />
            {/* Professional glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl border border-primary/10 group-hover:border-primary/20 transition-colors duration-300"></div>
          </div>

          {/* Navigation Links */}
          <ul className="mt-8 flex items-center gap-6 flex-wrap">
            {currentLanguageData.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium hover:underline underline-offset-4"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-border/50" />

        <div className="py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Nitaíno Digital | Mario R. Ayala. {t.rightsreserved}
            .
          </span>

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
      </div>
    </footer>
  );
};

export default Footer;
