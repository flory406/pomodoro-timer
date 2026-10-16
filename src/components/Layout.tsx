import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { formatTime } from "../lib/utils";
import { useLanguage } from "../context/LanguageContext";

export function Layout() {
  const { remainingMs, timer, notice, setNotice } = useApp();
  const { t, toggleLanguage, language } = useLanguage();

  useEffect(() => {
    if (timer.status !== "idle") {
      document.title = `${formatTime(remainingMs)} -- ${t(
        timer.phase === "Work"
          ? "work"
          : timer.phase === "Short Break"
            ? "shortBreak"
            : "longBreak",
      )}`;
    } else if (timer.status === "idle") {
      document.title = "Pomodoro";
    }
  }, [remainingMs, timer.phase, timer.status, t]);

  useEffect(() => {
    if (notice === null) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setNotice(null);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [notice, setNotice]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3">
      <nav className="navbar navbar-expand d-flex gap-2 p-2 mt-3 rounded-pill app-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "app-nav-link app-nav-link-active"
              : "app-nav-link"
          }
        >
          {t("timer")}
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "app-nav-link app-nav-link-active"
              : "app-nav-link"
          }
        >
          {t("tasks")}
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive
              ? "app-nav-link app-nav-link-active"
              : "app-nav-link"
          }
        >
          {t("stats")}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "app-nav-link app-nav-link-active"
              : "app-nav-link"
          }
        >
          {t("settings")}
        </NavLink>
        <button
          type="button"
          className="app-nav-link app-language-toggle"
          onClick={toggleLanguage}
          aria-label={`Switch language (${language})`}
        >
          {language === "uk" ? "EN" : "UA"}
        </button>
      </nav>

      {notice !== null && (
        <div className="alert alert-success mt-3 mb-0" role="alert">
          {notice}
        </div>
      )}

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
