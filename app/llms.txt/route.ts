// app/llms.txt/route.ts
// llms.txt — emerging convention for AI/LLM site discovery (https://llmstxt.org/)
// Served at /llms.txt as a static text response.
export const dynamic = 'force-static';

export async function GET() {
  const content = `# Nitaíno Digital

> Puerto Rico–based digital studio for AI engineering, web development, video production, and training & education. Founded in January 2026 by Mario Rafael Ayala, a Full-Stack AI Engineer with 25+ years of enterprise experience (Disney, Office Depot; MS Computer Science, Magna Cum Laude; US Navy veteran). The studio runs on AgenticOps: a custom governance layer of 5 MCP servers coordinating AI agents across 8 concurrent projects with billing, compliance scoring, and RAG-backed project memory. Tagline: "Digital solutions rooted in heritage" / "Soluciones digitales con raíces taínas."

## Key Pages

- [Home](https://www.nitainodigital.com/): Agency overview — services, case studies, and the founder
- [Servicios (ES)](https://www.nitainodigital.com/servicios): Service catalog and pricing for Puerto Rico businesses
- [Services (EN)](https://www.nitainodigital.com/services): AI engineering and software consulting services
- [Resume](https://www.nitainodigital.com/resume): Founder's professional résumé and credentials
- [Blog](https://www.nitainodigital.com/blog): Technical articles in English and Spanish

## Case Studies

- Gespervis ASL School (gespervis.com): Full-stack ASL education platform for Puerto Rico's deaf community — Claude-vision AI sign validator, live virtual classrooms, 7,000+ automated tests
- Berríos Corporate Sign Library (gespervis.com/empresas/berrios): B2B corporate accessibility pilot — 138-sign workplace ASL library with mirror-mode player on a partner-branded portal
- Pabellón de la Fama del Deporte Humacaeño (pabellon.org): Digital sports museum — 78 inducted legends, 360° virtual tour, video interview series; ongoing retainer
- AI-Assisted Video Production: Whisper transcription → fact-checked dossier → Claude Design graphics → programmatic Kdenlive editing; raw phone footage to published YouTube film in ~3 days
- Café Papamín (cafepapamin.com): Bilingual coffee e-commerce — Stripe Hosted Checkout, cost-optimal box packing, multi-carrier rate shopping
- Dinamico.menu (dinamico.menu): Multi-tenant SaaS digital-menu platform for Puerto Rico food trucks — own product

## Resources

- [Resume PDF (EN)](https://www.nitainodigital.com/Mario-R-Ayala-Resume-EN.pdf): Downloadable résumé in English
- [Resume PDF (ES)](https://www.nitainodigital.com/Mario-R-Ayala-Resume-ES.pdf): Currículum descargable en español
- [Sitemap](https://www.nitainodigital.com/sitemap.xml): Canonical URL list
- [Schema JSON-LD](https://www.nitainodigital.com#organization): Structured data — Organization (primary) and founder Person
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
