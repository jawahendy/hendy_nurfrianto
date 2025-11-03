'use client';

import { useParallax } from '@/hooks/useParallax';

interface FloatingDiamondProps {
  className?: string;
}

export default function FloatingDiamond({ className = '' }: FloatingDiamondProps) {
  const parallax = useParallax(12, 0.1);

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
          width: '160px',
          height: '160px',
          transformStyle: 'preserve-3d',
          animation: 'float 14s ease-in-out infinite, rotateDiamond 18s linear infinite',
        }}
      >
        {/* Top pyramid */}
        <div
          className="absolute"
          style={{
            width: '160px',
            height: '80px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.15))',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            transformOrigin: 'center bottom',
            boxShadow: '0 5px 20px rgba(245, 158, 11, 0.3)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
          }}
        />

        {/* Bottom pyramid */}
        <div
          className="absolute"
          style={{
            width: '160px',
            height: '80px',
            top: '80px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.1))',
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            transformOrigin: 'center top',
            boxShadow: '0 -5px 20px rgba(245, 158, 11, 0.2)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}
        />

        {/* Left facet */}
        <div
          className="absolute"
          style={{
            width: '120px',
            height: '160px',
            background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.12), transparent)',
            clipPath: 'polygon(0% 50%, 50% 0%, 50% 100%)',
            transform: 'rotateY(-25deg) translateX(-20px)',
            transformOrigin: 'right center',
          }}
        />

        {/* Right facet */}
        <div
          className="absolute"
          style={{
            width: '120px',
            height: '160px',
            right: '0',
            background: 'linear-gradient(-90deg, rgba(245, 158, 11, 0.12), transparent)',
            clipPath: 'polygon(100% 50%, 50% 0%, 50% 100%)',
            transform: 'rotateY(25deg) translateX(20px)',
            transformOrigin: 'left center',
          }}
        />

        {/* Center shine lines */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: '2px',
            height: '120px',
            background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.6), transparent)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: '120px',
            height: '2px',
            background: 'linear-gradient(to right, transparent, rgba(251, 191, 36, 0.6), transparent)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Center glow */}
        <div
          className="absolute left-1/2 top-1/2 w-6 h-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.9), transparent)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.8)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes rotateDiamond {
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
