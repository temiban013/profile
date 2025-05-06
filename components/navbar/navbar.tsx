import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GithubLogo,
  LinkedInLogo,
  GmailLogo,
  YoutubeLogo,
  WhatsappLogo,
} from "../icons";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SocialMediaSheet } from "./social-media-sheet";
import LanguageSwitcher from "@/components/language-switcher";

const socialLinks = {
  whatsapp: "https://wa.me/14074767353", // Using your phone from resume
  youtube: "https://youtube.com/@mariorafaelayala8703", // Replace with your channel
  gmail: "mailto:MarioAyalaMPA@gmail.com", // Using your email from resume
  linkedin: "https://linkedin.com/in/marioayalamscs", // Replace with your profile
  github: "https://github.com/temiban013", // Replace with your GitHub username
};

const Navbar = () => {
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 bg-background border dark:border-slate-700/70 max-w-screen-md mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-3">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full shadow-none"
            size="icon"
          >
            <Link
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
            >
              <WhatsappLogo />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full shadow-none"
            size="icon"
          >
            <Link
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
            >
              <YoutubeLogo />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full shadow-none"
            size="icon"
          >
            <Link href={socialLinks.gmail} aria-label="Send Email">
              <GmailLogo />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full shadow-none"
            size="icon"
          >
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <LinkedInLogo />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full shadow-none" // Modified
            size="icon"
          >
            <Link
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <GithubLogo className="h-5 w-5" /> {/* Fixed class names */}
            </Link>
          </Button>

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <SocialMediaSheet />
          </div>
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
