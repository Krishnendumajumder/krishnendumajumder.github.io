type ProjectVisualProps = { kind: 'crop' | 'tower' | 'network' | 'commerce' };

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
    <span>{visual.label}</span>
  </figure>;
}
