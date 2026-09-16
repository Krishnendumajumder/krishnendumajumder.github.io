'use client';

import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { GalaxyScene } from './GalaxyScene';

export function SiteExperience() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'running';
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];
    const nav = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav]')];
    document.documentElement.classList.add('motion-ready');
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .05 });
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
  return <><GalaxyScene paused={paused}/><button className="motion-control" type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Resume animations' : 'Pause animations'}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span>{paused ? 'Motion off' : 'Motion on'}</span></button></>;
}
