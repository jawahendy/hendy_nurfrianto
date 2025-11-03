'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ourPortofolio } from '@/constants/data/Service';
import FloatingSphere from '@/components/3D/FloatingSphere';
import FloatingPyramid from '@/components/3D/FloatingPyramid';

export default function ProjectsSection() {
  const [ref, isInView] = useScrollReveal({ threshold: 0.1 });
  const router = useRouter();

  // Get featured projects (first 3)
  const featuredProjects = ourPortofolio.list[0].slides.slice(0, 3);

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center bg-[rgb(var(--background))] overflow-hidden snap-start snap-always"
      aria-label="Featured Projects Section"
    >
      {/* 3D Floating Elements */}
      <m.div
        initial={{ opacity: 0, scale: 0.5, x: -100 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingSphere className="top-16 sm:top-32 left-4 sm:left-20 scale-[0.35] sm:scale-[0.6] lg:scale-100 opacity-25 sm:opacity-50 lg:opacity-100" />
      </m.div>
      <m.div
        initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingPyramid className="bottom-12 sm:bottom-24 right-4 sm:right-24 scale-[0.35] sm:scale-[0.6] lg:scale-100 opacity-25 sm:opacity-50 lg:opacity-100" />
      </m.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 relative z-10 w-full">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[rgb(var(--foreground))] mb-3 sm:mb-4 px-4">
            Featured Work
          </h2>
          <p className="text-lg sm:text-xl text-[rgb(var(--text-secondary))] max-w-2xl mx-auto px-4">
            Selected projects showcasing innovation and technical excellence
          </p>
        </m.div>

        {/* Projects Grid */}
        <div className="space-y-20">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.alt} project={project} index={index} isInView={isInView} />
          ))}
        </div>

        {/* View All CTA */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center mt-20"
        >
          <button
            onClick={() => router.push('/portofolio')}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] rounded-2xl font-medium text-lg hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 ease-apple hover:scale-105"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </m.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: {
    alt: string;
    src: string;
    tech: string[];
    type: string;
    link?: string;
  };
  index: number;
  isInView: boolean;
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <m.div
      initial={{ opacity: 0, rotateX: 10, y: 60 }}
      animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="preserve-3d perspective-1000"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center bg-[rgb(var(--surface))] rounded-[32px] p-8 lg:p-16 shadow-apple-lg border border-[rgba(var(--border-light),0.06)] hover:shadow-apple-xl hover:-translate-y-3 transition-all duration-500 ease-apple group ${
          isEven ? '' : 'lg:grid-cols-[1fr_1.2fr]'
        }`}
      >
        {/* Project Image */}
        <div
          className={`relative ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-black">
            {/* Background glow */}
            <div
              className="absolute inset-[-8px] rounded-[28px] opacity-0 group-hover:opacity-15 transition-opacity duration-400 -z-10"
              style={{
                background: 'linear-gradient(135deg, rgb(var(--primary)), #764ba2)',
              }}
            />

            {/* Image */}
            <Image
              src={project.src}
              alt={project.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`transition-transform duration-500 group-hover:scale-105 ${
                project.type === 'mobile' ? 'object-contain' : 'object-cover'
              }`}
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </div>
        </div>

        {/* Project Content */}
        <div className={`${isEven ? 'order-2' : 'order-2 lg:order-1'}`} style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-3xl lg:text-4xl font-semibold text-[rgb(var(--foreground))] mb-4 leading-tight">
            {project.alt}
          </h3>

          <p className="text-lg text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
            {getProjectDescription(project.alt)}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-[rgba(var(--primary),0.06)] border border-[rgba(var(--primary),0.2)] rounded-full text-sm font-medium text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Project Button */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--primary))] text-white rounded-xl font-medium hover:shadow-apple-md transition-all duration-300 hover:-translate-y-1"
            >
              View Project
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            </a>
          )}
        </div>
      </div>
    </m.div>
  );
}

// Helper function to get project descriptions
function getProjectDescription(projectName: string): string {
  const descriptions: Record<string, string> = {
    'Lucatris RUI': 'Enterprise platform with AI-powered features for business analytics and data visualization.',
    'Auto2000': 'Mobile application for automotive services with seamless booking and customer management.',
    'Website Celerates': 'Modern corporate website with stunning design and optimal performance.',
  };

  return descriptions[projectName] || 'Innovative digital solution built with modern technologies.';
}
