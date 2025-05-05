// components/experience.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin, BookOpen, Award } from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import {
  allExperiences,
  allEducations,
  allCertifications,
} from "contentlayer/generated";
import { labels } from "@/lib/content";

// Component definitions...

const Experience = () => {
  const { language } = useLanguage();

  // Get content for the current language
  const experiences = allExperiences.filter((exp) => exp.language === language);
  const educations = allEducations.filter((edu) => edu.language === language);
  const certifications = allCertifications.filter(
    (cert) => cert.language === language
  );

  return (
    <section id="experience" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        {/* Experience Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {labels[language].experience}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {labels[language].professionalCareer}
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            {labels[language].careerTimeline}
          </p>
        </div>

        <div className="relative mb-16">
          {experiences.map((item) => (
            <ExperienceItem
              key={item._id}
              title={item.title}
              company={item.company}
              location={item.location}
              period={item.period}
              description={item.description}
              technologies={item.technologies}
            />
          ))}
        </div>

        {/* Education Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {labels[language].education}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {labels[language].academicBackground}
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            {labels[language].academicBackground}
          </p>
        </div>

        <div className="relative mb-16">
          {educations.map((item) => (
            <EducationItem
              key={item._id}
              degree={item.degree}
              institution={item.institution}
              location={item.location}
              period={item.period}
              honors={item.honors || ""}
            />
          ))}
        </div>

        {/* Certifications Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {labels[language].certifications}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {labels[language].recognitions}
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            {labels[language].recognitions}
          </p>
        </div>

        <div className="relative">
          {certifications.map((item) => (
            <CertificationItem
              key={item._id}
              title={item.title}
              organization={item.organization}
              location={item.location}
              period={item.period}
              url={item.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
