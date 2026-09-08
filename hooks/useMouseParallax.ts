'use client';

import { useEffect, useRef } from 'react';

export function useMouseParallax(enabled: boolean) {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled) return;
    const move = (event: PointerEvent) => {
      target.current.x = event.clientX / window.innerWidth - 0.5;
      target.current.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [enabled]);
  return target;
}
