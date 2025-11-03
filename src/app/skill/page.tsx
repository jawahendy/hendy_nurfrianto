'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Skills as Skills1, Skills2 } from '@/constants/data/Service';
import { ArrowLeft } from 'lucide-react';
import FloatingSphere from '@/components/3D/FloatingSphere';
import FloatingCube from '@/components/3D/FloatingCube';
import FloatingTorus from '@/components/3D/FloatingTorus';
import FloatingPyramid from '@/components/3D/FloatingPyramid';
import FloatingDiamond from '@/components/3D/FloatingDiamond';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SkillsPage() {
  const router = useRouter();
  const [ref, isInView] = useScrollReveal({ threshold: 0.05 });

  const allSkills = Skills1.list[0].slides.concat(Skills2.list.flatMap((client) => client.slides));

  return (
    <main className="relative min-h-screen bg-[rgb(var(--background))] overflow-hidden">
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
      <FloatingSphere className="left-[-100px] top-[10%] scale-75 opacity-60" />
      <FloatingCube className="right-[-80px] top-[30%] scale-75 opacity-60" />
      <FloatingTorus className="right-[10%] bottom-[20%] scale-75 opacity-50" />
      <FloatingPyramid className="left-[5%] bottom-[15%] scale-75 opacity-50" />
      <FloatingDiamond className="right-[15%] top-[60%] scale-50 opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Header with Back Button */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-center gap-6 mb-12"
        >
          {/* Back Button */}
          <m.button
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-3 bg-[rgb(var(--surface))] border border-[rgba(var(--border-light),0.12)] rounded-xl text-[rgb(var(--foreground))] hover:bg-[rgba(var(--primary),0.06)] hover:border-[rgb(var(--primary))] transition-all duration-300 shadow-apple-sm hover:shadow-apple-md"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </m.button>

          {/* Title */}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[rgb(var(--foreground))]">
              All Skills
            </h1>
            <p className="text-lg sm:text-xl text-[rgb(var(--text-secondary))] mt-2">
              Technologies and tools I work with
            </p>
          </div>
        </m.div>

        {/* Skills Grid */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          {allSkills.map((skill, index) => (
            <SkillCard key={`${skill.alt}-${index}`} skill={skill} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Footer CTA */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-20 text-center"
        >
          <div className="glass rounded-[32px] p-12 lg:p-16 border border-[rgba(var(--border-light),0.06)] shadow-apple-lg">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[rgb(var(--foreground))] mb-4">
              Want to see these skills in action?
            </h2>
            <p className="text-lg text-[rgb(var(--text-secondary))] mb-8 max-w-2xl mx-auto">
              Check out my portfolio to see real projects built with these technologies.
            </p>
            <m.button
              onClick={() => router.push('/portofolio')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[rgb(var(--primary))] text-white rounded-2xl font-semibold text-lg shadow-[0_8px_24px_rgba(var(--primary),0.3)] hover:shadow-[0_16px_48px_rgba(var(--primary),0.4)] transition-all duration-300"
            >
              View Portfolio
            </m.button>
          </div>
        </m.div>
      </div>
    </main>
  );
}

interface SkillCardProps {
  skill: {
    alt: string;
    src: string;
    style?: React.CSSProperties;
  };
  index: number;
  isInView: boolean;
}

function SkillCard({ skill, index, isInView }: SkillCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group preserve-3d perspective-1000"
    >
      <div className="relative bg-[rgb(var(--surface))] rounded-2xl p-6 shadow-apple-sm hover:shadow-apple-lg transition-all duration-500 hover:-translate-y-2 border border-[rgba(var(--border-light),0.06)] flex flex-col items-center justify-center h-[180px]">
        {/* Hover Gradient Overlay */}
        <div
          className="absolute inset-[-4px] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-400 -z-10"
          style={{
            background: 'linear-gradient(135deg, rgb(var(--primary)), #764ba2)',
          }}
        />

        {/* Skill Icon */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 flex items-center justify-center flex-shrink-0">
          <Image
            src={skill.src}
            alt={skill.alt}
            width={80}
            height={80}
            style={skill.style}
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
            unoptimized={true}
          />
        </div>

        {/* Skill Name */}
        <h3 className="text-center text-xs sm:text-sm font-medium text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors duration-300 break-words line-clamp-2">
          {skill.alt}
        </h3>
      </div>
    </m.div>
  );
}
