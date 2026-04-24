import { useState, useEffect, useRef } from "react";

const SECTIONS = ["Accueil", "Parcours", "Projets", "Compétences", "Contact"];

const experiences = [
  {
    title: "Développeur Vision Industrielle",
    company: "Boulangerie — Vision industrielle",
    period: "Mai 2024 — Juil. 2024",
    type: "Stage",
    desc: "Développement d'un système de détection automatique de produits de boulangerie via caméra industrielle. Traitement d'images avec HALCON (calibration, segmentation, classification) et développement de l'interface en Java.",
    tags: ["Java", "HALCON", "Vision", "Traitement d'images"],
  },
  {
    title: "Développeur .NET",
    company: "MIT-Consulting",
    period: "Juin 2023 — Juil. 2023",
    type: "Stage",
    desc: "Conception et développement d'une application desktop VB.NET pour la gestion des stagiaires : fiches, affectation projets, suivi d'avancement, rapports. Modélisation BDD et CRUD avec Windows Forms.",
    tags: ["VB.NET", "SQL", "Windows Forms"],
  },
  {
    title: "Développeur",
    company: "LR-Consulting",
    period: "Juil. 2022 — Août 2022",
    type: "Stage",
    desc: "Développement d'applications métiers : recueil des besoins fonctionnels, conception de maquettes, développement de modules. Contribution au cycle complet (analyse, implémentation, tests).",
    tags: ["Développement", "Analyse", "Tests"],
  },
];

const projects = [
  {
    title: "LearnEco",
    subtitle: "Application éducative écologique",
    period: "Sept. 2025 — En cours",
    desc: "Application éducative JavaFX pour encourager les comportements écologiques chez les enfants. Système de missions, points et classement. Architecture Java + JavaFX + SQLite.",
    tags: ["Java", "JavaFX", "SQLite"],
    color: "#10b981",
    icon: "🌱",
  },
  {
    title: "Jeu de stratégie",
    subtitle: "Tour par tour — L2 Informatique",
    period: "Janv. 2025 — Avr. 2025",
    desc: "Conception d'un jeu de stratégie tour par tour avec gestion de ressources, bâtiments et actions. Architecture extensible et mécaniques de victoire.",
    tags: ["Java", "POO", "Game Design"],
    color: "#f59e0b",
    icon: "⚔️",
  },
];

const education = [
  { degree: "Master 1 MIAGE — Informatique Décisionnelle", school: "Université Paris-Saclay", year: "2026 — 2027", upcoming: true },
  { degree: "Licence 3 MIAGE (en cours)", school: "Université Paris-Saclay", year: "2025 — 2026", upcoming: false },
  { degree: "LP Vision pour la Robotique Industrielle", school: "Université de Nîmes", year: "2023 — 2024", upcoming: false },
  { degree: "BTS Développement des Systèmes d'Information", school: "Oujda, Maroc", year: "2021 — 2023", upcoming: false },
];

