'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, BriefcaseBusiness, Check, ExternalLink, Mail } from 'lucide-react';
import { ProjectVisual } from './ProjectVisual';
import './career-evidence.css';
import './skill-hover.css';
import './project-visual-real.css';
import './commerce-project.css';

const projects = [
  { id:'crop' as const, status:'Internship-related workflow', title:'Crop intelligence' },
  { id:'tower' as const, status:'Project prototype', title:'Infrastructure insight' },
  { id:'network' as const, status:'Academic optimization project', title:'Facility decisions' },
  { id:'commerce' as const, status:'Executed data analysis notebook', title:'Commerce analytics' },
];

const skills = [
  ['Python',['Crop intelligence','Infrastructure insight','Commerce analytics']],
  ['Data analysis',['Commerce analytics']],
  ['Machine learning',['Crop intelligence']],
  ['Google Earth Engine',['Crop intelligence']],
  ['Computer vision',['Infrastructure insight']],
  ['IBM CPLEX / OPL',['Facility decisions']],
  ['SQL, Java, C',['Programming foundations']],
] as const;

export function CareerEvidence(){
  const [skill,setSkill]=useState(0);
  return <section className="evidence-suite" aria-label="Project evidence and skills">
    <div className="evidence-gallery"><div className="gallery-heading"><span>PROJECT MEDIA GALLERY</span><p>Project visuals combine clearly labelled editorial imagery with executed notebook output from the commerce analysis.</p></div><div className="gallery-grid">{projects.map((item)=><a key={item.id} href={`#project-${item.id}`}><ProjectVisual kind={item.id}/><span>{item.status}</span><strong>{item.title}</strong><small>Open case study <ExternalLink size={13}/></small></a>)}</div></div>
    <div className="skill-proof"><div><span>SKILLS / EVIDENCE</span><h3>Every tool connects<br/>to a piece of work.</h3><p className="skill-proof__hint">Move over a skill to see where it was used.</p></div><div className="skill-proof__body"><div className="skill-proof__tabs">{skills.map(([name],index)=><button key={name} type="button" aria-pressed={skill===index} onMouseEnter={()=>setSkill(index)} onFocus={()=>setSkill(index)} onClick={()=>setSkill(index)}>{name}</button>)}</div><div className="skill-proof__result" aria-live="polite"><div key={skill} className="skill-proof__reveal"><span>USED IN</span>{skills[skill][1].map(item=><p key={item}><Check size={16}/>{item}</p>)}</div></div></div></div>
  </section>;
}

export function AvailabilityCard(){return <div className="availability-card"><div><span className="availability-dot"/><span>OPEN TO OPPORTUNITIES</span></div><h3>AI/ML, computer vision,<br/>remote sensing & data science.</h3><p>Based in Kolkata and interested in entry-level roles where data, software, and real-world problems meet.</p><a href="#contact">Start a conversation <ArrowUpRight size={17}/></a></div>}

export function ContactForm(){
  const [sent,setSent]=useState(false);
  const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const data=new FormData(event.currentTarget);const subject=encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')||'Not provided'}\n\n${data.get('message')}`);window.location.href=`mailto:krishnendumajumder32@gmail.com?subject=${subject}&body=${body}`;setSent(true)};
  return <form className="contact-form" onSubmit={submit}><div className="contact-form__title"><BriefcaseBusiness size={19}/><span>Send a project or opportunity</span></div><div className="contact-form__row"><label>Name<input name="name" required autoComplete="name"/></label><label>Email<input name="email" type="email" required autoComplete="email"/></label></div><label>Company / organization<input name="company" autoComplete="organization"/></label><label>Message<textarea name="message" required rows={4}/></label><button type="submit"><Mail size={17}/>{sent?'Email app opened':'Prepare email'}</button><small>This opens your email app with the message filled in.</small></form>
}
