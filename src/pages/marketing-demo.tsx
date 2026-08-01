import { FormEvent, useEffect, useState } from "react";
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
  Plus,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

const services = [
  {
    number: "01",
    eyebrow: "Always on",
    title: "AI Voice Agents",
    description:
      "A sharp, natural voice on the front line of your business—answering, qualifying, booking, and following up while your team gets on with the work.",
    bullets: ["24/7 inbound calls", "Outbound follow-up", "Lead qualification"],
    icon: PhoneCall,
    accent: "coral",
  },
  {
    number: "02",
    eyebrow: "Work, redesigned",
    title: "Automated AI Solutions",
    description:
      "Connect the tools you already use and automate the busywork that keeps your best people stuck in the weeds.",
    bullets: ["Repetitive tasks on autopilot", "On-brand voice chatbots", "Your tools, connected"],
    icon: Workflow,
    accent: "aqua",
  },
  {
    number: "03",
    eyebrow: "Made to fit",
    title: "Custom Business Apps",
    description:
      "Booking systems, client portals, dashboards, and internal tools built around your actual workflow—not someone else’s template.",
    bullets: ["Built around your workflow", "No subscription bloat", "Ready to evolve"],
    icon: Bot,
    accent: "violet",
  },
  {
    number: "04",
    eyebrow: "Make an entrance",
    title: "Beautiful Websites",
    description:
      "Fast, focused digital experiences that make your business look like the leader it already is—and turn attention into action.",
    bullets: ["Custom design, zero templates", "Fast on every screen", "Conversion-minded"],
    icon: Globe2,
    accent: "sun",
  },
];

