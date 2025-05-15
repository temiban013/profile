"use client";

import Link from "next/link";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleArrowDown, Zap } from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <div className="relative z-[1] text-center max-w-screen-md">
        <Badge className="rounded-full border-none">
          <Zap className="fill-current" />
          {language === "en"
            ? "Full Stack Software Engineer"
            : "Ingeniero de Software Full Stack"}
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          {t.heroTitle}
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">{t.heroSubtitle}</p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            <Link href="#about">{t.inSummary}</Link>
            <CircleArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
