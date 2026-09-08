'use client';

import { useEffect } from 'react';

export function useScrollProgress(onFrame: (progress: number, velocity: number) => void) {
  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    let smoothedVelocity = 0;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      smoothedVelocity += (Math.abs(y - lastY) - smoothedVelocity) * 0.12;
      lastY = y;
      onFrame(Math.min(1, Math.max(0, y / max)), Math.min(1, smoothedVelocity / 90));
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [onFrame]);
}
