// lib/content-parser.ts

/**
 * Enhanced content parser for blog posts
 * Converts markdown-style content to properly formatted HTML
 */
export function parseMarkdownContent(content: string): string {
  if (!content) return "";

  // Split content into lines for better processing
  let html = content;

  // First, handle code blocks to protect them from other transformations
  const codeBlocks: { [key: string]: string } = {};
  let codeBlockCounter = 0;

  // Protect TypeScript code blocks
  html = html.replace(/```typescript\n([\s\S]*?)```/g, (match, code) => {
    const placeholder = `__CODE_BLOCK_TS_${codeBlockCounter}__`;
    codeBlocks[placeholder] =
      `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 border border-gray-200 dark:border-gray-700"><code class="language-typescript text-sm">${escapeHtml(code.trim())}</code></pre>`;
    codeBlockCounter++;
    return placeholder;
  });

  // Protect generic code blocks
  html = html.replace(/```\n([\s\S]*?)```/g, (match, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlockCounter}__`;
    codeBlocks[placeholder] =
      `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 border border-gray-200 dark:border-gray-700"><code class="text-sm">${escapeHtml(code.trim())}</code></pre>`;
    codeBlockCounter++;
    return placeholder;
  });

  // Handle headers
  html = html.replace(
    /^# (.+)$/gm,
    '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>'
  );
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">$1</h2>'
  );
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">$1</h3>'
  );
  html = html.replace(
    /^#### (.+)$/gm,
    '<h4 class="text-lg font-semibold mt-3 mb-2 text-gray-900 dark:text-white">$1</h4>'
  );

  // Handle inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>'
  );

  // Handle bold text
  html = html.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );

  // Handle italic text
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

  // Split by double line breaks to create paragraphs
  const paragraphs = html.split(/\n\s*\n/);

  // Process each paragraph
  const processedParagraphs = paragraphs.map((paragraph) => {
    const trimmed = paragraph.trim();

    if (!trimmed) return "";

    // Skip if it's already an HTML element (headers, code blocks, etc.)
    if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
      return trimmed;
    }

    // Handle list items
    if (trimmed.match(/^[-*+]\s/)) {
      const listItems = trimmed.split("\n").filter((line) => line.trim());
      const items = listItems
        .map((item) => {
          const cleanItem = item.replace(/^[-*+]\s/, "").trim();
          return `<li class="mb-2">${cleanItem}</li>`;
        })
        .join("\n");
      return `<ul class="list-disc list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300">\n${items}\n</ul>`;
    }

    // Handle numbered lists
    if (trimmed.match(/^\d+\.\s/)) {
      const listItems = trimmed.split("\n").filter((line) => line.trim());
      const items = listItems
        .map((item) => {
          const cleanItem = item.replace(/^\d+\.\s/, "").trim();
          return `<li class="mb-2">${cleanItem}</li>`;
        })
        .join("\n");
      return `<ol class="list-decimal list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300">\n${items}\n</ol>`;
    }

    // Regular paragraph
    // Handle line breaks within paragraphs
    const processedContent = trimmed.replace(/\n/g, "<br />");
    return `<p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">${processedContent}</p>`;
  });

  // Join all paragraphs
  html = processedParagraphs.join("\n\n");

  // Restore code blocks
  Object.entries(codeBlocks).forEach(([placeholder, codeBlock]) => {
    html = html.replace(placeholder, codeBlock);
  });

  // Handle blockquotes (optional enhancement)
  html = html.replace(
    /^> (.+)$/gm,
    '<blockquote class="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400">$1</blockquote>'
  );

  return html;
}

/**
 * Escape HTML characters to prevent XSS
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
