'use client';

import { useParallax } from '@/hooks/useParallax';

interface FloatingCubeProps {
  className?: string;
}

export default function FloatingCube({ className = '' }: FloatingCubeProps) {
  const parallax = useParallax(12, 0.15);

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
          width: '200px',
          height: '200px',
          transformStyle: 'preserve-3d',
          animation: 'float 15s ease-in-out infinite, rotateCube 15s linear infinite',
        }}
      >
        {/* Cube faces with wireframe effect */}
        <div
          className="absolute inset-0 border-2 rounded-lg"
          style={{
            borderColor: 'rgba(103, 126, 234, 0.4)',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            transform: 'translateZ(100px)',
            boxShadow: '0 0 40px rgba(102, 126, 234, 0.3)',
          }}
        />
        <div
          className="absolute inset-0 border-2 rounded-lg"
          style={{
            borderColor: 'rgba(103, 126, 234, 0.4)',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
            transform: 'translateZ(-100px)',
          }}
        />
        <div
          className="absolute inset-0 border-2 rounded-lg"
          style={{
            borderColor: 'rgba(103, 126, 234, 0.4)',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08))',
            transform: 'rotateY(90deg) translateZ(100px)',
          }}
        />
        <div
          className="absolute inset-0 border-2 rounded-lg"
          style={{
            borderColor: 'rgba(103, 126, 234, 0.4)',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08))',
            transform: 'rotateY(-90deg) translateZ(100px)',
          }}
        />
        <div
          className="absolute inset-0 border-2 rounded-lg"
          style={{
            borderColor: 'rgba(103, 126, 234, 0.4)',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08))',
            transform: 'rotateX(90deg) translateZ(100px)',
          }}
        />
        <div
          className="absolute inset-0 border-2 rounded-lg"
          style={{
            borderColor: 'rgba(103, 126, 234, 0.4)',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08))',
            transform: 'rotateX(-90deg) translateZ(100px)',
          }}
        />

        {/* Center glow */}
        <div
          className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.8), transparent)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 20px rgba(102, 126, 234, 0.6)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes rotateCube {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
