import { FormEvent, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  Menu,
  MessageCircle,
  PhoneCall,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

const services = [
  {
    number: "01",
    tag: "Always on",
    title: "AI voice agents",
    description: "Give every caller a clear, capable first response. Your agent can answer questions, qualify intent, book appointments, and follow up without asking your team to be everywhere at once.",
    bullets: ["Answer every inbound call", "Qualify and route leads", "Book and confirm appointments"],
    icon: PhoneCall,
    accent: "blue",
  },
  {
    number: "02",
    tag: "Less busywork",
    title: "Workflow automation",
    description: "We connect the tools you already rely on and remove the handoffs, copy-paste work, and follow-up gaps that slow a good team down.",
    bullets: ["Automate repetitive tasks", "Connect your existing tools", "Keep work moving after hours"],
    icon: Workflow,
    accent: "aqua",
  },
  {
    number: "03",
    tag: "Made to fit",
    title: "Custom business apps",
    description: "When your workflow does not fit inside another subscription, we build the focused app that does: portals, dashboards, booking systems, and internal tools.",
    bullets: ["Built around your process", "Simple for your team to use", "Ready to grow with you"],
    icon: Bot,
    accent: "silver",
  },
  {
    number: "04",
    tag: "Make an entrance",
    title: "Websites that convert",
    description: "A polished, fast website should make the next step obvious. We pair strong design with clear messaging so more of the right people choose to talk to you.",
    bullets: ["Clearer positioning", "Fast on every screen", "Designed around action"],
    icon: Globe2,
    accent: "champagne",
  },
];

const steps = [
  ["01", "Find the friction", "We start with the calls, tasks, and moments that cost your team the most time or momentum."],
  ["02", "Design the right system", "You get a focused plan built around your customers, your tools, and the way your team actually works."],
  ["03", "Put it to work", "We launch quickly, stay close to the details, and improve the system as real people use it."],
];

const faqs = [
  ["Is this only for large companies?", "No. Novix One is built for growing businesses that need better leverage without adding layers of software or staff."],
  ["Do I need to replace the tools I already use?", "Usually not. We look for the simplest way to connect what is already working and add automation where the gaps are."],
  ["How quickly can we launch?", "Many focused projects can move from first conversation to a live system in two to four weeks. The exact timeline depends on the scope."],
  ["What happens on the first call?", "We will ask what is slowing the business down, map the highest-value opportunity, and tell you plainly what we would do next."],
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Novix One home">
      <img src="/images/novix-one-logo-full.png" alt="Novix One" />
    </a>
  );
}

