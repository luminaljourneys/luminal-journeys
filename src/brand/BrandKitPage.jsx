import { useState } from "react";
import { navigate } from "../App.jsx";

const BRAND_PASS = "lj-brand-2026";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const C = {
  deepTeal:  "#172f2d",
  brandTeal: "#224e4a",
  sage:      "#89a99e",
  sand:      "#e6ddd0",
  amber:     "#bf8a3e",
  paper:     "#f9f7f4",
  bg:        "#f9f7f4",
  rule:      "rgba(23,47,45,0.1)",
  muted:     "rgba(23,47,45,0.45)",
};

// ─── Logo Mark SVG ────────────────────────────────────────────────────────────
function LogoMark({ color = C.deepTeal, size = 48 }) {
  const s = size;
  const b = s * 0.08;
  return (
    <svg width={s} height={s * 1.3} viewBox="0 0 48 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="44" height="58" rx="1" stroke={color} strokeWidth="2.5" fill="none"/>
      <rect x="7" y="7" width="34" height="48" rx="1" stroke={color} strokeWidth="1.8" fill="none"/>
      <rect x="13" y="13" width="22" height="36" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="19" y="19" width="10" height="24" rx="1" stroke={color} strokeWidth="1.2" fill="none"/>
    </svg>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ num, label, title, subtitle }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.2rem" }}>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: C.muted, fontFamily: "'DM Mono', monospace" }}>
          {num} — {label}
        </span>
        <div style={{ flex: 1, height: 1, background: C.rule }} />
      </div>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 400, color: C.deepTeal, letterSpacing: "-0.02em", marginBottom: subtitle ? "0.8rem" : 0 }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: "1rem", color: C.muted, lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ children, bg = "#fff", style = {} }) {
  return (
    <div style={{ background: bg, borderRadius: "1rem", padding: "2rem", border: `1px solid ${C.rule}`, ...style }}>
      {children}
    </div>
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────
function Tag({ children }) {
  return (
    <span style={{
      display: "inline-block", background: C.sand, color: C.deepTeal,
      fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
      padding: "0.3rem 0.8rem", borderRadius: "2rem", margin: "0.25rem",
      fontFamily: "'DM Mono', monospace"
    }}>{children}</span>
  );
}

// ─── Numbered Item ────────────────────────────────────────────────────────────
function NumberedItem({ num, title, body, accent = false }) {
  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
        <span style={{ fontSize: "0.75rem", color: accent ? C.amber : C.muted, fontFamily: "'DM Mono', monospace", flexShrink: 0, paddingTop: "0.2rem" }}>{num}</span>
        <div>
          <div style={{ fontSize: "1rem", fontWeight: 600, color: C.deepTeal, marginBottom: "0.4rem" }}>{title}</div>
          {body && <div style={{ fontSize: "0.88rem", color: C.muted, lineHeight: 1.7 }}>{body}</div>}
        </div>
      </div>
    </Card>
  );
}

// ─── Password Gate ────────────────────────────────────────────────────────────
function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (pw === BRAND_PASS) { onAuth(); }
    else { setError(true); setPw(""); }
  };

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: "2rem"
    }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <LogoMark color={C.deepTeal} size={40} />
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.4rem", color: C.deepTeal, marginTop: "1.2rem", marginBottom: "0.3rem" }}>
            Brand Kit
          </div>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted }}>
            Luminal Journeys · V2.0 · Restricted
          </div>
        </div>

        <Card>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: "0.5rem" }}>Access Code</div>
          <input
            type="password" value={pw} autoFocus
            onChange={e => { setPw(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="Enter brand kit password"
            style={{
              width: "100%", padding: "0.8rem 1rem", boxSizing: "border-box",
              border: `1.5px solid ${error ? "#bf8a3e" : C.rule}`,
              borderRadius: "0.5rem", fontSize: "0.92rem", outline: "none",
              background: C.paper, color: C.deepTeal, marginBottom: "1rem",
              fontFamily: "'DM Sans', sans-serif"
            }}
          />
          {error && <div style={{ fontSize: "0.8rem", color: C.amber, marginBottom: "0.8rem" }}>Incorrect access code.</div>}
          <button onClick={submit} style={{
            width: "100%", background: C.deepTeal, color: C.paper, border: "none",
            padding: "0.85rem", borderRadius: "0.5rem", cursor: "pointer",
            fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500
          }}>Access Brand Kit →</button>
        </Card>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", color: C.muted }}>
            ← Back to site
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Brand Kit Content ────────────────────────────────────────────────────────
function BrandKitContent() {
  const section = { maxWidth: 900, margin: "0 auto", padding: "5rem 3rem", borderBottom: `1px solid ${C.rule}` };

  return (
    <div style={{ background: C.bg, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <div style={{ borderBottom: `1px solid ${C.rule}`, padding: "1.2rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: C.paper, position: "sticky", top: 0, zIndex: 90 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <LogoMark color={C.deepTeal} size={20} />
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, fontFamily: "'DM Mono', monospace" }}>
            Luminal Journeys — Brand Kit V2.0
          </span>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => navigate("/admin")} style={{ background: "none", border: `1px solid ${C.rule}`, cursor: "pointer", fontSize: "0.75rem", color: C.muted, padding: "0.4rem 1rem", borderRadius: "2rem" }}>
            ← Admin
          </button>
          <button onClick={() => { sessionStorage.removeItem("lj_brand"); window.location.reload(); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: C.muted }}>
            Lock
          </button>
        </div>
      </div>

      {/* 01 — LOGO */}
      <div style={section}>
        <SectionHeader num="01" label="LOGO" title="Luminal Journeys" subtitle="Real leadership starts within." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {/* Light mark */}
          <Card bg={C.sand} style={{ textAlign: "center", padding: "4rem 2rem 2rem" }}>
            <LogoMark color={C.deepTeal} size={52} />
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: C.muted, marginTop: "2rem", fontFamily: "'DM Mono', monospace" }}>LOGO MARK</div>
          </Card>
          {/* Wordmark light */}
          <Card bg={C.sand} style={{ textAlign: "center", padding: "4rem 2rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.4rem", color: C.deepTeal, letterSpacing: "0.12em", textTransform: "uppercase" }}>LUMINAL JOURNEYS</span>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: C.muted, marginTop: "2rem", fontFamily: "'DM Mono', monospace" }}>WORDMARK</div>
          </Card>
          {/* Dark mark */}
          <Card bg={C.brandTeal} style={{ textAlign: "center", padding: "4rem 2rem 2rem" }}>
            <LogoMark color={C.amber} size={52} />
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(249,247,244,0.45)", marginTop: "2rem", fontFamily: "'DM Mono', monospace" }}>ON DARK</div>
          </Card>
          {/* Dark wordmark */}
          <Card bg={C.brandTeal} style={{ textAlign: "center", padding: "4rem 2rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.4rem", color: C.amber, letterSpacing: "0.12em", textTransform: "uppercase" }}>LUMINAL JOURNEYS</span>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(249,247,244,0.45)", marginTop: "2rem", fontFamily: "'DM Mono', monospace" }}>ON DARK</div>
          </Card>
        </div>
      </div>

      {/* 02 — NAME ORIGIN */}
      <div style={section}>
        <SectionHeader num="02" label="NAME ORIGIN" title="The Meaning Behind the Name" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <Card>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: C.deepTeal, marginBottom: "0.8rem" }}>Luminal</div>
            <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.75, marginBottom: "1.2rem" }}>
              Refers to the inner space where transformation occurs — the internal channel <em>(lumen)</em> through which insight, awareness, and change move.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
              {["Inner Exploration", "Illumination", "Psychological Depth"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: C.deepTeal, marginBottom: "0.8rem" }}>Journeys</div>
            <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.75 }}>
              Acknowledges that this work is a process over time, not a single event. Together, the name signals guided inner exploration that leads to meaningful transformation.
            </p>
          </Card>
        </div>
      </div>

      {/* 03 — MISSION & VISION */}
      <div style={section}>
        <SectionHeader num="03" label="MISSION & VISION" title="Purpose & Direction" />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>MISSION</div>
            <p style={{ fontSize: "1rem", color: C.deepTeal, lineHeight: 1.8 }}>
              To support leaders in doing the inner work required to lead with clarity, responsibility, and connection — through a structured process that integrates science, psychology, and psychedelic-assisted insight.
            </p>
          </Card>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>VISION</div>
            <p style={{ fontSize: "1rem", color: C.deepTeal, lineHeight: 1.8, marginBottom: "1.5rem" }}>
              To shape a new generation of leaders who are self-aware, emotionally integrated, and systemically responsible — and to establish a new standard for leadership development that includes inner transformation as essential, not optional.
            </p>
            <div style={{ borderTop: `1px solid ${C.rule}`, paddingTop: "1rem" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: C.muted, fontFamily: "'DM Mono', monospace", marginBottom: "0.8rem" }}>LONG-TERM VISION</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {["Global community of leaders", "Multiple retreat environments", "Research-backed methodology", "Train-the-trainer ecosystem"].map(v => (
                  <div key={v} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.85rem", color: C.muted }}>
                    <span style={{ color: C.sage, marginTop: "0.15rem" }}>◎</span>{v}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 04 — COLOR PALETTE */}
      <div style={section}>
        <SectionHeader num="04" label="COLOR PALETTE" title="Grounded. Warm. Intentional." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {[
            { name: "Deep Teal",  hex: "#172f2d", usage: "Headlines, primary text",    text: "#fff" },
            { name: "Brand Teal", hex: "#224e4a", usage: "Primary actions, links",     text: "#fff" },
            { name: "Sage",       hex: "#89a99e", usage: "Supporting elements",        text: "#172f2d" },
            { name: "Sand",       hex: "#e6ddd0", usage: "Backgrounds, cards",         text: "#172f2d" },
            { name: "Warm Amber", hex: "#bf8a3e", usage: "Accent, highlights",         text: "#fff" },
            { name: "Paper",      hex: "#f9f7f4", usage: "Page background",            text: "#172f2d" },
          ].map(c => (
            <div key={c.hex} style={{ border: `1px solid ${C.rule}`, borderRadius: "1rem", overflow: "hidden" }}>
              <div style={{ background: c.hex, height: 100 }} />
              <div style={{ padding: "1.2rem", background: "#fff" }}>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: C.deepTeal, marginBottom: "0.3rem" }}>{c.name}</div>
                <div style={{ fontSize: "0.78rem", color: C.muted, fontFamily: "'DM Mono', monospace", marginBottom: "0.4rem" }}>{c.hex}</div>
                <div style={{ fontSize: "0.78rem", color: C.muted }}>{c.usage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 05 — TYPOGRAPHY */}
      <div style={section}>
        <SectionHeader num="05" label="TYPOGRAPHY" title="Typography System" />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Card bg={C.sand}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: C.muted, fontFamily: "'DM Mono', monospace", marginBottom: "1.5rem" }}>DISPLAY — DM SERIF DISPLAY</div>
            <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.deepTeal, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              The infrastructure for inner transformation.
            </p>
          </Card>
          <Card bg={C.sand}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: C.muted, fontFamily: "'DM Mono', monospace", marginBottom: "1.5rem" }}>BODY — DM SANS</div>
            <p style={{ fontSize: "1.05rem", color: C.deepTeal, lineHeight: 1.8, marginBottom: "1rem" }}>
              A safe, structured, and deeply transformative leadership experience that integrates psychedelic insight into real-world leadership. Built for executives, founders, and senior leaders.
            </p>
            <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.75 }}>
              Integration-first model — equal emphasis on preparation, experience, and integration. Science, psychology, and psychedelic-assisted insight combined with a curated cohort of high-functioning leaders.
            </p>
          </Card>
          <Card bg={C.sand}>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: C.muted, fontFamily: "'DM Mono', monospace", marginBottom: "1.5rem" }}>MONO — DM MONO</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["LABELS", "NAVIGATION", "METADATA", "CATEGORIES", "TAGS"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
        </div>
      </div>

      {/* 06 — PRINCIPLES */}
      <div style={section}>
        <SectionHeader num="06" label="PRINCIPLES" title="What We Stand For" />
        {[
          { n: "01", t: "Safety First",               b: "Psychological and physical safety are non-negotiable." },
          { n: "02", t: "Integration Over Experience", b: "Transformation is measured by how insight is lived, not just felt." },
          { n: "03", t: "Connection as Foundation",   b: "Growth happens through connection — to self, others, and systems." },
          { n: "04", t: "Responsibility in Leadership",b: "Personal development must translate into conscious impact." },
          { n: "05", t: "Depth Over Performance",     b: "This is not surface-level optimisation — it's real inner work." },
        ].map(p => <NumberedItem key={p.n} num={p.n} title={p.t} body={p.b} />)}
      </div>

      {/* 07 — USPs */}
      <div style={section}>
        <SectionHeader num="07" label="UNIQUE SELLING PROPOSITIONS" title="What Sets Us Apart" />
        {[
          { n: "01", t: "Integration-First Model",         b: "Equal emphasis on preparation, experience, and integration." },
          { n: "02", t: "Science + Psychedelics + Leadership", b: "A rare and credible intersection that bridges three worlds responsibly." },
          { n: "03", t: "Curated Cohorts",                 b: "High-functioning leaders form the peer group — a key driver of growth." },
          { n: "04", t: "Structured Developmental Arc",    b: "Screening → Intake → Preparation → Experience → Integration → Community." },
          { n: "05", t: "Deeply Personalised",             b: "Combining 1:1, group work, and ongoing support." },
        ].map(p => <NumberedItem key={p.n} num={p.n} title={p.t} body={p.b} accent />)}
      </div>

      {/* 08 — AUDIENCE */}
      <div style={section}>
        <SectionHeader num="08" label="AUDIENCE" title="Who We Serve" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>IDEAL AUDIENCE</div>
            {["Executives, founders, and senior leaders", "High-functioning professionals in personal development", "Individuals seeking safe, structured psychedelic environments"].map(a => (
              <div key={a} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.6rem", fontSize: "0.88rem", color: C.muted }}>
                <span style={{ color: C.sage, flexShrink: 0 }}>◎</span>{a}
              </div>
            ))}
            <div style={{ marginTop: "1.2rem", padding: "1rem", background: C.sand, borderRadius: "0.5rem", fontStyle: "italic", fontSize: "0.88rem", color: C.deepTeal }}>
              "There is more depth available to me, but I don't know how to access it."
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>MOTIVATIONS</div>
            {["Deeper clarity and meaning", "Curiosity about inner exploration", "Alignment between personal and professional life"].map(m => (
              <div key={m} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.6rem", fontSize: "0.88rem", color: C.muted }}>
                <span style={{ color: C.sage, flexShrink: 0 }}>◎</span>{m}
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>PAIN POINTS</div>
            {["Internal disconnection despite external success", "Burnout or quiet dissatisfaction", "Lack of spaces for real, honest reflection"].map(p => (
              <div key={p} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.6rem", fontSize: "0.88rem", color: C.muted }}>
                <span style={{ color: C.sage, flexShrink: 0 }}>◎</span>{p}
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* 09 — BRAND PERSONALITY */}
      <div style={section}>
        <SectionHeader num="09" label="BRAND PERSONALITY" title="Who We Are" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>PERSONALITY TRAITS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Calm", "Intelligent", "Grounded", "Quietly bold", "Emotionally aware"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>IF THE BRAND WERE A PERSON</div>
            <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.75 }}>
              A combination of a clinical psychologist, a systems thinker, and a grounded, modern philosopher. Someone who is perceptive, calm, deeply present, and not performative.
            </p>
          </Card>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>EMOTIONAL BENEFITS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["More connected", "Clearer thinking", "Less alone", "More aligned", "Grounded & expanded"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
        </div>
      </div>

      {/* 10 — POSITIONING */}
      <div style={section}>
        <SectionHeader num="10" label="POSITIONING" title="Where We Stand" />
        <Card style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>PRIMARY VALUE PROPOSITION</div>
          <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.3rem", color: C.deepTeal, lineHeight: 1.6, marginBottom: "1.5rem" }}>
            A safe, structured, and deeply transformative leadership experience that integrates psychedelic insight into real-world leadership.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", borderTop: `1px solid ${C.rule}`, paddingTop: "1.2rem" }}>
            {[
              { label: "Premium, but not elitist",         sub: "Accessible gravitas without exclusivity." },
              { label: "Serious, but not rigid",           sub: "Rigorous without being cold or clinical." },
              { label: "Transformational, but not performative", sub: "Real depth without spectacle." },
            ].map(p => (
              <div key={p.label}>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: C.deepTeal, marginBottom: "0.3rem" }}>{p.label}</div>
                <div style={{ fontSize: "0.8rem", color: C.muted }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card bg={C.deepTeal}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(249,247,244,0.45)", fontFamily: "'DM Mono', monospace", marginBottom: "0.8rem" }}>WHITE SPACE</div>
          <p style={{ fontSize: "1.1rem", color: C.paper, lineHeight: 1.7 }}>
            Psychedelic-informed leadership development with integration at its core.
          </p>
        </Card>
      </div>

      {/* 11 — CUSTOMER JOURNEY */}
      <div style={section}>
        <SectionHeader num="11" label="CUSTOMER JOURNEY" title="The Experience Arc" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1px", background: C.rule, marginBottom: "2rem" }}>
          {[
            { n: "01", step: "Discovery",    sub: "Intrigue, resonance" },
            { n: "02", step: "Decision",     sub: "Safety, trust" },
            { n: "03", step: "Experience",   sub: "Depth, expansion" },
            { n: "04", step: "Integration",  sub: "Clarity, grounding" },
            { n: "05", step: "Community",    sub: "Belonging, continuity" },
          ].map((s, i) => (
            <div key={s.n} style={{ background: C.paper, padding: "2rem 1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.62rem", color: C.muted, fontFamily: "'DM Mono', monospace", marginBottom: "0.8rem" }}>{s.n}</div>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.1rem", color: C.deepTeal, marginBottom: "0.4rem" }}>{s.step}</div>
              <div style={{ fontSize: "0.75rem", color: C.muted }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <Card>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>KEY TOUCHPOINTS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["Website", "Intake process", "Retreat environment", "Integration sessions", "Community"].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </Card>
      </div>

      {/* 12 — VOICE & TONE */}
      <div style={section}>
        <SectionHeader num="12" label="VOICE & TONE" title="How We Speak" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.sage, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>TONE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Calm", "Precise", "Grounded", "Spacious", "Non-hyped"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.sage, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>USE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Integration", "Connection", "Leadership", "Depth", "Responsibility"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "#c0392b", fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>AVOID</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {['"Magic"', '"Healing retreat"', 'Overly spiritual', 'Vague/hyped phrasing', '"Next-generation"'].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>ALWAYS COMMUNICATE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Safety", "Integrity", "Depth", "Responsibility", "Human connection"].map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </Card>
        </div>
      </div>

      {/* 13 — COMPETITIVE CONTEXT */}
      <div style={section}>
        <SectionHeader num="13" label="COMPETITIVE CONTEXT" title="How We Differ" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {[
            { vs: "VS. PSYCHEDELIC RETREATS",  diff: "More structured, with a full developmental arc and integration focus." },
            { vs: "VS. LEADERSHIP PROGRAMS",   diff: "Goes deeper — includes inner transformation, not just skills." },
            { vs: "VS. EXECUTIVE COACHING",    diff: "More grounded and safer — a credible, science-backed approach." },
          ].map(c => (
            <Card key={c.vs}>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: C.amber, fontFamily: "'DM Mono', monospace", marginBottom: "0.8rem" }}>{c.vs}</div>
              <p style={{ fontSize: "0.9rem", color: C.muted, lineHeight: 1.7 }}>{c.diff}</p>
            </Card>
          ))}
        </div>
        <Card>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: C.muted, fontFamily: "'DM Mono', monospace", marginBottom: "1rem" }}>BRANDS OUR AUDIENCE ADMIRES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["ESALEN INSTITUTE", "THE SCHOOL OF LIFE", "SINGULARITY UNIVERSITY", "HEADSPACE", "MINDVALLEY"].map(b => <Tag key={b}>{b}</Tag>)}
          </div>
        </Card>
      </div>

      {/* 14 — CORE MESSAGE */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "6rem 3rem" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
            <div style={{ flex: 1, height: 1, background: C.rule }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, fontFamily: "'DM Mono', monospace" }}>14 — CORE MESSAGE</span>
            <div style={{ flex: 1, height: 1, background: C.rule }} />
          </div>
          <LogoMark color={C.deepTeal} size={52} />
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: C.deepTeal, fontWeight: 400, marginTop: "2rem", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Real leadership starts within.
          </h2>
          <p style={{ fontSize: "0.85rem", letterSpacing: "0.2em", color: C.muted, fontFamily: "'DM Mono', monospace" }}>
            Depth · Connection · Responsibility
          </p>
          <div style={{ marginTop: "3rem", fontSize: "0.7rem", color: C.muted }}>
            © {new Date().getFullYear()} Luminal Journeys · Brand Kit V2.0 · Confidential
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function BrandKitPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("lj_brand") === "true");

  const handleAuth = () => {
    sessionStorage.setItem("lj_brand", "true");
    setAuthed(true);
  };

  if (!authed) return <PasswordGate onAuth={handleAuth} />;
  return <BrandKitContent />;
}