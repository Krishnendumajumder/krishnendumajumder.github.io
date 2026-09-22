'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ProjectVisual } from './ProjectVisual';
import './project-journey.css';

const cases = [
  {
    id: 'crop', number: '01', short: 'Crop intelligence', category: 'EARTH OBSERVATION', color: '#52e4ff',
    title: 'Satellite-based crop classification & prediction',
    question: 'How does a field’s changing satellite signature help identify its crop?',
    context: 'A multi-temporal workflow that brings Sentinel-1 radar and Sentinel-2 multispectral observations together across crop-growth stages.',
    input: 'Sentinel-1 SAR, Sentinel-2 bands, vegetation indices, and KML field boundaries.',
    method: 'Extract field-level observations with Google Earth Engine, organize features over time, and compare spectral and radar patterns for crop classification.',
    output: 'A crop-classification and prediction workflow based on changes across the growing cycle.',
    note: 'Crop identity depends on the observation period and reference labels. This diagram explains the workflow; it does not report a validation score.',
    tags: ['Python', 'Google Earth Engine', 'Sentinel-1 & 2'],
    stages: [ ['OBSERVE', 'Radar + optical', 'Field boundaries'], ['COMPARE', 'Bands + indices', 'Growth-stage features'], ['CLASSIFY', 'Temporal patterns', 'Crop categories'] ],
  },
  {
    id: 'tower', number: '02', short: 'Infrastructure insight', category: 'COMPUTER VISION', color: '#f788e8',
    title: 'Transmission tower detection & thermal distress monitoring',
    question: 'How can imagery help focus attention on infrastructure that needs review?',
    context: 'An infrastructure-monitoring workflow exploring tower detection, condition analysis, thermal anomalies, and vegetation near transmission structures.',
    input: 'RGB, thermal, and 3D information for transmission infrastructure and its surroundings.',
    method: 'Locate towers, examine available thermal and structural information, and consider nearby vegetation as part of maintenance analysis.',
    output: 'Detection and condition-analysis outputs to support infrastructure review.',
    note: 'The illustration is conceptual. Measured thermal observations and field verification are needed before treating an anomaly as confirmed distress.',
    tags: ['Computer vision', 'Thermal analysis', 'Vegetation monitoring'],
    stages: [ ['LOCATE', 'RGB imagery', 'Tower candidates'], ['EXAMINE', 'Thermal + 3D', 'Condition cues'], ['REVIEW', 'Anomaly + vegetation', 'Maintenance analysis'] ],
  },
  {
    id: 'network', number: '03', short: 'Facility decisions', category: 'MATHEMATICAL OPTIMIZATION', color: '#b6a0ff',
    title: 'P-median facility location optimization',
    question: 'Where should three warehouses serve a nine-city demand network?',
    context: 'A mixed integer programming model in IBM CPLEX Optimization Studio, using demand and inter-city distance data for a nine-city network.',
    input: 'Customer demand and inter-city distances, with exactly three warehouses to open.',
    method: 'Use binary variables for facility openings and customer assignments. Assign each customer to one open warehouse while minimizing demand-weighted travel distance.',
    output: 'A facility-opening and customer-assignment model with P = 3 for the nine-city network.',
    note: 'Nine cities and three facilities describe the model setup. No unverified cost savings or solver performance figures are claimed.',
    tags: ['IBM CPLEX', 'OPL', 'Mixed integer programming'],
    stages: [ ['MODEL', '9-city demand', 'Distance matrix'], ['CONSTRAIN', 'P = 3 facilities', 'One assignment each'], ['OPTIMIZE', 'Weighted distance', 'Facility assignments'] ],
  },
] as const;

function Workflow({ project, stage = 2 }: { project: typeof cases[number]; stage?: number }) {
  return <div className="workflow-map" aria-hidden="true">
    <div className="workflow-map__axis"><span>INPUT</span><span>METHOD</span><span>OUTPUT</span></div>
    <svg className="workflow-map__connections" viewBox="0 0 480 150" preserveAspectRatio="none">
      <path className="workflow-map__track" d="M70 24C70 70 240 55 240 75S410 90 410 126" />
      <path className="workflow-map__signal" d="M70 24C70 70 240 55 240 75S410 90 410 126" pathLength="1" style={{ strokeDashoffset: 1 - (stage + 1) / 3 }} />
    </svg>
    <div className="workflow-map__nodes">{project.stages.map(([label, primary, secondary], i) => <div key={label} className={`workflow-node ${i <= stage ? 'is-lit' : ''}`}>
      <span className="workflow-node__index">0{i + 1} / {label}</span><strong>{primary}</strong><span>{secondary}</span>
    </div>)}</div>
    <div className="workflow-map__footer"><span>{project.category}</span><span>INPUT → METHOD → OUTPUT</span></div>
  </div>;
}

