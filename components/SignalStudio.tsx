'use client';

import { useState } from 'react';
import { ArrowUpRight, Layers3, ScanLine, Workflow } from 'lucide-react';

const stages = [
  { title: 'Observe', label: 'Satellite observations', text: 'Sentinel-1 radar and Sentinel-2 multispectral imagery capture changes on the ground.', Icon: ScanLine },
  { title: 'Understand', label: 'Temporal features', text: 'Band values and vegetation indices reveal patterns across crop-growth stages.', Icon: Layers3 },
  { title: 'Predict', label: 'Crop classification', text: 'Machine-learning workflows use those patterns to distinguish crop categories.', Icon: Workflow },
];

export function SignalStudio() {
  const [stage, setStage] = useState(0);
  const current = stages[stage];
  return <div className="signal-studio" data-stage={stage}>
    <div className="signal-top"><span>EARTH OBSERVATION</span><span className="signal-tag">S1 / S2</span></div>
    <div className="signal-chart">
      <div className="chart-caption"><span>FROM SIGNAL</span><span>TO INSIGHT <ArrowUpRight size={14}/></span></div>
      <svg viewBox="0 0 480 280" role="img" aria-label="Illustrative temporal satellite signals. These curves demonstrate the workflow, not measured project results.">
        <defs><linearGradient id="signal-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#b8f3cf" stopOpacity=".3"/><stop offset="1" stopColor="#b8f3cf" stopOpacity="0"/></linearGradient></defs>
        <g className="chart-grid"><path d="M20 40H460M20 90H460M20 140H460M20 190H460M20 240H460M60 25V255M150 25V255M240 25V255M330 25V255M420 25V255"/></g>
        <path className="signal-area" d="M20 219C65 218 65 180 106 174S158 205 197 129S267 53 296 80S350 125 385 89S431 52 460 42V255H20Z"/>
        <path className="signal-line primary" d="M20 219C65 218 65 180 106 174S158 205 197 129S267 53 296 80S350 125 385 89S431 52 460 42"/>
        <path className="signal-line secondary" d="M20 180C73 137 77 224 125 205S190 166 235 190S281 117 326 148S380 172 415 139S447 139 460 118"/>
        <g className="chart-samples"><circle cx="106" cy="174" r="5"/><circle cx="296" cy="80" r="5"/><circle cx="385" cy="89" r="5"/></g>
        <line className="signal-sweep" x1="60" y1="25" x2="60" y2="255"/>
      </svg>
      <div className="chart-axis"><span>EARLY GROWTH</span><span>MATURITY</span></div>
    </div>
    <div className="stage-controls" aria-label="Explore the satellite workflow">{stages.map(({title}, index) => <button type="button" key={title} aria-pressed={stage === index} onClick={() => setStage(index)}><span>0{index + 1}</span>{title}</button>)}</div>
    <div className="signal-description" aria-live="polite"><current.Icon size={22}/><div><strong>{current.label}</strong><p>{current.text}</p></div></div>
    <div className="signal-foot"><span>REMOTE SENSING × MACHINE LEARNING</span><span>Illustrative workflow</span></div>
  </div>;
}
