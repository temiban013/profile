// components/experience.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin, BookOpen, Award } from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import {
  getExperiences,
  getEducations,
  getCertifications,
} from "@/lib/content";
import { labels } from "@/lib/content";

// Component definitions...
interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
}

interface EducationItemProps {
  degree: string;
  institution: string;
  location: string;
  period: string;
  honors: string;
}

interface CertificationItemProps {
  title: string;
  organization: string;
  location: string;
  period: string;
  url?: string;
}

const CertificationItem = ({
  title,
  organization,
  location,
  period,
  url,
}: CertificationItemProps) => {
  return (
    <div className="mb-8 relative">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <Building2 className="w-4 h-4" />
            <span>{organization}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{period}</span>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline mt-2 inline-block"
            >
              View Certificate
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const EducationItem = ({
  degree,
  institution,
  location,
  period,
  honors,
}: EducationItemProps) => {
  return (
    <div className="mb-8 relative">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{degree}</h3>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <BookOpen className="w-4 h-4" />
            <span>{institution}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{period}</span>
          </div>
          {honors && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="w-4 h-4" />
              <span>{honors}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ExperienceItem = ({
  title,
  company,
  location,
  period,
  description,
  technologies,
}: ExperienceItemProps) => {
  return (
    <div className="mb-8 relative">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <Building2 className="w-4 h-4" />
            <span>{company}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{period}</span>
          </div>
          <p className="mt-2">{description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const { language } = useLanguage();

  // Get content for the current language
  const experiences = getExperiences(language);
  const educations = getEducations(language);
  const certifications = getCertifications(language);

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
