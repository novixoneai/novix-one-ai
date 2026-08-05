import { FormEvent, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  Hammer,
  Menu,
  MessageCircle,
  PhoneCall,
  Rocket,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

const services = [
  {
    icon: PhoneCall,
    title: "AI voice agents",
    short: "Answer every call",
    tag: "VOICE / 01",
    number: "01",
    accent: "blue",
    description: "A friendly, natural-sounding AI picks up around the clock — booking appointments, answering common questions, and capturing every lead, even when your team is busy or the office is closed.",
    bullets: ["Appointments booked", "Questions answered", "Leads captured"],
  },
  {
    icon: Workflow,
    title: "Time-saving automations",
    short: "Give your team hours back",
    tag: "SYSTEMS / 02",
    number: "02",
    accent: "aqua",
    description: "Reminders, follow-ups, scheduling, invoicing, intake, data entry — if it is repetitive, we automate it. Your team gets its hours back for the work that actually needs a human.",
    bullets: ["Less admin", "Fewer dropped handoffs", "More time for people"],
  },
  {
    icon: Bot,
    title: "Custom web apps",
    short: "Software that fits",
    tag: "PRODUCT / 03",
    number: "03",
    accent: "silver",
    description: "A booking system, client portal, intake tool, or internal dashboard — whatever off-the-shelf software cannot quite do, we build to fit exactly how your business runs.",
    bullets: ["Your workflow", "Your team", "Your next stage"],
  },
  {
    icon: Globe2,
    title: "Beautiful, SEO-ready websites",
    short: "Turn searches into visits",
    tag: "WEB / 04",
    number: "04",
    accent: "champagne",
    description: "Fast, gorgeous sites that look great on every phone and climb the search rankings — so customers already looking for what you do land on you first.",
    bullets: ["Clear positioning", "Search-ready structure", "Built for every screen"],
  },
];

const faqs = [
  ["Is this only for large companies?", "No. Novix One is built for small businesses and professional offices that need better leverage without adding layers of software or staff."],
  ["Do I need to replace the tools I already use?", "Usually not. We look for the simplest way to connect what is already working and add automation where the gaps are."],
  ["How quickly can we get started?", "Many focused projects can move from first conversation to a live system in two to four weeks. The exact timeline depends on the scope."],
  ["What happens in the free evaluation?", "We will ask what is slowing the business down, map the easiest win, and tell you plainly what we would do next. No jargon and no sales performance."],
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

function Logo() {
  return <a className="brand" href="#top" aria-label="Novix One home"><img src="/images/novix-one-logo-full.png" alt="Novix One" /></a>;
}

export default function MarketingDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "AI voice agents", message: "" });

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
    <main className="novix-site" style={themeVars}>
      <div className="site-grid" aria-hidden="true" />
      <div className="site-glow" aria-hidden="true" />

      <header className="site-header">
        <Logo />
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#problems" onClick={closeMenu}>The problems <ArrowUpRight size={14} /></a>
          <a href="#services" onClick={closeMenu}>What we do <ArrowUpRight size={14} /></a>
          <a href="#process" onClick={closeMenu}>How it works <ArrowUpRight size={14} /></a>
          <a href="#contact" onClick={closeMenu}>Contact <ArrowUpRight size={14} /></a>
        </nav>
        <div className="header-right"><button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="eyebrow-dot" />More time growing your business. Less time managing it.</p></Reveal>
          <Reveal delay={80}><h1>Stop losing <em>time,</em><br />calls, and customers<br />to the busywork.</h1></Reveal>
          <Reveal delay={150}><p className="hero-intro">Novix One helps small businesses and professional offices put AI to work — answering your phones, handling repetitive tasks, and building websites and tools that actually bring people through the door. No tech team required. No jargon. Just help that finally feels like it is on your side.</p></Reveal>
          <Reveal delay={220} className="hero-cta-row"><a className="button button-primary" href="#contact">Book a free evaluation <ArrowUpRight size={16} /></a><a className="text-link" href="#services">See what we build <ArrowDownRight size={16} /></a></Reveal>
          <Reveal delay={290}><p className="hero-trust">Real people, real results, and AI that pays for itself.</p></Reveal>
          <Reveal className="hero-proof" delay={360}>
            <article className="proof-card"><div className="proof-card-top"><strong>24/7</strong><span className="proof-card-icon"><Clock3 size={20} /></span></div><h3>Always On</h3><p>Your AI never sleeps. Calls answered, the repetitive stuff handled — automatically, and appointments booked — even on weekends and holidays.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>2–4 wks</strong><span className="proof-card-icon"><Rocket size={20} /></span></div><h3>Fast Launch</h3><p>From first call to live in weeks, not months. You will see real results before the quarter ends — that is the standard we hold ourselves to.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>100%</strong><span className="proof-card-icon"><Hammer size={20} /></span></div><h3>Built For You</h3><p>No templates, no cookie-cutter software. Everything is designed around your business, your customers, and your goals.</p></article>
          </Reveal>
        </div>
        <Reveal className="hero-media" delay={180}>
          <div className="video-index">/ 01 — A BETTER WAY TO WORK</div>
          <div className="hero-orbit" />
          <video autoPlay loop muted playsInline poster="/images/novix-one-logo-full.png"><source src="/novix-hero.mp4" type="video/mp4" /></video>
          <div className="video-note"><span className="live-dot" />always on, never robotic</div>
        </Reveal>
      </section>

      <div className="signal-strip"><div className="signal-track"><span>Voice agents</span><i>✳</i><span>Smart automations</span><i>✳</i><span>Custom apps</span><i>✳</i><span>Websites that get found</span><i>✳</i><span>Voice agents</span><i>✳</i><span>Smart automations</span><i>✳</i></div></div>

      <section className="problem section-pad" id="problems">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">01 / THE PROBLEMS WE FIX</p><h2>Sound <em>familiar?</em></h2></div><p className="section-lede">You did not open your business to become a full-time administrator. Let us fix that.</p></div></Reveal>
          <div className="problem-list">
            {[
              ["The phone rings while you are with a client.", "So it goes to voicemail. Half those callers never call back — they just call the next name on the list. Every missed call is a customer you will never know you lost."],
              ["Your front desk is drowning.", "Scheduling, reminders, intake forms, follow-ups, rescheduling the no-shows. Your team spends more time on admin than on the people who actually walked in."],
              ["Leads go cold before you can reply.", "Someone fills out your form at 7pm. You see it the next morning. By then they have already booked with someone who answered faster."],
              ["The same tasks eat your week, every week.", "Invoicing, data entry, copy-pasting between tools, chasing paperwork. Hours that should go to your clients or your family disappear into the routine."],
              ["Your website looks fine — but nobody finds it.", "A pretty site is useless if it does not show up when someone searches for what you do. You are invisible to the customers who are looking for you right now."],
            ].map(([title, body], index) => <Reveal key={title} delay={index * 55}><article className="problem-item"><span className="problem-number">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpRight className="problem-arrow" size={19} /></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">02 / WHAT WE DO</p><h2>Four ways we take work <em>off your plate.</em></h2></div><p className="section-lede">Practical systems for the parts of the business that should not depend on one person remembering to do them.</p></div></Reveal>
          <div className="service-layout">
            <div className="service-list">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = index === activeService;
                return <button key={service.title} className={`service-tab ${isActive ? "is-active" : ""}`} onClick={() => setActiveService(index)} aria-pressed={isActive}>
                  <span className="service-tab-num">{index + 1}</span><span className="service-tab-title">{service.title}</span><ArrowUpRight className="service-tab-arrow" size={18} /><Icon className="service-tab-icon" size={20} />
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
        </div>
      </section>

      <section className="process section-pad" id="process">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">03 / HOW IT WORKS</p><h2>Getting started could not be <em>easier.</em></h2></div><p className="section-lede">A simple first win, built around your business and explained in plain English.</p></div></Reveal>
          <div className="process-grid">
            {[['01', 'A friendly chat', 'Tell us where your time and leads are leaking. We will listen and point out the easiest, highest-impact place to start — no pressure, no cost.'], ['02', 'We build it for you', 'We design everything around your business, set it all up, and walk you through it in plain English. You do not touch the tech.'], ['03', 'You get your time back', 'Your phone gets answered, your admin runs itself, and new customers find you online — while you focus on the work and people that matter. We stay on to keep it all running smoothly.']].map(([number, title, body], index) => <Reveal key={number} delay={index * 80}><article className={`process-card process-card-${index + 1}`}><div className="process-card-top"><span className="process-card-number">{number}</span><span className="process-card-label">STEP {number}</span></div><div className="process-card-rule" /><h3>{title}</h3><p>{body}</p><div className="process-card-footer"><span>Novix One process</span><ArrowUpRight size={18} /></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="why-grid shell section-pad">
          <Reveal className="why-copy"><p className="section-number">04 / WHY NOVIX ONE</p><h2>The AI partner that actually feels <em>human.</em></h2><ul className="why-list"><li><Check size={16} /><span><strong>We speak your language.</strong> No acronyms, no lectures — just clear answers from a team that is happy to help.</span></li><li><Check size={16} /><span><strong>We are built for small businesses and offices.</strong> Everything is sized and priced for you, not for a corporation.</span></li><li><Check size={16} /><span><strong>We start small and prove it works.</strong> You will see the difference before you ever commit to more.</span></li><li><Check size={16} /><span><strong>We stick around.</strong> When you have a question, a real person answers — and your tools keep getting better as you grow.</span></li></ul><a className="text-link" href="#contact">See what you could get back <ArrowUpRight size={16} /></a></Reveal>
          <Reveal className="why-art" delay={170}><div className="why-art-ring ring-one" /><div className="why-art-ring ring-two" /><div className="why-art-core"><Sparkles size={22} /></div></Reveal>
        </div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="shell faq-grid">
          <Reveal><div><p className="section-number">05 / GOOD TO KNOW</p><h2>Start with a question.<br /><em>Leave with a plan.</em></h2><p className="faq-intro">A first conversation is straightforward, useful, and never a sales performance.</p></div></Reveal>
          <Reveal delay={100}><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></Reveal>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="shell"><div className="contact-panel">
          <Reveal className="contact-copy"><p className="section-number">06 / GET STARTED</p><h2>Win back the hours<br /><em>that grow your business.</em></h2><p>You do not need to become a tech expert or spend a fortune. You just need a partner who has done this before. Tell us what is slowing you down, and we will show you the simplest place to start.</p><div className="contact-details"><a href="mailto:jorges@novixone.co"><MessageCircle size={15} />jorges@novixone.co</a><a href="tel:+18333250830"><PhoneCall size={15} />833-325-0830</a></div></Reveal>
          <Reveal delay={130}>{sent ? <div className="form-success"><div className="success-icon"><Check size={20} /></div><h3>We will be in touch.</h3><p>Thanks for reaching out. A real person from Novix One will follow up shortly.</p><a className="text-link" href="#top">Back to the top <ArrowUpRight size={15} /></a></div> : <form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@company.com" /></label></div><label>What is slowing you down?<select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option>AI voice agents</option><option>Time-saving automations</option><option>Custom web apps</option><option>Beautiful, SEO-ready websites</option><option>Not sure yet</option></select></label><label>Tell us a little more<textarea rows={3} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="The more context, the better." /></label><button className="button button-primary form-submit" type="submit">Book your free evaluation <ArrowUpRight size={16} /></button><p className="form-note">Thirty relaxed minutes that could save you dozens of hours a month.</p></form>}          </Reveal>
        </div></div>
      </section>

      <section className="quote-section section-pad">
        <div className="shell">
          <Reveal><div className="quote-block"><div className="quote-mark">“</div><blockquote>AI is rolling in like a tidal wave. The businesses that learn to ride it now will pull years ahead of the ones still watching from the shore.</blockquote><p>The offices and small businesses adopting AI today are not doing anything superhuman — they are just letting the right tools handle the parts that were slowing them down. You can do the same, starting with one simple win.</p></div></Reveal>
        </div>
      </section>

      <footer className="site-footer shell"><Logo /><div className="footer-center"><span>Miami, FL <span className="footer-dot">●</span> Everywhere</span><span>More time for what moves the business.</span></div><div className="footer-links"><a href="#top">Back to top <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© 2026 Novix One. All rights reserved.</span><span>AI. Automated. Elevated.</span></div></footer>

      <a className="floating-call" href="#contact" aria-label="Book a free evaluation"><Clock3 size={17} /><span>Book a free evaluation</span></a>
      {menuOpen && <button className="menu-backdrop" onClick={closeMenu} aria-label="Close navigation" />}
    </main>
  );
}

const themeVars = {
  "--page-bg": "#061426",
  "--page-ink": "#f2f5f9",
  "--page-muted": "#9aa8b7",
  "--page-blue": "#9bc8ed",
  "--page-aqua": "#86d5d0",
  "--page-champagne": "#e5cda0",
} as CSSProperties;
