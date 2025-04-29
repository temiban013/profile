import Link from "next/link";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleArrowDown, Zap } from "lucide-react";

const Hero = () => {
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
          Ingeniero de Software Full Stack
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Desarrollando Soluciones Web Escalables y Eficientes
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          ¡Saludos! Soy Mario Ayala, un Ingeniero de Software con más de 20 años
          de experiencia en desarrollo de aplicaciones empresariales. Con
          formación académica en Ciencias de la Computación y amplia experiencia
          en empresas de renombre como Disney, me especializo en crear
          soluciones digitales robustas y escalables que transforman ideas en
          realidades funcionales. Mi enfoque combina precisión técnica con
          diseño intuitivo para ofrecer experiencias digitales excepcionales.
          ¿Colaboramos en su próximo proyecto? 🚀
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            <Link href="#about">En resumen...</Link>
            <CircleArrowDown className="ml-2 !h-5.5 !w-5.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
