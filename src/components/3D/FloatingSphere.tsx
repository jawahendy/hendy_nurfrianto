'use client';

import { useParallax } from '@/hooks/useParallax';

interface FloatingSphereProps {
  className?: string;
}

export default function FloatingSphere({ className = '' }: FloatingSphereProps) {
  const parallax = useParallax(15, 0.1);

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="relative preserve-3d animate-float-slow">
        {/* Main sphere with gradient */}
        <div
          className="w-[300px] h-[300px] rounded-full relative"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 50px 100px rgba(102, 126, 234, 0.4)',
            transform: 'translateZ(50px)',
          }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 60%)',
            }}
          />

          {/* Subtle ring */}
          <div
            className="absolute inset-[-20px] rounded-full opacity-30"
            style={{
              border: '2px solid rgba(102, 126, 234, 0.3)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Orbit ring */}
        <div
          className="absolute left-1/2 top-1/2 w-[400px] h-[400px]"
          style={{
            transform: 'translate(-50%, -50%) rotateX(75deg)',
            borderRadius: '50%',
            border: '1px solid rgba(102, 126, 234, 0.2)',
          }}
        />
      </div>
    </div>
  );
}