const skillGroups = [
  { label: "Langages", items: [
    { name: "Java", level: 90 }, { name: "SQL", level: 85 }, { name: "JavaScript", level: 65 },
    { name: "VB.NET", level: 60 }, { name: "C", level: 55 },
  ]},
  { label: "Technologies", items: [
    { name: "JavaFX", level: 75 }, { name: "HALCON", level: 70 }, { name: "MySQL", level: 80 },
    { name: "SQLite", level: 70 }, { name: "Git", level: 65 },
  ]},
  { label: "Conception", items: [
    { name: "POO", level: 85 }, { name: "Algorithmique", level: 80 }, { name: "Génie logiciel", level: 70 },
    { name: "BDD relationnelles", level: 85 }, { name: "Structures de données", level: 75 },
  ]},
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedBar({ level, delay, visible, color }) {
  return (
    <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 3, width: visible ? `${level}%` : "0%",
        background: `linear-gradient(90deg, ${color}, ${color}aa)`,
        transition: `width 1s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }} />
    </div>
  );
}

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w, h, particles, animId;
    function resize() {
      w = c.width = c.offsetWidth * 1;
      h = c.height = c.offsetHeight * 1;
    }
    function init() {
      resize();
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,179,237,0.15)"; ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,179,237,${0.06 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    init(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const offsets = sectionRefs.current.map(el => el?.getBoundingClientRect().top ?? 9999);
      const idx = offsets.reduce((best, top, i) => (Math.abs(top - 100) < Math.abs((offsets[best] ?? 9999) - 100) ? i : best), 0);
      setActiveSection(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i) => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const [refParcours, visParcours] = useInView();
  const [refProjets, visProjets] = useInView();
  const [refSkills, visSkills] = useInView();
  const [refContact, visContact] = useInView();

  const accent = "#3b82f6";
  const accent2 = "#8b5cf6";
  const bg = "#0a0e1a";
  const surface = "#111827";
  const surfaceLight = "#1a2236";
  const textPrimary = "#e2e8f0";
  const textSecondary = "#94a3b8";

  return (
    <div style={{ background: bg, color: textPrimary, fontFamily: "'Sora', 'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${bg}; }
        ::selection { background: ${accent}44; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${bg}; }
        ::-webkit-scrollbar-thumb { background: ${accent}44; border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes typing { from { width: 0; } to { width: 100%; } }
        @keyframes blink { 50% { border-color: transparent; } }
        .card-hover { transition: transform 0.3s, box-shadow 0.3s; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .tag-pill { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 500;
          background: rgba(59,130,246,0.1); color: ${accent}; border: 1px solid rgba(59,130,246,0.15); margin: 3px 4px 3px 0; }
        .nav-link { cursor: pointer; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 500;
          transition: all 0.3s; border: none; background: none; color: ${textSecondary}; }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .nav-link.active { color: #fff; background: ${accent}22; }
        .timeline-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid ${accent}; background: ${bg};
          position: absolute; left: -6px; top: 6px; z-index: 2; }
        .timeline-dot.active { background: ${accent}; box-shadow: 0 0 12px ${accent}66; }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "12px 0",
        background: scrolled ? `${bg}ee` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(255,255,255,0.05)` : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 18, background: `linear-gradient(135deg, ${accent}, ${accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AC</span>
          <div style={{ display: "flex", gap: 4 }}>
            {SECTIONS.map((s, i) => (
              <button key={s} className={`nav-link ${activeSection === i ? "active" : ""}`} onClick={() => scrollTo(i)}>{s}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={el => sectionRefs.current[0] = el} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Particles />
        <div style={{ position: "absolute", top: "15%", right: "-5%", width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}08, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${accent2}06, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 1 }}>
          <div style={{ animation: "fadeUp 0.8s ease-out" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: accent, letterSpacing: 3, marginBottom: 16, textTransform: "uppercase" }}>Portfolio</div>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
              Amine <span style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Chboukat</span>
            </h1>
            <div style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 300, color: textSecondary, marginBottom: 32, maxWidth: 600 }}>
              Développeur BI · Informatique Décisionnelle
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: textSecondary, maxWidth: 550, marginBottom: 40 }}>
              Étudiant en L3 MIAGE à Paris-Saclay, passionné par le traitement des données, les systèmes d'information décisionnels et le développement d'applications. En recherche d'alternance pour le Master 1 Informatique Décisionnelle.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo(2)} style={{
                padding: "14px 32px", borderRadius: 30, border: "none", cursor: "pointer",
                background: `linear-gradient(135deg, ${accent}, ${accent2})`, color: "#fff",
                fontSize: 14, fontWeight: 600, transition: "transform 0.2s, box-shadow 0.2s",
              }} onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = `0 8px 30px ${accent}44`; }}
                 onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}>
                Voir mes projets
              </button>
              <button onClick={() => scrollTo(4)} style={{
                padding: "14px 32px", borderRadius: 30, cursor: "pointer",
                background: "transparent", color: textPrimary, border: `1px solid rgba(255,255,255,0.15)`,
                fontSize: 14, fontWeight: 500, transition: "all 0.2s",
              }} onMouseEnter={e => { e.target.style.borderColor = accent; e.target.style.color = accent; }}
                 onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = textPrimary; }}>
                Me contacter
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 40, marginTop: 80, animation: "fadeUp 1s ease-out 0.3s both" }}>
            {[["3+", "Stages"], ["5+", "Projets"], ["L3→M1", "Parcours"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 32, fontWeight: 700, color: accent }}>{n}</div>
                <div style={{ fontSize: 13, color: textSecondary, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARCOURS ─── */}
      <section ref={el => { sectionRefs.current[1] = el; refParcours.current = el; }} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ opacity: visParcours ? 1 : 0, transform: visParcours ? "none" : "translateY(30px)", transition: "all 0.8s" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: accent, letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>Parcours</div>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 60 }}>Expériences & Formation</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            {/* Expériences */}
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 32, color: accent }}>Expériences</h3>
              <div style={{ position: "relative", paddingLeft: 28, borderLeft: `2px solid ${accent}22` }}>
                {experiences.map((exp, i) => (
                  <div key={i} className="card-hover" style={{
                    marginBottom: 28, padding: 24, borderRadius: 16,
                    background: surface, border: `1px solid rgba(255,255,255,0.05)`,
                    opacity: visParcours ? 1 : 0, transform: visParcours ? "none" : "translateX(-30px)",
                    transition: `all 0.6s ease-out ${i * 0.15}s`,
                  }}>
                    <div className={`timeline-dot ${i === 0 ? "active" : ""}`} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{exp.title}</div>
                        <div style={{ fontSize: 13, color: textSecondary }}>{exp.company}</div>
                      </div>
                      <div style={{ fontSize: 11, padding: "4px 10px", borderRadius: 12, background: `${accent}15`, color: accent, fontWeight: 500, whiteSpace: "nowrap" }}>{exp.period}</div>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: textSecondary, marginBottom: 12 }}>{exp.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {exp.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formation */}
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 32, color: accent2 }}>Formation</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {education.map((edu, i) => (
                  <div key={i} className="card-hover" style={{
                    padding: 24, borderRadius: 16, background: surface, border: `1px solid rgba(255,255,255,0.05)`,
                    position: "relative", overflow: "hidden",
                    opacity: visParcours ? 1 : 0, transform: visParcours ? "none" : "translateX(30px)",
                    transition: `all 0.6s ease-out ${i * 0.12}s`,
                  }}>
                    {edu.upcoming && (
                      <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, padding: "3px 10px",
                        borderRadius: 10, background: `${accent2}22`, color: accent2, fontWeight: 600, animation: "pulse 2s infinite" }}>
                        Prochain
                      </div>
                    )}
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{edu.degree}</div>
                    <div style={{ fontSize: 13, color: textSecondary }}>{edu.school}</div>
                    <div style={{ fontSize: 12, color: accent, marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>{edu.year}</div>
                    {edu.upcoming && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, ${accent2})` }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJETS ─── */}
      <section ref={el => { sectionRefs.current[2] = el; refProjets.current = el; }} style={{ padding: "100px 24px", background: `linear-gradient(180deg, transparent, ${surface}44, transparent)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ opacity: visProjets ? 1 : 0, transform: visProjets ? "none" : "translateY(30px)", transition: "all 0.8s" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: accent, letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>Projets</div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 60 }}>Réalisations</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {projects.map((p, i) => (
              <div key={i} className="card-hover" style={{
                padding: 32, borderRadius: 20, background: surface,
                border: `1px solid rgba(255,255,255,0.05)`, position: "relative", overflow: "hidden",
                opacity: visProjets ? 1 : 0, transform: visProjets ? "none" : "translateY(40px)",
                transition: `all 0.7s ease-out ${i * 0.2}s`,
              }}>
                <div style={{ position: "absolute", top: -30, right: -20, fontSize: 80, opacity: 0.06 }}>{p.icon}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${p.color}18`, fontSize: 22 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: textSecondary }}>{p.subtitle}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: p.color, marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>{p.period}</div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: textSecondary, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, ${p.color}44)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPÉTENCES ─── */}
      <section ref={el => { sectionRefs.current[3] = el; refSkills.current = el; }} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ opacity: visSkills ? 1 : 0, transform: visSkills ? "none" : "translateY(30px)", transition: "all 0.8s" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: accent, letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>Compétences</div>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 60 }}>Stack technique</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {skillGroups.map((group, gi) => (
            <div key={gi} style={{
              padding: 28, borderRadius: 20, background: surface, border: `1px solid rgba(255,255,255,0.05)`,
              opacity: visSkills ? 1 : 0, transform: visSkills ? "none" : "translateY(30px)",
              transition: `all 0.6s ease-out ${gi * 0.15}s`,
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: [accent, accent2, "#06b6d4"][gi] }}>{group.label}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {group.items.map((sk, si) => (
                  <div key={si}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{sk.name}</span>
                      <span style={{ fontSize: 11, color: textSecondary, fontFamily: "'JetBrains Mono', monospace" }}>{sk.level}%</span>
                    </div>
                    <AnimatedBar level={sk.level} delay={gi * 0.15 + si * 0.08} visible={visSkills} color={[accent, accent2, "#06b6d4"][gi]} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Langues */}
        <div style={{ display: "flex", gap: 20, marginTop: 40, justifyContent: "center",
          opacity: visSkills ? 1 : 0, transition: "all 0.8s ease-out 0.5s" }}>
          {[["Arabe", "Natif", "100%"], ["Français", "Courant", "90%"], ["Anglais", "B1", "55%"]].map(([lang, lvl, w]) => (
            <div key={lang} style={{ padding: "16px 28px", borderRadius: 16, background: surfaceLight, textAlign: "center", minWidth: 140 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{lang}</div>
              <div style={{ fontSize: 12, color: textSecondary }}>{lvl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section ref={el => { sectionRefs.current[4] = el; refContact.current = el; }} style={{ padding: "100px 24px 80px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center",
          opacity: visContact ? 1 : 0, transform: visContact ? "none" : "translateY(30px)", transition: "all 0.8s" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: accent, letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>Contact</div>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 20 }}>Travaillons ensemble</h2>
          <p style={{ fontSize: 15, color: textSecondary, lineHeight: 1.8, marginBottom: 48 }}>
            À la recherche d'une alternance en M1 Informatique Décisionnelle (MIAGE Paris-Saclay) à partir de septembre 2026. 
            Rythme : 2 semaines entreprise / 2 semaines cours.
          </p>

          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Email", value: "aminechboukat088@gmail.com", href: "mailto:aminechboukat088@gmail.com", icon: "✉" },
              { label: "LinkedIn", value: "amine-chboukat", href: "https://www.linkedin.com/in/amine-chboukat", icon: "in" },
              { label: "Téléphone", value: "07 44 78 87 86", href: "tel:+33744788786", icon: "☎" },
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener" className="card-hover" style={{
                padding: "24px 32px", borderRadius: 16, background: surface,
                border: `1px solid rgba(255,255,255,0.05)`, textDecoration: "none", color: textPrimary,
                minWidth: 200, textAlign: "center", display: "block",
                opacity: visContact ? 1 : 0, transform: visContact ? "none" : "translateY(20px)",
                transition: `all 0.5s ease-out ${i * 0.12}s`,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accent}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px", fontSize: c.icon === "in" ? 16 : 18, fontWeight: 700, color: accent }}>
                  {c.icon}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 12, color: textSecondary }}>{c.value}</div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 80, padding: "24px 0", borderTop: `1px solid rgba(255,255,255,0.05)` }}>
            <p style={{ fontSize: 12, color: textSecondary }}>
              © 2026 Amine Chboukat · Étudiant L3 MIAGE · Paris, France
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
