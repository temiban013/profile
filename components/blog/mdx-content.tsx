// components/blog/mdx-content.tsx
"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";

interface MdxContentProps {
  code: string;
}

/**
 * MDX Content Renderer
 *
 * Renders compiled MDX code from Velite.
 * The code is a stringified function that returns React elements.
 */
export function MdxContent({ code }: MdxContentProps) {
  const Component = useMemo(() => {
    // Create a function from the MDX code string
    const fn = new Function(code);
    // Execute it with the JSX runtime to get the component
    return fn(runtime).default;
  }, [code]);

  return <Component />;
}
