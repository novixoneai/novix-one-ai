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
    title: "Agentes de voz con IA",
    short: "Contesta cada llamada",
    tag: "VOZ / 01",
    number: "01",
    accent: "blue",
    description: "Contestan llamadas 24/7, agendan citas, responden preguntas y captan cada prospecto. Llaman y califican a los prospectos, haciendo las preguntas correctas, con una voz cálida y humana.",
    bullets: ["Llamadas atendidas", "Citas agendadas", "Clientes captados"],
  },
  {
    icon: Workflow,
    title: "Automatización que ahorra tiempo",
    short: "Devuelve horas a tu equipo",
    tag: "SISTEMAS / 02",
    number: "02",
    accent: "aqua",
    description: "Automatiza recordatorios, seguimientos, evaluaciones de clientes, agendamiento y entrada de datos repetitiva.",
    bullets: ["Menos administración", "Seguimiento más rápido", "Más tiempo para clientes"],
  },
  {
    icon: Bot,
    title: "Aplicaciones web personalizadas",
    short: "Software que se adapta a ti",
    tag: "PRODUCTO / 03",
    number: "03",
    accent: "silver",
    description: "Portal de clientes, herramienta de reservas o panel de control diseñado exactamente para tu flujo de trabajo.",
    bullets: ["Tu flujo de trabajo", "Tu equipo", "Tu próximo nivel"],
  },
  {
    icon: Globe2,
    title: "Sitios web que atraen clientes",
    short: "Convierte búsquedas en visitas",
    tag: "WEB / 04",
    number: "04",
    accent: "champagne",
    description: "Atrae a los clientes correctos con un sitio web rápido, claro y optimizado para búsqueda.",
    bullets: ["Posicionamiento claro", "Estructura lista para búsqueda", "Funciona en todos los dispositivos", "Listo para SEO, GEO y AEO"],
  },
];

