'use client';

import { useState, useEffect } from 'react';

interface ParallaxOffset {
  x: number;
  y: number;
}

/**
 * Custom hook for mouse parallax effect
 * @param strength - Multiplier for parallax intensity (default: 20)
 * @param smoothing - Smoothing factor using lerp (default: 0.1)
 * @returns Object with x and y offset values
 */
export function useParallax(strength: number = 20, smoothing: number = 0.1): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const [targetOffset, setTargetOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setTargetOffset({ x, y });
    };

    // Smooth interpolation using requestAnimationFrame
    let animationFrameId: number;

    const animate = () => {
      setOffset((current) => ({
        x: current.x + (targetOffset.x - current.x) * smoothing,
        y: current.y + (targetOffset.y - current.y) * smoothing,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [strength, smoothing, targetOffset.x, targetOffset.y]);

  return offset;
}
