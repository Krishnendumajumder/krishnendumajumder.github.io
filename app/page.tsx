import { ArrowDown, ArrowUpRight, Code2, MapPin, Network, RadioTower, ScanLine, Users } from 'lucide-react';
import { SiteExperience } from '@/components/SiteExperience';
import { PhoneReveal } from '@/components/PhoneReveal';

const skills = ['Python','SQL','Data Science','Machine Learning','Artificial Intelligence','Satellite Remote Sensing','Google Earth Engine','Sentinel-1','Sentinel-2','Geospatial Analysis','IBM CPLEX'];
const projects = [
  { n:'01', type:'REMOTE SENSING · MACHINE LEARNING', title:'Reading the earth. Predicting the crop.', name:'Satellite-Based Crop Classification & Prediction', text:'A multi-temporal workflow combining Sentinel-1 SAR and Sentinel-2 multispectral imagery to distinguish crop categories across growth stages.', detail:'Analyzes satellite bands, vegetation indices, and temporal changes in spectral and SAR characteristics to support crop identification and prediction.', tags:['Python','Google Earth Engine','Sentinel-1 & 2'], Icon:ScanLine },
  { n:'02', type:'COMPUTER VISION · INFRASTRUCTURE', title:'A closer look at critical infrastructure.', name:'Transmission Tower Detection & Thermal Distress Monitoring', text:'An infrastructure monitoring workflow for transmission tower detection and condition analysis using RGB, thermal, and 3D information.', detail:'Focuses on thermal anomalies, tower distress, and nearby vegetation growth to support monitoring and maintenance analysis.', tags:['RGB & thermal analysis','3D data','Vegetation monitoring'], Icon:RadioTower },
  { n:'03', type:'MATHEMATICAL OPTIMIZATION', title:'The right location. A better network.', name:'P-Median Facility Location Optimization', text:'A mixed integer programming model for a nine-city network, selecting three warehouses and assigning every customer to exactly one facility.', detail:'Implemented in IBM CPLEX Optimization Studio with OPL, using demand data, inter-city distances, and binary decision variables for facility opening and customer assignments.', tags:['IBM CPLEX','OPL','Mixed Integer Programming'], Icon:Network },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/krishnendu-majumder-a376b83a8', Icon: Users },
  { label: 'GitHub', href: 'https://github.com/Krishnendumajumder', Icon: Code2 },
];

const Label = ({children}:{children:React.ReactNode}) => <div className="eyebrow"><span className="dot"/>{children}</div>;

