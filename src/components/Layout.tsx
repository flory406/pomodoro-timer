import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { formatTime, getPhaseName } from "../lib/utils";

export function Layout() {
  const { remainingMs, timer, notice, setNotice } = useApp();

  useEffect(() => {
    if (timer.status !== "idle") {
      document.title = `${formatTime(remainingMs)} -- ${getPhaseName(timer.phase)}`;
    } else if (timer.status === "idle") {
      document.title = "Помодоро";
    }
  }, [remainingMs, timer.phase, timer.status]);

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
          Timer
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "app-nav-link app-nav-link-active"
              : "app-nav-link"
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive
              ? "app-nav-link app-nav-link-active"
              : "app-nav-link"
          }
        >
          Stats
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "app-nav-link app-nav-link-active"
              : "app-nav-link"
          }
        >
          Settings
        </NavLink>
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
