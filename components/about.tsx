// components/about.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, CircleArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { GithubLogo } from "./icons";
// Import fallback content
import { fallbackAbout } from "@/lib/fallback-content";

const About = () => {
  // Use fallback content instead of Contentlayer
  const aboutContent = fallbackAbout.content;

  return (
    <section id="about" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-12">
          <ProfileImage className="hidden md:block" />

          {/* Content */}
          <div className="flex-1 md:text-left">
            <Badge variant="secondary" className="mb-4">
              Sobre mí
            </Badge>
            <ProfileImage className="mt-3 mb-8 block md:hidden" />
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Transformando ideas complejas en soluciones digitales elegantes
            </h2>
            <p className="text-muted-foreground mb-6 text-justify">
              {aboutContent}
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Button className="rounded-full" asChild>
                <a
                  href="https://github.com/temiban013"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubLogo className="mr-2 h-4 w-4" />
                  Proyectos en Github
                </a>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <a
                  href="/Mario-R-Ayala-Resume-ES.pdf"
                  download="Mario_R_Ayala_CV.pdf"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descarga CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfileImage = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-10 w-48 h-48 md:w-64 md:h-64", className)} {...props}>
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
      <Image
        src="/mra-profile.jpg"
        alt="Mario Ayala profile"
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
      />
    </div>
    <div className="mt-12 hidden md:flex items-center justify-center gap-4">
      <Button size="lg" className="rounded-full text-base" asChild>
        <Link href="#experience">
          Mis herramientas
          <CircleArrowDown className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  </div>
);

export default About;
