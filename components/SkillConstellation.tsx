'use client';

import { useState } from 'react';

const nodes = [
  { name:'Python', x:10, y:19, group:'ml' }, { name:'SQL', x:34, y:8, group:'data' },
  { name:'Data Analytics', x:61, y:14, group:'data' }, { name:'Machine Learning', x:82, y:28, group:'ml' },
  { name:'Artificial Intelligence', x:48, y:36, group:'ml' }, { name:'Remote Sensing', x:17, y:54, group:'geo' },
  { name:'Google Earth Engine', x:77, y:60, group:'geo' }, { name:'Sentinel-1', x:8, y:82, group:'geo' },
  { name:'Sentinel-2', x:34, y:88, group:'geo' }, { name:'Geospatial Analysis', x:61, y:84, group:'geo' },
  { name:'YOLO / Object Detection', x:87, y:86, group:'vision' },
];
const lines = [[0,4],[1,2],[1,4],[2,4],[3,4],[3,10],[4,5],[4,6],[5,7],[5,8],[5,9],[5,10],[6,8],[6,9]];

export function SkillConstellation() {
  const [active, setActive] = useState<string | null>(null);
  return <div className="skill-constellation" onPointerLeave={() => setActive(null)}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{lines.map(([a,b])=><line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} className={active && (nodes[a].group===active || nodes[b].group===active) ? 'connected' : ''}/>)}</svg>
    {nodes.map((node,index)=><button key={node.name} type="button" style={{left:`${node.x}%`,top:`${node.y}%`}} className={active===node.group?'active':''} onPointerEnter={event=>{if(event.pointerType==='mouse')setActive(node.group)}} onFocus={()=>setActive(node.group)} onClick={()=>setActive(node.group)} aria-pressed={active===node.group}><span>{String(index+1).padStart(2,'0')}</span>{node.name}</button>)}
    <div className="constellation-core" aria-hidden="true"><i/>AI · DATA</div>
    <p>Hover, focus, or tap a skill to trace related capabilities.</p>
  </div>;
}
