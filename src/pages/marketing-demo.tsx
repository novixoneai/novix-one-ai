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
import { setPageMetadata, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from "../lib/seo";

const services = [
  {
    icon: PhoneCall,
    title: "AI voice agents",
    short: "Answer every call",
    tag: "VOICE / 01",
    number: "01",
    accent: "blue",
    description: "They answer calls 24/7, book appointments, answer questions, and capture every lead. Call and qualify leads, asking the right questions, with a warm, human-like voice.",
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
    bullets: ["Clear positioning", "Search-ready structure", "Built for every screen", "SEO, GEO and AEO ready"],
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
  const [form, setForm] = useState({ name: "", email: "", service: "AI voice agents" });

  useEffect(() => {
    // Set page metadata and structured data
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        generateLocalBusinessSchema(),
        generateServiceSchema("AI Voice Agents", "24/7 AI voice agents that answer calls, book appointments, and capture leads for your business."),
        generateServiceSchema("Business Automation", "Automate reminders, follow-ups, intake, scheduling, and repetitive data entry."),
        generateServiceSchema("Custom Web Apps", "Client portals, booking tools, and dashboards designed for your specific workflow."),
        generateServiceSchema("Website Design & SEO", "Fast, search-ready websites that bring in customers and convert visitors."),
        generateFAQSchema(faqs.map(([q, a]) => ({ question: q, answer: a })))
      ]
    };

    setPageMetadata({
      title: "AI Automation Agency Miami | Voice Agents & Business Automation",
      description: "AI automation for Miami small businesses. 24/7 voice agents, appointment booking, and workflow automation. Get a free assessment.",
      ogTitle: "AI Automation Agency Miami | Novix One",
      ogDescription: "AI voice agents and automation solutions for small businesses. Never miss another customer call.",
      ogImage: "https://novixone.co/images/og-image.png",
      canonicalUrl: "https://novixone.co/",
      schema: schema
    });
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Calculator logic
    const calls = document.getElementById("nxcCalls") as HTMLInputElement;
    const value = document.getElementById("nxcValue") as HTMLInputElement;
    const rate = document.getElementById("nxcRate") as HTMLInputElement;

    const callsVal = document.getElementById("nxcCallsVal");
    const valueVal = document.getElementById("nxcValueVal");
    const rateVal = document.getElementById("nxcRateVal");

    const monthlyEl = document.getElementById("nxcMonthly");
    const yearlyEl = document.getElementById("nxcYearly");
    const recoverEl = document.getElementById("nxcRecover");

    if (!calls || !value || !rate) return;

    const RECOVERY = 0.9;
    const WEEKS = 4.33;

    // Build the client-value scale: $100–$10,000 by $100, then $15K/$20K/$25K/$30K.
    const VALUES: number[] = [];
    for (let i = 100; i <= 10000; i += 100) VALUES.push(i);
    [15000, 20000, 25000, 30000].forEach((x) => VALUES.push(x));

    function money(n: number) {
      return "$" + Math.round(n).toLocaleString("en-US");
    }

    function paint(el: HTMLInputElement) {
      const p = ((Number(el.value) - Number(el.min)) / (Number(el.max) - Number(el.min))) * 100;
      el.style.backgroundSize = p + "% 100%";
    }

    function update() {
      const c = Number(calls.value);
      const v = VALUES[Number(value.value)];
      const r = Number(rate.value) / 100;

      if (callsVal) callsVal.textContent = String(c);
      if (valueVal) valueVal.textContent = money(v);
      if (rateVal) rateVal.textContent = rate.value + "%";

      const monthly = c * WEEKS * r * v;
      const yearly = monthly * 12;
      const recover = monthly * RECOVERY;

      if (monthlyEl) monthlyEl.textContent = money(monthly);
      if (yearlyEl) yearlyEl.textContent = money(yearly);
      if (recoverEl) recoverEl.textContent = money(recover) + " / mo";

      [calls, value, rate].forEach(paint);
    }

    [calls, value, rate].forEach((el) => el.addEventListener("input", update));
    update();

    return () => {
      [calls, value, rate].forEach((el) => el.removeEventListener("input", update));
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    setBookingOpen(true);
    fetch("https://jsos.zo.space/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: "novixone_contact_form_en" }),
    }).catch(() => {});
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
          <Reveal><p className="eyebrow"><span className="eyebrow-dot" />Get your time and revenue back.</p></Reveal>
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
              ["Every missed call is money lost.", "Studies show most callers won't leave a voicemail — they call your competitor instead. Our AI answers, qualifies, and books, day or night, so a missed call becomes a booked job."],
              ["Slow follow-up costs you deals.", "Leads contacted within 5 minutes convert far more often than those chased hours later. We respond instantly while interest is hot — and keep prospects moving toward a sale."],
              ["Repetitive admin drains your payroll.", "Every hour your team spends on scheduling, reminders, and intake is an hour you're paying for that doesn't grow the business. We automate it so your people focus on paying clients."],
              ["If customers can't find you, you're paying to be invisible.", "A site that doesn't rank is a marketing budget with nothing to show for it. We build fast, search-ready sites that bring in the right people — and pay for themselves."],
            ].map(([title, body], index) => <Reveal key={title} delay={index * 55}><article className="problem-item"><span className="problem-number">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="calculator-section section-pad">
        <div className="shell">
          <Reveal>
            <div className="nxcalc">
              <h2 className="nxcalc__h1">How much are missed calls <span>costing your firm?</span></h2>
              <p className="nxcalc__sub">Most callers won't leave a voicemail — they call the next firm on the list. Move the sliders to see the revenue slipping away, and what a 24/7 AI could recover.</p>
              <div className="nxcalc__grid">
                {/* Inputs */}
                <div className="nxcalc__card">
                  <h3 className="nxcalc__ct">Your numbers</h3>
                  <div className="nxcalc__field">
                    <label>
                      Calls you miss per week <span className="nxcalc__val" id="nxcCallsVal">5</span>
                    </label>
                    <input type="range" id="nxcCalls" min="1" max="50" defaultValue="5" />
                    <div className="nxcalc__hint">After-hours, busy signals, voicemail, "press 1" menus — anyone who gave up before reaching a person.</div>
                  </div>
                  <div className="nxcalc__field">
                    <label>
                      Value of one new client <span className="nxcalc__val" id="nxcValueVal">$5,000</span>
                    </label>
                    <input type="range" id="nxcValue" min="0" max="103" step="1" defaultValue="49" />
                    <div className="nxcalc__hint">Average revenue from a new case or client. Caps at $30,000.</div>
                  </div>
                  <div className="nxcalc__field">
                    <label>
                      Of those callers, share who'd become clients <span className="nxcalc__val" id="nxcRateVal">30%</span>
                    </label>
                    <input type="range" id="nxcRate" min="5" max="80" step="5" defaultValue="30" />
                    <div className="nxcalc__hint">A conservative estimate of how many were real prospects.</div>
                  </div>
                </div>
                {/* Results */}
                <div className="nxcalc__card nxcalc__result">
                  <h3 className="nxcalc__ct">What it's costing you</h3>
                  <div className="nxcalc__lossrow">
                    <span className="nxcalc__k">Lost revenue per month</span>
                    <span className="nxcalc__big" id="nxcMonthly">$32,475</span>
                  </div>
                  <div className="nxcalc__lossrow">
                    <span className="nxcalc__k">Lost revenue per year</span>
                    <span className="nxcalc__big nxcalc__year" id="nxcYearly">$389,700</span>
                  </div>
                  <div className="nxcalc__divider" />
                  <div className="nxcalc__recover">
                    <div className="nxcalc__k2">Recoverable with 24/7 answering</div>
                    <div className="nxcalc__v" id="nxcRecover">$29,228 / mo</div>
                    <div className="nxcalc__note">Assuming AI answers and books ~90% of the calls you currently miss.</div>
                  </div>
                  <a className="nxcalc__btn" href="#contact">Get your free assessment →</a>
                </div>
              </div>
              <p className="nxcalc__assume">Estimates only, based on the numbers you enter (4.33 weeks per month). Your real figures come out of a free assessment.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="reassurance section-pad">
        <div className="shell">
          <Reveal><h2 className="reassurance-headline">Your team stays.<br />The busywork goes.</h2></Reveal>
          <Reveal delay={80}><p className="reassurance-body">Automation shouldn't cost anyone their job. Our AI takes the after-hours calls, the reminders, and the data entry off your team's plate — so your people spend their hours on customers and the work that actually needs a human. You're not replacing your crew. You're giving them their time back.</p></Reveal>
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
              ['01', 'Tell us what is slowing you down.', 'A free conversation to find the bottlenecks and the highest-value place to start.'],
              ['02', 'We build, automate and launch it.', 'We handle the setup, connections, and keep it running. And explain it without jargon.'],
              ['03', 'Get your time back, cut your costs, and grow revenue.', 'Your system works in the background — answering, booking, and following up — while you focus on customers. Most clients reclaim several hours a week and stop losing leads within the first month.'],
            ].map(([number, title, body], index) => (
              <Reveal key={number} delay={index * 80}>
                <article className={`process-card process-card-${index + 1}`}>
                  <div className="process-card-top"><span className="process-card-number">{number}</span><span className="process-card-label">STEP {number}</span></div>
                  <div className="process-card-rule" />
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <div className="process-card-footer"><span>{index === 0 ? "Start here" : index === 1 ? "We handle it" : "Keep growing"}</span></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="why-grid shell section-pad">
          <Reveal className="why-copy"><p className="section-number">04 / WHY NOVIX ONE</p><h2>Practical AI. <em>Human help.</em></h2><ul className="why-list"><li><Check size={16} /><span><strong>Plain English.</strong> Clear advice, no jargon.</span></li><li><Check size={16} /><span><strong>Built for your business.</strong> We fit the system to your workflow.</span></li><li><Check size={16} /><span><strong>Support after launch.</strong> We stay available as your needs change.</span></li></ul><a className="text-link" href="#contact">See what we can automate <ArrowUpRight size={16} /></a></Reveal>
          <Reveal className="why-art" delay={170}><div className="why-art-ring ring-one" /><div className="why-art-ring ring-two" /><div className="why-art-core"><div className="waveform" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></Reveal>
        </div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="shell faq-grid">
          <Reveal><div><p className="section-number">05 / QUESTIONS</p><h2>Clear answers<br /><em>before you start.</em></h2><p className="faq-intro">No pressure. Just a useful first conversation.</p></div></Reveal>
          <Reveal delay={100}><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></Reveal>
        </div>
      </section>

      <section className="pricing-section section-pad">
        <div className="shell">
          <Reveal><div className="pricing-content"><p className="section-number">PRICING</p><h2>Simple, upfront <em>pricing.</em></h2><p className="pricing-intro">No mystery quotes. Most clients start with a focused system — like 24/7 call answering and booking — starting in the low $2Ks to build, plus a flat monthly fee to keep it running. You get a fixed number before we start. And if the math doesn't work for your business, we'll tell you.</p></div></Reveal>
        </div>
      </section>

      <section className="trust-section section-pad">
        <div className="shell">
          <Reveal><div className="trust-content"><h2>Your customers' information stays <em>protected.</em></h2><p className="trust-body">Handing your calls and intake to AI only works if it's safe — so we built it that way. Data is encrypted and access-controlled. For regulated fields like law and accounting, sensitive details are handled securely and a person on your team reviews every qualified lead before anything moves forward. Trust isn't a feature we added later. It's where we start.</p></div></Reveal>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="shell"><div className="contact-panel">
          <Reveal className="contact-copy"><p className="section-number">06 / START HERE</p><h2>Get your <em>time back.</em></h2><p>Tell us what is slowing the business down. We will show you where AI can help.</p><div className="contact-details"><a href="tel:+18333250830"><PhoneCall size={15} />833-325-0830</a></div></Reveal>
          <Reveal delay={130}>{sent ? <div className="form-success"><div className="success-icon"><Check size={20} /></div><h3>Choose a time that works.</h3><p>Your details are noted. Pick a time on the calendar and we will see you then.</p><button className="button button-primary form-submit" type="button" onClick={() => setBookingOpen(true)}>Open the calendar <ArrowUpRight size={16} /></button><a className="text-link" href="#top">Back to the top <ArrowUpRight size={15} /></a></div> : <form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@company.com" /></label></div><label>Which solution interests you?<select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option>AI voice agents</option><option>Time-saving automations</option><option>Custom web apps</option><option>Beautiful, SEO-ready websites</option><option>Not sure yet</option></select></label><button className="button button-primary form-submit" type="submit">Book my free evaluation <ArrowUpRight size={16} /></button><p className="form-note">45 minutes. One practical next step.</p></form>}          </Reveal>
          {bookingOpen && <div className="booking-modal-backdrop" role="presentation" onClick={() => setBookingOpen(false)}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onClick={(event) => event.stopPropagation()}><div className="booking-modal-header"><div><p className="section-number">BOOKING</p><h3 id="booking-title">Choose a time for your free evaluation.</h3></div><button className="booking-modal-close" type="button" onClick={() => setBookingOpen(false)} aria-label="Close calendar">×</button></div><style>{`
            .cal-embed { --cal-brand-color: #9bc8ed !important; --cal-brand-text-color: #061426 !important; }
          `}</style><iframe src={`https://cal.com/novixone/45min?user=novixone&theme=light&name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}`} title="Schedule your free evaluation" style={{ colorScheme: 'light' }} /></div></div>}
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
