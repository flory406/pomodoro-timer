import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { formatTime, getPhaseName } from "../lib/utils";

export function Layout() {
  const { remainingMs, timer } = useApp();

  useEffect(() => {
    if (timer.status !== "idle") {
      document.title = `${formatTime(remainingMs)} -- ${getPhaseName(timer.phase)}`;
    } else if (timer.status === "idle") {
      document.title = "Помодоро";
    }
  }, [remainingMs, timer.phase, timer.status]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3">
      <nav className="navbar navbar-expand d-flex gap-2 p-2 mt-3 rounded-pill bg-body-tertiary shadow-sm">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "btn btn-primary rounded-pill px-3"
              : "btn btn-link text-body text-decoration-none rounded-pill px-3"
          }
        >
          Timer
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "btn btn-primary rounded-pill px-3"
              : "btn btn-link text-body text-decoration-none rounded-pill px-3"
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive
              ? "btn btn-primary rounded-pill px-3"
              : "btn btn-link text-body text-decoration-none rounded-pill px-3"
          }
        >
          Stats
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "btn btn-primary rounded-pill px-3"
              : "btn btn-link text-body text-decoration-none rounded-pill px-3"
          }
        >
          Settings
        </NavLink>
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
