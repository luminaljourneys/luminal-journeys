/**
 * App.jsx — Luminal Journeys
 * Layout: Movement (Layout 5)
 * Theme: Luminal / Theme A
 * Locked: March 25, 2026
 */

import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import IntakePage from "./pages/IntakePage";
import AdminPage from "./pages/AdminPage";
import BrandKitPage from "./brand/BrandKitPage";

// ─── Navigation ───────────────────────────────────────────────────────────────
export function navigate(to) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("routechange"));
}

// ─── Router ───────────────────────────────────────────────────────────────────
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    window.addEventListener("routechange", handler);
    return () => {
      window.removeEventListener("popstate", handler);
      window.removeEventListener("routechange", handler);
    };
  }, []);

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return path.replace(base, "").replace(/\/$/, "").toLowerCase() || "/";
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const route = useRoute();

  // Lock to Theme A — set once on mount, no switcher needed
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "A");
  }, []);

  if (route === "/intake") return <IntakePage />;
  if (route === "/admin")  return <AdminPage />;
  if (route === "/brand")  return <BrandKitPage />;
  return <LandingPage />;
}