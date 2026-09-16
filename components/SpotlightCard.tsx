'use client';

import type { ReactNode, PointerEvent } from 'react';

// Original implementation inspired by the React Bits / 21st.dev spotlight pattern.
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const track = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
  };
  return <article className={`spotlight-card ${className}`} onPointerMove={track}>{children}</article>;
}