export function ProjectJourney() {
  const root = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 0, stage: 0 });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const articles = [...el.querySelectorAll<HTMLElement>('[data-case]')];
    const scenes = [...el.querySelectorAll<HTMLElement>('.project-motion-scene')];
    const visibility = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('scene-visible', entry.isIntersecting)), { threshold: .1 });
    scenes.forEach(scene => visibility.observe(scene));
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = innerHeight * .52;
      let index = 0;
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].getBoundingClientRect().top <= readingLine) index = i;
      }
      const rect = articles[index].getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (readingLine - rect.top) / Math.max(rect.height, 1)));
      const stage = 2;
      el.style.setProperty('--case-progress', String((index + fraction) / cases.length));
      setPosition(previous => previous.index === index && previous.stage === stage ? previous : { index, stage });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(el);
    update();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });
    return () => { cancelAnimationFrame(frame); resize.disconnect(); visibility.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); };
  }, []);

  const current = cases[position.index];
  return <div className="project-journey" ref={root} style={{ '--case-color': current.color } as CSSProperties}>
    <aside className="project-observer" aria-label="Project explorer">
      <div className="project-observer__header"><span>FIELDNOTES / SELECTED WORK</span><span>{current.number} <span className="observer-total">/ 03</span></span></div>
      <nav className="case-index" aria-label="Project chapters">{cases.map((project, i) => <a key={project.id} href={`#project-${project.id}`} aria-current={position.index === i ? 'step' : undefined}><span>{project.number}</span>{project.short}<ArrowUpRight size={16} aria-hidden="true"/></a>)}</nav>
      <div className="project-observer__display">
        {cases.map((project, i) => <div key={project.id} className={`workflow-panel ${position.index === i ? 'is-current' : ''}`} aria-hidden={position.index !== i} style={{ '--case-color': project.color } as CSSProperties}>
          <p>{project.short}</p><Workflow project={project} stage={position.index === i ? position.stage : 0}/>
        </div>)}
      </div>
      <div className="journey-progress" aria-hidden="true"><span/></div>
      <p className="observer-caption">Workflow illustrations · not live measurements</p>
      <span className="observer-scroll"><ArrowDown size={14} aria-hidden="true"/> Scroll through the work</span>
    </aside>
    <div className="case-studies">{cases.map((project) => <article id={`project-${project.id}`} key={project.id} data-case className="case-study" style={{ '--case-color': project.color } as CSSProperties}>
      <div className="case-study__label"><span>PROJECT {project.number}</span><span>{project.id === 'crop' ? 'INTERNSHIP-RELATED WORKFLOW' : project.id === 'tower' ? 'PROJECT PROTOTYPE' : 'ACADEMIC PROJECT'}</span><span>{project.category}</span></div>
      <h3>{project.title}</h3><p className="case-question">{project.question}</p><p className="case-context">{project.context}</p>
      <figure className={`project-motion-scene motion-${project.id}`}>
        <div className="project-motion-header"><span>{project.id === 'crop' ? 'TEMPORAL FIELD SCAN' : project.id === 'tower' ? 'STRUCTURE & CONDITION' : 'DEMAND → FACILITIES'}</span><span aria-hidden="true">/{project.number}</span></div>
        <ProjectVisual kind={project.id}/>
        <figcaption>Illustrative workflow · continuous animation</figcaption>
      </figure>
      <div className="case-mobile-diagram"><Workflow project={project}/><p>Workflow illustration · not live measurements</p></div>
      <dl className="case-method"><div><dt><span>01</span> Input</dt><dd>{project.input}</dd></div><div><dt><span>02</span> Method</dt><dd>{project.method}</dd></div><div><dt><span>03</span> Output</dt><dd>{project.output}</dd></div></dl>
      <ul className="case-tools" aria-label="Tools and disciplines">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <details className="case-notes"><summary>Open project overview <span aria-hidden="true">+</span></summary><p>{project.context}</p><p>{project.note}</p></details>
    </article>)}
    <div className="case-outro"><p>Interested in how I approach a problem?</p><a href="#contact">Let’s discuss the work <ArrowUpRight size={18} aria-hidden="true"/></a></div></div>
  </div>;
}
