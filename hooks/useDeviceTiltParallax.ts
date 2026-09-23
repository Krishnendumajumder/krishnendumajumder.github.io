'use client';

import { useEffect, useRef } from 'react';

const clamp = (value: number) => Math.max(-0.5, Math.min(0.5, value));

export function useDeviceTiltParallax(enabled: boolean) {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    target.current = { x: 0, y: 0 };
    if (!enabled) return;
    let baseline: { beta: number; gamma: number } | null = null;
    const reset = () => { baseline = null; target.current = { x: 0, y: 0 }; };
    const tilt = (event: DeviceOrientationEvent) => {
      if (event.beta == null || event.gamma == null) return;
      if (!baseline) baseline = { beta: event.beta, gamma: event.gamma };
      const dx = clamp((event.gamma - baseline.gamma) / 42);
      const dy = clamp((event.beta - baseline.beta) / 42);
      const angle = screen.orientation?.angle ?? Number((window as Window & { orientation?: number }).orientation ?? 0);
      if (Math.abs(angle) === 90) {
        target.current.x = angle === 90 ? dy : -dy;
        target.current.y = angle === 90 ? -dx : dx;
      } else {
        target.current.x = dx;
        target.current.y = dy;
      }
    };
    window.addEventListener('deviceorientation', tilt, { passive: true });
    window.addEventListener('orientationchange', reset, { passive: true });
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('deviceorientation', tilt);
      window.removeEventListener('orientationchange', reset);
      window.removeEventListener('blur', reset);
      reset();
    };
  }, [enabled]);
  return target;
}
