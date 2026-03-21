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
  try {
    const fn = new Function(code);
    const Component = fn(runtime).default;
    return <Component />;
  } catch {
    return (
      <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400 font-medium">
          Unable to render this content. Please try refreshing the page.
        </p>
      </div>
    );
  }
}
