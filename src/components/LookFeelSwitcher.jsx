import { useState, useEffect } from "react";

const LAYOUTS = {
  1: { label: "1", name: "Editorial", desc: "Dark · Serif · Organic" },
  2: { label: "2", name: "Command",   desc: "Dark · Bold · Metric" },
  3: { label: "3", name: "Trust",     desc: "Light · Clean · Medical" },
  4: { label: "4", name: "Clarity",   desc: "Warm · Baselane × B Corp" },
};

export default function LookFeelSwitcher() {
  const [active, setActive] = useState(() => parseInt(localStorage.getItem("lj_layout") || "1"));
  const [open, setOpen] = useState(false);

  const select = (key) => {
    setActive(key);
    localStorage.setItem("lj_layout", key);
    window.dispatchEvent(new Event("layoutchange"));
    setOpen(false);
  };

  // Listen for external layout changes
  useEffect(() => {
    const h = () => setActive(parseInt(localStorage.getItem("lj_layout") || "1"));
    window.addEventListener("layoutchange", h);
    return () => window.removeEventListener("layoutchange", h);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1001,
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      pointerEvents: "none"
    }}>
      {/* Offset right of ThemeSwitcher */}
      <div style={{ pointerEvents: "auto", marginLeft: "14rem" }}>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(10,10,20,0.82)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0 0 2rem 2rem",
              padding: "0.35rem 1.2rem 0.45rem", cursor: "pointer",
              color: "rgba(255,255,255,0.7)", fontSize: "0.68rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "all 0.2s", fontFamily: "ui-sans-serif, sans-serif"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(10,10,20,0.95)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(10,10,20,0.82)"}
          >
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.55rem" }}>▣</span>
            Layout {active}
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.6rem" }}>▾</span>
          </button>
        )}

        {open && (
          <div style={{
            background: "rgba(10,10,20,0.92)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0 0 1.2rem 1.2rem",
            padding: "0.8rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "ui-sans-serif, sans-serif"
          }}>
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginRight: "0.3rem" }}>
              Look & Feel
            </span>
            {Object.entries(LAYOUTS).map(([key, t]) => (
              <button
                key={key}
                onClick={() => select(parseInt(key))}
                title={t.desc}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: active === parseInt(key) ? "rgba(255,255,255,0.15)" : "transparent",
                  border: active === parseInt(key) ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "2rem", padding: "0.3rem 0.9rem",
                  cursor: "pointer", transition: "all 0.15s",
                  color: active === parseInt(key) ? "#fff" : "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={e => { if (active !== parseInt(key)) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { if (active !== parseInt(key)) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em" }}>{t.label}</span>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.06em", color: active === parseInt(key) ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>{t.name}</span>
              </button>
            ))}
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.3)", fontSize: "1rem", padding: "0 0.3rem",
                marginLeft: "0.2rem", lineHeight: 1
              }}
            >×</button>
          </div>
        )}
      </div>
    </div>
  );
}