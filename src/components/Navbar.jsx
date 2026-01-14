import { NavLink } from "react-router-dom";

const linkBase =
  "rounded-full border border-white/10 px-4 py-2 text-sm transition";
const inactive = "bg-white/5 text-white/80 hover:bg-white/10";
const active = "bg-white/10 text-white border-white/20";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="font-semibold tracking-tight">Huzefa Saleem</div>

        <div className="flex flex-wrap gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Projects
          </NavLink>

          <a
            href="https://www.linkedin.com/in/huzefa-taher-saleem"
            target="_blank"
            rel="noreferrer"
            className={`${linkBase} ${inactive}`}
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </div>
  );
}