const steps = [
  ["01", "Listen first", "We get clear on the friction, the opportunity, and the result you actually want."],
  ["02", "Build the right thing", "A focused system, designed around your people, your customers, and your day-to-day."],
  ["03", "Put it to work", "Launch quickly, learn from real use, and keep improving what moves the needle."],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>{children}</div>;
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
      <div className="noise" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />

      <header className="site-header">
        <Logo />
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#services" onClick={closeMenu}>Services <span>02</span></a>
          <a href="#why" onClick={closeMenu}>Why Novix <span>03</span></a>
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
          <Reveal><p className="kicker"><span className="pulse-dot" /> Miami-based AI agency <span className="slash">/</span> Built for momentum</p></Reveal>
          <Reveal delay={80}><h1>Make your business <em>impossible</em> to ignore.</h1></Reveal>
          <Reveal delay={160}><p className="hero-intro">Voice agents that answer calls. Apps built for your workflow. Websites that make you look like the leader you already are.</p></Reveal>
          <Reveal delay={240} className="hero-cta-row">
            <a href="#contact" className="button button-primary">Book a free call <ArrowUpRight size={17} /></a>
            <a href="#services" className="scroll-link"><span className="scroll-icon"><ArrowDownRight size={15} /></span> Explore the work</a>
          </Reveal>
          <Reveal delay={320} className="hero-proof">
            <div><strong>2–4</strong><span>weeks to launch</span></div>
            <div><strong>24/7</strong><span>always on</span></div>
            <div><strong>100%</strong><span>built for you</span></div>
          </Reveal>
        </div>

        <Reveal className="hero-media" delay={180}>
          <div className="media-orbit orbit-one" />
          <div className="media-orbit orbit-two" />
          <div className="video-frame">
            <video autoPlay muted loop playsInline poster="/images/novix-one-logo.png" aria-label="Abstract AI generated visuals">
              <source src="/novix-hero.mp4" type="video/mp4" />
            </video>
            <div className="video-wash" />
            <div className="video-label"><span className="live-dot" /> Intelligence, in motion</div>
            <div className="video-index">N<span>01</span></div>
          </div>
          <div className="hero-sticker"><Sparkles size={16} /><span>AI<br />elevated</span></div>
        </Reveal>
        <a href="#services" className="hero-side-note"><span>Scroll to explore</span><ArrowDownRight size={16} /></a>
      </section>

      <section className="marquee" aria-label="Novix One services">
        <div className="marquee-track"><span>AI VOICE AGENTS</span><i>✳</i><span>AUTOMATED SOLUTIONS</span><i>✳</i><span>CUSTOM APPS</span><i>✳</i><span>BEAUTIFUL WEBSITES</span><i>✳</i><span>AI VOICE AGENTS</span><i>✳</i><span>AUTOMATED SOLUTIONS</span><i>✳</i></div>
      </section>

      <section id="services" className="services shell section-pad">
        <Reveal><div className="section-heading"><div><p className="section-number">01 <span>/</span> What we do</p><h2>Small team.<br /><em>Big leverage.</em></h2></div><p className="section-lede">No off-the-shelf templates. Every solution is built around the way your business actually works.</p></div></Reveal>
        <div className="service-layout">
          <div className="service-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = index === activeService;
              return <button key={service.number} className={`service-tab ${isActive ? "is-active" : ""}`} onClick={() => setActiveService(index)} aria-pressed={isActive}>
                <span className="service-tab-num">{service.number}</span><span className="service-tab-title">{service.title}</span><ArrowUpRight className="service-tab-arrow" size={18} /><Icon className="service-tab-icon" size={21} />
              </button>;
            })}
          </div>
          <Reveal className={`service-feature accent-${services[activeService].accent}`}>
            {(() => { const service = services[activeService]; const Icon = service.icon; return <>
              <div className="feature-top"><span>{service.eyebrow}</span><Icon size={26} /><span className="feature-count">{service.number} / 04</span></div>
              <h3>{service.title}</h3><p>{service.description}</p>
              <ul>{service.bullets.map((bullet) => <li key={bullet}><Check size={15} />{bullet}</li>)}</ul>
              <a href="#contact" className="text-link">Explore this service <ArrowUpRight size={16} /></a>
              <div className="feature-watermark">{service.number}</div>
            </>; })()}
          </Reveal>
        </div>
      </section>

      <section id="why" className="why-section">
        <div className="shell section-pad why-grid">
          <Reveal><div className="why-art"><div className="art-ring ring-a" /><div className="art-ring ring-b" /><div className="art-core">N<span>O</span>VIX</div><span className="art-caption">The future<br />is practical.</span></div></Reveal>
          <Reveal delay={120}><div className="why-copy"><p className="section-number">02 <span>/</span> Why Novix One</p><h2>Big-business AI.<br /><em>Small-business speed.</em></h2><p>We bring the tools, thinking, and polish of a serious innovation team—without the layers, the jargon, or the six-month implementation.</p><a href="#contact" className="text-link">Meet us at the starting line <ArrowUpRight size={16} /></a></div></Reveal>
        </div>
        <div className="stats-row shell"><div><strong>24/7</strong><span>Your AI never sleeps</span></div><div><strong>2–4 wks</strong><span>From first call to live</span></div><div><strong>∞</strong><span>Room to grow into</span></div></div>
      </section>

      <section className="process shell section-pad">
        <Reveal><div className="section-heading"><div><p className="section-number">03 <span>/</span> How it works</p><h2>Clear head.<br /><em>Clean execution.</em></h2></div><p className="section-lede">The best technology feels obvious once it’s in place. We keep the path there simple.</p></div></Reveal>
        <div className="steps-grid">{steps.map(([number, title, copy], index) => <Reveal key={number} delay={index * 100}><article className="step"><span className="step-number">{number}</span><div className="step-line" /><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div>
      </section>

      <section id="contact" className="contact shell section-pad">
        <Reveal><div className="contact-panel"><div className="contact-copy"><p className="section-number">04 <span>/</span> Get started</p><h2>Let’s make<br /><em>something move.</em></h2><p>Tell us what’s slowing your business down. We’ll show you where AI can help—plain language, no pressure.</p><div className="contact-details"><a href="mailto:jorges@novixone.co"><MessageCircle size={17} />jorges@novixone.co</a><a href="tel:+18333250830"><PhoneCall size={17} />833-325-0830</a></div></div><form className="contact-form" onSubmit={handleSubmit}>{sent ? <div className="form-success"><div className="success-icon"><Check size={22} /></div><h3>Message received.</h3><p>We’ll get back to you within 24 hours. In the meantime, the future is looking good.</p><button type="button" className="text-link" onClick={() => setSent(false)}>Send another note <ArrowUpRight size={16} /></button></div> : <><div className="form-row"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label></div><label>What can we help with?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>AI Voice Agents</option><option>Automated AI Solutions</option><option>Custom Business Apps</option><option>Beautiful Websites</option></select></label><label>Tell us a little more<textarea name="message" placeholder="The good stuff..." rows={4} /></label><button className="button button-primary form-submit" type="submit">Start the conversation <ArrowUpRight size={17} /></button></>}</form></div></Reveal>
      </section>

      <footer className="site-footer shell"><Logo /><div className="footer-center"><span>Miami, FL <span className="footer-dot">●</span> Everywhere</span><span>Built with intent, not templates.</span></div><div className="footer-links"><a href="#top">Back to top <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© 2026 Novix One. All rights reserved.</span><span>AI. Automated. Elevated.</span></div></footer>

      <a className="floating-call" href="#contact" aria-label="Book a free call"><Clock3 size={17} /> <span>Book a free call</span></a>
      {menuOpen && <button className="menu-backdrop" onClick={closeMenu} aria-label="Close navigation" />}
    </main>
  );
}
