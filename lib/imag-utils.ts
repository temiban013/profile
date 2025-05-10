// lib/image-utils.ts (updated)
import type { ImageProps } from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function getOptimizedImageProps({
  src,
  alt,
  width = 0,
  height = 0,
  priority = false,
  className = "",
}: OptimizedImageProps): ImageProps {
  // Generate appropriate sizes attribute for responsive images
  const sizes =
    width > 768
      ? "100vw"
      : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  const props: ImageProps = {
    src,
    alt,
    sizes,
    className,
    loading: priority ? "eager" : "lazy",
    priority: priority,
  };

  // Only add width and height if they are provided
  if (width > 0) props.width = width;
  if (height > 0) props.height = height;

  return props;
}
