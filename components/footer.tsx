import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  GithubLogo,
  LinkedInLogo,
  GmailLogo,
  YoutubeLogo,
  WhatsappLogo,
} from "./icons";

const footerLinks = [
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
];

const socialLinks = {
  whatsapp: "https://wa.me/14074767353",
  youtube: "https://youtube.com/@mariorafaelayala8703",
  gmail: "mailto:MarioAyalaMPA@gmail.com",
  linkedin: "https://linkedin.com/in/marioayalamscs",
  github: "https://github.com/temiban013",
};

const Footer = () => {
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
            {footerLinks.map(({ title, href }) => (
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
            &copy; {new Date().getFullYear()} Mario R. Ayala. Derechos
            reservados.
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <Link
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <GithubLogo className="h-5 w-5" />
            </Link>
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <LinkedInLogo className="h-5 w-5" />
            </Link>
            <Link href={socialLinks.gmail} aria-label="Send Email">
              <GmailLogo className="h-5 w-5" />
            </Link>
            <Link
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
            >
              <YoutubeLogo className="h-5 w-5" />
            </Link>
            <Link
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
            >
              <WhatsappLogo className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
