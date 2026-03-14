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

  const select = (key) => { setActive(key); setOpen(false); };

  const pill = {
    display: "flex", alignItems: "center", gap: "0.5rem",
    background: "#fff", color: "#1A1A2E",
    border: "1px solid rgba(26,26,46,0.15)",
    borderRadius: "0 0 2rem 2rem",
    padding: "0.35rem 1.2rem 0.45rem", cursor: "pointer",
    fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase",
    boxShadow: "0 2px 12px rgba(0,0,0,0.12)", transition: "all 0.2s",
    fontFamily: "ui-sans-serif, sans-serif"
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ pointerEvents: "auto" }}>
        {!open && (
          <button onClick={() => setOpen(true)} style={pill}>
            <span style={{ color: "rgba(26,26,46,0.4)", fontSize: "0.55rem" }}>◆</span>
            Theme {active}
            <span style={{ color: "rgba(26,26,46,0.35)", fontSize: "0.6rem" }}>▾</span>
          </button>
        )}
        {open && (
          <div style={{ background: "#fff", border: "1px solid rgba(26,26,46,0.12)", borderRadius: "0 0 1.2rem 1.2rem", padding: "0.8rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 24px rgba(0,0,0,0.12)", fontFamily: "ui-sans-serif, sans-serif" }}>
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,46,0.4)", marginRight: "0.3rem" }}>Theme</span>
            {Object.entries(THEMES).map(([key, t]) => (
              <button key={key} onClick={() => select(key)} title={t.desc} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                background: active === key ? "#1A1A2E" : "transparent",
                border: active === key ? "1px solid #1A1A2E" : "1px solid rgba(26,26,46,0.15)",
                borderRadius: "2rem", padding: "0.3rem 0.9rem", cursor: "pointer",
                color: active === key ? "#fff" : "rgba(26,26,46,0.6)",
                transition: "all 0.15s"
              }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{t.label}</span>
                <span style={{ fontSize: "0.65rem" }}>{t.name}</span>
              </button>
            ))}
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(26,26,46,0.35)", fontSize: "1rem", padding: "0 0.3rem", lineHeight: 1 }}>×</button>
          </div>
        )}
      </div>
    </div>
  );
}