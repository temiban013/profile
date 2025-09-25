// app/page.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SpeedInsights } from "@vercel/speed-insights/next";
import About from "@/components/about";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import StructuredData from "@/components/structured-data";

export default function Home() {
  // Check if testimonials should be shown
  const showTestimonials = process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS === 'true';
  // Comprehensive PersonSchema for maximum employer discovery
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mario Rafael Ayala",
    alternateName: "Mario R. Ayala",
    description: "Senior Software Engineer with 25+ years of enterprise experience at Disney Parks and Office Depot. Expert in Next.js, TypeScript, React, and enterprise architecture.",
    jobTitle: "Senior Software Engineer",
    hasOccupation: {
      "@type": "Occupation",
      name: "Senior Software Engineer",
      occupationLocation: {
        "@type": "Place",
        name: "Puerto Rico"
      },
      skills: [
        "Next.js", "TypeScript", "React", "JavaScript", "Node.js",
        ".NET Core", "C#", "SQL Server", "Enterprise Architecture",
        "Digital Transformation", "Systems Integration", "Cloud Computing",
        "Full Stack Development", "Database Design", "Performance Optimization"
      ],
      experienceRequirements: "25+ years",
      qualifications: "Master's Computer Science"
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
      name: "Independent Technology Consultant",
      description: "Providing enterprise software engineering and digital transformation consulting services"
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
      "Software Engineering", "Enterprise Architecture", "Next.js Development",
      "TypeScript Programming", "React Development", "JavaScript Programming",
      "Full Stack Development", "Database Architecture", "Cloud Computing",
      "Digital Transformation", "Systems Integration", "Performance Optimization",
      "Team Leadership", "Software Project Management", "Agile Development",
      "Microsoft .NET", "SQL Server", "Node.js", "Web Applications"
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
      name: "Senior Software Engineer Position",
      description: "Seeking senior software engineering roles, technical leadership positions, or consulting opportunities in enterprise software development"
    },
    workLocation: "Remote",
    availableLanguage: ["English", "Spanish"],
    sameAs: [
      "https://www.mariorafaelayala.com"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mario Rafael Ayala | Senior Software Engineer Portfolio",
    url: "https://www.mariorafaelayala.com",
    description: "Professional portfolio of Mario Rafael Ayala, Senior Software Engineer with 25+ years experience at Disney Parks and Office Depot",
    author: {
      "@id": "https://www.mariorafaelayala.com#person"
    },
    inLanguage: ["en", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.mariorafaelayala.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Mario Rafael Ayala - Software Engineering Consulting",
    description: "Enterprise software engineering and digital transformation consulting services",
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
