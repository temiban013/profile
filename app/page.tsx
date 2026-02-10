// app/page.tsx
import About from "@/components/about";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import { StructuredData } from "@/components/seo/structured-data";

export default function Home() {
  // Check if testimonials should be shown
  const showTestimonials = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === 'true';
  // Comprehensive PersonSchema for maximum employer discovery
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.mariorafaelayala.com#person",
    name: "Mario Rafael Ayala",
    alternateName: "Mario R. Ayala",
    description: "Full-Stack AI Engineer with 20+ years enterprise experience. Architected multi-agent orchestration system with Claude Code managing 7 concurrent projects. Expert in AI agent development, Next.js, TypeScript, .NET Core with teaching experience across diverse learners. US Navy veteran.",
    jobTitle: "Independent Technology Consultant",
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
      experienceRequirements: "20+ years",
      qualifications: "Master's Computer Science - Magna Cum Laude"
    },
    url: "https://www.mariorafaelayala.com",
    image: "https://www.mariorafaelayala.com/mra-profile.jpg",
    telephone: "+1-407-476-7353",
    email: "marioayaladev@gmail.com",
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
      "@id": "https://www.mariorafaelayala.com#organization",
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
      "https://www.mariorafaelayala.com"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.mariorafaelayala.com#organization",
    name: "Nitaíno Digital",
    alternateName: "Nitaino Digital",
    url: "https://www.mariorafaelayala.com",
    logo: "https://www.mariorafaelayala.com/mra-logo-sq.png",
    founder: {
      "@id": "https://www.mariorafaelayala.com#person"
    },
    foundingDate: "2026-01",
    description: "Full-Stack AI Engineering & Agent Development. Enterprise software consulting, digital transformation, and AI-powered solutions.",
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
      telephone: "+1-407-476-7353",
      email: "marioayaladev@gmail.com",
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"]
    },
    sameAs: [
      "https://github.com/temiban013",
      "https://www.linkedin.com/in/marioayalamscs/",
      "https://youtube.com/@mariorafaelayala8703"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mario Rafael Ayala | Full-Stack AI Engineer Portfolio",
    url: "https://www.mariorafaelayala.com",
    description: "Professional portfolio of Mario Rafael Ayala, Full-Stack AI Engineer with 20+ years experience specializing in AI agent development, multi-agent orchestration, and full-stack solutions",
    author: {
      "@id": "https://www.mariorafaelayala.com#person"
    },
    inLanguage: ["en", "es"],
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nitaíno Digital — AI Engineering & Software Consulting",
    description: "AI engineering, multi-agent orchestration, and enterprise software consulting services",
    provider: {
      "@id": "https://www.mariorafaelayala.com#person"
    },
    serviceType: [
      "Software Engineering Consulting",
      "Enterprise Architecture",
      "Digital Transformation",
      "Full Stack Development",
      "Technical Leadership"
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
        <About />
        <Experience />
        <Projects />
        {showTestimonials && <Testimonials />}
        <Contact />
      </div>
    </>
  );
}
