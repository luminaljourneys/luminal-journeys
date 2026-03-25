import { useState, useEffect } from "react";

const LAYOUTS = {
  1: { label: "1", name: "Editorial" },
  2: { label: "2", name: "Command" },
  3: { label: "3", name: "Trust" },
  4: { label: "4", name: "Clarity" },
  5: { label: "5", name: "Movement" },
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

  return (
    <div style={{
      position: "fixed", top: 0, left: "50%", transform: "translateX(20px)",
      zIndex: 9999, pointerEvents: "none"
    }}>
      <div style={{ pointerEvents: "auto" }}>
        {!open ? (
          <button onClick={() => setOpen(true)} style={{
            display: "flex", alignItems: "center", gap: "0.45rem",
            background: "#fff", color: "#1A1A2E",
            border: "1px solid rgba(26,26,46,0.15)",
            borderRadius: "0 0 1.8rem 1.8rem",
            padding: "0.3rem 1.1rem 0.4rem",
            cursor: "pointer", fontSize: "0.67rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            boxShadow: "0 2px 16px rgba(0,0,0,0.14)",
            fontFamily: "ui-sans-serif, sans-serif", lineHeight: 1
          }}>
            <span style={{ opacity: 0.4, fontSize: "0.5rem" }}>▣</span>
            Layout {active}
            <span style={{ opacity: 0.35, fontSize: "0.55rem" }}>▾</span>
          </button>
        ) : (
          <div style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            background: "#fff", border: "1px solid rgba(26,26,46,0.12)",
            borderRadius: "0 0 1.2rem 1.2rem", padding: "0.7rem 0.9rem",
            boxShadow: "0 4px 28px rgba(0,0,0,0.13)",
            fontFamily: "ui-sans-serif, sans-serif"
          }}>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,26,46,0.4)", marginRight: "0.2rem" }}>Look & Feel</span>
            {Object.entries(LAYOUTS).map(([key, t]) => (
              <button key={key} onClick={() => select(parseInt(key))} style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                background: active === parseInt(key) ? "#1A1A2E" : "transparent",
                border: `1px solid ${active === parseInt(key) ? "#1A1A2E" : "rgba(26,26,46,0.15)"}`,
                borderRadius: "2rem", padding: "0.28rem 0.8rem",
                cursor: "pointer", transition: "all 0.15s",
                color: active === parseInt(key) ? "#fff" : "rgba(26,26,46,0.6)",
              }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 600 }}>{t.label}</span>
                <span style={{ fontSize: "0.63rem" }}>{t.name}</span>
              </button>
            ))}
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(26,26,46,0.3)", fontSize: "1rem", padding: "0 0.2rem", lineHeight: 1 }}>×</button>
          </div>
        )}
      </div>
    </div>
  );
}