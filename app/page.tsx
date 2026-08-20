// app/page.tsx
import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import { StructuredData } from "@/components/seo/structured-data";

// Below-fold sections: code-split, load on demand
const ServicesTeaser = dynamic(() => import("@/components/services-teaser"), {
  loading: () => <SectionSkeleton height="h-64" />,
});
const About = dynamic(() => import("@/components/about"), {
  loading: () => <SectionSkeleton height="h-96" />,
});
const Experience = dynamic(() => import("@/components/experience"), {
  loading: () => <SectionSkeleton height="h-96" />,
});
const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => <SectionSkeleton height="h-64" />,
});
const Testimonials = dynamic(() => import("@/components/testimonials"), {
  loading: () => <SectionSkeleton height="h-48" />,
});
const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <SectionSkeleton height="h-48" />,
});

function SectionSkeleton({ height = "h-64" }: { height?: string }) {
  return <div className={`${height} w-full animate-pulse bg-muted/20 rounded-lg`} />;
}

export default function Home() {
  // Check if testimonials should be shown
  const showTestimonials = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === 'true';
  // Comprehensive PersonSchema for maximum employer discovery
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.nitainodigital.com#person",
    name: "Mario Rafael Ayala",
    alternateName: "Mario R. Ayala",
    description: "Founder of Nitaíno Digital. Full-Stack AI Engineer with 25+ years enterprise experience. Architected multi-agent orchestration system with Claude Code managing 7 concurrent projects. Expert in AI agent development, Next.js, TypeScript, .NET Core with teaching experience across diverse learners. US Navy veteran.",
    jobTitle: "Founder & Full-Stack AI Engineer",
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-Stack AI Engineer",
      occupationLocation: {
        "@type": "Place",
        name: "Puerto Rico"
      },
      skills: [
        "AI Agent Development", "Multi-Agent Orchestration", "Claude Code", "LLM Integration",
        "Next.js", "TypeScript", "React", "JavaScript", "Node.js",
        ".NET Core", "C#", "SQL Server", "PostgreSQL", "Enterprise Architecture",
        "Digital Transformation", "Systems Integration", "Cloud Computing",
        "Full Stack Development", "Agentic AI", "Educational Technology"
      ],
      experienceRequirements: "25+ years",
      qualifications: "Master's Computer Science - Magna Cum Laude"
    },
    url: "https://www.nitainodigital.com",
    image: "https://www.nitainodigital.com/mra-profile.jpg",
    telephone: "+1-787-458-5702",
    email: "mario@nitainodigital.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Puerto Rico",
      addressCountry: "US"
    },
    alumniOf: [
      {
        "@type": "Organization",
        name: "Ellis University",
        description: "MS Computer Science - Magna Cum Laude"
      },
      {
        "@type": "Organization",
        name: "NY Institute of Technology",
        description: "BS Computer Science - Cum Laude"
      }
    ],
    worksFor: {
      "@type": "Organization",
      "@id": "https://www.nitainodigital.com#organization",
      name: "Nitaíno Digital"
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Master of Science in Computer Science",
        credentialCategory: "degree",
        recognizedBy: {
          "@type": "Organization",
          name: "Ellis University"
        },
        educationalLevel: "Graduate"
      }
    ],
    knowsAbout: [
      "AI-Assisted Development", "Multi-Agent Orchestration", "Claude Code",
      "Software Engineering", "Enterprise Architecture", "Next.js Development",
      "TypeScript Programming", "React Development", "JavaScript Programming",
      "Full Stack Development", "Database Architecture", "Cloud Computing",
      "Digital Transformation", "Systems Integration", "Performance Optimization",
      "Educational Technology", "Curriculum Development", "Blockchain Development",
      "Smart Contracts", "Solidity", "Team Leadership", "Software Project Management",
      "Microsoft .NET", "SQL Server", "PostgreSQL", "Node.js", "Web Applications"
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "Disney Parks Engineering Alumni"
      },
      {
        "@type": "Organization",
        name: "Puerto Rico Technology Community"
      }
    ],
    seeks: {
      "@type": "Demand",
      name: "AI Engineering & Technology Consulting",
      description: "Providing AI engineering, multi-agent orchestration, full-stack development, digital transformation services, and educational technology solutions"
    },
    workLocation: "Remote",
    availableLanguage: ["English", "Spanish"],
    sameAs: [
      "https://www.nitainodigital.com",
      "https://github.com/temiban013",
      "https://www.linkedin.com/in/marioayaladev/",
      "https://youtube.com/@mariorafaelayala8703"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.nitainodigital.com#organization",
    name: "Nitaíno Digital",
    alternateName: "Nitaino Digital",
    url: "https://www.nitainodigital.com",
    logo: "https://www.nitainodigital.com/nitaino-logo.png",
    founder: {
      "@id": "https://www.nitainodigital.com#person"
    },
    foundingDate: "2026-01",
    description: "Puerto Rico–based digital studio for AI engineering, web development, video production, and training & education. Enterprise software consulting, digital transformation, e-commerce, AI-powered platforms, AI-assisted video production, and bilingual corporate and community training.",
    knowsAbout: [
      "AI Engineering", "Agentic Software Development", "Web Development",
      "E-Commerce", "SaaS Platforms", "Video Production",
      "Corporate Accessibility Training", "Digital Literacy Training",
      "Digital Transformation", "SEO & Generative Engine Optimization"
    ],
    slogan: "Digital solutions rooted in heritage",
    areaServed: [
      {
        "@type": "Place",
        name: "Puerto Rico"
      },
      {
        "@type": "Place",
        name: "United States"
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-787-458-5702",
      email: "mario@nitainodigital.com",
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"]
    },
    sameAs: [
      "https://github.com/temiban013",
      "https://www.linkedin.com/in/marioayaladev/",
      "https://youtube.com/@mariorafaelayala8703"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nitaíno Digital — Mario Rafael Ayala",
    url: "https://www.nitainodigital.com",
    description: "Nitaíno Digital, a Puerto Rico–based studio for AI engineering, web development, video production, and training—founded by Mario Rafael Ayala, Full-Stack AI Engineer with 25+ years of experience",
    author: {
      "@id": "https://www.nitainodigital.com#organization"
    },
    inLanguage: ["en", "es"],
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nitaíno Digital — AI Engineering, Web, Video & Training",
    description: "AI engineering, web development, video production, and training & education services from Puerto Rico",
    provider: {
      "@id": "https://www.nitainodigital.com#organization"
    },
    serviceType: [
      "AI Engineering",
      "Web Development",
      "E-Commerce Development",
      "Video Production",
      "Training & Education",
      "Digital Transformation"
    ],
    areaServed: {
      "@type": "Place",
      name: "Global (Remote Work Available)"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise Software Development",
            description: "Full-stack enterprise application development using modern technologies"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technical Architecture Consulting",
            description: "System architecture design and technology strategy consultation"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Transformation Services",
            description: "Legacy system modernization and digital transformation projects"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI-Assisted Video Production",
            description: "From raw footage to published film: transcription, researched motion graphics, and programmatic editing"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Training & Education",
            description: "Corporate accessibility training and bilingual community digital-literacy programs"
          }
        }
      ]
    }
  };

  return (
    <>
      <StructuredData data={personSchema} />
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={professionalServiceSchema} />

      <div className="space-y-10 sm:space-y-16">
        <Hero />
        <ServicesTeaser />
        <Projects />
        <About />
        <Experience />
        {showTestimonials && <Testimonials />}
        <Contact />
      </div>
    </>
  );
}
