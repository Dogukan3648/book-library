import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink
          to="/"
          className="text-xl font-bold text-slate-900 transition hover:text-slate-600"
        >
          BookVault
        </NavLink>

        <ul className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition ${
                  isActive
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/library"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition ${
                  isActive
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
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
