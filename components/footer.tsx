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
            <Link href="#" target="_blank">
              <GithubLogo className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank">
              <LinkedInLogo className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank">
              <GmailLogo className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank">
              <YoutubeLogo className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank">
              <WhatsappLogo className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
