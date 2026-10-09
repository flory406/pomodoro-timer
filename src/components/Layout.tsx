import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3">
      <nav className="navbar d-flex gap-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "btn btn-dark" : "btn btn-outline-dark"
          }
        >
          Timer
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "btn btn-dark" : "btn btn-outline-dark"
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) =>
            isActive ? "btn btn-dark" : "btn btn-outline-dark"
          }
        >
          Stats
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "btn btn-dark" : "btn btn-outline-dark"
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
