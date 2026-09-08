'use client';

import { useEffect, useState } from 'react';

export type PerformanceTier = 'reduced' | 'mobile' | 'desktop';

export function usePerformanceTier() {
  const [tier, setTier] = useState<PerformanceTier>('mobile');

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const update = () => {
      if (motion.matches) setTier('reduced');
      else setTier(coarse.matches || window.innerWidth < 760 ? 'mobile' : 'desktop');
    };
    update();
    motion.addEventListener('change', update);
    coarse.addEventListener('change', update);
    window.addEventListener('resize', update, { passive: true });
    return () => {
      motion.removeEventListener('change', update);
      coarse.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return tier;
}
