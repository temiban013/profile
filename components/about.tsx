"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, CircleArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { GithubLogo } from "./icons";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="about" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-12">
          <ProfileImage className="hidden md:block" />

          {/* Content */}
          <div className="flex-1 md:text-left">
            <Badge variant="secondary" className="mb-4">
              {t.about}
            </Badge>
            <ProfileImage className="mt-3 mb-8 block md:hidden" />
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              {language === "en"
                ? "Transforming Complex Ideas into Elegant Digital Solutions"
                : "Transformando ideas complejas en soluciones digitales elegantes"}
            </h2>
            <p className="text-muted-foreground mb-6 text-justify">
              {language === "en"
                ? "With over 20 years of experience in software development, I've specialized in enterprise architectures and high-performance web applications. My professional career includes key roles at companies like Disney and Office Depot, where I led digital transformation and systems integration projects. My academic background in Computer Science (obtained with honors) and my military experience have provided me with a solid foundation of discipline and methodology that I apply to every project. I'm passionate about finding elegant solutions to complex problems using modern technologies like Next.js, TypeScript, and .NET Core, always maintaining a pragmatic, results-oriented approach."
                : "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados."}
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Button className="rounded-full" asChild>
                <a
                  href="https://github.com/temiban013"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubLogo className="mr-2 h-4 w-4" />
                  {t.githubProjects}
                </a>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <a
                  href={
                    language === "en"
                      ? "/Mario-R-Ayala-Resume-EN.pdf"
                      : "/Mario-R-Ayala-Resume-ES.pdf"
                  }
                  download={
                    language === "en"
                      ? "Mario_R_Ayala_Resume.pdf"
                      : "Mario_R_Ayala_CV.pdf"
                  }
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t.downloadResume}
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
}: HTMLAttributes<HTMLDivElement>) => {
  const { language } = useLanguage();

  return (
    <div
      className={cn("mt-10 w-48 h-48 md:w-64 md:h-64", className)}
      {...props}
    >
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
            {translations[language === "en" ? "en" : "es"].myTools}
            <CircleArrowDown className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default About;
