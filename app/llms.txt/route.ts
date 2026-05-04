// app/llms.txt/route.ts
// llms.txt — emerging convention for AI/LLM site discovery (https://llmstxt.org/)
// Served at /llms.txt as a static text response.
export const dynamic = 'force-static';

export async function GET() {
  const content = `# Mario Rafael Ayala

> Full-Stack AI Engineer with 20+ years enterprise experience. Architected multi-agent orchestration system with Claude Code managing 7 concurrent projects. Expert in AI agent development, Next.js, TypeScript, .NET Core with teaching experience across diverse learners. US Navy veteran.

## Key Pages

- [Home](https://www.mariorafaelayala.com/): Portfolio — skills, experience, and projects overview
- [Resume](https://www.mariorafaelayala.com/resume): Professional résumé and credentials
- [Services (EN)](https://www.mariorafaelayala.com/services): AI engineering and software consulting services
- [Servicios (ES)](https://www.mariorafaelayala.com/servicios): AI engineering y consultoría de software
- [Blog](https://www.mariorafaelayala.com/blog): Technical articles in English and Spanish

## Resources

- [Resume PDF (EN)](https://www.mariorafaelayala.com/Mario-R-Ayala-Resume-EN.pdf): Downloadable résumé in English
- [Resume PDF (ES)](https://www.mariorafaelayala.com/Mario-R-Ayala-Resume-ES.pdf): Currículum descargable en español
- [Sitemap](https://www.mariorafaelayala.com/sitemap.xml): Canonical URL list
- [Schema JSON-LD](https://www.mariorafaelayala.com#person): Structured data for person and organization
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
