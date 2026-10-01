type ProjectVisualProps = { kind: 'crop' | 'tower' | 'network' | 'commerce' };

import './project-analysis-motion.css';

const visuals = {
  crop: { src: '/projects/crop-intelligence.png', alt: 'Satellite-style view of agricultural field parcels with a restrained multispectral analysis overlay', label: 'MULTI-TEMPORAL FIELD ANALYSIS' },
  tower: { src: '/projects/tower-inspection.png', alt: 'Transmission tower inspection scene with a subtle thermal condition-analysis overlay', label: 'INFRASTRUCTURE CONDITION REVIEW' },
  network: { src: '/projects/facility-network.png', alt: 'Regional logistics network with three emphasized distribution facilities and connecting routes', label: 'P-MEDIAN NETWORK MODEL' },
  commerce: { src: '/projects/olist-ecommerce-analytics.png', alt: 'Executed notebook charts comparing Brazilian state revenue, regional revenue, and average delivery times', label: 'EXECUTED NOTEBOOK OUTPUT' },
} as const;

export function ProjectVisual({ kind }: ProjectVisualProps) {
  const visual = visuals[kind];
  return <figure className={`project-visual project-visual-real project-visual-${kind}`}>
    <img src={visual.src} alt={visual.alt} loading="lazy" decoding="async"/>
    <i className="project-visual-grid" aria-hidden="true"/>
    <div className="project-analysis-motion" aria-hidden="true">
      <i className="analysis-sweep"/>
      {kind === 'network' && <svg className="analysis-routes" viewBox="0 0 600 300" preserveAspectRatio="none">
        <path d="M65 195 Q180 75 290 145 T545 80"/>
        <path d="M110 65 Q255 245 390 165 T540 245"/>
        <path d="M85 245 Q230 130 350 90 T515 165"/>
      </svg>}
      <i className="analysis-corner analysis-corner-start"/><i className="analysis-corner analysis-corner-end"/>
    </div>
    <span>{visual.label}</span>
  </figure>;
}
