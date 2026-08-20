// Types
export interface Project {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  tecnologias: string[];
  categoria: string;
  urlSitio?: string;
  urlGithub?: string;
  destacado?: boolean;
  anio: number;
  businessImpact?: {
    metric: string;
    result: string;
    savings?: string;
    efficiency?: string;
    timeline?: string;
  };
  clientType?: string;
  industry?: string;
}

// Enhanced project data with categories and years
export const projectData: Record<"en" | "es", Project[]> = {
  en: [
    {
      id: "cafe-papamin",
      titulo: "Café Papamín",
      descripcion:
        "Bilingual online store for Café Papamín, a Puerto Rican coffee brand from San Sebastián. Launched in 2025 and grown into full e-commerce in 2026: a shipping engine with cost-optimal box packing and live rate quotes across three destination zones (Puerto Rico, US mainland, Hawaii/Alaska), an admin order queue with per-carrier dispatch exports, Stripe Hosted Checkout built and hardened for the final launch phase, and monthly web-performance reports delivered to the client.",
      imagen: "/papamin-preview.webp",
      tecnologias: [
        "Next.js 16",
        "TypeScript",
        "Neon PostgreSQL",
        "Stripe Checkout",
        "next-intl",
        "Vitest",
        "Playwright",
        "Vercel",
      ],
      categoria: "E-Commerce",
      urlSitio: "https://cafepapamin.com",
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Search Visibility",
        result: "+124% Google impressions and +105% clicks in 6 months",
        efficiency: "Cost-optimal box packing with multi-carrier rate shopping",
        timeline: "2025 launch grown into e-commerce through 2026",
      },
      clientType: "Small Business",
      industry: "Food & Beverage",
    },
    {
      id: "dinamico-menu",
      titulo: "Dinamico.menu",
      descripcion:
        "Multi-tenant SaaS platform for Puerto Rico's food trucks and kioscos—Nitaíno Digital's own product. Features subdomain-routed customer menus with 13 templates across 3 tiers, real-time order management, QR codes, Stripe subscription billing, and row-level-security multi-tenancy on Supabase. Built as a Turborepo monorepo with four applications (menu, admin, landing, platform) using AI-assisted agentic development.",
      imagen: "/dinamico-preview.webp",
      tecnologias: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS 4.0",
        "Supabase",
        "Stripe",
        "Turborepo",
        "Zustand",
        "Playwright",
      ],
      categoria: "SaaS Platform",
      urlSitio: "https://dinamico.menu",
      // No GitHub link (private repo)
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Food Truck Operations",
        result: "13 menu templates across 3 tiers with realtime orders",
        efficiency: "Row-level-security multi-tenancy on a 4-app monorepo",
        timeline: "MVP complete; launching",
      },
      clientType: "SaaS Product",
      industry: "Food & Beverage Technology",
    },
    {
      id: "berrios-sign-library",
      titulo: "Berríos Corporate Sign Library",
      descripcion:
        "B2B corporate accessibility pilot built on the Gespervis platform: a 138-sign workplace ASL library with video delivery via Cloudflare R2, a mirror-mode player so employees imitate signs as in a mirror, and a fully partner-branded learning portal with dedicated SEO. Includes the Shopper Accesible proposal for accessible in-store customer service.",
      imagen: "/berrios-preview.webp",
      tecnologias: [
        "Next.js 16",
        "TypeScript",
        "Cloudflare R2",
        "Video Streaming",
        "Prisma",
        "PostgreSQL",
        "JSON-LD SEO",
      ],
      categoria: "Corporate Accessibility",
      urlSitio: "https://www.gespervis.com/empresas/berrios",
      // No GitHub (client project)
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Corporate Accessibility Pilot",
        result: "138-sign corporate library on a partner-branded portal",
        efficiency: "Mirror-mode video player for natural sign learning",
        timeline: "B2B pilot launched in 2026",
      },
      clientType: "Enterprise Retail Partner",
      industry: "Corporate Accessibility Training",
    },
    {
      id: "gespervis-school",
      titulo: "Gespervis ASL School",
      descripcion:
        "Full-stack ASL education platform for Puerto Rico's deaf community. Features an AI sign validator powered by Claude vision—students submit a photo performing a sign and receive instant feedback—plus live virtual classrooms (Daily.co), dual enrollment systems, four specialty tracks (Medical, Legal, Government, Technology), Stripe payments with installments, and certificate generation. Built with Claude Code's agentic orchestration and verified by 7,000+ automated tests.",
      imagen: "/gespervis-preview.webp",
      tecnologias: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Stripe",
        "NextAuth",
        "Daily.co",
        "Claude Vision API",
        "Claude Code Orchestration",
      ],
      categoria: "EdTech Platform",
      urlSitio: "https://gespervis.com",
      // No GitHub (client project)
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Platform Capabilities",
        result:
          "Complete LMS with AI sign validation, live classrooms, and 4 specialized industry tracks",
        efficiency: "AI-orchestrated development with parallel agents",
        timeline: "Production-ready in 12 weeks; now in corporate growth phase",
      },
      clientType: "Education Business",
      industry: "ASL Education",
    },
    {
      id: "pabellon-fama-deporte",
      titulo: "Pabellón de la Fama del Deporte Humacaeño",
      descripcion:
        "Official digital museum for Puerto Rico's Humacao Sports Hall of Fame. Features a searchable directory of 78 inducted sports legends, a 360° virtual museum tour built with Three.js, an interactive history timeline (1983–2024), a news section, and 'Visitas Distinguidas' video interviews published on YouTube. An ongoing retainer partnership—current initiatives include an online donations system (ATH Móvil, PayPal, Venmo). 95+ Lighthouse scores.",
      imagen: "/pabellon-preview.webp",
      tecnologias: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Three.js",
        "Vercel",
        "SEO Optimization",
        "Digital Museum",
        "YouTube Integration",
      ],
      categoria: "Cultural Heritage",
      urlSitio: "https://pabellon.org",
      urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/pabellon-fama`,
      destacado: true,
      anio: 2025,
      businessImpact: {
        metric: "Digital Preservation Impact",
        result: "78 sports legends digitally preserved with a 360° virtual museum",
        efficiency: "Ongoing retainer partnership with continuous new features",
        timeline: "Delivered in 8 weeks; in active evolution since 2025",
      },
      clientType: "Cultural Institution",
      industry: "Cultural Heritage",
    },
    {
      id: "video-produccion",
      titulo: "AI-Assisted Video Production — Pabellón Interviews",
      descripcion:
        "End-to-end video production line for the Pabellón's 'Visitas Distinguidas' series. Raw phone footage becomes a published film through a documented AI-assisted pipeline: Whisper transcription, a fact-checked research dossier with verified timestamps, 26 broadcast graphics designed in Claude Design and exported via Playwright, and Kdenlive timelines generated programmatically with Python. First film: an interview with Rafael 'Rafa' Ocasio, 95-year-old hall-of-fame athlete—published on YouTube in about 3 days of work.",
      imagen: "/video-produccion-preview.webp",
      tecnologias: [
        "Whisper",
        "Claude Design",
        "Kdenlive",
        "MLT/melt",
        "Python",
        "Playwright",
        "FFmpeg",
        "YouTube",
      ],
      categoria: "Video Production",
      urlSitio: "https://www.youtube.com/watch?v=7mxpxoJmi-g",
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Production Turnaround",
        result: "Raw phone footage to published film in ~3 days",
        efficiency:
          "26 motion graphics placed programmatically from a timestamped dossier",
        timeline: "Repeatable, documented pipeline for future interviews",
      },
      clientType: "Cultural Institution",
      industry: "Media Production",
    },
    {
      id: "jibaro-eats",
      titulo: "Jíbaro Eats Photography",
      descripcion:
        "Visual portfolio website for a professional photographer specializing in gastronomy. Features high-quality image galleries, lazy-loading optimization, and fluid navigation between collections.",
      imagen: "/jibaroeats-preview.webp",
      tecnologias: [
        "Next.js 13+",
        "TypeScript",
        "Tailwind CSS",
        "CSR",
        "SSR",
        "Cloudinary",
        "Vercel",
      ],
      categoria: "Portfolio",
      urlSitio: "https://jibaro-eats.vercel.app/",
      urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/${process.env.NEXT_PUBLIC_JIBAROEATS_REPO}`,
      destacado: false,
      anio: 2023,
      businessImpact: {
        metric: "Client Engagement",
        result: "Professional portfolio showcasing 50+ projects",
        efficiency: "Fast-loading galleries with optimized images",
        timeline: "Full-featured portfolio in 3 weeks",
      },
      clientType: "Photography Business",
      industry: "Food & Event Photography",
    },
    {
      id: "yukayeke-playa",
      titulo: "Yukayeke Playa Real Estate",
      descripcion:
        "Modern real estate platform showcasing luxury beachfront properties in Puerto Rico. Features comprehensive property listings, bilingual SEO optimization, and responsive design for optimal mobile experience.",
      imagen: "/yukayeke-preview.webp",
      tecnologias: [
        "Next.js 14",
        "TypeScript",
        "Tailwind CSS",
        "i18n",
        "Vercel",
        "SEO",
        "SSR",
        "ImageKit",
        "Cloudinary",
      ],
      categoria: "Web Development",
      urlSitio: "https://yukayekeplaya.com",
      destacado: true,
      anio: 2024,
      businessImpact: {
        metric: "Property Inquiry Rate",
        result: "Beachfront property showcase generating qualified leads",
        efficiency: "Fast, bilingual property browsing experience",
        savings: "Reduced marketing costs by $2,000/month",
        timeline: "High-impact delivery in 6 weeks",
      },
      clientType: "Real Estate Business",
      industry: "Real Estate",
    },
  ],
  es: [
    {
      id: "cafe-papamin",
      titulo: "Café Papamín",
      descripcion:
        "Tienda en línea bilingüe para Café Papamín, marca de café puertorriqueño de San Sebastián. Lanzada en 2025 y crecida a e-commerce completo en 2026: un motor de envíos con empaque óptimo de cajas y cotización de tarifas en vivo en tres zonas de destino (Puerto Rico, EE.UU. continental, Hawái/Alaska), cola de pedidos administrativa con exportes por transportista, Stripe Hosted Checkout construido y endurecido para la fase final de lanzamiento, e informes mensuales de rendimiento web entregados al cliente.",
      imagen: "/papamin-preview.webp",
      tecnologias: [
        "Next.js 16",
        "TypeScript",
        "Neon PostgreSQL",
        "Stripe Checkout",
        "next-intl",
        "Vitest",
        "Playwright",
        "Vercel",
      ],
      categoria: "E-Commerce",
      urlSitio: "https://cafepapamin.com",
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Visibilidad en Búsquedas",
        result: "+124% impresiones y +105% clics en Google en 6 meses",
        efficiency: "Empaque óptimo de cajas con cotización multi-transportista",
        timeline: "Lanzado en 2025, crecido a e-commerce durante 2026",
      },
      clientType: "Pequeño Negocio",
      industry: "Alimentación y Bebidas",
    },
    {
      id: "dinamico-menu",
      titulo: "Dinamico.menu",
      descripcion:
        "Plataforma SaaS multi-tenant para food trucks y kioscos de Puerto Rico—producto propio de Nitaíno Digital. Incluye menús de clientes por subdominio con 13 plantillas en 3 niveles, gestión de pedidos en tiempo real, códigos QR, facturación por suscripción con Stripe y multi-tenancy con seguridad a nivel de fila (RLS) en Supabase. Construido como monorepo Turborepo con cuatro aplicaciones (menu, admin, landing, platform) usando desarrollo agéntico asistido por IA.",
      imagen: "/dinamico-preview.webp",
      tecnologias: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS 4.0",
        "Supabase",
        "Stripe",
        "Turborepo",
        "Zustand",
        "Playwright",
      ],
      categoria: "Plataforma SaaS",
      urlSitio: "https://dinamico.menu",
      // No GitHub link (private repo)
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Operaciones Food Truck",
        result: "13 plantillas de menú en 3 niveles con pedidos en tiempo real",
        efficiency: "Multi-tenancy RLS sobre un monorepo de 4 aplicaciones",
        timeline: "MVP completo; en lanzamiento",
      },
      clientType: "Producto SaaS",
      industry: "Tecnología de Alimentos y Bebidas",
    },
    {
      id: "berrios-sign-library",
      titulo: "Biblioteca Corporativa de Señas Berríos",
      descripcion:
        "Piloto B2B de accesibilidad corporativa construido sobre la plataforma Gespervis: una biblioteca de 138 señas del entorno laboral con video servido desde Cloudflare R2, un reproductor en modo espejo para que los empleados imiten las señas como frente a un espejo, y un portal de aprendizaje con la marca del socio y SEO dedicado. Incluye la propuesta Shopper Accesible para servicio al cliente accesible en tienda.",
      imagen: "/berrios-preview.webp",
      tecnologias: [
        "Next.js 16",
        "TypeScript",
        "Cloudflare R2",
        "Video Streaming",
        "Prisma",
        "PostgreSQL",
        "JSON-LD SEO",
      ],
      categoria: "Accesibilidad Corporativa",
      urlSitio: "https://www.gespervis.com/empresas/berrios",
      // No GitHub (proyecto cliente)
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Piloto de Accesibilidad Corporativa",
        result: "Biblioteca corporativa de 138 señas en un portal con marca del socio",
        efficiency: "Reproductor en modo espejo para aprendizaje natural de señas",
        timeline: "Piloto B2B lanzado en 2026",
      },
      clientType: "Socio Empresarial de Retail",
      industry: "Adiestramiento en Accesibilidad Corporativa",
    },
    {
      id: "gespervis-school",
      titulo: "Escuela Gespervis ASL",
      descripcion:
        "Plataforma educativa full-stack de ASL para la comunidad sorda de Puerto Rico. Incluye un validador de señas con IA impulsado por visión de Claude—el estudiante somete una foto haciendo la seña y recibe retroalimentación instantánea—además de salones virtuales en vivo (Daily.co), inscripción dual, cuatro tracks especializados (Médico, Legal, Gobierno, Tecnología), pagos Stripe con planes de pago y generación de certificados. Construido con orquestación agéntica de Claude Code y verificado por más de 7,000 pruebas automatizadas.",
      imagen: "/gespervis-preview.webp",
      tecnologias: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Stripe",
        "NextAuth",
        "Daily.co",
        "Claude Vision API",
        "Orquestación Claude Code",
      ],
      categoria: "Plataforma EdTech",
      urlSitio: "https://gespervis.com",
      // No GitHub (proyecto cliente)
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Capacidades de Plataforma",
        result:
          "LMS completo con validación de señas por IA, salones en vivo y 4 tracks de industria especializados",
        efficiency: "Desarrollo orquestado por IA con agentes paralelos",
        timeline: "Listo para producción en 12 semanas; hoy en fase de crecimiento corporativo",
      },
      clientType: "Negocio Educativo",
      industry: "Educación ASL",
    },
    {
      id: "pabellon-fama-deporte",
      titulo: "Pabellón de la Fama del Deporte Humacaeño",
      descripcion:
        "Museo digital oficial del Pabellón de la Fama del Deporte de Humacao, Puerto Rico. Incluye un directorio con búsqueda de 78 exaltados, un tour virtual 360° del museo construido con Three.js, una cronología interactiva (1983–2024), sección de noticias y las entrevistas en video 'Visitas Distinguidas' publicadas en YouTube. Una relación de servicio continuo (retainer)—las iniciativas actuales incluyen un sistema de donaciones en línea (ATH Móvil, PayPal, Venmo). Puntuaciones Lighthouse 95+.",
      imagen: "/pabellon-preview.webp",
      tecnologias: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Three.js",
        "Vercel",
        "Optimización SEO",
        "Museo Digital",
        "Integración YouTube",
      ],
      categoria: "Patrimonio Cultural",
      urlSitio: "https://pabellon.org",
      urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/pabellon-fama`,
      destacado: true,
      anio: 2025,
      businessImpact: {
        metric: "Impacto Preservación Digital",
        result: "78 leyendas deportivas preservadas con un museo virtual 360°",
        efficiency: "Relación retainer continua con nuevas funciones constantes",
        timeline: "Entregado en 8 semanas; en evolución activa desde 2025",
      },
      clientType: "Institución Cultural",
      industry: "Patrimonio Cultural",
    },
    {
      id: "video-produccion",
      titulo: "Producción de Video Asistida por IA — Entrevistas del Pabellón",
      descripcion:
        "Línea de producción de video de punta a punta para la serie 'Visitas Distinguidas' del Pabellón. El material crudo de celular se convierte en una película publicada mediante un pipeline documentado asistido por IA: transcripción con Whisper, un dossier de investigación verificado con timestamps, 26 gráficos broadcast diseñados en Claude Design y exportados vía Playwright, y líneas de tiempo de Kdenlive generadas programáticamente con Python. Primera película: entrevista a Rafael 'Rafa' Ocasio, atleta exaltado de 95 años—publicada en YouTube en unos 3 días de trabajo.",
      imagen: "/video-produccion-preview.webp",
      tecnologias: [
        "Whisper",
        "Claude Design",
        "Kdenlive",
        "MLT/melt",
        "Python",
        "Playwright",
        "FFmpeg",
        "YouTube",
      ],
      categoria: "Producción de Video",
      urlSitio: "https://www.youtube.com/watch?v=7mxpxoJmi-g",
      destacado: true,
      anio: 2026,
      businessImpact: {
        metric: "Tiempo de Producción",
        result: "De video crudo de celular a película publicada en ~3 días",
        efficiency:
          "26 gráficos animados colocados programáticamente desde un dossier con timestamps",
        timeline: "Pipeline repetible y documentado para próximas entrevistas",
      },
      clientType: "Institución Cultural",
      industry: "Producción de Medios",
    },
    {
      id: "jibaro-eats",
      titulo: "Jíbaro Eats Fotografía",
      descripcion:
        "Sitio web de portafolio visual para un fotógrafo profesional especializado en gastronomía. Presenta galerías de imágenes de alta calidad, optimización lazy-loading y navegación fluida entre colecciones.",
      imagen: "/jibaroeats-preview.webp",
      tecnologias: [
        "Next.js 13+",
        "TypeScript",
        "Tailwind CSS",
        "CSR",
        "SSR",
        "Cloudinary",
        "Vercel",
      ],
      categoria: "Portafolio",
      urlSitio: "https://jibaro-eats.vercel.app/",
      urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/${process.env.NEXT_PUBLIC_JIBAROEATS_REPO}`,
      destacado: false,
      anio: 2023,
      businessImpact: {
        metric: "Engagement de Clientes",
        result: "Portafolio profesional con 50+ proyectos",
        efficiency: "Galerías de carga rápida con imágenes optimizadas",
        timeline: "Portafolio completo en 3 semanas",
      },
      clientType: "Negocio de Fotografía",
      industry: "Fotografía de Alimentos y Eventos",
    },
    {
      id: "yukayeke-playa",
      titulo: "Yukayeke Playa Bienes Raíces",
      descripcion:
        "Plataforma moderna de bienes raíces que muestra propiedades de lujo frente al mar en Puerto Rico. Incluye listados completos de propiedades, optimización SEO bilingüe y diseño responsivo para experiencia móvil óptima.",
      imagen: "/yukayeke-preview.webp",
      tecnologias: [
        "Next.js 14",
        "TypeScript",
        "Tailwind CSS",
        "i18n",
        "Vercel",
        "SEO",
        "SSR",
        "ImageKit",
        "Cloudinary",
      ],
      categoria: "Desarrollo Web",
      urlSitio: "https://yukayekeplaya.com",
      destacado: true,
      anio: 2024,
      businessImpact: {
        metric: "Tasa de Consultas de Propiedades",
        result: "Vitrina de propiedades frente al mar que genera leads calificados",
        efficiency: "Navegación de propiedades rápida y bilingüe",
        savings: "Reducción costos marketing $2,000/mes",
        timeline: "Entrega alto impacto en 6 semanas",
      },
      clientType: "Negocio Bienes Raíces",
      industry: "Bienes Raíces",
    },
  ],
};
