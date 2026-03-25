import { useState, useEffect } from "react";
import MockupBanner from "../components/MockupBanner.jsx";
import { navigate } from "../App.jsx";

// ─── Brand constants (mirror brand kit V2.0) ─────────────────────────────────
const B = {
  deep:   "#172f2d",
  teal:   "#224e4a",
  sage:   "#89a99e",
  sand:   "#e6ddd0",
  amber:  "#bf8a3e",
  paper:  "#f9f7f4",
  rule:   "rgba(23,47,45,0.1)",
  muted:  "rgba(23,47,45,0.45)",
};

// ─── Logo — wordmark treatment from brand kit ─────────────────────────────────
function Wordmark({ color = B.deep, size = "1rem" }) {
  return (
    <span style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: size,
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      lineHeight: 1,
    }}>
      Luminal Journeys
    </span>
  );
}

// ─── Logo Mark SVG (concentric rectangles per brand kit) ─────────────────────
function LogoMark({ color = B.deep, size = 32 }) {
  return (
    <svg width={size} height={size * 1.28} viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1"   y="1"   width="30" height="39" rx="0.5" stroke={color} strokeWidth="1.8" fill="none"/>
      <rect x="4.5" y="4.5" width="23" height="32" rx="0.5" stroke={color} strokeWidth="1.4" fill="none"/>
      <rect x="8.5" y="8.5" width="15" height="24" rx="0.5" stroke={color} strokeWidth="1.1" fill="none"/>
      <rect x="13"  y="13"  width="6"  height="15" rx="0.5" stroke={color} strokeWidth="0.9" fill="none"/>
    </svg>
  );
}

