import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Share2 } from "lucide-react";
import Link from "next/link";
import {
  GithubLogo,
  LinkedInLogo,
  GmailLogo,
  YoutubeLogo,
  WhatsappLogo,
} from "../icons";

const socialLinks = {
  whatsapp: "https://wa.me/14074767353",
  youtube: "https://youtube.com/@mariorafaelayala8703",
  gmail: "mailto:MarioAyalaMPA@gmail.com",
  linkedin: "https://linkedin.com/in/marioayalamscs",
  github: "https://github.com/temiban013",
};

export const SocialMediaSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Share2 className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="pt-10 px-6">
        {/* Adding SheetTitle and SheetDescription for accessibility */}
        <SheetTitle>Redes Sociales</SheetTitle>
        <SheetDescription>
          Conecta conmigo a través de estas plataformas
        </SheetDescription>

        <div className="flex flex-col gap-4 mt-6">
          <Button
            variant="outline"
            className="rounded-full justify-start"
            asChild
          >
            <Link
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
            >
              <WhatsappLogo className="mr-2" />
              WhatsApp
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full justify-start"
            asChild
          >
            <Link
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
            >
              <YoutubeLogo className="mr-2" />
              YouTube
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full justify-start"
            asChild
          >
            <Link href={socialLinks.gmail} aria-label="Send Email">
              <GmailLogo className="mr-2" />
              Email
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full justify-start"
            asChild
          >
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <LinkedInLogo className="mr-2" />
              LinkedIn
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full justify-start"
            asChild
          >
            <Link
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <GithubLogo className="mr-2" />
              GitHub
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
