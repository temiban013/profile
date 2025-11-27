import type { ServicesContent } from "../types";

export const servicesContentES: ServicesContent = {
  hero: {
    headline: "Tu Negocio Merece Más Que Solo una Página de Facebook",
    subheadline:
      "7.5 millones de turistas visitaron Puerto Rico en 2024. El 91% usó Google para encontrar dónde comer. ¿Pueden encontrar tu negocio?",
    cta: "Descubre Cómo Te Encuentran Los Turistas",
  },
  problem: {
    title: "El Problema con Depender Solo de Facebook",
    painPoints: [
      {
        title: "Los Turistas No Te Ven",
        description:
          "Los visitantes buscan en Google, no en Facebook. 62% encuentran restaurantes por búsqueda web.",
        icon: "eye-off",
      },
      {
        title: "Facebook Controla Tu Alcance",
        description:
          "Los cambios de algoritmo pueden hacer que tu contenido desaparezca de la noche a la mañana.",
        icon: "lock",
      },
      {
        title: "No Eres Dueño de Tu Presencia",
        description:
          "Si Facebook cierra tu página, pierdes todo. Tu sitio web es tuyo para siempre.",
        icon: "home-question",
      },
    ],
    stat: {
      value: "$4.6 mil millones",
      label: "gastados en comida y bebida en PR en 2024",
    },
  },
  solution: {
    title: "Una Presencia Web Que Trabaja Para Ti 24/7",
  },
  services: {
    title: "Soluciones Web Para Negocios Puertorriqueños",
    offerings: [
      {
        id: "professional-website",
        name: "Sitio Web Profesional",
        description:
          "Diseño personalizado que refleja tu marca. Mobile-responsive con SEO básico incluido.",
        price: 2500,
        features: [
          "Diseño personalizado",
          "Mobile-responsive",
          "SEO básico incluido",
          "Asistencia con hosting",
        ],
        icon: "globe",
      },
      {
        id: "ecommerce",
        name: "Tienda E-Commerce",
        description:
          "Vende en línea 24/7 con procesamiento de pagos y gestión de inventario.",
        price: 4500,
        features: [
          "Vende 24/7 en línea",
          "Procesamiento de pagos (ATH Móvil, tarjetas)",
          "Gestión de inventario",
          "Integraciones de envío",
        ],
        icon: "shopping-cart",
      },
      {
        id: "digital-menu",
        name: "Menú Digital & QR",
        description:
          "Menús digitales hermosos con actualizaciones fáciles y soporte multilingüe.",
        price: 800,
        features: [
          "Menús digitales hermosos",
          "Actualizaciones fáciles",
          "Soporte multilingüe",
          "Analíticas de artículos populares",
        ],
        icon: "qr-code",
      },
      {
        id: "google-business",
        name: "Google Business Optimization",
        description:
          "Reclama y optimiza tu listado con gestión de fotos y estrategia de reseñas.",
        price: 500,
        features: [
          "Reclamar y optimizar listado",
          "Optimización de fotos",
          "Estrategia de gestión de reseñas",
          "Configuración de SEO local",
        ],
        icon: "map-pin",
      },
    ],
  },
  comparison: {
    title: "Por Qué Trabajar Directamente con un Desarrollador",
  },
  pricing: {
    title: "Planes Diseñados para Negocios Locales",
    tiers: [
      {
        id: "basic",
        name: "Básico",
        price: 2500,
        features: ["5 páginas", "Diseño responsivo", "SEO básico", "1 mes de soporte"],
        included: [
          "Formulario de contacto",
          "Google Maps integrado",
          "Mobile-responsive",
        ],
      },
      {
        id: "professional",
        name: "Profesional",
        price: 5000,
        popular: true,
        features: [
          "10 páginas",
          "Todo en Básico +",
          "Menú digital interactivo",
          "3 meses de soporte",
        ],
        included: [
          "Galería de fotos optimizada",
          "Google Business setup",
          "Integración redes sociales",
          "Capacitación incluida",
        ],
      },
      {
        id: "ecommerce",
        name: "E-Commerce",
        price: 8000,
        features: [
          "Todo en Profesional +",
          "Tienda en línea completa",
          "Hasta 50 productos",
          "6 meses de soporte",
        ],
        included: [
          "Pagos ATH Móvil & tarjetas",
          "Gestión de inventario",
          "Envíos integrados",
        ],
      },
    ],
    financing: "Ofrecemos planes de pago flexibles para negocios locales",
  },
  testimonials: {
    title: "Lo Que Dicen Mis Clientes",
    items: [
      {
        id: "papamin",
        name: "Papamín Coffee",
        business: "Cafetería Artesanal",
        quote:
          "Mario nos ayudó a llevar nuestro café más allá de Puerto Rico. Su experiencia en e-commerce fue invaluable.",
        result: "Ventas en línea activas en 3 territorios",
      },
    ],
  },
  faq: {
    title: "Preguntas Frecuentes",
    items: [
      {
        id: "why-website",
        question: "¿Por qué necesito un sitio web si ya tengo Facebook?",
        answer:
          "Facebook solo alcanza a locales que ya te siguen. Los turistas (7.5M+ al año) buscan en Google, no en Facebook. El 91% usa Google para encontrar restaurantes. Sin sitio web, pierdes miles de clientes potenciales.",
      },
      {
        id: "timeline",
        question: "¿Cuánto tiempo tarda en construirse un sitio web?",
        answer:
          "Típicamente 4 semanas desde consulta hasta lanzamiento. Semana 1: Estrategia. Semana 2: Diseño. Semana 3: Desarrollo. Semana 4: Lanzamiento y capacitación.",
      },
      {
        id: "updates",
        question: "¿Puedo actualizar el contenido yo mismo?",
        answer:
          "Sí. Te entrego un sitio fácil de actualizar y te capacito personalmente. Para menús digitales, los cambios son tan simples como editar un documento.",
      },
      {
        id: "maintenance",
        question: "¿Qué incluye el mantenimiento?",
        answer:
          "Actualizaciones de seguridad, copias de seguridad, monitoreo de tiempo de actividad, y soporte técnico. Los planes básicos incluyen 1 mes, Profesional 3 meses, E-Commerce 6 meses.",
      },
      {
        id: "mobile",
        question: "¿Funciona en celulares?",
        answer:
          "Absolutamente. El 85% de los turistas buscan en móvil. Todos mis sitios son mobile-first y se ven perfectos en cualquier dispositivo.",
      },
      {
        id: "google",
        question: "¿Aparecerá mi negocio en Google?",
        answer:
          "Sí. Incluyo SEO básico en todos los planes. Para máxima visibilidad, recomiendo el servicio de Google Business Optimization ($500).",
      },
      {
        id: "english",
        question: "¿Ofrecen servicio en inglés?",
        answer:
          "Sí, soy completamente bilingüe. Puedo crear tu sitio en español, inglés, o ambos idiomas.",
      },
      {
        id: "changes",
        question: "¿Qué pasa si necesito cambios después?",
        answer:
          "Estoy disponible para cambios y mejoras. Los clientes reciben tarifas preferenciales para trabajo adicional después del lanzamiento.",
      },
    ],
  },
  cta: {
    headline: "¿Listo para que los turistas te encuentren?",
    subtext: "Agenda una consulta gratuita de 30 minutos. Sin compromiso.",
    button: "Agendar Mi Consulta Gratis",
    alternative: "O escríbeme directamente: marioayaladev@gmail.com",
  },
};

