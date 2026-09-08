'use client';

import { useEffect } from 'react';
import { GalaxyScene } from './GalaxyScene';

export function SiteExperience() {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];
    const nav = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav]')];
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 });
    sections.forEach(section => reveal.observe(section));
    const active = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
      document.body.dataset.cosmicSection = entry.target.id;
    }), { rootMargin: '-35% 0px -55%' });
    sections.forEach(section => active.observe(section));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty('--scroll', `${Math.max(0, scrollY / Math.max(1,max)) * 100}%`);
      document.body.classList.toggle('scrolled', scrollY > 24);
    };
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    return () => { reveal.disconnect(); active.disconnect(); removeEventListener('scroll', onScroll); delete document.body.dataset.cosmicSection; };
  }, []);
  return <GalaxyScene/>;
}
