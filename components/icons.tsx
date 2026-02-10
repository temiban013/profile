import type { ComponentProps } from "react";
import Image from "next/image";

// Usamos un tipo más apropiado para un componente Image con algunas propiedades de SVG
type IconProps = Omit<ComponentProps<typeof Image>, "src" | "alt"> & {
  className?: string;
};

export const GithubLogo = (props: IconProps) => (
  <Image
    role="img"
    src="/github-icon.png"
    alt="Github"
    width={24}
    height={24}
    className={`h-5 w-5 ${props.className || ""}`}
    {...props}
  />
);

export const LinkedInLogo = (props: IconProps) => (
  <Image
    role="img"
    src="/linkedin-icon.png"
    alt="LinkedIn"
    width={24}
    height={24}
    className={`h-5 w-5 ${props.className || ""}`}
    {...props}
  />
);

export const GmailLogo = (props: IconProps) => (
  <Image
    role="img"
    src="/gmail-icon.png"
    alt="Gmail"
    width={24}
    height={24}
    className={`h-5 w-5 ${props.className || ""}`}
    {...props}
  />
);

export const YoutubeLogo = (props: IconProps) => (
  <Image
    role="img"
    src="/youtube-icon.png"
    alt="Youtube"
    width={24}
    height={24}
    className={`h-5 w-5 ${props.className || ""}`}
    {...props}
  />
);

export const WhatsappLogo = (props: IconProps) => (
  <Image
    role="img"
    src="/whatsapp-icon.png"
    alt="WhatsApp"
    width={24}
    height={24}
    className={`h-5 w-5 ${props.className || ""}`}
    {...props}
  />
);

type SvgIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export const FiverrLogo = (props: SvgIconProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    className={`h-5 w-5 ${props.className || ""}`}
    {...props}
  >
    <title>Fiverr</title>
    <circle cx="12" cy="12" r="12" fill="black" />
    <path
      d="M14.5 6.5h-2c-1.4 0-2.5 1.1-2.5 2.5v1H8.5v2.5H10V18h2.5v-5.5H14l.5-2.5h-2V9c0-.3.2-.5.5-.5h1.5V6.5z"
      fill="white"
    />
  </svg>
);

export const USFlagIcon = (props: IconProps) => (
  <Image
    role="img"
    src="/us-flag.png"
    alt="English"
    width={24}
    height={24}
    className={`h-5 w-5 rounded-full object-cover ${props.className || ""}`}
    {...props}
  />
);

export const PRFlagIcon = (props: IconProps) => (
  <Image
    role="img"
    src="/pr-flag.png"
    alt="Español"
    width={24}
    height={24}
    className={`h-5 w-5 rounded-full object-cover ${props.className || ""}`}
    {...props}
  />
);
