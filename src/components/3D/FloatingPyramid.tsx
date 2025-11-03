'use client';

import { useParallax } from '@/hooks/useParallax';

interface FloatingPyramidProps {
  className?: string;
}

export default function FloatingPyramid({ className = '' }: FloatingPyramidProps) {
  const parallax = useParallax(8, 0.12);

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div
        className="relative preserve-3d animate-float-slow"
        style={{
          width: '150px',
          height: '150px',
          transformStyle: 'preserve-3d',
          animation: 'float 12s ease-in-out infinite, rotatePyramid 20s linear infinite',
        }}
      >
        {/* Pyramid Base */}
        <div
          className="absolute inset-0"
          style={{
            width: '150px',
            height: '150px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            transform: 'rotateX(0deg) translateZ(0px)',
            boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
          }}
        />

        {/* Pyramid Side 1 */}
        <div
          className="absolute"
          style={{
            width: '0',
            height: '0',
            borderLeft: '75px solid transparent',
            borderRight: '75px solid transparent',
            borderBottom: '130px solid rgba(102, 126, 234, 0.1)',
            transform: 'rotateY(30deg) translateZ(40px)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Pyramid Side 2 */}
        <div
          className="absolute"
          style={{
            width: '0',
            height: '0',
            borderLeft: '75px solid transparent',
            borderRight: '75px solid transparent',
            borderBottom: '130px solid rgba(118, 75, 162, 0.1)',
            transform: 'rotateY(-30deg) translateZ(40px)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Center glow */}
        <div
          className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.9), transparent)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px rgba(102, 126, 234, 0.7)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes rotatePyramid {
          0% {
            transform: rotateY(0deg) rotateX(20deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(20deg);
          }
        }
      `}</style>
    </div>
  );
}
