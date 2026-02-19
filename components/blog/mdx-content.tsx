// components/blog/mdx-content.tsx
import * as runtime from "react/jsx-runtime";

interface MdxContentProps {
  code: string;
}

/**
 * MDX Content Renderer
 *
 * Renders compiled MDX code from Velite as a server component.
 * The code is evaluated at build time (SSG), avoiding CSP
 * 'unsafe-eval' violations on the client.
 */
export function MdxContent({ code }: MdxContentProps) {
  const fn = new Function(code);
  const Component = fn(runtime).default;
  return <Component />;
}
