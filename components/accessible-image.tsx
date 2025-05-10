// components/accessible-image.tsx
import Image from "next/image";
import type { ImageProps } from "next/image";

type AccessibleImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  className?: string;
  decorative?: boolean;
};

export default function AccessibleImage({
  alt,
  decorative = false,
  className = "",
  ...props
}: AccessibleImageProps) {
  // For purely decorative images, we use an empty alt text
  // but we require explicit acknowledgment that it's decorative
  const altText = decorative ? "" : alt;

  // Validate alt text in development
  if (process.env.NODE_ENV !== "production") {
    if (!decorative && (!alt || alt.trim() === "")) {
      console.warn("Accessibility Warning: Image is missing alt text");
    }

    if (
      !decorative &&
      (alt.toLowerCase().startsWith("image of") ||
        alt.toLowerCase().startsWith("picture of"))
    ) {
      console.warn(
        'Accessibility Warning: Alt text should not start with "image of" or "picture of"'
      );
    }
  }

  return <Image className={className} alt={altText} {...props} />;
}
