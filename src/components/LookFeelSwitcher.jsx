import { useState, useEffect } from "react";

const LAYOUTS = {
  1: { label: "1", name: "Editorial", desc: "Dark · Serif · Organic" },
  2: { label: "2", name: "Command",   desc: "Greige · Navy · Baselane" },
  3: { label: "3", name: "Trust",     desc: "Light · Clean · Medical" },
  4: { label: "4", name: "Clarity",   desc: "Warm · Baselane × B Corp" },
  5: { label: "5", name: "Movement",  desc: "Cream · Editorial · B Corp" },
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

  useEffect(() => {
    const h = () => setActive(parseInt(localStorage.getItem("lj_layout") || "1"));
    window.addEventListener("layoutchange", h);
    return () => window.removeEventListener("layoutchange", h);
  }, []);

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
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1001, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ pointerEvents: "auto", marginLeft: "16rem" }}>
        {!open && (
          <button onClick={() => setOpen(true)} style={pill}>
            <span style={{ color: "rgba(26,26,46,0.4)", fontSize: "0.55rem" }}>▣</span>
            Layout {active}
            <span style={{ color: "rgba(26,26,46,0.35)", fontSize: "0.6rem" }}>▾</span>
          </button>
        )}
        {open && (
          <div style={{ background: "#fff", border: "1px solid rgba(26,26,46,0.12)", borderRadius: "0 0 1.2rem 1.2rem", padding: "0.8rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 24px rgba(0,0,0,0.12)", fontFamily: "ui-sans-serif, sans-serif" }}>
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,46,0.4)", marginRight: "0.3rem" }}>Look & Feel</span>
            {Object.entries(LAYOUTS).map(([key, t]) => (
              <button key={key} onClick={() => select(parseInt(key))} title={t.desc} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                background: active === parseInt(key) ? "#1A1A2E" : "transparent",
                border: active === parseInt(key) ? "1px solid #1A1A2E" : "1px solid rgba(26,26,46,0.15)",
                borderRadius: "2rem", padding: "0.3rem 0.9rem", cursor: "pointer",
                color: active === parseInt(key) ? "#fff" : "rgba(26,26,46,0.6)",
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