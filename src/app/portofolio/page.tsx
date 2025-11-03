'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ourPortofolio } from '@/constants/data/Service';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import FloatingSphere from '@/components/3D/FloatingSphere';
import FloatingCube from '@/components/3D/FloatingCube';
import FloatingTorus from '@/components/3D/FloatingTorus';
import FloatingPyramid from '@/components/3D/FloatingPyramid';
import FloatingDiamond from '@/components/3D/FloatingDiamond';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function PortfolioPage() {
  const router = useRouter();
  const [ref, isInView] = useScrollReveal({ threshold: 0.1 });

  const allProjects = ourPortofolio.list[0].slides;

  return (
    <main className="min-h-screen bg-[rgb(var(--background))]">
      {/* 3D Background Grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 113, 227, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 113, 227, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'top',
        }}
      />

      {/* 3D Floating Elements */}
      <div className="fixed inset-0 pointer-events-none -z-5 hidden sm:block">
        <FloatingSphere className="absolute left-[-100px] top-[10%] scale-75 opacity-60" />
        <FloatingCube className="absolute right-[-80px] top-[30%] scale-75 opacity-60" />
        <FloatingTorus className="absolute right-[10%] bottom-[20%] scale-75 opacity-50" />
        <FloatingPyramid className="absolute left-[5%] bottom-[15%] scale-75 opacity-50" />
        <FloatingDiamond className="absolute right-[15%] top-[60%] scale-50 opacity-40" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-12">
        {/* Header with Back Button */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {/* Back Button */}
          <m.button
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[rgb(var(--surface))] border border-[rgba(var(--border-light),0.12)] rounded-xl text-[rgb(var(--foreground))] hover:bg-[rgba(var(--primary),0.06)] hover:border-[rgb(var(--primary))] transition-all duration-300 shadow-apple-sm hover:shadow-apple-md"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Back</span>
          </m.button>

          {/* Title */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight text-[rgb(var(--foreground))]">
              All Projects
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[rgb(var(--text-secondary))] mt-1 sm:mt-2">
              Explore my complete portfolio of work
            </p>
          </div>
        </m.div>

        {/* Projects Grid */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {allProjects.map((project, index) => (
            <ProjectCard key={project.alt} project={project} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Empty State */}
        {allProjects.length === 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-[rgb(var(--text-secondary))]">No projects found in this category.</p>
          </m.div>
        )}

        {/* Footer CTA */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-12 sm:mt-20 text-center"
        >
          <div className="glass rounded-2xl sm:rounded-[32px] p-8 sm:p-12 lg:p-16 border border-[rgba(var(--border-light),0.06)] shadow-apple-lg">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[rgb(var(--foreground))] mb-3 sm:mb-4">
              Interested in working together?
            </h2>
            <p className="text-base sm:text-lg text-[rgb(var(--text-secondary))] mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Get in touch to discuss your project.
            </p>
            <m.button
              onClick={() => router.push('/#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-[rgb(var(--primary))] text-white rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-[0_8px_24px_rgba(var(--primary),0.3)] hover:shadow-[0_16px_48px_rgba(var(--primary),0.4)] transition-all duration-300"
            >
              Get in Touch
            </m.button>
          </div>
        </m.div>
      </div>
    </main>
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
  const handleCardClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <div
        onClick={handleCardClick}
        className={`relative bg-[rgb(var(--surface))] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-apple-md hover:shadow-apple-xl transition-all duration-500 hover:-translate-y-3 active:scale-[0.98] border border-[rgba(var(--border-light),0.06)] h-[420px] sm:h-[480px] flex flex-col ${project.link ? 'cursor-pointer' : ''}`}
      >
        {/* Project Image */}
        <div className="relative w-full h-[220px] sm:h-[280px] flex-shrink-0 overflow-hidden bg-[rgba(var(--primary),0.04)]">
          {/* Hover Gradient Overlay */}
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`transition-transform duration-500 group-hover:scale-110 ${
              project.type === 'mobile' ? 'object-contain p-4' : 'object-cover'
            }`}
          />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Link Button (Shows on Hover/Touch) */}
          {project.link && (
            <m.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-apple-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[rgb(var(--primary))] hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </m.a>
          )}
        </div>

        {/* Project Info */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Project Name */}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[rgb(var(--foreground))] mb-2 sm:mb-3 group-hover:text-[rgb(var(--primary))] transition-colors duration-300 line-clamp-2">
              {project.alt}
            </h3>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-[80px] overflow-hidden">
              {project.tech.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 bg-[rgba(var(--primary),0.06)] border border-[rgba(var(--primary),0.2)] rounded-full text-[10px] sm:text-xs font-medium text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 5 && (
                <span className="px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium text-[rgb(var(--text-tertiary))]">
                  +{project.tech.length - 5}
                </span>
              )}
            </div>
          </div>

          {/* Link Indicator */}
          {project.link && (
            <div className="mt-3 sm:mt-4 pt-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[rgb(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-medium">View Project</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}
