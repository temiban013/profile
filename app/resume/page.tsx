// app/resume/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import StructuredData from "@/components/structured-data";

export default function ResumePage() {
  // Structured data specifically for the resume page
  const resumeSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.mariorafaelayala.com#person",
    name: "Mario Rafael Ayala",
    jobTitle: "Senior Software Engineer",
    description: "Senior Software Engineer with 25+ years of enterprise experience at Disney Parks and Office Depot",
    url: "https://www.mariorafaelayala.com",
    email: "marioayaladev@gmail.com",
    telephone: "+1-407-476-7353",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Puerto Rico",
      addressCountry: "US"
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Senior Software Engineer",
      skills: [
        "Next.js", "TypeScript", "React", "JavaScript", "Node.js",
        ".NET Core", "C#", "SQL Server", "Enterprise Architecture",
        "Digital Transformation", "Systems Integration"
      ],
      experienceRequirements: "25+ years"
    },
    workLocation: "Remote",
    seeks: {
      "@type": "Demand",
      name: "Senior Software Engineer Position",
      description: "Seeking senior software engineering roles, technical leadership positions, or consulting opportunities"
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Master of Science in Computer Science",
        credentialCategory: "degree",
        recognizedBy: {
          "@type": "Organization",
          name: "Ellis University"
        }
      }
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "Disney Parks"
      },
      {
        "@type": "Organization",
        name: "Office Depot"
      }
    ]
  };

  const downloadResume = (language: 'en' | 'es') => {
    const filename = language === 'en' ? 'Mario-R-Ayala-Resume-EN.pdf' : 'Mario-R-Ayala-Resume-ES.pdf';
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <StructuredData data={resumeSchema} />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-gradient">Mario Rafael Ayala</span>
              <br />
              <span className="text-2xl sm:text-3xl text-muted-foreground font-normal">
                Senior Software Engineer Resume
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              25+ years of enterprise software development experience at Disney Parks and Office Depot.
              Expert in Next.js, TypeScript, React, and enterprise architecture.
            </p>
          </div>

          {/* Quick Contact Info */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-12 professional-shadow">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">marioayaladev@gmail.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-sm">+1 (407) 476-7353</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">Puerto Rico (Remote Available)</span>
              </div>
            </div>
          </div>

          {/* Resume Downloads */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* English Resume */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/20 transition-all duration-300 professional-shadow hover:professional-shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">English Resume</h2>
              <p className="text-muted-foreground text-center mb-6">
                Comprehensive resume in English showcasing 25+ years of enterprise software development experience.
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => downloadResume('en')}
                  className="w-full rounded-full professional-shadow hover:professional-shadow-lg"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download English Resume (PDF)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('/Mario-R-Ayala-Resume-EN.pdf', '_blank')}
                  className="w-full rounded-full"
                  size="lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Online
                </Button>
              </div>
            </div>

            {/* Spanish Resume */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/20 transition-all duration-300 professional-shadow hover:professional-shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">Currículum en Español</h2>
              <p className="text-muted-foreground text-center mb-6">
                Currículum completo en español con 25+ años de experiencia en desarrollo de software empresarial.
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => downloadResume('es')}
                  className="w-full rounded-full professional-shadow hover:professional-shadow-lg"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar Currículum (PDF)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('/Mario-R-Ayala-Resume-ES.pdf', '_blank')}
                  className="w-full rounded-full"
                  size="lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Ver en Línea
                </Button>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-12 professional-shadow">
            <h2 className="text-3xl font-bold text-center mb-8 text-gradient">Professional Highlights</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Disney</div>
                <div className="text-sm text-muted-foreground">Parks Alumni</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">MS</div>
                <div className="text-sm text-muted-foreground">Computer Science</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Remote</div>
                <div className="text-sm text-muted-foreground">Work Available</div>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-12 professional-shadow">
            <h2 className="text-3xl font-bold text-center mb-8 text-gradient">Core Technologies</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Next.js", "TypeScript", "React", "JavaScript", "Node.js",
                ".NET Core", "C#", "SQL Server", "Enterprise Architecture",
                "Digital Transformation", "Systems Integration", "Cloud Computing",
                "Database Design", "Performance Optimization", "Team Leadership"
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 professional-shadow">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Ready to Hire?</h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experienced Senior Software Engineer available for immediate start.
              Remote work preferred, consulting opportunities welcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = '/#contact'}
                size="lg"
                className="rounded-full professional-shadow hover:professional-shadow-lg"
              >
                Contact Me
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                size="lg"
                className="rounded-full"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}