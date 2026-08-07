import { FormEvent, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowDownRight,
  Check,
  ChevronDown,
  Phone,
  Globe2,
  Calendar,
  MessageSquare,
  Menu,
  X,
  Shield,
} from "lucide-react";

const lawFirmFeatures = [
  {
    icon: Phone,
    title: "Answers every call, 24/7",
    short: "Never miss a lead",
    description: "No more voicemail, no after-hours gaps. Every caller reaches a warm, natural-sounding agent that's hard to tell from a real person — nights, weekends, holidays.",
  },
  {
    icon: Globe2,
    title: "Fluent in English and Spanish",
    short: "Built for Miami",
    description: "Your callers get help in the language they're comfortable in, instantly.",
  },
  {
    icon: Calendar,
    title: "Qualifies and books consults",
    short: "Straight to your calendar",
    description: "Asks the right intake questions, screens for your practice areas, and drops booked consults straight onto your calendar.",
  },
  {
    icon: MessageSquare,
    title: "Instant text follow-up",
    short: "Warm leads stay warm",
    description: "Every lead gets an immediate text, so the ones who don't book on the first call don't disappear.",
  },
];

const lawFaqs = [
  ["Will this integrate with my practice management software?", "Yes. We connect with most major practice management systems and calendar platforms."],
  ["How quickly can we go live?", "Most law firms launch within one to two weeks. We audit your current calls, build your agent, and go live with confidentiality controls in place from day one."],
  ["What about Florida Bar confidentiality?", "Every client-facing interaction is reviewed by humans. We're built from the ground up to meet Florida Bar standards for confidentiality and oversight."],
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

function Logo() {
  return <a className="brand" href="/" aria-label="Novix One home"><img src="/images/novix-one-logo-full.png" alt="Novix One" /></a>;
}

export default function LawOffices() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  function openCal() {
    window.open("https://cal.com/novixone/45min?user=novixone", "cal", "width=900,height=850");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f1e8] to-[#f5f1e8]" id="top">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
          transition-delay: var(--delay, 0ms);
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm text-gray-600 hover:text-gray-900">Your Problems</a>
            <a href="#solution" className="text-sm text-gray-600 hover:text-gray-900">Our Solution</a>
            <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
            <button
              onClick={openCal}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition"
            >
              Free intake audit
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-3">
            <a href="#problem" className="block text-sm text-gray-600">Your Problems</a>
            <a href="#solution" className="block text-sm text-gray-600">Our Solution</a>
            <a href="#faq" className="block text-sm text-gray-600">FAQ</a>
            <button onClick={openCal} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
              Free intake audit
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto text-center">
        <Reveal delay={0}>
          <div className="text-xs md:text-sm font-semibold tracking-widest text-amber-700 uppercase mb-6">For Miami Law Firms</div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Every missed call is a signed case <span className="text-red-700">walking to your competitor.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            Novix One answers every call with a voice so natural your clients won't know it isn't human — day or night, in English and Spanish. It qualifies the lead, books the consult, and follows up by text. Built to meet Florida Bar confidentiality standards, with a human reviewing anything client-facing.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <button
            onClick={openCal}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition mb-4"
          >
            Get your free intake audit
          </button>
        </Reveal>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-900 text-white px-6 py-16 md:py-24" id="problem">
        <div className="max-w-5xl mx-auto">
          <Reveal delay={0}>
            <div className="text-xs md:text-sm font-semibold tracking-widest text-amber-500 uppercase mb-6">The Problem</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-12 leading-tight">
              You're paying to make the phone ring.
              <br />
              Who's answering it?
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <Reveal delay={200}>
              <div className="space-y-4">
                <p className="text-lg text-gray-100 leading-relaxed">
                  You spend thousands a month on ads, referrals, and SEO to generate one thing: <strong>the phone call</strong>. But when a prospective client finally dials, you're in court. In a deposition. With another client. So the call goes to voicemail.
                </p>
                <p className="text-lg text-amber-500 italic">
                  And here's what happens next: they hang up and call the next firm on Google.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed">
                  Prospective clients don't leave voicemails and wait. Especially not in personal injury, immigration, criminal defense, or family law — where the person calling needs help <strong>today</strong>. If you don't pick up, someone else signs them.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="space-y-4">
                <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition">
                  <div className="font-serif text-5xl font-bold text-amber-400 mb-2">1 in 3</div>
                  <p className="text-gray-100">calls to law firms go unanswered.</p>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition">
                  <div className="font-serif text-5xl font-bold text-amber-400 mb-2">8 in 10</div>
                  <p className="text-gray-100">callers won't leave a voicemail — they call a competitor instead.</p>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition">
                  <div className="font-serif text-4xl font-bold text-amber-400 mb-2">$5K–$50K+</div>
                  <p className="text-gray-100">the value of a single missed case.</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-xl p-8 text-center border border-red-600">
              <p className="text-sm text-red-200 mb-3">The annual cost of missed leads</p>
              <div className="font-serif text-6xl font-bold text-white mb-2">$90,000</div>
              <p className="text-red-100">walking out the door every year — one missed call at a time.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto" id="solution">
        <Reveal delay={0}>
          <div className="text-xs md:text-sm font-semibold tracking-widest text-amber-700 uppercase mb-6">The Solution</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            An AI intake agent that never misses, never sleeps, and speaks your clients' language.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-lg text-gray-700 max-w-3xl mb-12 leading-relaxed">
            Novix One is a 24/7 AI receptionist built specifically for law firms. It answers instantly, sounds natural, qualifies the caller, and books the consultation straight into your calendar — then follows up by text so warm leads never go cold. Everything client-facing is backed by <strong>human review</strong>, so you're never handing your clients to a machine alone.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {lawFirmFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Reveal key={idx} delay={300 + idx * 100}>
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-400 transition">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Appointment Desk Section */}
      <section className="bg-gray-50 px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <Reveal delay={0}>
            <div className="text-xs md:text-sm font-semibold tracking-widest text-amber-700 uppercase mb-6">Included: The Appointment & Messages Desk</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Every call handled with care — and organized so your front desk never drops a lead.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Answering the call is half the job. The other half is what happens next. Every firm gets a custom Appointment & Messages desk, adapted to your practice — so every booked consult, every message, and every contact lands in one place your receptionist actually wants to use. Follow-up becomes a breeze instead of a scramble.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                alt="Appointment Desk Interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
        <Reveal delay={0}>
          <div className="text-xs md:text-sm font-semibold tracking-widest text-amber-700 uppercase mb-6">The Process</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight">
            Live in one to two weeks.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Free intake audit", desc: "We call your office like a real client would — and show you exactly where calls are being lost." },
            { num: "02", title: "We build your agent", desc: "We train Novix One on your practice areas, intake process, and calendar — with confidentiality controls baked in." },
            { num: "03", title: "You stop losing leads", desc: "Every call answered, every lead followed up, every consult booked. You just show up to the meetings." },
          ].map((step, idx) => (
            <Reveal key={idx} delay={200 + idx * 100}>
              <div className="text-center">
                <div className="font-serif text-5xl font-bold text-amber-700 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Confidentiality */}
      <section className="bg-gray-900 text-white px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <Reveal delay={0}>
            <div className="text-xs md:text-sm font-semibold tracking-widest text-amber-500 uppercase mb-6">Built for Your Obligations</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your ethical obligations come first.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg text-gray-100 mb-12 leading-relaxed max-w-3xl">
              You're bound by strict confidentiality rules, and the Florida Bar has issued clear guidance on using AI in a law practice. Novix One is built from the ground up to sit comfortably inside those obligations — encrypted data, human oversight of anything client-facing, and full documentation for your compliance.
            </p>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={300}>
              <div className="flex gap-4 items-start">
                <Shield size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Your data stays your data</h3>
                  <p className="text-gray-300">Caller information is encrypted, stored securely, and never used to train public AI models.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="flex gap-4 items-start">
                <Check size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">A human reviews everything client-facing</h3>
                  <p className="text-gray-300">Novix One handles the call, but a human reviews anything that represents your firm.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={500}>
              <div className="flex gap-4 items-start">
                <Shield size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Documentation for compliance</h3>
                  <p className="text-gray-300">Keep records of calls and intake so you can demonstrate diligence and oversight.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto text-center">
        <Reveal delay={0}>
          <div className="text-xs md:text-sm font-semibold tracking-widest text-amber-700 uppercase mb-6">No Long Contracts</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Prove us out first.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed">
            Start with a 30-day paid pilot. Watch the booked consults come in, hear the calls, see the follow-ups — then decide. If it's not making you money, you walk. No annual commitment, no penalty.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl p-8 text-center">
            <div className="font-serif text-5xl font-bold mb-2">30-Day Paid Pilot</div>
            <div className="text-lg font-semibold mb-2">Month-to-month after.</div>
            <div className="text-amber-100">Cancel anytime.</div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-6 py-16 md:py-24 max-w-5xl mx-auto" id="faq">
        <Reveal delay={0}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Answers before you decide.
          </h2>
        </Reveal>

        <div className="space-y-3">
          {lawFaqs.map((faq, idx) => (
            <Reveal key={idx} delay={100 + idx * 50}>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-semibold text-gray-900 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span>{faq[0]}</span>
                  <ChevronDown
                    size={20}
                    className={`text-blue-600 transition ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-200 pt-4">
                    {faq[1]}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-gray-900 to-black text-white px-6 py-16 md:py-24 text-center">
        <Reveal delay={0}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Find out how many cases you're losing to voicemail.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            We'll run a free intake audit on your firm — real calls, real results — and show you exactly what's slipping through. Then hear a live bilingual demo and start a 30-day pilot if it makes sense.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <button
            onClick={openCal}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition mb-4"
          >
            Get your free intake audit
          </button>
          <p className="text-gray-400 text-sm">15 minutes · 30-day paid pilot · No long-term commitment.</p>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <Logo />
          <p className="italic text-gray-400 mt-4 mb-2">Never miss another client.</p>
          <p className="text-sm text-gray-500">novixone.co</p>
        </div>
      </footer>
    </main>
  );
}