// ─── Layout: Movement ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

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
    <div style={{ background: B.paper, fontFamily: "var(--font-body)", minHeight: "100vh", color: B.deep }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 90,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.1rem 4rem",
        background: scrolled ? "rgba(249,247,244,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${B.rule}` : "none",
        transition: "all 0.3s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <LogoMark color={B.deep} size={22} />
          <Wordmark color={B.deep} size="0.85rem" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <a href="#principles" style={{ color: B.muted, fontSize: "0.82rem", textDecoration: "none", letterSpacing: "0.02em", fontFamily: "var(--font-mono)" }}>Our Practice</a>
          <a href="#process" style={{ color: B.muted, fontSize: "0.82rem", textDecoration: "none", letterSpacing: "0.02em", fontFamily: "var(--font-mono)" }}>Process</a>
          <button onClick={() => navigate("/intake")} style={{
            background: B.deep, color: B.paper, border: "none",
            padding: "0.65rem 1.8rem", borderRadius: "2rem", cursor: "pointer",
            fontSize: "0.82rem", fontFamily: "var(--font-body)", letterSpacing: "0.04em", fontWeight: 500
          }}>Begin Intake</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "0 4rem 5rem",
        paddingTop: "8rem", borderBottom: `1px solid ${B.rule}`
      }}>
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
          <div style={{ height: 1, width: 48, background: B.amber }} />
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: B.amber, fontFamily: "var(--font-mono)" }}>
            Integrative Health · Private Practice
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(4rem, 11vw, 10rem)",
          fontWeight: 400, lineHeight: 0.95,
          color: B.deep, letterSpacing: "-0.03em",
          marginBottom: "4rem", maxWidth: "90%"
        }}>
          Care that begins<br />
          with <em style={{ color: B.teal, fontStyle: "italic" }}>listening.</em>
        </h1>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-end", paddingTop: "3rem", borderTop: `1px solid ${B.rule}` }}>
          <p style={{ fontSize: "1.1rem", color: B.muted, lineHeight: 1.8, maxWidth: 480 }}>
            A private integrative health practice for people who want a care team that treats the whole person — not just the presenting complaint.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1.5rem" }}>
            <button onClick={() => navigate("/intake")} style={{
              background: B.deep, color: B.paper, border: "none",
              padding: "1.1rem 3rem", borderRadius: "3rem", cursor: "pointer",
              fontSize: "1rem", fontFamily: "var(--font-body)", letterSpacing: "0.02em", fontWeight: 500
            }}>Begin Your Intake →</button>
            <span style={{ fontSize: "0.78rem", color: B.muted, fontFamily: "var(--font-mono)" }}>5 minutes · No commitment required</span>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: `1px solid ${B.rule}` }}>
        {[
          { v: "94%", l: "Client Retention" },
          { v: "12+", l: "Years of Practice" },
          { v: "48h", l: "First Appointment" },
          { v: "1:1", l: "Personalized Care" },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "3rem 4rem",
            borderRight: i < 3 ? `1px solid ${B.rule}` : "none"
          }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "3.5rem", color: B.deep, lineHeight: 1, letterSpacing: "-0.03em" }}>{s.v}</div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: B.muted, marginTop: "0.6rem", fontFamily: "var(--font-mono)" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* PRINCIPLES */}
      <div id="principles">
        {principles.map((p, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "80px 1fr 1fr",
            gap: "4rem", alignItems: "start",
            padding: "4rem", borderBottom: `1px solid ${B.rule}`,
            transition: "background 0.3s", cursor: "default"
          }}
            onMouseEnter={e => e.currentTarget.style.background = B.sand}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: B.muted, fontStyle: "italic", paddingTop: "0.4rem" }}>{p.num}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 400, color: B.deep, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{p.title}</h3>
            <p style={{ fontSize: "1rem", color: B.muted, lineHeight: 1.8, paddingTop: "0.4rem" }}>{p.body}</p>
          </div>
        ))}
      </div>

      {/* PROCESS */}
      <div id="process" style={{ padding: "6rem 4rem", borderBottom: `1px solid ${B.rule}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: B.muted, fontFamily: "var(--font-mono)" }}>The Process</span>
          <div style={{ flex: 1, height: 1, background: B.rule }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {[
            { step: "01", title: "Complete Intake",      detail: "A thorough 5-minute form that captures what matters most before we meet." },
            { step: "02", title: "Initial Consultation", detail: "60 minutes. Full history. No rush. This is where your care plan begins." },
            { step: "03", title: "Your Protocol",        detail: "A personalized, evidence-based plan built entirely around your biology and goals." },
            { step: "04", title: "Ongoing Partnership",  detail: "Regular refinements, direct access, and accountability — for the long term." },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "3rem 2.5rem",
              borderRight: i < 3 ? `1px solid ${B.rule}` : "none",
              borderLeft: i === 0 ? `1px solid ${B.rule}` : "none"
            }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: B.amber, marginBottom: "1.5rem", fontFamily: "var(--font-mono)" }}>{s.step}</div>
              <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: B.deep, marginBottom: "1rem", letterSpacing: "-0.01em" }}>{s.title}</h4>
              <p style={{ fontSize: "0.88rem", color: B.muted, lineHeight: 1.75 }}>{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <div style={{ background: B.deep, padding: "7rem 4rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: "4rem" }} />
          <p style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            fontWeight: 400, color: B.paper,
            lineHeight: 1.4, letterSpacing: "-0.02em",
            marginBottom: "3rem", fontStyle: "italic"
          }}>
            "Real leadership starts within."
          </p>
          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: "3rem" }} />
          <button onClick={() => navigate("/intake")} style={{
            background: "transparent", color: B.paper,
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "1rem 2.8rem", borderRadius: "3rem", cursor: "pointer",
            fontSize: "0.9rem", fontFamily: "var(--font-body)", letterSpacing: "0.04em",
            transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = B.paper; e.currentTarget.style.color = B.deep; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = B.paper; }}
          >Begin Your Intake →</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ padding: "2.5rem 4rem", borderTop: `1px solid ${B.rule}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <LogoMark color={B.deep} size={18} />
          <Wordmark color={B.deep} size="0.78rem" />
        </div>
        <span style={{ fontSize: "0.73rem", color: B.muted, fontFamily: "var(--font-mono)" }}>
          © {new Date().getFullYear()} Luminal Journeys · All rights reserved
        </span>
        <button onClick={() => navigate("/admin")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.65rem", color: B.muted, opacity: 0.4, letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>Admin</button>
      </footer>

      <MockupBanner />
    </div>
  );
}