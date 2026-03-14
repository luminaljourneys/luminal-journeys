import { useState, useEffect } from "react";

const THEMES = {
  A: { label: "A", name: "Luminal", desc: "Refined Greens · Georgia" },
  B: { label: "B", name: "Corporate", desc: "Salesforce Blue · Inter" },
  C: { label: "C", name: "Medical", desc: "Philips Navy · Source Sans" },
};

export default function ThemeSwitcher() {
  const [active, setActive] = useState(() => localStorage.getItem("lj_theme") || "A");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", active);
    localStorage.setItem("lj_theme", active);
  }, [active]);

  const select = (key) => {
    setActive(key);
    setOpen(false);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      display: "flex", justifyContent: "center", pointerEvents: "none"
    }}>
      <div style={{ pointerEvents: "auto" }}>

        {/* Collapsed pill */}
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
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.55rem" }}>◆</span>
            Theme {active}
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.6rem" }}>▾</span>
          </button>
        )}

        {/* Expanded panel */}
        {open && (
          <div style={{
            background: "rgba(10,10,20,0.92)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0 0 1.2rem 1.2rem",
            padding: "0.8rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "ui-sans-serif, sans-serif"
          }}>
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginRight: "0.3rem" }}>
              Theme
            </span>
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                onClick={() => select(key)}
                title={t.desc}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  background: active === key ? "rgba(255,255,255,0.15)" : "transparent",
                  border: active === key ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "2rem", padding: "0.3rem 0.9rem",
                  cursor: "pointer", transition: "all 0.15s",
                  color: active === key ? "#fff" : "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={e => { if (active !== key) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { if (active !== key) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em" }}>{t.label}</span>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.06em", color: active === key ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>{t.name}</span>
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