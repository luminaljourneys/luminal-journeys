import { useState } from "react";

export default function MockupBanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: "1.2rem", right: "1.2rem", zIndex: 998,
          background: "var(--color-accent)", color: "#fff",
          padding: "0.5rem 1.1rem", borderRadius: "2rem",
          fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.08em", textTransform: "uppercase",
          cursor: "pointer", fontWeight: 500,
          boxShadow: "0 4px 16px rgba(224,122,95,0.35)",
          display: "flex", alignItems: "center", gap: "0.4rem",
          transition: "transform 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "none"}
      >
        <span style={{ fontSize: "0.65rem" }}>⚠</span>
        Mockup Prototype
      </div>

      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(17,76,92,0.5)",
          fontFamily: "'DM Sans', sans-serif"
        }}
          onClick={() => setOpen(false)}
        >
          <div style={{
            background: "var(--color-bg)", borderRadius: "1.2rem",
            padding: "2.5rem", maxWidth: 420, width: "100%", margin: "1rem",
            border: "1px solid var(--color-border)",
            boxShadow: "0 24px 80px rgba(17,76,92,0.18)"
          }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
              <div>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "0.3rem" }}>
                  ⚠ Prototype Notice
                </div>
                <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--color-primary)", margin: 0 }}>
                  Mockup Prototype
                </h2>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "var(--color-text-muted)", fontSize: "1.3rem", lineHeight: 1, padding: "0.2rem"
              }}>×</button>
            </div>

            <div style={{ height: 1, background: "var(--color-border)", marginBottom: "1.2rem" }} />

            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--color-text-soft)", marginBottom: "1rem" }}>
              This is a <strong style={{ color: "var(--color-primary)" }}>design prototype</strong> for the Luminal Journeys platform. All data shown is simulated.
            </p>

            <div style={{ background: "var(--color-bg-soft)", borderRadius: "0.6rem", padding: "1rem 1.2rem", marginBottom: "1.4rem" }}>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "0.6rem" }}>
                Pending before launch
              </div>
              {[
                "Waiting on marketing landing page real content",
                "Waiting on real intake form field inputs",
                "Firestore database connection",
                "Auth0 authentication",
                "Appointment scheduling fields",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem", fontSize: "0.85rem", color: "var(--color-text)" }}>
                  <span style={{ color: "var(--color-accent)", marginTop: "0.1rem", flexShrink: 0 }}>○</span>
                  {item}
                </div>
              ))}
            </div>

            <button onClick={() => setOpen(false)} style={{
              width: "100%", background: "var(--color-primary)", color: "#fff",
              border: "none", borderRadius: "0.6rem", padding: "0.8rem",
              fontSize: "0.88rem", cursor: "pointer", letterSpacing: "0.04em"
            }}
              onMouseEnter={e => e.target.style.background = "var(--color-primary-dark)"}
              onMouseLeave={e => e.target.style.background = "var(--color-primary)"}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}