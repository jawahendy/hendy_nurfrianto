'use client';

import { m } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Github, Linkedin, Youtube, Mail } from 'lucide-react';
import FloatingSphere from '@/components/3D/FloatingSphere';
import FloatingCube from '@/components/3D/FloatingCube';

export default function ContactSection() {
  const [ref, isInView] = useScrollReveal({ threshold: 0.2 });

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/jawahendy',
      color: '#333',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/hendy-nurfrianto-4977b0177/',
      color: '#0A66C2',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://www.youtube.com/@Bang_hen490',
      color: '#FF0000',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'https://drive.google.com/drive/folders/1Y2T8prWNpxZ9nxEz6mHjsLIhL_2P1Feg?usp=sharing',
      color: 'rgb(var(--primary))',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[rgb(var(--background))] to-[rgba(var(--primary),0.03)] overflow-hidden snap-start snap-always"
      aria-label="Contact Section"
    >
      {/* Background 3D Grid */}
      <m.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(var(--primary), 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'top',
        }}
      />

      {/* 3D Floating Elements */}
      <m.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingSphere className="top-12 sm:top-20 left-4 sm:left-20 scale-[0.35] sm:scale-[0.6] lg:scale-100 opacity-25 sm:opacity-50 lg:opacity-100" />
      </m.div>
      <m.div
        initial={{ opacity: 0, scale: 0.5, rotateZ: 45 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <FloatingCube className="bottom-16 sm:bottom-32 right-4 sm:right-24 scale-[0.35] sm:scale-[0.6] lg:scale-100 opacity-25 sm:opacity-50 lg:opacity-100" />
      </m.div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 w-full">
        {/* 3D Floating Contact Card */}
        <m.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative preserve-3d animate-float-slow"
        >
          <div className="relative glass rounded-[40px] p-12 lg:p-20 text-center shadow-apple-xl border border-[rgba(var(--border-light),0.06)]">
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 rounded-[40px] opacity-50 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(var(--primary), 0.1), transparent 70%)',
              }}
            />

            {/* Content */}
            <div className="relative" style={{ transform: 'translateZ(40px)' }}>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight mb-4 sm:mb-6 leading-tight px-4">
                <span className="text-gradient">Let&apos;s create something amazing together</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
                Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
              </p>

              {/* CTA Button */}
              <m.a
                href="https://drive.google.com/drive/folders/1Y2T8prWNpxZ9nxEz6mHjsLIhL_2P1Feg?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-10 sm:py-4 bg-[rgb(var(--primary))] text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-[0_8px_24px_rgba(var(--primary),0.3)] hover:shadow-[0_16px_48px_rgba(var(--primary),0.4)] transition-all duration-400 ease-apple"
                style={{ transform: 'translateZ(60px)' }}
              >
                Get in Touch
                <Mail className="w-5 h-5" />
              </m.a>

              {/* Social Links */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                }}
                className="flex justify-center gap-6 mt-16 pt-12 border-t border-[rgba(var(--border-light),0.06)]"
                style={{ transform: 'translateZ(30px)' }}
              >
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <m.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + index * 0.1,
                      }}
                      whileHover={{ y: -4, scale: 1.1 }}
                      className="group w-14 h-14 flex items-center justify-center bg-[rgba(var(--primary),0.06)] rounded-2xl text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 shadow-apple-sm hover:shadow-apple-md"
                      aria-label={social.label}
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      <Icon className="w-6 h-6" />
                    </m.a>
                  );
                })}
              </m.div>
            </div>
          </div>
        </m.div>

        {/* Footer */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.8,
          }}
          className="mt-16 text-center space-y-2"
        >
          <p className="text-sm text-[rgb(var(--text-tertiary))]">
            © 2025 Hendy Nurfrianto. All rights reserved.
          </p>
        </m.div>
      </div>
    </section>
  );
}
