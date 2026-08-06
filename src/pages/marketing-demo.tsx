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
    description: "Answer calls 24/7, book appointments, answer questions, and capture every lead.",
    bullets: ["Calls answered", "Appointments booked", "Leads captured"],
  },
  {
    icon: Workflow,
    title: "Time-saving automations",
    short: "Give your team hours back",
    tag: "SYSTEMS / 02",
    number: "02",
    accent: "aqua",
    description: "Automate reminders, follow-ups, intake, scheduling, and repetitive data entry.",
    bullets: ["Less admin", "Faster follow-up", "More time for clients"],
  },
  {
    icon: Bot,
    title: "Custom web apps",
    short: "Software that fits",
    tag: "PRODUCT / 03",
    number: "03",
    accent: "silver",
    description: "Get the client portal, booking tool, or dashboard your workflow actually needs.",
    bullets: ["Your workflow", "Your team", "Your next stage"],
  },
  {
    icon: Globe2,
    title: "Websites that get found",
    short: "Turn searches into visits",
    tag: "WEB / 04",
    number: "04",
    accent: "champagne",
    description: "Bring in the right customers with a fast, clear, search-ready website.",
    bullets: ["Clear positioning", "Search-ready structure", "Built for every screen"],
  },
];

const faqs = [
  ["Will this work with my current tools?", "Usually. We connect what works and replace only what does not."],
  ["How quickly can we launch?", "Many focused projects go live in two to four weeks, depending on scope."],
  ["What happens in the free evaluation?", "We identify one high-value problem and show you the simplest next step."],
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
  const [bookingOpen, setBookingOpen] = useState(false);
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
    setBookingOpen(true);
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
          <a href="#problems" onClick={closeMenu}>Your Problems <ArrowUpRight size={14} /></a>
          <a href="#services" onClick={closeMenu}>Our Solutions <ArrowUpRight size={14} /></a>
          <a href="#process" onClick={closeMenu}>The Process <ArrowUpRight size={14} /></a>
          <a href="#contact" onClick={closeMenu}>Contact <ArrowUpRight size={14} /></a>
        </nav>
        <div className="header-right">
          <a href="/es" className="language-link" aria-label="Ver en español"><span className="flag">🇪🇸</span> ES</a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="eyebrow-dot" />AI systems for businesses tired of busywork.</p></Reveal>
          <Reveal delay={80}><h1>Stop losing <em>customers</em><br />to busywork.</h1></Reveal>
          <Reveal delay={150}><p className="hero-intro">We answer your calls, automate admin, and build the digital tools your business needs—without adding another tech project to your plate.</p></Reveal>
          <Reveal delay={220} className="hero-cta-row"><a className="button button-primary" href="#contact">Book a free evaluation <ArrowUpRight size={16} /></a><a className="text-link" href="#services">See how we help <ArrowDownRight size={16} /></a></Reveal>
          <Reveal delay={290}><p className="hero-trust">One practical system. Less work. More growth.</p></Reveal>
          <Reveal className="hero-proof" delay={360}>
            <article className="proof-card"><div className="proof-card-top"><strong>24/7</strong><span className="proof-card-icon"><Clock3 size={20} /></span></div><h3>Answer every call</h3><p>AI handles calls, books appointments, and captures leads when your team is busy.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>2–4 wks</strong><span className="proof-card-icon"><Rocket size={20} /></span></div><h3>Launch without the wait</h3><p>Go from first conversation to a working system in weeks.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>100%</strong><span className="proof-card-icon"><Hammer size={20} /></span></div><h3>Built around you</h3><p>No templates. We fit the tools to your workflow.</p></article>
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
          <Reveal><div className="section-heading"><div><p className="section-number">01 / THE COST OF BUSYWORK</p><h2>Is busywork costing you <em>customers?</em></h2></div><p className="section-lede">Missed calls, slow follow-up, and repetitive admin quietly drain growth.</p></div></Reveal>
          <div className="problem-list">
            {[
              ["Calls go unanswered.", "A missed call is often a missed customer. AI answers, qualifies, and books—even after hours."],
              ["Leads wait too long.", "Fast follow-up wins. We respond while interest is high and keep prospects moving."],
              ["Your team repeats the same work.", "Automate scheduling, reminders, intake, and follow-up so people can focus on clients."],
              ["Customers cannot find you.", "A website that does not show up is not working. We build fast, search-ready sites that bring in the right people."],
            ].map(([title, body], index) => <Reveal key={title} delay={index * 55}><article className="problem-item"><span className="problem-number">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpRight className="problem-arrow" size={19} /></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">02 / SOLUTIONS</p><h2>The work we take <em>off your plate.</em></h2></div><p className="section-lede">Practical AI and digital systems built around how your business runs.</p></div></Reveal>
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
            <div key={activeService} className={`service-feature accent-${services[activeService].accent}`} aria-live="polite">
              {(() => { const service = services[activeService]; const Icon = service.icon; return <>
                <div className="feature-top"><span>{service.tag}</span><Icon size={24} /><span className="feature-count">{service.number} / 04</span></div>
                <h3>{service.title}</h3><p>{service.description}</p>
                <ul>{service.bullets.map((bullet) => <li key={bullet}><Check size={14} />{bullet}</li>)}</ul>
                <a href="#contact" className="text-link">Talk about this service <ArrowUpRight size={16} /></a>
                <div className="feature-watermark">{service.number}</div>
              </>; })()}
            </div>
          </div>
        </div>
      </section>

      <section className="process section-pad" id="process">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">03 / THE SIMPLE PROCESS</p><h2>From pain point to <em>working system.</em></h2></div><p className="section-lede">Start with one problem. We handle the rest.</p></div></Reveal>
          <div className="process-grid">
            {[
              ['01', 'Tell us what is slowing you down.', 'A free conversation finds the highest-value place to start.'],
              ['02', 'We build and launch it.', 'We handle the setup and explain it without jargon.'],
              ['03', 'Get your time back.', 'Your system works in the background while you focus on customers.'],
            ].map(([number, title, body], index) => (
              <Reveal key={number} delay={index * 80}>
                <article className={`process-card process-card-${index + 1}`}>
                  <div className="process-card-top"><span className="process-card-number">{number}</span><span className="process-card-label">STEP {number}</span></div>
                  <div className="process-card-rule" />
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <div className="process-card-footer"><span>{index === 0 ? "Start here" : index === 1 ? "We handle it" : "Keep growing"}</span><ArrowUpRight size={18} /></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="why-grid shell section-pad">
          <Reveal className="why-copy"><p className="section-number">04 / WHY NOVIX ONE</p><h2>Practical AI. <em>Human help.</em></h2><ul className="why-list"><li><Check size={16} /><span><strong>Plain English.</strong> Clear advice, no jargon.</span></li><li><Check size={16} /><span><strong>Built for your business.</strong> We fit the system to your workflow.</span></li><li><Check size={16} /><span><strong>Support after launch.</strong> We stay available as your needs change.</span></li></ul><a className="text-link" href="#contact">See what we can automate <ArrowUpRight size={16} /></a></Reveal>
          <Reveal className="why-art" delay={170}><div className="why-art-ring ring-one" /><div className="why-art-ring ring-two" /><div className="why-art-core"><Sparkles size={22} /></div></Reveal>
        </div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="shell faq-grid">
          <Reveal><div><p className="section-number">05 / QUESTIONS</p><h2>Clear answers<br /><em>before you start.</em></h2><p className="faq-intro">No pressure. Just a useful first conversation.</p></div></Reveal>
          <Reveal delay={100}><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></Reveal>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="shell"><div className="contact-panel">
          <Reveal className="contact-copy"><p className="section-number">06 / START HERE</p><h2>Get your <em>time back.</em></h2><p>Tell us what is slowing the business down. We will show you where AI can help.</p><div className="contact-details"><a href="tel:+18333250830"><PhoneCall size={15} />833-325-0830</a></div></Reveal>
          <Reveal delay={130}>{sent ? <div className="form-success"><div className="success-icon"><Check size={20} /></div><h3>Choose a time that works.</h3><p>Your details are noted. Pick a time on the calendar and we will see you then.</p><button className="button button-primary form-submit" type="button" onClick={() => setBookingOpen(true)}>Open the calendar <ArrowUpRight size={16} /></button><a className="text-link" href="#top">Back to the top <ArrowUpRight size={15} /></a></div> : <form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@company.com" /></label></div><label>Which solution interests you?<select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option>AI voice agents</option><option>Time-saving automations</option><option>Custom web apps</option><option>Beautiful, SEO-ready websites</option><option>Not sure yet</option></select></label><label>Tell us a little more<textarea rows={3} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="The more context, the better." /></label><button className="button button-primary form-submit" type="submit">Book my free evaluation <ArrowUpRight size={16} /></button><p className="form-note">45 minutes. One practical next step.</p></form>}          </Reveal>
          {bookingOpen && <div className="booking-modal-backdrop" role="presentation" onClick={() => setBookingOpen(false)}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onClick={(event) => event.stopPropagation()}><div className="booking-modal-header"><div><p className="section-number">BOOKING</p><h3 id="booking-title">Choose a time for your free evaluation.</h3></div><button className="booking-modal-close" type="button" onClick={() => setBookingOpen(false)} aria-label="Close calendar">×</button></div><style>{`
            .cal-embed { --cal-brand-color: #9bc8ed !important; --cal-brand-text-color: #061426 !important; }
          `}</style><iframe src="https://cal.com/novixone/45min?user=novixone&theme=light" title="Schedule your free evaluation" style={{ colorScheme: 'light' }} /></div></div>}
        </div></div>
      </section>

      <section className="quote-section section-pad">
        <div className="shell">
          <Reveal><div className="quote-block"><div className="quote-mark">“</div><blockquote>AI should give your business time back—not create more work.</blockquote><p>Start with one practical win.</p></div></Reveal>
        </div>
      </section>

      <footer className="site-footer shell"><Logo /><div className="footer-center"><span>Miami, FL <span className="footer-dot">●</span> Everywhere</span><span>More time. Less busywork.</span></div><div className="footer-links"><a href="#top">Back to top <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© 2026 Novix One.</span><span>AI for the work that matters.</span></div></footer>

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
