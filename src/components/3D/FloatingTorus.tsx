'use client';

import { useParallax } from '@/hooks/useParallax';

interface FloatingTorusProps {
  className?: string;
}

export default function FloatingTorus({ className = '' }: FloatingTorusProps) {
  const parallax = useParallax(10, 0.15);

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div
        className="relative preserve-3d animate-float"
        style={{
          width: '180px',
          height: '180px',
          transformStyle: 'preserve-3d',
          animation: 'float 10s ease-in-out infinite, rotateTorus 15s linear infinite',
        }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            width: '180px',
            height: '180px',
            border: '30px solid rgba(0, 113, 227, 0.2)',
            borderRadius: '50%',
            transform: 'rotateX(60deg)',
            boxShadow: '0 0 40px rgba(0, 113, 227, 0.4), inset 0 0 30px rgba(0, 113, 227, 0.2)',
          }}
        />

        {/* Inner ring depth */}
        <div
          className="absolute rounded-full"
          style={{
            width: '120px',
            height: '120px',
            left: '30px',
            top: '30px',
            background: 'radial-gradient(circle, transparent 40%, rgba(0, 113, 227, 0.15) 50%, transparent 60%)',
            borderRadius: '50%',
            transform: 'rotateX(60deg)',
          }}
        />

        {/* Highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: '40px',
            height: '40px',
            left: '20px',
            top: '20px',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent)',
            filter: 'blur(8px)',
            transform: 'rotateX(60deg)',
          }}
        />

        {/* Center glow */}
        <div
          className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 113, 227, 0.8), transparent)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 25px rgba(0, 113, 227, 0.6)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes rotateTorus {
          0% {
            transform: rotateY(0deg) rotateZ(45deg);
          }
          100% {
            transform: rotateY(360deg) rotateZ(45deg);
          }
        }
      `}</style>
    </div>
  );
}
