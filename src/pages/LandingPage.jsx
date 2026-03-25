import { useState, useEffect } from "react";
import MockupBanner from "../components/MockupBanner.jsx";
import { navigate } from "../App.jsx";

// ─── Layout 5: Movement ──────────────────────────────────────────────────────
// Pure B Corp aesthetic — cream #F5F0E8, near-black #1A1A2E, condensed serif
// headline at massive scale, horizontal ruled editorial sections, purpose-forward
function LayoutMovement() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const BC = {
    cream:   "#F5F0E8",
    ink:     "#1A1A2E",
    sage:    "#4A6741",
    rule:    "rgba(26,26,46,0.12)",
    muted:   "rgba(26,26,46,0.5)",
    soft:    "#EDE8DF",
  };

  const principles = [
    {
      num: "I",
      title: "You deserve to be heard.",
      body: "Most healthcare treats symptoms. We treat people. Every care plan begins with understanding your full story — not just your lab results."
    },
    {
      num: "II",
      title: "Evidence without compromise.",
      body: "We hold ourselves to the highest standard of evidence-based integrative medicine. Rigorous science and whole-person care are not in conflict."
    },
    {
      num: "III",
      title: "A practice built for the long term.",
      body: "We measure success not by visit volume but by sustained outcomes. Your health trajectory is the only metric that matters."
    },
  ];

  return (
    <div style={{ background: BC.cream, fontFamily: "var(--font-body)", minHeight: "100vh", color: BC.ink }}>

      {/* NAV — minimal, B Corp style */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.2rem 4rem",
        background: scrolled ? BC.cream : "transparent",
        borderBottom: scrolled ? `1px solid ${BC.rule}` : "none",
        transition: "all 0.4s"
      }}>
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", color: BC.ink, fontWeight: 600, letterSpacing: "-0.01em" }}>
          Luminal Journeys
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <a href="#principles" style={{ color: BC.muted, fontSize: "0.82rem", textDecoration: "none", letterSpacing: "0.02em" }}>Our Practice</a>
          <a href="#process" style={{ color: BC.muted, fontSize: "0.82rem", textDecoration: "none", letterSpacing: "0.02em" }}>Process</a>
          <button onClick={() => navigate("/intake")} style={{
            background: BC.ink, color: BC.cream, border: "none",
            padding: "0.65rem 1.8rem", borderRadius: "2rem", cursor: "pointer",
            fontSize: "0.82rem", fontFamily: "var(--font-body)", letterSpacing: "0.02em"
          }}>Begin Intake</button>
        </div>
      </nav>

      {/* HERO — full viewport, B Corp editorial scale */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 4rem 5rem", paddingTop: "8rem", borderBottom: `1px solid ${BC.rule}` }}>

        {/* Top rule + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
          <div style={{ height: 1, width: 48, background: BC.sage }} />
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: BC.sage }}>
            Integrative Health · Private Practice
          </span>
        </div>

        {/* Massive headline — B Corp condensed style */}
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(4rem, 11vw, 10rem)",
          fontWeight: 400, lineHeight: 0.95,
          color: BC.ink, letterSpacing: "-0.03em",
          marginBottom: "4rem", maxWidth: "90%"
        }}>
          Care that begins<br />
          with <em style={{ color: BC.sage, fontStyle: "italic" }}>listening.</em>
        </h1>

        {/* Bottom row — description + CTA split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-end", paddingTop: "3rem", borderTop: `1px solid ${BC.rule}` }}>
          <p style={{ fontSize: "1.1rem", color: BC.muted, lineHeight: 1.8, maxWidth: 480 }}>
            A private integrative health practice for people who want a care team that treats the whole person — not just the presenting complaint.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1.5rem" }}>
            <button onClick={() => navigate("/intake")} style={{
              background: BC.ink, color: BC.cream, border: "none",
              padding: "1.1rem 3rem", borderRadius: "3rem", cursor: "pointer",
              fontSize: "1rem", fontFamily: "var(--font-body)", letterSpacing: "0.02em"
            }}>Begin Your Intake →</button>
            <span style={{ fontSize: "0.78rem", color: BC.muted }}>5 minutes · No commitment required</span>
          </div>
        </div>
      </div>

      {/* STATS ROW — B Corp impact numbers style */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: `1px solid ${BC.rule}` }}>
        {[
          { v: "94%", l: "Client Retention" },
          { v: "12+", l: "Years of Practice" },
          { v: "48h", l: "First Appointment" },
          { v: "1:1", l: "Personalized Care" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "3rem 4rem",
            borderRight: i < 3 ? `1px solid ${BC.rule}` : "none"
          }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "3.5rem", color: BC.ink, lineHeight: 1, letterSpacing: "-0.03em" }}>{s.v}</div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: BC.muted, marginTop: "0.6rem" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* PRINCIPLES — B Corp editorial ruled sections */}
      <div id="principles">
        {principles.map((p, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "80px 1fr 1fr",
            gap: "4rem", alignItems: "start",
            padding: "4rem", borderBottom: `1px solid ${BC.rule}`,
            transition: "background 0.3s"
          }}
            onMouseEnter={e => e.currentTarget.style.background = BC.soft}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: BC.muted, fontStyle: "italic", paddingTop: "0.4rem" }}>{p.num}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 400, color: BC.ink, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{p.title}</h3>
            <p style={{ fontSize: "1rem", color: BC.muted, lineHeight: 1.8, paddingTop: "0.4rem" }}>{p.body}</p>
          </div>
        ))}
      </div>

      {/* PROCESS — B Corp full-width section */}
      <div id="process" style={{ padding: "6rem 4rem", borderBottom: `1px solid ${BC.rule}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: BC.muted }}>The Process</span>
          <div style={{ flex: 1, height: 1, background: BC.rule }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0" }}>
          {[
            { step: "01", title: "Complete Intake", detail: "A thorough 5-minute form that captures what matters most before we meet." },
            { step: "02", title: "Initial Consultation", detail: "60 minutes. Full history. No rush. This is where your care plan begins." },
            { step: "03", title: "Your Protocol", detail: "A personalized, evidence-based plan built entirely around your biology and goals." },
            { step: "04", title: "Ongoing Partnership", detail: "Regular refinements, direct access, and accountability — for the long term." },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "3rem 2.5rem",
              borderRight: i < 3 ? `1px solid ${BC.rule}` : "none",
              borderLeft: i === 0 ? `1px solid ${BC.rule}` : "none"
            }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: BC.muted, marginBottom: "1.5rem" }}>{s.step}</div>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: BC.ink, marginBottom: "1rem", letterSpacing: "-0.01em" }}>{s.title}</h4>
              <p style={{ fontSize: "0.88rem", color: BC.muted, lineHeight: 1.75 }}>{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MANIFESTO BAND — B Corp "We believe" style */}
      <div style={{ background: BC.ink, padding: "7rem 4rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: "4rem" }} />
          <p style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            fontWeight: 400, color: BC.cream,
            lineHeight: 1.4, letterSpacing: "-0.02em", marginBottom: "3rem",
            fontStyle: "italic"
          }}>
            "Your health is not a problem to be solved.<br />
            It is a story to be understood."
          </p>
          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: "3rem" }} />
          <button onClick={() => navigate("/intake")} style={{
            background: "transparent", color: BC.cream,
            border: `1px solid rgba(255,255,255,0.3)`,
            padding: "1rem 2.8rem", borderRadius: "3rem", cursor: "pointer",
            fontSize: "0.9rem", fontFamily: "var(--font-body)", letterSpacing: "0.04em",
            transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = BC.cream; e.currentTarget.style.color = BC.ink; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = BC.cream; }}
          >Begin Your Intake →</button>
        </div>
      </div>

      {/* FOOTER — B Corp minimal */}
      <footer style={{ padding: "2.5rem 4rem", borderTop: `1px solid ${BC.rule}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontFamily: "var(--font-heading)", color: BC.ink, fontSize: "1rem", letterSpacing: "-0.01em" }}>Luminal Journeys</span>
        <span style={{ fontSize: "0.73rem", color: BC.muted }}>© {new Date().getFullYear()} Luminal Journeys · All rights reserved</span>
        <button onClick={() => navigate("/admin")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.65rem", color: BC.muted, opacity: 0.4, letterSpacing: "0.1em" }}>Admin</button>
      </footer>
    </div>
  );
}


// ─── Export ───────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <LayoutMovement />
      <MockupBanner />
    </>
  );
}