import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Menu,
  MessageCircle,
  PenLine,
  Target,
  X,
} from "lucide-react";
import { setPageMetadata, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from "../lib/seo";

const faqs = [
  [
    "Why not just have my sales team follow up?",
    "Reps close active opportunities — they won't consistently sift through thousands of dormant records, and when they do, it's too slow to compete. AI handles first-pass outreach at scale so your team only steps in once a lead re-engages.",
  ],
  [
    "What response rates should I expect?",
    "Reactivated leads typically convert at 10–25%, versus 3–8% for cold leads. Rates vary by lead age, industry, and offer. SMS usually outperforms email because it bypasses inbox filtering.",
  ],
  [
    "Is this compliant, and how is it different from a mass email?",
    "Yes — we use verified data, honor opt-outs, and follow A2P registration. Unlike a blast, every message is personalized from CRM data and sequenced across channels, so you get higher response rates with no spam penalties.",
  ],
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

function Logo() {
  return <a className="brand" href="/database-reactivation" aria-label="Novix One home"><img src="/images/novix-one-logo-full.png" alt="Novix One" /></a>;
}

export default function DatabaseReactivation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        generateServiceSchema(
          "CRM Database Reactivation",
          "AI-driven reactivation of dormant CRM leads via personalized, multi-channel outreach — turning old leads into booked jobs without new ad spend.",
        ),
        generateFAQSchema(faqs.map(([q, a]) => ({ question: q, answer: a }))),
        generateBreadcrumbSchema([
          { name: "Home", url: "https://novixone.co/" },
          { name: "Database Reactivation", url: "https://novixone.co/database-reactivation" },
        ]),
      ],
    };

    setPageMetadata({
      title: "CRM Database Reactivation | Turn Dead Leads Into Revenue | Novix One",
      description: "Your CRM is full of leads you already paid for. Novix One's AI reactivates them — personalized outreach at scale, live in 14 days, at a fraction of new-lead cost.",
      ogTitle: "Database Reactivation | Novix One",
      ogDescription: "AI reactivation for dormant CRM leads. See what your database is worth with our free calculator.",
      ogImage: "https://novixone.co/images/og-image.png",
      canonicalUrl: "https://novixone.co/database-reactivation",
      schema,
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
    const leadsEl = document.getElementById("drLeads") as HTMLInputElement | null;
    const rateEl = document.getElementById("drRate") as HTMLInputElement | null;
    const valueEl = document.getElementById("drValue") as HTMLInputElement | null;
    const cacEl = document.getElementById("drCac") as HTMLInputElement | null;
    if (!leadsEl || !rateEl || !valueEl || !cacEl) return;

    const REACT_COST_PER_1000 = 900;

    function money(n: number) {
      return "$" + Math.round(n).toLocaleString("en-US");
    }

    function setText(id: string, value: string) {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    }

    function setScale(id: string, pct: number) {
      const el = document.getElementById(id);
      if (el) el.style.transform = `scaleX(${pct / 100})`;
    }

    function paint(el: HTMLInputElement) {
      const p = ((Number(el.value) - Number(el.min)) / (Number(el.max) - Number(el.min))) * 100;
      el.style.backgroundSize = p + "% 100%";
    }

    function update() {
      const leads = Number(leadsEl!.value);
      const rate = Number(rateEl!.value) / 100;
      const value = Number(valueEl!.value);
      const cac = Number(cacEl!.value);

      const conversions = leads * rate;
      const revenue = conversions * value;
      const reactCost = (leads / 1000) * REACT_COST_PER_1000;
      const acqCost = leads * cac;
      const roi = reactCost > 0 ? revenue / reactCost : 0;

      setText("drLeadsVal", leads.toLocaleString("en-US"));
      setText("drRateVal", rateEl!.value + "%");
      setText("drValueVal", money(value));
      setText("drCacVal", money(cac));
      setText("drRevOut", money(revenue));
      setText("drConvOut", Math.round(conversions).toLocaleString("en-US"));
      setText("drReactCost", money(reactCost));
      setText("drAcqCost", money(acqCost));
      setText("drRoiOut", Math.round(roi).toLocaleString("en-US") + "×");

      const rePer = REACT_COST_PER_1000;
      const acPer = cac * 1000;
      const max = Math.max(rePer, acPer);
      setScale("drReBar", Math.max(4, (rePer / max) * 100));
      setScale("drAcBar", Math.max(4, (acPer / max) * 100));
      setText("drReBarLab", money(rePer));
      setText("drAcBarLab", money(acPer));

      [leadsEl!, rateEl!, valueEl!, cacEl!].forEach(paint);
    }

    [leadsEl, rateEl, valueEl, cacEl].forEach((el) => el.addEventListener("input", update));
    update();

    return () => {
      [leadsEl, rateEl, valueEl, cacEl].forEach((el) => el.removeEventListener("input", update));
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="novix-site" style={themeVars}>
      <style>{`
        .reactivation-hero { max-width: 800px; margin: 0 auto; padding: 90px 0 8px; text-align: center; }
        .reactivation-hero .hero-cta-row { justify-content: center; }
        .reactivation-hero .hero-intro { margin-left: auto; margin-right: auto; }
        .reactivation-hero .hero-trust { text-align: center; }
        .reactivation-hero .kicker { justify-content: center; }
        .reactivation-hero h1 { max-width: 700px; margin: 0 auto 28px; color: var(--ink); font-family: var(--font-display); font-weight: 400; font-size: clamp(2.6rem, 5.6vw, 4.6rem); letter-spacing: -.01em; line-height: 1.05; text-wrap: balance; }
        .reactivation-hero h1 em { color: var(--blue); font-family: var(--font-display); font-style: italic; font-weight: 400; letter-spacing: 0; }

        .stat-strip { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: rgba(255,255,255,.02); }
        .stat-strip-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        .stat-cell { padding: 34px 26px; border-right: 1px solid var(--line); }
        .stat-cell:last-child { border-right: none; }
        .stat-cell .num { font-family: var(--font-display); font-size: clamp(28px, 3.4vw, 42px); font-weight: 400; letter-spacing: -.02em; line-height: 1; color: var(--ink); }
        .stat-cell .num span { color: var(--blue); }
        .stat-cell .lbl { margin-top: 10px; font-size: 13.5px; color: var(--muted); line-height: 1.4; }

        .who-band { border-bottom: 1px solid var(--line); background: rgba(255,255,255,.015); padding: 30px 0; text-align: center; }
        .who-lead { display: block; font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 10px; }
        .who-tags { display: block; font-size: 14.5px; color: var(--blue); font-weight: 600; line-height: 1.8; max-width: 760px; margin: 0 auto; }
        .who-close { display: block; margin-top: 12px; font-size: 13px; color: var(--muted); font-style: italic; font-family: var(--font-display); }

        .problem-highlight { color: var(--champagne); font-family: var(--font-display); font-style: italic; font-size: 21px; line-height: 1.5; margin: 24px 0; }
        .problem-narrative { display: flex; flex-direction: column; gap: 18px; max-width: 820px; margin: 28px 0 0; }
        .problem-narrative p { margin: 0; color: var(--muted); font-size: 17px; line-height: 1.7; }
        .problem-narrative p strong { color: var(--ink); }

        .compare-card { margin-top: 22px; background: rgba(0,0,0,.16); border: 1px solid rgba(216,228,241,.14); border-radius: 12px; padding: 18px; }
        .compare-title { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: rgba(242,245,249,.68); font-weight: 700; margin-bottom: 14px; font-family: var(--font-body); }
        .compare-bar { margin-bottom: 14px; }
        .compare-bar:last-child { margin-bottom: 0; }
        .compare-bar-label { display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 6px; color: rgba(242,245,249,.85); }
        .compare-track { height: 12px; background: rgba(255,255,255,.1); border-radius: 999px; overflow: hidden; }
        .compare-fill { width: 100%; height: 100%; transform-origin: left center; transition: transform .5s cubic-bezier(.22,.61,.36,1); }
        .compare-fill.reactivate { background: var(--aqua); }
        .compare-fill.acquire { background: var(--champagne); }

        .dr-rrow { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-top: 1px solid rgba(255,255,255,.14); font-size: 14px; color: rgba(242,245,249,.72); }
        .dr-rrow .v { font-weight: 700; font-size: 16px; color: var(--ink); }
        .dr-rrow .v.pos { color: var(--aqua); }

        .proof-figure { display: flex; justify-content: center; margin: 30px 0 8px; }
        .proof-figure .proof-card { min-height: auto; padding: 42px 40px; text-align: center; }
        .proof-figure .proof-card strong { display: block; margin-bottom: 12px; font-size: clamp(2.4rem, 4.4vw, 3.4rem); }
        .proof-figure .proof-card h3 { margin: 0 0 8px; color: #102d56; }
        .proof-figure .proof-card p { margin: 0 auto; color: #435674; font-size: 16px; max-width: 260px; }

        .reactivation-table { width: 100%; border-collapse: collapse; margin: 8px 0 0; background: rgba(20,50,85,.35); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; font-size: 15px; }
        .reactivation-table th, .reactivation-table td { padding: 14px 18px; text-align: left; border-bottom: 1px solid var(--line); }
        .reactivation-table th { background: rgba(255,255,255,.03); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); font-weight: 600; }
        .reactivation-table td strong { color: var(--aqua); }
        .reactivation-table tr:last-child td { border-bottom: none; }

        .msg-example { position: relative; background: rgba(228,201,148,.08); border: 1px solid rgba(228,201,148,.28); border-radius: 16px; padding: 28px 30px; margin: 34px 0; font-family: var(--font-display); font-style: italic; font-size: 17px; line-height: 1.6; color: var(--silver); }
        .msg-example::before { content: "AI OPENING MESSAGE"; position: absolute; top: -11px; left: 22px; background: var(--champagne); color: #241a05; font-family: var(--font-body); font-style: normal; font-size: 10px; font-weight: 700; letter-spacing: .1em; padding: 4px 12px; border-radius: 999px; }

        .final-cta { text-align: center; border: 1px solid rgba(155,200,237,.32); border-radius: 20px; padding: 60px 40px; background: linear-gradient(135deg, rgba(23,75,125,.55), rgba(13,44,78,.85)); box-shadow: 0 20px 50px rgba(4,18,34,.22); }
        .final-cta .kicker { justify-content: center; margin-bottom: 20px; }
        .final-cta h2 { max-width: 620px; margin: 0 auto 16px; color: var(--ink); font-family: var(--font-display); font-weight: 400; font-size: clamp(2rem, 3.8vw, 3.1rem); letter-spacing: -.01em; line-height: 1.1; text-wrap: balance; }
        .final-cta p { max-width: 540px; margin: 0 auto 30px; color: var(--muted); font-size: 18px; }
        .final-cta .hero-cta-row { justify-content: center; }

        @media (max-width: 820px) {
          .stat-strip-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-cell:nth-child(2) { border-right: none; }
          .stat-cell { border-bottom: 1px solid var(--line); }
          .reactivation-table { font-size: 13.5px; }
          .reactivation-table th, .reactivation-table td { padding: 11px 12px; }
        }
        @media (max-width: 480px) {
          .final-cta { padding: 44px 24px; }
        }
      `}</style>
      <div className="site-grid" aria-hidden="true" />
      <div className="site-glow" aria-hidden="true" />

      <header className="site-header">
        <Logo />
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#problem" onClick={closeMenu}>The Problem <ArrowUpRight size={14} /></a>
          <a href="#calculator" onClick={closeMenu}>The Numbers <ArrowUpRight size={14} /></a>
          <a href="#how" onClick={closeMenu}>How It Works <ArrowUpRight size={14} /></a>
          <a href="#faq" onClick={closeMenu}>Questions <ArrowUpRight size={14} /></a>
        </nav>
        <div className="header-right">
          <a href="/" className="language-link" aria-label="Back to Novix One home">← Novix One</a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <section className="shell" id="top">
        <div className="reactivation-hero">
          <Reveal><p className="kicker"><span className="pulse-dot" />Database Reactivation</p></Reveal>
          <Reveal delay={80}><h1>Your dead leads are worth more than your <em>next ad campaign.</em></h1></Reveal>
          <Reveal delay={150}><p className="hero-intro">You already paid to acquire them. Novix One's AI wakes them back up — done for you, live in 14 days, at a fraction of what new leads cost.</p></Reveal>
          <Reveal delay={220} className="hero-cta-row"><a className="button button-primary" href="#calculator">See what your CRM is worth <ArrowUpRight size={16} /></a><a className="text-link" href="#how">How it works <ArrowDownRight size={16} /></a></Reveal>
          <Reveal delay={290}><p className="hero-trust">No new ad spend. No software to manage. No extra work for your team.</p></Reveal>
        </div>
      </section>

      <div className="stat-strip">
        <div className="shell stat-strip-grid">
          <div className="stat-cell"><div className="num">5–25<span>×</span></div><div className="lbl">costlier to acquire a new customer than reactivate a dormant one</div></div>
          <div className="stat-cell"><div className="num">21<span>×</span></div><div className="lbl">more likely to qualify when a lead hears back within 5 minutes</div></div>
          <div className="stat-cell"><div className="num">51<span>%</span></div><div className="lbl">of leads are never contacted at all</div></div>
          <div className="stat-cell"><div className="num">222<span>%</span></div><div className="lbl">rise in customer acquisition cost over the past eight years</div></div>
        </div>
      </div>

      <div className="who-band">
        <div className="shell">
          <span className="who-lead">Built for service businesses that generate leads and lose track of them —</span>
          <span className="who-tags">HVAC · Legal · Dental &amp; Medical · Real Estate · Insurance · Med Spas &amp; Wellness · Contractors · Financial Services · Auto · Home Services · Roofing &amp; Solar · B2B Sales Teams</span>
          <span className="who-close">If leads flow into a CRM and go cold, this is for you.</span>
        </div>
      </div>

      <section className="problem section-pad" id="problem">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">01 / THE REAL PROBLEM</p><h2>It's not lead quality. <em>It's timing.</em></h2></div></div></Reveal>
          <Reveal delay={60}>
            <div className="problem-narrative">
              <p>You spent $50–$150 acquiring that lead. Your team called twice, got no answer, and moved on. Most of those leads weren't bad fits — the timing was just off. A project pushed back, budget pending, still checking insurance. Nobody followed up when things changed.</p>
              <p className="problem-highlight">That's not a dead lead. That's a delayed sale.</p>
              <p>The average business takes <strong>29–42 hours</strong> to respond to a lead — and even if they respond quickly, <strong>51% are never contacted at all</strong>. By the time anyone follows up, the window's closed. Your closers can't dig through thousands of old records at speed. AI can.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="calculator-section section-pad" id="calculator">
        <div className="shell">
          <Reveal>
            <div className="nxcalc">
              <p className="nxcalc__badge">Lost Revenue Calculator</p>
              <h2 className="nxcalc__h1">How much revenue is sitting <span>in your CRM right now?</span></h2>
              <p className="nxcalc__sub">Drag the sliders to match your business. Conservative, low-end conversion rates — the same math we use to size a campaign.</p>
              <div className="nxcalc__grid">
                <div className="nxcalc__card">
                  <h3 className="nxcalc__ct">Your numbers</h3>
                  <div className="nxcalc__field">
                    <label>Dormant leads in your CRM <span className="nxcalc__val" id="drLeadsVal">1,000</span></label>
                    <input type="range" id="drLeads" min="100" max="10000" step="100" defaultValue="1000" />
                    <div className="nxcalc__hint">100 to 10,000 dormant records.</div>
                  </div>
                  <div className="nxcalc__field">
                    <label>Reactivation rate <span className="nxcalc__val" id="drRateVal">10%</span></label>
                    <input type="range" id="drRate" min="3" max="25" step="1" defaultValue="10" />
                    <div className="nxcalc__hint">3% (cold) to 25% (warm).</div>
                  </div>
                  <div className="nxcalc__field">
                    <label>Average job / customer value <span className="nxcalc__val" id="drValueVal">$2,500</span></label>
                    <input type="range" id="drValue" min="250" max="25000" step="250" defaultValue="2500" />
                    <div className="nxcalc__hint">$250 to $25,000.</div>
                  </div>
                  <div className="nxcalc__field">
                    <label>Cost to acquire ONE new lead (ads) <span className="nxcalc__val" id="drCacVal">$100</span></label>
                    <input type="range" id="drCac" min="20" max="1500" step="10" defaultValue="100" />
                    <div className="nxcalc__hint">$20 to $1,500.</div>
                  </div>
                </div>
                <div className="nxcalc__card nxcalc__result">
                  <h3 className="nxcalc__ct">Revenue you could recover</h3>
                  <div className="nxcalc__lossrow">
                    <span className="nxcalc__big" id="drRevOut">$250,000</span>
                    <span className="nxcalc__note"><span id="drConvOut">100</span> reactivated customers from leads you already own.</span>
                  </div>
                  <div className="dr-rrow"><span>Reactivation campaign cost</span><span className="v" id="drReactCost">$900</span></div>
                  <div className="dr-rrow"><span>Equivalent cost to buy that many leads</span><span className="v" id="drAcqCost">$100,000</span></div>
                  <div className="dr-rrow"><span>Estimated return on reactivation</span><span className="v pos" id="drRoiOut">278×</span></div>
                  <div className="compare-card">
                    <div className="compare-title">Cost per 1,000 contacts</div>
                    <div className="compare-bar">
                      <div className="compare-bar-label"><span>Reactivate leads you own</span><span id="drReBarLab">$900</span></div>
                      <div className="compare-track"><div className="compare-fill reactivate" id="drReBar" style={{ transform: "scaleX(0.08)" }} /></div>
                    </div>
                    <div className="compare-bar">
                      <div className="compare-bar-label"><span>Buy net-new leads</span><span id="drAcBarLab">$100,000</span></div>
                      <div className="compare-track"><div className="compare-fill acquire" id="drAcBar" style={{ transform: "scaleX(1)" }} /></div>
                    </div>
                  </div>
                  <button className="nxcalc__btn" type="button" onClick={() => setBookingOpen(true)}>Turn this into booked jobs →</button>
                </div>
              </div>
              <p className="nxcalc__assume">Estimates use industry benchmarks: reactivated leads convert at 10–25% vs 3–8% for cold leads; multi-channel reactivation runs $300–$1,500 per 1,000 contacts vs $5,000–$15,000 for paid acquisition. Actual results vary by industry, lead age, and offer.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad" id="proof">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">— PROOF</p><h2>$36,000 in 60 days — <em>from leads they'd written off.</em></h2></div><p className="section-lede">Blingle, an outdoor lighting company, had ~2,000 dead leads. One AI reactivation campaign booked $36K in 60 days — no new ads, no bigger team.</p></div></Reveal>
          <Reveal delay={80} className="proof-figure">
            <article className="proof-card"><strong>$36,000</strong><h3>booked in 60 days</h3><p>From leads already sitting in their CRM.</p></article>
          </Reveal>
          <Reveal delay={140}>
            <p className="section-lede" style={{ maxWidth: "620px", marginBottom: "18px" }}>Here's how it scales at a conservative 10% reactivation rate:</p>
            <table className="reactivation-table">
              <thead><tr><th>Dormant leads</th><th>Reactivation rate</th><th>Avg. job value</th><th>Revenue recovered</th></tr></thead>
              <tbody>
                <tr><td>500</td><td>10%</td><td>$2,500</td><td><strong>$125,000</strong></td></tr>
                <tr><td>1,000</td><td>10%</td><td>$2,500</td><td><strong>$250,000</strong></td></tr>
                <tr><td>2,000</td><td>10%</td><td>$2,500</td><td><strong>$500,000</strong></td></tr>
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="services section-pad" id="how">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">02 / HOW NOVIX ONE DOES IT</p><h2>Personalized at scale. <em>Filtered before it reaches your team.</em></h2></div><p className="section-lede">Manual follow-up never happens; generic blasts get flagged. We fix both.</p></div></Reveal>
          <Reveal delay={60}><div className="msg-example">"Hey Sarah, I know you spoke with Marcus about replacing your HVAC back in August, but the timing wasn't quite right. Has anything changed on your end? Happy to revisit if now works better."</div></Reveal>
          <div className="process-grid">
            {[
              [PenLine, "Personalized at scale", "Every message pulls from your CRM — their name, the rep, the exact service. It reads like a real follow-up because it is one."],
              [Target, "AI triage", "AI runs outreach, qualifies replies, and routes only re-engaged buyers to your reps. Closers get warm conversations, never cold records."],
              [MessageCircle, "Multi-channel", "Personalized SMS first, then a call, then targeted email. Never a mass blast that kills your deliverability."],
            ].map(([Icon, title, body], index) => {
              const IconComp = Icon as typeof PenLine;
              return (
                <Reveal key={title as string} delay={index * 80}>
                  <article className={`process-card process-card-${index + 1}`}>
                    <div className="process-card-top"><span className="process-card-number">0{index + 1}</span><IconComp size={18} /></div>
                    <div className="process-card-rule" />
                    <h3>{title as string}</h3>
                    <p>{body as string}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="process section-pad" id="rollout">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">03 / THE ROLLOUT</p><h2>Live in 10 to 14 days. <em>Zero new tasks for your team.</em></h2></div></div></Reveal>
          <div className="steps-grid">
            <div className="step"><span className="step-number">01</span><div className="step-line" /><h3>Segment</h3><p>We pull every lead that didn't convert in 6–24 months and sort by age, contact history, and inquiry type.</p></div>
            <div className="step"><span className="step-number">02</span><div className="step-line" /><h3>Sequence</h3><p>Each segment gets its own re-entry point that opens a low-pressure conversation. Never one blast.</p></div>
            <div className="step"><span className="step-number">03</span><div className="step-line" /><h3>Run it</h3><p>We handle verification, A2P compliance, and CRM integration. Your team only steps in once a lead re-engages.</p></div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <Reveal>
            <div className="final-cta">
              <p className="kicker"><span className="pulse-dot" />Recover what's yours</p>
              <h2>Your CRM isn't a graveyard. <em>It's a pipeline nobody's worked yet.</em></h2>
              <p>Every month without a reactivation system running is revenue left on the table. Let's find yours.</p>
              <div className="hero-cta-row"><button className="button button-primary" onClick={() => setBookingOpen(true)}>Book a free revenue audit <ArrowUpRight size={16} /></button><a className="text-link" href="#calculator">Recalculate my numbers <ArrowDownRight size={16} /></a></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="shell faq-grid">
          <Reveal><div><p className="section-number">04 / QUESTIONS</p><h2>Before you write off <em>those leads.</em></h2><p className="faq-intro">Common questions before getting started.</p></div></Reveal>
          <Reveal delay={100}><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></Reveal>
        </div>
      </section>

      <footer className="site-footer shell"><Logo /><div className="footer-center"><span>Miami, FL <span className="footer-dot">●</span> Everywhere</span><span>Recover what's already yours.</span></div><div className="footer-links"><a href="#top">Back to top <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© 2026 Novix One.</span><span>AI for the work that matters.</span></div></footer>

      <button className="floating-call" onClick={() => setBookingOpen(true)} aria-label="Book a free revenue audit"><Calendar size={17} /><span>Book a free revenue audit</span></button>
      {menuOpen && <button className="menu-backdrop" onClick={closeMenu} aria-label="Close navigation" />}

      {bookingOpen && <div className="booking-modal-backdrop" role="presentation" onClick={() => setBookingOpen(false)}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onClick={(event) => event.stopPropagation()}><div className="booking-modal-header"><div><p className="section-number">BOOKING</p><h3 id="booking-title">Choose a time for your free revenue audit.</h3></div><button className="booking-modal-close" type="button" onClick={() => setBookingOpen(false)} aria-label="Close calendar">×</button></div><style>{`
        .cal-embed { --cal-brand-color: #9bc8ed !important; --cal-brand-text-color: #061426 !important; }
      `}</style><iframe src="https://cal.com/novixone/45min?user=novixone&theme=light" title="Schedule your free revenue audit" style={{ colorScheme: 'light' }} /></div></div>}
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
