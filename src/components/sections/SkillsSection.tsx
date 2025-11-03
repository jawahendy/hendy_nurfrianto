'use client';

import { m } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState, useRef, MouseEvent } from 'react';
import { Code, Smartphone, Server, Cloud, Database, Wrench } from 'lucide-react';
import FloatingDiamond from '@/components/3D/FloatingDiamond';
import FloatingCube from '@/components/3D/FloatingCube';

export default function SkillsSection() {
  const [ref, isInView] = useScrollReveal({ threshold: 0.1 });

  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend',
      color: 'rgb(var(--primary))',
      skills: ['React JS', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux', 'HTML/CSS', 'etc.'],
      delay: 0,
    },
    {
      icon: Smartphone,
      title: 'Mobile',
      color: '#10B981',
      skills: ['React Native', 'Flutter', 'Swift', 'SwiftUI', 'Dart', 'iOS/Android'],
      delay: 0.15,
    },
    {
      icon: Server,
      title: 'Backend',
      color: '#F59E0B',
      skills: ['Node.js', 'GraphQL', 'REST API', 'Express.js', 'Golang', 'knex.js', 'etc.'],
      delay: 0.3,
    },
    {
      icon: Database,
      title: 'Database',
      color: '#8B5CF6',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase'],
      delay: 0.45,
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      color: '#EC4899',
      skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Git', 'CI/CD', 'Alibaba Cloud', 'Hetzner', 'Vercel'],
      delay: 0.6,
    },
    {
      icon: Wrench,
      title: 'Tools',
      color: '#06B6D4',
      skills: ['Jira', 'Postman', 'Figma', 'npm', 'Grafana', 'Dynatrace'],
      delay: 0.75,
    },
  ];

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center bg-[rgb(var(--surface))] border-t border-[rgba(var(--border-light),0.06)] overflow-hidden snap-start snap-always"
      aria-label="Skills Section"
    >
      {/* 3D Floating Grid Pattern */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 0.02, scale: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(var(--primary), 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(800px) rotateX(45deg) scale(1.5)',
          transformOrigin: 'center',
        }}
      />

      {/* 3D Floating Elements */}
      <m.div
        initial={{ opacity: 0, scale: 0.5, rotateZ: 45 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingDiamond className="top-16 sm:top-32 right-4 sm:right-20 scale-[0.35] sm:scale-[0.6] lg:scale-100 opacity-25 sm:opacity-50 lg:opacity-100" />
      </m.div>
      <m.div
        initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingCube className="bottom-16 sm:bottom-32 left-4 sm:left-16 scale-[0.35] sm:scale-[0.6] lg:scale-100 opacity-25 sm:opacity-50 lg:opacity-100" />
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
            Expertise
          </h2>
          <p className="text-lg sm:text-xl text-[rgb(var(--text-secondary))] max-w-2xl mx-auto px-4">
            Comprehensive technical skills across the full development stack
          </p>
        </m.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} isInView={isInView} />
          ))}
        </div>

        {/* View More Button */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center mt-16"
        >
          <m.a
            href="/skill"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] rounded-2xl font-medium text-lg hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 ease-apple hover:scale-105"
          >
            View All Skills
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </m.a>
        </m.div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  category: {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    title: string;
    color: string;
    skills: string[];
    delay: number;
  };
  index: number;
  isInView: boolean;
}

function SkillCard({ category, index, isInView }: SkillCardProps) {
  const Icon = category.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -15;
    const rotateYValue = (mouseX / (rect.width / 2)) * 15;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, rotateX: 0 }
          : { opacity: 0, scale: 0.8, rotateX: 45 }
      }
      transition={{
        duration: 0.8,
        delay: category.delay,
        ease: [0.34, 1.56, 0.64, 1], // Bounce
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="preserve-3d perspective-1000"
      style={{
        animationDelay: `${index * 0.5}s`,
      }}
    >
      <div
        className="relative glass border border-[rgba(var(--border-light),0.06)] rounded-3xl p-8 h-[380px] preserve-3d transition-all duration-300 ease-out hover:shadow-apple-xl group flex flex-col"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))`,
        }}
      >
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b-2" style={{ borderColor: category.color }}>
          <div
            className="p-3 rounded-2xl"
            style={{
              background: `${category.color}15`,
              transform: 'translateZ(20px)',
            }}
          >
            <Icon className="w-6 h-6" style={{ color: category.color }} />
          </div>
          <h3 className="text-2xl font-semibold text-[rgb(var(--foreground))]" style={{ transform: 'translateZ(15px)' }}>
            {category.title}
          </h3>
        </div>

        {/* Skills List */}
        <div className="space-y-3 flex-1 overflow-hidden">
          {category.skills.slice(0, 5).map((skill, idx) => (
            <m.div
              key={skill}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: category.delay + 0.1 + idx * 0.05,
              }}
              className="text-sm sm:text-base text-[rgb(var(--text-secondary))] px-3 sm:px-4 py-2 rounded-xl bg-[rgba(var(--primary),0.02)] hover:bg-[rgba(var(--primary),0.08)] hover:text-[rgb(var(--primary))] hover:translate-x-1 transition-all duration-300 cursor-default break-words"
              style={{
                transform: `translateZ(${(idx + 1) * 5}px)`,
              }}
            >
              {skill}
            </m.div>
          ))}
          {category.skills.length > 5 && (
            <div className="text-sm text-[rgb(var(--text-tertiary))] text-center pt-2">
              +{category.skills.length - 5} more
            </div>
          )}
        </div>

        {/* Floating animation */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${category.color}10, transparent 70%)`,
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
        />
      </div>
    </m.div>
  );
}