export default function MarketingDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main id="top" className="novix-site">
      <div className="site-grid" aria-hidden="true" />
      <div className="site-glow" aria-hidden="true" />

      <header className="site-header">
        <Logo />
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#services" onClick={closeMenu}>Services <span>01</span></a>
          <a href="#approach" onClick={closeMenu}>Approach <span>02</span></a>
          <a href="#faq" onClick={closeMenu}>FAQ <span>03</span></a>
          <a href="#contact" onClick={closeMenu}>Start a project <ArrowUpRight size={15} /></a>
        </nav>
        <div className="header-actions">
          <a className="header-email" href="mailto:jorges@novixone.co">jorges@novixone.co</a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <Reveal><p className="kicker"><span className="pulse-dot" /> Miami-based AI partner <span className="slash">/</span> Built for momentum</p></Reveal>
          <Reveal delay={80}><h1>More momentum.<br /><em>Less busywork.</em></h1></Reveal>
          <Reveal delay={160}><p className="hero-intro">Novix One designs AI systems that answer the phone, follow up with leads, connect the tools, and make your digital presence do more.</p></Reveal>
          <Reveal delay={240} className="hero-cta-row">
            <a href="#contact" className="button button-primary">Book a free strategy call <ArrowUpRight size={17} /></a>
            <a href="#services" className="text-link hero-link">See what we build <ArrowDownRight size={16} /></a>
          </Reveal>
          <Reveal delay={320} className="hero-proof">
            <div><strong>24/7</strong><span>when your business needs a response</span></div>
            <div><strong>2–4 wks</strong><span>to launch many focused systems</span></div>
            <div><strong>1:1</strong><span>built around your workflow</span></div>
          </Reveal>
        </div>

        <Reveal className="hero-media" delay={160}>
          <video autoPlay muted loop playsInline poster="/images/novix-one-logo.png" aria-label="Abstract motion graphic representing an AI system">
            <source src="/novix-hero.mp4" type="video/mp4" />
          </video>
          <div className="video-gradient" aria-hidden="true" />
          <div className="visual-rule visual-rule-top" aria-hidden="true" />
          <div className="visual-rule visual-rule-bottom" aria-hidden="true" />
          <div className="video-note"><span className="live-dot" /> AI systems / designed to run</div>
          <div className="video-index"><span>N</span> / 01</div>
          <div className="hero-orbit" aria-hidden="true"><span>Intelligence, in motion</span></div>
        </Reveal>
        <a href="#services" className="hero-side-note"><span>Scroll to explore</span><ArrowDownRight size={16} /></a>
      </section>

      <section className="signal-bar" aria-label="Novix One capabilities">
        <div className="signal-track"><span>AI VOICE</span><i>·</i><span>AUTOMATION</span><i>·</i><span>CUSTOM SOFTWARE</span><i>·</i><span>WEB DESIGN</span><i>·</i><span>AI VOICE</span><i>·</i><span>AUTOMATION</span><i>·</i><span>CUSTOM SOFTWARE</span><i>·</i><span>WEB DESIGN</span></div>
      </section>

      <section className="problem shell section-pad">
        <Reveal><div className="section-heading"><div><p className="section-number">00 <span>/</span> The opportunity</p><h2>The work that keeps you busy is not always the work that <em>moves you forward.</em></h2></div><p className="section-lede">Missed calls. Manual follow-ups. Tools that do not talk to each other. A website that looks fine but asks too much of the visitor.</p></div></Reveal>
        <Reveal delay={100}><div className="opportunity-line"><span>Novix One turns those gaps into a system your business can rely on.</span><a href="#services" className="text-link">Find the right starting point <ArrowUpRight size={16} /></a></div></Reveal>
      </section>

      <section id="services" className="services shell section-pad">
        <Reveal><div className="section-heading"><div><p className="section-number">01 <span>/</span> What we build</p><h2>Practical AI for<br /><em>real businesses.</em></h2></div><p className="section-lede">No off-the-shelf templates. We build the layer that makes your team faster, your customers better supported, and your next step clearer.</p></div></Reveal>
        <div className="service-layout">
          <div className="service-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = index === activeService;
              return <button key={service.number} className={`service-tab ${isActive ? "is-active" : ""}`} onClick={() => setActiveService(index)} aria-pressed={isActive}>
                <span className="service-tab-num">{service.number}</span><span className="service-tab-title">{service.title}</span><ArrowUpRight className="service-tab-arrow" size={18} /><Icon className="service-tab-icon" size={20} />
              </button>;
            })}
          </div>
          <Reveal className={`service-feature accent-${services[activeService].accent}`}>
            {(() => { const service = services[activeService]; const Icon = service.icon; return <>
              <div className="feature-top"><span>{service.tag}</span><Icon size={24} /><span className="feature-count">{service.number} / 04</span></div>
              <h3>{service.title}</h3><p>{service.description}</p>
              <ul>{service.bullets.map((bullet) => <li key={bullet}><Check size={14} />{bullet}</li>)}</ul>
              <a href="#contact" className="text-link">Talk about this service <ArrowUpRight size={16} /></a>
              <div className="feature-watermark">{service.number}</div>
            </>; })()}
          </Reveal>
        </div>
      </section>

      <section id="approach" className="why-section">
        <div className="shell section-pad why-grid">
          <Reveal><div className="why-art"><div className="art-grid" aria-hidden="true" /><div className="art-ring ring-a" /><div className="art-ring ring-b" /><div className="art-core"><Sparkles size={20} /><span>NOVIX</span></div><span className="art-caption">Make room for<br /><em>better work.</em></span></div></Reveal>
          <Reveal delay={120}><div className="why-copy"><p className="section-number">02 <span>/</span> The Novix One approach</p><h2>AI should feel less like a science project and more like a <em>capable teammate.</em></h2><p>We bring the tools and polish of a serious innovation team without the layers, jargon, or six-month implementation. The goal is simple: put useful systems in place and make the work feel lighter.</p><a href="#contact" className="text-link">Bring us the bottleneck <ArrowUpRight size={16} /></a></div></Reveal>
        </div>
        <div className="stats-row shell"><div><strong>24/7</strong><span>Support that keeps moving</span></div><div><strong>2–4 wks</strong><span>From first call to launch</span></div><div><strong>∞</strong><span>Room to grow into</span></div></div>
      </section>

      <section className="process shell section-pad">
        <Reveal><div className="section-heading"><div><p className="section-number">03 <span>/</span> How it works</p><h2>A clear path from friction to <em>leverage.</em></h2></div><p className="section-lede">You do not need another complicated initiative. You need the right next move, made carefully.</p></div></Reveal>
        <div className="steps-grid">{steps.map(([number, title, copy], index) => <Reveal key={number} delay={index * 100}><article className="step"><span className="step-number">{number}</span><div className="step-line" /><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div>
      </section>

      <section id="faq" className="faq-section">
        <div className="shell section-pad faq-grid">
          <Reveal><div><p className="section-number">04 <span>/</span> Good to know</p><h2>Start with a question.<br /><em>Leave with a plan.</em></h2><p className="faq-intro">A first conversation is straightforward, useful, and never a sales performance.</p></div></Reveal>
          <Reveal delay={100}><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></Reveal>
        </div>
      </section>

      <section id="contact" className="contact shell section-pad">
        <Reveal><div className="contact-panel"><div className="contact-copy"><p className="section-number">05 <span>/</span> Get started</p><h2>Bring us the <em>bottleneck.</em></h2><p>Tell us what is slowing the business down. We will map the opportunity, recommend the right first move, and keep the language plain.</p><div className="contact-details"><a href="mailto:jorges@novixone.co"><MessageCircle size={17} />jorges@novixone.co</a><a href="tel:+18333250830"><PhoneCall size={17} />833-325-0830</a></div></div><form className="contact-form" onSubmit={handleSubmit}>{sent ? <div className="form-success"><div className="success-icon"><Check size={22} /></div><h3>Message received.</h3><p>We will get back to you within 24 hours. Thanks for giving us a clear place to start.</p><button type="button" className="text-link" onClick={() => setSent(false)}>Send another note <ArrowUpRight size={16} /></button></div> : <><div className="form-row"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label></div><label>Where can we help?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>AI voice agents</option><option>Workflow automation</option><option>Custom business apps</option><option>Websites that convert</option></select></label><label>Tell us about the bottleneck<textarea name="message" placeholder="What is taking too much time, getting missed, or not working as well as it should?" rows={4} /></label><button className="button button-primary form-submit" type="submit">Start the conversation <ArrowUpRight size={17} /></button></>}</form></div></Reveal>
      </section>

      <footer className="site-footer shell"><Logo /><div className="footer-center"><span>Miami, FL <span className="footer-dot">●</span> Everywhere</span><span>Useful systems for better work.</span></div><div className="footer-links"><a href="#top">Back to top <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© 2026 Novix One. All rights reserved.</span><span>AI. Automated. Elevated.</span></div></footer>

      <a className="floating-call" href="#contact" aria-label="Book a free strategy call"><Clock3 size={17} /><span>Book a free strategy call</span></a>
      {menuOpen && <button className="menu-backdrop" onClick={closeMenu} aria-label="Close navigation" />}
    </main>
  );
}
