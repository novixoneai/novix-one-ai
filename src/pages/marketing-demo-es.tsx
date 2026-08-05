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
    title: "Agentes de voz IA",
    short: "Contesta cada llamada",
    tag: "VOZ / 01",
    number: "01",
    accent: "blue",
    description: "Contesta llamadas 24/7, agenda citas, responde preguntas y captura cada cliente potencial.",
    bullets: ["Llamadas atendidas", "Citas agendadas", "Clientes capturados"],
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
    title: "Sitios web que consiguen clientes",
    short: "Convierte búsquedas en visitas",
    tag: "WEB / 04",
    number: "04",
    accent: "champagne",
    description: "Atrae a los clientes correctos con un sitio web rápido, claro y optimizado para búsqueda.",
    bullets: ["Posicionamiento claro", "Estructura lista para búsqueda", "Funciona en todos los dispositivos"],
  },
];

const faqs = [
  ["¿Funcionará esto con mis herramientas actuales?", "Generalmente sí. Conectamos lo que funciona y solo reemplazamos lo que no."],
  ["¿Qué tan rápido podemos lanzar?", "Muchos proyectos se lanzan en dos a cuatro semanas, dependiendo del alcance."],
  ["¿Qué sucede en la evaluación gratuita?", "Identificamos un problema de alto valor y te mostramos el siguiente paso más simple."],
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
  const [form, setForm] = useState({ name: "", email: "", service: "Agentes de voz IA", message: "" });

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
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegación principal">
          <a href="#problems" onClick={closeMenu}>Desafíos <ArrowUpRight size={14} /></a>
          <a href="#services" onClick={closeMenu}>Soluciones <ArrowUpRight size={14} /></a>
          <a href="#process" onClick={closeMenu}>Proceso <ArrowUpRight size={14} /></a>
          <a href="#contact" onClick={closeMenu}>Contacto <ArrowUpRight size={14} /></a>
        </nav>
        <div className="header-right">
          <a href="/" className="language-link" aria-label="View in English"><span className="flag">🇺🇸</span> EN</a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <Reveal><p className="eyebrow"><span className="eyebrow-dot" />Sistemas IA para negocios cansados de trabajo administrativo.</p></Reveal>
          <Reveal delay={80}><h1>Deja de perder <em>clientes</em><br />por tareas administrativas.</h1></Reveal>
          <Reveal delay={150}><p className="hero-intro">Contestamos tus llamadas, automatizamos la administración, y construimos las herramientas digitales que tu negocio necesita—sin agregar otro proyecto a tu lista.</p></Reveal>
          <Reveal delay={220} className="hero-cta-row"><a className="button button-primary" href="#contact">Agenda tu evaluación gratuita <ArrowUpRight size={16} /></a><a className="text-link" href="#services">Mira cómo podemos ayudarte <ArrowDownRight size={16} /></a></Reveal>
          <Reveal delay={290}><p className="hero-trust">Un sistema práctico. Menos trabajo. Más crecimiento.</p></Reveal>
          <Reveal className="hero-proof" delay={360}>
            <article className="proof-card"><div className="proof-card-top"><strong>24/7</strong><span className="proof-card-icon"><Clock3 size={20} /></span></div><h3>Contesta cada llamada</h3><p>IA maneja llamadas, agenda citas y captura clientes cuando tu equipo está ocupado.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>2–4 sem</strong><span className="proof-card-icon"><Rocket size={20} /></span></div><h3>Lanza sin esperas</h3><p>De la primera conversación a un sistema funcionando en semanas.</p></article>
            <article className="proof-card"><div className="proof-card-top"><strong>100%</strong><span className="proof-card-icon"><Hammer size={20} /></span></div><h3>Diseñado para ti</h3><p>Sin plantillas. Las herramientas se adaptan a tu flujo de trabajo.</p></article>
          </Reveal>
        </div>
        <Reveal className="hero-media" delay={180}>
          <div className="video-index">/ 01 — UNA MEJOR FORMA DE TRABAJAR</div>
          <div className="hero-orbit" />
          <video autoPlay loop muted playsInline poster="/images/novix-one-logo-full.png"><source src="/novix-hero.mp4" type="video/mp4" /></video>
          <div className="video-note"><span className="live-dot" />siempre activo, nunca robótico</div>
        </Reveal>
      </section>

      <div className="signal-strip"><div className="signal-track"><span>Agentes de voz</span><i>✳</i><span>Automatización inteligente</span><i>✳</i><span>Aplicaciones personalizadas</span><i>✳</i><span>Sitios web que consiguen clientes</span><i>✳</i><span>Agentes de voz</span><i>✳</i><span>Automatización inteligente</span><i>✳</i></div></div>

      <section className="problem section-pad" id="problems">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">01 / EL COSTO DEL TRABAJO ADMINISTRATIVO</p><h2>¿Te está costando <em>clientes</em> el trabajo administrativo?</h2></div><p className="section-lede">Llamadas perdidas, seguimiento lento y administración repetitiva frenan silenciosamente tu crecimiento.</p></div></Reveal>
          <div className="problem-list">
            {[
              ["Las llamadas no se contestan.", "Una llamada perdida suele ser un cliente perdido. La IA contesta, califica y agenda—incluso después de horas."],
              ["Los clientes potenciales esperan demasiado.", "La rapidez gana. Respondemos mientras el interés es alto y mantenemos a los prospectos avanzando."],
              ["Tu equipo repite el mismo trabajo.", "Automatiza agendamiento, recordatorios, evaluaciones y seguimientos para que tu equipo se enfoque en clientes."],
              ["Los clientes no te encuentran.", "Un sitio web que no aparece en búsquedas no funciona. Construimos sitios rápidos y optimizados que atraen a la gente correcta."],
            ].map(([title, body], index) => <Reveal key={title} delay={index * 55}><article className="problem-item"><span className="problem-number">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpRight className="problem-arrow" size={19} /></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">02 / SOLUCIONES</p><h2>El trabajo que te quitamos <em>de encima.</em></h2></div><p className="section-lede">Sistemas IA prácticos y herramientas digitales diseñadas para tu negocio.</p></div></Reveal>
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
                <a href="#contact" className="text-link">Hablemos de este servicio <ArrowUpRight size={16} /></a>
                <div className="feature-watermark">{service.number}</div>
              </>; })()}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="process section-pad" id="process">
        <div className="shell">
          <Reveal><div className="section-heading"><div><p className="section-number">03 / EL PROCESO SIMPLE</p><h2>De tu desafío a <em>un sistema funcionando.</em></h2></div><p className="section-lede">Comienza con un problema. Nosotros hacemos el resto.</p></div></Reveal>
          <div className="process-grid">
            {[
              ['01', 'Dinos qué te está frenando.', 'Una conversación gratuita identifica dónde comenzar con más valor.'],
              ['02', 'Construimos y lanzamos.', 'Manejamos la configuración y te lo explicamos sin tecnicismos.'],
              ['03', 'Recupera tu tiempo.', 'Tu sistema funciona en el fondo mientras te enfocas en clientes.'],
            ].map(([number, title, body], index) => (
              <Reveal key={number} delay={index * 80}>
                <article className={`process-card process-card-${index + 1}`}>
                  <div className="process-card-top"><span className="process-card-number">{number}</span><span className="process-card-label">PASO {number}</span></div>
                  <div className="process-card-rule" />
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <div className="process-card-footer"><span>{index === 0 ? "Comienza aquí" : index === 1 ? "Nosotros lo hacemos" : "Sigue creciendo"}</span><ArrowUpRight size={18} /></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="why-grid shell section-pad">
          <Reveal className="why-copy"><p className="section-number">04 / POR QUÉ NOVIX ONE</p><h2>IA práctica. <em>Ayuda humana.</em></h2><ul className="why-list"><li><Check size={16} /><span><strong>Sin jerga.</strong> Consejos claros y directos.</span></li><li><Check size={16} /><span><strong>Diseñado para tu negocio.</strong> Adaptamos el sistema a tu flujo de trabajo.</span></li><li><Check size={16} /><span><strong>Apoyo después del lanzamiento.</strong> Seguimos disponibles conforme tus necesidades cambian.</span></li></ul><a className="text-link" href="#contact">Mira qué podemos automatizar <ArrowUpRight size={16} /></a></Reveal>
          <Reveal className="why-art" delay={170}><div className="why-art-ring ring-one" /><div className="why-art-ring ring-two" /><div className="why-art-core"><Sparkles size={22} /></div></Reveal>
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
          <Reveal className="contact-copy"><p className="section-number">06 / COMIENZA AQUÍ</p><h2>Recupera tu <em>tiempo.</em></h2><p>Cuéntanos qué está frenando el negocio. Te mostraremos dónde la IA puede ayudarte.</p><div className="contact-details"><a href="mailto:jorges@novixone.co"><MessageCircle size={15} />jorges@novixone.co</a><a href="tel:+18333250830"><PhoneCall size={15} />833-325-0830</a></div></Reveal>
          <Reveal delay={130}>{sent ? <div className="form-success"><div className="success-icon"><Check size={20} /></div><h3>Nos pondremos en contacto.</h3><p>Gracias por escribir. Alguien del equipo de Novix One te llamará pronto.</p><a className="text-link" href="#top">Vuelve al inicio <ArrowUpRight size={15} /></a></div> : <form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label>Nombre<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Tu nombre" /></label><label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="tu@empresa.com" /></label></div><label>¿Qué está frenando tu negocio?<select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option>Agentes de voz IA</option><option>Automatización que ahorra tiempo</option><option>Aplicaciones web personalizadas</option><option>Sitios web bonitos y optimizados</option><option>Aún no estoy seguro</option></select></label><label>Cuéntanos un poco más<textarea rows={3} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Más contexto es mejor." /></label><button className="button button-primary form-submit" type="submit">Agenda mi evaluación gratuita <ArrowUpRight size={16} /></button><p className="form-note">30 minutos. Un paso práctico hacia adelante.</p></form>}          </Reveal>
        </div></div>
      </section>

      <section className="quote-section section-pad">
        <div className="shell">
          <Reveal><div className="quote-block"><div className="quote-mark">"</div><blockquote>La IA debe devolver tiempo a tu negocio—no crear más trabajo.</blockquote><p>Comienza con una victoria práctica.</p></div></Reveal>
        </div>
      </section>

      <footer className="site-footer shell"><Logo /><div className="footer-center"><span>Miami, FL <span className="footer-dot">●</span> En todas partes</span><span>Más tiempo. Menos trabajo administrativo.</span></div><div className="footer-links"><a href="#top">Vuelve al inicio <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© 2026 Novix One.</span><span>IA para el trabajo que importa.</span></div></footer>

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
