"use client";

import Link from "next/link";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleArrowDown, Zap, Code, Briefcase, Award } from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";

const FloatingElement = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <div
    className={cn("absolute opacity-20 text-primary animate-float", className)}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: "6s",
    }}
  >
    {children}
  </div>
);

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Animated Background Grid */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />

      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 gradient-professional opacity-5"></div>

      {/* Floating Professional Icons */}
      <FloatingElement delay={0} className="top-1/4 left-1/4 hidden lg:block">
        <Code size={40} />
      </FloatingElement>
      <FloatingElement delay={2} className="top-1/3 right-1/4 hidden lg:block">
        <Briefcase size={35} />
      </FloatingElement>
      <FloatingElement
        delay={4}
        className="bottom-1/3 left-1/5 hidden lg:block"
      >
        <Award size={30} />
      </FloatingElement>
      <FloatingElement delay={1} className="top-1/2 right-1/5 hidden md:block">
        <Zap size={25} />
      </FloatingElement>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse hidden lg:block"></div>
      <div
        className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse hidden lg:block"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-[1] text-center max-w-screen-md mt-12 pt-10 md:mt-0">
        {/* Professional Badge */}
        <Badge className="rounded-full border-none bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-105 professional-shadow">
          <Zap className="fill-current mr-2 h-4 w-4" />
          <span className="font-medium">
            {language === "en"
              ? "Full Stack Software Engineer"
              : "Ingeniero de Software Full Stack"}
          </span>
        </Badge>

        {/* Main Title with Gradient */}
        <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.1] tracking-tight">
          <span className="text-gradient block">
            {t.heroTitle.split(" ").slice(0, 2).join(" ")}
          </span>
          <span className="text-foreground">
            {t.heroTitle.split(" ").slice(2).join(" ")}
          </span>
        </h1>

        {/* Subtitle with Professional Styling */}
        <p className="mt-6 text-[17px] md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Experience Highlight */}
        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="font-medium">25+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 bg-secondary rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <span className="font-medium">Enterprise Solutions</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            className="rounded-full text-base font-medium professional-shadow-lg hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90"
            asChild
          >
            <Link href="#about" className="flex items-center gap-2">
              {t.inSummary}
              <CircleArrowDown className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base font-medium professional-shadow hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40 hover:bg-secondary/80"
            asChild
          >
            <Link href="#projects">
              {language === "en" ? "View Projects" : "Ver Proyectos"}
            </Link>
          </Button>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL"].map(
            (tech, index) => (
              <div
                key={tech}
                className="px-4 py-2 bg-muted/50 backdrop-blur-sm border border-border rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </div>
            )
          )}
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
