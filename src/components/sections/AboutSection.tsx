'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, MouseEvent } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calendar, Award, Globe, Star } from 'lucide-react';
import FloatingTorus from '@/components/3D/FloatingTorus';
import FloatingDiamond from '@/components/3D/FloatingDiamond';

export default function AboutSection() {
  const [ref, isInView] = useScrollReveal({ threshold: 0.2 });
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

    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const stats = [
    { icon: Calendar, label: '6+ Years', description: 'Experience' },
    { icon: Award, label: '10+ Projects', description: 'Delivered' },
    { icon: Globe, label: '7+ Companies', description: 'Collaborated' },
    { icon: Star, label: 'Software Engineer', description: 'Expert Level' },
  ];

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-start justify-center bg-[rgb(var(--surface))] border-t border-[rgba(var(--border-light),0.06)] overflow-y-auto snap-start snap-always"
      aria-label="About Section"
    >
      {/* 3D Floating Elements */}
      <m.div
        initial={{ opacity: 0, scale: 0.5, x: 100 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingTorus className="top-12 sm:top-24 right-4 sm:right-16 scale-[0.4] sm:scale-[0.6] lg:scale-100 opacity-30 sm:opacity-50 lg:opacity-100" />
      </m.div>
      <m.div
        initial={{ opacity: 0, scale: 0.5, rotateZ: -45 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingDiamond className="bottom-16 sm:bottom-32 left-4 sm:left-20 scale-[0.4] sm:scale-[0.6] lg:scale-100 opacity-30 sm:opacity-50 lg:opacity-100" />
      </m.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 relative z-10 w-full">
        {/* 3D Tilt Card */}
        <m.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="perspective-2000"
        >
          <div
            className="relative grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 sm:gap-8 lg:gap-12 bg-[rgb(var(--surface))] rounded-2xl sm:rounded-[32px] p-6 sm:p-8 lg:p-12 shadow-apple-lg border border-[rgba(var(--border-light),0.06)] preserve-3d transition-transform duration-300 ease-out"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            }}
          >
            {/* Profile Image */}
            <m.div
              className="relative"
              style={{
                transform: `translateZ(40px)`,
              }}
            >
              <div className="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-apple-xl">
                <Image
                  src="/image/PP.jpg"
                  alt="Hendy Nurfrianto - Frontend Developer"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  style={{ filter: 'grayscale(20%)' }}
                  priority
                />
              </div>
            </m.div>

            {/* Content */}
            <m.div
              className="flex flex-col justify-center"
              style={{
                transform: `translateZ(20px)`,
              }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[rgb(var(--foreground))] mb-3 sm:mb-4 leading-tight">
                Building digital experiences for over more than six years
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-[rgb(var(--text-secondary))] leading-relaxed mb-3 sm:mb-4">
                I&apos;ve partnered with companies like{' '}
                <span className="text-[rgb(var(--foreground))] font-medium">Astra International</span>,{' '}
                <span className="text-[rgb(var(--foreground))] font-medium">Trakindo</span>, and{' '}
                <span className="text-[rgb(var(--foreground))] font-medium">Celerates etc</span> to build products that
                millions of users love.
              </p>

              <p className="text-xs sm:text-sm lg:text-base text-[rgb(var(--text-secondary))] leading-relaxed">
                I specialize in creating interactive, user-friendly web and mobile applications. Always eager to learn
                new technologies and push the boundaries of what&apos;s possible.
              </p>
            </m.div>
          </div>
        </m.div>

        {/* Stats Grid */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1], // Bounce effect
                }}
                className="relative text-center p-3 sm:p-4 lg:p-6 bg-[rgba(var(--primary),0.04)] border border-[rgba(var(--border-light),0.06)] rounded-xl sm:rounded-2xl hover:bg-[rgba(var(--primary),0.08)] hover:border-[rgba(var(--primary),0.2)] transition-all duration-300 group"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 sm:mb-3 text-[rgb(var(--primary))] group-hover:scale-110 transition-transform duration-300" />
                <div className="text-base sm:text-lg lg:text-xl font-semibold text-[rgb(var(--foreground))] mb-1">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-[rgb(var(--text-secondary))]">{stat.description}</div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
