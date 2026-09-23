'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, BriefcaseBusiness, Check, ExternalLink, Mail, Radar, Satellite, ScanSearch } from 'lucide-react';
import { ProjectVisual } from './ProjectVisual';
import './career-evidence.css';
import './skill-hover.css';
import './project-visual-real.css';

const projects = [
  { id:'crop' as const, number:'01', status:'Internship-related workflow', title:'Crop intelligence', question:'How can multi-temporal satellite signals support crop classification?', evidence:'Sentinel-1 SAR, Sentinel-2 bands, vegetation indices, KML field boundaries, and Google Earth Engine workflows.', process:['Observe fields','Compare time series','Classify patterns'], skills:['Python','Google Earth Engine','Remote sensing','Machine learning'], note:'Conceptual workflow; no validation score is claimed.', Icon:Satellite },
  { id:'tower' as const, number:'02', status:'Project prototype', title:'Infrastructure insight', question:'How can imagery focus attention on transmission infrastructure that needs review?', evidence:'RGB, thermal, 3D information, tower detection, anomaly review, and nearby vegetation analysis.', process:['Locate towers','Examine condition cues','Support review'], skills:['Computer vision','Thermal analysis','Python'], note:'Anomalies require measured thermal observations and field verification.', Icon:ScanSearch },
  { id:'network' as const, number:'03', status:'Academic optimization project', title:'Facility decisions', question:'Where should three warehouses serve a nine-city demand network?', evidence:'Demand data, inter-city distances, binary facility and assignment variables, and P = 3.', process:['Model demand','Apply constraints','Optimize assignment'], skills:['IBM CPLEX','OPL','Mathematical optimization'], note:'The setup is verified; no unverified savings or performance figures are claimed.', Icon:Radar },
];

const skills = [
  ['Python',['Crop intelligence','Infrastructure insight']],
  ['Machine learning',['Crop intelligence']],
  ['Google Earth Engine',['Crop intelligence']],
  ['Computer vision',['Infrastructure insight']],
  ['IBM CPLEX / OPL',['Facility decisions']],
  ['SQL, Java, C',['Programming foundations']],
] as const;

export function CareerEvidence(){
  const [active,setActive]=useState(0);
  const [skill,setSkill]=useState(0);
  const project=projects[active];
  return <section className="evidence-suite" aria-labelledby="evidence-title">
    <div className="evidence-heading"><div><span>PROJECT COMMAND CENTER</span><h3 id="evidence-title">Inspect the work.<br/><em>Follow the reasoning.</em></h3></div><p>Select a project to connect its question, evidence, process, and tools.</p></div>
    <div className="command-center">
      <div className="command-tabs" role="tablist" aria-label="Select a project">{projects.map((item,index)=><button key={item.id} type="button" role="tab" aria-selected={active===index} onClick={()=>setActive(index)}><span>{item.number}</span>{item.title}</button>)}</div>
      <div className="command-display" role="tabpanel">
        <div className="command-visual"><div className="command-scanline" aria-hidden="true"/><ProjectVisual kind={project.id}/><span>ILLUSTRATIVE WORKFLOW</span></div>
        <div className="command-copy"><div className="project-status"><project.Icon size={15}/>{project.status}</div><h4>{project.question}</h4><p>{project.evidence}</p><ol>{project.process.map((step,index)=><li key={step}><span>0{index+1}</span>{step}</li>)}</ol><div className="command-skills">{project.skills.map(item=><span key={item}>{item}</span>)}</div><small>{project.note}</small><a href={`#project-${project.id}`}>Open full case study <ArrowUpRight size={16}/></a></div>
      </div>
    </div>
    <div className="evidence-gallery"><div className="gallery-heading"><span>PROJECT MEDIA GALLERY</span><p>Realistic editorial visualizations of each workflow. They explain the project context and do not represent measured results.</p></div><div className="gallery-grid">{projects.map((item,index)=><button key={item.id} type="button" onClick={()=>{setActive(index);document.getElementById('evidence-title')?.scrollIntoView({behavior:'smooth',block:'start'})}}><ProjectVisual kind={item.id}/><span>{item.status}</span><strong>{item.title}</strong><small>View in command center <ExternalLink size={13}/></small></button>)}</div></div>
    <div className="skill-proof"><div><span>SKILLS / EVIDENCE</span><h3>Every tool connects<br/>to a piece of work.</h3><p className="skill-proof__hint">Move over a skill to see where it was used.</p></div><div className="skill-proof__body"><div className="skill-proof__tabs">{skills.map(([name],index)=><button key={name} type="button" aria-pressed={skill===index} onMouseEnter={()=>setSkill(index)} onFocus={()=>setSkill(index)} onClick={()=>setSkill(index)}>{name}</button>)}</div><div className="skill-proof__result" aria-live="polite"><div key={skill} className="skill-proof__reveal"><span>USED IN</span>{skills[skill][1].map(item=><p key={item}><Check size={16}/>{item}</p>)}</div></div></div></div>
  </section>;
}

export function AvailabilityCard(){return <div className="availability-card"><div><span className="availability-dot"/><span>OPEN TO OPPORTUNITIES</span></div><h3>AI/ML, computer vision,<br/>remote sensing & data science.</h3><p>Based in Kolkata and interested in entry-level roles where data, software, and real-world problems meet.</p><a href="#contact">Start a conversation <ArrowUpRight size={17}/></a></div>}

export function ContactForm(){
  const [sent,setSent]=useState(false);
  const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const data=new FormData(event.currentTarget);const subject=encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')||'Not provided'}\n\n${data.get('message')}`);window.location.href=`mailto:krishnendumajumder32@gmail.com?subject=${subject}&body=${body}`;setSent(true)};
  return <form className="contact-form" onSubmit={submit}><div className="contact-form__title"><BriefcaseBusiness size={19}/><span>Send a project or opportunity</span></div><div className="contact-form__row"><label>Name<input name="name" required autoComplete="name"/></label><label>Email<input name="email" type="email" required autoComplete="email"/></label></div><label>Company / organization<input name="company" autoComplete="organization"/></label><label>Message<textarea name="message" required rows={4}/></label><button type="submit"><Mail size={17}/>{sent?'Email app opened':'Prepare email'}</button><small>This opens your email app with the message filled in.</small></form>
}
