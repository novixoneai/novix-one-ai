import { FormEvent, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  Phone,
  Globe2,
  Calendar,
  MessageCircle,
  Lock,
  User,
  Clipboard,
  Menu,
  X,
  Volume2,
  Zap,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Answers every call, 24/7 — and sounds human doing it",
    description: "No more voicemail, no after-hours gaps, no robotic phone tree. Every caller reaches a warm, natural-sounding agent that's hard to tell from a real person — nights, weekends, holidays.",
  },
  {
    icon: Globe2,
    title: "Fluent in English and Spanish",
    description: "Built for Miami. Your callers get help in the language they're comfortable in, instantly.",
  },
  {
    icon: Calendar,
    title: "Qualifies and books consults",
    description: "Asks the right intake questions, screens for your practice areas, and drops booked consults right onto your calendar.",
  },
  {
    icon: MessageCircle,
    title: "Instant text follow-up",
    description: "Every lead gets an immediate text, so the ones who don't book on the first call don't disappear.",
  },
];

const voiceFeatures = [
  {
    icon: Volume2,
    label: "Natural, human-sounding voice",
    detail: "Lifelike tone, pacing, and warmth — not a flat text-to-speech read. It sounds like a real person answering your phone.",
  },
  {
    icon: Zap,
    label: "Real-time, back-and-forth conversation",
    detail: "Responds instantly, handles interruptions, and adapts to whatever the caller says — no rigid scripts, no dead air.",
  },
  {
    icon: CheckCircle,
    label: "Understands context and intent",
    detail: "Follows the conversation, asks smart follow-up questions, and responds to the caller's actual situation — not keyword triggers.",
  },
  {
    icon: MessageCircle,
    label: "Bilingual and seamless",
    detail: "Switches naturally between English and Spanish, so every Miami caller feels understood from the first word.",
  },
];

const confidentialityFeatures = [
  {
    icon: Lock,
    title: "Your data stays your data",
    description: "Caller information is encrypted in transit and at rest, stored securely, and never sold or shared. We don't use your clients' conversations to train public AI models — ever.",
  },
  {
    icon: User,
    title: "A human reviews client-facing work",
    description: "Novix One handles the call, but a human reviews anything that represents your firm. You're never leaving your clients — or your license — in the hands of an unmonitored machine.",
  },
  {
    icon: Clipboard,
    title: "Oversight you can document",
    description: "You keep records of calls and intake so you can demonstrate diligence and supervision, consistent with your professional responsibilities.",
  },
];

