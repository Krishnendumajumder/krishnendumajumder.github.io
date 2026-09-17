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
    const items = [...document.querySelectorAll<HTMLElement>('.section-heading, .project, .about > div, .timeline article, .education-list article, .contact-heading, .contact h2, .contact-grid, .contact-bottom, .skill-constellation, .skill-disciplines')];
    items.forEach((item, index) => {
      item.classList.add('scroll-reveal');
      item.style.setProperty('--reveal-delay', `${index % 3 * 70}ms`);
    });
    document.documentElement.classList.add('motion-ready');
    const itemReveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      itemReveal.unobserve(entry.target);
    }), { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    items.forEach(item => itemReveal.observe(item));
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
      const progress = Math.max(0, scrollY / Math.max(1,max));
      document.documentElement.style.setProperty('--scroll', `${progress * 100}%`);
      document.documentElement.style.setProperty('--scroll-progress', `${progress}`);
      document.documentElement.style.setProperty('--scroll-angle', `${progress * 360}deg`);
      const readout = document.querySelector<HTMLElement>('.scroll-readout b');
      if (readout) readout.textContent = String(Math.round(progress * 100)).padStart(2, '0');
      document.body.classList.toggle('scrolled', scrollY > 24);
    };
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    return () => { reveal.disconnect(); itemReveal.disconnect(); active.disconnect(); removeEventListener('scroll', onScroll); document.documentElement.classList.remove('motion-ready'); items.forEach(item => item.classList.remove('scroll-reveal', 'in-view')); delete document.body.dataset.cosmicSection; };
  }, []);
  return <><GalaxyScene paused={paused}/><div className="scroll-orbit" aria-hidden="true"><span className="scroll-orbit__core"/><span className="scroll-orbit__satellite"/></div><div className="scroll-readout" aria-hidden="true"><span>FIELD MOTION</span><strong>SCROLL / <b>00</b></strong></div><button className="motion-control" type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Resume animations' : 'Pause animations'}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span>{paused ? 'Motion off' : 'Motion on'}</span></button></>;
}
