import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-xl font-bold text-slate-900">
          BookVault
        </NavLink>
        <ul className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-slate-900"
                  : "text-slate-600 transition hover:text-slate-900"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/library"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-slate-900"
                  : "text-slate-600 transition hover:text-slate-900"
              }
            >
              My Library
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
