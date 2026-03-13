import { useState } from "react";
import MockupBanner from "../components/MockupBanner.jsx";
import { navigate } from "../App.jsx";

const STEPS = ["Personal Info", "Contact Info", "About You", "Confirm"];

const initialForm = {
  // Personal
  firstName: "", lastName: "", preferredName: "",
  dateOfBirth: "", pronouns: "",
  // Contact
  email: "", phone: "", address: "", city: "", state: "", zip: "",
  preferredContact: "email",
  // About
  primaryGoal: "", hearAboutUs: "", additionalNotes: "",
};

const inputStyle = {
  width: "100%", padding: "0.75rem 1rem",
  border: "1.5px solid rgba(95,158,160,0.3)",
  borderRadius: "0.6rem", fontSize: "0.95rem",
  fontFamily: "'DM Sans', sans-serif",
  background: "var(--color-bg)", color: "var(--color-text)",
  outline: "none", boxSizing: "border-box",
  transition: "border-color 0.2s"
};

const labelStyle = {
  display: "block", fontSize: "0.78rem",
  letterSpacing: "0.1em", textTransform: "uppercase",
  color: "var(--color-primary)", fontFamily: "'DM Sans', sans-serif",
  marginBottom: "0.4rem", fontWeight: 500
};

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: "1.4rem" }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: "var(--color-accent)" }}> *</span>}</label>
      {children}
    <MockupBanner />
    </div>
  );
}

