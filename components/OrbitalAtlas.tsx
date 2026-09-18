'use client';
import { useEffect, useRef, useState } from 'react';
const modes = [
 {name:'OBSERVE',color:'#85c9ff',title:'Start with a different perspective.',text:'Sentinel-1 radar and Sentinel-2 multispectral imagery reveal changes across the ground.'},
 {name:'CONNECT',color:'#bb9aff',title:'Find the pattern between the points.',text:'Satellite bands, vegetation indices, and time turn observations into meaningful features.'},
 {name:'PREDICT',color:'#ff4fd8',title:'Turn patterns into possibilities.',text:'Machine-learning workflows connect temporal features with crop classification and prediction.'},
];
export function OrbitalAtlas(){
 const canvas=useRef<HTMLCanvasElement>(null); const [mode,setMode]=useState(0);
 useEffect(()=>{
  const el=canvas.current; if(!el)return; const ctx=el.getContext('2d');if(!ctx)return;
  let frame=0,clock=0,last=0,w=0,h=0; const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const points=Array.from({length:850},(_,i)=>{const y=1-2*(i+.5)/850;const r=Math.sqrt(1-y*y);const a=i*2.399963;return {x:Math.cos(a)*r,y,z:Math.sin(a)*r};});
  const resize=()=>{const rect=el.getBoundingClientRect();w=rect.width;h=rect.height;const dpr=Math.min(devicePixelRatio,1.5);el.width=w*dpr;el.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);};
  const draw=(now:number)=>{
   const paused=motion.matches||document.documentElement.dataset.motion==='paused';
   if(!paused&&!document.hidden)clock+=Math.min(40,now-last||0);last=now;
   ctx.clearRect(0,0,w,h);const radius=Math.min(w*.34,h*.36),cx=w*.5,cy=h*.48,angle=clock*.00009;
   const project=(x:number,y:number,z:number)=>{const xx=x*Math.cos(angle)+z*Math.sin(angle),zz=-x*Math.sin(angle)+z*Math.cos(angle);const yy=y*.91-zz*.42;return {x:cx+xx*radius,y:cy+yy*radius,z:y*.42+zz*.91};};
   const halo=ctx.createRadialGradient(cx,cy,0,cx,cy,radius*1.5);halo.addColorStop(0,modes[mode].color+'12');halo.addColorStop(.7,modes[mode].color+'08');halo.addColorStop(1,'transparent');ctx.fillStyle=halo;ctx.fillRect(0,0,w,h);
   for(let band=-2;band<=2;band++){ctx.beginPath();for(let j=0;j<=160;j++){const a=j/160*Math.PI*2;const y=band*.3,r=Math.sqrt(1-y*y);const p=project(Math.cos(a)*r,y,Math.sin(a)*r);if(j===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);}ctx.strokeStyle=modes[mode].color+'20';ctx.lineWidth=.6;ctx.stroke();}
   points.map(p=>project(p.x,p.y,p.z)).sort((a,b)=>a.z-b.z).forEach((p,i)=>{const bright=(p.z+1)/2;ctx.globalAlpha=.12+bright*.72;ctx.fillStyle=modes[mode].color;ctx.beginPath();ctx.arc(p.x,p.y,(mode===2&&i%19===0?2.6:1.05)*( .65+bright*.5),0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;
   for(let ring=0;ring<2;ring++){ctx.save();ctx.translate(cx,cy);ctx.rotate(ring?-.48:.45);ctx.strokeStyle=modes[mode].color+'50';ctx.lineWidth=.7;ctx.beginPath();ctx.ellipse(0,0,radius*1.4,radius*.42,0,0,Math.PI*2);ctx.stroke();const a=clock*.0003+ring*Math.PI;const x=Math.cos(a)*radius*1.4,y=Math.sin(a)*radius*.42;ctx.fillStyle='#fff';ctx.shadowColor=modes[mode].color;ctx.shadowBlur=16;ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();ctx.restore();}
   ctx.strokeStyle='#ffffff25';ctx.lineWidth=1;for(const x of [24,w-24])for(const y of [24,h-24]){ctx.beginPath();ctx.moveTo(x,y+(y<40?12:-12));ctx.lineTo(x,y);ctx.lineTo(x+(x<40?12:-12),y);ctx.stroke();}
   if(!document.hidden)frame=requestAnimationFrame(draw);
  };
  const visible=()=>{cancelAnimationFrame(frame);last=0;if(!document.hidden)frame=requestAnimationFrame(draw);};
  const observer=new ResizeObserver(resize);observer.observe(el);resize();frame=requestAnimationFrame(draw);document.addEventListener('visibilitychange',visible);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',visible);};
 },[mode]);
 return <div className="orbital-atlas" style={{'--orbit-color':modes[mode].color} as React.CSSProperties}>
  <div className="atlas-meta"><span>EARTH OBSERVATION / AI</span><span>01 — 03</span></div>
  <div className="atlas-viewport"><canvas ref={canvas} aria-label="Conceptual rotating satellite observation network" role="img"/><span className="atlas-coordinate">22.57° N<br/>88.36° E</span><span className="atlas-caption">A DIFFERENT<br/>POINT OF VIEW</span></div>
  <div className="atlas-controls" aria-label="Explore my workflow">{modes.map((m,i)=><button key={m.name} type="button" aria-pressed={mode===i} onClick={()=>setMode(i)}><span>0{i+1}</span>{m.name}</button>)}</div>
  <div className="atlas-description" aria-live="polite"><strong>{modes[mode].title}</strong><p>{modes[mode].text}</p></div><span className="atlas-note">CONCEPTUAL WORKFLOW · NOT LIVE TELEMETRY</span>
 </div>;
}
