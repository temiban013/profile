// lib/seo-guidelines.ts
export const headingHierarchyGuidelines = {
  // Only one H1 per page for the main title
  h1: {
    usage: "Main page heading - Only one per page",
    examples: [
      "Mario Rafael Ayala | Ingeniero de Software",
      "Mi Portafolio de Proyectos",
    ],
  },
  // H2 for section headings
  h2: {
    usage: "Section headings - Main sections of the page",
    examples: ["Sobre mí", "Experiencia", "Proyectos", "Educación"],
  },
  // H3 for subsection headings
  h3: {
    usage: "Subsection headings - Within larger sections",
    examples: ["Habilidades Técnicas", "Proyectos Destacados"],
  },
  // H4 for minor headings
  h4: {
    usage: "Item headings - Individual items in a list or grid",
    examples: ["Nombre del Proyecto", "Puesto en Empresa"],
  },
};

export const altTextGuidelines = {
  descriptive: "Be specific and descriptive about the image content",
  length: "Concise but complete (5-15 words is typically good)",
  context: "Include context about why the image matters",
  redundancy: "Avoid starting with 'Image of...' or 'Picture of...'",
  branding: "Include brand names when relevant",
  examples: {
    profile: "Mario Ayala sonriendo con camisa azul profesional",
    projectScreenshot:
      "Interfaz de usuario del proyecto Yukayeke mostrando la página inicial",
    technology:
      "Diagrama de arquitectura de aplicación Next.js con plataforma de imagenes Claudinary",
    logo: "Logo de Mario Ayala con iniciales MRA en color azul",
  },
};

// SEO Audit checklist for components
export const seoComponentChecklist = {
  images: [
    "✓ All images have descriptive alt text",
    "✓ Image dimensions are specified where possible",
    "✓ Key images use priority loading",
    "✓ Decorative images have empty alt text",
    "✓ Complex images have extended descriptions",
  ],
  links: [
    "✓ External links use rel='noopener noreferrer'",
    "✓ Links have descriptive text (not 'click here')",
    "✓ Interactive elements have aria-labels",
    "✓ PDF or document links indicate file type",
    "✓ Navigation links are keyboard accessible",
  ],
  headings: [
    "✓ Only one H1 per page",
    "✓ Headings follow proper hierarchy (no skipping levels)",
    "✓ Headings are descriptive of their section content",
    "✓ Sections are properly divided with appropriate headings",
    "✓ Heading text is not too long",
  ],
};