export default function Home(){return <>
  <SiteExperience/>
  <a className="skip" href="#main">Skip to content</a>
  <header id="top"><a className="brand" href="#home">km<span>.</span></a><nav aria-label="Main navigation">
    {['Home','About','Experience','Skills','Projects','Education','Contact'].map(label=><a data-nav key={label} href={`#${label.toLowerCase()}`}>{label}</a>)}
  </nav><a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={15}/></a></header>
  <div className="scroll-line" aria-hidden="true"/>
  <main id="main">
    <section id="home" data-section className="hero reveal">
      <div className="hero-orbit" aria-hidden="true"/>
      <Label>AI / ML DEVELOPER · KOLKATA, INDIA</Label>
      <p className="hero-kicker">KRISHNENDU MAJUMDER</p>
      <h1>Intelligence,<br/><span>seen from above.</span></h1>
      <div className="hero-bottom"><div><p className="hero-roles">AI/ML Developer <i/> Data Science <i/> Remote Sensing <i/> Geospatial Intelligence</p><p>Building intelligent systems from data, satellites and AI.</p><div className="hero-actions"><a className="button" href="#about">Begin the journey <ArrowDown size={18}/></a><div className="social-links">{socialLinks.map(({label,href,Icon})=><a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Visit Krishnendu Majumder on ${label}`}><Icon size={18}/><span>{label}</span><ArrowUpRight size={13}/></a>)}</div></div></div><div className="hero-note"><span>FOCUS AREAS</span><p>Earth observation<br/>Predictive modeling<br/>Optimization</p></div></div>
      <div className="hero-footer"><span>TECHNICAL PORTFOLIO · 2026</span><span>SCROLL TO TRAVEL ↓</span></div>
    </section>

    <section id="about" data-section className="section about reveal"><div><Label>01 / ABOUT ME</Label><h2>Curious by nature.<br/>Driven to build.</h2></div><div className="glass-copy"><p className="large-copy">A computer science background. A hands-on interest in what data can do.</p><p>I’m an enthusiastic, quick-learning developer with a foundation in Python, Java, C, and SQL. My interests span artificial intelligence, data science, and web development.</p><p>Through my work in agricultural AI and satellite analysis, I’ve explored how technical ideas can support crop monitoring and precision farming. I’m eager to keep learning and contribute to meaningful projects.</p><div className="languages">LANGUAGES <span>English · Hindi · Bengali</span></div></div></section>

    <section id="experience" data-section className="section reveal"><div className="section-heading"><div><Label>02 / EXPERIENCE</Label><h2>Building in the real world.</h2></div><p>Applied AI, satellite data, and software development.</p></div><div className="timeline orbital-timeline"><article><div className="time">6-MONTH PAID INTERNSHIP</div><div><h3>AI/ML Developer Intern</h3><h4>PlanetEye Farm-AI Limited</h4><p>Contributed to AI- and satellite-based agricultural solutions, including remote sensing, crop monitoring, data analysis, and machine-learning workflows.</p><ul><li>Worked with Sentinel-1 SAR and Sentinel-2 multispectral imagery.</li><li>Supported multi-temporal crop classification using satellite bands and vegetation indices.</li><li>Worked with KML field data and Google Earth Engine extraction workflows.</li></ul></div></article><article><div className="time">JUL — AUG 2024</div><div><h3>Full Stack Development in Python</h3><h4>National Institute for Industrial Training, Kolkata</h4><p>Developed a social media platform concept covering profiles, connections, posts, messaging, and moderation. Training included Python backend frameworks, databases, REST APIs, authentication, WebSockets, and modern frontend technologies.</p></div></article></div></section>

    <section id="skills" data-section className="section reveal"><div className="section-heading"><div><Label>03 / CAPABILITIES</Label><h2>A technical constellation.</h2></div><p>Tools and disciplines I use to turn raw data into practical insight.</p></div><div className="skills-grid">{skills.map((skill,index)=><div className="skill-card" key={skill}><span>{String(index+1).padStart(2,'0')}</span><h3>{skill}</h3></div>)}</div></section>

    <section id="projects" data-section className="section reveal"><div className="section-heading"><div><Label>04 / SELECTED WORK</Label><h2>Ideas, applied.</h2></div><p>From agricultural fields to infrastructure networks.</p></div><div className="projects">{projects.map(({n,type,title,name,text,detail,tags,Icon})=><article key={n} className="project"><div className="project-top"><span className="project-number">{n}</span><Icon size={40} strokeWidth={1}/></div><div className="eyebrow">{type}</div><h3>{title}</h3><h4>{name}</h4><p>{text}</p><details><summary>Project approach <span>+</span></summary><p>{detail}</p></details><div className="tags">{tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div></section>

    <section id="education" data-section className="section education-section reveal"><div><Label>05 / EDUCATION</Label><h2>The path so far.</h2></div><div className="education-list"><article><span>2022 — 2025</span><h3>B.Tech · Computer Science Engineering</h3><p>RCC Institute of Information Technology, Kolkata</p></article><article><span>2019 — 2022</span><h3>Computer Science and Technology</h3><p>Elitte Institute of Engineering & Management, Kolkata</p></article><article><span>2019 / 2017</span><h3>Higher Secondary / Secondary Education</h3><p>Hare School, Kolkata</p></article></div></section>

    <section id="contact" data-section className="contact reveal"><Label>06 / FINAL ORBIT · GET IN TOUCH</Label><h2>Let’s build what’s<br/>next<span>.</span></h2><p>Let’s connect about AI, data science, and opportunities to build something useful.</p><a className="email" href="mailto:krishnendumajumder32@gmail.com">krishnendumajumder32@gmail.com <ArrowUpRight/></a><div className="contact-socials">{socialLinks.map(({label,href,Icon})=><a key={label} href={href} target="_blank" rel="noreferrer"><Icon size={20}/><span>{label}</span><ArrowUpRight size={15}/></a>)}</div><div className="contact-bottom"><div className="phone-reveals"><PhoneReveal numbers={[{href:'tel:+919038709232',number:'+91 90387 09232',label:'primary phone number'},{href:'tel:+919038959441',number:'+91 90389 59441',label:'alternate phone number'}]}/></div><span><MapPin size={16}/> Kolkata, India</span></div></section>
  </main>
  <footer><a className="brand" href="#home">km<span>.</span></a><span>© {new Date().getFullYear()} Krishnendu Majumder</span><a href="#home">Back to launch ↑</a></footer>
</>}
