'use client';

import { useEffect, useRef } from 'react';

export function useMouseParallax(enabled: boolean) {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    target.current = { x: 0, y: 0 };
    if (!enabled) return;
    const move = (event: PointerEvent) => {
      target.current.x = event.clientX / window.innerWidth - 0.5;
      target.current.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', move, { passive: true });
    const reset = () => { target.current = { x: 0, y: 0 }; };
    window.addEventListener('blur', reset);
    document.documentElement.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', reset);
      document.documentElement.removeEventListener('mouseleave', reset);
      reset();
    };
  }, [enabled]);
  return target;
}
