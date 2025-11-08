'use client';

import { m } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import FloatingSphere from '../3D/FloatingSphere';
import FloatingCube from '../3D/FloatingCube';

export default function HeroSection() {
  const scrollToContent = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewWork = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLetsTalk = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[rgb(var(--background))] snap-start snap-always"
      aria-label="Hero Section"
    >
      {/* 3D Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 113, 227, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 113, 227, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'top',
        }}
      />

      {/* 3D Floating Elements */}
      <FloatingSphere className="left-[-100px] sm:left-[-150px] top-[20%] sm:top-[30%] scale-50 sm:scale-75 lg:scale-100 opacity-40 sm:opacity-60 lg:opacity-100" />
      <FloatingCube className="right-[-80px] sm:right-[-100px] bottom-[15%] sm:bottom-[20%] scale-50 sm:scale-75 lg:scale-100 opacity-40 sm:opacity-60 lg:opacity-100" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Animated Content */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1], // Apple easing
          }}
        >
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.05] text-[rgb(var(--foreground))] mb-4 sm:mb-6">
            Hendy Nurfrianto
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-[rgb(var(--text-secondary))] leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12">
            Software Engineer crafting exceptional digital experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Button */}
            <m.button
              onClick={handleViewWork}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-[rgb(var(--primary))] text-white rounded-xl font-medium text-sm sm:text-base shadow-apple-md hover:shadow-apple-lg transition-all duration-300 ease-apple flex items-center gap-2"
              aria-label="View my work"
            >
              View Work
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </m.button>

            {/* Secondary Button */}
            <m.button
              onClick={handleLetsTalk}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-[rgba(var(--border-light),0.12)] text-[rgb(var(--foreground))] rounded-xl font-medium text-sm sm:text-base hover:bg-[rgb(var(--surface))] hover:border-[rgb(var(--primary))] transition-all duration-300 ease-apple flex items-center gap-2"
              aria-label="Get in touch"
            >
              Let&apos;s Talk
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </m.button>
          </div>
        </m.div>
      </div>

      {/* Scroll Indicator */}
      <m.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 1.2,
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] transition-colors cursor-pointer group"
        aria-label="Scroll to content"
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-current rounded-full animate-scroll-bounce" />
        </div>
      </m.button>
    </section>
  );
}
