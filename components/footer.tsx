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

const socialLinks = {
  whatsapp: "https://wa.me/14074767353",
  youtube: "https://youtube.com/@mariorafaelayala8703",
  gmail: "mailto:MarioAyalaMPA@gmail.com",
  linkedin: "https://linkedin.com/in/marioayalamscs",
  github: "https://github.com/temiban013",
};

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const footerLinks = {
    es: [
      {
        title: "Sobre mí",
        href: "#about",
      },
      {
        title: "Experiencia",
        href: "#experience",
      },
      {
        title: "Proyectos",
        href: "#projects",
      },
    ],
    en: [
      {
        title: "About",
        href: "#about",
      },
      {
        title: "Experience",
        href: "#experience",
      },
      {
        title: "Projects",
        href: "#projects",
      },
    ],
  };

  const currentLanguageData = footerLinks[language];

  return (
    <footer className="mt-20">
      <div className="max-w-screen-md mx-auto">
        <div className="py-12 flex flex-col justify-start items-center">
          {/* Logo */}
          <Image
            src={"/mra-logo-sq.png"}
            alt="Logo MRA"
            width={100}
            height={100}
            className="h-20 w-20"
          />

          <ul className="mt-6 flex items-center gap-4 flex-wrap">
            {currentLanguageData.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div className="py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Mario R. Ayala. {t.rightsreserved}
            .
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <ExternalLink
              href={socialLinks.github}
              aria-label={t.githubaccount}
            >
              <GithubLogo className="h-5 w-5" />
            </ExternalLink>
            <ExternalLink
              href={socialLinks.linkedin}
              aria-label={t.linkedinaccount}
            >
              <LinkedInLogo className="h-5 w-5" />
            </ExternalLink>
            <Link href={socialLinks.gmail} aria-label={t.sendemail}>
              <GmailLogo className="h-5 w-5" />
            </Link>
            <ExternalLink
              href={socialLinks.youtube}
              aria-label={t.youtubeaccount}
            >
              <YoutubeLogo className="h-5 w-5" />
            </ExternalLink>
            <ExternalLink
              href={socialLinks.whatsapp}
              aria-label={t.whatsappaccount}
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