const faqItems = [
  ["Will this work with my current intake process?", "Yes. We adapt to how you actually work — your intake questions, your calendar, your practice areas."],
  ["How quickly can we launch?", "Most law firms are live within one week. We call your office like a real client would, show you exactly where calls are being lost, then build and launch the agent with confidentiality controls in place from day one."],
  ["What about attorney ethics and confidentiality?", "We designed this specifically for law firms. Everything is built to comply with Florida Bar guidance on AI in law practices — confidentiality, oversight, and your professional obligations are baked in."],
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

function Logo() {
  return <a className="brand" href="/" aria-label="Novix One home"><img src="/images/novix-one-logo-full.png" alt="Novix One" /></a>;
}

export default function LawOffices() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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

  function openCalendly() {
    window.open("https://cal.com/novixone/45min?user=novixone", "calendly", "width=900,height=850");
  }

  return (
    <div className="law-offices-page">
      <style>{`
        .law-offices-page {
          background: linear-gradient(180deg, #f5f1e8 0%, #e8e4d6 100%);
          color: #2c3e50;
          overflow-x: hidden;
        }

        .law-offices-page .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: white;
          border-bottom: 1px solid #e0e0e0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .law-offices-page .header-menu {
          display: none;
        }

        .law-offices-page .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #2c3e50;
        }

        @media (max-width: 768px) {
          .law-offices-page .mobile-menu-btn {
            display: block;
          }
          .law-offices-page .header-menu {
            display: none;
            position: absolute;
            top: 60px;
            right: 0;
            background: white;
            width: 100%;
            padding: 1rem;
            border-bottom: 1px solid #e0e0e0;
          }
          .law-offices-page .header-menu.active {
            display: block;
          }
        }

        .law-offices-page .header-link {
          color: #2c3e50;
          text-decoration: none;
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
        }

        .law-offices-page .cta-header {
          background: linear-gradient(135deg, #0066ff 0%, #004dbf 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .law-offices-page .hero {
          padding: 4rem 2rem;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .law-offices-page .hero-tag {
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: #c9a961;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .law-offices-page .hero-headline {
          font-family: "Libre Baskerville", serif;
          font-size: clamp(2.5rem, 8vw, 3.5rem);
          line-height: 1.15;
          font-weight: 700;
          color: #0a1628;
          margin-bottom: 1.5rem;
        }

        .law-offices-page .hero-accent {
          color: #c41e3a;
        }

        .law-offices-page .hero-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #555;
          max-width: 700px;
          margin: 0 auto 2rem;
        }

        .law-offices-page .hero-cta {
          background: linear-gradient(135deg, #0066ff 0%, #004dbf 100%);
          color: white;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .law-offices-page .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(0, 102, 255, 0.3);
        }

        .law-offices-page .section {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .law-offices-page .section-tag {
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: #c9a961;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .law-offices-page .section-headline {
          font-family: "Libre Baskerville", serif;
          font-size: clamp(2rem, 6vw, 3rem);
          line-height: 1.2;
          color: #0a1628;
          margin-bottom: 2rem;
          max-width: 800px;
        }

        .law-offices-page .problem-section {
          background: #0a1628;
          color: white;
        }

        .law-offices-page .problem-section .section-headline {
          color: white;
        }

        .law-offices-page .problem-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        .law-offices-page .problem-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
        }

        .law-offices-page .problem-text strong {
          color: white;
        }

        .law-offices-page .problem-highlight {
          color: #c9a961;
          font-style: italic;
        }

        .law-offices-page .stat-box {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
        }

        .law-offices-page .stat-number {
          font-family: "Libre Baskerville", serif;
          font-size: 3rem;
          font-weight: 700;
          color: #c9a961;
          margin-bottom: 0.5rem;
        }

        .law-offices-page .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .law-offices-page .math-section {
          background: white;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .law-offices-page .math-box {
          background: #f5f1e8;
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid #e0dfd8;
        }

        .law-offices-page .math-calculation {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 1.5rem;
        }

        .law-offices-page .math-calculation strong {
          color: #0a1628;
        }

        .law-offices-page .lost-revenue {
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #c41e3a 0%, #8b1530 100%);
          color: white;
          border-radius: 12px;
          font-family: "Libre Baskerville", serif;
        }

        .law-offices-page .lost-number {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .law-offices-page .lost-label {
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .law-offices-page .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .law-offices-page .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .law-offices-page .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
          border-color: #0066ff;
        }

        .law-offices-page .feature-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #0066ff 0%, #004dbf 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 1rem;
        }

        .law-offices-page .feature-title {
          font-weight: 600;
          font-size: 1.1rem;
          color: #0a1628;
          margin-bottom: 0.75rem;
        }

        .law-offices-page .feature-description {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
        }

        .law-offices-page .voice-section {
          background: linear-gradient(135deg, #0a1628 0%, #1a2d4a 100%);
          color: white;
        }

        .law-offices-page .voice-section .section-headline {
          color: white;
        }

        .law-offices-page .voice-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .law-offices-page .voice-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 2rem;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .law-offices-page .voice-card:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: #c9a961;
        }

        .law-offices-page .voice-icon {
          width: 40px;
          height: 40px;
          background: #c9a961;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a1628;
          margin-bottom: 1rem;
        }

        .law-offices-page .voice-label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .law-offices-page .voice-detail {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
        }

        .law-offices-page .demo-button {
          background: #c9a961;
          color: #0a1628;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 2rem;
          transition: all 0.2s;
        }

        .law-offices-page .demo-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(201, 169, 97, 0.3);
        }

        .law-offices-page .confidentiality-section {
          background: white;
        }

        .law-offices-page .section-header {
          border-top: 3px solid #c9a961;
          padding-top: 1rem;
          margin-bottom: 2rem;
        }

        .law-offices-page .pilot-section {
          background: #0a1628;
          color: white;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .law-offices-page .pilot-section .section-headline {
          color: white;
        }

        .law-offices-page .pilot-box {
          background: linear-gradient(135deg, #c9a961 0%, #a88844 100%);
          padding: 2rem;
          border-radius: 12px;
          color: #0a1628;
          text-align: center;
        }

        .law-offices-page .pilot-price {
          font-family: "Libre Baskerville", serif;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .law-offices-page .pilot-terms {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .law-offices-page .pilot-description {
          font-size: 0.95rem;
          color: rgba(10, 22, 40, 0.85);
          line-height: 1.6;
        }

        .law-offices-page .process-section {
          background: #f5f1e8;
        }

        .law-offices-page .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .law-offices-page .process-step {
          text-align: center;
        }

        .law-offices-page .step-number {
          font-family: "Libre Baskerville", serif;
          font-size: 3rem;
          font-weight: 700;
          color: #c9a961;
          margin-bottom: 1rem;
        }

        .law-offices-page .step-title {
          font-weight: 600;
          font-size: 1.1rem;
          color: #0a1628;
          margin-bottom: 0.75rem;
        }

        .law-offices-page .step-description {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
        }

        .law-offices-page .faq-section {
          background: white;
        }

        .law-offices-page .faq-item {
          background: #f5f1e8;
          margin-bottom: 1rem;
          border-radius: 8px;
          overflow: hidden;
        }

        .law-offices-page .faq-question {
          padding: 1.5rem;
          cursor: pointer;
          font-weight: 600;
          color: #0a1628;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s;
        }

        .law-offices-page .faq-question:hover {
          background: #ede8dd;
        }

        .law-offices-page .faq-answer {
          padding: 0 1.5rem 1.5rem;
          color: #666;
          line-height: 1.6;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .law-offices-page .faq-answer.active {
          max-height: 500px;
        }

        .law-offices-page .footer {
          background: #0a1628;
          color: white;
          padding: 3rem 2rem;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .law-offices-page .footer-logo {
          margin-bottom: 1rem;
        }

        .law-offices-page .footer-tagline {
          font-style: italic;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 1rem;
        }

        .law-offices-page .footer-contact {
          color: #c9a961;
          text-decoration: none;
        }

        .law-offices-page .back-link {
          display: inline-block;
          margin-bottom: 2rem;
          color: #0066ff;
          text-decoration: none;
          font-weight: 500;
        }

        .law-offices-page .back-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .law-offices-page .problem-content,
          .law-offices-page .math-section,
          .law-offices-page .pilot-section {
            grid-template-columns: 1fr;
          }

          .law-offices-page .process-grid {
            grid-template-columns: 1fr;
          }

          .law-offices-page .hero {
            padding: 2rem 1rem;
          }

          .law-offices-page .section {
            padding: 3rem 1rem;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <Logo />
        <div className="header-menu" style={menuOpen ? { display: "block" } : {}}>
          <a className="header-link" href="/">
            Back to Main
          </a>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <a className="cta-header" href="#" onClick={(e) => { e.preventDefault(); openCalendly(); }}>
          Get your free intake audit
        </a>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-tag">FOR MIAMI LAW FIRMS</div>
        <h1 className="hero-headline">
          Every missed call is a signed case
          <br />
          <span className="hero-accent">walking to your competitor.</span>
        </h1>
        <p className="hero-description">
          Novix One answers every call with a voice so natural your clients won't know it isn't human — day or night, in English and Spanish. It qualifies the lead, books the consult, and follows up by text. Built to meet Florida Bar confidentiality standards, with a human reviewing anything client-facing.
        </p>
        <button className="hero-cta" onClick={openCalendly}>
          Get your free intake audit
        </button>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          <a href="#" onClick={(e) => { e.preventDefault(); alert("Play audio demo coming soon"); }} style={{ color: "#0066ff", textDecoration: "none" }}>
            Hear it yourself — you won't believe it's AI →
          </a>
        </p>
      </section>

      {/* The Problem */}
      <section className="section problem-section">
        <div className="section-tag">THE PROBLEM</div>
        <h2 className="section-headline">You're paying to make the phone ring. Who's answering it?</h2>

        <div className="problem-content">
          <div>
            <p className="problem-text">
              You spend thousands a month on ads, referrals, and SEO to generate one thing: <strong>the phone call</strong>. But when a prospective client finally dials, you're in court. In a deposition. With another client. So the call goes to voicemail.
            </p>
            <p className="problem-text">
              <span className="problem-highlight">And here's what happens next: they hang up and call the next firm on Google.</span>
            </p>
            <p className="problem-text">
              Prospective clients don't leave voicemails and wait. Especially not in personal injury, immigration, criminal defense, or family law — where the person calling needs help <strong>today</strong>. If you don't pick up, someone else signs them.
            </p>
          </div>
          <div>
            <div className="stat-box">
              <div className="stat-number">1 in 3</div>
              <div className="stat-label">calls to law firms go unanswered.</div>
            </div>
            <div className="stat-box" style={{ marginTop: "1rem" }}>
              <div className="stat-number">8 in 10</div>
              <div className="stat-label">callers won't leave a voicemail — they call a competitor instead.</div>
            </div>
            <div className="stat-box" style={{ marginTop: "1rem" }}>
              <div className="stat-number">$5K–$50K+</div>
              <div className="stat-label">the value of a single missed PI or immigration case.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Do the Math */}
      <section className="section math-section">
        <div>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Do the math on what's slipping through.</h2>
          <div className="math-box">
            <p className="math-calculation">
              Say your firm gets <strong>100 new-client calls a month</strong> and misses 20 of them. If just one of those would have signed a <strong>$7,500 case</strong>, that adds up fast.
            </p>
            <p className="math-calculation">
              Not lost to a weak marketing campaign. Lost to a voicemail box. You already paid to generate those calls — <strong>Novix One makes sure you actually capture them.</strong>
            </p>
          </div>
        </div>
        <div className="lost-revenue">
          <div className="lost-number">$90,000</div>
          <div className="lost-label">walking out the door every year — one missed call at a time.</div>
        </div>
      </section>

      {/* The Solution */}
      <section className="section">
        <div className="section-tag">THE SOLUTION</div>
        <h2 className="section-headline">
          An AI intake agent that never misses, never sleeps,
          <br />
          and speaks your clients' language.
        </h2>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#666", maxWidth: "800px", marginBottom: "2rem" }}>
          Novix One is a 24/7 AI receptionist built specifically for law firms. It answers instantly, sounds natural, qualifies the caller, and books the consultation straight into your calendar — then follows up by text so warm leads never go cold. Everything client-facing is backed by <strong>human review</strong>, so you're never handing your clients to a machine alone.
        </p>

        <div className="features-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="feature-card">
                <div className="feature-icon" style={{ background: "linear-gradient(135deg, #0066ff 0%, #004dbf 100%)" }}>
                  <Icon size={24} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Voice */}
      <section className="section voice-section">
        <div className="section-tag">THE VOICE</div>
        <h2 className="section-headline">Your clients won't be able to tell it isn't a person.</h2>

        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", color: "rgba(255, 255, 255, 0.9)" }}>
          Forget everything you think you know about "AI phone systems." No press-1-for-this menus. No robotic monotone. No awkward pauses that make a caller hang up.
        </p>

        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", color: "rgba(255, 255, 255, 0.9)" }}>
          Novix One speaks in a <strong>warm, natural human voice</strong> — it listens, responds in real time, handles interruptions, and carries a real conversation the way a great front-desk receptionist would. A nervous accident victim or a worried family calling at midnight doesn't want to fight a machine. They want to feel heard. <strong>Novix One gives them that, instantly, every time.</strong>
        </p>

        <div className="voice-grid">
          {voiceFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="voice-card">
                <div className="voice-icon">
                  <Icon size={20} />
                </div>
                <div className="voice-label">{feature.label}</div>
                <div className="voice-detail">{feature.detail}</div>
              </div>
            );
          })}
        </div>

        <button className="demo-button" onClick={() => alert("Live demo link coming soon")}>
          ▶ Play a live bilingual demo call
        </button>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.75)" }}>
          60 seconds. Listen closely. Most people can't tell it's AI.
        </p>
      </section>

      {/* Confidentiality & Ethics */}
      <section className="section confidentiality-section">
        <div className="section-header">
          <div className="section-tag">CONFIDENTIALITY & ETHICS</div>
          <h2 className="section-headline">Your ethical obligations come first. We built for them.</h2>
        </div>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#666", maxWidth: "900px", marginBottom: "2rem" }}>
          You're bound by strict confidentiality rules, and the Florida Bar has issued clear guidance on using AI in a law practice — protecting client information, maintaining oversight, and being careful about how third-party tools handle data. Novix One is built to sit comfortably inside those obligations.
        </p>

        <div className="features-grid">
          {confidentialityFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="feature-card">
                <div className="feature-icon" style={{ background: "linear-gradient(135deg, #0066ff 0%, #004dbf 100%)" }}>
                  <Icon size={24} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#999", fontStyle: "italic" }}>
          Novix One supports your compliance with Florida Bar guidance on AI and confidentiality; it does not replace your independent professional judgment.
        </p>
      </section>

      {/* No Long Contracts */}
      <section className="section pilot-section">
        <div>
          <div className="section-tag">NO LONG CONTRACTS</div>
          <h2 className="section-headline">Been burned by a vendor before? Prove us out first.</h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255, 255, 255, 0.9)" }}>
            We're not going to lock you into a 12-month contract and disappear. Start with a 30-day paid pilot. Watch the booked consults come in, hear the calls, see the follow-ups — then decide. If it's not making you money, you walk. No annual commitment, no penalty.
          </p>
        </div>
        <div className="pilot-box">
          <div className="pilot-price">30-Day Paid Pilot</div>
          <div className="pilot-terms">Month-to-month after.</div>
          <div className="pilot-description">Cancel anytime.</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section process-section">
        <div className="section-tag">HOW IT WORKS</div>
        <h2 className="section-headline">Live in a week. No IT department required.</h2>

        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-title">Free intake audit</div>
            <div className="step-description">We call your office like a real client would — and show you exactly where calls are being lost.</div>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-title">We build your agent</div>
            <div className="step-description">We train Novix One on your firm's practice areas, intake process, and calendar — with confidentiality controls in place from day one.</div>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-title">You stop losing leads</div>
            <div className="step-description">Every call answered, every lead followed up, every consult booked. You just show up to the meetings.</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <h2 className="section-headline" style={{ marginBottom: "2rem" }}>Answers before you decide.</h2>
        {faqItems.map((item, idx) => (
          <div key={idx} className="faq-item">
            <button
              className="faq-question"
              onClick={() => {
                const answer = document.getElementById(`faq-${idx}`);
                if (answer) {
                  answer.classList.toggle("active");
                }
              }}
            >
              <span>{item[0]}</span>
              <span style={{ fontSize: "1.5rem", color: "#0066ff" }}>+</span>
            </button>
            <div id={`faq-${idx}`} className="faq-answer">
              {item[1]}
            </div>
          </div>
        ))}
      </section>

      {/* Get Started */}
      <section className="section" style={{ textAlign: "center", background: "#f5f1e8" }}>
        <div className="section-tag">GET STARTED</div>
        <h2 className="section-headline">Find out how many cases you're losing to voicemail.</h2>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#666", maxWidth: "800px", margin: "0 auto 2rem" }}>
          We'll run a free intake audit on your firm — real calls, real results — and show you exactly what's slipping through. Then hear a live bilingual demo and start a 30-day pilot if it makes sense. No pressure. No annual contract. Just proof.
        </p>
        <button className="hero-cta" onClick={openCalendly}>
          Get your free intake audit
        </button>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          15 minutes · 30-day paid pilot · No long-term commitment.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <Logo />
        </div>
        <p className="footer-tagline">Never miss another client.</p>
        <p style={{ marginBottom: "1rem" }}>novixone.co</p>
      </footer>
    </div>
  );
}
