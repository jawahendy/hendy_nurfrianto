'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import FloatingTorus from '@/components/3D/FloatingTorus';
import FloatingPyramid from '@/components/3D/FloatingPyramid';

export default function ExperienceSection() {
  const [ref, isInView] = useScrollReveal({ threshold: 0.15 });
  const [showAll, setShowAll] = useState(false);

  const experiences = [
    {
      company: 'Radiant (RUI)',
      role: 'Lead Frontend Developer',
      period: '2024 - Present',
      logo: '/image/clients/rui.png',
      description: 'lead frontend development team in 2 project, 2 teams and Creating innovative web solutions with cutting-edge technologies for various enterprise clients',
    },
    {
      company: 'Celerates',
      role: 'Senior Developer',
      period: '2019 - Present',
      logo: '/image/clients/Cele.png',
      description: 'Developing modern web applications and providing consulting services for digital transformation',
    },
    {
      company: 'Astra International',
      role: 'Senior Mobile Developer',
      period: '2022 - 2024',
      logo: '/image/clients/astra-inter.png',
      description: 'Mobile development for enterprise applications serving automotive industry',
    },
    {
      company: 'Trakindo',
      role: 'Mobile Developer',
      period: '2021 - 2022',
      logo: '/image/clients/trakindo.webp',
      description: 'Built mobile and web applications for heavy equipment industry solutions',
    },
    {
      company: 'Pamapersada',
      role: 'Developer',
      period: '2019 - 2021',
      logo: '/image/clients/pama.webp',
      description: 'Developed web applications integrated with AI for heavy equipment operations and monitoring',
    },
    {
      company: 'Gordi Coffee Shop',
      role: 'Frontend Developer',
      period: '2019 - 2019',
      logo: '/image/clients/Gordi.png',
      description: 'Built e-commerce and management platform for coffee shop business operations',
    },
  ];

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center bg-[rgb(var(--background))] overflow-hidden snap-start snap-always"
      aria-label="Experience Section"
    >
      {/* 3D Floating Elements */}
      <m.div
        initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingTorus className="top-12 sm:top-20 right-2 sm:right-16 scale-[0.35] sm:scale-[0.6] lg:scale-100 opacity-25 sm:opacity-50 lg:opacity-100" />
      </m.div>
      <m.div
        initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingPyramid className="bottom-20 sm:bottom-40 left-2 sm:left-12 scale-[0.35] sm:scale-[0.6] lg:scale-100 opacity-25 sm:opacity-50 lg:opacity-100" />
      </m.div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 relative z-10 w-full">
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-[rgb(var(--foreground))] mb-3 sm:mb-4 px-4">
            Experience
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto px-4">
            Partnering with leading companies to build exceptional digital products
          </p>
        </m.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* 3D Timeline Line */}
          <div
            className="absolute left-10 top-0 bottom-0 w-[3px] animate-gradient-shift hidden md:block"
            style={{
              background: 'linear-gradient(180deg, rgb(var(--primary)), rgba(var(--primary), 0.3))',
              backgroundSize: '100% 200%',
              boxShadow: '0 0 20px rgba(var(--primary), 0.3)',
            }}
          />

          {/* Experience Cards */}
          <div className="space-y-12">
            {(showAll ? experiences : experiences.slice(0, 3)).map((exp, index) => (
              <m.div
                key={exp.company}
                initial={{ opacity: 0, x: -60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-10 top-8 -translate-x-1/2 hidden md:block">
                  <div className="relative">
                    <div className="w-5 h-5 bg-[rgb(var(--primary))] rounded-full border-4 border-[rgb(var(--background))] shadow-[0_0_20px_rgba(var(--primary),0.6)] z-10 relative" />
                    <div className="absolute inset-[-8px] border-2 border-[rgb(var(--primary))] rounded-full opacity-0 animate-pulse-glow" />
                  </div>
                </div>

                {/* Card */}
                <div className="md:ml-24 group">
                  <div className="bg-[rgb(var(--surface))] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[rgba(var(--border-light),0.06)] shadow-apple-sm hover:shadow-apple-lg transition-all duration-500 ease-apple hover:-translate-y-2 preserve-3d">
                    <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-6 items-center">
                      {/* Company Logo */}
                      <div className="w-32 h-32 sm:w-28 sm:h-28 relative mx-auto sm:mx-0">
                        <div className="w-full h-full rounded-2xl overflow-hidden bg-[rgba(var(--primary),0.04)] p-4 sm:p-3 transition-all duration-300">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            fill
                            sizes="200px"
                            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[rgb(var(--foreground))] mb-1 group-hover:text-[rgb(var(--primary))] transition-colors duration-300">
                          {exp.company}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-[rgb(var(--text-secondary))] mb-2">{exp.role}</p>
                        <div className="flex items-center gap-2 text-sm text-[rgb(var(--text-tertiary))] mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </div>

          {/* View More/Less Button */}
          {experiences.length > 3 && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex justify-center mt-12 md:ml-24"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] rounded-2xl font-medium text-base hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 ease-apple hover:scale-105 shadow-apple-sm hover:shadow-apple-md"
              >
                {showAll ? (
                  <>
                    View Less
                    <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </>
                ) : (
                  <>
                    View More
                    <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
                  </>
                )}
              </button>
            </m.div>
          )}
        </div>
      </div>
    </section>
  );
}
