// components/seo-heading.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function H1({ children, className, id }: HeadingProps) {
  return (
    <h1
      id={id}
      className={cn("text-4xl font-bold tracking-tight mb-4", className)}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, id }: HeadingProps) {
  return (
    <h2
      id={id}
      className={cn("text-3xl font-bold tracking-tight mb-3", className)}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, id }: HeadingProps) {
  return (
    <h3 id={id} className={cn("text-2xl font-semibold mb-2", className)}>
      {children}
    </h3>
  );
}

export function H4({ children, className, id }: HeadingProps) {
  return (
    <h4 id={id} className={cn("text-xl font-semibold mb-2", className)}>
      {children}
    </h4>
  );
}

export function H5({ children, className, id }: HeadingProps) {
  return (
    <h5 id={id} className={cn("text-lg font-medium mb-1", className)}>
      {children}
    </h5>
  );
}

export function H6({ children, className, id }: HeadingProps) {
  return (
    <h6 id={id} className={cn("text-base font-medium mb-1", className)}>
      {children}
    </h6>
  );
}