export const servicesContentEN: ServicesContent = {
  hero: {
    headline: "Your Business Deserves More Than Just a Facebook Page",
    subheadline:
      "7.5 million tourists visited Puerto Rico in 2024. 91% used Google to find where to eat. Can they find your business?",
    cta: "Discover How Tourists Find You",
  },
  problem: {
    title: "The Problem with Relying Only on Facebook",
    painPoints: [
      {
        title: "Tourists Can't See You",
        description:
          "Visitors search on Google, not Facebook. 62% find restaurants through web search.",
        icon: "eye-off",
      },
      {
        title: "Facebook Controls Your Reach",
        description:
          "Algorithm changes can make your content disappear overnight.",
        icon: "lock",
      },
      {
        title: "You Don't Own Your Presence",
        description:
          "If Facebook closes your page, you lose everything. Your website is yours forever.",
        icon: "home-question",
      },
    ],
    stat: {
      value: "$4.6 billion",
      label: "spent on food & beverage in PR in 2024",
    },
  },
  solution: {
    title: "A Web Presence That Works For You 24/7",
  },
  services: {
    title: "Web Solutions For Puerto Rico Businesses",
    offerings: [
      {
        id: "professional-website",
        name: "Professional Website",
        description:
          "Custom design matching your brand. Mobile-responsive with basic SEO included.",
        price: 2500,
        features: [
          "Custom design",
          "Mobile-responsive",
          "Basic SEO included",
          "Hosting setup assistance",
        ],
        icon: "globe",
      },
      {
        id: "ecommerce",
        name: "E-Commerce Store",
        description:
          "Sell online 24/7 with payment processing and inventory management.",
        price: 4500,
        features: [
          "Sell 24/7 online",
          "Payment processing (ATH Móvil, cards)",
          "Inventory management",
          "Shipping integrations",
        ],
        icon: "shopping-cart",
      },
      {
        id: "digital-menu",
        name: "Digital Menu & QR",
        description:
          "Beautiful digital menus with easy updates and multi-language support.",
        price: 800,
        features: [
          "Beautiful digital menus",
          "Easy updates",
          "Multi-language support",
          "Analytics on popular items",
        ],
        icon: "qr-code",
      },
      {
        id: "google-business",
        name: "Google Business Optimization",
        description:
          "Claim and optimize your listing with photo optimization and review strategy.",
        price: 500,
        features: [
          "Claim & optimize listing",
          "Photo optimization",
          "Review management strategy",
          "Local SEO setup",
        ],
        icon: "map-pin",
      },
    ],
  },
  comparison: {
    title: "Why Work Directly with a Developer",
  },
  pricing: {
    title: "Plans Designed for Local Businesses",
    tiers: [
      {
        id: "basic",
        name: "Basic",
        price: 2500,
        features: ["5 pages", "Responsive design", "Basic SEO", "1 month support"],
        included: [
          "Contact form",
          "Google Maps integrated",
          "Mobile-responsive",
        ],
      },
      {
        id: "professional",
        name: "Professional",
        price: 5000,
        popular: true,
        features: [
          "10 pages",
          "Everything in Basic +",
          "Interactive digital menu",
          "3 months support",
        ],
        included: [
          "Optimized photo gallery",
          "Google Business setup",
          "Social media integration",
          "Training included",
        ],
      },
      {
        id: "ecommerce",
        name: "E-Commerce",
        price: 8000,
        features: [
          "Everything in Professional +",
          "Complete online store",
          "Up to 50 products",
          "6 months support",
        ],
        included: [
          "ATH Móvil & card payments",
          "Inventory management",
          "Integrated shipping",
        ],
      },
    ],
    financing: "We offer flexible payment plans for local businesses",
  },
  testimonials: {
    title: "What My Clients Say",
    items: [
      {
        id: "papamin",
        name: "Papamín Coffee",
        business: "Artisanal Coffee Shop",
        quote:
          "Mario helped us take our coffee beyond Puerto Rico. His e-commerce expertise was invaluable.",
        result: "Active online sales in 3 territories",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        id: "why-website",
        question: "Why do I need a website if I already have Facebook?",
        answer:
          "Facebook only reaches locals who already follow you. Tourists (7.5M+ per year) search on Google, not Facebook. 91% use Google to find restaurants. Without a website, you're missing thousands of potential customers.",
      },
      {
        id: "timeline",
        question: "How long does it take to build a website?",
        answer:
          "Typically 4 weeks from consultation to launch. Week 1: Strategy. Week 2: Design. Week 3: Development. Week 4: Launch and training.",
      },
      {
        id: "updates",
        question: "Can I update the content myself?",
        answer:
          "Yes. I deliver an easy-to-update site and train you personally. For digital menus, changes are as simple as editing a document.",
      },
      {
        id: "maintenance",
        question: "What does maintenance include?",
        answer:
          "Security updates, backups, uptime monitoring, and technical support. Basic plans include 1 month, Professional 3 months, E-Commerce 6 months.",
      },
      {
        id: "mobile",
        question: "Does it work on mobile?",
        answer:
          "Absolutely. 85% of tourists search on mobile. All my sites are mobile-first and look perfect on any device.",
      },
      {
        id: "google",
        question: "Will my business appear on Google?",
        answer:
          "Yes. I include basic SEO in all plans. For maximum visibility, I recommend the Google Business Optimization service ($500).",
      },
      {
        id: "english",
        question: "Do you offer service in English?",
        answer:
          "Yes, I'm fully bilingual. I can create your site in Spanish, English, or both languages.",
      },
      {
        id: "changes",
        question: "What if I need changes after launch?",
        answer:
          "I'm available for changes and improvements. Clients receive preferential rates for additional work after launch.",
      },
    ],
  },
  cta: {
    headline: "Ready for tourists to find you?",
    subtext: "Schedule a free 30-minute consultation. No commitment.",
    button: "Schedule My Free Consultation",
    alternative: "Or write to me directly: marioayaladev@gmail.com",
  },
};
