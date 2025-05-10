// components/optimized-image.tsx
import Image from "next/image";
import type { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  className?: string;
}

export default function OptimizedImage({
  alt,
  className = "",
  priority = false,
  ...props
}: OptimizedImageProps) {
  // Generate a default sizes attribute if not provided
  const sizes =
    props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  return (
    <Image
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
      {...props}
    />
  );
}