export default function IntakePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const focusStyle = (name) => ({
    ...inputStyle,
    borderColor: focused === name ? "var(--color-primary)" : "rgba(95,158,160,0.3)",
    boxShadow: focused === name ? "0 0 0 3px rgba(17,76,92,0.08)" : "none"
  });

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "radial-gradient(ellipse at 50% 40%, #EDE0CC 0%, var(--color-bg) 70%)",
        fontFamily: "'DM Serif Display', Georgia, serif", padding: "2rem", textAlign: "center"
      }}>
        <div>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✦</div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 400, color: "var(--color-text)", marginBottom: "1rem" }}>
            Thank you, {form.preferredName || form.firstName}.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-soft)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, maxWidth: 440, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            We've received your intake form and will reach out to <strong>{form.email}</strong> within 1–2 business days to schedule your first visit.
          </p>
          <button onClick={() => navigate("/")} style={{
            color: "var(--color-primary)", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem", letterSpacing: "0.06em", background: "none", border: "none",
            cursor: "pointer", borderBottom: "1px solid rgba(155,94,82,0.4)", padding: 0
          }}>← Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", fontFamily: "'DM Serif Display', Georgia, serif" }}>

      {/* TOP BAR */}
      <div style={{
        padding: "1.2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid rgba(95,158,160,0.15)", background: "var(--color-bg)"
      }}>
        <button onClick={() => navigate("/")} style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.04em" }}>
          Luminal Journey
        </button>
        <span style={{ fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}>
          New Client Intake
        </span>
      </div>

      {/* PROGRESS */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "2.5rem 2rem 0" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem" }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{
                height: 3, borderRadius: 2,
                background: i <= step ? "var(--color-primary)" : "rgba(95,158,160,0.2)",
                transition: "background 0.4s", marginBottom: "0.5rem"
              }} />
              <span style={{
                fontSize: "0.7rem", fontFamily: "'DM Sans', sans-serif",
                color: i <= step ? "var(--color-primary)" : "var(--color-text-muted)",
                letterSpacing: "0.06em", textTransform: "uppercase"
              }}>{s}</span>
            </div>
          ))}
        </div>

        {/* STEP TITLE */}
        <p style={{ fontSize: "0.75rem", color: "var(--color-accent)", letterSpacing: "0.15em", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Step {step + 1} of {STEPS.length}
        </p>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 400, color: "var(--color-text)", marginBottom: "0.5rem" }}>
          {STEPS[step]}
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--color-primary)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginBottom: "2.5rem" }}>
          {step === 0 && "Let's start with the basics — tell us who you are."}
          {step === 1 && "How can we reach you? We'll use this to confirm your appointment."}
          {step === 2 && "A little more about you so we can prepare."}
          {step === 3 && "Everything look right? Review and submit when ready."}
        </p>

        {/* STEP 0: Personal */}
        {step === 0 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem" }}>
              <Field label="First Name" required>
                <input style={focusStyle("firstName")} value={form.firstName}
                  onChange={set("firstName")} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} />
              </Field>
              <Field label="Last Name" required>
                <input style={focusStyle("lastName")} value={form.lastName}
                  onChange={set("lastName")} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} />
              </Field>
            </div>
            <Field label="Preferred Name">
              <input style={focusStyle("preferredName")} value={form.preferredName}
                placeholder="What should we call you?"
                onChange={set("preferredName")} onFocus={() => setFocused("preferredName")} onBlur={() => setFocused(null)} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem" }}>
              <Field label="Date of Birth" required>
                <input type="date" style={focusStyle("dateOfBirth")} value={form.dateOfBirth}
                  onChange={set("dateOfBirth")} onFocus={() => setFocused("dateOfBirth")} onBlur={() => setFocused(null)} />
              </Field>
              <Field label="Pronouns">
                <select style={focusStyle("pronouns")} value={form.pronouns}
                  onChange={set("pronouns")} onFocus={() => setFocused("pronouns")} onBlur={() => setFocused(null)}>
                  <option value="">Select...</option>
                  <option>She / Her</option>
                  <option>He / Him</option>
                  <option>They / Them</option>
                  <option>Other / Prefer not to say</option>
                </select>
              </Field>
            </div>
          </div>
        )}

        {/* STEP 1: Contact */}
        {step === 1 && (
          <div>
            <Field label="Email Address" required>
              <input type="email" style={focusStyle("email")} value={form.email}
                onChange={set("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
            </Field>
            <Field label="Phone Number">
              <input type="tel" style={focusStyle("phone")} value={form.phone}
                placeholder="(555) 000-0000"
                onChange={set("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
            </Field>
            <Field label="Street Address">
              <input style={focusStyle("address")} value={form.address}
                onChange={set("address")} onFocus={() => setFocused("address")} onBlur={() => setFocused(null)} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "0 1rem" }}>
              <Field label="City">
                <input style={focusStyle("city")} value={form.city}
                  onChange={set("city")} onFocus={() => setFocused("city")} onBlur={() => setFocused(null)} />
              </Field>
              <Field label="State">
                <input style={focusStyle("state")} value={form.state} maxLength={2} placeholder="WA"
                  onChange={set("state")} onFocus={() => setFocused("state")} onBlur={() => setFocused(null)} />
              </Field>
              <Field label="ZIP">
                <input style={focusStyle("zip")} value={form.zip}
                  onChange={set("zip")} onFocus={() => setFocused("zip")} onBlur={() => setFocused(null)} />
              </Field>
            </div>
            <Field label="Preferred Contact Method">
              <div style={{ display: "flex", gap: "1rem" }}>
                {["email", "phone", "text"].map(m => (
                  <label key={m} style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "var(--color-text)" }}>
                    <input type="radio" name="preferredContact" value={m} checked={form.preferredContact === m}
                      onChange={set("preferredContact")} style={{ accentColor: "var(--color-primary)" }} />
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </label>
                ))}
              </div>
            </Field>
          </div>
        )}

        {/* STEP 2: About */}
        {step === 2 && (
          <div>
            <Field label="Primary Wellness Goal" required>
              <select style={focusStyle("primaryGoal")} value={form.primaryGoal}
                onChange={set("primaryGoal")} onFocus={() => setFocused("primaryGoal")} onBlur={() => setFocused(null)}>
                <option value="">Select your main focus...</option>
                <option>Stress & Anxiety Management</option>
                <option>Energy & Vitality</option>
                <option>Digestive Health</option>
                <option>Sleep Improvement</option>
                <option>Chronic Pain</option>
                <option>Hormonal Balance</option>
                <option>Weight & Nutrition</option>
                <option>General Wellness</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="How did you hear about us?">
              <select style={focusStyle("hearAboutUs")} value={form.hearAboutUs}
                onChange={set("hearAboutUs")} onFocus={() => setFocused("hearAboutUs")} onBlur={() => setFocused(null)}>
                <option value="">Select...</option>
                <option>Friend or Family</option>
                <option>Google Search</option>
                <option>Social Media</option>
                <option>Healthcare Provider Referral</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Anything else you'd like us to know?">
              <textarea
                rows={4}
                style={{ ...focusStyle("additionalNotes"), resize: "vertical" }}
                value={form.additionalNotes}
                placeholder="Share anything that would help us prepare for your visit..."
                onChange={set("additionalNotes")}
                onFocus={() => setFocused("additionalNotes")}
                onBlur={() => setFocused(null)}
              />
            </Field>
          </div>
        )}

        {/* STEP 3: Confirm */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              {
                section: "Personal", items: [
                  ["Name", `${form.firstName} ${form.lastName}${form.preferredName ? ` (${form.preferredName})` : ""}`],
                  ["Date of Birth", form.dateOfBirth],
                  ["Pronouns", form.pronouns || "—"],
                ]
              },
              {
                section: "Contact", items: [
                  ["Email", form.email],
                  ["Phone", form.phone || "—"],
                  ["Address", [form.address, form.city, form.state, form.zip].filter(Boolean).join(", ") || "—"],
                  ["Preferred Contact", form.preferredContact],
                ]
              },
              {
                section: "About You", items: [
                  ["Primary Goal", form.primaryGoal || "—"],
                  ["Heard About Us", form.hearAboutUs || "—"],
                  ["Additional Notes", form.additionalNotes || "—"],
                ]
              }
            ].map((block) => (
              <div key={block.section} style={{
                background: "var(--color-bg-soft)", border: "1px solid rgba(95,158,160,0.18)",
                borderRadius: "0.8rem", padding: "1.5rem 1.8rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 500, color: "var(--color-primary)", margin: 0 }}>{block.section}</h3>
                </div>
                {block.items.map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif" }}>
                    <span style={{ color: "var(--color-text-muted)", minWidth: 130 }}>{k}</span>
                    <span style={{ color: "var(--color-text)", fontWeight: 400 }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}

            <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
              By submitting this form, you consent to being contacted by Luminal Journey to schedule your appointment. Your information is kept private and never shared.
            </p>
          </div>
        )}

        {/* NAV BUTTONS */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2.5rem", paddingBottom: "3rem" }}>
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} style={{
              background: "transparent", border: "1.5px solid rgba(95,158,160,0.35)",
              color: "var(--color-primary)", padding: "0.75rem 1.8rem", borderRadius: "2rem",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
              transition: "all 0.2s"
            }}
              onMouseEnter={e => e.target.style.background = "rgba(155,94,82,0.05)"}
              onMouseLeave={e => e.target.style.background = "transparent"}
            >
              ← Back
            </button>
          ) : <div />}

          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(step + 1)} style={{
              background: "var(--color-accent)", color: "#fff",
              padding: "0.75rem 2rem", borderRadius: "2rem", border: "none",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
              boxShadow: "0 6px 20px rgba(17,76,92,0.22)", transition: "all 0.2s"
            }}
              onMouseEnter={e => { e.target.style.background = "var(--color-primary-dark)"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.target.style.background = "var(--color-primary)"; e.target.style.transform = "none"; }}
            >
              Continue →
            </button>
          ) : (
            <button onClick={handleSubmit} style={{
              background: "var(--color-accent)", color: "#fff",
              padding: "0.85rem 2.4rem", borderRadius: "2rem", border: "none",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
              fontWeight: 600, boxShadow: "0 8px 28px rgba(224,122,95,0.30)", transition: "all 0.2s"
            }}
              onMouseEnter={e => { e.target.style.background = "var(--color-primary-dark)"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = "var(--color-primary)"; e.target.style.transform = "none"; }}
            >
              Submit Intake ✦
            </button>
          )}
        </div>
      </div>
    </div>
  );
}