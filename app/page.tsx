import { ArrowDown, ArrowUpRight, Code2, Users, MapPin, Satellite, Cpu, Network, ArrowRight, Download } from 'lucide-react';
import { SiteExperience } from '@/components/SiteExperience';
import { PhoneReveal } from '@/components/PhoneReveal';
import { ProjectJourney } from '@/components/ProjectJourney';
import { SkillConstellation } from '@/components/SkillConstellation';
import { TechnicalStack } from '@/components/TechnicalStack';
import '@/components/technical-stack.css';

import { OrbitalAtlas } from '@/components/OrbitalAtlas';
import { AvailabilityCard, CareerEvidence, ContactForm } from '@/components/CareerEvidence';

const Instagram = ({size=18}:{size?:number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;

const socialLinks = [
  { label:'GitHub', href:'https://github.com/Krishnendumajumder', Icon:Code2 },
  { label:'LinkedIn', href:'https://www.linkedin.com/in/krishnendu-majumder-a376b83a8', Icon:Users },
  { label:'Instagram', href:'https://www.instagram.com/mj_krish2000/', Icon:Instagram },
];
const Label = ({children}:{children:React.ReactNode}) => <div className="eyebrow">{children}</div>;

export default function Home(){return <>
  <SiteExperience/>
  <a className="skip" href="#main">Skip to content</a>
  <header id="top"><a className="brand" href="#home" aria-label="Krishnendu Majumder home">MJ_krish<span>✳</span></a><nav aria-label="Main navigation">{[['Home','home'],['Work','projects'],['About','about'],['Experience','experience'],['Skills','skills'],['Education','education']].map(([label,id])=><a data-nav key={id} href={`#${id}`}>{label}</a>)}</nav><a className="nav-contact" href="#contact">Let’s connect <ArrowUpRight size={16}/></a></header>
  <div className="scroll-line" aria-hidden="true"/>
  <main id="main">
    <section id="home" data-section className="hero">
      <div className="hero-layout"><div className="hero-copy">
        <Label>PORTFOLIO / EARTH TO ALGORITHM</Label>
        <p className="hero-kicker">KRISHNENDU MAJUMDER / AI & ML · DATA ANALYTICS · REMOTE SENSING · COMPUTER VISION</p>
        <h1><span className="intro-line">Intelligence.</span><br/><span className="intro-line accent-line">In orbit.</span></h1>
        <p className="hero-intro">Computer Science graduate building practical workflows across <strong>AI/ML, data analytics, remote sensing, and computer vision.</strong> I turn satellite imagery and complex datasets into structured analysis, models, and decision support.</p>
        <div className="hero-actions"><a className="button" href="#projects">Explore my work <ArrowUpRight size={19}/></a><a className="text-link" href="/Krishnendu-Majumder-CV.pdf" download>Download résumé <Download size={17}/></a><a className="text-link" href="#contact">Get in touch <ArrowRight size={17}/></a></div>
        <div className="hero-location"><MapPin size={14}/> Kolkata, West Bengal <span/> Python · Machine Learning · Data Analytics · Geospatial AI</div>
      </div><OrbitalAtlas/></div>
      <div className="hero-footer"><a href="#projects"><span className="scroll-cue"><ArrowDown size={16}/></span> SCROLL TO EXPLORE</a><span>INDEPENDENT THINKING. APPLIED INTELLIGENCE.</span><div>{socialLinks.map(({label,href,Icon})=><a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={18}/></a>)}</div></div>
    </section>

    <div className="discipline-strip rotating-disciplines"><span className="sr-only">Machine learning, data analytics, computer vision, data visualization, and data, geospatial & optimization.</span><div className="discipline-rotation" aria-hidden="true"><span>MACHINE LEARNING</span><span>DATA ANALYTICS</span><span>COMPUTER VISION</span><span>DATA VISUALIZATION</span><span>DATA, GEOSPATIAL &amp; OPTIMIZATION</span></div></div>
    <section id="projects" data-section className="section work-section"><div className="section-heading"><div><Label>01 / SELECTED WORK</Label><h2>From observation<br/><span>to a decision.</span></h2></div><p>Four projects, explained through their inputs, methods, and outputs.</p></div><ProjectJourney/><CareerEvidence/></section>

    <section id="about" data-section className="section about reveal"><div><Label>02 / PROFESSIONAL PROFILE</Label><h2>Grounded in data.<br/><span>Looking further.</span></h2><div className="about-signature">Krishnendu Majumder <span>AI/ML DEVELOPER</span></div></div><div className="about-copy"><p className="large-copy">Computer Science graduate with hands-on experience in AI/ML, data analytics, remote sensing, and computer vision.</p><p>My work connects Python, exploratory data analysis, feature engineering, model evaluation, data visualization, and satellite-based workflows. At PlanetEye Farm-AI, I work with Sentinel-1/2 imagery, Google Earth Engine, KML field data, crop classification, and infrastructure monitoring.</p><p>I build by following the full path from data preparation and analysis to modelling, evaluation, visualization, and practical decision support.</p><div className="about-facts"><div><span>BASED IN</span><strong>Kolkata, West Bengal</strong></div><div><span>LANGUAGES</span><strong>English · Hindi · Bengali</strong></div></div></div></section>

    <section id="experience" data-section className="section reveal"><div className="section-heading"><div><Label>03 / EXPERIENCE</Label><h2>Applied intelligence<span>.</span></h2></div><p>From satellite data to model evaluation.<br/>Building practical AI workflows.</p></div><div className="timeline orbital-timeline"><article><div className="time"><span>INDUSTRY EXPERIENCE</span><strong>Apr — Oct 2026</strong><span>6-MONTH PAID INTERNSHIP</span></div><div><div className="role-mark"><Satellite size={22}/></div><h3>AI/ML Developer Intern</h3><h4>PlanetEye Farm-AI Limited</h4><p>Working on satellite-based crop classification and infrastructure-monitoring workflows using machine learning, remote sensing, and computer vision.</p><ul><li>Developing multi-temporal crop classification and prediction workflows with Sentinel-1 SAR, Sentinel-2 multispectral imagery, vegetation indices, and Google Earth Engine.</li><li>Using geospatial/KML field data for satellite feature extraction, feature engineering, model evaluation, and classification threshold tuning.</li><li>Contributing to transmission-tower monitoring with object detection, satellite-image enhancement, thermal/LST analysis, and vegetation/NDVI context.</li></ul><div className="tags"><span>Machine learning</span><span>Remote sensing</span><span>Computer vision</span><span>Google Earth Engine</span><span>Model evaluation</span></div></div></article><article><div className="time"><span>CERTIFICATION / TRAINING</span><strong>Jul — Aug 2024</strong><span>FULL STACK DEVELOPMENT</span></div><div><div className="role-mark"><Cpu size={22}/></div><h3>Full Stack Development in Python</h3><h4>National Institute for Industrial Training, Kolkata</h4><p>Completed full-stack development training in Python, covering backend frameworks, databases, REST APIs, authentication, WebSockets, and modern frontend technologies.</p><div className="tags"><span>Python</span><span>Databases</span><span>REST APIs</span><span>WebSockets</span></div></div></article></div><AvailabilityCard/></section>

    <section id="skills" data-section className="section skills-section reveal"><div className="section-heading"><div><Label>04 / TECHNICAL SKILLS</Label><h2>Connected skills.<br/><span>Applied with purpose.</span></h2></div><p>Programming, analytics, machine learning,<br/>computer vision, geospatial tools, and optimization.</p></div><SkillConstellation/><div className="skill-disciplines"><div><Cpu size={20}/><span>AI, ML & Data Analytics</span></div><div><Satellite size={20}/><span>Remote Sensing & Computer Vision</span></div><div><Network size={20}/><span>Geospatial & Optimization</span></div></div><TechnicalStack/></section>

    <section id="education" data-section className="section education-section reveal"><div><Label>05 / EDUCATION</Label><h2>A foundation<br/>to build on<span>.</span></h2></div><div className="education-list"><article><span>2022 — 2025</span><h3>B.Tech · Computer Science Engineering</h3><p>RCC Institute of Information Technology, Kolkata</p></article><article><span>2019 — 2022</span><h3>Diploma · Computer Science & Technology</h3><p>Elitte Institute of Engineering & Management, Kolkata</p></article><article><span>2019 / 2017</span><h3>Higher Secondary / Secondary Education</h3><p>Hare School, Kolkata</p></article></div></section>

    <section id="contact" data-section className="contact reveal"><div className="contact-heading"><Label>06 / YOUR NEXT IDEA</Label><span>LET’S MAKE IT HAPPEN</span></div><h2>Good work starts<br/>with a <span>conversation.</span></h2><div className="contact-grid"><div><p>Have an opportunity in AI, data science, or earth observation? I’d love to hear about it.</p><a className="email" href="mailto:krishnendumajumder32@gmail.com">krishnendumajumder32@gmail.com <ArrowUpRight size={23}/></a></div><ContactForm/></div><div className="contact-bottom"><div className="contact-socials">{socialLinks.map(({label,href,Icon})=><a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={18}/>{label}<ArrowUpRight size={15}/></a>)}<PhoneReveal numbers={[{href:'tel:+919038709232',number:'+91 90387 09232',label:'primary phone number'},{href:'tel:+919038959441',number:'+91 90389 59441',label:'alternate phone number'}]}/></div><span><MapPin size={16}/> Kolkata, India</span></div></section>
  </main>
  <footer><a className="brand" href="#home" aria-label="Back to home">MJ_krish<span>✳</span></a><span>© {new Date().getFullYear()} Krishnendu Majumder</span><a href="#home">Back to top ↑</a></footer>
</>}
