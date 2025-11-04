'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ourPortofolio } from '@/constants/data/Service';
import { ArrowLeft, ExternalLink, Filter, X } from 'lucide-react';
import FloatingSphere from '@/components/3D/FloatingSphere';
import FloatingCube from '@/components/3D/FloatingCube';
import FloatingTorus from '@/components/3D/FloatingTorus';
import FloatingPyramid from '@/components/3D/FloatingPyramid';
import FloatingDiamond from '@/components/3D/FloatingDiamond';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function PortfolioPage() {
  const router = useRouter();
  const [ref, isInView] = useScrollReveal({ threshold: 0.05 });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const allProjects = ourPortofolio.list[0].slides;

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(allProjects.map((p) => p.type)))];
  const categoryLabels: Record<string, string> = {
    All: 'All Projects',
    web: 'Web',
    mobile: 'Mobile',
  };

  // Filter projects
  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.type === selectedCategory);

  return (
    <main className="min-h-screen bg-[rgb(var(--background))] relative overflow-hidden">
      {/* 3D Background Grid */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none -z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 113, 227, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 113, 227, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'top',
        }}
      />

      {/* 3D Floating Elements - Hidden on mobile for performance */}
      <div className="fixed inset-0 pointer-events-none -z-5 hidden md:block">
        <FloatingSphere className="absolute left-[-120px] top-[8%] scale-50 opacity-40" />
        <FloatingCube className="absolute right-[-100px] top-[25%] scale-50 opacity-40" />
        <FloatingTorus className="absolute right-[8%] bottom-[18%] scale-50 opacity-30" />
        <FloatingPyramid className="absolute left-[6%] bottom-[12%] scale-50 opacity-30" />
        <FloatingDiamond className="absolute right-[12%] top-[55%] scale-40 opacity-25" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-[rgba(var(--background),0.85)] backdrop-blur-xl border-b border-[rgba(var(--border-light),0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button & Title */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <m.button
                onClick={() => router.push('/')}
                whileHover={{ scale: 1.05, x: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[rgb(var(--surface))] border border-[rgba(var(--border-light),0.12)] rounded-lg sm:rounded-xl text-[rgb(var(--foreground))] hover:bg-[rgba(var(--primary),0.06)] hover:border-[rgb(var(--primary))] transition-all duration-300 shadow-apple-sm hover:shadow-apple-md"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-xs sm:text-sm hidden xs:inline">Back</span>
              </m.button>

              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-[rgb(var(--foreground))] truncate">
                  Portfolio
                </h1>
                <p className="text-[10px] sm:text-xs lg:text-sm text-[rgb(var(--text-secondary))] hidden sm:block">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                </p>
              </div>
            </div>

            {/* Desktop Filter */}
            <div className="hidden lg:flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[rgb(var(--primary))] text-white shadow-lg'
                      : 'bg-[rgba(var(--primary),0.06)] text-[rgb(var(--primary))] hover:bg-[rgba(var(--primary),0.12)]'
                  }`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[rgb(var(--surface))] border border-[rgba(var(--border-light),0.12)] rounded-lg sm:rounded-xl text-[rgb(var(--foreground))] hover:bg-[rgba(var(--primary),0.06)] hover:border-[rgb(var(--primary))] transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium hidden xs:inline">Filter</span>
            </button>
          </div>

          {/* Mobile Filter Dropdown */}
          {showMobileFilter && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 p-4 bg-[rgb(var(--surface))] rounded-xl border border-[rgba(var(--border-light),0.12)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[rgb(var(--foreground))]">Filter by Type</span>
                <button onClick={() => setShowMobileFilter(false)} className="text-[rgb(var(--text-secondary))]">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowMobileFilter(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-[rgb(var(--primary))] text-white'
                        : 'bg-[rgba(var(--primary),0.06)] text-[rgb(var(--primary))] hover:bg-[rgba(var(--primary),0.12)]'
                    }`}
                  >
                    {categoryLabels[cat] || cat}
                  </button>
                ))}
              </div>
            </m.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[rgb(var(--foreground))] mb-3 sm:mb-4">
            My Work
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
            A collection of projects showcasing my skills in web and mobile development
          </p>
        </m.div>

        {/* Projects Grid - Mobile First */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.alt} project={project} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-xl sm:text-2xl text-[rgb(var(--text-secondary))]">
              No projects found in this category.
            </p>
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
          className="mt-16 sm:mt-20 lg:mt-24 text-center"
        >
          <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-[rgba(var(--border-light),0.06)] shadow-apple-lg">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[rgb(var(--foreground))] mb-3 sm:mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-[rgb(var(--text-secondary))] mb-6 sm:mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s create something amazing together.
            </p>
            <m.button
              onClick={() => router.push('/#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-[rgb(var(--primary))] text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg shadow-[0_8px_24px_rgba(var(--primary),0.3)] hover:shadow-[0_16px_48px_rgba(var(--primary),0.4)] transition-all duration-300"
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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group h-full"
    >
      <div
        onClick={handleCardClick}
        className={`relative bg-[rgb(var(--surface))] rounded-2xl sm:rounded-3xl overflow-hidden shadow-apple-md hover:shadow-apple-xl transition-all duration-500 hover:-translate-y-2 active:scale-[0.98] border border-[rgba(var(--border-light),0.06)] h-full flex flex-col ${
          project.link ? 'cursor-pointer' : ''
        }`}
      >
        {/* Project Image */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] flex-shrink-0 overflow-hidden bg-[rgba(var(--primary),0.04)]">
          {/* Hover Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-400 -z-10"
            style={{
              background: 'linear-gradient(135deg, rgb(var(--primary)), #764ba2)',
            }}
          />

          {/* Image */}
          <Image
            src={project.src}
            alt={project.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`transition-transform duration-500 group-hover:scale-110 ${
              project.type === 'mobile' ? 'object-contain p-4' : 'object-cover'
            }`}
            priority={index < 6}
          />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Link Button (Shows on Hover/Touch) */}
          {project.link && (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-apple-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[rgb(var(--primary))] hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </m.div>
          )}

          {/* Type Badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-black/80 backdrop-blur-sm rounded-lg">
            <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wide">
              {project.type}
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Project Name */}
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[rgb(var(--foreground))] mb-2 sm:mb-3 group-hover:text-[rgb(var(--primary))] transition-colors duration-300 line-clamp-2">
              {project.alt}
            </h3>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 sm:px-2.5 sm:py-1 bg-[rgba(var(--primary),0.06)] border border-[rgba(var(--primary),0.15)] rounded-md text-[10px] sm:text-xs font-medium text-[rgb(var(--primary))] hover:bg-[rgba(var(--primary),0.12)] transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2 py-1 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-[rgb(var(--text-tertiary))]">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Link Indicator */}
          {project.link && (
            <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[rgba(var(--border-light),0.1)] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs sm:text-sm font-medium text-[rgb(var(--primary))]">View Project</span>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-[rgb(var(--primary))] group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}