const faqs = [
  ["¿Esto funcionará con las herramientas que ya uso?", "Por lo general, sí. Conectamos lo que ya funciona y solo reemplazamos lo que no."],
  ["¿Qué tan rápido podemos lanzar?", "La mayoría de los proyectos se lanzan en dos a cuatro semanas, según el alcance."],
  ["¿Qué pasa en la evaluación gratuita?", "Identificamos un problema de alto impacto y te mostramos el siguiente paso, el más sencillo."],
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

function Logo() {
  return <a className="brand" href="#top" aria-label="Novix One inicio"><img src="/images/novix-one-logo-full.png" alt="Novix One" /></a>;
}

export default function MarketingDemoES() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "Agentes de voz con IA" });

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
    fetch("https://jsos.zo.space/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: "novixone_contact_form_es" }),
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
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegación principal">
          <a href="#problems" onClick={closeMenu}>Tus Problemas <ArrowUpRight size={14} /></a>
          <a href="#services" onClick={closeMenu}>Nuestras Soluciones <ArrowUpRight size={14} /></a>
          <a href="#process" onClick={closeMenu}>El Proceso <ArrowUpRight size={14} /></a>
          <a href="#contact" onClick={closeMenu}>Contacto <ArrowUpRight size={14} /></a>
        </nav>
        <div className="header-right">
          <a href="/" className="language-link" aria-label="View in English"><span className="flag">🇺🇸</span> EN</a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="eyebrow-dot" />Recupera tu tiempo y tus ingresos.</p></Reveal>
          <Reveal delay={80}><h1>Deja de perder <em>clientes</em><br />por trabajo improductivo.</h1></Reveal>
          <Reveal delay={150}><p className="hero-intro">Contestamos tus llamadas, automatizamos la administración y creamos las herramientas digitales que tu negocio necesita, sin sumar otro proyecto a tu lista.</p></Reveal>
          <Reveal delay={220} className="hero-cta-row"><a className="button button-primary" href="#contact">Agenda tu evaluación gratuita <ArrowUpRight size={16} /></a><a className="text-link" href="#services">Descubre cómo podemos ayudarte <ArrowDownRight size={16} /></a></Reveal>
          <Reveal delay={290}><p className="hero-trust">Un sistema práctico. Menos trabajo. Más crecimiento.</p></Reveal>
          <Reveal className="hero-proof" delay={360}>
            <article className="proof-card"><div className="proof-card-top"><strong>24/7</strong><span className="proof-card-icon"><Clock3 size={20} /></span></div><h3>Contestamos cada llamada</h3><p>La IA atiende llamadas, agenda citas y capta clientes cuando tu equipo está ocupado.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>2–4 sem</strong><span className="proof-card-icon"><Rocket size={20} /></span></div><h3>Lanza sin esperas</h3><p>De la primera conversación a un sistema en marcha en cuestión de semanas.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>100%</strong><span className="proof-card-icon"><Hammer size={20} /></span></div><h3>Hecho a tu medida</h3><p>Sin plantillas. Las herramientas se adaptan a tu forma de trabajar.</p></article>
          </Reveal>
        </div>
        <Reveal className="hero-media" delay={180}>
          <div className="video-index">/ 01 — UNA MEJOR FORMA DE TRABAJAR</div>
          <div className="hero-orbit" />
          <video autoPlay loop muted playsInline poster="/images/novix-one-logo-full.png"><source src="/novix-hero.mp4" type="video/mp4" /></video>
          <div className="video-note"><span className="live-dot" />siempre activo, nunca robótico</div>
        </Reveal>
      </section>

      <div className="signal-strip"><div className="signal-track"><span>Agentes de voz</span><i>✳</i><span>Automatización inteligente</span><i>✳</i><span>Aplicaciones personalizadas</span><i>✳</i><span>Sitios web que atraen clientes</span><i>✳</i><span>Agentes de voz</span><i>✳</i><span>Automatización inteligente</span><i>✳</i></div></div>

      <section className="problem section-pad" id="problems">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">01 / EL COSTO DEL TRABAJO ADMINISTRATIVO</p><h2>¿El trabajo administrativo te está costando <em>clientes</em>?</h2></div><p className="section-lede">Llamadas perdidas, seguimientos lentos y tareas repetitivas frenan tu crecimiento sin que lo notes.</p></div></Reveal>
          <div className="problem-list">
            {[
              ["Cada llamada perdida es dinero perdido.", "La mayoría de quienes llaman no dejan mensaje de voz — llaman a tu competencia. Nuestra IA contesta, califica y agenda, de día o de noche, para que una llamada perdida se convierta en un trabajo agendado."],
              ["El seguimiento lento te cuesta ventas.", "Los prospectos contactados en los primeros minutos convierten mucho más que los que se persiguen horas después. Respondemos al instante, mientras el interés está caliente — y mantenemos al prospecto avanzando hacia la venta."],
              ["Las tareas repetitivas se comen tu nómina.", "Cada hora que tu equipo dedica a agendar, recordar y registrar datos es una hora que pagas y que no hace crecer el negocio. La automatizamos para que tu gente se enfoque en clientes que pagan."],
              ["Si los clientes no te encuentran, pagas por ser invisible.", "Un sitio que no aparece en búsquedas es presupuesto de marketing sin nada que mostrar. Creamos sitios rápidos y optimizados que atraen a las personas correctas — y que se pagan solos."],
            ].map(([title, body], index) => <Reveal key={title} delay={index * 55}><article className="problem-item"><span className="problem-number">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">02 / SOLUCIONES</p><h2>El trabajo que te quitamos <em>de encima.</em></h2></div><p className="section-lede">Sistemas de IA prácticos y herramientas digitales diseñados para tu negocio.</p></div></Reveal>
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
                <a href="#contact" className="text-link">Hablemos de este servicio <ArrowUpRight size={16} /></a>
                <div className="feature-watermark">{service.number}</div>
              </>; })()}
            </div>
          </div>
        </div>
      </section>

      <section className="process section-pad" id="process">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">03 / EL PROCESO, PASO A PASO</p><h2>De tu obstáculo a <em>un sistema funcionando.</em></h2></div><p className="section-lede">Empieza con un problema. Del resto nos encargamos nosotros.</p></div></Reveal>
          <div className="process-grid">
            {[
              ['01', 'Cuéntanos qué te está frenando.', 'Una conversación gratuita para encontrar los cuellos de botella y el punto de mayor impacto para empezar.'],
              ['02', 'Construimos, automatizamos y lo lanzamos.', 'Nos encargamos de la configuración, las conexiones y de que todo siga funcionando. Y te lo explicamos sin tecnicismos.'],
              ['03', 'Recupera tu tiempo, reduce tus costos y genera más ingresos.', 'Tu sistema trabaja en segundo plano — contestando, agendando y dando seguimiento — mientras tú te enfocas en tus clientes. La mayoría de nuestros clientes recuperan varias horas a la semana y dejan de perder prospectos en el primer mes.'],
            ].map(([number, title, body], index) => (
              <Reveal key={number} delay={index * 80}>
                <article className={`process-card process-card-${index + 1}`}>
                  <div className="process-card-top"><span className="process-card-number">{number}</span><span className="process-card-label">PASO {number}</span></div>
                  <div className="process-card-rule" />
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <div className="process-card-footer"><span>{index === 0 ? "Comienza aquí" : index === 1 ? "Nosotros lo hacemos" : "Sigue creciendo"}</span></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="why-grid shell section-pad">
          <Reveal className="why-copy"><p className="section-number">04 / POR QUÉ NOVIX ONE</p><h2>IA práctica. <em>Ayuda humana.</em></h2><ul className="why-list"><li><Check size={16} /><span><strong>Sin jerga.</strong> Consejos claros y directos.</span></li><li><Check size={16} /><span><strong>Diseñado para tu negocio.</strong> Adaptamos el sistema a tu forma de trabajar.</span></li><li><Check size={16} /><span><strong>Acompañamiento después del lanzamiento.</strong> Seguimos a tu lado conforme cambian tus necesidades.</span></li></ul><a className="text-link" href="#contact">Descubre qué podemos automatizar <ArrowUpRight size={16} /></a></Reveal>
          <Reveal className="why-art" delay={170}><div className="why-art-ring ring-one" /><div className="why-art-ring ring-two" /><div className="why-art-core"><div className="waveform" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></Reveal>
        </div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <div className="shell faq-grid">
          <Reveal><div><p className="section-number">05 / PREGUNTAS</p><h2>Respuestas claras<br /><em>antes de empezar.</em></h2><p className="faq-intro">Sin presión. Solo una primera conversación útil.</p></div></Reveal>
          <Reveal delay={100}><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></Reveal>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="shell"><div className="contact-panel">
          <Reveal className="contact-copy"><p className="section-number">06 / COMIENZA AQUÍ</p><h2>Recupera tu <em>tiempo.</em></h2><p>Cuéntanos qué está frenando tu negocio. Te mostraremos dónde la IA puede ayudarte.</p><div className="contact-details"><a href="tel:+18333250830"><PhoneCall size={15} />833-325-0830</a></div></Reveal>
          <Reveal delay={130}>{sent ? <div className="form-success"><div className="success-icon"><Check size={20} /></div><h3>Elige un horario.</h3><p>Recibimos tus datos. Elige una hora en el calendario y nos vemos ahí.</p><button className="button button-primary form-submit" type="button" onClick={() => setBookingOpen(true)}>Abrir el calendario <ArrowUpRight size={16} /></button><a className="text-link" href="#top">Volver al inicio <ArrowUpRight size={15} /></a></div> : <form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label>Nombre<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Tu nombre" /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="tu@empresa.com" /></label></div><label>¿Cuál de nuestras soluciones te interesa?<select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option>Agentes de voz con IA</option><option>Automatización que ahorra tiempo</option><option>Aplicaciones web personalizadas</option><option>Sitios web que atraen clientes</option><option>Aún no estoy seguro</option></select></label><button className="button button-primary form-submit" type="submit">Agenda mi evaluación gratuita <ArrowUpRight size={16} /></button><p className="form-note">45 minutos. Un paso práctico hacia adelante.</p></form>}          </Reveal>
          {bookingOpen && <div className="booking-modal-backdrop" role="presentation" onClick={() => setBookingOpen(false)}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onClick={(event) => event.stopPropagation()}><div className="booking-modal-header"><div><p className="section-number">AGENDA</p><h3 id="booking-title">Elige un horario para tu evaluación gratuita.</h3></div><button className="booking-modal-close" type="button" onClick={() => setBookingOpen(false)} aria-label="Cerrar calendario">×</button></div><style>{`
            .cal-embed { --cal-brand-color: #9bc8ed !important; --cal-brand-text-color: #061426 !important; }
          `}</style><iframe src={`https://cal.com/novixone/45min?user=novixone&theme=light&name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}`} title="Agenda tu evaluación gratuita" style={{ colorScheme: 'light' }} /></div></div>}
        </div></div>
      </section>

      <section className="quote-section section-pad">
        <div className="shell">
          <Reveal><div className="quote-block"><div className="quote-mark">"</div><blockquote>La IA debe devolverle tiempo a tu negocio, no crearte más trabajo.</blockquote><p>Empieza con una victoria práctica.</p></div></Reveal>
        </div>
      </section>

      <footer className="site-footer shell"><Logo /><div className="footer-center"><span>Miami, FL <span className="footer-dot">●</span> En todas partes</span><span>Más tiempo. Menos trabajo administrativo.</span></div><div className="footer-links"><a href="#top">Volver al inicio <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© 2026 Novix One.</span><span>IA para el trabajo que importa.</span></div></footer>

      <a className="floating-call" href="#contact" aria-label="Agenda una evaluación gratuita"><Clock3 size={17} /><span>Agenda tu evaluación</span></a>
      {menuOpen && <button className="menu-backdrop" onClick={closeMenu} aria-label="Cerrar navegación" />}
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
