import { ArrowDown, ArrowUpRight, Code2, Users, MapPin, Satellite, Cpu, Network, ArrowRight, Download } from 'lucide-react';
import { SiteExperience } from '@/components/SiteExperience';
import { PhoneReveal } from '@/components/PhoneReveal';
import { ProjectJourney } from '@/components/ProjectJourney';
import { SkillConstellation } from '@/components/SkillConstellation';

import { OrbitalAtlas } from '@/components/OrbitalAtlas';
import { AvailabilityCard, CareerEvidence, ContactForm } from '@/components/CareerEvidence';

const socialLinks = [
  { label:'GitHub', href:'https://github.com/Krishnendumajumder', Icon:Code2 },
  { label:'LinkedIn', href:'https://www.linkedin.com/in/krishnendu-majumder-a376b83a8', Icon:Users },
];
const Label = ({children}:{children:React.ReactNode}) => <div className="eyebrow">{children}</div>;

export default function Home(){return <>
  <SiteExperience/>
  <a className="skip" href="#main">Skip to content</a>
  <header id="top"><a className="brand" href="#home" aria-label="Krishnendu Majumder home">km<span>✳</span></a><nav aria-label="Main navigation">{[['Home','home'],['Work','projects'],['About','about'],['Experience','experience'],['Skills','skills'],['Education','education']].map(([label,id])=><a data-nav key={id} href={`#${id}`}>{label}</a>)}</nav><a className="nav-contact" href="#contact">Let’s connect <ArrowUpRight size={16}/></a></header>
  <div className="scroll-line" aria-hidden="true"/>
  <main id="main">
    <section id="home" data-section className="hero">
      <div className="hero-layout"><div className="hero-copy">
        <Label>PORTFOLIO / EARTH TO ALGORITHM</Label>
        <p className="hero-kicker">KRISHNENDU MAJUMDER / AI & ML DEVELOPER</p>
        <h1><span className="intro-line">Intelligence.</span><br/><span className="intro-line accent-line">In orbit.</span></h1>
        <p className="hero-intro">I turn satellite signals and complex data into intelligent workflows. Exploring the space between <strong>AI, earth observation, and real-world problems.</strong></p>
        <div className="hero-actions"><a className="button" href="#projects">Explore my work <ArrowUpRight size={19}/></a><a className="text-link" href="/Krishnendu-Majumder-CV.pdf" download>Download résumé <Download size={17}/></a><a className="text-link" href="#contact">Get in touch <ArrowRight size={17}/></a></div>
        <div className="hero-location"><MapPin size={14}/> Kolkata, India <span/> Python · Data Science · Geospatial AI</div>
      </div><OrbitalAtlas/></div>
      <div className="hero-footer"><a href="#projects"><span className="scroll-cue"><ArrowDown size={16}/></span> SCROLL TO EXPLORE</a><span>INDEPENDENT THINKING. APPLIED INTELLIGENCE.</span><div>{socialLinks.map(({label,href,Icon})=><a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={18}/></a>)}</div></div>
    </section>

    <div className="discipline-strip rotating-disciplines"><span className="sr-only">Machine learning, AI/ML developer, computer vision.</span><div className="discipline-rotation" aria-hidden="true"><span>MACHINE LEARNING</span><span>AI/ML DEVELOPER</span><span>COMPUTER VISION</span></div></div>
    <section id="projects" data-section className="section work-section"><div className="section-heading"><div><Label>01 / SELECTED WORK</Label><h2>From observation<br/><span>to a decision.</span></h2></div><p>Four projects, explained through their inputs, methods, and outputs.</p></div><ProjectJourney/><CareerEvidence/></section>

    <section id="about" data-section className="section about reveal"><div><Label>02 / THE PERSON BEHIND THE CODE</Label><h2>Grounded in data.<br/><span>Looking further.</span></h2><div className="about-signature">Krishnendu Majumder <span>DEVELOPER & EXPLORER</span></div></div><div className="about-copy"><p className="large-copy">I’m drawn to questions that connect technology with the world outside the screen.</p><p>My computer science background led me to Python, machine learning, and satellite remote sensing. Working on agricultural AI gave that curiosity a practical direction: understanding fields, crop cycles, and the signals hidden in satellite data.</p><p>I enjoy learning by building, whether that means working with geospatial features, exploring computer vision, or modelling a better facility network.</p><div className="about-facts"><div><span>BASED IN</span><strong>Kolkata, India</strong></div><div><span>LANGUAGES</span><strong>English · Hindi · Bengali</strong></div></div></div></section>

    <section id="experience" data-section className="section reveal"><div className="section-heading"><div><Label>03 / EXPERIENCE</Label><h2>Learning in the real world<span>.</span></h2></div><p>From satellite data to software.<br/>Building a practical foundation.</p></div><div className="timeline orbital-timeline"><article><div className="time"><span>INDUSTRY EXPERIENCE</span><strong>6-month paid internship</strong><span>AI / ML · AGRICULTURE</span></div><div><div className="role-mark"><Satellite size={22}/></div><h3>AI/ML Developer Intern</h3><h4>PlanetEye Farm-AI Limited</h4><p>Contributed to AI- and satellite-based agriculture solutions focused on remote sensing, crop monitoring, data analysis, and machine-learning workflows.</p><ul><li>Worked with Sentinel-1 SAR and Sentinel-2 multispectral imagery for agricultural analysis.</li><li>Supported multi-temporal crop classification and prediction using satellite bands and vegetation indices.</li><li>Worked with geospatial KML field data and Google Earth Engine extraction workflows.</li><li>Contributed to precision-agriculture applications focused on crop monitoring.</li></ul><div className="tags"><span>Remote sensing</span><span>Precision agriculture</span><span>Machine learning</span><span>Google Earth Engine</span></div></div></article><article><div className="time"><span>TRAINING</span><strong>Jul — Aug 2024</strong><span>FULL STACK DEVELOPMENT</span></div><div><div className="role-mark"><Cpu size={22}/></div><h3>Full Stack Development in Python</h3><h4>National Institute for Industrial Training, Kolkata</h4><p>Developed a social media platform concept covering profiles, connections, posts, real-time messaging, and moderation. Training included Python frameworks, databases, REST APIs, authentication, WebSockets, and modern frontend technologies.</p><div className="tags"><span>Python</span><span>REST APIs</span><span>WebSockets</span></div></div></article></div><AvailabilityCard/></section>

    <section id="skills" data-section className="section skills-section reveal"><div className="section-heading"><div><Label>04 / TOOLKIT</Label><h2>Connected skills.<br/><span>Broader possibilities.</span></h2></div><p>Explore the connections between<br/>the tools and disciplines I use.</p></div><SkillConstellation/><div className="skill-disciplines"><div><Cpu size={20}/><span>AI & Data Science</span></div><div><Satellite size={20}/><span>Earth Observation</span></div><div><Network size={20}/><span>Mathematical Optimization</span></div></div><p className="foundation-note">Programming foundations: Python, SQL, Java, and C.</p></section>

    <section id="education" data-section className="section education-section reveal"><div><Label>05 / EDUCATION</Label><h2>A foundation<br/>to build on<span>.</span></h2></div><div className="education-list"><article><span>2022 — 2025</span><h3>B.Tech · Computer Science Engineering</h3><p>RCC Institute of Information Technology, Kolkata</p></article><article><span>2019 — 2022</span><h3>Computer Science and Technology</h3><p>Elitte Institute of Engineering & Management, Kolkata</p></article><article><span>2019 / 2017</span><h3>Higher Secondary / Secondary Education</h3><p>Hare School, Kolkata</p></article></div></section>

    <section id="contact" data-section className="contact reveal"><div className="contact-heading"><Label>06 / YOUR NEXT IDEA</Label><span>LET’S MAKE IT HAPPEN</span></div><h2>Good work starts<br/>with a <span>conversation.</span></h2><div className="contact-grid"><div><p>Have an opportunity in AI, data science, or earth observation? I’d love to hear about it.</p><a className="email" href="mailto:krishnendumajumder32@gmail.com">krishnendumajumder32@gmail.com <ArrowUpRight size={23}/></a></div><ContactForm/></div><div className="contact-bottom"><div className="contact-socials">{socialLinks.map(({label,href,Icon})=><a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={18}/>{label}<ArrowUpRight size={15}/></a>)}<PhoneReveal numbers={[{href:'tel:+919038709232',number:'+91 90387 09232',label:'primary phone number'},{href:'tel:+919038959441',number:'+91 90389 59441',label:'alternate phone number'}]}/></div><span><MapPin size={16}/> Kolkata, India</span></div></section>
  </main>
  <footer><a className="brand" href="#home" aria-label="Back to home">km<span>✳</span></a><span>© {new Date().getFullYear()} Krishnendu Majumder</span><a href="#home">Back to top ↑</a></footer>
</>}
