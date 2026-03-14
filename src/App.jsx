import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import IntakePage from "./pages/IntakePage";
import AdminPage from "./pages/AdminPage";
import ThemeSwitcher from "./components/ThemeSwitcher";

export function navigate(to) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("routechange"));
}

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

export default function App() {
  const route = useRoute();
  return (
    <>
      <ThemeSwitcher />
      {route === "/intake" && <IntakePage />}
      {route === "/admin"  && <AdminPage />}
      {route !== "/intake" && route !== "/admin" && <LandingPage />}
    </>
  );
}