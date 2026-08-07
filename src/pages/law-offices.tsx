import { FormEvent, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Check,
  MessageSquare,
  Menu,
  Phone,
  Shield,
  Globe2,
  X,
} from "lucide-react";

const solutions = [
  {
    icon: Phone,
    title: "Answers every call, 24/7",
    tag: "VOICE / 01",
    number: "01",
    accent: "blue",
    description: "No more voicemail, no after-hours gaps, no robotic phone tree. Every caller reaches a warm, natural-sounding agent that's hard to tell from a real person — nights, weekends, holidays.",
    bullets: ["Sounds human", "Never sleeps", "No robotic menus"],
  },
  {
    icon: Globe2,
    title: "Fluent in English and Spanish",
    tag: "LANGUAGE / 02",
    number: "02",
    accent: "aqua",
    description: "Built for Miami. Your callers get help in the language they're comfortable in, instantly.",
    bullets: ["Seamless switching", "Every caller understood", "No language lost cases"],
  },
  {
    icon: Calendar,
    title: "Qualifies and books consults",
    tag: "INTAKE / 03",
    number: "03",
    accent: "champagne",
    description: "Asks the right intake questions, screens for your practice areas, and drops booked consults right onto your calendar.",
    bullets: ["Smart intake", "Practice-area screening", "Straight to your calendar"],
  },
  {
    icon: MessageSquare,
    title: "Instant text follow-up",
    tag: "FOLLOW-UP / 04",
    number: "04",
    accent: "silver",
    description: "Every lead gets an immediate text, so the ones who don't book on the first call don't disappear.",
    bullets: ["Immediate text", "Warm leads stay warm", "Nothing falls through"],
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

function Logo() {
  return <a className="brand" href="/law-offices" aria-label="Novix One home"><img src="/images/novix-one-logo-full.png" alt="Novix One" /></a>;
}

export default function LawOffices() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="novix-site" style={themeVars}>
      <style>{`
        .problem-narrative { display: flex; flex-direction: column; gap: 18px; max-width: 900px; margin: 0 0 56px; }
        .problem-narrative p { margin: 0; color: var(--muted); font-size: 17px; line-height: 1.7; letter-spacing: 0; }
        .problem-narrative p strong { color: var(--ink); }
        .problem-highlight { color: var(--champagne) !important; font-family: var(--font-display); font-style: italic; font-size: 20px !important; line-height: 1.5 !important; }
        .cost-section { background: #0f3459; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .cost-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 60px; align-items: center; }
        .cost-lede { max-width: 520px; margin-top: 22px; }
        .cost-figure { display: flex; justify-content: center; }
        .cost-card { min-height: auto; padding: 46px 40px; text-align: center; }
        .cost-card strong { display: block; margin-bottom: 14px; font-size: clamp(2.6rem, 4.5vw, 3.6rem); }
        .cost-card h3 { margin: 0 0 10px; color: #102d56; font-size: 13px; letter-spacing: .06em; text-transform: uppercase; }
        .cost-card p { margin: 0; color: #435674; font-size: 16px; }
        .desk-art img { width: 100%; height: auto; display: block; border-radius: 16px; border: 1px solid rgba(216,228,241,.28); box-shadow: 0 22px 60px rgba(4,18,34,.35); }
        @media (max-width: 820px) { .cost-grid { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
      <div className="site-grid" aria-hidden="true" />
      <div className="site-glow" aria-hidden="true" />

      <header className="site-header">
        <Logo />
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#problem" onClick={closeMenu}>The Problem <ArrowUpRight size={14} /></a>
          <a href="#solution" onClick={closeMenu}>The Solution <ArrowUpRight size={14} /></a>
          <a href="#desk" onClick={closeMenu}>The Desk <ArrowUpRight size={14} /></a>
        </nav>
        <div className="header-right">
          <a href="/" className="language-link" aria-label="Back to Novix One home">← Novix One</a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="eyebrow-dot" />For Miami law firms.</p></Reveal>
          <Reveal delay={80}><h1>Every missed call is a signed case <em>walking to your competitor.</em></h1></Reveal>
          <Reveal delay={150}><p className="hero-intro">Novix One answers every call with a voice so natural your clients won't know it isn't human — day or night, in English and Spanish. It qualifies the lead, books the consult, and drops it straight into a custom Appointment &amp; Messages desk your front desk will love. Built to meet Florida Bar confidentiality standards, with a human reviewing anything client-facing.</p></Reveal>
          <Reveal delay={220} className="hero-cta-row"><button className="button button-primary" onClick={() => setBookingOpen(true)}>Get your free intake audit <ArrowUpRight size={16} /></button><a className="text-link" href="#solution">Hear it yourself — you won't believe it's AI <ArrowDownRight size={16} /></a></Reveal>
          <Reveal className="hero-proof" delay={360}>
            <article className="proof-card"><div className="proof-card-top"><strong>FL Bar</strong><span className="proof-card-icon"><Shield size={20} /></span></div><h3>Confidentiality built in</h3><p>Florida Bar–conscious confidentiality, with a human reviewing anything client-facing.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>100%</strong><span className="proof-card-icon"><Phone size={20} /></span></div><h3>Sounds human</h3><p>Indistinguishably human — your clients won't know it isn't a person.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>30-day</strong><span className="proof-card-icon"><Calendar size={20} /></span></div><h3>Paid pilot</h3><p>No annual contract. Prove us out first, then decide.</p></article>
          </Reveal>
        </div>
        <Reveal className="hero-media" delay={180}>
          <div className="video-index">/ 01 — NEVER MISS A CALL AGAIN</div>
          <div className="hero-orbit" />
          <video autoPlay loop muted playsInline poster="/images/novix-one-logo-full.png"><source src="/novix-hero.mp4" type="video/mp4" /></video>
          <div className="video-note"><span className="live-dot" />answers 24/7, in English &amp; Spanish</div>
        </Reveal>
      </section>

      <div className="signal-strip"><div className="signal-track"><span>Personal Injury</span><i>✳</i><span>Immigration</span><i>✳</i><span>Criminal Defense</span><i>✳</i><span>Family Law</span><i>✳</i><span>Personal Injury</span><i>✳</i><span>Immigration</span><i>✳</i></div></div>

      <section className="problem section-pad" id="problem">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">01 / THE PROBLEM</p><h2>You're paying to make the phone ring. <em>Who's answering it?</em></h2></div><p className="section-lede">You spend thousands a month on ads, referrals, and SEO to generate one thing: the phone call. If you don't pick up, someone else signs them.</p></div></Reveal>

          <Reveal delay={60}>
            <div className="problem-narrative">
              <p>You spend thousands a month on ads, referrals, and SEO to generate one thing: <strong>the phone call</strong>. But when a prospective client finally dials, you're in court. In a deposition. With another client. So the call goes to voicemail.</p>
              <p className="problem-highlight">And here's what happens next: they hang up and call the next firm on Google.</p>
              <p>Prospective clients don't leave voicemails and wait. Especially not in personal injury, immigration, criminal defense, or family law — where the person calling needs help <strong>today</strong>. If you don't pick up, someone else signs them.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="stats-row">
              <div><strong>1 in 3</strong><span>calls to law firms go unanswered.</span></div>
              <div><strong>8 in 10</strong><span>callers won't leave a voicemail — they call a competitor instead.</span></div>
              <div><strong>$5K–$50K+</strong><span>the value of a single missed PI or immigration case.</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cost-section section-pad">
        <div className="shell cost-grid">
          <Reveal>
            <p className="section-number">— THE COST</p>
            <h2>Do the math on what's <em>slipping through.</em></h2>
            <p className="section-lede cost-lede">Say your firm gets 100 new-client calls a month and misses 20 of them. If just one of those would have signed a $7,500 case, that adds up fast. Not lost to a weak marketing campaign. Lost to a voicemail box. You already paid to generate those calls — Novix One makes sure you actually capture them.</p>
          </Reveal>
          <Reveal delay={140} className="cost-figure">
            <article className="proof-card cost-card">
              <strong>$90,000</strong>
              <h3>walking out the door every year</h3>
              <p>One missed call at a time.</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="services section-pad" id="solution">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">02 / THE SOLUTION</p><h2>An AI intake agent that never misses, never sleeps, <em>and speaks your clients' language.</em></h2></div><p className="section-lede">Novix One is a 24/7 AI receptionist built specifically for law firms. It answers instantly, sounds natural, qualifies the caller, and books the consultation straight into your calendar — then follows up by text so warm leads never go cold. Everything client-facing is backed by human review, so you're never handing your clients to a machine alone.</p></div></Reveal>
          <div className="service-layout">
            <div className="service-list">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                const isActive = index === activeSolution;
                return <button key={solution.title} className={`service-tab ${isActive ? "is-active" : ""}`} onClick={() => setActiveSolution(index)} aria-pressed={isActive}>
                  <span className="service-tab-num">{index + 1}</span><span className="service-tab-title">{solution.title}</span><ArrowUpRight className="service-tab-arrow" size={18} /><Icon className="service-tab-icon" size={20} />
                </button>;
              })}
            </div>
            <div key={activeSolution} className={`service-feature accent-${solutions[activeSolution].accent}`} aria-live="polite">
              {(() => { const solution = solutions[activeSolution]; const Icon = solution.icon; return <>
                <div className="feature-top"><span>{solution.tag}</span><Icon size={24} /><span className="feature-count">{solution.number} / 04</span></div>
                <h3>{solution.title}</h3><p>{solution.description}</p>
                <ul>{solution.bullets.map((bullet) => <li key={bullet}><Check size={14} />{bullet}</li>)}</ul>
                <div className="feature-watermark">{solution.number}</div>
              </>; })()}
            </div>
          </div>
        </div>
      </section>

      <section className="why-section" id="desk">
        <div className="why-grid shell section-pad">
          <Reveal className="why-copy">
            <p className="section-number">— INCLUDED</p>
            <h2>The Appointment &amp; Messages <em>Desk.</em></h2>
            <p>Answering the call is half the job. The other half is what happens next. Every firm gets a custom Appointment &amp; Messages desk, adapted to your practice — so every booked consult, every message, and every contact lands in one place your receptionist actually wants to use. Follow-up becomes a breeze instead of a scramble.</p>
            <ul className="why-list">
              <li><Check size={16} /><span><strong>Every booked consult</strong> lands in one place your front desk actually wants to use.</span></li>
              <li><Check size={16} /><span><strong>Follow-up becomes a breeze</strong> instead of a scramble.</span></li>
              <li><Check size={16} /><span><strong>Custom to your practice</strong> — adapted to how your firm actually works.</span></li>
            </ul>
            <button className="text-link" onClick={() => setBookingOpen(true)}>See it on a call with your firm <ArrowUpRight size={16} /></button>
          </Reveal>
          <Reveal className="desk-art" delay={170}>
            <img src="/images/appointment-desk.png" alt="Novix One Appointment & Messages Desk showing today's schedule, arrived clients, and upcoming remote consults" />
          </Reveal>
        </div>
      </section>

      <footer className="site-footer shell"><Logo /><div className="footer-center"><span>Miami, FL <span className="footer-dot">●</span> Everywhere</span><span>Never miss another client.</span></div><div className="footer-links"><a href="#top">Back to top <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© 2026 Novix One.</span><span>AI for the work that matters.</span></div></footer>

      <button className="floating-call" onClick={() => setBookingOpen(true)} aria-label="Get your free intake audit"><Calendar size={17} /><span>Get your free intake audit</span></button>
      {menuOpen && <button className="menu-backdrop" onClick={closeMenu} aria-label="Close navigation" />}

      {bookingOpen && <div className="booking-modal-backdrop" role="presentation" onClick={() => setBookingOpen(false)}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onClick={(event) => event.stopPropagation()}><div className="booking-modal-header"><div><p className="section-number">BOOKING</p><h3 id="booking-title">Choose a time for your free intake audit.</h3></div><button className="booking-modal-close" type="button" onClick={() => setBookingOpen(false)} aria-label="Close calendar">×</button></div><style>{`
        .cal-embed { --cal-brand-color: #9bc8ed !important; --cal-brand-text-color: #061426 !important; }
      `}</style><iframe src="https://cal.com/novixone/45min?user=novixone&theme=light" title="Schedule your free intake audit" style={{ colorScheme: 'light' }} /></div></div>}
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
